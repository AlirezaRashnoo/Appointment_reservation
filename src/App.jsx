import React, { useEffect } from 'react';
import { useRoutes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import { useUserStore } from './stores/useUserStore';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ایجاد یک نمونه از axios با تنظیمات پیش‌فرض
const api = axios.create({
  baseURL: 'https://dentist-reyn.onrender.com/api/v1',
  withCredentials: true,
});

// Interceptor برای مدیریت خطای 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('❌ Authentication failed, redirecting to login');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// تابع دریافت پروفایل کاربر
const fetchUserProfile = async () => {
  console.log('🔍 Fetching user profile');
  
  try {
    const response = await api.get('/users/me');
    console.log('✅ User profile fetched:', response.data);
    
    return response.data?.data ?? null;
    
  } catch (error) {
    console.error('❌ Error fetching profile:', error);
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

function App() {
  const router = useRoutes(routes);
  const setUser = useUserStore((state) => state.setUser);
  const clear = useUserStore((state) => state.clear);
  const user = useUserStore((state) => state.user);
  const csrfToken = useUserStore((state) => state.csrfToken);

  // استفاده از react-query برای دریافت پروفایل
  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  // ذخیره داده‌ها در store وقتی دریافت شدن
  useEffect(() => {
    if (data) {
      console.log('✅ Saving user to store:', data);
      setUser(data);
      console.log(csrfToken);
    } else if (error || (isSuccess && !data)) {
      console.log('❌ No user data, clearing store');
      clear();
    }
  }, [data, error, isSuccess, setUser, clear]);

  // لاگ گرفتن از store برای دیباگ
  useEffect(() => {
    if (user) {
      console.log('👤 Current user in store:', {
        id: user.id,
        phoneNumber: user.phoneNumber,
        role: user.role,
        status: user.status,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        email: user.profile?.email,
        avatar: user.profile?.avatar,
      });
    }
    // console.log(document.cookie)
    

  }, [user]);


  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '1rem'
      }}>
        <ClipLoader size={60} color="#3B82F6" />
        <p style={{ color: '#6B7280' }}>در حال اتصال به سرور...</p>
      </div>
    );
  }

  return (
    <>
      {router}
      <ToastContainer 
        position="top-right"
        rtl={true}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
