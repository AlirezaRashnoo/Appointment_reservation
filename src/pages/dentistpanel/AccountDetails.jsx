import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useUserStore } from "@/stores/useUserStore";
 
// ==================== Axios Instance ====================
const axiosInstance = axios.create({
  baseURL: "https://dentist-reyn.onrender.com",
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
 
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
 
// ==================== Toast ====================
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
 
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
 
  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3`}
    >
      <span className="text-xl">{type === "success" ? "✓" : "✗"}</span>
      <span>{message}</span>
    </div>
  );
};
 
// ==================== LoadingSpinner ====================
const LoadingSpinner = ({ size = "medium" }) => {
  const sizeClasses = { small: "w-4 h-4", medium: "w-8 h-8", large: "w-12 h-12" };
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}
      />
    </div>
  );
};
 
// ==================== ErrorState ====================
const ErrorState = ({ error, onRetry, message }) => (
  <div className="text-center py-12 px-4">
    <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
      <h3 className="text-lg font-medium text-red-800 mb-2">
        {message || "خطا در دریافت اطلاعات"}
      </h3>
      <p className="text-sm text-red-600 mb-4">
        {error?.response?.data?.message || error?.message || "خطای ناشناخته"}
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
 
// نکته: چون حالا portfolio دیگه لینک دستی نیست بلکه «کلید فایل» روی استوریج
// (مثلاً portfolio/{dentistUserId}/xxx.jpg) هست، دیگه نیازی به اعتبارسنجی url نیست.
const schema = z.object({
  specialization: z.string().optional(),
  degree: z.string().optional(),
  birthDateShamsi: z.string().optional(),
  portfolio: z.array(z.string()).optional(),
  additionalPhoneNumbers: z
    .array(z.string().regex(PHONE_REGEX, "شماره معتبر نیست (مثال: 09123456789)"))
    .max(2, "حداکثر دو شماره مجاز است")
    .optional(),
  address: z
    .object({
      shortAddr: z.string().optional(),
      longAddr: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است.").optional(),
    })
    .optional(),
  bio: z.string().max(1000, "حداکثر ۱۰۰۰ کاراکتر").optional(),
});
 
// ==================== Constants ====================
const QUERY_KEYS = { DENTIST_PROFILE: "dentistProfile" };
const API_ENDPOINTS = {
  DENTIST_ME: "/api/v1/dentist/me",
  UPLOAD_AVATAR: "/api/v1/dentist/avatar",
  // پرسیند یو‌آرال برای آپلود (نیاز به نقش دندان‌پزشک و روی /me)
  PORTFOLIO_UPLOAD_URL: "/api/v1/dentist/me/portfolio-pre-signed-url",
  // پرسیند یو‌آرال برای مشاهده/دانلود (روی مسیر عمومی، بدون /me)
  PORTFOLIO_VIEW_URL: "/api/v1/dentist/portfolio-pre-signed-url",
};
 
const MAX_PORTFOLIO_FILES = 10;
const MAX_PORTFOLIO_FILE_SIZE = 5 * 1024 * 1024; // 5MB
 
// ==================== API Functions ====================
const fetchDentistProfile = async () => {
  const { data } = await axiosInstance.get(API_ENDPOINTS.DENTIST_ME);
  return data.data;
};
 
// FIX: از PATCH استفاده می‌کنیم (مطابق کد اصلی شما)
const updateDentistProfile = async ({ profileData, csrfToken }) => {
  const { data } = await axiosInstance.patch(API_ENDPOINTS.DENTIST_ME, profileData, {
    headers: { "x-csrf-token": csrfToken },
  });
  return data.data;
};
 
const uploadAvatar = async ({ file, csrfToken }) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const { data } = await axiosInstance.post(API_ENDPOINTS.UPLOAD_AVATAR, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-csrf-token": csrfToken,
    },
  });
  return data.data;
};
 
// از بک‌اند یک URL موقت (presigned) برای آپلود مستقیم فایل روی استوریج می‌گیریم.
// طبق کالکشن پستمن: POST /api/v1/dentist/me/portfolio-pre-signed-url?key=...
const createPortfolioUploadUrl = async ({ key, csrfToken }) => {
  const { data } = await axiosInstance.post(
    `${API_ENDPOINTS.PORTFOLIO_UPLOAD_URL}?key=${encodeURIComponent(key)}`,
    null,
    { headers: { "x-csrf-token": csrfToken } }
  );
  // نام دقیق فیلد در ریسپانس بک‌اند مشخص نبود (کالکشن پستمن نمونه ریسپانس نداشت).
  // چند حالت رایج رو پوشش می‌دیم؛ اگه بک‌اند اسم دیگه‌ای برگردوند همینجا اضافه کن.
  const payload = data?.data ?? data;
  return (
    payload?.url ||
    payload?.uploadUrl ||
    payload?.presignedUrl ||
    payload?.signedUrl ||
    payload
  );
};
 
// برای نمایش/دانلود فایل: GET /api/v1/dentist/portfolio-pre-signed-url?key=...
const getPortfolioViewUrl = async ({ key, csrfToken }) => {
  const { data } = await axiosInstance.get(
    `${API_ENDPOINTS.PORTFOLIO_VIEW_URL}?key=${encodeURIComponent(key)}`,
    { headers: { "x-csrf-token": csrfToken } }
  );
  const payload = data?.data ?? data;
  return (
    payload?.url ||
    payload?.downloadUrl ||
    payload?.presignedUrl ||
    payload?.signedUrl ||
    payload
  );
};
 

const uploadFileToPresignedUrl = async (presignedUrl, file) => {
  await axios.post(presignedUrl, file, {
    headers: { "Content-Type": file.type || "application/octet-stream" },
  });
};
 
// ==================== TabButton ====================
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
 
// ==================== FieldList (برای شماره‌های تماس) ====================
const FieldList = ({ title, fields, onAdd, onRemove, registerFn, errors, placeholder }) => (
  <div className="space-y-3">
    <label className="block text-blue-700 mb-2 font-medium">{title}</label>
    {fields.map((field, index) => (
      <div key={field.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="w-full sm:flex-grow">
          <input
            {...registerFn(index)}
            className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
            placeholder={placeholder}
          />
          {errors?.[index] && (
            <p className="text-red-500 text-xs mt-1">{errors[index].message}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 text-sm px-3 py-2 shrink-0"
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
 
const PortfolioItem = ({ fileKey, csrfToken, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loadingPreview, setLoadingPreview] = useState(true);
  const [previewError, setPreviewError] = useState(false);
 
  useEffect(() => {
    let cancelled = false;
    setLoadingPreview(true);
    setPreviewError(false);
 
    getPortfolioViewUrl({ key: fileKey, csrfToken })
      .then((url) => {
        if (!cancelled) setPreviewUrl(typeof url === "string" ? url : null);
      })
      .catch(() => {
        if (!cancelled) setPreviewError(true);
      })
      .finally(() => {
        if (!cancelled) setLoadingPreview(false);
      });
 
    return () => {
      cancelled = true;
    };
  }, [fileKey, csrfToken]);
 
  return (
    <div className="relative group rounded-lg overflow-hidden border border-blue-200 bg-blue-50 aspect-square">
      {loadingPreview && (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner size="small" />
        </div>
      )}
      {!loadingPreview && previewUrl && !previewError && (
        <img
          src={previewUrl}
          alt="نمونه کار"
          className="w-full h-full object-cover"
          onError={() => setPreviewError(true)}
        />
      )}
      {!loadingPreview && (!previewUrl || previewError) && (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs px-2 text-center">
          پیش‌نمایش در دسترس نیست
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1.5 left-1.5 bg-red-600 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
      >
        🗑️ حذف
      </button>
    </div>
  );
};
 
// ==================== PortfolioUploader ====================
// جایگزین FieldList قدیمی برای تب «نمونه کارها»: به‌جای اینکه دندان‌پزشک لینک
// دستی وارد کنه، فایل رو انتخاب می‌کنه، مستقیم آپلود می‌شه و «کلید» فایل به
// فیلد آرایه‌ی portfolio فرم اضافه می‌شه (که با ذخیره‌ی فرم، PATCH می‌شه).
const PortfolioUploader = ({ fields, onAppend, onRemove, csrfToken, showToast }) => {
  const [uploading, setUploading] = useState(false);
 
  const handleFileSelect = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      event.target.value = ""; // امکان انتخاب دوباره‌ی همون فایل
      if (!file) return;
 
      if (fields.length >= MAX_PORTFOLIO_FILES) {
        showToast(`حداکثر ${MAX_PORTFOLIO_FILES} نمونه کار مجاز است`, "error");
        return;
      }
      if (!file.type.startsWith("image/")) {
        showToast("فقط فایل تصویری مجاز است", "error");
        return;
      }
      if (file.size > MAX_PORTFOLIO_FILE_SIZE) {
        showToast("حجم فایل باید کمتر از ۵ مگابایت باشد", "error");
        return;
      }
 
      setUploading(true);
      try {
        // یک کلید یکتا برای فایل می‌سازیم. اگه بک‌اند فرمت خاصی برای
        // fileKey می‌خواد (مثلاً باید حتماً با شناسه دندان‌پزشک شروع بشه)
        // همین‌جا باید اصلاحش کنی.
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const key = `portfolio/${Date.now()}-${safeName}`;
 
        const uploadUrl = await createPortfolioUploadUrl({ key, csrfToken });
        if (!uploadUrl || typeof uploadUrl !== "string") {
          throw new Error("آدرس آپلود از سرور دریافت نشد");
        }
 
        await uploadFileToPresignedUrl(uploadUrl, file);
 
        onAppend(key);
        showToast("نمونه کار با موفقیت آپلود شد", "success");
      } catch (err) {
        showToast(
          err?.response?.data?.message || err?.message || "خطا در آپلود نمونه کار",
          "error"
        );
      } finally {
        setUploading(false);
      }
    },
    [fields.length, onAppend, csrfToken, showToast]
  );
 
  return (
    <div className="space-y-3">
      <label className="block text-blue-700 mb-2 font-medium">نمونه کارها</label>
 
      {fields.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {fields.map((field, index) => (
            <PortfolioItem
              key={field.id}
              fileKey={field.value ?? field}
              csrfToken={csrfToken}
              onRemove={() => onRemove(index)}
            />
          ))}
        </div>
      )}
 
      <div>
        <input
          id="portfolio-upload-input"
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading || fields.length >= MAX_PORTFOLIO_FILES}
          className="hidden"
        />
        <label
          htmlFor="portfolio-upload-input"
          className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-dashed border-blue-300 text-blue-600 cursor-pointer hover:bg-blue-50 transition-colors ${
            uploading || fields.length >= MAX_PORTFOLIO_FILES
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          {uploading ? (
            <>
              <LoadingSpinner size="small" />
              در حال آپلود...
            </>
          ) : (
            <>➕ افزودن نمونه کار</>
          )}
        </label>
        <p className="text-xs text-gray-400 mt-1">
          حداکثر {MAX_PORTFOLIO_FILES} تصویر، هر کدام تا ۵ مگابایت
        </p>
      </div>
    </div>
  );
};
 
// ==================== AvatarUpload ====================
const AvatarUpload = ({ avatarUrl, uploading, onUpload }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      تصویر پروفایل
    </label>
    <div className="flex items-center gap-4">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="آواتار"
          className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-200"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
          👨‍⚕️
        </div>
      )}
      <div className="flex-1">
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 disabled:opacity-50"
        />
        {uploading && (
          <p className="text-blue-500 text-sm mt-1 flex items-center gap-2">
            <LoadingSpinner size="small" />
            در حال آپلود...
          </p>
        )}
      </div>
    </div>
  </div>
);
 
// ==================== ReadOnlyField ====================
const ReadOnlyField = ({ label, value }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      value={value || "---"}
      disabled
      className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200 cursor-not-allowed"
    />
  </div>
);
 
// ==================== Main Component ====================
export default function AccountDetails() {
  const queryClient = useQueryClient();
 
  const csrfToken = useUserStore((state) => state.csrfToken);
 
  const [activeTab, setActiveTab] = useState("portfolio");
  const [uploading, setUploading] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [toast, setToast] = useState(null);
 
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);
 
  const hideToast = useCallback(() => setToast(null), []);
 
  // ==================== Query ====================
  const { data: profile, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.DENTIST_PROFILE],
    queryFn: fetchDentistProfile,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
 
  // ==================== Mutations ====================
  const updateMutation = useMutation({
    mutationFn: updateDentistProfile,
    onSuccess: () => {
      showToast("پروفایل با موفقیت به‌روزرسانی شد", "success");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DENTIST_PROFILE] });
    },
    onError: (err) => {
      showToast(err.response?.data?.message || "خطا در به‌روزرسانی پروفایل", "error");
    },
  });
 
  const uploadMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      showToast("تصویر با موفقیت آپلود شد", "success");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DENTIST_PROFILE] });
    },
    onError: (err) => {
      console.log(err);
 
      showToast(err.response?.data?.message || "خطا در آپلود تصویر", "error");
    },
    onSettled: () => setUploading(false),
  });
 
  // ==================== Form ====================
  const defaultValues = useMemo(
    () => ({
      specialization: profile?.specialization || "",
      degree: profile?.degree || "",
      birthDateShamsi: profile?.birthDateShamsi || "",
      portfolio: profile?.portfolio || [],
      additionalPhoneNumbers: profile?.additionalPhoneNumbers || [],
      address: {
        shortAddr: profile?.address?.shortAddr || "",
        longAddr: profile?.address?.longAddr || "",
      },
      bio: profile?.user?.profile?.bio || "",
    }),
    [profile]
  );
 
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues,
  });
 
  useEffect(() => {
    if (profile) {
      reset(defaultValues);
      if (profile.birthDateShamsi) setBirthDate(profile.birthDateShamsi);
    }
  }, [profile, reset, defaultValues]);
 
  // ==================== Field Arrays ====================
  const {
    fields: portfolioFields,
    append: appendPortfolio,
    remove: removePortfolio,
  } = useFieldArray({ control, name: "portfolio" });
 
  const { fields: phoneFields, append: appendPhone, remove: removePhone } =
    useFieldArray({ control, name: "additionalPhoneNumbers" });
 
  // ==================== Handlers ====================
  const onDateChange = useCallback(
    (date) => {
      setBirthDate(date);
      if (date) setValue("birthDateShamsi", date.format(), { shouldDirty: true });
    },
    [setValue]
  );
 
  const handleAvatarUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        showToast("حجم فایل باید کمتر از ۲ مگابایت باشد", "error");
        return;
      }
      if (!file.type.startsWith("image/")) {
        showToast("فقط فایل تصویری مجاز است", "error");
        return;
      }
      setUploading(true);
      uploadMutation.mutate({ file, csrfToken });
    },
    [uploadMutation, showToast]
  );
 
  // آپلود فایل نمونه‌کار فوراً کلید رو به فیلد آرایه اضافه می‌کنه؛ ذخیره‌ی
  // نهایی (یعنی PATCH شدن این آرایه روی پروفایل) همچنان با دکمه‌ی
  // «ذخیره تغییرات» انجام می‌شه، دقیقاً مثل بقیه‌ی فیلدهای فرم.
  const handlePortfolioAppend = useCallback(
    (key) => {
      appendPortfolio(key, { shouldDirty: true });
    },
    [appendPortfolio]
  );
 
  const handlePortfolioRemove = useCallback(
    (index) => {
      removePortfolio(index);
    },
    [removePortfolio]
  );
 
  // ==================== onSubmit ====================
  const onSubmit = useCallback(
    async (data) => {
      const cleanData = {
        ...(data.specialization && { specialization: data.specialization }),
        ...(data.degree && { degree: data.degree }),
        ...(data.birthDateShamsi && { birthDateShamsi: data.birthDateShamsi }),
        ...(data.portfolio?.length > 0 && { portfolio: data.portfolio }),
        ...(data.additionalPhoneNumbers?.length > 0 && {
          additionalPhoneNumbers: data.additionalPhoneNumbers,
        }),
        address: {
          ...(data.address?.shortAddr && { shortAddr: data.address.shortAddr }),
          ...(data.address?.longAddr && { longAddr: data.address.longAddr }),
        },
        profile: {
          ...(data.bio && { bio: data.bio }),
        },
      };
 
      if (Object.keys(cleanData.address).length === 0) delete cleanData.address;
      if (Object.keys(cleanData.profile).length === 0) delete cleanData.profile;
 
      updateMutation.mutate({ profileData: cleanData, csrfToken });
    },
    [updateMutation, csrfToken]
  );
 
  // ==================== Loading / Error ====================
  if (isLoading) {
    return (
      <div className="pb-16 bg-blue-50 min-h-screen flex justify-center items-center">
        <LoadingSpinner size="large" />
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
    <div className="pb-16 bg-blue-50 min-h-screen relative" dir="rtl">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
 
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
          <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات دندان‌پزشک</h4>
        </div>
 
        {/* Form Card */}
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="grid sm:grid-cols-2 gap-6">
              <ReadOnlyField
                label="نام و نام خانوادگی"
                value={
                  profile?.user?.profile?.firstName
                    ? `${profile.user.profile.firstName} ${profile.user.profile.lastName || ""}`
                    : profile?.user?.profile?.fullName
                }
              />
              <ReadOnlyField label="شماره موبایل" value={profile?.user?.phoneNumber} />
              <ReadOnlyField label="ایمیل" value={profile?.user?.profile?.email} />
              <ReadOnlyField label="کد ملی" value={profile?.user?.profile?.nationalCode} />
              <ReadOnlyField label="کد نظام پزشکی" value={profile?.medicalCouncilNumber} />
 
              <div>
                <label className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
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
 
              <div>
                <label className="block text-sm font-medium text-gray-700">تخصص</label>
                <input
                  {...register("specialization")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="تخصص خود را وارد کنید"
                />
                {errors.specialization && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>
                )}
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700">مدرک تحصیلی</label>
                <input
                  {...register("degree")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="مثلاً: متخصص ارتودنسی"
                />
                {errors.degree && (
                  <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
                )}
              </div>
 
              <div>
                <label className="block text-sm font-medium text-gray-700">آدرس خلاصه</label>
                <input
                  {...register("address.shortAddr")}
                  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="مثلاً: تهران، خیابان ولیعصر"
                />
              </div>
 
              <AvatarUpload
                avatarUrl={profile?.user?.profile?.avatar}
                uploading={uploading}
                onUpload={handleAvatarUpload}
              />
            </div>
 
            <div>
              <label className="block text-sm font-medium text-gray-700">آدرس دقیق مطب</label>
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
 
            <div>
              <label className="block text-sm font-medium text-gray-700">درباره من</label>
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
              <PortfolioUploader
                fields={portfolioFields}
                onAppend={handlePortfolioAppend}
                onRemove={handlePortfolioRemove}
                csrfToken={csrfToken}
                showToast={showToast}
              />
            )}
 
            {activeTab === "phone_numbers" && (
              <FieldList
                title="شماره‌های تماس دیگر (حداکثر ۲ شماره)"
                fields={phoneFields}
                onAdd={() => phoneFields.length < 2 && appendPhone("")}
                onRemove={removePhone}
                registerFn={(index) => register(`additionalPhoneNumbers.${index}`)}
                errors={errors.additionalPhoneNumbers}
                placeholder="مثال: 09123456789"
              />
            )}
 
            {/* Submit */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={updateMutation.isPending || !isDirty}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {updateMutation.isPending ? (
                  <>
                    <LoadingSpinner size="small" />
                    در حال ذخیره...
                  </>
                ) : (
                  "ذخیره تغییرات"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
