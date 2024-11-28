import api from '../lib/axios';
import type { Job } from '../data/mockJobs';

export const jobService = {
  getAllJobs: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },

  getJobById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (jobData: Omit<Job, 'id' | 'applicants' | 'views' | 'status'>) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  updateJob: async (id: string, jobData: Partial<Job>) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id: string) => {
    await api.delete(`/jobs/${id}`);
  }
};