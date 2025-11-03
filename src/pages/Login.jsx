import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/api/supabase";
import Cookies from "js-cookie";
import { useUserStore } from "@/stores/useUserStore";
import Button from "@/component/Button";
import Swal from "sweetalert2";

const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

export default function Login() {
  const setProfile = useUserStore((state) => state.setProfile);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // alert(`خطا در ورود: ${error.message}`);
      Swal.fire({
        text: `خطا در ورود: ${error.message}`,
        icon: 'error',       
    })
      return;
    }

    const token = data.session?.access_token;
    const user = data.user;

    if (!token || !user) {
      // alert("ورود ناموفق بود.");
      Swal.fire({
        text: "ورود ناموفق بود.",
        icon: 'error',
        showCancelButton:true,
        // cancelButtonText: 'تلاش مجدد',
        // confirmButtonText: 'ثبت نام',
        // cancelButtonColor:'blue',
    })
      return;
    }

    // ⬇ ذخیره توکن در کوکی
    // Cookies.set("token", token, {
    //   expires: 1, // 1 روز
    //   secure: true,
    //   sameSite: "Strict",
    // });

    // ⬇ دریافت پروفایل
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) {
      // alert("خطا در دریافت اطلاعات کاربر");
      Swal.fire({
        text:"خطا در دریافت اطلاعات کاربر",
        icon: 'error',        
      })
      return;
    }

    setProfile(profile);

    // alert("با موفقیت وارد شدید!");
    // اینجا ریدایرکت کن مثلاً به /dashboard
    Swal.fire({
      text: 'شما با موفقیت وارد حساب کاربری خود شدید',
      icon: 'success',
      confirmButtonText: 'متوجه شدم!'
    })

    window.location.replace("/")

  };

  return (
    <div className="flex items-center justify-center px-4 py-6 min-h-screen">
      <div className="bg-white dark:bg-zinc-700 max-w-[500px] w-full mx-2 mb-16 p-5 xs:p-10 rounded-lg shadow-Main">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-black text-xl xs:text-2xl text-center">ورود به سایت</h1>
          <Button href="/" className="text-black font-semibold">بازگشت</Button>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-gray-400 dark:text-white text-[13px] xs:text-base">
              برای استفاده از خدمات ابتدا وارد شوید
            </label>
            <input
              type="email"
              placeholder="ایمیل"
              className={`w-full bg-blue-100 p-2 rounded-md focus:outline-none h-14 ${errors.email ? "border border-red-500" : ""}`}
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            <input
              type="password"
              placeholder="رمز عبور"
              className={`w-full bg-blue-100 p-2 rounded-md focus:outline-none h-14 ${errors.password ? "border border-red-500" : ""}`}
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 text-white text-lg xs:text-xl text-center rounded-md bg-blue-500 hover:bg-blue-600 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "در حال ورود..." : "ورود"}
            </button>
            <div className="text-center">
              <span className="text-base text-zinc-800 dark:text-white">حسابی ندارید؟</span>
              <Button href="/register" className="text-blue-500 ml-1">ثبت نام</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}




    