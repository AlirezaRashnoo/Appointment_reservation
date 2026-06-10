import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "@/features/api";
import { toast } from "react-hot-toast";
 
// ========== Schema اعتبارسنجی ==========
const patientSchema = z.object({
  phoneNumber: z.string().optional(),
  status: z.string().optional(),
  role: z.string().optional(),
  email: z.string().email("ایمیل معتبر نیست").nullable().optional(),
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").nullable().optional(),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد").nullable().optional(),
  fullName: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  nationalCode: z.string().length(10, "کد ملی باید ۱۰ رقم باشد").nullable().optional().or(z.literal("")),
});
 
// ========== API Functions ==========
const fetchPatientProfile = async (userId) => {
  const response = await apiService.get(`/users/${userId}`);
  if (response.data?.data) return response.data.data;
  throw new Error("ساختار پاسخ نامعتبر است");
};
 
const updatePatientProfile = async ({ userId, payload }) => {
  const response = await apiService.patch(`/users/${userId}`, payload);
  if (response.data) return response.data;
  throw new Error("خطا در بروزرسانی اطلاعات");
};
 
const uploadAvatar = async ({ userId, file }) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await apiService.post(`/users/${userId}/profile/avatar`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
 
// ========== Status Config ==========
const STATUS_CONFIG = {
  active:   { label: "فعال",             dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  pending:  { label: "در انتظار تایید",  dot: "bg-amber-400",   badge: "bg-amber-50 text-amber-700 ring-amber-200" },
  inactive: { label: "غیرفعال",          dot: "bg-rose-400",    badge: "bg-rose-50 text-rose-700 ring-rose-200" },
};
 
// ========== Helpers ==========
const getInitials = (first, last, phone) => {
  if (first && last) return `${first[0]}${last[0]}`;
  if (first) return first[0];
  if (phone) return phone[0];
  return "؟";
};
 
// ========== Main Component ==========
export default function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("personal");
  const [uploading, setUploading] = useState(false);
 
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
    staleTime: 5 * 60 * 1000,
  });
 
  const updateMutation = useMutation({
    mutationFn: updatePatientProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient-profile", id] });
      toast.success("اطلاعات با موفقیت ذخیره شد");
    },
    onError: (err) => toast.error(err.message),
  });
 
  const uploadMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["patient-profile", id] });
      toast.success("تصویر پروفایل به‌روز شد");
      if (data?.data?.avatarUrl) setValue("avatar", data.data.avatarUrl);
    },
    onError: (err) => toast.error(err.message),
  });
 
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(patientSchema),
    mode: "onChange",
  });
 
  const avatar = watch("avatar");
 
  useEffect(() => {
    if (patientData) {
      const p = patientData.profile || {};
      reset({
        phoneNumber: patientData.phoneNumber || "",
        status: patientData.status || "",
        role: patientData.role || "",
        email: p.email || "",
        firstName: p.firstName || "",
        lastName: p.lastName || "",
        fullName: p.fullName || "",
        bio: p.bio || "",
        avatar: p.avatar || "",
        nationalCode: p.nationalCode || "",
      });
    }
  }, [patientData, reset]);
 
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("فقط تصویر انتخاب کنید");
    if (file.size > 5 * 1024 * 1024) return toast.error("حجم تصویر نباید بیشتر از ۵ مگابایت باشد");
    setUploading(true);
    try {
      await uploadMutation.mutateAsync({ userId: id, file });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };
 
  const onSubmit = (formData) => {
    // ساختار payload مطابق API
    const payload = {
      phoneNumber: formData.phoneNumber || undefined,
      role: formData.role || undefined,
      status: formData.status || undefined,
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
 
  // ========== States ==========
  if (isLoading) return <LoadingScreen />;
  if (error)     return <ErrorScreen message={error.message} onRetry={refetch} onBack={() => navigate("/admin-panel/users/patients")} />;
  if (!patientData) return <NotFoundScreen />;
 
  const profile = patientData.profile || {};
  const statusCfg = STATUS_CONFIG[patientData.status] || STATUS_CONFIG.inactive;
  const avatarSrc = avatar || profile.avatar;
  const initials = getInitials(profile.firstName, profile.lastName, patientData.phoneNumber);
  const fullDisplayName = profile.fullName || [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "بدون نام";
 
  return (
    <div className="min-h-screen bg-slate-50/70" dir="rtl">
      {/* Top gradient strip */}
      <div className="h-1 w-full bg-gradient-to-l from-blue-500 via-indigo-500 to-violet-500" />
 
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
 
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-400">
          <button onClick={() => navigate("/admin-panel")} className="hover:text-slate-700 transition">پنل مدیریت</button>
          <ChevronIcon />
          <button onClick={() => navigate("/admin-panel/users/patients")} className="hover:text-slate-700 transition">بیماران</button>
          <ChevronIcon />
          <span className="text-slate-700 font-medium">پروفایل بیمار</span>
        </nav>
 
        {/* ── Hero Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Cover gradient */}
          <div className="h-28 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />
          </div>
 
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-12 mb-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                {avatarSrc ? (
                  <img src={avatarSrc} alt={fullDisplayName}
                    className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl ring-4 ring-white shadow-md bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{initials}</span>
                  </div>
                )}
                <label className={`absolute -bottom-1 -left-1 w-7 h-7 bg-white rounded-lg shadow-md border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-indigo-50 transition ${uploading ? "opacity-50 cursor-wait" : ""}`}>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} disabled={uploading} className="hidden" />
                  {uploading ? <SpinIcon size={14} /> : <CameraIcon />}
                </label>
              </div>
 
              {/* Name & meta */}
              <div className="mb-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-slate-800 leading-tight">{fullDisplayName}</h1>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ${statusCfg.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                    {statusCfg.label}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-0.5 font-mono">{patientData.phoneNumber}</p>
              </div>
 
              <button onClick={() => navigate("/admin-panel/users/patients")}
                className="mb-1 flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-700 transition">
                <ArrowRightIcon />
                بازگشت
              </button>
            </div>
 
            {/* Meta pills */}
            <div className="flex gap-2 flex-wrap">
              <MetaPill icon={<IdIcon />} label={`شناسه: ${patientData.id.slice(0, 8)}…`} />
              <MetaPill icon={<CalIcon />} label={`عضویت: ${new Date(patientData.createdAt).toLocaleDateString("fa-IR")}`} />
              <MetaPill icon={<EditIcon size={12} />} label={`ویرایش: ${new Date(patientData.modifiedAt).toLocaleDateString("fa-IR")}`} />
            </div>
          </div>
        </div>
 
        {/* ── Form Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-100 px-6 pt-5 flex gap-1">
            {[
              { key: "personal", label: "اطلاعات شخصی",  icon: <UserIcon /> },
              { key: "contact",  label: "اطلاعات تماس",   icon: <PhoneIcon /> },
            ].map(({ key, label, icon }) => (
              <button key={key} type="button" onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all -mb-px ${
                  activeTab === key
                    ? "border-indigo-500 text-indigo-600 bg-indigo-50/50"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}>
                {icon}
                {label}
              </button>
            ))}
          </div>
 
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
 
            {/* ── Personal Tab ── */}
            {activeTab === "personal" && (
              <div className="space-y-6">
                <SectionTitle>مشخصات هویتی</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="نام" register={register("firstName")} error={errors.firstName?.message} placeholder="مثال: علی" />
                  <InputField label="نام خانوادگی" register={register("lastName")} error={errors.lastName?.message} placeholder="مثال: رضایی" />
                  <InputField label="نام کامل" register={register("fullName")} error={errors.fullName?.message} placeholder="نام و نام خانوادگی" className="sm:col-span-2" />
                  <InputField label="کد ملی" register={register("nationalCode")} error={errors.nationalCode?.message} placeholder="۱۰ رقم" dir="ltr" />
                </div>
 
                <Divider />
                <SectionTitle>اطلاعات سیستمی</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ReadonlyField label="شماره موبایل" value={patientData.phoneNumber} />
                  <ReadonlyField label="وضعیت" value={statusCfg.label} />
                </div>
 
                <Divider />
                <SectionTitle>درباره بیمار</SectionTitle>
                <div>
                  <textarea {...register("bio")} rows={4} placeholder="یادداشت یا توضیحات مختصر…"
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition resize-none placeholder-slate-300"
                  />
                  {errors.bio && <FieldError msg={errors.bio.message} />}
                </div>
              </div>
            )}
 
            {/* ── Contact Tab ── */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <SectionTitle>اطلاعات تماس</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ReadonlyField label="شماره موبایل" value={patientData.phoneNumber} />
                  <InputField label="ایمیل" type="email" register={register("email")} error={errors.email?.message} placeholder="example@email.com" dir="ltr" />
                </div>
              </div>
            )}
 
            {/* ── Actions ── */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <p className={`text-xs transition ${isDirty ? "text-amber-500" : "text-transparent"}`}>
                ● تغییرات ذخیره نشده
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => reset()} disabled={!isDirty || updateMutation.isPending}
                  className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition disabled:opacity-40">
                  انصراف
                </button>
                <button type="submit" disabled={!isDirty || !isValid || updateMutation.isPending}
                  className="px-5 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-indigo-200">
                  {updateMutation.isPending ? (
                    <><SpinIcon size={16} /><span>در حال ذخیره…</span></>
                  ) : (
                    <><SaveIcon /><span>ذخیره تغییرات</span></>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
 
// ========== Sub-components ==========
 
const SectionTitle = ({ children }) => (
  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{children}</h3>
);
 
const Divider = () => <hr className="border-slate-100" />;
 
const FieldError = ({ msg }) => (
  <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
    <span>⚠</span>{msg}
  </p>
);
 
const InputField = ({ label, register, error, className = "", dir, ...props }) => (
  <div className={className}>
    <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
    <input {...register} dir={dir}
      className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 focus:bg-white transition placeholder-slate-300 ${
        error ? "border-rose-300 bg-rose-50" : "border-slate-200"
      }`}
      {...props}
    />
    {error && <FieldError msg={error} />}
  </div>
);
 
const ReadonlyField = ({ label, value }) => (
  <div>
    <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
    <div className="w-full px-4 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 select-none">
      {value || "—"}
    </div>
  </div>
);
 
const MetaPill = ({ icon, label }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs text-slate-400">
    {icon}{label}
  </span>
);
 
// ── Loading / Error / NotFound ──
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-3 text-slate-400">
      <SpinIcon size={36} />
      <p className="text-sm">در حال بارگذاری…</p>
    </div>
  </div>
);
 
const ErrorScreen = ({ message, onRetry, onBack }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-8 max-w-sm w-full text-center space-y-4">
      <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mx-auto text-rose-400 text-2xl">!</div>
      <h3 className="font-semibold text-slate-800">خطا در بارگذاری</h3>
      <p className="text-sm text-slate-500">{message}</p>
      <div className="flex gap-2 justify-center">
        <button onClick={onBack} className="px-4 py-2 text-sm border border-slate-200 rounded-xl hover:bg-slate-50 transition">بازگشت</button>
        <button onClick={onRetry} className="px-4 py-2 text-sm bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition">تلاش مجدد</button>
      </div>
    </div>
  </div>
);
 
const NotFoundScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 text-amber-700 text-sm">بیماری با این شناسه یافت نشد</div>
  </div>
);
 

// ========== Icons ==========
const SpinIcon   = ({ size = 20 }) => <svg className="animate-spin" style={{ width: size, height: size }} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round"/></svg>;
const ChevronIcon = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>;
const CameraIcon  = () => <svg className="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const ArrowRightIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const SaveIcon    = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>;
const UserIcon    = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const PhoneIcon   = () => <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.19 2 2 0 012 .01h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const IdIcon      = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8l-2 4h12z"/></svg>;
const CalIcon     = () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
const EditIcon    = ({ size = 12 }) => <svg style={{ width: size, height: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;














