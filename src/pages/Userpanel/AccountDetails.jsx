// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from "zod";
// import { useUserStore } from "@/stores/useUserStore";
// import Swal from "sweetalert2";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";

// const API_BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

// const schema = z.object({
//   firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
//   lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
//   email: z.string().email("ایمیل معتبر وارد کنید").optional().nullable(),
//   bio: z.string().optional().nullable(),
//   avatar: z.string().optional().nullable(),
//   // فیلدهای فقط خواندنی
//   phoneNumber: z.string().optional(),
//   role: z.string().optional(),
//   status: z.string().optional(),
// });

// function AccountDetails() {
//   const { profile, setProfile } = useUserStore();
//   const queryClient = useQueryClient();

//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState("");

//   // دریافت اطلاعات پروفایل
//   const { data: userData, isLoading, error, refetch } = useQuery({
//     queryKey: ["userProfile"],
//     queryFn: async () => {
//       const response = await fetch(`${API_BASE_URL}/users/me`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error("لطفا مجددا وارد شوید");
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || "خطا در دریافت اطلاعات");
//       }

//       const result = await response.json();
      
//       // استخراج اطلاعات از پاسخ API
//       const apiData = result.data;
//       const profileData = apiData.profile || {};
      
//       // ساختار اطلاعات کاربر برای ذخیره در store
//       const userProfile = {
//         id: profileData.id,
//         user_id: apiData.id,
//         email: profileData.email,
//         firstName: profileData.firstName,
//         lastName: profileData.lastName,
//         fullName: profileData.fullName || 
//         `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim(),
//         bio: profileData.bio,
//         avatar_url: profileData.avatar,
//         phone: apiData.phoneNumber,
//         role: apiData.role,
//         status: apiData.status,
//         createdAt: apiData.createdAt,
//         modifiedAt: apiData.modifiedAt,
//       };

//       // ذخیره در store
//       setProfile(userProfile);

//       return userProfile;
//     },
//     retry: 1,
//     refetchOnWindowFocus: false,
//     enabled: true, // همیشه اجرا شود
//   });

//   // ویرایش پروفایل
//   const mutation = useMutation({
//     mutationFn: async (updatedData) => {
//       const response = await fetch(`${API_BASE_URL}/users/profile`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedData),
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error("لطفا مجددا وارد شوید");
//         }
//         const errorData = await response.json();
//         throw new Error(errorData.message || "خطا در بروزرسانی اطلاعات");
//       }

//       const result = await response.json();
//       return result.data;
//     },
//     onSuccess: (data) => {
//       // بروزرسانی کش
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      
//       // بروزرسانی store
//       if (data) {
//         const currentProfile = useUserStore.getState().profile;
//         const updatedProfile = {
//           ...currentProfile,
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: data.email,
//           bio: data.bio,
//           avatar_url: data.avatar,
//           fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim(),
//         };
//         setProfile(updatedProfile);
//       }

//       Swal.fire({
//         text: "اطلاعات با موفقیت بروزرسانی شد",
//         icon: "success",
//         confirmButtonText: "متوجه شدم",
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         text: `خطا در بروزرسانی: ${error.message}`,
//         icon: "error",
//         confirmButtonText: "متوجه شدم",
//       });
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       bio: "",
//       avatar: "",
//       phoneNumber: "",
//       role: "",
//       status: "",
//     },
//   });

//   // بروزرسانی فرم وقتی داده‌ها دریافت می‌شوند
//   useEffect(() => {
//     if (userData) {
//       reset({
//         firstName: userData?.firstName || "",
//         lastName: userData?.lastName || "",
//         email: userData?.email || "",
//         bio: userData?.bio || "",
//         avatar: userData?.avatar_url || "",
//         phoneNumber: userData?.phone || "",
//         role: userData?.role || "",
//         status: userData?.status || "",
//       });
//     }
//   }, [userData, reset]);

//   // آپلود آواتار
//   const uploadAvatar = async (file) => {
//     try {
//       const currentProfile = useUserStore.getState().profile;
//       if (!currentProfile?.user_id) {
//         setUploadError("شناسه کاربر موجود نیست");
//         return;
//       }

//       setUploading(true);
//       setUploadError("");

//       if (!file) throw new Error("فایل انتخاب نشده");

//       // ایجاد FormData برای آپلود فایل
//       const formData = new FormData();
//       formData.append("avatar", file);

//       const response = await fetch(`${API_BASE_URL}/users/avatar`, {
//         method: "POST",
//         credentials: "include",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "خطا در آپلود عکس");
//       }

//       const result = await response.json();
      
//       // بروزرسانی آدرس آواتار در فرم و store
//       if (result.data?.avatarUrl) {
//         setValue("avatar", result.data.avatarUrl);
        
//         const currentProfile = useUserStore.getState().profile;
//         setProfile({
//           ...currentProfile,
//           avatar_url: result.data.avatarUrl,
//         });

//         Swal.fire({
//           text: "آپلود عکس با موفقیت انجام شد",
//           icon: "success",
//           confirmButtonText: "متوجه شدم",
//         });
//       }
//     } catch (error) {
//       setUploadError(error.message || "خطا در آپلود عکس");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSubmit = (formData) => {
//     // حذف فیلدهای غیرقابل ویرایش
//     const { phoneNumber, role, status, ...filteredData } = formData;
//     mutation.mutate(filteredData);
//   };

//   if (error) {
//     return (
//       <div className="pb-16 bg-blue-50 min-h-screen">
//         <div className="container mx-auto max-w-4xl px-4">
//           <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mt-10">
//             <p>خطا در بارگذاری پروفایل: {error.message}</p>
//             <button 
//               onClick={() => refetch()}
//               className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
//             >
//               تلاش مجدد
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-16 bg-blue-50 min-h-screen">
//       <div className="container mx-auto max-w-4xl px-4">
//         {/* Header */}
        // <div className="flex items-center gap-x-3 pt-10">
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     fill="currentColor"
        //     className="size-7 text-blue-600"
        //     viewBox="0 0 24 24"
        //   >
        //     <path
        //       fillRule="evenodd"
        //       d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        //       clipRule="evenodd"
        //     />
        //   </svg>
        //   <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات کاربر</h4>
        // </div>

//         {/* Form Container */}
//         <div className="bg-white shadow-md p-6 rounded-xl mt-6">
//           {isLoading ? (
//             <div className="text-center py-8">
//               <p>در حال بارگذاری اطلاعات...</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="grid sm:grid-cols-2 gap-6">
//                 {/* First Name */}
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
//                     نام
//                   </label>
//                   <input
//                     {...register("firstName")}
//                     className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
//                   />
//                   {errors.firstName && (
//                     <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
//                   )}
//                 </div>

//                 {/* Last Name */}
//                 <div>
//                   <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
//                     نام خانوادگی
//                   </label>
//                   <input
//                     {...register("lastName")}
//                     className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
//                   />
//                   {errors.lastName && (
//                     <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
//                   )}
//                 </div>

//                 {/* Phone (read-only) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
//                   <input
//                     {...register("phoneNumber")}
//                     disabled
//                     className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     ایمیل
//                   </label>
//                   <input
//                     {...register("email")}
//                     className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                     placeholder="example@gmail.com"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                   )}
//                 </div>

//                 {/* Role (read-only) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">نقش کاربری</label>
//                   <input
//                     {...register("role")}
//                     disabled
//                     className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                   />
//                 </div>

//                 {/* Status (read-only) */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">وضعیت حساب</label>
//                   <input
//                     {...register("status")}
//                     disabled
//                     className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                   />
//                 </div>

//                 {/* Upload Image */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     عکس پروفایل
//                   </label>
//                   <div className="flex items-center gap-4">
//                     {profile?.avatar_url && (
//                       <div className="inline-block size-[90px] overflow-hidden border border-gray-200 rounded-full">
//                         <img
//                           src={profile.avatar_url}
//                           className="size-full object-cover"
//                           alt="profile_img"
//                         />
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0];
//                           if (file) uploadAvatar(file);
//                         }}
//                         className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
//                       />
//                       {uploading && (
//                         <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>
//                       )}
//                       {uploadError && (
//                         <p className="text-red-500 text-sm mt-1">{uploadError}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bio */}
//                 <div className="sm:col-span-2">
//                   <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//                     اگر سابقه بیماری دارید بنویسید
//                   </label>
//                   <textarea
//                     {...register("bio")}
//                     rows={5}
//                     className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end mt-8">
//                 <button
//                   type="submit"
//                   disabled={isLoading || uploading || mutation.isPending}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {mutation.isPending ? "در حال ارسال..." : "تغییر اطلاعات"}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountDetails;





// ------------------------------------------------------------------

// chatgpt

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { z } from "zod";
// import { useUserStore } from "@/stores/useUserStore";
// import Swal from "sweetalert2";

// const API_BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

// const schema = z.object({
//   firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
//   lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
//   email: z.string().email("ایمیل معتبر وارد کنید").optional().nullable(),
//   bio: z.string().optional().nullable(),
//   avatar: z.string().optional().nullable(),

//   phoneNumber: z.string().optional(),
//   role: z.string().optional(),
//   status: z.string().optional(),
// });

// function AccountDetails() {
//   const { user, setUser } = useUserStore();

//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       bio: "",
//       avatar: "",
//       phoneNumber: "",
//       role: "",
//       status: "",
//     },
//   });

//   // پر کردن فرم از store
//   useEffect(() => {
//     if (!user) return;

//     reset({
//       firstName: user.profile?.firstName || "",
//       lastName: user.profile?.lastName || "",
//       email: user.profile?.email || "",
//       bio: user.profile?.bio || "",
//       avatar: user.profile?.avatar || "",

//       phoneNumber: user.phoneNumber || "",
//       role: user.role || "",
//       status: user.status || "",
//     });
//   }, [user, reset]);

//   // ویرایش اطلاعات
//   const mutation = useMutation({
//     mutationFn: async (data) => {
//       const response = await fetch(
//         `${API_BASE_URL}/users/profile`,
//         {
//           method: "PATCH",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(
//           err.message || "خطا در بروزرسانی"
//         );
//       }

//       return response.json();
//     },

//     onSuccess: (res) => {
//       // آپدیت store
//       const updatedUser = {
//         ...user,
//         profile: {
//           ...user.profile,
//           ...res.data,
//         },
//       };

//       setUser(updatedUser);

//       Swal.fire({
//         icon: "success",
//         text: "اطلاعات بروزرسانی شد",
//         confirmButtonText: "باشه",
//       });
//     },

//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         text: error.message,
//       });
//     },
//   });

//   // آپلود عکس
//   const uploadAvatar = async (file) => {
//     try {
//       setUploading(true);
//       setUploadError("");

//       const formData = new FormData();

//       formData.append("avatar", file);

//       const response = await fetch(
//         `${API_BASE_URL}/users/avatar`,
//         {
//           method: "POST",
//           credentials: "include",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("خطا در آپلود");
//       }

//       const result = await response.json();

//       const avatarUrl =
//         result.data?.avatar;

//       if (avatarUrl) {
//         setValue("avatar", avatarUrl);

//         setUser({
//           ...user,
//           profile: {
//             ...user.profile,
//             avatar: avatarUrl,
//           },
//         });

//         Swal.fire({
//           icon: "success",
//           text: "عکس آپلود شد",
//         });
//       }
//     } catch (err) {
//       setUploadError(err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSubmit = (data) => {
//     const {
//       phoneNumber,
//       role,
//       status,
//       ...cleanData
//     } = data;

//     mutation.mutate(cleanData);
//   };

//   if (!user) {
//     return (
//       <div className="text-center p-10">
//         در حال دریافت اطلاعات...
//       </div>
//     );
//   }

//   return (
//     <div className="pb-16 bg-blue-50 min-h-screen">
//       <div className="container mx-auto max-w-4xl px-4">

//         <div className="bg-white shadow-md p-6 rounded-xl mt-10">

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid sm:grid-cols-2 gap-6">

//               <div>
//                 <label>نام</label>

//                 <input
//                   {...register("firstName")}
//                   className="w-full p-2 border rounded"
//                 />

//                 {errors.firstName && (
//                   <p className="text-red-500">
//                     {errors.firstName.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label>نام خانوادگی</label>

//                 <input
//                   {...register("lastName")}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <div>
//                 <label>شماره موبایل</label>

//                 <input
//                   {...register("phoneNumber")}
//                   disabled
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>

//               <div>
//                 <label>ایمیل</label>

//                 <input
//                   {...register("email")}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>

//               <div>
//                 <label>نقش</label>

//                 <input
//                   {...register("role")}
//                   disabled
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>

//               <div>
//                 <label>وضعیت</label>

//                 <input
//                   {...register("status")}
//                   disabled
//                   className="w-full p-2 border rounded bg-gray-100"
//                 />
//               </div>

//               <div className="sm:col-span-2">

//                 {user.profile?.avatar && (
//                   <img
//                     src={user.profile.avatar}
//                     className="w-24 h-24 rounded-full object-cover mb-4"
//                     alt=""
//                   />
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e)=>{
//                     const file=e.target.files[0];
//                     if(file) uploadAvatar(file)
//                   }}
//                 />

//                 {uploading && (
//                   <p>در حال آپلود...</p>
//                 )}

//                 {uploadError && (
//                   <p className="text-red-500">
//                     {uploadError}
//                   </p>
//                 )}

//               </div>

//               <div className="sm:col-span-2">

//                 <label>
//                   اگر سابقه بیماری دارید بنویسید
//                 </label>

//                 <textarea
//                   {...register("bio")}
//                   rows={5}
//                   className="w-full p-2 border rounded"
//                 />

//               </div>

//             </div>

//             <button
//               type="submit"
//               disabled={mutation.isPending}
//               className="bg-blue-500 text-white px-6 py-3 rounded mt-8"
//             >
//               {mutation.isPending
//                 ? "در حال ذخیره..."
//                 : "ذخیره تغییرات"}
//             </button>

//           </form>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountDetails;



// ------------------------------------------------------------------


// cloud ai


// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from "zod";
// import { useUserStore } from "@/stores/useUserStore";
// import Swal from "sweetalert2";

// const API_BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

// const schema = z.object({
//   firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
//   lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
//   email: z.string().email("ایمیل معتبر وارد کنید").optional().nullable(),
//   bio: z.string().optional().nullable(),
//   avatar: z.string().optional().nullable(),
// });

// function AccountDetails() {
//   const queryClient = useQueryClient();
//   const { user, setUser } = useUserStore();

//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       bio: "",
//       avatar: "",
//     },
//   });

//   // ۱. پر کردن فرم از store (نه fetch مجدد)
//   useEffect(() => {
//     if (user) {
//       reset({
//         firstName: user.profile?.firstName || "",
//         lastName:  user.profile?.lastName  || "",
//         email:     user.profile?.email     || "",
//         bio:       user.profile?.bio       || "",
//         avatar:    user.profile?.avatar    || "",
//       });
//     }
//   }, [user, reset]);

//   // ۲. mutation ویرایش پروفایل
//   const mutation = useMutation({
//     mutationFn: async (updatedData) => {
//       const response = await fetch(`${API_BASE_URL}/users/profile`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedData),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.message || "خطا در بروزرسانی اطلاعات");
//       }

//       return (await response.json()).data;
//     },
//     onSuccess: (data) => {
//       // بروزرسانی store با merge کردن profile جدید
//       setUser({
//         ...user,
//         profile: {
//           ...user.profile,
//           ...data,
//         },
//       });

//       // invalidate کردن cache تا دفعه بعد داده تازه بگیره
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });

//       Swal.fire({
//         text: "اطلاعات با موفقیت بروزرسانی شد",
//         icon: "success",
//         confirmButtonText: "متوجه شدم",
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         text: `خطا در بروزرسانی: ${error.message}`,
//         icon: "error",
//         confirmButtonText: "متوجه شدم",
//       });
//     },
//   });

//   // ۳. آپلود آواتار
//   const uploadAvatar = async (file) => {
//     if (!file) return;

//     setUploading(true);
//     setUploadError("");

//     try {
//       const formData = new FormData();
//       formData.append("avatar", file);

//       const response = await fetch(`${API_BASE_URL}/users/avatar`, {
//         method: "POST",
//         credentials: "include",
//         body: formData,
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         throw new Error(err.message || "خطا در آپلود عکس");
//       }

//       const result = await response.json();
//       const newAvatarUrl = result.data?.avatarUrl;

//       if (newAvatarUrl) {
//         setValue("avatar", newAvatarUrl);

//         // آپدیت store
//         setUser({
//           ...user,
//           profile: { ...user.profile, avatar: newAvatarUrl },
//         });

//         Swal.fire({
//           text: "آپلود عکس با موفقیت انجام شد",
//           icon: "success",
//           confirmButtonText: "متوجه شدم",
//         });
//       }
//     } catch (error) {
//       setUploadError(error.message || "خطا در آپلود عکس");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSubmit = (formData) => {
//     mutation.mutate(formData);
//   };

//   // اگر user هنوز لود نشده (app.jsx داره fetch می‌کنه)
//   if (!user) {
//     return (
//       <div className="pb-16 bg-blue-50 min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">در حال بارگذاری اطلاعات...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-16 bg-blue-50 min-h-screen">
//       <div className="container mx-auto max-w-4xl px-4">
//         {/* Header */}
//         <div className="flex items-center gap-x-3 pt-10">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             className="size-7 text-blue-600"
//             viewBox="0 0 24 24"
//           >
//             <path
//               fillRule="evenodd"
//               d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
//               clipRule="evenodd"
//             />
//           </svg>
//           <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات کاربر</h4>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white shadow-md p-6 rounded-xl mt-6">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid sm:grid-cols-2 gap-6">
//               {/* First Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">نام</label>
//                 <input
//                   {...register("firstName")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
//                 )}
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">نام خانوادگی</label>
//                 <input
//                   {...register("lastName")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
//                 )}
//               </div>

//               {/* Phone (read-only, از store) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
//                 <input
//                   value={user.phoneNumber || ""}
//                   disabled
//                   readOnly
//                   className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">ایمیل</label>
//                 <input
//                   {...register("email")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="example@gmail.com"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                 )}
//               </div>

//               {/* Role (read-only, از store) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">نقش کاربری</label>
//                 <input
//                   value={user.role || ""}
//                   disabled
//                   readOnly
//                   className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                 />
//               </div>

//               {/* Status (read-only, از store) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">وضعیت حساب</label>
//                 <input
//                   value={user.status || ""}
//                   disabled
//                   readOnly
//                   className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                 />
//               </div>

//               {/* Upload Avatar */}
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">عکس پروفایل</label>
//                 <div className="flex items-center gap-4">
//                   {user.profile?.avatar && (
//                     <div className="inline-block size-[90px] overflow-hidden border border-gray-200 rounded-full">
//                       <img
//                         src={user.profile.avatar}
//                         className="size-full object-cover"
//                         alt="profile_img"
//                       />
//                     </div>
//                   )}
//                   <div className="flex-1">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file) uploadAvatar(file);
//                       }}
//                       className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
//                     />
//                     {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
//                     {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
//                   </div>
//                 </div>
//               </div>

//               {/* Bio */}
//               <div className="sm:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   اگر سابقه بیماری دارید بنویسید
//                 </label>
//                 <textarea
//                   {...register("bio")}
//                   rows={5}
//                   className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
//                 />
//               </div>
//             </div>

//             {/* Submit */}
//             <div className="flex justify-end mt-8">
//               <button
//                 type="submit"
//                 disabled={uploading || mutation.isPending}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {mutation.isPending ? "در حال ارسال..." : "تغییر اطلاعات"}
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


// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from "zod";
// import { useUserStore } from "@/stores/useUserStore";
// import Swal from "sweetalert2";

// const API_BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

// const schema = z.object({
//   firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
//   lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
//   email: z
//     .string()
//     .email("ایمیل معتبر وارد کنید")
//     .optional()
//     .nullable(),

//   bio: z.string().optional().nullable(),
//   avatar: z.string().optional().nullable(),
// });

// // گرفتن csrf_token از کوکی
// const getCsrfToken = () => {
//   return document.cookie
//     .split("; ")
//     .find((cookie) => cookie.startsWith("csrf_token="))
//     ?.split("=")[1];
// };

// function AccountDetails() {
//   const queryClient = useQueryClient();

//   const { user, setUser } = useUserStore();

//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm({
//     resolver: zodResolver(schema),

//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       bio: "",
//       avatar: "",
//     },
//   });

//   // پر کردن فرم از store
//   useEffect(() => {
//     if (!user) return;

//     reset({
//       firstName: user.profile?.firstName || "",
//       lastName: user.profile?.lastName || "",
//       email: user.profile?.email || "",
//       bio: user.profile?.bio || "",
//       avatar: user.profile?.avatar || "",
//     });
    
//   }, [user, reset]);

//   // ویرایش پروفایل
//   const mutation = useMutation({
//     mutationFn: async (updatedData) => {
//       const csrfToken = getCsrfToken();

//       const response = await fetch(
//         `${API_BASE_URL}/users/me`,
//         {
//           method: "PATCH",
//           credentials: "include",

//           headers: {
//             "Content-Type": "application/json",
//             "X-CSRF-Token": csrfToken,
//           },

//           body: JSON.stringify(updatedData),
//         }
//       );

//       if (!response.ok) {
//         const err = await response.json();

//         throw new Error(
//           err.message || "خطا در بروزرسانی اطلاعات"
//         );
//       }

//       return (await response.json()).data;
//     },

//     onSuccess: (data) => {
//       // بروزرسانی store

//       setUser({
//         ...user,

//         profile: {
//           ...user.profile,
//           ...data,
//         },
//       });

//       queryClient.invalidateQueries({
//         queryKey: ["userProfile"],
//       });

//       Swal.fire({
//         text: "اطلاعات با موفقیت بروزرسانی شد",
//         icon: "success",
//         confirmButtonText: "متوجه شدم",
//       });
//     },

//     onError: (error) => {
//       Swal.fire({
//         text: `خطا: ${error.message}`,
//         icon: "error",
//         confirmButtonText: "متوجه شدم",
//       });
//     },
//   });

//   // آپلود آواتار
//   const uploadAvatar = async (file) => {
//     if (!file) return;

//     try {
//       setUploading(true);
//       setUploadError("");

//       const csrfToken = getCsrfToken();

//       const formData = new FormData();

//       formData.append("avatar", file);

//       const response = await fetch(
//         `${API_BASE_URL}/users/me/avatar`,
//         {
//           method: "POST",
//           credentials: "include",

//           headers: {
//             "X-CSRF-Token": csrfToken,
//           },

//           body: formData,
//         }
        
        
//       );

//       if (!response.ok) {
//         const err = await response.json();

//         throw new Error(
//           err.message || "خطا در آپلود عکس"
//         );
//       }

//       const result = await response.json();

//       const newAvatarUrl =
//         result.data?.avatarUrl;

//       if (newAvatarUrl) {
//         setValue(
//           "avatar",
//           newAvatarUrl
//         );

//         // بروزرسانی store

//         setUser({
//           ...user,

//           profile: {
//             ...user.profile,
//             avatar: newAvatarUrl,
//           },
//         });

//         Swal.fire({
//           text: "آپلود عکس با موفقیت انجام شد",
//           icon: "success",
//           confirmButtonText: "متوجه شدم",
//         });
//       }
//     } catch (error) {
//       setUploadError(
//         error.message || "خطا در آپلود"
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   const onSubmit = (formData) => {
//     mutation.mutate(formData);
//   };

//   if (!user) {
//     return (
//       <div className="pb-16 bg-blue-50 min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">
//           در حال بارگذاری اطلاعات...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="pb-16 bg-blue-50 min-h-screen">
//       <div className="container mx-auto max-w-4xl px-4">

//         <div className="bg-white shadow-md p-6 rounded-xl mt-6">

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid sm:grid-cols-2 gap-6">

//               <div>
//                 <label>نام</label>

//                 <input
//                   {...register("firstName")}
//                   className="w-full mt-1 p-2.5 border rounded"
//                 />

//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm">
//                     {errors.firstName.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label>
//                   نام خانوادگی
//                 </label>

//                 <input
//                   {...register("lastName")}
//                   className="w-full mt-1 p-2.5 border rounded"
//                 />
//               </div>

//               <div>
//                 <label>
//                   شماره موبایل
//                 </label>

//                 <input
//                   value={user.phoneNumber || ""}
//                   disabled
//                   className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
//                 />
//               </div>

//               <div>
//                 <label>ایمیل</label>

//                 <input
//                   {...register("email")}
//                   className="w-full mt-1 p-2.5 border rounded"
//                 />
//               </div>

//               <div>
//                 <label>
//                   نقش کاربری
//                 </label>

//                 <input
//                   value={user.role || ""}
//                   disabled
//                   className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
//                 />
//               </div>

//               <div>
//                 <label>
//                   وضعیت حساب
//                 </label>

//                 <input
//                   value={user.status || ""}
//                   disabled
//                   className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
//                 />
//               </div>

//               <div className="sm:col-span-2">

//                 <label>
//                   عکس پروفایل
//                 </label>

//                 <div className="flex gap-4 mt-2">

//                   {user.profile?.avatar && (
//                     <img
//                       src={user.profile.avatar}
//                       alt="profile"
//                       className="w-24 h-24 rounded-full object-cover border"
//                     />
//                   )}

//                   <div>

//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file =
//                           e.target.files?.[0];

//                         if (file) {
//                           uploadAvatar(file);
//                         }
//                       }}
//                     />

//                     {uploading && (
//                       <p className="text-blue-500 text-sm mt-1">
//                         در حال آپلود...
//                       </p>
//                     )}

//                     {uploadError && (
//                       <p className="text-red-500 text-sm mt-1">
//                         {uploadError}
//                       </p>
//                     )}

//                   </div>
//                 </div>

//               </div>

//               <div className="sm:col-span-2">

//                 <label>
//                   اگر سابقه بیماری دارید بنویسید
//                 </label>

//                 <textarea
//                   {...register("bio")}
//                   rows={5}
//                   className="w-full mt-1 p-2.5 border rounded"
//                 />

//               </div>

//             </div>

//             <div className="flex justify-end mt-8">

//               <button
//                 type="submit"
//                 disabled={
//                   mutation.isPending ||
//                   uploading
//                 }
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
//               >
//                 {mutation.isPending
//                   ? "در حال ارسال..."
//                   : "تغییر اطلاعات"}
//               </button>

//             </div>

//           </form>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountDetails;









import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useUserStore } from "@/stores/useUserStore";
import Swal from "sweetalert2";
import Cookies from "js-cookie";



const API_BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

const schema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
});

// گرفتن csrf_token از cookie به صورت مطمئن
const getCsrfToken = () => {
  const match = document.cookie.match(/(^|;)\\s*csrf_token=([^;]+)/);
  return match ? match[2] : null;
};

function AccountDetails() {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    },
  });

  // پر کردن فرم از store
  useEffect(() => {
    if (!user) return;
    reset({
      firstName: user.profile?.firstName || "",
      lastName: user.profile?.lastName || "",
      email: user.profile?.email || "",
      bio: user.profile?.bio || "",
      avatar: user.profile?.avatar || "",
    });
  }, [user, reset]);

  // ویرایش پروفایل
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const csrfToken = Cookies.get("csrf_token")
      console.log("CSRF token sent:", csrfToken); // بررسی در console

      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "خطا در بروزرسانی اطلاعات");
      }
      return (await response.json()).data;
    },
    onSuccess: (data) => {
      setUser({
        ...user,
        profile: { ...user.profile, ...data },
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      Swal.fire({
        text: "اطلاعات با موفقیت بروزرسانی شد",
        icon: "success",
        confirmButtonText: "متوجه شدم",
      });
    },
    onError: (error) => {
      Swal.fire({
        text: `خطا: ${error.message}`,
        icon: "error",
        confirmButtonText: "متوجه شدم",
      });
    },
  });

  // آپلود آواتار
  const uploadAvatar = async (file) => {
    if (!file) return;
    setUploading(true);
    setUploadError("");

    try {
      const csrfToken = getCsrfToken();

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${API_BASE_URL}/users/me/avatar`, {
        method: "PATCH",
        credentials: "include",
        headers: { "X-CSRF-Token": csrfToken },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "خطا در آپلود عکس");
      }

      const result = await response.json();
      const newAvatarUrl = result.data?.avatarUrl;

      if (newAvatarUrl) {
        setValue("avatar", newAvatarUrl);
        setUser({
          ...user,
          profile: { ...user.profile, avatar: newAvatarUrl },
        });
        Swal.fire({
          text: "آپلود عکس با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "متوجه شدم",
        });
      }
    } catch (error) {
      setUploadError(error.message || "خطا در آپلود");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  if (!user) {
    return (
      <div className="pb-16 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">در حال بارگذاری اطلاعات...</p>
      </div>
    );
  }

  return (
    <div className="pb-16 bg-blue-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
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
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label>نام</label>
                <input
                  {...register("firstName")}
                  className="w-full mt-1 p-2.5 border rounded"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label>نام خانوادگی</label>
                <input
                  {...register("lastName")}
                  className="w-full mt-1 p-2.5 border rounded"
                />
              </div>

              {/* Phone */}
              <div>
                <label>شماره موبایل</label>
                <input
                  value={user.phoneNumber || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div>

              {/* Email */}
              <div>
                <label>ایمیل</label>
                <input
                  {...register("email")}
                  className="w-full mt-1 p-2.5 border rounded"
                />
              </div>

              {/* Role */}
              {/* <div>
                <label>نقش کاربری</label>
                <input
                  value={user.role || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div> */}

              <div>
                <label>کد ملی</label>
                <input
                  value={user?.profile.nationalCode || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div>

              {/* Status */}
              <div>
                <label>وضعیت حساب</label>
                <input
                  value={user.status || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div>

              {/* Avatar */}
              <div className="sm:col-span-2">
                <label>عکس پروفایل</label>
                <div className="flex gap-4 mt-2">
                  {user.profile?.avatar && (
                    <img
                      src={user.profile.avatar}
                      alt="profile"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadAvatar(file);
                      }}
                    />
                    {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
                    {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label>اگر سابقه بیماری دارید بنویسید</label>
                <textarea
                  {...register("bio")}
                  rows={5}
                  className="w-full mt-1 p-2.5 border rounded"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={mutation.isPending || uploading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                {mutation.isPending ? "در حال ارسال..." : "تغییر اطلاعات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;

