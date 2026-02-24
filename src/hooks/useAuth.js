/* src/hooks/useAuth.js */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    // Strictly remove everything related to the user
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('theme'); // Optional: remove if you want theme to reset
    navigate('/login'); // Redirect to Login/Auth page
  };
  const [error, setError] = useState(null);

  // Helper to decode JWT payload without a library
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const executeAuth = async (type, formData) => {
    setIsLoading(true);
    setError(null);

    
    
    const endpoint = type === 'login' ? '/user/login' : '/user/register';
    const payload = type === 'login' 
      ? { email: formData.email, password: formData.password } 
      : { user_name: formData.name, email: formData.email, password: formData.password };

    try {
      const { data } = await api.post(endpoint, payload);
      
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        
        // Extract the user_name from the JWT payload we just stored
        const decoded = decodeToken(data.access_token);
        if (decoded && decoded.user_name) {
          localStorage.setItem('user_name', decoded.user_name);
        }
        
        return data;
      }
    } catch (err) {
      const message = err.response?.data?.detail || 'Authentication failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { executeAuth, logout, isLoading, error };
};