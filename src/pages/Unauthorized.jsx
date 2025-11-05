// pages/Unauthorized.jsx
// import React from "react";
// import Button from "../component/Button";

// export default function Unauthorized() {
//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-4">دسترسی غیرمجاز</h1>
//         <p className="mb-6">شما اجازه دسترسی به این صفحه را ندارید.</p>
//         <Button href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
//           بازگشت به صفحه اصلی
//         </Button>
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-sky-700 px-4">
      <h1 className="text-[100px] font-extrabold tracking-wide text-sky-600 drop-shadow-sm mb-5 pb-8">
        404
      </h1>

      <p className="text-xl font-semibold mt-2 mb-4 text-sky-700">
        صفحه‌ای که دنبالش هستید پیدا نشد
      </p>
      <p className="text-center max-w-md text-sky-600 mb-8">
        ممکنه آدرس رو اشتباه وارد کرده باشید یا صفحه حذف شده باشه.
      </p>

      <button
        onClick={() => navigate('/')}
        className="bg-sky-400 hover:bg-sky-500 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition duration-300"
      >
        بازگشت به خانه
      </button>
    </div>
  );
};

export default NotFound;