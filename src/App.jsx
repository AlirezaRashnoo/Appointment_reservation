// import React from 'react';
// import { Routes ,Route,useRoutes } from "react-router-dom";
// import routes from './routes';
// import { ToastContainer,Bounce} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// // import Home from './pages/Home';
// import Header from './component/Header';
// import Modal from './component/Modal';
// import AuthInit from './features/AuthInit';
// import { useUserStore } from './stores/useUserStore';
// import { useEffect } from 'react';
// import supabase from './api/supabase';

// function App() {
//   let router = useRoutes(routes)

//   const setProfile = useUserStore((state) => state.setProfile);


//   <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//     <ClipLoader size={60} color="#36d7b7" />
//   </div>

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (user) {
//         const { data } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("user_id", user.id)
//           .single();
//         if (data) setProfile(data);
//       }
//     };

//     fetchUser();
//   }, []);
  
//   return(
//     <>
//     {/* <AuthInit /> */}
//     {router}
//     <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//     />
//     </>
//   )

// }

// export default App;















// import React from 'react';
// import { useRoutes } from 'react-router-dom';
// import routes from './routes';
// import { ToastContainer, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useUserStore } from './stores/useUserStore';
// import { useQuery } from '@tanstack/react-query';
// // import supabase from './api/supabase';
// import { ClipLoader } from 'react-spinners';
// import BeatLoader from 'react-spinners/BeatLoader';

// function App() {
 

//   const router = useRoutes(routes);

//   // نمایش لودینگ در بارگذاری اولیه
  

//   return (
//     <>
//       {router}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//     </>
//   );
// }

// export default App;









// import React from 'react';
// import { Routes ,Route, useRoutes } from "react-router-dom";
// import routes from './routes';
// import { ToastContainer,Bounce} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'
// import Header from './component/Header';
// // import Modal from './component/Modal';
// import AuthInit from './features/AuthInit';
// import { useUserStore } from './stores/useUserStore';
// import { useEffect } from 'react';
// import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import axios from 'axios';

// // ایجاد QueryClient
// const queryClient = new QueryClient();

// // ساخت یه نمونه axios
// const api = axios.create({
//   baseURL: 'https://dentist-reyn.onrender.com/api/v1/users/me' // آدرس API خودتو بذار اینجا
// });

// // هوک ساده برای گرفتن پروفایل
// const useFetchProfile = (userId) => {
//   return useQuery({
//     queryKey: ['profile', userId],
//     queryFn: async () => {
//       if (!userId) return null;
//       const response = await api.get(`/profiles/${userId}`);
//       return response.data;
//     },
//     enabled: !!userId, // فقط وقتی userId هست اجرا کن
//   });
// };

// // هوک ساده برای گرفتن کاربر
// const useFetchUser = () => {
//   return useQuery({
//     queryKey: ['user'],
//     queryFn: async () => {
//       const token = localStorage.getItem('token');
//       if (!token) return null;
      
//       const response = await api.get('/auth/user', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return response.data;
//     },
//   });
// };

// // محتوای اصلی
// function AppContent() {
//   const router = useRoutes(routes);
//   const setProfile = useUserStore((state) => state.setProfile);
  
  
//   // گرفتن کاربر
//   const { data: user, isLoading: userLoading } = useFetchUser();
  
//   // گرفتن پروفایل
//   const { data: profile, isLoading: profileLoading } = useFetchProfile(user?.id);

//   // وقتی پروفایل اومد، توی store ذخیره کن
//   useEffect(() => {
//     if (profile) {
//       setProfile(profile);
//       console.log(profile);
//     }
//   }, [profile, setProfile]);

//   // لودینگ
//   if (userLoading || profileLoading) {
//     return (
//       <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <div>در حال بارگذاری...</div>
//       </div>
//     );
//   }
  
//   return (
//     <>
//       {router}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//     </>
//   );
// }

// // کامپوننت اصلی
// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <AppContent />
//     </QueryClientProvider>
//   );
// }

// export default App;











// import React from 'react';
// import { useRoutes } from "react-router-dom";
// import { ToastContainer, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Header from './component/Header';
// // import Modal from './component/Modal';
// import routes from './routes';

// import { useUserStore } from './stores/useUserStore';
// import { useQuery } from '@tanstack/react-query';
// import { ClipLoader } from 'react-spinners';

// // API Service برای گرفتن پروفایل (بدون نیاز به ارسال توکن دستی)
// const fetchProfile = async () => {
//   const response = await fetch('https://dentist-reyn.onrender.com/api/v1/users/me', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include', // برای ارسال کوکی‌ها با درخواست (اگر کوکی‌ها تنظیم شده باشد)
//   });

//   if (!response.ok) {
//     throw new Error('Error fetching profile');
//   }
//   return response.json();
// };

// function App() {
//   const router = useRoutes(routes);
//   const setProfile = useUserStore((state) => state.setProfile);

//   // استفاده از React Query برای گرفتن پروفایل کاربر
//   const { data, error, isLoading } = useQuery({
//     queryKey: ['profile'],  // استفاده از queryKey
//     queryFn: fetchProfile,  // استفاده از queryFn برای ارسال درخواست
//     onSuccess: (profile) => {
//       if (profile) {
//         setProfile(profile);  // ذخیره پروفایل در وضعیت global
//       }
//     },
//   });

//   if (isLoading) {
//     return (
//       <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <ClipLoader size={60} color="#36d7b7" />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error loading profile: {error.message}</div>;
//   }

//   return (
//     <>
//       {router}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//     </>
//   );
// }

// export default App;











// import React from 'react';
// import { useRoutes } from "react-router-dom";
// import { ToastContainer, Bounce } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import routes from './routes';
// import { useUserStore } from './stores/useUserStore';
// import { useQuery } from '@tanstack/react-query';
// import { ClipLoader } from 'react-spinners';

// // تابع ساده برای گرفتن اطلاعات کاربر از API
// const fetchUserProfile = async () => {
//   const response = await fetch('https://dentist-reyn.onrender.com/api/v1/users/me', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include', // این خط مهم است: باعث می‌شود کوکی به طور خودکار ارسال شود
//   });

//   // اگر خطای 401 (Unauthorized) برگردد، یعنی کاربر لاگین نیست.
//   // در این حالت ما null برمی‌گردانیم تا برنامه بداند کاربر مهمان است.
//   if (response.status === 401) {
//     console.log('👤 کاربر لاگین نیست (401)');
//     return null;
//   }

//   // اگر خطای دیگری رخ داد، آن را پرتاب می‌کنیم تا توسط React Query مدیریت شود.
//   if (!response.ok) {
//     throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
//   }

//   // اگر همه چیز خوب بود، اطلاعات کاربر را برگردان.
//   return response.json();
// };

// function App() {
//   const router = useRoutes(routes);
//   const setProfile = useUserStore((state) => state.setProfile);

//   // استفاده از React Query برای مدیریت وضعیت درخواست
//   const { data: user, isLoading, error } = useQuery({
//     queryKey: ['currentUser'], // کلید یکتا برای این درخواست
//     queryFn: fetchUserProfile, // تابعی که درخواست را انجام می‌دهد
//     onSuccess: (data) => {
//       // اگر داده‌ای برگشت (یعنی کاربر لاگین بود)، آن را در store ذخیره کن
//       if (data) {
//         setProfile(data);
//         console.log('✅ پروفایل کاربر ذخیره شد:', data);
//       } else {
//         // اگر null برگشت (یعنی 401 دریافت شد)، پروفایل را پاک کن
//         setProfile(null);
//       }
//     },
//     retry: false, // برای خطاهای 401 نیازی به تلاش مجدد نیست
//     refetchOnWindowFocus: false, // اختیاری: برای بهبود کارایی
//   });

//   // نمایش لودینگ
//   if (isLoading) {
//     return (
//       <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <ClipLoader size={60} color="#36d7b7" />
//       </div>
//     );
//   }

//   // نمایش خطاهای پیش‌بینی نشده (نه 401)
//   if (error) {
//     return (
//       <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
//         خطا در ارتباط با سرور: {error.message}
//       </div>
//     );
//   }

//   // رندر اصلی اپلیکیشن
//   return (
//     <>
//       {router}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//     </>
//   );
// }

// export default App;



















import React from 'react';
import { useRoutes } from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import { useUserStore } from './stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

// تابع ساده برای گرفتن اطلاعات کاربر از API
const fetchUserProfile = async () => {
  const response = await fetch('https://dentist-reyn.onrender.com/api/v1/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (response.status === 401) {
    console.log('👤 کاربر لاگین نیست (401)');
    return null;
  }

  if (!response.ok) {
    throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
  }

  return response.json();
};

function App() {
  const router = useRoutes(routes);
  const setProfile = useUserStore((state) => state.setProfile);
  const profile = useUserStore((state) => state.profile);

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchUserProfile,
    onSuccess: (data) => {
      if (data) {
        setProfile(data);
        console.log('✅ پروفایل کاربر ذخیره شد:', data);
      } else {
        setProfile(null);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // نمایش لودینگ
  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ClipLoader size={60} color="#36d7b7" />
      </div>
    );
  }

  // رندر اصلی اپلیکیشن
  return (
    <>
      {/* نوار وضعیت کاربر در بالای صفحه */}
      <div style={{
        background: '#f8f9fa',
        padding: '10px 20px',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        direction: 'rtl'
      }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold' }}>وضعیت:</span>
          
          {error ? (
            // نمایش خطا
            <span style={{ color: '#dc3545', background: '#f8d7da', padding: '5px 10px', borderRadius: '4px' }}>
              ❌ خطا: {error.message}
            </span>
          ) : profile ? (
            // نمایش اطلاعات کاربر
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: '#28a745', background: '#d4edda', padding: '5px 10px', borderRadius: '4px' }}>
                ✅ کاربر لاگین شده
              </span>
              <span>👤 نام: {profile.name || profile.full_name || 'نامشخص'}</span>
              <span>📧 ایمیل: {profile.email}</span>
              {profile.role && <span>🔰 نقش: {profile.role}</span>}
              {profile.id && <span>🆔 آیدی: {profile.id}</span>}
            </div>
          ) : (
            // نمایش کاربر مهمان
            <span style={{ color: '#6c757d', background: '#e2e3e5', padding: '5px 10px', borderRadius: '4px' }}>
              👤 کاربر مهمان (لاگین نشده)
            </span>
          )}
        </div>
        
        {/* دکمه رفرش برای تست */}
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '5px 15px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔄 رفرش صفحه
        </button>
      </div>

      {/* محتوای اصلی */}
      {router}

      {/* خطا رو همچنین می‌تونیم وسط صفحه هم نشون بدیم */}
      {error && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: '1px solid #dc3545'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>❌</div>
          <h3 style={{ color: '#dc3545', marginBottom: '10px' }}>خطا در دریافت اطلاعات</h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 30px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            تلاش مجدد
          </button>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;