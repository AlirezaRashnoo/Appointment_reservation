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
import { useRoutes } from "react-router-dom";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './component/Header';
// import Modal from './component/Modal';
import routes from './routes';

import { useUserStore } from './stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

// API Service برای گرفتن پروفایل (بدون نیاز به ارسال توکن دستی)
const fetchProfile = async () => {
  const response = await fetch('https://dentist-reyn.onrender.com/api/v1/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // برای ارسال کوکی‌ها با درخواست (اگر کوکی‌ها تنظیم شده باشد)
  });

  if (!response.ok) {
    throw new Error('Error fetching profile');
  }
  return response.json();
};

function App() {
  const router = useRoutes(routes);
  const setProfile = useUserStore((state) => state.setProfile);

  // استفاده از React Query برای گرفتن پروفایل کاربر
  const { data, error, isLoading } = useQuery({
    queryKey: ['profile'],  // استفاده از queryKey
    queryFn: fetchProfile,  // استفاده از queryFn برای ارسال درخواست
    onSuccess: (profile) => {
      if (profile) {
        setProfile(profile);  // ذخیره پروفایل در وضعیت global
      }
    },
  });

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ClipLoader size={60} color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

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
    </>
  );
}

export default App;