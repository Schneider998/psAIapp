import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const jobsApi = {
  getAll: () => api.get('/jobs'),
  getById: (id: string) => api.get(`/jobs/${id}`),
  create: (data: any) => api.post('/jobs', data),
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`)
};

export const candidatesApi = {
  getAll: () => api.get('/candidates'),
  getById: (id: string) => api.get(`/candidates/${id}`),
  updateStatus: (id: string, data: { status: string; jobId?: string }) => 
    api.patch(`/candidates/${id}/status`, data),
  addPaymentMethod: (id: string) => api.post(`/candidates/${id}/payment-method`)
};

export const clientsApi = {
  getAll: () => api.get('/clients'),
  getById: (id: string) => api.get(`/clients/${id}`),
  updateSubscription: (id: string, tier: string) => 
    api.patch(`/clients/${id}/subscription`, { tier })
};

export default api;