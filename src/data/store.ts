import { create } from 'zustand';
import { jobsApi, candidatesApi, clientsApi } from '../services/api';
import { mockClients, Client } from './mockClients';
import { mockJobs, Job } from './mockJobs';
import { mockCandidates } from './mockCandidates';

interface SalesTraining {
  name: string;
  provider: string;
  completed: string;
}

interface SalesCoach {
  name: string;
  image: string;
  title: string;
}

interface Interview {
  title: string;
  duration: string;
  thumbnail: string;
}

interface SalesCall {
  title: string;
  duration: string;
  date: string;
}

interface Candidate {
  id: string;
  name: string;
  image: string;
  score: number;
  location: string;
  intro: string;
  currentRole: string;
  revenueSold: string;
  closeRate: string;
  avgDealSize: string;
  available: boolean;
  verified: boolean;
  hasPaymentMethod?: boolean;
  appliedJobs?: string[];
  status?: 'applied' | 'pending' | 'accepted' | 'rejected' | 'hired';
  actionBy?: 'client' | 'candidate';
  appliedDate?: string;
  salesTraining: SalesTraining[];
  salesCoaches: SalesCoach[];
  lookingFor: string[];
  interviews: Interview[];
  salesCalls: SalesCall[];
}

interface Subscription {
  tier: 'free' | 'starter' | 'professional' | 'enterprise';
  credits: number;
  maxCredits: number;
}

type UserRole = 'client' | 'candidate';

const subscriptionTiers = {
  free: {
    credits: 3,
    maxCredits: 3
  },
  starter: {
    credits: 10,
    maxCredits: 10
  },
  professional: {
    credits: 50,
    maxCredits: 50
  },
  enterprise: {
    credits: Infinity,
    maxCredits: Infinity
  }
} as const;

interface StoreState {
  candidates: Candidate[];
  jobs: Record<string, Job>;
  clients: Record<string, Client>;
  subscription: Subscription;
  userRole: UserRole;
  currentUserId: string;
  loading: boolean;
  error: string | null;
  getCandidateById: (id: string) => Candidate | undefined;
  getJobById: (id: string) => Job | undefined;
  getClientById: (id: string) => Client | undefined;
  updateCandidateStatus: (id: string, status: Candidate['status'], jobId?: string) => void;
  inviteCandidate: (candidateId: string, jobId: string) => { success: boolean; message: string };
  updateSubscription: (tier: Subscription['tier']) => void;
  setUserRole: (role: UserRole, id: string) => void;
  addPaymentMethod: (candidateId: string) => void;
  applyToJob: (jobId: string) => { success: boolean; message: string; requiresPayment: boolean };
  addJob: (job: Omit<Job, 'id' | 'applicants' | 'views' | 'status'>) => string;
  fetchInitialData: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  candidates: mockCandidates,
  jobs: mockJobs,
  clients: mockClients,
  subscription: { tier: 'free', ...subscriptionTiers.free },
  userRole: 'client',
  currentUserId: 'salesforce',
  loading: false,
  error: null,

  getCandidateById: (id: string) => get().candidates.find(c => c.id === id),
  
  getJobById: (id: string) => get().jobs[id],
  
  getClientById: (id: string) => get().clients[id],
  
  updateCandidateStatus: (id: string, status: Candidate['status'], jobId?: string) => {
    const state = get();
    const candidate = state.getCandidateById(id);
    
    if (!candidate) return;

    if (state.userRole === 'client' && 
        ((candidate.status === 'applied' && status === 'accepted') ||
        (candidate.status === 'pending' && status === 'accepted')) &&
        state.subscription.tier !== 'enterprise' && 
        state.subscription.credits <= 0) {
      alert('No credits remaining. Please upgrade your plan.');
      return;
    }

    set(state => ({
      candidates: state.candidates.map(c =>
        c.id === id ? { 
          ...c, 
          status,
          actionBy: state.userRole,
          appliedJobs: jobId ? [...(c.appliedJobs || []), jobId] : c.appliedJobs
        } : c
      ),
      subscription: state.subscription.tier !== 'enterprise' ? {
        ...state.subscription,
        credits: state.subscription.credits - 1
      } : state.subscription
    }));
  },

  inviteCandidate: (candidateId: string, jobId: string) => {
    const state = get();
    const candidate = state.getCandidateById(candidateId);
    const job = state.jobs[jobId];
    
    if (!candidate || !job) {
      return { success: false, message: 'Invalid candidate or job' };
    }

    if (job.clientId !== state.currentUserId) {
      return { success: false, message: 'You can only invite candidates to your own jobs' };
    }

    if (candidate.status === 'pending' || candidate.status === 'accepted') {
      return { success: false, message: 'Candidate already invited' };
    }

    if (state.subscription.tier !== 'enterprise' && state.subscription.credits <= 0) {
      return { success: false, message: 'No credits remaining. Please upgrade your plan.' };
    }

    set(state => ({
      candidates: state.candidates.map(c =>
        c.id === candidateId ? { 
          ...c, 
          status: 'pending',
          actionBy: 'client',
          appliedJobs: [...(c.appliedJobs || []), jobId]
        } : c
      ),
      subscription: state.subscription.tier !== 'enterprise' ? {
        ...state.subscription,
        credits: state.subscription.credits - 1
      } : state.subscription
    }));

    return { success: true, message: 'Invitation sent successfully' };
  },

  updateSubscription: (tier: Subscription['tier']) =>
    set(() => ({
      subscription: { tier, ...subscriptionTiers[tier] }
    })),

  setUserRole: (role: UserRole, id: string) =>
    set(() => ({
      userRole: role,
      currentUserId: id
    })),

  addPaymentMethod: (candidateId: string) => {
    set(state => ({
      candidates: state.candidates.map(c =>
        c.id === candidateId ? { ...c, hasPaymentMethod: true } : c
      )
    }));
  },

  applyToJob: (jobId: string) => {
    const state = get();
    const candidate = state.getCandidateById(state.currentUserId);
    const job = state.jobs[jobId];

    if (!candidate || !job) {
      return { 
        success: false, 
        message: 'Invalid job or candidate', 
        requiresPayment: false 
      };
    }

    if (!candidate.hasPaymentMethod) {
      return { 
        success: false, 
        message: 'Payment method required', 
        requiresPayment: true 
      };
    }

    if (candidate.appliedJobs?.includes(jobId)) {
      return {
        success: false,
        message: 'Already applied to this job',
        requiresPayment: false
      };
    }

    set(state => ({
      candidates: state.candidates.map(c =>
        c.id === state.currentUserId ? {
          ...c,
          status: 'applied',
          actionBy: 'candidate',
          appliedDate: '1 day ago',
          appliedJobs: [...(c.appliedJobs || []), jobId]
        } : c
      ),
      jobs: {
        ...state.jobs,
        [jobId]: {
          ...state.jobs[jobId],
          applicants: state.jobs[jobId].applicants + 1
        }
      }
    }));

    return { 
      success: true, 
      message: 'Application submitted successfully', 
      requiresPayment: false 
    };
  },

  addJob: (job: Omit<Job, 'id' | 'applicants' | 'views' | 'status'>) => {
    const jobId = `${Date.now()}`;
    const newJob: Job = {
      ...job,
      id: jobId,
      applicants: 0,
      views: 0,
      status: 'active',
      clientId: get().currentUserId
    };

    set(state => ({
      jobs: {
        ...state.jobs,
        [jobId]: newJob
      }
    }));

    return jobId;
  },

  fetchInitialData: async () => {
    set({ loading: true, error: null });
    try {
      const [jobsResponse, candidatesResponse, clientsResponse] = await Promise.all([
        jobsApi.getAll(),
        candidatesApi.getAll(),
        clientsApi.getAll()
      ]);

      set({
        jobs: jobsResponse.data || mockJobs,
        candidates: candidatesResponse.data || mockCandidates,
        clients: clientsResponse.data || mockClients,
        loading: false
      });
    } catch (error) {
      set({ 
        jobs: mockJobs,
        candidates: mockCandidates,
        clients: mockClients,
        loading: false,
        error: 'Using offline data'
      });
    }
  }
}));