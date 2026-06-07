
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "@/component/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/useUserStore";


/* =====================
   Validation Schema
===================== */
const schema = z.object({
  phoneNumber: z
    .string()
    .length(11, "شماره موبایل باید ۱۱ رقم باشد")
    .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

/* =====================
   API Call
===================== */
const loginUser = async (data) => {
  const payload = {
    loginMethod: "local",
    credentials: {
      phoneNumber: data.phoneNumber,
      password: data.password,
    },
  };

  console.log("📤 Login payload:", payload);

  const response = await axios.post(
    "https://dentist-reyn.onrender.com/api/v1/auth/login",
    payload,
    { 
      headers: { "Content-Type": "application/json" },
      withCredentials: true // همچنان نگهش میداریم شاید بعداً درست شد
    }
  );

  console.log("📨 Response headers:", response.headers);
  console.log("📦 Response body:", response.data);

  // ========== ذخیره توکن از هر جایی که هست ==========
  
 

  return response.data;
};












/* ===================== 
   Component
===================== */
export default function Login() {
  const navigate = useNavigate();
  const setCsrfToken = useUserStore((state) => state.setCsrfToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    





// داخل onSuccess mutation
onSuccess: (data) => {
  console.log("✅ Login successful:", data);

  // ذخیره csrf توکن
  const csrfToken = data?.data?.csrfToken;

  if (csrfToken) {
    // ذخیره در state (اختیاری)
    setCsrfToken(csrfToken);

    // ذخیره در کوکی
    // Cookies.set("csrf_token", csrfToken, {
    //   expires: 1, // 1 روز اعتبار
    //   secure: true, // فقط https
    //   sameSite: "Strict", // جلوگیری از CSRF
    // });
    Cookies.set('csrf_token', csrfToken, { path: '/', expires: 1/24 });

  }

  Swal.fire({
    icon: "success",
    title: "موفق",
    text: "ورود با موفقیت انجام شد",
    timer: 1500,
    showConfirmButton: false
  });
  setTimeout(() => {
    // navigate("/");
    window.location="/";
  }, 1000);
  
},


   





    
    onError: (error) => {
      console.log("❌ Login error:", error.response?.data || error.message);
      
      Swal.fire(
        "خطا",
        error.response?.data?.message || "اطلاعات ورود نادرست است",
        "error"
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center px-4 py-6 min-h-screen">
      <div className="bg-white max-w-[500px] w-full mx-2 mb-16 p-5 xs:p-10 rounded-lg shadow-Main">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-black text-xl xs:text-2xl">ورود به سایت</h1>
          <Button href="/" className="text-black font-semibold">
            بازگشت
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-gray-400 text-sm">شماره موبایل</label>
            <input
              {...register("phoneNumber")}
              type="text"
              placeholder="09xxxxxxxxx"
              className={`w-full bg-blue-100 p-2 rounded-md h-14 ${
                errors.phoneNumber ? "border border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}

            <label className="text-gray-400 text-sm">رمز عبور</label>
            <input
              {...register("password")}
              type="password"
              placeholder="رمز عبور"
              className={`w-full bg-blue-100 p-2 rounded-md h-14 ${
                errors.password ? "border border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full p-2 text-white text-lg rounded-md bg-blue-500 hover:bg-blue-600 h-12 disabled:opacity-50"
          >
            {mutation.isPending ? "در حال ورود..." : "ورود"}
          </button>

          <div className="text-center">
            <span className="text-zinc-800">حسابی ندارید؟</span>
            <Button href="/register" className="text-blue-500 ml-1">
              ثبت نام
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}