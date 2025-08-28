
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example API functions
export const fetchProducts = async () => {
  const response = await api.get('products/');
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post('token/', { username, password });
  return response.data;
};

export const register = async (data) => {
  const response = await api.post('register/', data);
  return response.data;
};

export default api;
