// import Button from "../component/Button";
// import Header from "../component/Header";
// import { useUserStore } from "@/stores/useUserStore";

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// // import supabase from '@/api/supabase';
// import Swal from "sweetalert2";

// const schema = z.object({
//   email: z.string().email("ایمیل نامعتبر است"),
//   password: z.string().min(6,"رمز عبور حداقل ۶ کاراکتر باشد"),
//   name: z.string().min(4,"نام و نام خوانوادگی حداقل 4 کاراکتر باشد"),
//   phone: z.string().min(11,"شماره نامعتبر است"),
// });

// export default function RegisterUser() {




//  return(
//     <>
//     <Header />
//     <div className='flex items-center justify-center px-4 py-6 min-h-screen'>
//         <div className='bg-white h-max-content w-[450px] sm:w-[500px] mx-2 mb-16 p-5 xs:p-10 rounded-lg shadow-Main'>
//             <div className='flex items-center justify-between mb-3'>
//                 <h1 className='text-black  text-xl xs:text-2xl text-center'> ثبت نام در سایت </h1>
//                 <div>
//                     <Button href="/" className='text-black font-semibold'>بازگشت</Button>
//                 </div>
//             </div>

//             <form className='space-y-5'>
//                 <div className='space-y-2'>
//                     <label htmlFor="user-email" className='text-gray-400  text-[13px] xs:text-base'>برای استفاده از خدمات ابتدا ثبت نام کنید</label>
                    
//                     <input  type="text" placeholder="نام و خانوادگی" maxLength="" className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 text-sm xs:text-base h-14" />
//                     {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
                    
//                     <input  type="text" placeholder="شماره موبایل" maxLength="" className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 text-sm xs:text-base h-14" />
//                     {/* {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>} */}
                   
//                     <input  type="email" placeholder="YourFuckingEmail@gmail.com"  className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 text-sm xs:text-base h-14" />
//                     {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}
                    
//                     <input  type="password" placeholder="رمز عبور" maxLength="" className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 text-sm xs:text-base h-14" />
//                     {/* {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}
//                 </div>
//                 <div className='space-y-3'>
//                     <Button type="submit"  className='w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12'>ثبت نام</Button>
//                     <div className='text-center child:tracking-tightest'>
//                         <span className='text-base text-zinc-800'>حسابی دارید؟</span>
//                         <Button href="/login" className='text-blue-500'>
//                             ورود
//                         </Button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     </div>
// </>
//  )

// }





// -------------------------------------------------------------------------------------









// src/pages/Register.jsx
// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Swal from "sweetalert2";
// import Button from "../component/Button";
// import Header from "../component/Header";
// import { useUserStore } from "@/stores/useUserStore";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Cookies from "js-cookie";

// // Zod validation schema
// const schema = z.object({
//   email: z.string().email("ایمیل نامعتبر است"),
//   password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
//   name: z.string().min(4, "نام و نام خانوادگی حداقل ۴ کاراکتر باشد"),
//   phone: z.string().min(11, "شماره موبایل نامعتبر است"),
// });

// // ثبت‌نام کاربر
// const registerUser = async (data) => {
//   try {
//     const response = await axios.post("https://dentist-reyn.onrender.com/api/v1/auth/login", data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const { access_token, csrf_token, refresh_token, profile } = response.data;

//     // ذخیره توکن‌ها در کوکی‌ها
//     saveTokensToCookies(access_token, csrf_token, refresh_token);

//     return { profile, access_token, csrf_token, refresh_token };
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "ثبت نام با مشکل مواجه شد.");
//   }
// };

// // ذخیره توکن‌ها در کوکی‌ها
// const saveTokensToCookies = (access_token, csrf_token, refresh_token) => {
//   Cookies.set("access_token", access_token, { secure: true, httpOnly: true });
//   Cookies.set("csrf_token", csrf_token, { secure: true, httpOnly: true });
//   Cookies.set("refresh_token", refresh_token, { secure: true, httpOnly: true });
// };

// export default function RegisterUser() {
//   const { setProfile } = useUserStore(); // استفاده از Zustand برای ذخیره پروفایل کاربر
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const mutation = useMutation({
//     mutationFn: registerUser,  // استفاده از mutationFn به جای mutate
//     onSuccess: (data) => {
//       const { profile, access_token, csrf_token, refresh_token } = data;
//       setProfile(profile, access_token, csrf_token, refresh_token);
//       Swal.fire("ثبت نام با موفقیت انجام شد!");
//     },
//     onError: (err) => {
//       Swal.fire("خطا", err.message, "error");
//     },
//   });

//   const onSubmit = (data) => {
//     mutation.mutate(data); // ارسال داده‌ها با mutate به جای استفاده از mutate مستقیم
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex items-center justify-center px-4 py-6 min-h-screen">
//         <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-black text-xl xs:text-2xl text-center">ثبت نام در سایت</h1>
//             <div>
//               <Button href="/" className="text-black font-semibold">بازگشت</Button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div className="space-y-2">
//               <label htmlFor="name" className="text-gray-400 text-[13px] xs:text-base">نام و نام خانوادگی</label>
//               <input {...register("name")} type="text" placeholder="نام و خانوادگی" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//               <label htmlFor="phone" className="text-gray-400 text-[13px] xs:text-base">شماره موبایل</label>
//               <input {...register("phone")} type="text" placeholder="شماره موبایل" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

//               <label htmlFor="email" className="text-gray-400 text-[13px] xs:text-base">ایمیل</label>
//               <input {...register("email")} type="email" placeholder="ایمیل" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//               <label htmlFor="password" className="text-gray-400 text-[13px] xs:text-base">رمز عبور</label>
//               <input {...register("password")} type="password" placeholder="رمز عبور" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//             </div>

//             <div className="space-y-3">
//               <Button type="submit" className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12" disabled={mutation.isLoading}>
//                 {mutation.isLoading ? "در حال ثبت‌نام..." : "ثبت نام"}
//               </Button>
//               <div className="text-center">
//                 <span className="text-base text-zinc-800">حسابی دارید؟</span>
//                 <Button href="/login" className="text-blue-500">ورود</Button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }











// import React from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Swal from "sweetalert2";
// import Button from "../component/Button";
// import Header from "../component/Header";
// import { useUserStore } from "@/stores/useUserStore";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import Cookies from "js-cookie";

// // Zod validation schema
// const schema = z.object({
//   firstName: z.string().min(1, "نام نمی‌تواند خالی باشد"),
//   lastName: z.string().min(1, "نام خانوادگی نمی‌تواند خالی باشد"),
//   phoneNumber: z.string().min(11, "شماره موبایل نامعتبر است").max(11, "شماره موبایل نامعتبر است"),
//   password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
//   confirmPassword: z.string().min(6, "تایید رمز عبور حداقل ۶ کاراکتر باشد"),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "رمز عبور و تایید رمز عبور باید یکسان باشند",
//   path: ["confirmPassword"],
// });

// // ثبت‌نام کاربر
// const registerUser = async (data) => {
//   try {
//     const payload = {
//       loginMethod: "otp",
//       credentials: {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         phoneNumber: data.phoneNumber,
//         password: data.password,
//         confirmPassword: data.confirmPassword,
//       },
//     };

//     const response = await axios.post("https://dentist-reyn.onrender.com/api/v1/auth/login", payload, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const { access_token, csrf_token, refresh_token, profile } = response.data;

//     // ذخیره توکن‌ها در کوکی‌ها
//     saveTokensToCookies(access_token, csrf_token, refresh_token);

//     return { profile, access_token, csrf_token, refresh_token };
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "ثبت نام با مشکل مواجه شد.");
//   }
// };

// // ذخیره توکن‌ها در کوکی‌ها
// const saveTokensToCookies = (access_token, csrf_token, refresh_token) => {
//   Cookies.set("access_token", access_token, { secure: true, httpOnly: true, expires: 7 });
//   Cookies.set("csrf_token", csrf_token, { secure: true, httpOnly: true, expires: 7 });
//   Cookies.set("refresh_token", refresh_token, { secure: true, httpOnly: true, expires: 7 });
// };

// export default function RegisterUser() {
//   const { setProfile } = useUserStore(); // استفاده از Zustand برای ذخیره پروفایل کاربر
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const mutation = useMutation({
//     mutationFn: registerUser,  // استفاده از mutationFn به جای mutate
//     onSuccess: (data) => {
//       const { profile, access_token, csrf_token, refresh_token } = data;
//       setProfile(profile, access_token, csrf_token, refresh_token);
//       Swal.fire("ثبت نام با موفقیت انجام شد!");
//     },
//     onError: (err) => {
//       Swal.fire("خطا", err.message, "error");
//     },
//   });

//   const onSubmit = (data) => {
//     console.log(data); // بررسی داده‌های فرم
//     mutation.mutate(data); // ارسال داده‌ها با mutate
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex items-center justify-center px-4 py-6 min-h-screen">
//         <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-black text-xl xs:text-2xl text-center">ثبت نام در سایت</h1>
//             <div>
//               <Button href="/" className="text-black font-semibold">بازگشت</Button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div className="space-y-2">
//               <label htmlFor="firstName" className="text-gray-400 text-[13px] xs:text-base">نام</label>
//               <input {...register("firstName")} type="text" placeholder="نام" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

//               <label htmlFor="lastName" className="text-gray-400 text-[13px] xs:text-base">نام خانوادگی</label>
//               <input {...register("lastName")} type="text" placeholder="نام خانوادگی" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

//               <label htmlFor="phoneNumber" className="text-gray-400 text-[13px] xs:text-base">شماره موبایل</label>
//               <input {...register("phoneNumber")} type="text" placeholder="شماره موبایل" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}

//               <label htmlFor="password" className="text-gray-400 text-[13px] xs:text-base">رمز عبور</label>
//               <input {...register("password")} type="password" placeholder="رمز عبور" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//               <label htmlFor="confirmPassword" className="text-gray-400 text-[13px] xs:text-base">تایید رمز عبور</label>
//               <input {...register("confirmPassword")} type="password" placeholder="تایید رمز عبور" className="w-full bg-blue-100 p-2 rounded-md h-14" />
//               {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
//             </div>

//             <div className="space-y-3">
//               <Button type="submit" className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12" disabled={mutation.isLoading}>
//                 {mutation.isLoading ? "در حال ثبت‌نام..." : "ثبت نام"}
//               </Button>
//               <div className="text-center">
//                 <span className="text-base text-zinc-800">حسابی دارید؟</span>
//                 <Button href="/login" className="text-blue-500">ورود</Button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }










// ---------------------------------------------------------------------------------




import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";
import Button from "../component/Button";
import Header from "../component/Header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Zod validation schema
const schema = z.object({
  firstName: z.string().min(1, "نام نمی‌تواند خالی باشد"),
  lastName: z.string().min(1, "نام خانوادگی نمی‌تواند خالی باشد"),
  phoneNumber: z.string().min(11, "شماره موبایل نامعتبر است").max(11, "شماره موبایل نامعتبر است"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
  confirmPassword: z.string().min(6, "تایید رمز عبور حداقل ۶ کاراکتر باشد"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "رمز عبور و تایید رمز عبور باید یکسان باشند",
  path: ["confirmPassword"],
});

// ثبت‌نام اولیه و ارسال OTP
const registerUser = async (data) => {
  const payload = {
    loginMethod: "otp",
    credentials: {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  };

  console.log('Sending payload to server:', JSON.stringify(payload, null, 2));

  const response = await axios.post(
    "https://dentist-reyn.onrender.com/api/v1/auth/login",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data; // شامل پیام موفقیت یا شناسه OTP
};

export default function RegisterUser() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // بررسی موفقیت سرور (مطمئن بشیم که OTP با موفقیت ارسال شده است)
      if (data.code === "OTP_SENT_SUCCESS") {
        Swal.fire("موفقیت!", "کد تایید به شماره شما ارسال شد.", "success");
        // navigate("/verify-otp");  // هدایت به صفحه تایید OTP
        // console.log("Phone number to be sent:", data.credentials.phoneNumber);
        // localStorage.setItem("phone", data.phoneNumber);
        navigate("/verify-otp")
      } else {
        Swal.fire("خطا", "مشکلی در ارسال کد تایید پیش آمده است.", "error");
      }
    },
    onError: (err) => {
        // بررسی ارورهای سرور
        Swal.fire("خطا", err.response?.data?.message || "ثبت نام با مشکل مواجه شد.", "error");
    },
  });

  const onSubmit = (data) => {
    console.log("Phone number to be sent:", data.phoneNumber);
    localStorage.setItem("phone",data.phoneNumber)
    mutation.mutate(data);
  };


  

  return (
    <>
      <Header />
      <div className="flex items-center justify-center px-4 py-6 min-h-screen">
        <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-black text-xl xs:text-2xl text-center">ثبت نام در سایت</h1>
            <div>
              <Button href="/" className="text-black font-semibold">بازگشت</Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-gray-400 text-[13px] xs:text-base">نام</label>
              <input {...register("firstName")} type="text" placeholder="نام" className="w-full bg-blue-100 p-2 rounded-md h-14" />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

              <label htmlFor="lastName" className="text-gray-400 text-[13px] xs:text-base">نام خانوادگی</label>
              <input {...register("lastName")} type="text" placeholder="نام خانوادگی" className="w-full bg-blue-100 p-2 rounded-md h-14" />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

              <label htmlFor="phoneNumber" className="text-gray-400 text-[13px] xs:text-base">شماره موبایل</label>
              <input {...register("phoneNumber")} type="text" placeholder="شماره موبایل" className="w-full bg-blue-100 p-2 rounded-md h-14" />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}

              <label htmlFor="password" className="text-gray-400 text-[13px] xs:text-base">رمز عبور</label>
              <input {...register("password")} type="password" placeholder="رمز عبور" className="w-full bg-blue-100 p-2 rounded-md h-14" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

              <label htmlFor="confirmPassword" className="text-gray-400 text-[13px] xs:text-base">تایید رمز عبور</label>
              <input {...register("confirmPassword")} type="password" placeholder="تایید رمز عبور" className="w-full bg-blue-100 p-2 rounded-md h-14" />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </div>

            <div className="space-y-3">
              <Button type="submit" className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12" disabled={mutation.isLoading}>
                {mutation.isLoading ? "در حال ثبت‌نام..." : "ثبت نام"}
              </Button>
              <div className="text-center">
                <span className="text-base text-zinc-800">حسابی دارید؟</span>
                <Button href="/login" className="text-blue-500">ورود</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}


