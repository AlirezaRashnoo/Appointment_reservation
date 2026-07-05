import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "@/features/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// ========== Schema اعتبارسنجی ==========
const patientSchema = z.object({
  phoneNumber: z.string().min(11, "شماره موبایل معتبر نیست").max(11, "شماره موبایل معتبر نیست"),
  status: z.enum(["active", "pending", "inactive"]).default("pending"),
  role: z.string().default("patient"),
  email: z.string().email("ایمیل معتبر نیست").nullable().optional(),
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").nullable().optional(),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد").nullable().optional(),
  fullName: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  nationalCode: z.string().length(10, "کد ملی باید ۱۰ رقم باشد").nullable().optional(),
});

// ========== API Functions ==========
const getCsrfToken = () => Cookies.get("csrf_token");

const apiWithCsrf = async (method, url, data = null) => {
  const config = {
    method,
    url,
    headers: {
      "X-CSRF-Token": getCsrfToken(),
    },
  };
  if (data) config.data = data;
  const response = await apiService(config);
  return response.data;
};

const fetchPatientProfile = async (userId) => {
  const response = await apiService.get(`/users/${userId}`);
  if (response.data?.data) return response.data.data;
  throw new Error("ساختار پاسخ نامعتبر است");
};

const updatePatientProfile = async ({ userId, payload }) => {
  return await apiWithCsrf("patch", `/users/${userId}`, payload);
};

const uploadAvatar = async ({ userId, file }) => {
  const formData = new FormData();
  formData.append("avatar", file);
  
  const response = await apiService.post(`/users/${userId}/profile/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRF-Token": getCsrfToken(),
    },
  });
  return response.data;
};

// ========== Status Config ==========
const STATUS_CONFIG = {
  active: { label: "فعال", color: "emerald", icon: "✓" },
  pending: { label: "در انتظار تایید", color: "amber", icon: "⏳" },
  inactive: { label: "غیرفعال", color: "rose", icon: "✕" },
};

// ========== Main Component ==========
export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("personal");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    data: patientData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["patient-profile", id],
    queryFn: () => fetchPatientProfile(id),
    enabled: !!id,
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: updatePatientProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["patient-profile", id] });
      toast.success("اطلاعات با موفقیت ذخیره شد");
      setSelectedImage(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message || "خطا در بروزرسانی اطلاعات");
    },
  });

  const uploadMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["patient-profile", id] });
      toast.success("تصویر پروفایل به‌روز شد");
      setSelectedImage(null);
      if (data?.data?.avatarUrl) {
        setValue("avatar", data.data.avatarUrl);
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || err.message || "خطا در آپلود عکس");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(patientSchema),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      status: "pending",
      role: "patient",
      email: "",
      firstName: "",
      lastName: "",
      fullName: "",
      bio: "",
      avatar: "",
      nationalCode: "",
    },
  });

  const avatar = watch("avatar");
  const firstName = watch("firstName");
  const lastName = watch("lastName");

  useEffect(() => {
    if (patientData) {
      const profile = patientData.profile || {};
      reset({
        phoneNumber: patientData.phoneNumber || "",
        status: patientData.status || "pending",
        role: patientData.role || "patient",
        email: profile.email || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        fullName: profile.fullName || "",
        bio: profile.bio || "",
        avatar: profile.avatar || "",
        nationalCode: profile.nationalCode || "",
      });
    }
  }, [patientData, reset]);

  // Update fullName automatically when firstName or lastName changes
  useEffect(() => {
    if (firstName && lastName) {
      setValue("fullName", `${firstName} ${lastName}`);
    } else if (firstName) {
      setValue("fullName", firstName);
    } else if (lastName) {
      setValue("fullName", lastName);
    }
  }, [firstName, lastName, setValue]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("فقط تصویر انتخاب کنید");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم تصویر نباید بیشتر از ۵ مگابایت باشد");
      return;
    }

    setUploading(true);
    setSelectedImage(URL.createObjectURL(file));
    
    try {
      await uploadMutation.mutateAsync({ userId: id, file });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const onSubmit = (formData) => {
    const payload = {
      phoneNumber: formData.phoneNumber,
      role: formData.role,
      status: formData.status,
      profile: {
        email: formData.email || null,
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        fullName: formData.fullName || null,
        bio: formData.bio || null,
        avatar: formData.avatar || null,
        nationalCode: formData.nationalCode || null,
      },
    };
    updateMutation.mutate({ userId: id, payload });
  };

  const handleStatusChange = (newStatus) => {
    setValue("status", newStatus);
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error.message} onRetry={refetch} onBack={() => navigate("/admin-panel/users/patients")} />;
  if (!patientData) return <NotFoundScreen />;

  const profile = patientData.profile || {};
  const statusCfg = STATUS_CONFIG[patientData.status] || STATUS_CONFIG.pending;
  const displayAvatar = selectedImage || avatar || profile.avatar;
  const fullDisplayName = profile.fullName || [profile.firstName, profile.lastName].filter(Boolean).join(" ") || patientData.phoneNumber || "بدون نام";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm">
          <button onClick={() => navigate("/admin-panel")} className="text-slate-500 hover:text-slate-700 transition">
            پنل مدیریت
          </button>
          <ChevronIcon />
          <button onClick={() => navigate("/admin-panel/users/patients")} className="text-slate-500 hover:text-slate-700 transition">
            بیماران
          </button>
          <ChevronIcon />
          <span className="text-slate-800 font-medium">پروفایل بیمار</span>
        </nav>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-black/10" />
          </div>
          
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12 mb-4">
              {/* Avatar Section */}
              <div className="relative group">
                <div className="relative">
                  {displayAvatar ? (
                    <img 
                      src={displayAvatar} 
                      alt={fullDisplayName}
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl ring-4 ring-white shadow-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold">
                        {fullDisplayName.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <label className={`absolute -bottom-2 -right-2 p-1.5 bg-white rounded-full shadow-md cursor-pointer hover:bg-indigo-50 transition-all ${
                    uploading ? "opacity-50 cursor-wait" : ""
                  }`}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarUpload} 
                      disabled={uploading} 
                      className="hidden" 
                    />
                    {uploading ? <SpinIcon size={16} /> : <CameraIcon />}
                  </label>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-slate-800">{fullDisplayName}</h1>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-${statusCfg.color}-50 text-${statusCfg.color}-700 ring-1 ring-${statusCfg.color}-200`}>
                    <span>{statusCfg.icon}</span>
                    <span>{statusCfg.label}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-mono">{patientData.phoneNumber}</p>
              </div>

              <button
                onClick={() => navigate("/admin-panel/users/patients")}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 bg-slate-50 rounded-xl hover:bg-slate-100 transition"
              >
                <ArrowRightIcon />
                بازگشت
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
              <Badge icon={<IdIcon />} text={`ID: ${patientData.id?.slice(0, 8)}...`} />
              <Badge icon={<CalendarIcon />} text={`عضو از: ${new Date(patientData.createdAt).toLocaleDateString("fa-IR")}`} />
              <Badge icon={<EditIcon />} text={`آخرین ویرایش: ${new Date(patientData.modifiedAt).toLocaleDateString("fa-IR")}`} />
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-200 px-6 pt-4">
            <div className="flex gap-1">
              {[
                { key: "personal", label: "اطلاعات شخصی", icon: <UserIcon /> },
                { key: "contact", label: "اطلاعات تماس", icon: <PhoneIcon /> },
                { key: "system", label: "تنظیمات سیستمی", icon: <SettingsIcon /> },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
                    activeTab === key
                      ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Personal Tab */}
            {activeTab === "personal" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">مشخصات هویتی</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                      label="نام"
                      register={register("firstName")}
                      error={errors.firstName}
                      placeholder="مثال: علی"
                    />
                    <FormField
                      label="نام خانوادگی"
                      register={register("lastName")}
                      error={errors.lastName}
                      placeholder="مثال: رضایی"
                    />
                    <FormField
                      label="نام کامل"
                      register={register("fullName")}
                      error={errors.fullName}
                      placeholder="نام و نام خانوادگی"
                    />
                    <FormField
                      label="کد ملی"
                      register={register("nationalCode")}
                      error={errors.nationalCode}
                      placeholder="۱۰ رقم"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">درباره بیمار</h3>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    placeholder="یادداشت یا توضیحات مختصر..."
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition resize-none"
                  />
                  {errors.bio && <FormError message={errors.bio.message} />}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="شماره موبایل"
                    register={register("phoneNumber")}
                    error={errors.phoneNumber}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    required
                  />
                  <FormField
                    label="ایمیل"
                    type="email"
                    register={register("email")}
                    error={errors.email}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === "system" && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">وضعیت حساب</h3>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(STATUS_CONFIG).map(([value, config]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleStatusChange(value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          watch("status") === value
                            ? `bg-${config.color}-50 text-${config.color}-700 ring-2 ring-${config.color}-400`
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <span>{config.icon}</span>
                        <span>{config.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-semibold text-slate-700 mb-4">نقش کاربر</h3>
                  <div className="bg-slate-50 px-4 py-3 rounded-xl text-sm text-slate-600">
                    {patientData.role === "patient" ? "بیمار" : patientData.role}
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {isDirty && (
                  <p className="text-xs text-amber-600 flex items-center gap-1">
                    <span>●</span> تغییرات ذخیره نشده
                  </p>
                )}
                <div className="flex gap-3 mr-auto sm:mr-0">
                  <button
                    type="button"
                    onClick={() => reset()}
                    disabled={!isDirty || updateMutation.isPending}
                    className="px-5 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition disabled:opacity-40"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty || !isValid || updateMutation.isPending || isSubmitting}
                    className="px-6 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-95 transition disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-indigo-200"
                  >
                    {(updateMutation.isPending || isSubmitting) ? (
                      <>
                        <SpinIcon size={16} />
                        <span>در حال ذخیره...</span>
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        <span>ذخیره تغییرات</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ========== Sub-components ==========

const FormField = ({ label, register, error, type = "text", placeholder, dir, required }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}
      {required && <span className="text-rose-500 mr-1">*</span>}
    </label>
    <input
      type={type}
      {...register}
      dir={dir}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 transition ${
        error
          ? "border-rose-300 focus:ring-rose-200 bg-rose-50"
          : "border-slate-200 focus:ring-indigo-200 focus:border-indigo-400 bg-slate-50 focus:bg-white"
      }`}
    />
    {error && <FormError message={error.message} />}
  </div>
);

const FormError = ({ message }) => (
  <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
    <span>⚠</span> {message}
  </p>
);

const Badge = ({ icon, text }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 text-xs text-slate-500">
    {icon}
    {text}
  </span>
);

// Loading, Error, Not Found Components
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
    <div className="text-center">
      <SpinIcon size={48} />
      <p className="mt-4 text-slate-500">در حال بارگذاری...</p>
    </div>
  </div>
);

const ErrorScreen = ({ message, onRetry, onBack }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-3xl text-rose-500">!</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">خطا در بارگذاری</h3>
      <p className="text-sm text-slate-500 mb-6">{message}</p>
      <div className="flex gap-3 justify-center">
        <button onClick={onBack} className="px-4 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition">
          بازگشت
        </button>
        <button onClick={onRetry} className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
          تلاش مجدد
        </button>
      </div>
    </div>
  </div>
);

const NotFoundScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 text-amber-700">
      ⚠ بیمار با این شناسه یافت نشد
    </div>
  </div>
);

// ========== Icons ==========
const SpinIcon = ({ size = 20 }) => (
  <svg className="animate-spin" style={{ width: size, height: size }} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round"/>
  </svg>
);

const ChevronIcon = () => (
  <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const CameraIcon = () => (
  <svg className="w-4 h-4 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
    <circle cx="12" cy="13" r="4"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const SaveIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.07.08A10 10 0 0 0 12 17.66a10 10 0 0 0 6.18-2.33l.07-.08z"/>
    <path d="M4.6 9a1.65 1.65 0 0 0-.33 1.82c.26.6.87 1 1.51 1h12.44c.64 0 1.25-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.07-.08A10 10 0 0 0 12 6.34a10 10 0 0 0-6.18 2.33l-.07.08z"/>
  </svg>
);

const IdIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="7" width="18" height="14" rx="2"/>
    <path d="M7 3v4M17 3v4M11 12h6M11 16h4M7 12h.01"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const EditIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);








