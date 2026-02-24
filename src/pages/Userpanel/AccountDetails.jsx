// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from "zod";
// // import supabase from "@/api/supabase";
// import { useUserStore } from "@/stores/useUserStore";
// import Swal from "sweetalert2";
// import { Calendar } from "react-modern-calendar-datepicker";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";


// const schema = z.object({
//     name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
//     birthdate: z.string().optional(),
//     gender: z.enum(["male", "female"], {
//       errorMap: () => ({ message: "لطفاً جنسیت را انتخاب کنید" }),
//     }),
//     bio: z.string().optional(),
//     avatar_url: z.string().optional(),
//   });
  


// function AccountDetails() {
//   const profile = useUserStore((state) => state.profile);



//   return (
//     <div className="pb-16 bg-blue-50 min-h-screen">
//       <div className="container mx-auto max-w-4xl px-4">
//         {/* Header */}
//         <div className="flex items-center gap-x-3 pt-10">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-blue-600" viewBox="0 0 24 24">
//             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
//           </svg>
//           <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات کاربر</h4>
//         </div>
  
//         {/* Form Container */}
//         <div className="bg-white shadow-md p-6 rounded-xl mt-6">
//           <form >
//             <div className="grid sm:grid-cols-2 gap-6">
  
//               {/* Name */}
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
//                 <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
//                 {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
//               </div>
  
//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
//                 <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200" />
//               </div>
  
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">ایمیل</label>
//                 <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="example@gmail.com"  />
//               </div>
  
//               {/* Birthdate */}
//               <div>
//                 <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
//                 <input type="date" className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
//               </div>
              
              




//               {/* National Code */}
//               {/* <div>
//                 <label htmlFor="national_code" className="block text-sm font-medium text-gray-700">کد ملی</label>
//                 <input {...register("national_code")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
//               </div> */}
  
//               {/* Upload Image */}
//               {profile?.avatar_url?
//                 (
//                   <div className="space-y-3">
//                     <p>عکس پروفایل</p>
//                     <div className="inline-block mr-2 size-[90px] overflow-hidden border border-gray-200 rounded-full">
//                         {/* <img src={profile.avatar_url} className="size-full object-cover" alt="profile_img" /> */}
//                         {/* <img src={profile.avatar_url} className="size-full object-cover" alt="profile_img" /> */}
//                     </div>
//                   </div>
//                 ):(
//                   <div>

//                       {/* <label className="block text-sm font-medium text-gray-700">آپلود تصویر</label>
//                       <input
//                         className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0];
//                           if (file) uploadAvatar(file);
//                         }}
//                       />
//                     {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
//                     {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>} */}
//                     آپلود تصویر اینجا انجام میشه
//                   </div>
//                 )
//               }

//               {/* Gender */}
//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">جنسیت</label>
//                 {/* <div className="flex items-center gap-6">
//                     <label className="inline-flex items-center">
//                     <input
//                         type="radio"
//                         value="male"
//                         {...register("gender")}
//                         className="form-radio text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">مرد</span>
//                     </label>
//                     <label className="inline-flex items-center">
//                     <input
//                         type="radio"
//                         value="female"
//                         {...register("gender")}
//                         className="form-radio text-pink-500 focus:ring-pink-400"
//                     />
//                     <span className="ml-2 text-sm text-gray-700">زن</span>
//                     </label>
//                 </div> */}
//                 {/* {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>} */}
//                 </div>

  
//               {/* Bio */}
//               <div className="sm:col-span-2">
//                 <label htmlFor="bio" className="block text-sm font-medium text-gray-700">اگر سابقه بیماری دارید بنویسید</label>
//                 <textarea
//                   // {...register("bio")}
//                   rows={5}
//                   className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
//                 />
//               </div>
//             </div>
  
//             {/* Submit Button */}
//             <div className="flex justify-end mt-8">
//               <button
//                 type="submit"
//                 // disabled={isLoading || uploading}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60"
//               >
//                 {/* {isLoading || uploading ? "در حال ارسال..." : "تغییر اطلاعات"} */}

//                 تغییر اطلاعات
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountDetails;





// ---------------------------------------------------------------




import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useUserStore } from "@/stores/useUserStore";
import Swal from "sweetalert2";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

const API_BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

const schema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  // فیلدهای فقط خواندنی
  phoneNumber: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
});

function AccountDetails() {
  const { profile, setProfile } = useUserStore();
  const queryClient = useQueryClient();

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // دریافت اطلاعات پروفایل
  const { data: userData, isLoading, error, refetch } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("لطفا مجددا وارد شوید");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "خطا در دریافت اطلاعات");
      }

      const result = await response.json();
      
      // استخراج اطلاعات از پاسخ API
      const apiData = result.data;
      const profileData = apiData.profile || {};
      
      // ساختار اطلاعات کاربر برای ذخیره در store
      const userProfile = {
        id: profileData.id,
        user_id: apiData.id,
        email: profileData.email,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        fullName: profileData.fullName || 
        `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
        bio: profileData.bio,
        avatar_url: profileData.avatar,
        phone: apiData.phoneNumber,
        role: apiData.role,
        status: apiData.status,
        createdAt: apiData.createdAt,
        modifiedAt: apiData.modifiedAt,
      };

      // ذخیره در store
      setProfile(userProfile);

      return userProfile;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: true, // همیشه اجرا شود
  });

  // ویرایش پروفایل
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("لطفا مجددا وارد شوید");
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "خطا در بروزرسانی اطلاعات");
      }

      const result = await response.json();
      return result.data;
    },
    onSuccess: (data) => {
      // بروزرسانی کش
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      
      // بروزرسانی store
      if (data) {
        const currentProfile = useUserStore.getState().profile;
        const updatedProfile = {
          ...currentProfile,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          bio: data.bio,
          avatar_url: data.avatar,
          fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
        };
        setProfile(updatedProfile);
      }

      Swal.fire({
        text: "اطلاعات با موفقیت بروزرسانی شد",
        icon: "success",
        confirmButtonText: "متوجه شدم",
      });
    },
    onError: (error) => {
      Swal.fire({
        text: `خطا در بروزرسانی: ${error.message}`,
        icon: "error",
        confirmButtonText: "متوجه شدم",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      avatar: "",
      phoneNumber: "",
      role: "",
      status: "",
    },
  });

  // بروزرسانی فرم وقتی داده‌ها دریافت می‌شوند
  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        bio: userData.bio || "",
        avatar: userData.avatar_url || "",
        phoneNumber: userData.phone || "",
        role: userData.role || "",
        status: userData.status || "",
      });
    }
  }, [userData, reset]);

  // آپلود آواتار
  const uploadAvatar = async (file) => {
    try {
      const currentProfile = useUserStore.getState().profile;
      if (!currentProfile?.user_id) {
        setUploadError("شناسه کاربر موجود نیست");
        return;
      }

      setUploading(true);
      setUploadError("");

      if (!file) throw new Error("فایل انتخاب نشده");

      // ایجاد FormData برای آپلود فایل
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${API_BASE_URL}/users/avatar`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "خطا در آپلود عکس");
      }

      const result = await response.json();
      
      // بروزرسانی آدرس آواتار در فرم و store
      if (result.data?.avatarUrl) {
        setValue("avatar", result.data.avatarUrl);
        
        const currentProfile = useUserStore.getState().profile;
        setProfile({
          ...currentProfile,
          avatar_url: result.data.avatarUrl,
        });

        Swal.fire({
          text: "آپلود عکس با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "متوجه شدم",
        });
      }
    } catch (error) {
      setUploadError(error.message || "خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (formData) => {
    // حذف فیلدهای غیرقابل ویرایش
    const { phoneNumber, role, status, ...filteredData } = formData;
    mutation.mutate(filteredData);
  };

  if (error) {
    return (
      <div className="pb-16 bg-blue-50 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mt-10">
            <p>خطا در بارگذاری پروفایل: {error.message}</p>
            <button 
              onClick={() => refetch()}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 bg-blue-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center gap-x-3 pt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="size-7 text-blue-600"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات کاربر</h4>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          {isLoading ? (
            <div className="text-center py-8">
              <p>در حال بارگذاری اطلاعات...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    نام
                  </label>
                  <input
                    {...register("firstName")}
                    className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    نام خانوادگی
                  </label>
                  <input
                    {...register("lastName")}
                    className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>

                {/* Phone (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
                  <input
                    {...register("phoneNumber")}
                    disabled
                    className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    ایمیل
                  </label>
                  <input
                    {...register("email")}
                    className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="example@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Role (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">نقش کاربری</label>
                  <input
                    {...register("role")}
                    disabled
                    className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Status (read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">وضعیت حساب</label>
                  <input
                    {...register("status")}
                    disabled
                    className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Upload Image */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عکس پروفایل
                  </label>
                  <div className="flex items-center gap-4">
                    {profile?.avatar_url && (
                      <div className="inline-block size-[90px] overflow-hidden border border-gray-200 rounded-full">
                        <img
                          src={profile.avatar_url}
                          className="size-full object-cover"
                          alt="profile_img"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadAvatar(file);
                        }}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                      />
                      {uploading && (
                        <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>
                      )}
                      {uploadError && (
                        <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="sm:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    اگر سابقه بیماری دارید بنویسید
                  </label>
                  <textarea
                    {...register("bio")}
                    rows={5}
                    className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={isLoading || uploading || mutation.isPending}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {mutation.isPending ? "در حال ارسال..." : "تغییر اطلاعات"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;



