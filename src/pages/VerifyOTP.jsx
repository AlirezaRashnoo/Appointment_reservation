// import React, { useEffect } from "react";
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
// import { useLocation } from "react-router-dom";

// // Zod validation schema
// const schema = z.object({
//   otpCode: z.string().min(6, "کد تایید باید ۶ رقمی باشد").max(6, "کد تایید باید ۶ رقمی باشد"),
// });

// const verifyOTP = async (data) => {
//   try {
//     const payload = {
//       phoneNumber: data.phoneNumber,  // شماره تلفن به عنوان داده برای تایید
//       otp: data.otpCode,
//     };

//     console.log("Sending otp payload:", JSON.stringify(payload, null, 2));

//     const response = await axios.post("https://dentist-reyn.onrender.com/api/v1/auth/verify-otp", payload, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const { access_token, csrf_token, refresh_token, profile } = response.data;

//     // ذخیره توکن‌ها در کوکی‌ها
//     saveTokensToCookies(access_token, csrf_token, refresh_token);

//     return { profile, access_token, csrf_token, refresh_token };
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "تایید کد با مشکل مواجه شد.");
//   }
// };

// const saveTokensToCookies = (access_token, csrf_token, refresh_token) => {
//   Cookies.set("access_token", access_token, { secure: true, httpOnly: true, expires: 7 });
//   Cookies.set("csrf_token", csrf_token, { secure: true, httpOnly: true, expires: 7 });
//   Cookies.set("refresh_token", refresh_token, { secure: true, httpOnly: true, expires: 7 });
// };

// export default function VerifyOTP() {
//   const { setProfile } = useUserStore(); // استفاده از Zustand برای ذخیره پروفایل کاربر
//   const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const location = useLocation();

//   // بارگذاری phoneNumber از location.state و قرار دادن آن در فرم
//   useEffect(() => {
//     if (location.state && location.state.phoneNumber) {
//       setValue("phoneNumber", location.state.phoneNumber);
//     }
//   }, [location, setValue]);

//   const mutation = useMutation({
//     mutationFn: verifyOTP,
//     onSuccess: (data) => {
//       const { profile, access_token, csrf_token, refresh_token } = data;
//       setProfile(profile, access_token, csrf_token, refresh_token);
//       Swal.fire("کد تایید با موفقیت انجام شد!");
//     },
//     onError: (error) => {
//       console.log("Error response:", error.response?.data || error);
//       Swal.fire("خطا", error.message || "تایید کد با مشکل مواجه شد.", "error");
//     },
//   });

//   const onSubmit = (data) => {
//     console.log('Form data:', data); // نمایش داده‌ها برای بررسی

//     // در اینجا از داده‌های موجود در فرم استفاده می‌کنیم
//     mutation.mutate(data);
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex items-center justify-center px-4 py-6 min-h-screen">
//         <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-black text-xl xs:text-2xl text-center">تایید کد OTP</h1>
//             <div>
//               <Button href="/" className="text-black font-semibold">بازگشت</Button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div className="space-y-2">
//               <label htmlFor="otpCode" className="text-gray-400 text-[13px] xs:text-base">کد تایید</label>
//               <input
//                 {...register("otpCode")}
//                 type="text"
//                 placeholder="کد تایید"
//                 className="w-full bg-blue-100 p-2 rounded-md h-14"
//               />
//               {errors.otpCode && <p className="text-red-500 text-sm">{errors.otpCode.message}</p>}
//             </div>

//             {/* فیلد مخفی برای ذخیره phoneNumber */}
//             <input type="hidden" {...register("phoneNumber")} />

//             <div className="space-y-3">
//               <Button
//                 type="submit"
//                 className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12"
//                 disabled={mutation.isLoading}
//               >
//                 {mutation.isLoading ? "در حال تایید..." : "تایید کد"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }





// ------------------------------------------------------------------------------




// import React, { useEffect } from "react";
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
// import { useLocation } from "react-router-dom";

// // Zod validation schema
// const schema = z.object({
//   otpCode: z.string().min(6, "کد تایید باید ۶ رقمی باشد").max(6, "کد تایید باید ۶ رقمی باشد"),
// });

// const verifyOTP = async (data) => {
//   try {
//     const payload = {
//       phoneNumber: data.phoneNumber,  // شماره تلفن به عنوان داده برای تایید
//       otp: data.otpCode,
//     };

//     console.log("Sending otp payload:", JSON.stringify(payload, null, 2));

//     const response = await axios.post("https://dentist-reyn.onrender.com/api/v1/auth/verify-otp", payload, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const { access_token, csrf_token, refresh_token, profile } = response.data;

//     // ذخیره توکن‌ها در کوکی‌ها
//     saveTokensToCookies(access_token, csrf_token, refresh_token);

//     return { profile, access_token, csrf_token, refresh_token };
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "تایید کد با مشکل مواجه شد.");
//   }
// };

// const saveTokensToCookies = (access_token, csrf_token, refresh_token) => {
//   Cookies.set("access_token", access_token, { secure: true, httpOnly: true, expires: 7 });
//   Cookies.set("csrf_token", csrf_token, { secure: true, httpOnly: true, expires: 7 });
//   Cookies.set("refresh_token", refresh_token, { secure: true, httpOnly: true, expires: 7 });
// };

// export default function VerifyOTP() {
//   const { setProfile } = useUserStore(); // استفاده از Zustand برای ذخیره پروفایل کاربر
//   const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
//     resolver: zodResolver(schema),
//   });

//   const location = useLocation();

//   // بارگذاری phoneNumber از location.state و قرار دادن آن در فرم
//   useEffect(() => {
//     if (location.state && location.state.phoneNumber) {
//       setValue("phoneNumber", location.state.phoneNumber); // تنظیم شماره موبایل در فرم
//     }
//   }, [location, setValue]);

//   const mutation = useMutation({
//     mutationFn: verifyOTP,
//     onSuccess: (data) => {
//       const { profile, access_token, csrf_token, refresh_token } = data;
//       setProfile(profile, access_token, csrf_token, refresh_token);
//       Swal.fire("کد تایید با موفقیت انجام شد!");
//     },
//     onError: (error) => {
//       console.log("Error response:", error.response?.data || error);
//       Swal.fire("خطا", error.message || "تایید کد با مشکل مواجه شد.", "error");
//     },
//   });

//   const onSubmit = (data) => {
//     // چک کردن اینکه آیا phoneNumber به درستی موجود است
//     const phoneNumber = getValues("phoneNumber");
//     if (!phoneNumber) {
//       Swal.fire("خطا", "شماره موبایل ضروری است", "error");
//       return;
//     }

//     // ارسال داده‌ها با phoneNumber
//     console.log('Form data:', data);
//     mutation.mutate(data);
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex items-center justify-center px-4 py-6 min-h-screen">
//         <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-black text-xl xs:text-2xl text-center">تایید کد OTP</h1>
//             <div>
//               <Button href="/" className="text-black font-semibold">بازگشت</Button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div className="space-y-2">
//               <label htmlFor="otpCode" className="text-gray-400 text-[13px] xs:text-base">کد تایید</label>
//               <input
//                 {...register("otpCode")}
//                 type="text"
//                 placeholder="کد تایید"
//                 className="w-full bg-blue-100 p-2 rounded-md h-14"
//               />
//               {errors.otpCode && <p className="text-red-500 text-sm">{errors.otpCode.message}</p>}
//             </div>

//             {/* فیلد مخفی برای ذخیره phoneNumber */}
//             <input type="hidden" {...register("phoneNumber")} />

//             <div className="space-y-3">
//               <Button
//                 type="submit"
//                 className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12"
//                 disabled={mutation.isLoading}
//               >
//                 {mutation.isLoading ? "در حال تایید..." : "تایید کد"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }



// ------------------------------------------------------------------------------







// import React, { useEffect } from "react";
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
// import { useLocation } from "react-router-dom";

// // Zod validation schema
// const schema = z.object({
//   otpCode: z.string().min(6, "کد تایید باید ۶ رقمی باشد").max(6, "کد تایید باید ۶ رقمی باشد"),
// });



// const verifyOTP = async (data) => {
//   try {
//     const payload = {
//       phoneNumber: localStorage.getItem("phone"),  // شماره تلفن به عنوان داده برای تایید
//       otp: data.otpCode,
//     };

//     console.log("Sending otp payload:", JSON.stringify(payload, null, 2));

//     const response = await axios.post("https://dentist-reyn.onrender.com/api/v1/auth/verify-otp", payload, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     // چاپ پاسخ سرور برای بررسی توکن‌ها
//     console.log("Full Response from Server:", response);

//     // const { access_token, csrf_token, refresh_token, profile } = response.data;

//     // برگشت پاسخ بدون ذخیره کوکی‌ها
//     return { profile, access_token, csrf_token, refresh_token };
//   } catch (error) {
//     console.error("Error during OTP verification:", error);
//     throw new Error(error.response?.data?.message || "تایید کد با مشکل مواجه شد.");
//   }
// };


// // const saveTokensToCookies = (access_token, csrf_token, refresh_token) => {
// //   Cookies.set("access_token", access_token, { secure: true, httpOnly: true, expires: 7 });
// //   Cookies.set("csrf_token", csrf_token, { secure: true, httpOnly: true, expires: 7 });
// //   Cookies.set("refresh_token", refresh_token, { secure: true, httpOnly: true, expires: 7 });
// // };

// export default function VerifyOTP() {
//   const { setProfile } = useUserStore(); // استفاده از Zustand برای ذخیره پروفایل کاربر
//   const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
//     resolver: zodResolver(schema),
//   });

  

//   useEffect(() => {
    
//       console.log(localStorage.getItem("phone"));
    
//   }, []);

//   const mutation = useMutation({
//     mutationFn: verifyOTP,
//     onSuccess: (data) => {
//       // const { profile, access_token, csrf_token, refresh_token } = data;
//       // setProfile(profile, access_token, csrf_token, refresh_token);
//       console.log(data);
//       Swal.fire("کد تایید با موفقیت انجام شد!");
//     },
//     onError: (error) => {
//       console.log("Error response:", error.response?.data || error);
//       Swal.fire("خطا", error.message || "تایید کد با مشکل مواجه شد.", "error");
//     },
//   });

//   const onSubmit = (data) => {
//     // ارسال داده‌ها با phoneNumber
//     // if (!phoneNumberFromLocation) {
//     //   Swal.fire("خطا", "شماره موبایل ضروری است", "error");
//     //   return;
//     // }

//     // data.phoneNumber = phoneNumberFromLocation; // شماره تلفن را از location.state می‌گیریم
//     // console.log('Form data:', data); 
//     mutation.mutate(data);
//   };

//   return (
//     <>
//       <Header />
//       <div className="flex items-center justify-center px-4 py-6 min-h-screen">
//         <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-black text-xl xs:text-2xl text-center">تایید کد OTP</h1>
//             <div>
//               <Button href="/" className="text-black font-semibold">بازگشت</Button>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//             <div className="space-y-2">
//               <label htmlFor="otpCode" className="text-gray-400 text-[13px] xs:text-base">کد تایید</label>
//               <input
//                 {...register("otpCode")}
//                 type="text"
//                 placeholder="کد تایید"
//                 className="w-full bg-blue-100 p-2 rounded-md h-14"
//               />
//               {errors.otpCode && <p className="text-red-500 text-sm">{errors.otpCode.message}</p>}
//             </div>

//             <div className="space-y-3">
//               <Button
//                 type="submit"
//                 className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12"
//                 disabled={mutation.isLoading}
//               >
//                 {mutation.isLoading ? "در حال تایید..." : "تایید کد"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }




















import React, { useEffect } from "react";
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
  otpCode: z.string().min(6, "کد تایید باید ۶ رقمی باشد").max(6, "کد تایید باید ۶ رقمی باشد"),
});

const navigate = useNavigate();

// ارسال OTP به سرور
const verifyOTP = async (data) => {
  try {
    const payload = {
      phoneNumber: localStorage.getItem("phone"),  // شماره تلفن از LocalStorage
      otp: data.otpCode,
    };

    console.log("Sending otp payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post("https://dentist-reyn.onrender.com/api/v1/auth/verify-otp", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // چاپ پاسخ کامل از سرور برای بررسی نتیجه
    console.log("Full Response from Server:", response);

    // در اینجا فقط پاسخ دریافتی را برمی‌گردانیم
    return response.data;
  } catch (error) {
    console.error("Error during OTP verification:", error);
    throw new Error(error.response?.data?.message || "تایید کد با مشکل مواجه شد.");
  }
};

export default function VerifyOTP() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  // ارسال OTP به سرور و دریافت پاسخ
  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      // در اینجا فقط داده‌هایی که از سرور می‌آید نمایش داده می‌شود
      console.log("Server Response:", data);
      Swal.fire("کد تایید با موفقیت انجام شد!");
      navigate("/")
    },
    onError: (error) => {
      console.log("Error response:", error.response?.data || error);
      Swal.fire("خطا", error.message || "تایید کد با مشکل مواجه شد.", "error");
    },
  });

  // ارسال داده‌ها به سرور برای تایید OTP
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center px-4 py-6 min-h-screen">
        <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-black text-xl xs:text-2xl text-center">تایید کد OTP</h1>
            <div>
              <Button href="/register" className="text-black font-semibold">بازگشت</Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="otpCode" className="text-gray-400 text-[13px] xs:text-base">کد تایید</label>
              <input
                {...register("otpCode")}
                type="text"
                placeholder="کد تایید"
                className="w-full bg-blue-100 p-2 rounded-md h-14"
              />
              {errors.otpCode && <p className="text-red-500 text-sm">{errors.otpCode.message}</p>}
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "در حال تایید..." : "تایید کد"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

