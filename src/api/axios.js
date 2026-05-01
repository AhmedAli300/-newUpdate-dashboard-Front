import axios from 'axios';

const api = axios.create({
  baseURL: 'https://new-update-dashboard-backend.vercel.app', // Points to our new Express backend
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
