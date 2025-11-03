// import Button from "../component/Button";

// import Swal from "sweetalert2";


// ----------------------------------------------------------------------


import Footer from "../component/Footer";
import Header from "../component/Header";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


// ✅ Zod schema با اعتبارسنجی دقیق
const schema = z.object({
  name: z
    .string()
    .min(3, "نام باید حداقل ۳ حرف باشد")
    .regex(/^[آ-ی\s]+$/, "فقط حروف فارسی مجاز است"),
  medical_code: z
    .string()
    .regex(/^\d{6,12}$/, "کد نظام پزشکی باید بین ۶ تا ۱۲ رقم باشد"),
  specialty: z.string().min(2, "زمینه فعالیت الزامی است"),
  phone: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
  email: z.string().email("ایمیل نامعتبر است"),
  experience: z.string().min(1, "لطفاً سابقه را وارد کنید"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

export default function RegisterDentist() {
  const setProfile = useUserStore((state) => state.setProfile);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("submiting",data);
    const { email, password, name, phone, medical_code, specialty, experience} = data;

    // ✅ مرحله 1: ثبت‌نام در Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      // alert(`خطا در ثبت‌نام: ${signUpError.message}`);
      Swal.fire({
        text:`خطا در ثبت‌نام: ${signUpError.message}`,
        icon: 'error',
        showCancelButton:true,
        cancelButtonText: 'تلاش مجدد',
        // confirmButtonText: 'ورود',
        // cancelButtonColor:'blue',
      })
      return;
    }

    const user = signUpData?.user;

    // ✅ مرحله 2: درج اطلاعات پروفایل در جدول profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        user_id: user.id,
        name,
        phone,
        role: "dentist",
        medical_code,
        specialty,
        experience,
        email,
        userStatus:"pending"
      },
    ]);

    if (profileError) {
      // alert(`خطا در ثبت پروفایل: ${profileError.message}`);
      Swal.fire({
        text:`ثبت پروفایل با خطا مواجه شد: ${profileError.message}`,
        icon: 'error',
        showCancelButton:true,
        cancelButtonText: 'تلاش مجدد',
        // confirmButtonText: 'ورود',
        // cancelButtonColor:'blue',
      })
      return;
    }

    // ✅ مرحله 3: ذخیره در Zustand
    setProfile({
      user_id: user.id,
      name,
      phone,
      role: "dentist",
      medical_code,
      specialty,
      experience,
      email,
      userStatus:"pending"
    });

    // ✅ مرحله 4: ذخیره توکن (در صورت نیاز)
    // const token = signUpData.session?.access_token;
    // if (token) {
    //   Cookies.set("token", token, {
    //     expires: 7,
    //     secure: true,
    //     sameSite: "Strict",
    //   });
    // }

    // alert("ثبت‌نام با موفقیت انجام شد. لطفاً ایمیلت را تأیید کن.");
    Swal.fire({
      text: "درخواست شما با موفقیت ثبت شد",
      icon: 'success',
      confirmButtonText: 'متوجه شدم',
      // confirmButtonColor:"green",
    })
    window.location.replace("/")
  };



  return (
    <section className="bg-gray-100">
      <Header />
      <div className="pt-20">
        <div className="px-5">
          <div>
            <h1 className="text-center text-xl font-bold">فرم عضویت و دریافت پروفایل</h1>
            <div className="text-center mt-16">
              <p className="text-[17px] leading-[30px] font-normal">
                برای عضویت در سایت دندانپزشکان لرستان، لطفا فرم زیر را تکمیل نمایید. کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت.
              </p>
            </div>
          </div>
  
          <div className="flex items-center justify-center mt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 child:mb-4 child:pb-1 space-y-6">
              
              <div className="space-y-2">
                <label className="font-semibold">نام و نام خانوادگی</label>
                <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none" placeholder="کیبورد در حالت تایپ فارسی باشد" {...register("name")} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
  
              <div className="space-y-2">
                <label className="font-semibold">کد نظام پزشکی</label>
                <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none" placeholder="کد نظام پزشکی بین 6 تا 12 رقم می باشد" {...register("medical_code")} />
                {errors.medical_code && <p className="text-red-500 text-sm">{errors.medical_code.message}</p>}
              </div>
  
              <div className="space-y-2">
                <label className="font-semibold">زمینه فعالیت</label>
                <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none" {...register("specialty")} />
                {errors.field && <p className="text-red-500 text-sm">{errors.field.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-semibold">شماره موبایل</label>
                <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none" placeholder="09928976543" {...register("phone")} />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-semibold">ایمیل</label>
                <input type="email" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none" placeholder="example@gmail.com" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-semibold">سابقه</label>
                <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none" {...register("experience")} />
                {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-semibold">رمز عبور</label>
                <input type="password" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
  
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center mx-auto bg-blue-400 w-[150px] rounded-[10px] h-11 text-white"
              >
                {isSubmitting ? "در حال ارسال..." : "ثبت نام"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}