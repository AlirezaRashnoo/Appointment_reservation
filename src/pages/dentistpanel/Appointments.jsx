// AppointmentsDentist

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

function getCSRFToken() {
  return (
    Cookies.get("csrf_token") ||
    ""
  );
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCSRFToken();
  if (token) config.headers["x-csrf-token"] = token;
  return config;
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatTime(timeStr) {
  if (!timeStr) return "—";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "ب.ظ" : "ق.ظ";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

function formatDate(utcStr) {
  if (!utcStr) return "—";
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(utcStr));
}

function getDuration(start, end) {
  const mins = Math.round((new Date(end) - new Date(start)) / 60000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_MAP = {
  pending:  { label: "در انتظار",  dot: "bg-amber-400",   pill: "bg-amber-50  text-amber-700  border-amber-200"  },
  accepted: { label: "تأیید شده", dot: "bg-emerald-400", pill: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  rejected: { label: "رد شده",    dot: "bg-red-400",     pill: "bg-red-50    text-red-700    border-red-200"    },
};

function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { label: status, dot: "bg-slate-400", pill: "bg-slate-50 text-slate-600 border-slate-200" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ src, name }) {
  const [err, setErr] = useState(false);
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2);
  return src && !err
    ? <img src={src} alt={name} onError={() => setErr(true)}
        className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm flex-shrink-0" />
    : <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 ring-2 ring-white shadow-sm flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
        {initials}
      </div>;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-slide-up
      ${type === "success" ? "bg-emerald-600 text-white" : "bg-red-500 text-white"}`}>
      {type === "success"
        ? <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        : <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>}
      {message}
    </div>
  );
}

// ─── Accept Button ────────────────────────────────────────────────────────────

function AcceptButton({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold
        bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm shadow-emerald-200
        hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
      {loading
        ? <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
        : <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
      {loading ? "در حال تأیید..." : "تأیید نوبت"}
    </button>
  );
}

// ─── Mobile Card ──────────────────────────────────────────────────────────────

function extractPatient(r) {
  // reservedBy = بیماری که نوبت گرفته
  const patient = r.reservedBy ?? {};
  const profile = patient?.profile ?? {};
  return {
    fullName: profile.fullName || `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "بیمار ناشناس",
    avatar:   null,
    phone:    patient?.phoneNumber ?? "—",
  };
}

function MobileCard({ r, onAccept }) {
  const [accepting, setAccepting] = useState(false);
  const [status, setStatus] = useState(r.status);

  const { fullName, avatar, phone } = extractPatient(r);

  async function handleAccept() {
    setAccepting(true);
    try { await onAccept(r.id); setStatus("accepted"); }
    catch { /* parent toast */ }
    finally { setAccepting(false); }
  }

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all
      ${status === "pending" ? "border-slate-100 hover:shadow-md" : "border-emerald-100"}`}>
      <div className={`h-0.5 ${status === "pending" ? "bg-gradient-to-r from-sky-400 to-indigo-400" : "bg-gradient-to-r from-emerald-400 to-teal-400"}`} />
      <div className="p-4 space-y-3">
        {/* top row */}
        <div className="flex items-center gap-3">
          <Avatar src={avatar} name={fullName} />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-sm truncate">{fullName}</p>
            <p className="text-slate-400 text-xs" style={{direction:"ltr", textAlign:"right"}}>{phone}</p>
          </div>
          <StatusBadge status={status} />
        </div>
        {/* info row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { icon: "📅", label: "تاریخ",    val: formatDate(r.utcStartedAt) },
            { icon: "🕐", label: "شروع",     val: formatTime(r.localTimeStartedAt) },
            { icon: "⏱",  label: "مدت",      val: getDuration(r.utcStartedAt, r.utcEndedAt) },
          ].map(c => (
            <div key={c.label} className="bg-slate-50 rounded-xl p-2">
              <p className="text-[10px] text-slate-400">{c.icon} {c.label}</p>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{c.val}</p>
            </div>
          ))}
        </div>
        {/* action */}
        {status === "pending"
          ? <AcceptButton onClick={handleAccept} loading={accepting} />
          : <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              نوبت تأیید شد
            </p>}
      </div>
    </div>
  );
}

// ─── Desktop Table Row ────────────────────────────────────────────────────────

function TableRow({ r, onAccept, index }) {
  const [accepting, setAccepting] = useState(false);
  const [status, setStatus] = useState(r.status);

  const { fullName, avatar, phone } = extractPatient(r);

  async function handleAccept() {
    setAccepting(true);
    try { await onAccept(r.id); setStatus("accepted"); }
    catch { /* parent toast */ }
    finally { setAccepting(false); }
  }

  return (
    <tr className={`border-b border-slate-100 transition-colors hover:bg-slate-50/70
      ${index % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
      {/* Patient */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <Avatar src={avatar} name={fullName} />
          <div className="min-w-0">
            <p className="font-semibold text-slate-800 text-sm truncate">{fullName}</p>
            <p className="text-slate-400 text-xs" style={{direction:"ltr"}}>{phone}</p>
          </div>
        </div>
      </td>
      {/* Date */}
      <td className="px-4 py-3.5 text-sm text-slate-600">{formatDate(r.utcStartedAt)}</td>
      {/* Time range */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-700 font-medium">{formatTime(r.localTimeStartedAt)}</span>
          <div className="w-10 h-0.5 bg-slate-200 rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full" />
          </div>
          <span className="text-sm text-slate-700 font-medium">{formatTime(r.localTimeEndedAt)}</span>
        </div>
      </td>
      {/* Duration */}
      <td className="px-4 py-3.5">
        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-medium">
          {getDuration(r.utcStartedAt, r.utcEndedAt)}
        </span>
      </td>
      {/* Status */}
      <td className="px-4 py-3.5"><StatusBadge status={status} /></td>
      {/* Action */}
      <td className="px-4 py-3.5 text-left">
        {status === "pending"
          ? <AcceptButton onClick={handleAccept} loading={accepting} />
          : <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
              تأیید شده
            </span>}
      </td>
    </tr>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TableSkeleton() {
  return (
    <>
      {[1,2,3,4].map(i => (
        <tr key={i} className="border-b border-slate-100 animate-pulse">
          <td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-slate-200 flex-shrink-0"/><div className="space-y-1.5"><div className="h-3 bg-slate-200 rounded w-24"/><div className="h-2.5 bg-slate-100 rounded w-16"/></div></div></td>
          <td className="px-4 py-3.5"><div className="h-3 bg-slate-200 rounded w-20"/></td>
          <td className="px-4 py-3.5"><div className="h-3 bg-slate-200 rounded w-32"/></td>
          <td className="px-4 py-3.5"><div className="h-6 bg-slate-100 rounded-lg w-12"/></td>
          <td className="px-4 py-3.5"><div className="h-6 bg-slate-100 rounded-full w-20"/></td>
          <td className="px-4 py-3.5"><div className="h-7 bg-slate-100 rounded-xl w-24"/></td>
        </tr>
      ))}
    </>
  );
}

function MobileSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1,2,3].map(i => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200"/>
            <div className="flex-1 space-y-1.5"><div className="h-3 bg-slate-200 rounded w-1/3"/><div className="h-2.5 bg-slate-100 rounded w-1/4"/></div>
            <div className="h-6 bg-slate-100 rounded-full w-20"/>
          </div>
          <div className="grid grid-cols-3 gap-2">{[1,2,3].map(j=><div key={j} className="h-12 bg-slate-100 rounded-xl"/>)}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl mb-3">🦷</div>
      <p className="font-semibold text-slate-700">نوبتی یافت نشد</p>
      <p className="text-xs text-slate-400 mt-1">هیچ نوبتی با این فیلتر وجود ندارد.</p>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ReservationsDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [toast, setToast]               = useState(null);
  const [filter, setFilter]             = useState("all");
  const [search, setSearch]             = useState("");

  const showToast = (msg, type = "success") => setToast({ message: msg, type });

  const fetchReservations = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const { data } = await axiosInstance.get("/reservations");
      setReservations(data.data.reservations || []);
    } catch (err) {
      setError(err.response?.data?.message || "خطا در دریافت اطلاعات");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchReservations(); }, [fetchReservations]);

//   const handleAccept = async (id) => {
//   try {
//     await axiosInstance.patch("/reservations/accept");
    
//     setReservations(prev => 
//       prev.map(r => r.id === id ? { ...r, status: "accepted" } : r)
//     );
    
//     showToast("نوبت با موفقیت تأیید شد ✓");
//   } catch (err) {
//     showToast(err.response?.data?.message || "خطا در تأیید نوبت", "error");
//     throw err;
//   }
// };



const handleAccept = async (id) => {
  try {
    await axiosInstance.patch("/reservations/accept", { 
      ids: [id] 
    });

    setReservations(prev => 
      prev.map(r => r.id === id ? { ...r, status: "accepted" } : r)
    );
    
    showToast("نوبت با موفقیت تأیید شد ✓");
  } catch (err) {
    showToast(err.response?.data?.message || "خطا در تأیید نوبت", "error");
    throw err;
  }
};

  

const pendingCount  = reservations.filter(r => r.status === "pending").length;
  const acceptedCount = reservations.filter(r => r.status === "accepted").length;

  const filtered = reservations
    .filter(r => filter === "all" || r.status === filter)
    .filter(r => {
      if (!search.trim()) return true;
      const { fullName, phone } = extractPatient(r);
      return fullName.toLowerCase().includes(search.toLowerCase()) || phone.includes(search);
    });

  const TABS = [
    { key: "all",      label: "همه",       count: reservations.length },
    { key: "pending",  label: "در انتظار", count: pendingCount },
    { key: "accepted", label: "تأیید شده", count: acceptedCount },
  ];

  const TABLE_COLS = ["بیمار", "تاریخ", "بازه زمانی", "مدت", "وضعیت", "عملیات"];

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { font-family: 'Vazirmatn', sans-serif; box-sizing: border-box; }
        @keyframes slide-up {
          from { opacity: 0; transform: translate(-50%, 12px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-slide-up { animation: slide-up 0.2s ease; }
        .scrollbar-thin::-webkit-scrollbar { height: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 9999px; }
      `}</style>

      {/* ── Sidebar + Content layout ── */}
      <div className="flex min-h-screen">

        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:flex flex-col w-60 bg-white border-l border-slate-100 shadow-sm fixed top-0 right-0 h-full z-10">
          <div className="p-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white text-lg shadow">🦷</div>
              <div>
                <p className="font-extrabold text-slate-800 text-sm leading-tight">کلینیک دندان‌پزشکی</p>
                <p className="text-slate-400 text-[10px]">پنل مدیریت</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1 flex-1">
            <p className="text-[10px] text-slate-400 font-semibold px-2 mb-2 uppercase tracking-wider">نوبت‌ها</p>
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setFilter(tab.key)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${filter === tab.key ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"}`}>
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold
                  ${filter === tab.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{tab.count}</span>
              </button>
            ))}
          </nav>

          {/* Stats at bottom of sidebar */}
          <div className="p-4 border-t border-slate-100 space-y-2">
            {[
              { label: "کل نوبت‌ها",  val: reservations.length, color: "text-slate-700" },
              { label: "در انتظار",   val: pendingCount,         color: "text-amber-600" },
              { label: "تأیید شده",   val: acceptedCount,        color: "text-emerald-600" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between px-1">
                <span className="text-xs text-slate-400">{s.label}</span>
                <span className={`text-sm font-extrabold ${s.color}`}>{s.val}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:mr-60">

          {/* Top bar */}
          <header className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
            <div className="px-4 lg:px-8 py-3 flex items-center gap-3">
              {/* Mobile logo */}
              <div className="lg:hidden w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white flex-shrink-0">🦷</div>

              <div className="flex-1">
                <h1 className="font-extrabold text-slate-800 text-base lg:text-lg leading-tight">نوبت‌های بیماران</h1>
              </div>

              {/* Search */}
              <div className="relative hidden sm:block">
                <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
                <input
                  type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="جستجو نام یا شماره..."
                  className="pr-9 pl-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 w-48 lg:w-56 transition-all" />
              </div>

              {/* Refresh */}
              <button onClick={fetchReservations} disabled={loading}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-500 disabled:opacity-40" title="بروزرسانی">
                <svg className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>
            </div>

            {/* Mobile search */}
            <div className="sm:hidden px-4 pb-3">
              <div className="relative">
                <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/></svg>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="جستجو نام یا شماره..."
                  className="w-full pr-9 pl-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400" />
              </div>
            </div>

            {/* Mobile filter tabs */}
            <div className="lg:hidden flex gap-1.5 px-4 pb-3 overflow-x-auto scrollbar-thin">
              {TABS.map(tab => (
                <button key={tab.key} onClick={() => setFilter(tab.key)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                    ${filter === tab.key ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sm" : "bg-slate-100 text-slate-500"}`}>
                  {tab.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                    ${filter === tab.key ? "bg-white/20" : "bg-white text-slate-500"}`}>{tab.count}</span>
                </button>
              ))}
            </div>
          </header>

          {/* Content */}
          <div className="p-4 lg:p-8">

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-center mb-6">
                <p className="text-red-600 font-semibold text-sm">{error}</p>
                <button onClick={fetchReservations}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-colors">
                  تلاش مجدد
                </button>
              </div>
            )}

            {/* ── Desktop table ── */}
            {!error && (
              <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {TABLE_COLS.map(col => (
                          <th key={col} className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap first:px-5">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? <TableSkeleton />
                        : filtered.length === 0
                          ? <tr><td colSpan={6}><EmptyState /></td></tr>
                          : filtered.map((r, i) => <TableRow key={r.id} r={r} index={i} onAccept={handleAccept} />)}
                    </tbody>
                  </table>
                </div>

                {/* Table footer */}
                {!loading && filtered.length > 0 && (
                  <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <p className="text-xs text-slate-400">
                      نمایش <span className="font-semibold text-slate-600">{filtered.length}</span> از <span className="font-semibold text-slate-600">{reservations.length}</span> نوبت
                    </p>
                    {filter !== "all" && (
                      <button onClick={() => setFilter("all")} className="text-xs text-sky-500 hover:text-sky-700 font-medium transition-colors">
                        نمایش همه
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Mobile cards ── */}
            {!error && (
              <div className="lg:hidden space-y-3">
                {loading
                  ? <MobileSkeleton />
                  : filtered.length === 0
                    ? <EmptyState />
                    : filtered.map(r => <MobileCard key={r.id} r={r} onAccept={handleAccept} />)}
                {!loading && filtered.length > 0 && (
                  <p className="text-center text-xs text-slate-400 pt-1">
                    {filtered.length} نوبت نمایش داده شده
                  </p>
                )}
              </div>
            )}

          </div>
        </main>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}