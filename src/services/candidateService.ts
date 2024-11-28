import api from '../lib/axios';
import type { Candidate } from '../data/mockCandidates';

export const candidateService = {
  getAllCandidates: async () => {
    const response = await api.get('/candidates');
    return response.data;
  },

  getCandidateById: async (id: string) => {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  },

  updateCandidateStatus: async (id: string, status: Candidate['status'], jobId?: string) => {
    const response = await api.patch(`/candidates/${id}/status`, { status, jobId });
    return response.data;
  },

  addPaymentMethod: async (id: string) => {
    const response = await api.post(`/candidates/${id}/payment-method`);
    return response.data;
  }
};