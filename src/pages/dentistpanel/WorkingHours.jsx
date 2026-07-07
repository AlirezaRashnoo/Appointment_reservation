import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useUserStore } from "@/stores/useUserStore";

const BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || "https://dentist-reyn.onrender.com/api/v1";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const METHODS_REQUIRING_CSRF = ["post", "put", "patch", "delete"];

axiosClient.interceptors.request.use((config) => {
  const method = (config.method || "get").toLowerCase();
  if (METHODS_REQUIRING_CSRF.includes(method)) {
    const csrfToken = Cookies.get("csrf_token");
    if (csrfToken) config.headers["x-csrf-token"] = csrfToken;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "خطای غیرمنتظره‌ای رخ داد.";
    return Promise.reject({ ...error, message });
  }
);

/* ============================================================================
   API calls
============================================================================ */
const getDentistAvailability = async (dentistId) => {
  const { data } = await axiosClient.get(`/dentist/availability/${dentistId}`);
  return data;
};

const createDentistAvailability = async ({ dayOfWeek, startTime, endTime }) => {
  const { data } = await axiosClient.post("/dentist/availability", [
    { dayOfWeek, startTime, endTime },
  ]);
  return data;
};

const updateDentistAvailability = async (availabilityId, payload) => {
  const { data } = await axiosClient.patch(
    `/dentist/availability/${availabilityId}`,
    payload
  );
  return data;
};

const deleteDentistAvailability = async (availabilityId) => {
  const { data } = await axiosClient.delete(
    `/dentist/availability/${availabilityId}`
  );
  return data;
};

const WEEK_ORDER = [
  { value: 6, label: "شنبه" },
  { value: 0, label: "یکشنبه" },
  { value: 1, label: "دوشنبه" },
  { value: 2, label: "سه‌شنبه" },
  { value: 3, label: "چهارشنبه" },
  { value: 4, label: "پنجشنبه" },
  { value: 5, label: "جمعه" },
];

const EMPTY_FORM = { dayOfWeek: 6, startTime: "09:00", endTime: "13:00" };

/* ============================================================================
   Icons (Refined SVG)
============================================================================ */
function EditIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

export default function DentistAvailability() {
  const dentistId = useUserStore((state) => state.user?.id);

  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutating, setMutating] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const fetchAvailabilities = useCallback(async () => {
    if (!dentistId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getDentistAvailability(dentistId);
      setAvailabilities(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dentistId]);

  useEffect(() => {
    fetchAvailabilities();
  }, [fetchAvailabilities]);

  const groupedByDay = useMemo(() => {
    const map = new Map();
    for (const day of WEEK_ORDER) map.set(day.value, []);
    for (const slot of availabilities) {
      if (map.has(slot.dayOfWeek)) map.get(slot.dayOfWeek).push(slot);
    }
    for (const slots of map.values()) {
      slots.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [availabilities]);

  const openCreateModal = () => {
    setEditingSlot(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  };

  const openEditModal = (slot) => {
    setEditingSlot(slot);
    setForm({
      dayOfWeek: slot.dayOfWeek,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
    setFormError("");
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleFormChange = (field) => (e) => {
    const value = field === "dayOfWeek" ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.startTime || !form.endTime) {
      setFormError("ساعت شروع و پایان را وارد کنید.");
      return;
    }
    if (form.startTime >= form.endTime) {
      setFormError("ساعت پایان باید بعد از ساعت شروع باشد.");
      return;
    }

    setMutating(true);
    try {
      if (editingSlot) {
        const updated = await updateDentistAvailability(editingSlot.id, form);
        const updatedItem = updated?.data || updated;
        setAvailabilities((prev) =>
          prev.map((item) =>
            item.id === editingSlot.id ? { ...item, ...updatedItem } : item
          )
        );
      } else {
        const created = await createDentistAvailability(form);
        const createdList = Array.isArray(created?.data)
          ? created.data
          : Array.isArray(created)
          ? created
          : [created?.data || created];
        setAvailabilities((prev) => [...prev, ...createdList]);
      }
      setModalOpen(false);
    } catch (err) {
      setFormError(err?.message || "ثبت اطلاعات با خطا مواجه شد.");
    } finally {
      setMutating(false);
    }
  };

  const confirmDelete = async (id) => {
    setDeleteError("");
    setMutating(true);
    try {
      await deleteDentistAvailability(id);
      setAvailabilities((prev) => prev.filter((item) => item.id !== id));
      setPendingDeleteId(null);
    } catch (err) {
      setDeleteError(err?.message || "حذف با خطا مواجه شد.");
    } finally {
      setMutating(false);
    }
  };

  return (
    <div dir="rtl" className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      {/* Top Header Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            برنامه‌ریزی زمان‌های حضور
          </h2>
          <p className="mt-1.5 text-sm font-medium text-slate-500">
            مدیریت و تنظیم ساعت‌های حضور هفتگی جهت نوبت‌دهی به بیماران
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-teal-600/10 transition-all hover:bg-teal-700 active:scale-[0.98] sm:py-2.5"
        >
          <PlusIcon />
          افزودن زمان جدید
        </button>
      </div>

      {/* Global Alerts */}
      {(error || deleteError) && (
        <div className="mb-6 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 px-4 py-3.5 text-sm font-semibold text-rose-600">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{error || deleteError}</p>
        </div>
      )}

      {/* Content Body */}
      {loading ? (
        <div className="space-y-4">
          {WEEK_ORDER.map((day) => (
            <div key={day.value} className="h-20 animate-pulse rounded-2xl bg-slate-100/80" />
          ))}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white border border-slate-200/60 shadow-sm">
          {WEEK_ORDER.map((day) => {
            const slots = groupedByDay.get(day.value) || [];
            return (
              <div
                key={day.value}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 hover:bg-slate-50/40 transition-colors"
              >
                {/* Day Tag Column */}
                <div className="flex items-center gap-2.5 sm:w-28 sm:shrink-0">
                  <span className="h-5 w-1 rounded-full bg-teal-500 shadow-sm shadow-teal-500/30" />
                  <span className="text-base font-bold text-slate-800">
                    {day.label}
                  </span>
                </div>

                {/* Slots Wrapper */}
                <div className="flex flex-1 flex-wrap gap-2.5">
                  {slots.length === 0 ? (
                    <span className="py-1.5 text-sm font-medium text-slate-400/90">برنامه‌ای برای این روز تنظیم نشده است</span>
                  ) : (
                    slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="group flex items-center gap-3 rounded-xl bg-teal-50/60 border border-teal-100/50 px-3.5 py-2 text-teal-900 transition-all hover:bg-teal-50 hover:border-teal-200"
                      >
                        <span className="font-mono text-sm font-bold tracking-wide">
                          {slot.startTime} – {slot.endTime}
                        </span>

                        {/* Interactive Slot Actions */}
                        <span className="flex items-center gap-1 border-r border-teal-200/60 pr-1.5 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                          <button
                            onClick={() => openEditModal(slot)}
                            aria-label="ویرایش"
                            className="rounded-lg p-1 text-teal-600 hover:bg-teal-100/80 transition-colors"
                          >
                            <EditIcon />
                          </button>

                          {pendingDeleteId === slot.id ? (
                            <button
                              onClick={() => confirmDelete(slot.id)}
                              disabled={mutating}
                              className="rounded-lg bg-rose-600 px-2 py-1 text-xs font-bold text-white hover:bg-rose-700 transition-colors shadow-sm"
                            >
                              حذف؟
                            </button>
                          ) : (
                            <button
                              onClick={() => setPendingDeleteId(slot.id)}
                              aria-label="حذف"
                              className="rounded-lg p-1 text-rose-500 hover:bg-rose-50 transition-colors"
                            >
                              <TrashIcon />
                            </button>
                          )}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Styled Modern Modal Overlay */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-5">
              <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingSlot ? "ویرایش بازه‌ی زمانی" : "افزودن بازه‌ی زمانی جدید"}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-slate-400">
                  ساعت‌های حضور خود را در روز انتخاب شده تنظیم کنید
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Day Selection */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  روز هفته
                </label>
                <select
                  value={form.dayOfWeek}
                  onChange={handleFormChange("dayOfWeek")}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-3 text-sm font-semibold text-slate-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                >
                  {WEEK_ORDER.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    ساعت شروع
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={handleFormChange("startTime")}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-mono font-bold text-slate-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    ساعت پایان
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={handleFormChange("endTime")}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-mono font-bold text-slate-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Internal Form Errors */}
              {formError && (
                <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100/60 px-3.5 py-2.5 text-xs font-semibold text-rose-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <p>{formError}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={mutating}
                  className="flex-1 rounded-xl bg-teal-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98] shadow-md shadow-teal-600/10"
                >
                  {mutating ? "در حال ثبت..." : editingSlot ? "ذخیره تغییرات" : "افزودن به برنامه"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-500 transition-all hover:bg-slate-50 active:scale-[0.98]"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}