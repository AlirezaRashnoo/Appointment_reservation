import React from 'react';
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

// تابع دریافت پروفایل
const fetchProfile = async () => {
  console.log('🔍 ===== درخواست به /users/me =====');
  
  try {
    const response = await api.get('/users/me');
    console.log('📨 وضعیت پاسخ:', response.status);
    console.log('📨 هدرهای پاسخ:', response.headers);
    console.log('🍪 Set-Cookie:', response.headers['set-cookie']);
    console.log('✅ کل پاسخ:', response);
    console.log('✅ data:', response.data);
    
    // بررسی ساختار response.data
    console.log('🔍 ساختار response.data:', {
      hasData: !!response.data,
      keys: response.data ? Object.keys(response.data) : [],
      dataField: response.data?.data,
      userField: response.data?.user,
      directData: response.data
    });
    
    // برگرداندن داده با ساختار مناسب
    if (response.data?.data) {
      return response.data.data;
    } else if (response.data?.user) {
      return response.data.user;
    } else if (response.data && typeof response.data === 'object') {
      // اگر خود response.data همان اطلاعات کاربر است
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error('❌ خطا در دریافت پروفایل:', error);
    console.error('❌ response error:', error.response);
    console.error('❌ error data:', error.response?.data);
    
    // اگر خطای 401 باشد، null برگردان (یعنی کاربر لاگین نیست)
    if (error.response?.status === 401) {
      console.log('❌ کوکی معتبر نیست - تاریخ انقضا یا مشکل domain');
      return null;
    }
    
    // برای خطاهای دیگر، throw کن تا react-query متوجه خطا شود
    throw error;
  }
};

function App() {
  const router = useRoutes(routes);
  const setProfile = useUserStore((state) => state.setProfile);
  const profile = useUserStore((state) => state.profile);

  // استفاده از react-query برای دریافت پروفایل
  const { isLoading, error, data, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: false,
  });

  // این useEffect برای ذخیره داده در store وقتی data تغییر می‌کند
  React.useEffect(() => {
    console.log('🔄 data از react-query:', data);
    console.log('🔄 error:', error);
    console.log('🔄 isSuccess:', isSuccess);
    
    if (data) {
      console.log('✅ ذخیره پروفایل در store:', data);
      setProfile(data);
    } else {
      console.log('❌ پاک کردن پروفایل از store');
      setProfile(null);
    }
  }, [data, error, isSuccess, setProfile]);

  // برای دیباگ - لاگ گرفتن از profile در store
  React.useEffect(() => {
    console.log('👤 profile در store:', profile);
  }, [profile]);

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ClipLoader size={60} color="#36d7b7" />
      </div>
    );
  }

  return (
    <>
      
        
          

      {/* دکمه لاگین */}
      {/* {!profile && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{ 
              padding: '10px 30px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            رفتن به صفحه لاگین
          </button>
        </div>
      )} */}

      {/* نمایش خطا اگر وجود داشته باشد */}
      {/* {error && (
        <div style={{ 
          padding: '10px', 
          background: '#f8d7da', 
          color: '#721c24', 
          textAlign: 'center',
          borderBottom: '1px solid #f5c6cb'
        }}>
          خطا در دریافت اطلاعات کاربر: {error.message}
        </div>
      )} */}

      {router}
      <ToastContainer />
    </>
  );
}

export default App;