import api from '../lib/axios';
import type { Client } from '../data/mockClients';

export const clientService = {
  getAllClients: async () => {
    const response = await api.get('/clients');
    return response.data;
  },

  getClientById: async (id: string) => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  updateSubscription: async (id: string, tier: string) => {
    const response = await api.patch(`/clients/${id}/subscription`, { tier });
    return response.data;
  }
};