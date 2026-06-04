import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "@/features/api";
import { toast } from "react-hot-toast"; 



const dentistSchema = z.object({
  phoneNumber: z.string().optional(),
  status: z.string().optional(),
  
  nationalCode: z.string().min(10, "کد ملی باید ۱۰ رقم باشد").max(10, "کد ملی باید ۱۰ رقم باشد").optional(),
  medicalCouncilNumber: z.string().min(1, "شماره نظام پزشکی الزامی است"),
  birthDateShamsi: z.string().optional(),
  yearsOfExperience: z.number().min(0, "سال سابقه نمی‌تواند منفی باشد").nullable().optional(),
  specialization: z.string().min(1, "تخصص الزامی است"),
  degree: z.string().min(1, "مدرک تحصیلی الزامی است"),
  portfolio: z.array(z.string().url("آدرس معتبر نیست")).optional(),
  additionalPhoneNumbers: z.array(z.string().regex(/^09\d{9}$/, "شماره معتبر نیست")).max(2, "حداکثر دو شماره مجاز است").optional(),
  
  // آدرس
  shortAddr: z.string().optional(),
  longAddr: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است.").optional(),
});

// ========== API Functions ==========
const fetchDentistProfile = async (dentistId) => {
  try {
    const response = await apiService.get(`/dentist/admin/${dentistId}`);
    
    if (response.data && response.data.data) {
      return response.data.data;
    }
    
    throw new Error('ساختار پاسخ نامعتبر است');
  } catch (error) {
    console.error('Error fetching dentist profile:', error);
    throw new Error(error.response?.data?.message || 'خطا در دریافت اطلاعات دندانپزشک');
  }
};

const updateDentistProfile = async ({ dentistId, profileData }) => {
  try {
    const response = await apiService.patch(`/dentist/admin/${dentistId}`, profileData);
    
    if (response.data) {
      return response.data;
    }
    
    throw new Error('خطا در بروزرسانی اطلاعات');
  } catch (error) {
    console.error('Error updating dentist profile:', error);
    throw new Error(error.response?.data?.message || 'خطا در بروزرسانی اطلاعات دندانپزشک');
  }
};

const uploadPortfolioImage = async ({ dentistId, file }) => {
  try {
    const formData = new FormData();
    formData.append('portfolio', file);
    
    const response = await apiService.post(`/dentist/admin/${dentistId}/portfolio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading portfolio image:', error);
    throw new Error(error.response?.data?.message || 'خطا در آپلود تصویر');
  }
};

const deletePortfolioImage = async ({ dentistId, imageUrl }) => {
  try {
    const response = await apiService.delete(`/dentist/admin/${dentistId}/portfolio`, {
      data: { imageUrl }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error deleting portfolio image:', error);
    throw new Error(error.response?.data?.message || 'خطا در حذف تصویر');
  }
};

export default function DentistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const { 
    data: dentistData, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ["dentist-profile", id],
    queryFn: () => fetchDentistProfile(id),
    enabled: !!id,
    retry: 1,
    staleTime: 5 * 60 * 1000, 
  });

  const updateMutation = useMutation({
    mutationFn: updateDentistProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentist-profile", id] });
      toast.success('اطلاعات با موفقیت بروزرسانی شد');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadPortfolioImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dentist-profile", id] });
      toast.success('تصویر با موفقیت آپلود شد');
      
      if (data.data?.portfolio) {
        setValue('portfolio', data.data.portfolio);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteImageMutation = useMutation({
    mutationFn: deletePortfolioImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["dentist-profile", id] });
      toast.success('تصویر با موفقیت حذف شد');
      
      if (data.data?.portfolio) {
        setValue('portfolio', data.data.portfolio);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(dentistSchema),
    mode: 'onChange',
    defaultValues: {
      portfolio: [],
      additionalPhoneNumbers: [],
      yearsOfExperience: null,
    }
  });

  const portfolio = watch("portfolio") || [];
  const additionalPhoneNumbers = watch("additionalPhoneNumbers") || [];

  // ========== ریست فرم با داده‌های دریافتی ==========
  useEffect(() => {
    if (dentistData) {
      const formData = {
        // اطلاعات کاربر
        phoneNumber: dentistData.user?.phoneNumber || '',
        status: dentistData.user?.status || '',
        
        nationalCode: dentistData.nationalCode || '',
        medicalCouncilNumber: dentistData.medicalCouncilNumber || '',
        birthDateShamsi: dentistData.birthDateShamsi || '',
        yearsOfExperience: dentistData.yearsOfExperience,
        specialization: dentistData.specialization || '',
        degree: dentistData.degree || '',
        portfolio: dentistData.portfolio || [],
        additionalPhoneNumbers: dentistData.additionalPhoneNumbers || [],
        
        shortAddr: dentistData.address?.shortAddr || '',
        longAddr: dentistData.address?.longAddr || '',
      };
      
      reset(formData);
    }
  }, [dentistData, reset]);

  const addField = useCallback((key) => {
    const current = watch(key) || [];
    setValue(key, [...current, ""]);
  }, [watch, setValue]);

  const updateField = useCallback((key, index, value) => {
    const current = [...(watch(key) || [])];
    current[index] = value;
    setValue(key, current, { shouldDirty: true });
  }, [watch, setValue]);

  const removeField = useCallback((key, index) => {
    const current = [...(watch(key) || [])];
    current.splice(index, 1);
    setValue(key, current, { shouldDirty: true });
  }, [watch, setValue]);

  const handlePortfolioUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('لطفاً فقط تصویر انتخاب کنید');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast.error('حجم تصویر نباید بیشتر از ۵ مگابایت باشد');
      return;
    }

    setUploading(true);
    try {
      await uploadMutation.mutateAsync({ dentistId: id, file });
    } finally {
      setUploading(false);
      event.target.value = ''; 
    }
  }, [id, uploadMutation]);

  const handleDeletePortfolio = useCallback(async (imageUrl) => {
    if (window.confirm('آیا از حذف این تصویر مطمئن هستید؟')) {
      await deleteImageMutation.mutateAsync({ dentistId: id, imageUrl });
    }
  }, [id, deleteImageMutation]);

  const onSubmit = useCallback((formData) => {
    const cleanData = Object.fromEntries(
      Object.entries(formData).filter(([_, v]) => v != null && v !== '')
    );
    
    updateMutation.mutate({ dentistId: id, profileData: cleanData });
  }, [id, updateMutation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-red-50 text-red-800 p-6 rounded-lg max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2">خطا در بارگذاری اطلاعات</h3>
          <p className="mb-4">{error.message}</p>
          <button 
            onClick={() => refetch()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            تلاش مجدد
          </button>
          <button 
            onClick={() => navigate('/admin-panel/users/dentists')}
            className="mr-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            بازگشت به لیست
          </button>
        </div>
      </div>
    );
  }

  if (!dentistData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-yellow-50 text-yellow-800 p-6 rounded-lg">
          <p>دندانپزشکی با این شناسه یافت نشد</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header with breadcrumb */}
        <div className="mb-6">
          <nav className="flex mb-4 text-sm text-gray-500">
            <button onClick={() => navigate('/admin-panel')} className="hover:text-blue-600">پنل مدیریت</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/admin-panel/users/dentists')} className="hover:text-blue-600">دندانپزشکان</button>
            <span className="mx-2">/</span>
            <span className="text-gray-800">پروفایل دندانپزشک</span>
          </nav>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                پروفایل دندانپزشک
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm ${
                dentistData.user?.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : dentistData.user?.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {dentistData.user?.status === 'active' ? 'فعال' : 
                 dentistData.user?.status === 'pending' ? 'در انتظار تایید' : 'غیرفعال'}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/admin-panel/users/dentists')}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                بازگشت به لیست
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex gap-1 p-4" aria-label="Tabs">
              <TabButton 
                label="اطلاعات پایه" 
                active={activeTab === "basic"} 
                onClick={() => setActiveTab("basic")} 
              />
              <TabButton 
                label="پورتفولیو" 
                active={activeTab === "portfolio"} 
                onClick={() => setActiveTab("portfolio")} 
              />
              <TabButton 
                label="اطلاعات تماس" 
                active={activeTab === "contact"} 
                onClick={() => setActiveTab("contact")} 
              />
              <TabButton 
                label="آدرس" 
                active={activeTab === "address"} 
                onClick={() => setActiveTab("address")} 
              />
            </nav>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Tab: Basic Information */}
            {activeTab === "basic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="شماره موبایل"
                    value={dentistData.user?.phoneNumber}
                    disabled
                  />
                  
                  <FormField
                    label="کد ملی"
                    register={register("nationalCode")}
                    error={errors.nationalCode?.message}
                  />
                  
                  <FormField
                    label="شماره نظام پزشکی"
                    register={register("medicalCouncilNumber")}
                    error={errors.medicalCouncilNumber?.message}
                    required
                  />
                  
                  <FormField
                    label="تاریخ تولد (شمسی)"
                    register={register("birthDateShamsi")}
                    placeholder="مثال: 1360/05/15"
                    error={errors.birthDateShamsi?.message}
                  />
                  
                  <FormField
                    label="تخصص"
                    register={register("specialization")}
                    error={errors.specialization?.message}
                    required
                  />
                  
                  <FormField
                    label="مدرک تحصیلی"
                    register={register("degree")}
                    error={errors.degree?.message}
                    required
                  />
                  
                  <FormField
                    label="سال‌های سابقه"
                    type="number"
                    register={register("yearsOfExperience", { valueAsNumber: true })}
                    error={errors.yearsOfExperience?.message}
                  />
                </div>
              </div>
            )}

            {/* Tab: Portfolio */}
            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    تصاویر نمونه کار
                  </label>
                  
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePortfolioUpload}
                      disabled={uploading || uploadMutation.isPending}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button
                      type="button"
                      disabled={uploading || uploadMutation.isPending}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {uploading || uploadMutation.isPending ? 'در حال آپلود...' : 'آپلود تصویر جدید'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolio.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePortfolio(image)}
                        disabled={deleteImageMutation.isPending}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-700 disabled:opacity-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {portfolio.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    هیچ تصویری آپلود نشده است
                  </p>
                )}
              </div>
            )}

            {/* Tab: Contact Information */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    شماره‌های تماس اضافی
                  </label>
                  <FieldList
                    values={additionalPhoneNumbers}
                    onAdd={() => addField('additionalPhoneNumbers')}
                    onUpdate={(index, value) => updateField('additionalPhoneNumbers', index, value)}
                    onRemove={(index) => removeField('additionalPhoneNumbers', index)}
                    placeholder="شماره تماس"
                  />
                </div>
              </div>
            )}

            {/* Tab: Address */}
            {activeTab === "address" && (
              <div className="space-y-6">
                <FormField
                  label="آدرس خلاصه"
                  register={register("shortAddr")}
                  placeholder="مثال: تهران، خیابان ولیعصر"
                  error={errors.shortAddr?.message}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    آدرس کامل
                  </label>
                  <textarea
                    {...register("longAddr")}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="آدرس کامل مطب"
                  />
                  {errors.longAddr && (
                    <p className="mt-1 text-sm text-red-600">{errors.longAddr.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => reset()}
                disabled={!isDirty || updateMutation.isPending}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                انصراف
              </button>
              
              <button
                type="submit"
                disabled={!isDirty || !isValid || updateMutation.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateMutation.isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


const TabButton = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
      active
        ? 'bg-blue-600 text-white shadow'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

const FormField = ({ label, register, error, disabled, required, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 mr-1">*</span>}
    </label>
    <input
      {...register}
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
        disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'
      } ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const FieldList = ({ values, onAdd, onUpdate, onRemove, placeholder }) => (
  <div className="space-y-2">
    {values.map((value, index) => (
      <div key={index} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(index, e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    ))}
    
    <button
      type="button"
      onClick={onAdd}
      className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      افزودن
    </button>
  </div>
);