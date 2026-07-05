// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://dentist-reyn.onrender.com/api/v1';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        // window.location.href = '/login';
        console.log("خطا!!!");
      }
    }
    return Promise.reject(error);
  }
);

export default apiService;