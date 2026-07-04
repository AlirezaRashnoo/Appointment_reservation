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

  return response.data; 
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


