import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "@/features/api";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
 
// ========== Schema ==========
const dentistSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست")
    .optional()
    .or(z.literal("")),
  status: z.enum(["active", "pending", "inactive"]).optional(),
  firstName: z.string().min(1, "نام الزامی است").optional().or(z.literal("")),
  lastName: z
    .string()
    .min(1, "نام خانوادگی الزامی است")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("ایمیل معتبر نیست")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, "حداکثر ۵۰۰ کاراکتر مجاز است")
    .optional()
    .or(z.literal("")),
  medicalCouncilNumber: z.string().min(1, "شماره نظام پزشکی الزامی است"),
  yearsOfExperience: z
    .number()
    .min(0, "سال سابقه نمی‌تواند منفی باشد")
    .nullable()
    .optional(),
  specialization: z.string().min(1, "تخصص الزامی است"),
  degree: z.string().min(1, "مدرک تحصیلی الزامی است"),
});
 
// ========== Constants ==========
const STATUS_OPTIONS = [
  { value: "active", label: "فعال" },
  { value: "pending", label: "در انتظار تایید" },
  { value: "inactive", label: "غیرفعال" },
];
 
const STATUS_MAP = {
  active: {
    badge: "bg-green-50 text-green-700",
    dot: "bg-green-500",
    label: "فعال",
  },
  pending: {
    badge: "bg-yellow-50 text-yellow-700",
    dot: "bg-yellow-500",
    label: "در انتظار تایید",
  },
  inactive: {
    badge: "bg-red-50 text-red-600",
    dot: "bg-red-400",
    label: "غیرفعال",
  },
};
 
// ========== API Helpers ==========
const getCsrfToken = () => Cookies.get("csrf_token");
 
const fetchDentistProfile = async (dentistId) => {
  const response = await apiService.get(`/dentist/admin/${dentistId}`, {
    headers: { "X-CSRF-Token": getCsrfToken() },
  });
  if (response.data?.data) return response.data.data;
  throw new Error("ساختار پاسخ نامعتبر است");
};
 
const updateDentistProfile = async ({ dentistId, profileData }) => {
  const payload = {};
 
  // فیلدهای سطح اصلی دندانپزشک
  if (profileData.medicalCouncilNumber)
    payload.medicalCouncilNumber = profileData.medicalCouncilNumber;
  if (profileData.yearsOfExperience != null)
    payload.yearsOfExperience = Number(profileData.yearsOfExperience);
  if (profileData.specialization)
    payload.specialization = profileData.specialization;
  if (profileData.degree) payload.degree = profileData.degree;
 
  // ساختار user
  const userPayload = {};
  if (profileData.status) userPayload.status = profileData.status;
  if (profileData.phoneNumber) userPayload.phoneNumber = profileData.phoneNumber;
 
  // ساختار user.profile
  const profileFields = {};
  if (profileData.email) profileFields.email = profileData.email;
  if (profileData.firstName) profileFields.firstName = profileData.firstName;
  if (profileData.lastName) profileFields.lastName = profileData.lastName;
  if (profileData.bio !== undefined) profileFields.bio = profileData.bio;
 
  if (Object.keys(profileFields).length > 0) userPayload.profile = profileFields;
  if (Object.keys(userPayload).length > 0) payload.user = userPayload;
 
  console.log("Update Payload:", JSON.stringify(payload, null, 2));
 
  const response = await apiService.patch(`/dentist/admin/${dentistId}`, payload, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCsrfToken(),
    },
  });
 
  if (response.data) return response.data;
  throw new Error("خطا در بروزرسانی اطلاعات");
};
 
// ========== Main Component ==========
export default function DentistProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("dentist");
 
  const {
    data: dentistData,
    isLoading,
    error,
    refetch,
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
      toast.success("اطلاعات با موفقیت بروزرسانی شد");
    },
    onError: (error) => toast.error(error.message),
  });
 
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(dentistSchema),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      status: "active",
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      medicalCouncilNumber: "",
      yearsOfExperience: null,
      specialization: "",
      degree: "",
    },
  });
 
  useEffect(() => {
    if (dentistData) {
      reset({
        phoneNumber: dentistData.user?.phoneNumber || "",
        status: dentistData.user?.status || "active",
        firstName: dentistData.user?.profile?.firstName || "",
        lastName: dentistData.user?.profile?.lastName || "",
        email: dentistData.user?.profile?.email || "",
        bio: dentistData.user?.profile?.bio || "",
        medicalCouncilNumber: dentistData.medicalCouncilNumber || "",
        yearsOfExperience: dentistData.yearsOfExperience ?? null,
        specialization: dentistData.specialization || "",
        degree: dentistData.degree || "",
      });
    }
  }, [dentistData, reset]);
 
  const onSubmit = useCallback(
    (formData) => {
      updateMutation.mutate({ dentistId: id, profileData: formData });
    },
    [id, updateMutation]
  );
 
  // ─── Loading ───
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-blue-200 border-t-blue-600" />
          <p className="text-sm text-gray-400">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }
 
  // ─── Error ───
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white border border-red-100 rounded-xl p-8 max-w-sm w-full text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-base font-medium text-gray-800 mb-1">خطا در بارگذاری</h3>
          <p className="text-sm text-gray-400 mb-5">{error.message}</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              تلاش مجدد
            </button>
            <button
              onClick={() => navigate("/admin-panel/users/dentists")}
              className="px-4 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
            >
              بازگشت
            </button>
          </div>
        </div>
      </div>
    );
  }
 
  // ─── Not found ───
  if (!dentistData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
          <p className="text-gray-500">دندانپزشکی با این شناسه یافت نشد</p>
        </div>
      </div>
    );
  }
 
  const status = dentistData.user?.status || "inactive";
  const statusStyle = STATUS_MAP[status] ?? STATUS_MAP.inactive;
  const fullName = `${dentistData.user?.profile?.firstName || ""} ${dentistData.user?.profile?.lastName || ""}`.trim();
  const initials = `${dentistData.user?.profile?.firstName?.[0] || ""}${dentistData.user?.profile?.lastName?.[0] || ""}`;
 
  return (
    <div className="min-h-screen bg-slate-50 py-6" dir="rtl">
      <div className="mx-auto max-w-5xl px-4">
 
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <button
            onClick={() => navigate("/admin-panel")}
            className="hover:text-blue-600 transition"
          >
            پنل مدیریت
          </button>
          <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <button
            onClick={() => navigate("/admin-panel/users/dentists")}
            className="hover:text-blue-600 transition"
          >
            دندانپزشکان
          </button>
          <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-700">ویرایش پروفایل</span>
        </nav>
 
        <div className="grid grid-cols-[272px_1fr] gap-5 items-start">
 
          {/* ══════════════════════════════════════
              SIDEBAR
          ══════════════════════════════════════ */}
          <aside className="bg-white border border-gray-100 rounded-xl overflow-hidden sticky top-6 shadow-sm">
 
            {/* Avatar & identity */}
            <div className="px-6 py-7 text-center border-b border-gray-100">
              {dentistData.user?.profile?.avatar ? (
                <img
                  src={dentistData.user.profile.avatar}
                  alt={fullName}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-slate-50"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-2xl font-medium text-blue-700 select-none">
                  {initials || "؟"}
                </div>
              )}
              <p className="font-medium text-gray-900 mb-0.5 text-base">{fullName || "—"}</p>
              <p className="text-sm text-gray-400 mb-3">{dentistData.specialization || "—"}</p>
              {/* Status badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyle.badge}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                {statusStyle.label}
              </span>
            </div>
 
            {/* Navigation */}
            <nav className="p-2 border-b border-gray-100">
              <NavItem
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                label="اطلاعات تخصصی"
                active={activeTab === "dentist"}
                onClick={() => setActiveTab("dentist")}
              />
              <NavItem
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                label="اطلاعات کاربری"
                active={activeTab === "user"}
                onClick={() => setActiveTab("user")}
              />
            </nav>
 
            {/* Quick stats */}
            <div className="px-5 py-4 space-y-2.5">
              <SidebarStat label="شماره نظام پزشکی" value={dentistData.medicalCouncilNumber || "—"} />
              <SidebarStat
                label="سابقه کار"
                value={dentistData.yearsOfExperience != null ? `${dentistData.yearsOfExperience} سال` : "—"}
              />
              <SidebarStat
                label="تاریخ عضویت"
                value={
                  dentistData.user?.createdAt
                    ? new Date(dentistData.user.createdAt).toLocaleDateString("fa-IR")
                    : "—"
                }
                ltr
              />
              <SidebarStat label="مدرک" value={dentistData.degree || "—"} />
            </div>
          </aside>
 
          {/* ══════════════════════════════════════
              MAIN FORM
          ══════════════════════════════════════ */}
          <main>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
 
                {/* Section header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    {activeTab === "dentist" ? (
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {activeTab === "dentist" ? "اطلاعات تخصصی" : "اطلاعات کاربری"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {activeTab === "dentist"
                        ? "مشخصات حرفه‌ای و پزشکی دندانپزشک"
                        : "اطلاعات حساب کاربری و تماس"}
                    </p>
                  </div>
                </div>
 
                {/* Form body */}
                <div className="p-6">
 
                  {/* ─── Tab: Dentist Info ─── */}
                  {activeTab === "dentist" && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                        <FormField
                          label="شماره نظام پزشکی"
                          register={register("medicalCouncilNumber")}
                          error={errors.medicalCouncilNumber?.message}
                          required
                        />
                        <FormField
                          label="سال‌های سابقه"
                          type="number"
                          register={register("yearsOfExperience", { valueAsNumber: true })}
                          error={errors.yearsOfExperience?.message}
                          placeholder="مثال: 7"
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
                      </div>
 
                      {/* Read-only section */}
                      <ReadOnlySection
                        title="اطلاعات فقط-خواندنی"
                        items={[
                          { label: "تاریخ تولد", value: dentistData.birthDateShamsi },
                          {
                            label: "امتیاز میانگین",
                            value:
                              dentistData.averageRating != null
                                ? String(dentistData.averageRating)
                                : "—",
                          },
                          {
                            label: "تعداد نظرات",
                            value:
                              dentistData.ratingCount != null
                                ? String(dentistData.ratingCount)
                                : "—",
                          },
                        ]}
                      />
                    </div>
                  )}
 
                  {/* ─── Tab: User Info ─── */}
                  {activeTab === "user" && (
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-5">
                        <FormField
                          label="نام"
                          register={register("firstName")}
                          error={errors.firstName?.message}
                        />
                        <FormField
                          label="نام خانوادگی"
                          register={register("lastName")}
                          error={errors.lastName?.message}
                        />
                        <FormField
                          label="شماره موبایل"
                          register={register("phoneNumber")}
                          error={errors.phoneNumber?.message}
                          placeholder="09xxxxxxxxx"
                          ltr
                        />
                        <FormField
                          label="ایمیل"
                          type="email"
                          register={register("email")}
                          error={errors.email?.message}
                          placeholder="example@email.com"
                          ltr
                        />
                        <FormField
                          label="وضعیت حساب"
                          type="select"
                          register={register("status")}
                          error={errors.status?.message}
                          options={STATUS_OPTIONS}
                        />
                      </div>
 
                      {/* Bio */}
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                          بیوگرافی
                        </label>
                        <textarea
                          {...register("bio")}
                          rows={4}
                          placeholder="درباره دندانپزشک بنویسید..."
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition resize-y leading-relaxed"
                        />
                        {errors.bio && (
                          <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
                        )}
                      </div>
 
                      {/* Read-only section */}
                      <ReadOnlySection
                        title="اطلاعات فقط-خواندنی"
                        items={[
                          {
                            label: "کد ملی",
                            value: dentistData.user?.profile?.nationalCode || "—",
                          },
                          { label: "نقش", value: dentistData.user?.role || "—" },
                          {
                            label: "آخرین ویرایش",
                            value: dentistData.user?.modifiedAt
                              ? new Date(dentistData.user.modifiedAt).toLocaleDateString("fa-IR")
                              : "—",
                          },
                        ]}
                      />
                    </div>
                  )}
                </div>
 
                {/* Form footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-slate-50/60 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    {isDirty ? (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                        <span className="text-amber-600 font-medium">تغییرات ذخیره نشده</span>
                      </>
                    ) : (
                      <span className="text-gray-400">هیچ تغییری اعمال نشده</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => reset()}
                      disabled={!isDirty || updateMutation.isPending}
                      className="px-5 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      disabled={!isDirty || !isValid || updateMutation.isPending}
                      className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {updateMutation.isPending ? (
                        <>
                          <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          در حال ذخیره...
                        </>
                      ) : (
                        "ذخیره تغییرات"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════
//  Sub-components
// ═══════════════════════════════════════════════════════════
 
const NavItem = ({ icon, label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm transition text-right ${
      active
        ? "bg-blue-50 text-blue-700 font-medium"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
    }`}
  >
    <span className={active ? "text-blue-600" : "text-gray-400"}>{icon}</span>
    {label}
  </button>
);
 
const SidebarStat = ({ label, value, ltr = false }) => (
  <div className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
    <span className="text-gray-400 text-xs">{label}</span>
    <span
      className={`font-medium text-gray-700 text-xs ${ltr ? "direction-ltr" : ""}`}
      style={ltr ? { direction: "ltr" } : {}}
    >
      {value}
    </span>
  </div>
);
 
const FormField = ({
  label,
  register,
  error,
  type = "text",
  options = [],
  required = false,
  placeholder,
  ltr = false,
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
      {label}
      {required && <span className="text-red-400 mr-1 normal-case not-italic">*</span>}
    </label>
 
    {type === "select" ? (
      <select
        {...register}
        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        style={ltr ? { direction: "ltr", textAlign: "left" } : {}}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition ${
          error ? "border-red-300 bg-red-50/40" : "border-gray-200"
        }`}
      />
    )}
 
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);
 
const ReadOnlySection = ({ title, items }) => (
  <div className="pt-2">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="bg-slate-50 rounded-lg px-3.5 py-3 border border-gray-100"
        >
          <p className="text-xs text-gray-400 mb-1">{label}</p>
          <p className="text-sm font-medium text-gray-700">{value || "—"}</p>
        </div>
      ))}
    </div>
  </div>
);