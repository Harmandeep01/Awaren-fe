/* src/config/api.js */
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://awaren-backend-1.onrender.com/api/v1', // Adjust to your backend port
  // baseURL: 'http://localhost:8000/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // This sends the JWT as a Bearer token in the header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;