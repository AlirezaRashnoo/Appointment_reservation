import axios from "axios";
import Cookies from "js-cookie";
import { useCallback, useEffect, useMemo, useState } from "react";

// 👇 استور zustand خودتان را همین‌جا import کنید و مسیر را مطابق پروژه‌تان اصلاح کنید
import { useUserStore } from "@/stores/useUserStore";

/* ============================================================================
   Axios client
   نکته: baseUrl از قبل شامل /api/v1 است، پس مسیرها فقط از /dentist/... شروع می‌شوند.
============================================================================ */
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

/* ============================================================================
   ثابت‌ها
============================================================================ */
// dayOfWeek مطابق قرارداد استاندارد جاوااسکریپت: 0=یکشنبه ... 6=شنبه
// ترتیب نمایش از شنبه شروع می‌شود (هفته‌ی ایرانی)
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
   آیکون‌ها
============================================================================ */
function EditIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" {...props}>
      <path
        d="M13.5 3.5 16 6l-8.5 8.5-3 .75.75-3L13.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" {...props}>
      <path
        d="M4 6h12M8 6V4.5A1 1 0 0 1 9 3.5h2a1 1 0 0 1 1 1V6m-6.5 0 .6 9.4a1 1 0 0 0 1 .933h3.8a1 1 0 0 0 1-.933L14.5 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" {...props}>
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================================
   کامپوننت اصلی
   dentistId از استور zustand خوانده می‌شود (نه از props)
============================================================================ */
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

  /* ------------------------------ دریافت لیست ------------------------------ */
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

  /* ------------------------------ مودال ------------------------------ */
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

  /* ------------------------------ حذف ------------------------------ */
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

  /* ------------------------------ رندر ------------------------------ */
  return (
    <div dir="rtl" className="mx-auto w-full max-w-2xl px-4 sm:px-0 mt-12">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl font-semibold text-slate-800">
            زمان‌های حضور
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            برنامه‌ی هفتگی نوبت‌دهی دندانپزشک
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-teal-800 sm:justify-start sm:py-2"
        >
          <PlusIcon />
          افزودن زمان
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </div>
      )}
      {deleteError && (
        <div className="mb-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {deleteError}
        </div>
      )}

      {loading ? (
        <div className="space-y-2.5">
          {WEEK_ORDER.map((day) => (
            <div key={day.value} className="h-16 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-900/5">
          {WEEK_ORDER.map((day, idx) => {
            const slots = groupedByDay.get(day.value) || [];
            return (
              <div
                key={day.value}
                className={`flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-start sm:gap-4 sm:px-5 ${
                  idx !== WEEK_ORDER.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <div className="flex items-center gap-2 sm:w-20 sm:shrink-0 sm:pt-1">
                  <span className="h-6 w-1 rounded-full bg-teal-600" />
                  <span className="font-serif text-sm font-medium text-slate-700">
                    {day.label}
                  </span>
                </div>

                <div className="flex flex-1 flex-wrap gap-2">
                  {slots.length === 0 ? (
                    <span className="py-1 text-sm text-slate-400">زمانی ثبت نشده</span>
                  ) : (
                    slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="group flex items-center gap-2 rounded-lg bg-teal-50 px-3 py-1.5 text-teal-800"
                      >
                        <span className="font-mono text-sm">
                          {slot.startTime} – {slot.endTime}
                        </span>

                        <span className="flex items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">                          <button
                            onClick={() => openEditModal(slot)}
                            aria-label="ویرایش"
                            className="rounded p-1 text-teal-700 hover:bg-teal-100"
                          >
                            <EditIcon />
                          </button>

                          {pendingDeleteId === slot.id ? (
                            <button
                              onClick={() => confirmDelete(slot.id)}
                              disabled={mutating}
                              className="rounded bg-rose-600 px-1.5 py-0.5 text-xs font-medium text-white hover:bg-rose-700"
                            >
                              حذف شود؟
                            </button>
                          ) : (
                            <button
                              onClick={() => setPendingDeleteId(slot.id)}
                              aria-label="حذف"
                              className="rounded p-1 text-rose-500 hover:bg-rose-50"
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

      {/* -------------------------- مودال ایجاد/ویرایش -------------------------- */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-900/5 sm:p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-slate-800">
              {editingSlot ? "ویرایش بازه‌ی زمانی" : "افزودن بازه‌ی زمانی جدید"}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              روز و ساعت‌های حضور خود را مشخص کنید.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  روز هفته
                </label>
                <select
                  value={form.dayOfWeek}
                  onChange={handleFormChange("dayOfWeek")}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                >
                  {WEEK_ORDER.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    ساعت شروع
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={handleFormChange("startTime")}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-mono text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    ساعت پایان
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={handleFormChange("endTime")}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-mono text-slate-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
                  />
                </div>
              </div>

              {formError && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
                  {formError}
                </p>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  disabled={mutating}
                  className="flex-1 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {mutating ? "در حال ثبت..." : editingSlot ? "ذخیره تغییرات" : "افزودن"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
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