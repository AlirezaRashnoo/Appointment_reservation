// import React, { useEffect } from 'react';
// import { useRoutes } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import routes from './routes';
// import { useUserStore } from './stores/useUserStore';
// import { ClipLoader } from 'react-spinners';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// // ایجاد یک نمونه از axios با تنظیمات پیش‌فرض
// const api = axios.create({
//   baseURL: 'https://dentist-reyn.onrender.com/api/v1',
//   withCredentials: true,
// });

// // Interceptor برای مدیریت خطای 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // اگر خطای 401 باشه، کاربر رو به لاگین هدایت کن
//     if (error.response?.status === 401) {
//       console.log('❌ Authentication failed, redirecting to login');
//       // window.location.href = '/login';
//     }
    
//     return Promise.reject(error);
//   }
// );

// // تابع دریافت پروفایل کاربر
// const fetchUserProfile = async () => {
//   console.log('🔍 ===== Fetching user profile =====');
  
//   try {
//     const response = await api.get('/users/me');
//     console.log('✅ User profile fetched:', response.data);
    
//     let userData = null;
    
//     if (response.data?.data) {
//       userData = response.data.data;
//     } else if (response.data && typeof response.data === 'object') {
//       userData = response.data;
//     }
    
//     if (!userData) {
//       console.log('❌ No user data found');
//       return null;
//     }
    
//     console.log('👤 User role:', userData.role);
    
//     // اگر کاربر دندانپزشک بود، اطلاعات تخصصی رو بگیر
//     let profileData = null;
//     if (userData.role === 'dentist') {
//       try {
//         const dentistResponse = await api.get('/users/me');
//         console.log('✅ Dentist profile fetched:', dentistResponse.data);
        
//         if (dentistResponse.data?.data) {
//           const fullDentistData = dentistResponse.data.data;
          
//           // استخراج user از داخل دیتای دندانپزشک
//           const nestedUser = fullDentistData.user;
//           const dentistProfile = { ...fullDentistData };
//           delete dentistProfile.user; // حذف user از profile
          
//           // اگر user داخل دیتای دندانپزشک با user اولیه متفاوت بود، آپدیت کن
//           if (nestedUser && nestedUser.id === userData.id) {
//             userData = nestedUser; // استفاده از user کامل‌تر
//           }
          
//           profileData = dentistProfile;
//           console.log('🦷 Extracted dentist profile:', profileData);
//           console.log('👤 Extracted user data:', userData);
//         }
//       } catch (dentistError) {
//         console.error('❌ Error fetching dentist profile:', dentistError);
//         if (dentistError.response?.status === 404) {
//           console.log('ℹ️ Dentist profile not completed yet');
//         }
//       }
//     }
    
//     return {
//       user: userData,
//       profile: profileData
//     };
    
//   } catch (error) {
//     console.error('❌ Error fetching profile:', error);
//     if (error.response?.status === 401) {
//       return null;
//     }
//     throw error;
//   }
// };

// function App() {
//   const router = useRoutes(routes);
//   const setUser = useUserStore((state) => state.setUser);
//   const setProfile = useUserStore((state) => state.setProfile);
//   const clear = useUserStore((state) => state.clear);
//   const user = useUserStore((state) => state.user);
//   const profile = useUserStore((state) => state.profile);

//   // استفاده از react-query برای دریافت پروفایل
//   const { isLoading, error, data, isSuccess } = useQuery({
//     queryKey: ['userProfile'],
//     queryFn: fetchUserProfile,
//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//     retry: 1,
//     retryDelay: 1000,
//     refetchOnWindowFocus: false,
//   });

//   // ذخیره داده‌ها در store وقتی دریافت شدن
//   useEffect(() => {
//     console.log('🔄 Query state:', { data, error, isSuccess });
    
//     if (data && data.user) {
//       // اگر داده دریافت شد، در store ذخیره کن
//       console.log('✅ Saving user to store:', data.user);
//       console.log('✅ Saving profile to store:', data.profile);
      
//       setUser(data.user);
//       setProfile(data.profile);
//     } else if (error) {
//       // اگر خطا داشتیم، store رو پاک کن
//       console.log('❌ Error fetching profile, clearing store');
//       clear();
//     } else if (isSuccess && !data) {
//       // اگر درخواست موفق بود ولی داده‌ای نبود (کاربر لاگین نیست)
//       console.log('❌ No data received, user not logged in');
//       clear();
//     }
//   }, [data, error, isSuccess, setUser, setProfile, clear]);

//   // برای دیباگ - لاگ گرفتن از store
//   useEffect(() => {
//     console.log(user);
    
//     if (user) {
//       console.log('👤 Current user in store:', {
//         id: user.id,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         status: user.status
//       });
//     }
//     if (profile) {
//       console.log('👤 Current profile in store:', {
//         userId: profile.userId,
//         medicalCouncilNumber: profile.medicalCouncilNumber,
//         // degree: profile.degree,
//         yearsOfExperience: profile.yearsOfExperience
//       });
//     }
//   }, [user, profile]);

//   // if (isLoading) {
//   //   return (
//   //     <div style={{ 
//   //       height: '100vh', 
//   //       display: 'flex', 
//   //       flexDirection: 'column',
//   //       justifyContent: 'center', 
//   //       alignItems: 'center',
//   //       gap: '1rem'
//   //     }}>
//   //       <ClipLoader size={60} color="#3B82F6" />
//   //       <p style={{ color: '#6B7280' }}>در حال اتصال به سرور...</p>
//   //     </div>
//   //   );
//   // }

//   return (
//     <>
//       {router}
//       <ToastContainer 
//         position="top-right"
//         rtl={true}
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//     </>
//   );
// }

// export default App;










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
