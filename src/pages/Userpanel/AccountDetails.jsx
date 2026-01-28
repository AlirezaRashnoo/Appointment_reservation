import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
// import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";
import Swal from "sweetalert2";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";


const schema = z.object({
    name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
    birthdate: z.string().optional(),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "لطفاً جنسیت را انتخاب کنید" }),
    }),
    bio: z.string().optional(),
    avatar_url: z.string().optional(),
  });
  


function AccountDetails() {


  return (
    <div className="pb-16 bg-blue-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center gap-x-3 pt-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-blue-600" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات کاربر</h4>
        </div>
  
        {/* Form Container */}
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          <form >
            <div className="grid sm:grid-cols-2 gap-6">
  
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
                {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
              </div>
  
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
                <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200" />
              </div>
  
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="example@gmail.com"  />
              </div>
  
              {/* Birthdate */}
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
                <input type="date" className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              
              




              {/* National Code */}
              {/* <div>
                <label htmlFor="national_code" className="block text-sm font-medium text-gray-700">کد ملی</label>
                <input {...register("national_code")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div> */}
  
              {/* Upload Image */}
              {profile?.avatar_url?
                (
                  <div className="space-y-3">
                    <p>عکس پروفایل</p>
                    <div className="inline-block mr-2 size-[90px] overflow-hidden border border-gray-200 rounded-full">
                        {/* <img src={profile.avatar_url} className="size-full object-cover" alt="profile_img" /> */}
                        {/* <img src={profile.avatar_url} className="size-full object-cover" alt="profile_img" /> */}
                    </div>
                  </div>
                ):(
                  <div>

                      {/* <label className="block text-sm font-medium text-gray-700">آپلود تصویر</label>
                      <input
                        className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadAvatar(file);
                        }}
                      />
                    {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
                    {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>} */}
                    آپلود تصویر اینجا انجام میشه
                  </div>
                )
              }

              {/* Gender */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">جنسیت</label>
                {/* <div className="flex items-center gap-6">
                    <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value="male"
                        {...register("gender")}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">مرد</span>
                    </label>
                    <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value="female"
                        {...register("gender")}
                        className="form-radio text-pink-500 focus:ring-pink-400"
                    />
                    <span className="ml-2 text-sm text-gray-700">زن</span>
                    </label>
                </div> */}
                {/* {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>} */}
                </div>

  
              {/* Bio */}
              <div className="sm:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">اگر سابقه بیماری دارید بنویسید</label>
                <textarea
                  // {...register("bio")}
                  rows={5}
                  className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                // disabled={isLoading || uploading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60"
              >
                {/* {isLoading || uploading ? "در حال ارسال..." : "تغییر اطلاعات"} */}

                تغییر اطلاعات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;

