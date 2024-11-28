import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  // Add timeout and retry config
  timeout: 5000,
  validateStatus: (status) => status < 500
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('API Timeout:', error.message);
    } else {
      console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export const jobsApi = {
  getAll: () => api.get('/jobs').catch(() => ({ data: null })),
  getById: (id: string) => api.get(`/jobs/${id}`).catch(() => ({ data: null })),
  create: (data: any) => api.post('/jobs', data),
  update: (id: string, data: any) => api.put(`/jobs/${id}`, data),
  delete: (id: string) => api.delete(`/jobs/${id}`)
};

export const candidatesApi = {
  getAll: () => api.get('/candidates').catch(() => ({ data: null })),
  getById: (id: string) => api.get(`/candidates/${id}`).catch(() => ({ data: null })),
  updateStatus: (id: string, data: { status: string; jobId?: string }) => 
    api.patch(`/candidates/${id}/status`, data),
  addPaymentMethod: (id: string) => api.post(`/candidates/${id}/payment-method`)
};

export const clientsApi = {
  getAll: () => api.get('/clients').catch(() => ({ data: null })),
  getById: (id: string) => api.get(`/clients/${id}`).catch(() => ({ data: null })),
  updateSubscription: (id: string, tier: string) => 
    api.patch(`/clients/${id}/subscription`, { tier })
};

// Health check to verify API connectivity
export const checkApiHealth = () => api.get('/health').catch(() => ({ data: null }));

export default api;