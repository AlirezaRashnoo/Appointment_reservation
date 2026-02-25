import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams } from "react-router-dom";
import apiService from "@/features/api";

const createSchema = (userRole) => {
  const baseSchema = {
    // فیلدهای اصلی کاربر
    phoneNumber: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional(),
    
    // فیلدهای پروفایل
    email: z.string().email("ایمیل معتبر نیست").optional(),
    firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").optional(),
    lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد").optional(),
    fullName: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد").optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    
    // فیلدهای اضافی برای پروفایل
    birthDate: z.string().optional(),
    nationalCode: z.string().optional(),
    address: z.string().optional(),
    longAddress: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است.").optional(),
    education: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    phoneNumbers: z.array(z.string().regex(/^09\d{9}$/, "شماره معتبر نیست")).max(2, "حداکثر دو شماره مجاز است").optional(),
  };

  // فیلدهای مخصوص دندانپزشک
  if (userRole === 'dentist') {
    baseSchema.medicalCode = z.string().min(1, "کد نظام پزشکی الزامی است").optional();
    baseSchema.specialty = z.string().min(1, "تخصص الزامی است").optional();
    baseSchema.experience = z.string().optional();
  }

  // فیلدهای مخصوص بیمار
  if (userRole === 'patient') {
    baseSchema.bloodType = z.string().optional();
    baseSchema.allergies = z.string().optional();
    baseSchema.medicalHistory = z.string().optional();
  }

  return z.object(baseSchema);
};

// تابع دریافت اطلاعات کاربر از API
const fetchUserById = async (userId) => {
  try {
    const response = await apiService.get(`/users/${userId}`);
    
    if (response.data && response.data.data) {
      // ساختار: { message, code, timestamp, path, data: { user fields + profile } }
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error(error.response?.data?.message || 'خطا در دریافت اطلاعات کاربر');
  }
};

// تابع به‌روزرسانی کاربر از طریق API
const updateUser = async ({ userId, userData }) => {
  try {
    // تشخیص اینکه داده‌ها مربوط به کاربر اصلی هستند یا پروفایل
    const userMainFields = ['phoneNumber', 'role', 'status'];
    const profileFields = ['email', 'firstName', 'lastName', 'fullName', 'bio', 'avatar', 
      'birthDate', 'nationalCode', 'address', 'longAddress', 'education', 'services', 
      'phoneNumbers', 'medicalCode', 'specialty', 'experience', 'bloodType', 'allergies', 
      'medicalHistory'];
    
    const userMainData = {};
    const profileData = {};
    
    Object.keys(userData).forEach(key => {
      if (userMainFields.includes(key)) {
        userMainData[key] = userData[key];
      } else if (profileFields.includes(key)) {
        profileData[key] = userData[key];
      }
    });
    
    // ارسال به API مناسب
    let response;
    
    if (Object.keys(profileData).length > 0) {
      // آپدیت پروفایل
      response = await apiService.patch(`/users/${userId}/profile`, profileData);
    } else {
      // آپدیت اطلاعات اصلی کاربر
      response = await apiService.patch(`/users/${userId}`, userMainData);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(error.response?.data?.message || 'خطا در بروزرسانی اطلاعات کاربر');
  }
};

export default function ProfileUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState("education");
  const [userRole, setUserRole] = useState('dentist');

  // دریافت اطلاعات کاربر از API
  const { data: userData, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });

  // استخراج اطلاعات کاربر و پروفایل
  const user = userData || {};
  const profile = user.profile || {};

  // تنظیم نوع کاربر وقتی داده‌ها لود شدند
  useEffect(() => {
    if (user?.role) {
      setUserRole(user.role);
    }
  }, [user]);

  // ایجاد schema داینامیک
  const schema = createSchema(userRole);

  // mutation برای آپدیت کاربر
  const mutation = useMutation({
    mutationFn: (updatedData) => updateUser({ userId: id, userData: updatedData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      alert("اطلاعات با موفقیت بروزرسانی شد");
    },
    onError: (error) => alert(`خطا در بروزرسانی: ${error.message}`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      education: [],
      services: [],
      phoneNumbers: [],
    }
  });

  // ریست فرم وقتی کاربر لود شد
  useEffect(() => {
    if (user) {
      // ترکیب اطلاعات کاربر اصلی و پروفایل
      const formData = {
        // اطلاعات اصلی کاربر
        phoneNumber: user.phoneNumber || '',
        role: user.role || '',
        status: user.status || '',
        
        // اطلاعات پروفایل
        email: profile.email || '',
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        fullName: profile.fullName || '',
        bio: profile.bio || '',
        avatar: profile.avatar || '',
        
        // فیلدهای اضافی (با مقادیر پیش‌فرض)
        birthDate: '',
        nationalCode: '',
        address: '',
        longAddress: '',
        education: [],
        services: [],
        phoneNumbers: [],
        medicalCode: '',
        specialty: '',
        experience: '',
        bloodType: '',
        allergies: '',
        medicalHistory: '',
      };
      
      // اگر profile فیلدهای اضافی دارد، آنها را هم اضافه کن
      if (profile.additionalData) {
        Object.assign(formData, profile.additionalData);
      }
      
      reset(formData);
    }
  }, [user, profile, reset]);

  const education = watch("education") || [];
  const services = watch("services") || [];
  const phoneNumbers = watch("phoneNumbers") || [];

  // آپلود آواتار
  const uploadAvatar = async (file) => {
    try {
      if (!id) {
        setUploadError("شناسه کاربر موجود نیست");
        return;
      }

      setUploading(true);
      setUploadError("");

      if (!file) throw new Error("فایل انتخاب نشده");

      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await apiService.post(`/users/${id}/profile/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.data && response.data.data.avatarUrl) {
        setValue("avatar", response.data.data.avatarUrl);
        alert("آپلود عکس با موفقیت انجام شد");
        
        // به‌روزرسانی کش
        queryClient.invalidateQueries({ queryKey: ["user", id] });
      }
    } catch (error) {
      setUploadError(error.response?.data?.message || "خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (formData) => {
    // حذف فیلدهای خالی و تکراری
    const cleanData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v != null && v !== '')
    );
    
    mutation.mutate(cleanData);
  };

  // توابع مدیریت فیلدهای داینامیک
  const addField = (key) => {
    const current = watch(key) || [];
    setValue(key, [...current, ""]);
  };

  const updateField = (key, index, value) => {
    const current = [...(watch(key) || [])];
    current[index] = value;
    setValue(key, current);
  };

  const removeField = (key, index) => {
    const current = [...(watch(key) || [])];
    current.splice(index, 1);
    setValue(key, current);
  };

  if (isLoading) return <p className="text-center py-8">در حال بارگذاری اطلاعات...</p>;
  if (error) return <p className="text-red-500 text-center py-8">خطا در بارگذاری پروفایل: {error.message}</p>;
  if (!user) return <p className="text-center py-8">کاربر یافت نشد</p>;

  return (
    <div className="pb-16 bg-blue-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center gap-x-3 pt-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-blue-600" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-800">
            ویرایش اطلاعات {userRole}
          </h4>
          <span className={`badge ${userRole === 'dentist' ? 'badge-info' : 'badge-success'} mr-2`}>
            {userRole}
          </span>
          
          {/* نمایش وضعیت */}
          <span className={`badge ${user.status === 'active' ? 'badge-success' : user.status === 'pending' ? 'badge-warning' : 'badge-error'}`}>
            {user.status === 'active' ? 'فعال' : user.status === 'pending' ? 'در انتظار تایید' : 'غیرفعال'}
          </span>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">نام</label>
                <input {...register("firstName")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">نام خانوادگی</label>
                <input {...register("lastName")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
                <input className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-100 focus:outline-none cursor-not-allowed" 
                  value={user?.phoneNumber || ''} 
                  readOnly 
                  disabled
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input {...register("email")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* BirthDate */}
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
                <input type="date" {...register("birthDate")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>

              {/* National Code */}
              <div>
                <label htmlFor="nationalCode" className="block text-sm font-medium text-gray-700">کد ملی</label>
                <input {...register("nationalCode")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>

              {/* فیلدهای مخصوص دندانپزشک */}
              {userRole === 'dentist' && (
                <>
                  <div>
                    <label htmlFor="medicalCode" className="block text-sm font-medium text-gray-700">کد نظام پزشکی</label>
                    <input {...register("medicalCode")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    {errors.medicalCode && <p className="text-red-500 text-sm mt-1">{errors.medicalCode.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">تخصص</label>
                    <input {...register("specialty")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">سابقه کار (سال)</label>
                    <input {...register("experience")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">آدرس</label>
                    <input {...register("address")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  </div>
                </>
              )}

              {/* Upload Image */}
              <div className="space-y-3 col-span-2 sm:col-span-1">
                <p className="text-sm font-medium text-gray-700">عکس پروفایل</p>
                <div className="flex items-center gap-4">
                  {watch('avatar') || profile.avatar ? (
                    <div className="size-[90px] overflow-hidden border border-gray-200 rounded-full">
                      <img 
                        src={watch('avatar') || profile.avatar} 
                        className="size-full object-cover" 
                        alt="profile_img" 
                      />
                    </div>
                  ) : (
                    <div className="w-[90px] h-[90px] rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs text-center">بدون عکس</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">تغییر تصویر</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadAvatar(file);
                      }}
                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                    {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
                    {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">درباره من</label>
                <textarea
                  {...register("bio")}
                  rows={5}
                  className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
              </div>
            </div>

            {/* تب‌های داینامیک - فقط برای دندانپزشک */}
            {userRole === "dentist" && (
              <>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
                  <TabButton label="سوابق تحصیلی" active={activeTab === "education"} onClick={() => setActiveTab("education")} />
                  <TabButton label="خدمات قابل ارائه" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
                  <TabButton label="آدرس دقیق" active={activeTab === "longAddress"} onClick={() => setActiveTab("longAddress")} />
                  <TabButton label="شماره‌های تماس دیگر" active={activeTab === "phoneNumbers"} onClick={() => setActiveTab("phoneNumbers")} />
                </div>

                {activeTab === "education" && (
                  <FieldList title="سوابق تحصیلی" keyName="education" values={education} updateField={updateField} removeField={removeField} addField={addField} />
                )}

                {activeTab === "services" && (
                  <FieldList title="خدمات قابل ارائه" keyName="services" values={services} updateField={updateField} removeField={removeField} addField={addField} />
                )}

                {activeTab === "phoneNumbers" && (
                  <FieldList title="شماره‌های تماس دیگر" keyName="phoneNumbers" values={phoneNumbers} updateField={updateField} removeField={removeField} addField={addField} />
                )}

                {activeTab === "longAddress" && (
                  <div>
                    <label className="block text-blue-700 mb-2 font-medium">آدرس دقیق مطب</label>
                    <textarea {...register("longAddress")} rows={3} className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200" />
                    {errors.longAddress && <p className="text-red-500 text-sm mt-1">{errors.longAddress.message}</p>}
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60"
              >
                {isSubmitting || uploading ? "در حال ارسال..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// کامپوننت‌های کمکی
function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
        active
          ? "bg-blue-500 text-white shadow"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
      }`}
    >
      {label}
    </button>
  );
}

function FieldList({ title, keyName, values, updateField, removeField, addField }) {
  return (
    <div>
      <label className="block text-blue-700 mb-2 font-medium">{title}</label>
      {values.map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateField(keyName, index, e.target.value)}
            className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => removeField(keyName, index)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            🗑️ حذف
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addField(keyName)}
        className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
      >
        ➕ افزودن
      </button>
    </div>
  );
}










