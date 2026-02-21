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











import React from 'react';
import { Routes ,Route, useRoutes } from "react-router-dom";
import routes from './routes';
import { ToastContainer,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './component/Header';
// import Modal from './component/Modal';
import AuthInit from './features/AuthInit';
import { useUserStore } from './stores/useUserStore';
import { useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

// ایجاد QueryClient با تنظیمات ساده
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

// ساخت یه نمونه axios با timeout بیشتر
const api = axios.create({
  baseURL: 'https://dentist-reyn.onrender.com/api/v1',
  withCredentials: true,
  timeout: 30000, // 30 ثانیه timeout
});

// اینترسپتور برای لاگ
api.interceptors.request.use(request => {
  console.log('🚀 Request:', request.method, request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('✅ Response:', response.status);
    return response;
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      console.log('⏰ Timeout error - server not responding');
    } else {
      console.log('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

console.log('✅ API Created');

// هوک ساده برای گرفتن کاربر
const useFetchUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await api.get('/users/me');
        return response.data;
      } catch (error) {
        // اگه timeout یا 401 باشه، null برگردون (یعنی لاگین نیست)
        if (error.code === 'ECONNABORTED' || error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
  });
};

// هوک ساده برای گرفتن پروفایل
const useFetchProfile = (userId) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
      } catch (error) {
        console.log('Profile fetch error:', error.message);
        return null;
      }
    },
    enabled: !!userId,
  });
};

// کامپوننت وضعیت ساده
function StatusBar() {
  const profile = useUserStore((state) => state.profile);
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#f0f0f0',
      padding: '5px 10px',
      borderRadius: '5px',
      fontSize: '11px',
      zIndex: 9999
    }}>
      {profile ? `👤 ${profile.name}` : '👤 مهمان'}
    </div>
  );
}

// محتوای اصلی
function AppContent() {
  console.log('🔄 App render');
  
  const router = useRoutes(routes);
  const setProfile = useUserStore((state) => state.setProfile);
  
  // گرفتن کاربر
  const { data: user, isLoading: userLoading, error: userError } = useFetchUser();
  
  // گرفتن پروفایل
  const { data: profile, isLoading: profileLoading } = useFetchProfile(user?.id);

  // ذخیره پروفایل
  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  // لودینگ
  if (userLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>در حال بارگذاری...</div>
      </div>
    );
  }

  // خطای timeout - پیشنهاد رفرش
  if (userError?.code === 'ECONNABORTED') {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>⏰</div>
        <div style={{ marginBottom: '20px', color: '#666', textAlign: 'center' }}>
          سرور پاسخ نمیدهد<br />
          ممکن است سرور در حال راه‌اندازی باشد
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: '10px 30px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  // خطای دیگه
  if (userError) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
        خطا: {userError.message}
      </div>
    );
  }

  // اگه کاربر لاگین نیست
  if (user === null) {
    return (
      <>
        {router}
        <ToastContainer />
        <StatusBar />
      </>
    );
  }

  // لودینگ پروفایل
  if (profileLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>در حال بارگذاری پروفایل...</div>
      </div>
    );
  }

  // همه چیز اوکی
  return (
    <>
      {router}
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
      <StatusBar />
    </>
  );
}

// کامپوننت اصلی
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;