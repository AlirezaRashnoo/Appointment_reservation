import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "@/features/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import {
  FiChevronLeft,
  FiCamera,
  FiArrowRight,
  FiSave,
  FiUser,
  FiPhone,
  FiSettings,
  FiCreditCard,
  FiCalendar,
  FiEdit2,
  FiLoader,
  FiAlertTriangle,
  FiFileMinus,
} from "react-icons/fi";

// ========== Schema اعتبارسنجی ==========
const patientSchema = z.object({
  phoneNumber: z.string().min(11, "شماره موبایل معتبر نیست").max(11, "شماره موبایل معتبر نیست"),
  status: z.enum(["active", "pending", "inactive"]).default("pending"),
  role: z.string().default("patient"),
  email: z.string().email("ایمیل معتبر نیست").nullable().optional(),
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد").nullable().optional(),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد").nullable().optional(),
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

// ========== Design tokens (injected once) ==========
const FONT_STYLE_ID = "patient-chart-fonts";
function useChartFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_STYLE_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_STYLE_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&family=Noto+Naskh+Arabic:wght@500;700&family=JetBrains+Mono:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}

// Subtle ECG watermark used behind the header band
const ECG_PATTERN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='48' viewBox='0 0 160 48'%3E%3Cpath d='M0 26 H52 L60 8 L70 42 L78 26 H160' stroke='%23ffffff' stroke-width='1.6' fill='none' opacity='0.16'/%3E%3C/svg%3E";

// ========== Status Config (clinical chart colors) ==========
const STATUS_CONFIG = {
  active: {
    label: "فعال",
    icon: "✓",
    dot: "bg-[#1F8A5F]",
    ring: "ring-[#1F8A5F]",
    text: "text-[#1F8A5F]",
    tint: "bg-[#E7F4EE]",
  },
  pending: {
    label: "در انتظار تایید",
    icon: "⏳",
    dot: "bg-[#B9821A]",
    ring: "ring-[#B9821A]",
    text: "text-[#B9821A]",
    tint: "bg-[#FBF1DF]",
  },
  inactive: {
    label: "غیرفعال",
    icon: "✕",
    dot: "bg-[#B14A3E]",
    ring: "ring-[#B14A3E]",
    text: "text-[#B14A3E]",
    tint: "bg-[#F8E9E7]",
  },
};

// ========== Main Component ==========
export default function PatientProfile() {
  useChartFonts();

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
    onSuccess: () => {
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
      bio: "",
      avatar: "",
      nationalCode: "",
    },
  });

  const avatar = watch("avatar");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const currentStatus = watch("status");

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
        bio: profile.bio || "",
        avatar: profile.avatar || "",
        nationalCode: profile.nationalCode || "",
      });
    }
  }, [patientData, reset]);

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
        bio: formData.bio || null,
        avatar: formData.avatar || null,
        nationalCode: formData.nationalCode || null,
      },
    };
    updateMutation.mutate({ userId: id, payload });
  };

  const handleStatusChange = (newStatus) => {
    setValue("status", newStatus, { shouldDirty: true });
  };

  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <ErrorScreen
        message={error.message}
        onRetry={refetch}
        onBack={() => navigate("/admin-panel/users/patients")}
      />
    );
  if (!patientData) return <NotFoundScreen />;

  const profile = patientData.profile || {};
  const statusCfg = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.pending;
  const displayAvatar = selectedImage || avatar || profile.avatar;
  const fullDisplayName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    patientData.phoneNumber ||
    "بدون نام";

  const TABS = [
    { key: "personal", label: "اطلاعات شخصی", icon: <FiUser className="w-4 h-4" /> },
    { key: "contact", label: "اطلاعات تماس", icon: <FiPhone className="w-4 h-4" /> },
    { key: "system", label: "تنظیمات سیستمی", icon: <FiSettings className="w-4 h-4" /> },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{
        background: "#EEF2F1",
        fontFamily: "'Vazirmatn', sans-serif",
        color: "#16302E",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm" style={{ color: "#5B7371" }}>
          <button
            onClick={() => navigate("/admin-panel")}
            className="hover:text-[#0F6B63] transition-colors"
          >
            پنل مدیریت
          </button>
          <FiChevronLeft className="w-4 h-4" style={{ color: "#9BAEAC" }} />
          <button
            onClick={() => navigate("/admin-panel/users/patients")}
            className="hover:text-[#0F6B63] transition-colors"
          >
            بیماران
          </button>
          <FiChevronLeft className="w-4 h-4" style={{ color: "#9BAEAC" }} />
          <span className="font-medium" style={{ color: "#16302E" }}>
            پرونده بیمار
          </span>
        </nav>

        {/* Patient chart card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#FFFFFF",
            border: "1px solid #DCE3E1",
            boxShadow: "0 1px 2px rgba(15,42,39,0.04), 0 12px 32px -16px rgba(15,42,39,0.18)",
          }}
        >
          {/* Thin ECG accent strip — purely decorative, no overlap with content below */}
          <div className="relative h-14" style={{ background: "#0B4A45" }}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${ECG_PATTERN}")`,
                backgroundRepeat: "repeat-x",
                backgroundSize: "160px 48px",
                backgroundPosition: "center",
              }}
            />
            <div
              className={`absolute top-0 bottom-0 right-0 w-1.5 ${statusCfg.dot}`}
              aria-hidden="true"
            />
          </div>

          <div className="px-6 pt-5 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-4 min-w-0">
                {/* Avatar (ID badge) */}
                <div className="relative shrink-0">
                  {displayAvatar ? (
                    <img
                      src={displayAvatar}
                      alt={fullDisplayName}
                      className="w-16 h-16 rounded-xl object-cover"
                      style={{ border: "1px solid #DCE3E1" }}
                    />
                  ) : (
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ background: "#0F6B63" }}
                    >
                      <span
                        className="text-white text-2xl"
                        style={{ fontFamily: "'Noto Naskh Arabic', serif" }}
                      >
                        {fullDisplayName.charAt(0)}
                      </span>
                    </div>
                  )}

                  <label
                    className={`absolute -bottom-1.5 -right-1.5 p-1 rounded-full shadow-sm cursor-pointer transition-all ${
                      uploading ? "opacity-50 cursor-wait" : "hover:bg-[#DCEEEC]"
                    }`}
                    style={{ background: "#FFFFFF", border: "1px solid #DCE3E1" }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                    {uploading ? (
                      <FiLoader className="animate-spin" style={{ width: 14, height: 14, color: "#0F6B63" }} />
                    ) : (
                      <FiCamera className="w-3.5 h-3.5" style={{ color: "#0F6B63" }} />
                    )}
                  </label>
                </div>

                {/* Name + status */}
                <div className="min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <h1
                      className="text-xl leading-tight truncate"
                      style={{ fontFamily: "'Noto Naskh Arabic', serif", fontWeight: 700 }}
                    >
                      {fullDisplayName}
                    </h1>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ${statusCfg.tint} ${statusCfg.text}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                      {statusCfg.label}
                    </span>
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: "#5B7371",
                      direction: "ltr",
                      unicodeBidi: "isolate",
                    }}
                  >
                    {patientData.phoneNumber}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/admin-panel/users/patients")}
                className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl transition-colors shrink-0"
                style={{ color: "#16302E", background: "#EEF2F1" }}
              >
                <FiArrowRight className="w-4 h-4" />
                بازگشت
              </button>
            </div>

            {/* Meta info — chart data row */}
            <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid #DCE3E1" }}>
              <MetaBadge icon={<FiCreditCard className="w-3.5 h-3.5" />} label="شناسه" value={`${patientData.id?.slice(0, 8)}…`} />
              <MetaBadge
                icon={<FiCalendar className="w-3.5 h-3.5" />}
                label="عضویت"
                value={new Date(patientData.createdAt).toLocaleDateString("fa-IR")}
              />
              <MetaBadge
                icon={<FiEdit2 className="w-3.5 h-3.5" />}
                label="آخرین ویرایش"
                value={new Date(patientData.modifiedAt).toLocaleDateString("fa-IR")}
              />
            </div>
          </div>
        </div>

        {/* Folder-tab navigation + form panel */}
        <div>
          <div className="flex gap-1 px-2">
            {TABS.map(({ key, label, icon }, i) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className="relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all"
                  style={{
                    background: isActive ? "#FFFFFF" : "#E3E9E7",
                    color: isActive ? "#0B4A45" : "#5B7371",
                    clipPath: "polygon(10% 0, 100% 0, 92% 100%, 0% 100%)",
                    marginInlineEnd: i === 0 ? 0 : "-14px",
                    transform: isActive ? "translateY(0)" : "translateY(4px)",
                    zIndex: isActive ? 10 : 1,
                    paddingInlineStart: "26px",
                    paddingInlineEnd: "26px",
                  }}
                >
                  {icon}
                  {label}
                </button>
              );
            })}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl rounded-tr-none p-6"
            style={{
              background: "#FFFFFF",
              border: "1px solid #DCE3E1",
              boxShadow: "0 1px 2px rgba(15,42,39,0.04), 0 12px 32px -16px rgba(15,42,39,0.18)",
              position: "relative",
              zIndex: 5,
              marginTop: "-1px",
            }}
          >
            {/* Personal Tab */}
            {activeTab === "personal" && (
              <div className="space-y-8">
                <div>
                  <SectionLabel>مشخصات هویتی</SectionLabel>
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
                      label="کد ملی"
                      register={register("nationalCode")}
                      error={errors.nationalCode}
                      placeholder="۱۰ رقم"
                      dir="ltr"
                      mono
                    />
                  </div>
                </div>

                <div className="pt-6" style={{ borderTop: "1px solid #EEF2F1" }}>
                  <SectionLabel>درباره بیمار</SectionLabel>
                  <textarea
                    {...register("bio")}
                    rows={4}
                    placeholder="یادداشت یا توضیحات مختصر..."
                    className="w-full px-4 py-3 text-sm rounded-xl transition resize-none focus:outline-none"
                    style={{
                      background: "#EEF2F1",
                      border: "1px solid #DCE3E1",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px #DCEEEC")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  {errors.bio && <FormError message={errors.bio.message} />}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <div className="space-y-8">
                <SectionLabel>راه‌های ارتباطی</SectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    label="شماره موبایل"
                    register={register("phoneNumber")}
                    error={errors.phoneNumber}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    mono
                    required
                  />
                  <FormField
                    label="ایمیل"
                    type="email"
                    register={register("email")}
                    error={errors.email}
                    placeholder="example@email.com"
                    dir="ltr"
                    mono
                  />
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === "system" && (
              <div className="space-y-8">
                <div>
                  <SectionLabel>وضعیت پرونده</SectionLabel>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(STATUS_CONFIG).map(([value, config]) => {
                      const selected = currentStatus === value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleStatusChange(value)}
                          className="flex flex-col items-center gap-2 group"
                        >
                          <span
                            className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-lg transition-all ${config.dot}`}
                            style={{
                              boxShadow: selected
                                ? `0 0 0 3px #FFFFFF, 0 0 0 5px currentColor`
                                : "none",
                              color: selected ? undefined : "transparent",
                              opacity: selected ? 1 : 0.55,
                              transform: selected ? "scale(1.05)" : "scale(1)",
                            }}
                          >
                            {config.icon}
                          </span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: selected ? "#16302E" : "#5B7371" }}
                          >
                            {config.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid #DCE3E1" }}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {isDirty ? (
                  <p className="text-xs flex items-center gap-1.5" style={{ color: "#B9821A" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#B9821A" }} />
                    تغییرات ذخیره نشده
                  </p>
                ) : (
                  <span />
                )}
                <div className="flex gap-3 mr-auto sm:mr-0">
                  <button
                    type="button"
                    onClick={() => reset()}
                    disabled={!isDirty || updateMutation.isPending}
                    className="px-5 py-2 text-sm rounded-xl transition disabled:opacity-40"
                    style={{ color: "#16302E", border: "1px solid #DCE3E1" }}
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty || !isValid || updateMutation.isPending || isSubmitting}
                    className="px-6 py-2 text-sm font-medium text-white rounded-xl active:scale-95 transition disabled:opacity-50 flex items-center gap-2"
                    style={{ background: "#0F6B63", boxShadow: "0 8px 20px -8px rgba(15,107,99,0.6)" }}
                  >
                    {updateMutation.isPending || isSubmitting ? (
                      <>
                        <FiLoader className="animate-spin" style={{ width: 16, height: 16 }} />
                        <span>در حال ذخیره...</span>
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
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

const SectionLabel = ({ children }) => (
  <h3
    className="text-xs font-semibold mb-4 tracking-wide"
    style={{ color: "#5B7371" }}
  >
    {children}
  </h3>
);

const FormField = ({ label, register, error, type = "text", placeholder, dir, required, mono }) => (
  <div>
    <label className="block text-sm font-medium mb-1.5" style={{ color: "#16302E" }}>
      {label}
      {required && <span style={{ color: "#B14A3E" }} className="mr-1">*</span>}
    </label>
    <input
      type={type}
      {...register}
      dir={dir}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 text-sm rounded-xl focus:outline-none transition"
      style={{
        fontFamily: mono ? "'JetBrains Mono', monospace" : undefined,
        background: error ? "#F8E9E7" : "#EEF2F1",
        border: error ? "1px solid #E3B3AC" : "1px solid #DCE3E1",
        boxShadow: "none",
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = error ? "0 0 0 3px #F3D3CE" : "0 0 0 3px #DCEEEC";
        e.target.style.background = "#FFFFFF";
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = "none";
        e.target.style.background = error ? "#F8E9E7" : "#EEF2F1";
      }}
    />
    {error && <FormError message={error.message} />}
  </div>
);

const FormError = ({ message }) => (
  <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: "#B14A3E" }}>
    <span>⚠</span> {message}
  </p>
);

const MetaBadge = ({ icon, label, value }) => (
  <span
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
    style={{ background: "#EEF2F1", color: "#5B7371" }}
  >
    <span style={{ color: "#0F6B63" }}>{icon}</span>
    <span>{label}:</span>
    <span
      style={{ fontFamily: "'JetBrains Mono', monospace", color: "#16302E", direction: "ltr" }}
    >
      {value}
    </span>
  </span>
);

// Loading, Error, Not Found Components
const LoadingScreen = () => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: "#EEF2F1", fontFamily: "'Vazirmatn', sans-serif" }}
  >
    <div className="text-center">
      <FiLoader className="animate-spin mx-auto" style={{ width: 28, height: 28, color: "#0F6B63" }} />
      <p className="mt-4 text-sm" style={{ color: "#5B7371" }}>
        در حال بارگذاری پرونده...
      </p>
    </div>
  </div>
);

const ErrorScreen = ({ message, onRetry, onBack }) => (
  <div
    dir="rtl"
    className="min-h-screen flex items-center justify-center p-4"
    style={{ background: "#EEF2F1", fontFamily: "'Vazirmatn', sans-serif" }}
  >
    <div
      className="rounded-2xl overflow-hidden max-w-sm w-full"
      style={{
        background: "#FFFFFF",
        border: "1px solid #DCE3E1",
        boxShadow: "0 1px 2px rgba(15,42,39,0.04), 0 12px 32px -16px rgba(15,42,39,0.18)",
      }}
    >
      <div className="flex items-stretch">
        <div className="w-1.5 shrink-0" style={{ background: "#B14A3E" }} aria-hidden="true" />
        <div className="p-6 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "#F8E9E7" }}
            >
              <FiAlertTriangle style={{ width: 16, height: 16, color: "#B14A3E" }} />
            </span>
            <h3 className="text-base font-semibold" style={{ color: "#16302E" }}>
              خطا در بارگذاری پرونده
            </h3>
          </div>
          <p
            className="text-xs mb-5 px-3 py-2 rounded-lg inline-block"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: "#EEF2F1",
              color: "#5B7371",
              direction: "ltr",
              unicodeBidi: "isolate",
            }}
          >
            {message}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onRetry}
              className="px-4 py-2 text-sm font-medium text-white rounded-xl transition"
              style={{ background: "#0F6B63" }}
            >
              تلاش مجدد
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 text-sm rounded-xl transition"
              style={{ border: "1px solid #DCE3E1", color: "#16302E" }}
            >
              بازگشت
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NotFoundScreen = () => (
  <div
    dir="rtl"
    className="min-h-screen flex items-center justify-center p-4"
    style={{ background: "#EEF2F1", fontFamily: "'Vazirmatn', sans-serif" }}
  >
    <div
      className="rounded-2xl overflow-hidden max-w-sm w-full"
      style={{
        background: "#FFFFFF",
        border: "1px solid #DCE3E1",
        boxShadow: "0 1px 2px rgba(15,42,39,0.04), 0 12px 32px -16px rgba(15,42,39,0.18)",
      }}
    >
      <div className="flex items-stretch">
        <div className="w-1.5 shrink-0" style={{ background: "#B9821A" }} aria-hidden="true" />
        <div className="p-6 flex-1 min-w-0 flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#FBF1DF" }}
          >
            <FiFileMinus style={{ width: 16, height: 16, color: "#B9821A" }} />
          </span>
          <p className="text-sm font-medium" style={{ color: "#16302E" }}>
            بیمار با این شناسه یافت نشد
          </p>
        </div>
      </div>
    </div>
  </div>
);