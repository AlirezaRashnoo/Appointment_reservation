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


//   // <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//   //   <ClipLoader size={60} color="#36d7b7" />
//   // </div>

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

// export default App















import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './stores/useUserStore';
import { useQuery } from '@tanstack/react-query';
// import supabase from './api/supabase';
import { ClipLoader } from 'react-spinners';
import BeatLoader from 'react-spinners/BeatLoader';

function App() {
 

  const router = useRoutes(routes);

  // نمایش لودینگ در بارگذاری اولیه
  

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


