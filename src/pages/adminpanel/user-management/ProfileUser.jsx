import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
// import supabase from "@/api/supabase";
import { useParams } from "react-router-dom";

const createSchema = (userRole) => {
  const baseSchema = {
    name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
    birthdate: z.string().optional(),
    national_code: z.string().optional(),
    address: z.string().optional(),
    bio: z.string().optional(),
    avatar_url: z.string().optional(),
    long_address: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است.").optional(),
    education: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    phone_numbers: z.array(z.string().regex(/^09\d{9}$/, "شماره معتبر نیست")).max(2, "حداکثر دو شماره مجاز است").optional(),
    userStatus: z.string().optional(),
    DentistProfileStatus: z.string().optional(),
  };

  // فیلدهای مخصوص دندانپزشک
  if (userRole === 'dentist') {
    baseSchema.medical_code = z.string().min(1, "کد نظام پزشکی الزامی است");
    baseSchema.specialty = z.string().min(1, "تخصص الزامی است");
    baseSchema.experience = z.string().optional();
  }

  // فیلدهای مخصوص بیمار
  if (userRole === 'patient') {
    baseSchema.blood_type = z.string().optional();
    baseSchema.allergies = z.string().optional();
    baseSchema.medical_history = z.string().optional();
  }

  return z.object(baseSchema);
};

export default function ProfileUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [activeTab, setActiveTab] = useState("education");
  const [userRole, setUserRole] = useState('dentist');

  // دریافت اطلاعات کاربر از Supabase
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

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
    mutationFn: async (updatedData) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updatedData)
        .eq("id", id)
        .select();
      
      if (error) throw error;
      return data;
    },
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
  });

  // ریست فرم وقتی کاربر لود شد
  useEffect(() => {
    if (user) {
      const formData = {
        ...user,
        education: user.education || [],
        services: user.services || [],
        phone_numbers: user.phone_numbers || [],
        userStatus: user.userStatus || "pending",
        DentistProfileStatus: user.DentistProfileStatus || "pending",
      };
      reset(formData);
    }
  }, [user, reset]);

  const education = watch("education") || [];
  const services = watch("services") || [];
  const phone_numbers = watch("phone_numbers") || [];
  const currentUserStatus = watch("userStatus");
  const currentProfileStatus = watch("DentistProfileStatus");

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

      const fileExt = file.name.split(".").pop();
      const fileName = `${id}/avatar.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);

      if (!publicUrl) throw new Error("خطا در دریافت لینک");

      setValue("avatar_url", publicUrl);
      alert("آپلود عکس با موفقیت انجام شد");
    } catch (error) {
      setUploadError(error.message || "خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (formData) => {
    mutation.mutate(formData);
    // console.log("formData submitted", formData);
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

  // هندل تغییر وضعیت‌ها
  const handleStatusChange = async (field, value) => {
    setValue(field, value);
    
    // آپدیت فوری در سوپابیس
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ [field]: value })
        .eq("id", id);
      
      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    } catch (error) {
      console.error(`خطا در آپدیت ${field}:`, error);
    }
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
            ویرایش اطلاعات {userRole === 'dentist' ? 'دندان‌پزشک' : 'بیمار'}
          </h4>
          <span className={`badge ${userRole === 'dentist' ? 'badge-info' : 'badge-success'} mr-2`}>
            {userRole === 'dentist' ? 'دندانپزشک' : 'بیمار'}
          </span>
        </div>

        {/* Form Container */}
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                <input {...register("name")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
                <input className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" value={user?.phone || ''} readOnly />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50" value={user?.email || ''} />
              </div>

              {/* Birthdate */}
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
                <input type="date" {...register("birthdate")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>

              {/* National Code */}
              <div>
                <label htmlFor="national_code" className="block text-sm font-medium text-gray-700">کد ملی</label>
                <input {...register("national_code")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>

              {/* فیلدهای مخصوص دندانپزشک */}
              {userRole === 'dentist' && (
                <>
                  <div>
                    <label htmlFor="medical_code" className="block text-sm font-medium text-gray-700">کد نظام پزشکی</label>
                    <input {...register("medical_code")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    {errors.medical_code && <p className="text-red-500 text-sm mt-1">{errors.medical_code.message}</p>}
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
              {user?.avatar_url?
                (
                  <div className="space-y-3">
                    <p>عکس پروفایل</p>
                    <div className="inline-block mr-2 size-[90px] overflow-hidden border border-gray-200 rounded-full">
                        <img src={user.avatar_url} className="size-full object-cover" alt="profile_img" />
                    </div>
                  </div>
                ):(
                <div>
                  <label className="block text-sm font-medium text-gray-700">آپلود تصویر</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) uploadAvatar(file);
                    }}
                    className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                  {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
                  {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
                </div>

                )
              }
              {/* وضعیت کاربر */}
              <div className="space-y-3 block">
                <label className="block text-sm font-medium text-gray-700">وضعیت کاربر</label>
                <select 
                  value={currentUserStatus || "pending"}
                  onChange={(e) => handleStatusChange("userStatus", e.target.value)}
                  className="select select-bordered w-full outline-none"
                >
                  <option value="inActive">غیر فعال</option>
                  <option value="actived">فعال</option>
                  <option value="pending">در حال بررسی</option>
                </select>
              </div>

              {/* وضعیت پروفایل عمومی */}
              <div className="space-y-3 block">
                <label className="block text-sm font-medium text-gray-700">وضعیت پروفایل عمومی</label>
                <select 
                  value={currentProfileStatus || "pending"}
                  onChange={(e) => handleStatusChange("DentistProfileStatus", e.target.value)}
                  className="select select-bordered w-full outline-none"
                >
                  <option value="published">منتشر شده</option>
                  <option value="inActive">غیر فعال</option>
                  <option value="pending">در حال بررسی</option>
                </select>
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

            {/* تب‌های داینامیک */}
            {userRole === "dentist" && (
              <>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
                  <TabButton label="سوابق تحصیلی" active={activeTab === "education"} onClick={() => setActiveTab("education")} />
                  <TabButton label="خدمات قابل ارائه" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
                  <TabButton label="آدرس دقیق" active={activeTab === "long_address"} onClick={() => setActiveTab("long_address")} />
                  <TabButton label="شماره‌های تماس دیگر" active={activeTab === "phone_numbers"} onClick={() => setActiveTab("phone_numbers")} />
                </div>

                {activeTab === "education" && (
                  <FieldList title="سوابق تحصیلی" keyName="education" values={education} updateField={updateField} removeField={removeField} addField={addField} />
                )}

                {activeTab === "services" && (
                  <FieldList title="خدمات قابل ارائه" keyName="services" values={services} updateField={updateField} removeField={removeField} addField={addField} />
                )}

                {activeTab === "phone_numbers" && (
                  <FieldList title="شماره‌های تماس دیگر" keyName="phone_numbers" values={phone_numbers} updateField={updateField} removeField={removeField} addField={addField} />
                )}

                {activeTab === "long_address" && (
                  <div>
                    <label className="block text-blue-700 mb-2 font-medium">آدرس دقیق مطب</label>
                    <textarea {...register("long_address")} rows={3} className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200" />
                    {errors.long_address && <p className="text-red-500 text-sm mt-1">{errors.long_address.message}</p>}
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













