import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
// import { useUserStore } from "@/stores/useUserStore";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useUserStore } from "@/stores/useUserStore";

const axiosInstance = axios.create({
  baseURL: 'https://dentist-reyn.onrender.com',
  timeout: 10000,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


const Toast = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? '✓' : '✗';

  return (
    <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn`}>
      <span className="text-xl">{icon}</span>
      <span>{message}</span>
    </div>
  );
};

const LoadingSpinner = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
    </div>
  );
};

// ==================== Componennt Error State ====================
const ErrorState = ({ error, onRetry, message }) => (
  <div className="text-center py-12 px-4">
    <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-red-800 mb-2">{message || 'خطا در دریافت اطلاعات'}</h3>
      <p className="text-sm text-red-600 mb-4">
        {error?.response?.data?.message || error?.message || 'خطای ناشناخته'}
      </p>
      <button 
        onClick={onRetry}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        تلاش مجدد
      </button>
    </div>
  </div>
);

// ==================== Validation Schema ====================
const PHONE_REGEX = /^09\d{9}$/;

const schema = z.object({
  nationalCode: z.string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .regex(/^\d+$/, "کد ملی فقط باید شامل اعداد باشد")
    .optional(),
  medicalCouncilNumber: z.string().optional(),
  birthDateShamsi: z.string().optional(),
  occupation: z.string().optional(),
  specialization: z.string().optional(),
  degree: z.string().optional(),
  portfolio: z.array(z.string().url("آدرس معتبر نیست")).optional(),
  additionalPhoneNumbers: z.array(
    z.string().regex(PHONE_REGEX, "شماره معتبر نیست (مثال: 09123456789)")
  ).max(2, "حداکثر دو شماره مجاز است").optional(),
  address: z.object({
    shortAddr: z.string().optional(),
    longAddr: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است.").optional(),
  }).optional(),
  bio: z.string().max(1000, "حداکثر ۱۰۰۰ کاراکتر").optional(),
});

// ==================== Constants ====================
const QUERY_KEYS = {
  DENTIST_PROFILE: 'dentistProfile',
};

const API_ENDPOINTS = {
  DENTIST_ME: '/api/v1/dentist/me',
  UPLOAD_AVATAR: '/api/v1/dentist/avatar',
};

// ==================== API Functions ====================
const fetchDentistProfile = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.DENTIST_ME);
  return data.data;
};

const updateDentistProfile = async (profileData) => {
  const { data } = await axiosInstance.patch(API_ENDPOINTS.DENTIST_ME, profileData);
  return data.data;
};

const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const { data } = await axiosInstance.post(API_ENDPOINTS.UPLOAD_AVATAR, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.data;
};

// ==================== Helper Components ====================
const TabButton = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
      active
        ? "bg-blue-500 text-white shadow-md"
        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
    }`}
  >
    {label}
  </button>
);

const FieldList = ({ title, fields, onUpdate, onRemove, onAdd, placeholder = "" }) => (
  <div className="space-y-3">
    <label className="block text-blue-700 mb-2 font-medium">{title}</label>
    {fields.map((field, index) => (
      <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <input
          type="text"
          value={field}
          onChange={(e) => onUpdate(index, e.target.value)}
          className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 text-sm px-3 py-2"
          aria-label="حذف"
        >
          🗑️ حذف
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={onAdd}
      className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
    >
      ➕ افزودن
    </button>
  </div>
);

// ==================== Main Component ====================
export default function AccountDetails() {
  const queryClient = useQueryClient();
  // const profileUser = useUserStore((state) => state.profile);

  // const user = useUserStore((state) => state.user);
  // const profileUser = useUserStore((state) => state.profile);
  const profileUser = useUserStore((state) => state.user);

  const [activeTab, setActiveTab] = useState("portfolio");
  const [uploading, setUploading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [toast, setToast] = useState(null);

  // ==================== Toast Helpers ====================
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  // ==================== Queries ====================
  const { 
    data: profile,
    isLoading,
    isError,
    error,
    refetch 
  } = useQuery({
    queryKey: [QUERY_KEYS.DENTIST_PROFILE],
    queryFn: fetchDentistProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    onError: (err) => {
      console.error('Error fetching profile:', err);
      showToast('خطا در دریافت اطلاعات پروفایل', 'error');
    },
  });
  useEffect(()=>{
    console.log(profile);
    
  },[])

  // ==================== Mutations ====================
  const updateMutation = useMutation({
    mutationFn: updateDentistProfile,
    onSuccess: () => {
      showToast('پروفایل با موفقیت به‌روزرسانی شد', 'success');
      queryClient.invalidateQueries([QUERY_KEYS.DENTIST_PROFILE]);
    },
    onError: (error) => {
      console.error('Update error:', error);
      showToast(error.response?.data?.message || 'خطا در به‌روزرسانی پروفایل', 'error');
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      showToast('تصویر با موفقیت آپلود شد', 'success');
      queryClient.invalidateQueries([QUERY_KEYS.DENTIST_PROFILE]);
    },
    onError: (error) => {
      console.error('Upload error:', error);
      showToast(error.response?.data?.message || 'خطا در آپلود تصویر', 'error');
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  // ==================== Form Setup ====================
  const defaultValues = useMemo(() => ({
    nationalCode: profile?.user?.profile?.nationalCode || '',
    medicalCouncilNumber: profile?.medicalCouncilNumber || '',
    birthDateShamsi: profile?.birthDateShamsi || '',
    occupation: profile?.occupation || '',
    specialization: profile?.specialization || '',
    // degree: profile?.degree || '',
    portfolio: profile?.portfolio || [],
    additionalPhoneNumbers: profile?.additionalPhoneNumbers || [],
    address: {
      shortAddr: profile?.address?.shortAddr || '',
      longAddr: profile?.address?.longAddr || '',
    },
    bio: profile?.user?.profile?.bio || '',
    fullName:profile?.user?.profile?.fullName,
    avatar:profile?.user?.profile?.avatar
  }), [profile]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  useEffect(() => {
    if (profile) {
      reset(defaultValues);
      if (profile.birthDateShamsi) {
        setBirthDate(profile.birthDateShamsi);
      }
    }
  }, [profile, reset, defaultValues]);

  // ==================== Field Arrays ====================
  const portfolioFields = useFieldArray({
    control,
    name: "portfolio",
  });

  const phoneFields = useFieldArray({
    control,
    name: "additionalPhoneNumbers",
  });

  // ==================== Handlers ====================
  const onDateChange = useCallback((date) => {
    setBirthDate(date);
    if (date) {
      setValue('birthDateShamsi', date.format(), { shouldDirty: true });
    }
  }, [setValue]);

  const handleAvatarUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('حجم فایل باید کمتر از ۲ مگابایت باشد', 'error');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showToast('فقط فایل تصویری مجاز است', 'error');
      return;
    }

    setUploading(true);
    uploadMutation.mutate(file);
  }, [uploadMutation, showToast]);

  const onSubmit = useCallback(async (data) => {
    try {
      const cleanData = { ...data };
      
      if (cleanData.portfolio?.length === 0) delete cleanData.portfolio;
      if (cleanData.additionalPhoneNumbers?.length === 0) delete cleanData.additionalPhoneNumbers;
      if (cleanData.address?.shortAddr === '') delete cleanData.address?.shortAddr;
      if (cleanData.address?.longAddr === '') delete cleanData.address?.longAddr;
      if (cleanData.profile?.bio === '') delete cleanData.profile?.bio;
      
      await updateMutation.mutateAsync(cleanData);
    } catch (error) {
      console.error('Submit error:', error);
    }
  }, [updateMutation]);
  
  const btnClick = () =>{
    // console.log(profileUser);
    console.log(user);

  }

  // ==================== Loading / Error States ====================
  if (isLoading) {
    return (
      <div className="pb-16 bg-blue-50 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pb-16 bg-blue-50 min-h-screen">
        <div className="container mx-auto max-w-4xl px-4">
          <ErrorState 
            error={error}
            onRetry={() => refetch()}
            message="خطا در دریافت اطلاعات پروفایل"
          />
        </div>
      </div>
    );
  }

  
  

  // ==================== Render ====================
  return (
    <div className="pb-16 bg-blue-50 min-h-screen relative">
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast}
        />
      )}

      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center gap-x-3 pt-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-blue-600" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات دندان‌پزشک</h4>
        </div>
        <button onClick={btnClick}>jfovfvmfdovdfiojv</button>

        {/* Form Container */}
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name (Read-only from user) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                

                <input 
                  {...register("fullName")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="نام و نام خانوادگی"
                />
                {errors.nationalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Phone (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
                <input 
                  value={profileUser?.user?.phoneNumber || '---'}
                  disabled 
                  className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
                />
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input 
                  value={profileUser?.user?.profile?.email || '---'}
                  disabled 
                  className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
                />
              </div>

              {/* Birthdate */}
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
                <DatePicker
                  value={birthDate}
                  onChange={onDateChange}
                  calendar={persian}
                  locale={persian_fa}
                  format="YYYY/MM/DD"
                  placeholder="تاریخ تولد را انتخاب کنید"
                  containerClassName="w-full"
                  inputClass="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors.birthDateShamsi && (
                  <p className="text-red-500 text-sm mt-1">{errors.birthDateShamsi.message}</p>
                )}
              </div>

              {/* National Code */}
              <div>
                <label htmlFor="nationalCode" className="block text-sm font-medium text-gray-700">کد ملی</label>
                 <input 
                  value={profileUser?.user?.profile?.nationalCode || '---'}
                  disabled 
                  className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
                />
                {errors.nationalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.nationalCode.message}</p>
                )}
              </div>

              {/* Medical Council Number */}
              <div>
                <label htmlFor="medicalCouncilNumber" className="block text-sm font-medium text-gray-700">کد نظام پزشکی</label>
                 <input 
                  value={profileUser?.medicalCouncilNumber || '---'}
                  disabled 
                  className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
                />
                {errors.medicalCouncilNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.medicalCouncilNumber.message}</p>
                )}
              </div>

              {/* Occupation */}
              {/* <div>
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">شغل</label>
                <input 
                  {...register("occupation")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div> */}

              {/* Specialization */}
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">تخصص</label>
                <input 
                  {...register("specialization")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder={profileUser?.specialization?"": "تخصص های شما"}
                />
              </div>

              {/* Degree */}
              {/* <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">مدرک تحصیلی</label>
                <input 
                  {...register("degree")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div> */}

              {/* Short Address */}
              <div>
                <label htmlFor="address.shortAddr" className="block text-sm font-medium text-gray-700">آدرس خلاصه</label>
                <input 
                  {...register("address.shortAddr")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="مثلاً: تهران، خیابان ولیعصر"
                />
              </div>

              {/* Avatar Upload */}
              <div>

                {
                  profileUser?.user?.profile?.avatar?
                  (
                    <div className="relative w-24">
                      <img src={profileUser?.user?.profile?.avatar} alt="profile image" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                        placeholder="change avatar"
                      />
                    </div>
                  ):(
                    <>
                    <label className="block text-sm font-medium text-gray-700">آپلود تصویر پروفایل</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                        className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 disabled:opacity-50"
                      />
                      {uploading && (
                        <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
                          <LoadingSpinner size="small" />
                          در حال آپلود...
                        </p>
                      )}
                    </>
                    
                    )
                }
                
              </div>
            </div>

            {/* Long Address - Full Width */}
            <div>
              <label htmlFor="address.longAddr" className="block text-sm font-medium text-gray-700">آدرس دقیق مطب</label>
              <textarea
                {...register("address.longAddr")}
                rows={3}
                className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                placeholder="مثال: تهران، خیابان ولیعصر، پلاک ۱۲۳۴، طبقه ۵"
              />
              {errors.address?.longAddr && (
                <p className="text-red-500 text-sm mt-1">{errors.address.longAddr.message}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">درباره من</label>
              <textarea
                {...register("bio")}
                rows={5}
                className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                placeholder="توضیحات درباره تخصص، سابقه و ..."
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
              <TabButton 
                label="نمونه کارها" 
                active={activeTab === "portfolio"} 
                onClick={() => setActiveTab("portfolio")} 
              />
              <TabButton 
                label="شماره‌های تماس دیگر" 
                active={activeTab === "phone_numbers"} 
                onClick={() => setActiveTab("phone_numbers")} 
              />
            </div>

            {/* Tab Content */}
            {activeTab === "portfolio" && (
              <FieldList
                title="نمونه کارها (لینک تصاویر)"
                fields={watch('portfolio') || []}
                onUpdate={(index, value) => portfolioFields.update(index, value)}
                onRemove={portfolioFields.remove}
                onAdd={() => portfolioFields.append('')}
                placeholder="https://example.com/image.jpg"
              />
            )}

            {activeTab === "phone_numbers" && (
              <FieldList
                title="شماره‌های تماس دیگر (حداکثر ۲ شماره)"
                fields={watch('additionalPhoneNumbers') || []}
                onUpdate={(index, value) => phoneFields.update(index, value)}
                onRemove={phoneFields.remove}
                onAdd={() => phoneFields.append('')}
                placeholder="مثال: 09123456789"
              />
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={updateMutation.isLoading || !isDirty || !isValid}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {updateMutation.isLoading ? (
                  <>
                    <LoadingSpinner size="small" />
                    در حال ذخیره...
                  </>
                ) : (
                  'ذخیره تغییرات'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


// ---------------------------------------



// import React, { useState, useCallback, useMemo } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from "zod";
// import axios from "axios";
// import { useUserStore } from "@/stores/useUserStore";
// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// const axiosInstance = axios.create({
//   baseURL: 'https://dentist-reyn.onrender.com',
//   timeout: 10000,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// const Toast = ({ message, type = 'success', onClose }) => {
//   React.useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
//   const icon = type === 'success' ? '✓' : '✗';

//   return (
//     <div className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn`}>
//       <span className="text-xl">{icon}</span>
//       <span>{message}</span>
//     </div>
//   );
// };

// const LoadingSpinner = ({ size = "medium" }) => {
//   const sizeClasses = {
//     small: "w-4 h-4",
//     medium: "w-8 h-8",
//     large: "w-12 h-12"
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
//     </div>
//   );
// };

// const ErrorState = ({ error, onRetry, message }) => (
//   <div className="text-center py-12 px-4">
//     <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//       <h3 className="text-lg font-medium text-red-800 mb-2">{message || 'خطا در دریافت اطلاعات'}</h3>
//       <p className="text-sm text-red-600 mb-4">
//         {error?.response?.data?.message || error?.message || 'خطای ناشناخته'}
//       </p>
//       <button
//         onClick={onRetry}
//         className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
//       >
//         تلاش مجدد
//       </button>
//     </div>
//   </div>
// );

// // ==================== Validation Schema ====================
// const PHONE_REGEX = /^09\d{9}$/;

// const schema = z.object({
//   medicalCouncilNumber: z.string().optional(),
//   birthDateShamsi: z.string().optional(),
//   occupation: z.string().optional(),
//   specialization: z.string().optional(),
//   degree: z.string().optional(),
//   yearsOfExperience: z.number().min(0).max(50).optional(),
//   services: z.array(z.string()).optional(),
//   portfolio: z.array(z.string().url("آدرس معتبر نیست")).optional(),
//   additionalPhoneNumbers: z.array(
//     z.string().regex(PHONE_REGEX, "شماره معتبر نیست (مثال: 09123456789)")
//   ).max(2, "حداکثر دو شماره مجاز است").optional(),
//   address: z.object({
//     shortAddr: z.string().optional(),
//     longAddr: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است.").optional(),
//   }).optional(),
//   bio: z.string().max(1000, "حداکثر ۱۰۰۰ کاراکتر").optional(),
// });

// // ==================== Constants ====================
// const QUERY_KEYS = {
//   DENTIST_PROFILE: 'dentistProfile',
// };

// const API_ENDPOINTS = {
//   DENTIST_ME: '/api/v1/dentist/me',
//   UPLOAD_AVATAR: '/api/v1/dentist/avatar',
// };

// // ==================== API Functions ====================
// const fetchDentistProfile = async () => {
//   const { data } = await axiosInstance.get(API_ENDPOINTS.DENTIST_ME);
//   return data.data;
// };

// const updateDentistProfile = async (profileData) => {
//   const { data } = await axiosInstance.patch(API_ENDPOINTS.DENTIST_ME, profileData);
//   return data.data;
// };

// const uploadAvatar = async (file) => {
//   const formData = new FormData();
//   formData.append('avatar', file);

//   const { data } = await axiosInstance.post(API_ENDPOINTS.UPLOAD_AVATAR, formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
//   return data.data;
// };

// // ==================== Helper Components ====================
// const TabButton = ({ label, active, onClick }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${active
//         ? "bg-blue-500 text-white shadow-md"
//         : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//       }`}
//   >
//     {label}
//   </button>
// );

// const FieldList = ({ title, fields, onUpdate, onRemove, onAdd, placeholder = "" }) => (
//   <div className="space-y-3">
//     <label className="block text-blue-700 mb-2 font-medium">{title}</label>
//     {fields.map((field, index) => (
//       <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//         <input
//           type="text"
//           value={field}
//           onChange={(e) => onUpdate(index, e.target.value)}
//           className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
//           placeholder={placeholder}
//         />
//         <button
//           type="button"
//           onClick={() => onRemove(index)}
//           className="text-red-500 hover:text-red-700 text-sm px-3 py-2"
//           aria-label="حذف"
//         >
//           🗑️ حذف
//         </button>
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={onAdd}
//       className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
//     >
//       ➕ افزودن
//     </button>
//   </div>
// );

// // ==================== Main Component ====================
// export default function AccountDetails() {
//   const queryClient = useQueryClient();
//   const profileUser = useUserStore((state) => state.profile);

//   const [activeTab, setActiveTab] = useState("portfolio");
//   const [uploading, setUploading] = useState(false);
//   const [birthDate, setBirthDate] = useState(null);
//   const [toast, setToast] = useState(null);

//   // ==================== Toast Helpers ====================
//   const showToast = useCallback((message, type = 'success') => {
//     setToast({ message, type });
//   }, []);

//   const hideToast = useCallback(() => {
//     setToast(null);
//   }, []);

//   // ==================== Queries ====================
//   const {
//     data: profile,
//     isLoading,
//     isError,
//     error,
//     refetch
//   } = useQuery({
//     queryKey: [QUERY_KEYS.DENTIST_PROFILE],
//     queryFn: fetchDentistProfile,
//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//     retry: 2,
//   });

//   // ==================== Mutations ====================
//   const updateMutation = useMutation({
//     mutationFn: updateDentistProfile,
//     onSuccess: () => {
//       showToast('پروفایل با موفقیت به‌روزرسانی شد', 'success');
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DENTIST_PROFILE] });
//     },
//     onError: (error) => {
//       console.error('Update error:', error);
//       showToast(error.response?.data?.message || 'خطا در به‌روزرسانی پروفایل', 'error');
//     },
//   });

//   const uploadMutation = useMutation({
//     mutationFn: uploadAvatar,
//     onSuccess: () => {
//       showToast('تصویر با موفقیت آپلود شد', 'success');
//       queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DENTIST_PROFILE] });
//     },
//     onError: (error) => {
//       console.error('Upload error:', error);
//       showToast(error.response?.data?.message || 'خطا در آپلود تصویر', 'error');
//     },
//     onSettled: () => {
//       setUploading(false);
//     },
//   });

//   // ==================== Form Setup ====================
//   const defaultValues = useMemo(() => ({
//     medicalCouncilNumber: profile?.medicalCouncilNumber || '',
//     birthDateShamsi: profile?.birthDateShamsi || '',
//     occupation: profile?.occupation || '',
//     specialization: profile?.specialization || '',
//     degree: profile?.degree || '',
//     yearsOfExperience: profile?.yearsOfExperience || '',
//     services: profile?.services || [],
//     portfolio: profile?.portfolio || [],
//     additionalPhoneNumbers: profile?.additionalPhoneNumbers || [],
//     address: {
//       shortAddr: profile?.address?.shortAddr || '',
//       longAddr: profile?.address?.longAddr || '',
//     },
//     bio: profile?.bio || '',
//   }), [profile]);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     watch,
//     formState: { errors, isDirty, isValid },
//     reset,
//   } = useForm({
//     resolver: zodResolver(schema),
//     mode: 'onChange',
//     defaultValues,
//   });

//   React.useEffect(() => {
//     if (profile) {
//       reset(defaultValues);
//       if (profile.birthDateShamsi) {
//         setBirthDate(profile.birthDateShamsi);
//       }
//     }
//   }, [profile, reset, defaultValues]);

//   // ==================== Field Arrays ====================
//   const portfolioFields = useFieldArray({
//     control,
//     name: "portfolio",
//   });

//   const phoneFields = useFieldArray({
//     control,
//     name: "additionalPhoneNumbers",
//   });

//   const servicesFields = useFieldArray({
//     control,
//     name: "services",
//   });

//   // ==================== Handlers ====================
//   const onDateChange = useCallback((date) => {
//     setBirthDate(date);
//     if (date) {
//       setValue('birthDateShamsi', date.format(), { shouldDirty: true });
//     }
//   }, [setValue]);

//   const handleAvatarUpload = useCallback(async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (file.size > 2 * 1024 * 1024) {
//       showToast('حجم فایل باید کمتر از ۲ مگابایت باشد', 'error');
//       return;
//     }

//     if (!file.type.startsWith('image/')) {
//       showToast('فقط فایل تصویری مجاز است', 'error');
//       return;
//     }

//     setUploading(true);
//     uploadMutation.mutate(file);
//   }, [uploadMutation, showToast]);

//   const onSubmit = useCallback(async (data) => {
//     try {
//       const cleanData = { ...data };

//       // Remove empty arrays
//       if (cleanData.portfolio?.length === 0) delete cleanData.portfolio;
//       if (cleanData.additionalPhoneNumbers?.length === 0) delete cleanData.additionalPhoneNumbers;
//       if (cleanData.services?.length === 0) delete cleanData.services;
      
//       // Remove empty address fields
//       if (cleanData.address?.shortAddr === '') delete cleanData.address.shortAddr;
//       if (cleanData.address?.longAddr === '') delete cleanData.address.longAddr;
//       if (Object.keys(cleanData.address).length === 0) delete cleanData.address;
      
//       // Remove empty bio
//       if (cleanData.bio === '') delete cleanData.bio;

//       await updateMutation.mutateAsync(cleanData);
//     } catch (error) {
//       console.error('Submit error:', error);
//     }
//   }, [updateMutation]);

//   // ==================== Loading / Error States ====================
//   if (isLoading) {
//     return (
//       <div className="pb-16 bg-blue-50 min-h-screen">
//         <div className="container mx-auto max-w-4xl px-4">
//           <div className="flex justify-center items-center h-64">
//             <LoadingSpinner size="large" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="pb-16 bg-blue-50 min-h-screen">
//         <div className="container mx-auto max-w-4xl px-4">
//           <ErrorState
//             error={error}
//             onRetry={() => refetch()}
//             message="خطا در دریافت اطلاعات پروفایل"
//           />
//         </div>
//       </div>
//     );
//   }

//   // ==================== Render ====================
//   return (
//     <div className="pb-16 bg-blue-50 min-h-screen relative">
//       {/* Toast Notification */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={hideToast}
//         />
//       )}

//       <div className="container mx-auto max-w-4xl px-4">
//         {/* Header */}
//         <div className="flex items-center gap-x-3 pt-10">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-blue-600" viewBox="0 0 24 24">
//             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
//           </svg>
//           <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات دندان‌پزشک</h4>
//         </div>

//         {/* Form Container */}
//         <div className="bg-white shadow-md p-6 rounded-xl mt-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid sm:grid-cols-2 gap-6">
//               {/* Name (Read-only from user) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
//                 <input
//                   value={profileUser?.profile?.fullName || '---'}
//                   disabled
//                   className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                 />
//               </div>

//               {/* Phone (Read-only) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
//                 <input
//                   value={profileUser?.phoneNumber || profile?.user?.phoneNumber || '---'}
//                   disabled
//                   className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                 />
//               </div>

//               {/* Email (Read-only) */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">ایمیل</label>
//                 <input
//                   value={profileUser?.profile?.email || '---'}
//                   disabled
//                   className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
//                 />
//               </div>

//               {/* Birthdate */}
//               <div>
//                 <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
//                 <DatePicker
//                   value={birthDate}
//                   onChange={onDateChange}
//                   calendar={persian}
//                   locale={persian_fa}
//                   format="YYYY/MM/DD"
//                   placeholder="تاریخ تولد را انتخاب کنید"
//                   containerClassName="w-full"
//                   inputClass="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//                 {errors.birthDateShamsi && (
//                   <p className="text-red-500 text-sm mt-1">{errors.birthDateShamsi.message}</p>
//                 )}
//               </div>

//               {/* Medical Council Number */}
//               <div>
//                 <label htmlFor="medicalCouncilNumber" className="block text-sm font-medium text-gray-700">کد نظام پزشکی</label>
//                 <input
//                   {...register("medicalCouncilNumber")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 />
//                 {errors.medicalCouncilNumber && (
//                   <p className="text-red-500 text-sm mt-1">{errors.medicalCouncilNumber.message}</p>
//                 )}
//               </div>

//               {/* Years of Experience */}
//               <div>
//                 <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">سال‌های سابقه کاری</label>
//                 <input
//                   type="number"
//                   {...register("yearsOfExperience", { valueAsNumber: true })}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="مثلاً: 10"
//                 />
//                 {errors.yearsOfExperience && (
//                   <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience.message}</p>
//                 )}
//               </div>

//               {/* Occupation */}
//               <div>
//                 <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">شغل</label>
//                 <input
//                   {...register("occupation")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="مثال: دندانپزشک عمومی"
//                 />
//               </div>

//               {/* Specialization */}
//               <div>
//                 <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">تخصص</label>
//                 <input
//                   {...register("specialization")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="مثال: ارتودنسی"
//                 />
//               </div>

//               {/* Degree */}
//               <div>
//                 <label htmlFor="degree" className="block text-sm font-medium text-gray-700">مدرک تحصیلی</label>
//                 <input
//                   {...register("degree")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="مثال: دکترای حرفه‌ای"
//                 />
//               </div>

//               {/* Short Address */}
//               <div>
//                 <label htmlFor="address.shortAddr" className="block text-sm font-medium text-gray-700">آدرس خلاصه</label>
//                 <input
//                   {...register("address.shortAddr")}
//                   className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   placeholder="مثلاً: تهران، خیابان ولیعصر"
//                 />
//               </div>

//               {/* Avatar Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">آپلود تصویر پروفایل</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleAvatarUpload}
//                   disabled={uploading}
//                   className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 disabled:opacity-50"
//                 />
//                 {uploading && (
//                   <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
//                     <LoadingSpinner size="small" />
//                     در حال آپلود...
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Long Address - Full Width */}
//             <div>
//               <label htmlFor="address.longAddr" className="block text-sm font-medium text-gray-700">آدرس دقیق مطب</label>
//               <textarea
//                 {...register("address.longAddr")}
//                 rows={3}
//                 className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
//                 placeholder="مثال: تهران، خیابان ولیعصر، پلاک ۱۲۳۴، طبقه ۵"
//               />
//               {errors.address?.longAddr && (
//                 <p className="text-red-500 text-sm mt-1">{errors.address.longAddr.message}</p>
//               )}
//             </div>

//             {/* Bio */}
//             <div>
//               <label htmlFor="bio" className="block text-sm font-medium text-gray-700">درباره من</label>
//               <textarea
//                 {...register("bio")}
//                 rows={5}
//                 className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
//                 placeholder="توضیحات درباره تخصص، سابقه و ..."
//               />
//               {errors.bio && (
//                 <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
//               )}
//             </div>

//             {/* Tabs */}
//             <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
//               <TabButton
//                 label="خدمات"
//                 active={activeTab === "services"}
//                 onClick={() => setActiveTab("services")}
//               />
//               <TabButton
//                 label="نمونه کارها"
//                 active={activeTab === "portfolio"}
//                 onClick={() => setActiveTab("portfolio")}
//               />
//               <TabButton
//                 label="شماره‌های تماس دیگر"
//                 active={activeTab === "phone_numbers"}
//                 onClick={() => setActiveTab("phone_numbers")}
//               />
//             </div>

//             {/* Tab Content */}
//             {activeTab === "services" && (
//               <FieldList
//                 title="خدمات ارائه شده"
//                 fields={watch('services') || []}
//                 onUpdate={(index, value) => servicesFields.update(index, value)}
//                 onRemove={servicesFields.remove}
//                 onAdd={() => servicesFields.append('')}
//                 placeholder="مثال: جرم‌گیری، عصب‌کشی"
//               />
//             )}

//             {activeTab === "portfolio" && (
//               <FieldList
//                 title="نمونه کارها (لینک تصاویر)"
//                 fields={watch('portfolio') || []}
//                 onUpdate={(index, value) => portfolioFields.update(index, value)}
//                 onRemove={portfolioFields.remove}
//                 onAdd={() => portfolioFields.append('')}
//                 placeholder="https://example.com/image.jpg"
//               />
//             )}

//             {activeTab === "phone_numbers" && (
//               <FieldList
//                 title="شماره‌های تماس دیگر (حداکثر ۲ شماره)"
//                 fields={watch('additionalPhoneNumbers') || []}
//                 onUpdate={(index, value) => phoneFields.update(index, value)}
//                 onRemove={phoneFields.remove}
//                 onAdd={() => phoneFields.append('')}
//                 placeholder="مثال: 09123456789"
//               />
//             )}

//             {/* Submit Button */}
//             <div className="flex justify-end mt-8">
//               <button
//                 type="submit"
//                 disabled={updateMutation.isPending || !isDirty}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {updateMutation.isPending ? (
//                   <>
//                     <LoadingSpinner size="small" />
//                     در حال ذخیره...
//                   </>
//                 ) : (
//                   'ذخیره تغییرات'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { z } from "zod";
// import axios from "axios";
// import DatePicker from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

// // ================= AXIOS =================
// const axiosInstance = axios.create({
//   baseURL: "https://dentist-reyn.onrender.com",
//   timeout: 10000,
//   withCredentials: true,
//   xsrfCookieName: "XSRF-TOKEN",
//   xsrfHeaderName: "X-CSRF-Token",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ================= API =================
// const fetchDentistProfile = async () => {
//   const { data } = await axiosInstance.get("/api/v1/dentist/me");
//   return data.data;
// };

// const updateDentistProfile = async (payload) => {
//   // 1. گرفتن و set شدن cookie
//   await axiosInstance.get("/api/v1/auth/csrf-token");

//   // 2. استخراج token از cookie
//   const csrfToken = getCookie("XSRF-TOKEN");

//   // 3. ارسال درخواست اصلی با header
//   const { data } = await axiosInstance.patch(
//     "/api/v1/dentist/me",
//     payload,
//     {
//       headers: {
//         "X-CSRF-Token": csrfToken,
//       },
//     }
//   );

//   return data.data;
// };

// // ================= VALIDATION =================
// const PHONE_REGEX = /^09\d{9}$/;

// const schema = z.object({
//   medicalCouncilNumber: z.string().optional(),
//   birthDateShamsi: z.string().optional(),
//   occupation: z.string().optional(),
//   specialization: z.string().optional(),
//   degree: z.string().optional(),
//   clinicAddress: z.string().optional(),
//   services: z.array(z.string()).optional(),
//   portfolio: z.array(z.string().url("لینک نامعتبر")).optional(),
//   additionalPhoneNumbers: z.array(
//     z.string().regex(PHONE_REGEX, "شماره نامعتبر")
//   ).max(2).optional(),
// });

// // ================= UI COMPONENTS =================
// const Toast = ({ message, type = "success", onClose }) => {
//   useEffect(() => {
//     const t = setTimeout(onClose, 3000);
//     return () => clearTimeout(t);
//   }, [onClose]);

//   return (
//     <div
//       className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-lg text-white shadow-lg ${
//         type === "success" ? "bg-green-500" : "bg-red-500"
//       }`}
//     >
//       {message}
//     </div>
//   );
// };

// const Spinner = () => (
//   <div className="w-6 h-6 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
// );

// const ErrorState = ({ error, retry }) => (
//   <div className="p-10 text-center">
//     <p className="text-red-600 mb-4">
//       {error?.message || "خطا در دریافت اطلاعات"}
//     </p>
//     <button onClick={retry} className="px-4 py-2 bg-red-500 text-white rounded">
//       تلاش مجدد
//     </button>
//   </div>
// );

// const TabButton = ({ label, active, onClick }) => (
//   <button
//     type="button"
//     onClick={onClick}
//     className={`px-3 py-1 rounded-full text-sm ${
//       active ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"
//     }`}
//   >
//     {label}
//   </button>
// );

// // ================= FIELD LIST =================
// const FieldList = ({ fields, setFields, placeholder }) => {
//   const update = (i, val) => {
//     const copy = [...fields];
//     copy[i] = val;
//     setFields(copy);
//   };

//   const remove = (i) => setFields(fields.filter((_, idx) => idx !== i));

//   const add = () => setFields([...fields, ""]);

//   return (
//     <div className="space-y-2">
//       {fields.map((f, i) => (
//         <div key={i} className="flex gap-2">
//           <input
//             value={f}
//             onChange={(e) => update(i, e.target.value)}
//             className="border p-2 flex-1"
//             placeholder={placeholder}
//           />
//           <button onClick={() => remove(i)}>❌</button>
//         </div>
//       ))}
//       <button onClick={add} className="text-blue-600">+ افزودن</button>
//     </div>
//   );
// };

// // ================= MAIN =================
// export default function AccountDetails() {
//   const queryClient = useQueryClient();

//   const [toast, setToast] = useState(null);
//   const [activeTab, setActiveTab] = useState("portfolio");
//   const [birthDate, setBirthDate] = useState(null);

//   const showToast = (m, t = "success") => setToast({ message: m, type: t });

//   // ---------- QUERY ----------
//   const { data: profile, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ["dentistProfile"],
//     queryFn: fetchDentistProfile,
//   });

//   // ---------- FORM DEFAULT ----------
//   const defaultValues = useMemo(() => ({
//     medicalCouncilNumber: profile?.medicalCouncilNumber || "",
//     birthDateShamsi: profile?.birthDateShamsi || "",
//     occupation: profile?.occupation || "",
//     specialization: profile?.specialization || "",
//     degree: profile?.degree || "",
//     clinicAddress: profile?.address?.longAddr || "",
//     services: profile?.services || [],
//     portfolio: profile?.portfolio || [],
//     additionalPhoneNumbers: profile?.additionalPhoneNumbers || [],
//   }), [profile]);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     reset,
//     formState: { isDirty, isValid, errors }
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues,
//     mode: "onChange",
//   });

//   useEffect(() => {
//     if (profile) {
//       reset(defaultValues);
//       setBirthDate(profile.birthDateShamsi || null);
//     }
//   }, [profile]);

//   // ---------- MUTATION ----------
//   const mutation = useMutation({
//     mutationFn: updateDentistProfile,
//     onSuccess: () => {
//       showToast("آپدیت شد");
//       queryClient.invalidateQueries({ queryKey: ["dentistProfile"] });
//     },
//     onError: () => {
//       showToast("خطا در آپدیت", "error");
//     },
//   });

//   // ---------- HELPERS ----------
//   const updateArray = (key, index, value) => {
//     const arr = [...(watch(key) || [])];
//     arr[index] = value;
//     setValue(key, arr, { shouldDirty: true });
//   };

//   const removeArray = (key, index) => {
//     const arr = [...(watch(key) || [])];
//     arr.splice(index, 1);
//     setValue(key, arr, { shouldDirty: true });
//   };

//   const addArray = (key) => {
//     setValue(key, [...(watch(key) || []), ""], { shouldDirty: true });
//   };

//   // ---------- SUBMIT ----------
//   const onSubmit = async (data) => {
//     const payload = {
//       ...data,
//       services: data.services || [],
//       portfolio: data.portfolio || [],
//       additionalPhoneNumbers: data.additionalPhoneNumbers || [],
//     };

//     mutation.mutate(payload);
//   };

//   // ---------- LOADING ----------
//   if (isLoading) return <div className="p-10"><Spinner /></div>;

//   if (isError) return <ErrorState error={error} retry={refetch} />;

//   // ================= RENDER =================
//   return (
//     <div className="p-6 max-w-3xl mx-auto">

//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <h2 className="text-xl font-bold mb-4">ویرایش پروفایل</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         <input {...register("medicalCouncilNumber")} placeholder="کد نظام پزشکی" className="border p-2 w-full" />

//         <input {...register("occupation")} placeholder="شغل" className="border p-2 w-full" />

//         <input {...register("specialization")} placeholder="تخصص" className="border p-2 w-full" />

//         <input {...register("degree")} placeholder="مدرک" className="border p-2 w-full" />

//         <input {...register("clinicAddress")} placeholder="آدرس کلینیک" className="border p-2 w-full" />

//         {/* PORTFOLIO */}
//         <h3>نمونه کارها</h3>
//         <FieldList
//           fields={watch("portfolio") || []}
//           setFields={(v) => setValue("portfolio", v)}
//           placeholder="لینک تصویر"
//         />

//         {/* PHONES */}
//         <h3>شماره‌ها</h3>
//         <FieldList
//           fields={watch("additionalPhoneNumbers") || []}
//           setFields={(v) => setValue("additionalPhoneNumbers", v)}
//           placeholder="0912..."
//         />

//         <button
//           disabled={mutation.isLoading}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {mutation.isLoading ? "در حال ذخیره..." : "ذخیره"}
//         </button>

//       </form>
//     </div>
//   );
// }