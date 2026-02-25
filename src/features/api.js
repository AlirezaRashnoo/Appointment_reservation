// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://dentist-reyn.onrender.com/api/v1';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // این خط مهم است - باعث می‌شود کوکی‌ها ارسال شوند
});

// دیگر نیازی به این interceptor نیست چون توکن HttpOnly است
// apiService.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// این interceptor را نگه دارید اما کمی تغییر دهید
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // اگر خطای 401 دریافت کردیم، یعنی توکن معتبر نیست یا منقضی شده
      // کاربر باید به صفحه لاگین هدایت شود
      
      // اگر در محیط مرورگر هستیم و در صفحه لاگین نیستیم
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        // window.location.href = '/login';
        console.log("خطا!!!");
      }
    }
    return Promise.reject(error);
  }
);

export default apiService;