import React, { useEffect } from 'react';
import { useRoutes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import { useUserStore } from './stores/useUserStore';
import { ClipLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

// ---------------------
// Axios instance
// ---------------------
const api = axios.create({
  baseURL: 'https://dentist-reyn.onrender.com/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('❌ Authentication failed');
    }

    return Promise.reject(error);
  }
);

// ---------------------
// Fetch User Profile
// ---------------------
const fetchUserProfile = async () => {
  console.log('🔍 Fetching user profile');

  try {
    const response = await api.get('/users/me');

    console.log(
      '✅ User profile fetched:',
      response.data
    );

    return response.data?.data ?? null;

  } catch (error) {

    console.error(
      '❌ Error fetching profile:',
      error
    );

    if (error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};

// ---------------------
// Fetch CSRF Token
// ---------------------
const fetchCsrfToken = async () => {
  try {
    const response = await api.get('/auth/csrf-token');
    
    const token = response.data?.data?.csrfToken; // 👈 دقیقا از data گرفته میشه
    
    if (token) {
      console.log('🔐 New CSRF token fetched:', token);
      return token;
    }

    return null;
  } catch (error) {
    console.error('❌ Error fetching CSRF token:', error);
    return null;
  }
};

function App() {
  const router = useRoutes(routes);

  const setUser = useUserStore(
    (state) => state.setUser
  );

  const clear = useUserStore(
    (state) => state.clear
  );

  const setCsrfToken = useUserStore(
    (state) => state.setCsrfToken
  );

  const user = useUserStore(
    (state) => state.user
  );

  // ---------------------
  // User Query
  // ---------------------
  const {
    isLoading,
    error,
    data,
    isSuccess
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  // ---------------------
  // Save User
  // ---------------------
  useEffect(() => {

    if (data) {

      console.log(
        '✅ Saving user to store:',
        data
      );

      setUser(data);

    } else if (
      error ||
      (isSuccess && !data)
    ) {

      console.log(
        '❌ No user data'
      );

      clear();
    }

  }, [
    data,
    error,
    isSuccess,
    setUser,
    clear
  ]);

  // ---------------------
  // CSRF Management
  // ---------------------
  useEffect(() => {
  const initCsrf = async () => {
    const csrf = Cookies.get('csrf_token');
    if (csrf) {
      setCsrfToken(csrf);
      return;
    }

    const newToken = await fetchCsrfToken();
    if (newToken) {
      setCsrfToken(newToken);
      Cookies.set('csrf_token', newToken, { path: '/', expires: 1/24 });
      console.log(Cookies.set('csrf_token', newToken, { path: '/', expires: 1/24 }));
      
    }
  };

  if (user) initCsrf();
}, [user, setCsrfToken]);

  // ---------------------
  // Loader
  // ---------------------
  // if (isLoading) {

  //   return (

  //     <div
  //       style={{
  //         height: '100vh',
  //         display: 'flex',
  //         flexDirection: 'column',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         gap: '1rem'
  //       }}
  //     >

  //       <ClipLoader
  //         size={60}
  //         color="#3B82F6"
  //       />

  //       <p
  //         style={{
  //           color: '#6B7280'
  //         }}
  //       >
  //         در حال اتصال به سرور...
  //       </p>

  //     </div>
  //   );
  // }
  return (
    <>
      {router}
      <ToastContainer
        position="top-right"
        rtl
        autoClose={3000}
        theme="light"
      />
    </>
  );
}

export default App;
