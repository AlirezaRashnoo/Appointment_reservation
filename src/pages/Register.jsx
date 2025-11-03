import Button from "../component/Button";
import Header from "../component/Header";
import { useUserStore } from "@/stores/useUserStore";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import supabase from '@/api/supabase';
import Swal from "sweetalert2";

const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(6,"رمز عبور حداقل ۶ کاراکتر باشد"),
  name: z.string().min(4,"نام و نام خوانوادگی حداقل 4 کاراکتر باشد"),
  phone: z.string().min(11,"شماره نامعتبر است"),
//   role: z.enum(['patient', 'admin']) // دندان‌پزشک نه! چون اون فرم جداست
});

export default function RegisterUser() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema)
  });




const setProfile = useUserStore((state) => state.setProfile);

const onSubmit = async (data) => {
  const { email, password, name, phone} = data;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
//     alert(`خطا در ثبت‌نام: ${signUpError.message}`);

  Swal.fire({
    text:`خطا در ثبت‌ نام: ${signUpError.message}`,
    icon: 'error',
    showCancelButton:true,
    cancelButtonText: 'تلاش مجدد',
    // confirmButtonText: 'ورود',
    // cancelButtonColor:'blue',
  })

    return;
  }

  const user = signUpData?.user;

  const { error: profileError } = await supabase.from('profiles').insert([
    {
      user_id: user.id,
      name,
      phone: phone || null,
      role: 'patient', // یا 'admin'
//       role: 'admin', // یا 'admin'
      email,
      // userStatus:"active"
    },
  ]);

  if (profileError) {
//     alert(`ثبت پروفایل با خطا مواجه شد: ${profileError.message}`);
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

  // ✅ ذخیره در Zustand
  setProfile({
    user_id: user.id,
    name,
    phone: phone || null,
    role: 'patient', // یا 'admin'
    userStatus:"active",
    email,
    
  });

//   alert('ثبت‌ نام با موفقیت انجام شد. لطفاً ایمیلت رو تأیید کن.');
  Swal.fire({
    text: 'حساب کاربری شما با موفقیت ساخته شد',
    icon: 'success',
    confirmButtonText: 'متوجه شدم',
    // confirmButtonColor:"green",
  })
  window.location.replace("/")
};



 return(
    <>
    <Header />
    <div className='flex items-center justify-center px-4 py-6 min-h-screen'>
        <div className='bg-white dark:bg-zinc-700 h-max-content w-[450px] sm:w-[500px] mx-2 mb-16 p-5 xs:p-10 rounded-lg shadow-Main'>
            <div className='flex items-center justify-between mb-3'>
                <h1 className='text-black  text-xl xs:text-2xl text-center'> ثبت نام در سایت </h1>
                <div>
                    <Button href="/" className='text-black font-semibold'>بازگشت</Button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <div className='space-y-2'>
                    <label htmlFor="user-email" className='text-gray-400 dark:text-white text-[13px] xs:text-base'>برای استفاده از خدمات ابتدا ثبت نام کنید</label>
                    
                    <input {...register('name')} type="text" placeholder="نام و خانوادگی" maxLength="" className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-300/60 dark:text-white text-sm xs:text-base h-14" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    
                    <input {...register('phone')} type="text" placeholder="شماره موبایل" maxLength="" className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-300/60 dark:text-white text-sm xs:text-base h-14" />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                   
                    <input {...register('email')} type="email" placeholder="ایمیل"  className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-300/60 dark:text-white text-sm xs:text-base h-14" />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    
                    <input {...register('password')} type="password" placeholder="رمز عبور" maxLength="" className="w-full bg-blue-100 p-2 rounded-md focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-300/60 dark:text-white text-sm xs:text-base h-14" />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className='space-y-3'>
                    <Button type="submit" disabled={isSubmitting} className='w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12'>ثبت نام</Button>
                    <div className='text-center child:tracking-tightest'>
                        <span className='text-base text-zinc-800 dark:text-white'>حسابی دارید؟</span>
                        <Button href="/login" className='text-blue-500'>
                            ورود
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</>
 )

}