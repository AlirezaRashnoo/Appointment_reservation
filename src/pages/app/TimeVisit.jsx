import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

// ─── Config ────────────────────────────────────────────────────────────────────
const BASE_URL = "https://dentist-reyn.onrender.com"; // https نه http
const TEHRAN_UTC_OFFSET = "+03:30"; // آفست ثابت تهران؛ اگر بک‌اند DST داشت باید داینامیک شود
const BOOKING_HORIZON_DAYS = 21; // چند روز آینده برای انتخاب نمایش داده شود
const MIN_LEAD_MINUTES = 30; // حداقل فاصله از الان تا نزدیک‌ترین اسلات قابل رزرو امروز

// ─── API helpers ───────────────────────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers ?? {}) },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw { status: res.status, message: err?.message ?? `خطا ${res.status}` };
  }
  return res.json();
}

async function getCsrfToken() {
  const data = await apiFetch("/api/v1/auth/csrf-token", { method: "POST" });
  return data?.csrfToken ?? data?.token ?? data?.data?.csrfToken ?? "";
}

// ─── Simple useQuery hook ──────────────────────────────────────────────────────
function useQuery(fn, deps) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fn()
      .then(d  => { if (!cancelled) { setData(d);  setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e); setLoading(false); } });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const DAY_LABELS = ["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه","جمعه","شنبه"];
const ALL_DAYS   = [0,1,2,3,4,5,6];

const CATEGORY_META = {
  "پیشگیری":  { bg:"bg-emerald-50", text:"text-emerald-700", border:"border-emerald-200" },
  "زیبایی":   { bg:"bg-violet-50",  text:"text-violet-700",  border:"border-violet-200" },
  "ارتودنسی": { bg:"bg-sky-50",     text:"text-sky-700",     border:"border-sky-200"     },
  "جراحی":    { bg:"bg-rose-50",    text:"text-rose-700",    border:"border-rose-200"    },
  "ترمیمی":   { bg:"bg-amber-50",   text:"text-amber-700",   border:"border-amber-200"   },
};
const DEFAULT_META = { bg:"bg-slate-50", text:"text-slate-600", border:"border-slate-200" };

function priceFA(n) {
  return new Intl.NumberFormat("fa-IR").format(n);
}

// ─── Date/time helpers ─────────────────────────────────────────────────────────
function addDays(base, n) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function timeToMinutes(t) {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(min) {
  const h = Math.floor(min / 60) % 24;
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// تبدیل تاریخ+ساعت محلی (به وقت تهران) به ISO UTC برای ارسال به بک‌اند
function localToUtcIso(date, time) {
  const [h, m] = time.split(":").map(Number);
  const y  = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const d  = String(date.getDate()).padStart(2, "0");
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return new Date(`${y}-${mo}-${d}T${hh}:${mm}:00${TEHRAN_UTC_OFFSET}`).toISOString();
}

function dateChipLabel(date) {
  const weekday = DAY_LABELS[date.getDay()].slice(0, 3);
  let dayMonth;
  try {
    dayMonth = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { day: "numeric", month: "short" }).format(date);
  } catch {
    dayMonth = `${date.getDate()}/${date.getMonth() + 1}`;
  }
  return { weekday, dayMonth };
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
function StarIcon({ filled }) {
  return (
    <svg className={`w-3.5 h-3.5 ${filled ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  );
}

function ClockIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 6v6l3.5 2"/>
    </svg>
  );
}

function CalendarIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="16" rx="2"/>
      <path strokeLinecap="round" d="M8 3v4M16 3v4M3 10h18"/>
    </svg>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }) {
  return <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`}/>;
}

function ProceduresSkeleton() {
  return (
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        {[80,60,70,65].map((w,i) => <Skeleton key={i} className="h-7" style={{width:w}}/>)}
      </div>
      {[1,2,3].map(i => (
        <div key={i} className="border border-slate-100 rounded-2xl p-4 space-y-2">
          <div className="flex gap-3">
            <Skeleton className="w-10 h-10 shrink-0"/>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/2"/>
              <Skeleton className="h-3 w-3/4"/>
              <Skeleton className="h-3 w-1/3"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScheduleSkeleton() {
  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-7 gap-1.5">
        {ALL_DAYS.map(d => <Skeleton key={d} className="h-16"/>)}
      </div>
      {[1,2,3].map(i => <Skeleton key={i} className="h-12"/>)}
    </div>
  );
}

// ─── Timeline Bar ──────────────────────────────────────────────────────────────
function TimelineBar({ before, duration, after }) {
  const total = (before || 0) + (duration || 0) + (after || 0);
  if (total === 0) return null;
  const pB = ((before   || 0) / total) * 100;
  const pD = ((duration || 0) / total) * 100;
  const pA = ((after    || 0) / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex rounded-lg overflow-hidden h-6 w-full">
        {before > 0 && (
          <div style={{width:`${pB}%`}} className="bg-amber-200 flex items-center justify-center">
            <span className="text-[9px] font-bold text-amber-700">{before}'</span>
          </div>
        )}
        <div style={{width:`${pD}%`}} className="bg-teal-500 flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">{duration}'</span>
        </div>
        {after > 0 && (
          <div style={{width:`${pA}%`}} className="bg-amber-200 flex items-center justify-center">
            <span className="text-[9px] font-bold text-amber-700">{after}'</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-[10px]">
        {before > 0
          ? <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-300"/><span className="text-amber-700">{before} دقیقه انتظار قبل</span></div>
          : <div/>}
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-teal-500"/><span className="text-teal-700">{duration} دقیقه درمان</span></div>
        {after > 0
          ? <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-amber-300"/><span className="text-amber-700">{after} دقیقه انتظار بعد</span></div>
          : <div/>}
      </div>
    </div>
  );
}

// ─── Procedure Card ────────────────────────────────────────────────────────────
function ProcedureCard({ proc, selected, onSelect }) {
  const active    = selected?.id === proc.id;
  const meta      = CATEGORY_META[proc.category] ?? DEFAULT_META;
  const totalMin  = (proc.bufferBeforeMinutes || 0) + (proc.durationMinutes || 0) + (proc.bufferAfterMinutes || 0);
  const hasBuffer = (proc.bufferBeforeMinutes > 0) || (proc.bufferAfterMinutes > 0);

  return (
    <button
      onClick={() => onSelect(active ? null : proc)}
      className={`w-full text-right rounded-2xl border-2 p-4 transition-all duration-200
        ${active
          ? "border-teal-400 bg-teal-50/60 shadow-md shadow-teal-100/60"
          : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"}`}
    >
      <div className="flex gap-3 items-start">
        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-xl
          ${active ? "bg-teal-100" : "bg-slate-50"}`}>
          🦷
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="font-bold text-slate-800 text-sm">{proc.name}</span>
            {proc.category && (
              <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.text} ${meta.border}`}>
                {proc.category}
              </span>
            )}
          </div>
          {proc.description && (
            <p className="text-xs text-slate-400 leading-relaxed mb-2.5 line-clamp-1">{proc.description}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-slate-500">
                <ClockIcon className="w-3.5 h-3.5"/>
                <span className="text-xs">{proc.durationMinutes} دقیقه درمان</span>
              </div>
              {hasBuffer && (
                <div className="flex items-center gap-1 text-amber-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-[11px] font-medium">{totalMin} دقیقه کل</span>
                </div>
              )}
            </div>

          </div>
        </div>
        <div className={`shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
          ${active ? "bg-teal-500 border-teal-500" : "border-slate-300"}`}>
          {active && <CheckIcon/>}
        </div>
      </div>

      {active && (
        <div className="mt-4 pt-4 border-t border-teal-200 space-y-3">
          <p className="text-xs font-bold text-slate-600">جدول زمانی بازه نوبت شما</p>
          <TimelineBar
            before={proc.bufferBeforeMinutes || 0}
            duration={proc.durationMinutes || 0}
            after={proc.bufferAfterMinutes || 0}
          />
          {hasBuffer && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <p className="text-[11px] text-amber-700 leading-relaxed">
                ⏳ علاوه بر {proc.durationMinutes} دقیقه درمان، لطفاً {(proc.bufferBeforeMinutes || 0) + (proc.bufferAfterMinutes || 0)} دقیقه اضافه در نظر بگیرید. کل بازه رزرو‌شده <span className="font-bold">{totalMin} دقیقه</span> است.
              </p>
            </div>
          )}
        </div>
      )}
    </button>
  );
}

// ─── Week Grid ─────────────────────────────────────────────────────────────────
function WeekGrid({ availability }) {
  const byDay = Object.fromEntries(availability.map(a => [a.dayOfWeek, a]));
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {ALL_DAYS.map(d => {
        const slot   = byDay[d];
        const active = !!slot;
        return (
          <div key={d} className="flex flex-col items-center gap-1.5">
            <span className={`text-[10px] font-semibold ${active ? "text-slate-600" : "text-slate-300"}`}>
              {DAY_LABELS[d].slice(0,3)}
            </span>
            <div className={`w-full rounded-xl py-2 flex flex-col items-center gap-1
              ${active ? "bg-teal-500 shadow-sm shadow-teal-200" : "bg-slate-100"}`}>
              {active ? (
                <>
                  <span className="text-[9px] font-bold text-white leading-none">{slot.startTime}</span>
                  <div className="w-3 h-px bg-teal-300"/>
                  <span className="text-[9px] font-bold text-white leading-none">{slot.endTime}</span>
                </>
              ) : (
                <span className="text-[10px] text-slate-300 py-1">—</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Date/Time Picker ──────────────────────────────────────────────────────────
function DateTimePicker({ dates, selectedDate, onSelectDate, slots, selectedTime, onSelectTime }) {
  return (
    <div className="bg-white border border-teal-200 rounded-2xl p-4 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <CalendarIcon className="w-4 h-4 text-teal-500"/>
        <p className="text-sm font-bold text-slate-700">انتخاب تاریخ و ساعت نوبت</p>
      </div>

      {/* روزها */}
      {dates.length === 0 ? (
        <p className="text-xs text-slate-400 py-2">در روزهای پیش‌رو زمان خالی برای این دندانپزشک ثبت نشده.</p>
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {dates.map(date => {
            const active = selectedDate && toYMD(selectedDate) === toYMD(date);
            const { weekday, dayMonth } = dateChipLabel(date);
            return (
              <button
                key={toYMD(date)}
                onClick={() => onSelectDate(date)}
                className={`shrink-0 w-16 flex flex-col items-center gap-0.5 rounded-2xl py-2.5 border transition-all
                  ${active
                    ? "bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"}`}
              >
                <span className="text-[10px] font-semibold">{weekday}</span>
                <span className="text-xs font-bold">{dayMonth}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ساعت‌ها */}
      {selectedDate && (
        slots.length === 0 ? (
          <p className="text-xs text-slate-400 py-2">برای این روز ساعت خالی مناسب این خدمت موجود نیست. روز دیگری را انتخاب کنید.</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {slots.map(time => {
              const active = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  className={`rounded-xl py-2 text-xs font-bold border transition-all
                    ${active
                      ? "bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-200"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"}`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}

// ─── Error Box ─────────────────────────────────────────────────────────────────
function ErrorBox({ message }) {
  return (
    <div className="m-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-center">
      <p className="text-rose-600 text-sm font-medium">{message}</p>
    </div>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-lg
      ${type === "error" ? "bg-rose-500" : "bg-teal-500"}`}>
      {msg}
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function TimeVisit() {
  const { id: dentistId } = useParams(); // route از :id استفاده می‌کنه

  const [tab,          setTab]          = useState("procedures");
  const [filterCat,    setFilterCat]    = useState("همه");
  const [selectedProc, setSelectedProc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [booking,      setBooking]      = useState(false);
  const [booked,       setBooked]       = useState(false);
  const [toast,        setToast]        = useState({ msg: "", type: "success" });

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  }

  // ── Fetches (فقط وقتی dentistId مقدار داره اجرا می‌شن) ──
  const { data: dentist,  loading: dentistLoading, error: dentistError } = useQuery(
    () => dentistId ? apiFetch(`/api/v1/dentist/${dentistId}`) : Promise.resolve(null),
    [dentistId]
  );
  const { data: availRaw, loading: availLoading,   error: availError   } = useQuery(
    () => dentistId ? apiFetch(`/api/v1/dentist/availability/${dentistId}`) : Promise.resolve(null),
    [dentistId]
  );
  const { data: procsRaw, loading: procsLoading,   error: procsError   } = useQuery(
    () => dentistId ? apiFetch(`/api/v1/dentist/procedure/${dentistId}`) : Promise.resolve(null),
    [dentistId]
  );



  // ── Normalize پاسخ‌های API ──

  // dentist: داده اصلی داخل data هست، اطلاعات شخصی داخل data.user.profile
  const d = useMemo(() => {
    const raw = dentist?.data ?? {};
    const profile = raw?.user?.profile ?? {};
    return {
      ...raw,
      firstName:   profile.firstName  ?? raw.firstName  ?? "—",
      lastName:    profile.lastName   ?? raw.lastName   ?? "",
      avatar:      profile.avatar     ?? null,
      addressText: raw.address?.shortAddr ?? raw.address?.longAddr ?? null,
    };
  }, [dentist]);

  // availability: startTime/endTime به شکل "HH:MM:SS" میاد — ":SS" رو حذف می‌کنیم
  const availability = useMemo(() => {
    if (!availRaw) return [];
    const raw = availRaw?.data ?? availRaw?.items ?? availRaw;
    const list = Array.isArray(raw) ? raw : [];
    return list.map(slot => ({
      ...slot,
      startTime: slot.startTime?.slice(0, 5) ?? slot.startTime,
      endTime:   slot.endTime?.slice(0, 5)   ?? slot.endTime,
    }));
  }, [availRaw]);

  // procedures: فیلد price ندارن — فقط isActive=true نشون بده
  const procedures = useMemo(() => {
    if (!procsRaw) return [];
    const raw = procsRaw?.data ?? procsRaw?.items ?? procsRaw;
    const list = Array.isArray(raw) ? raw : [];
    return list.filter(p => p.isActive !== false);
  }, [procsRaw]);

  const categories = useMemo(() =>
    ["همه", ...new Set(procedures.map(p => p.category).filter(Boolean))],
  [procedures]);

  const filtered = useMemo(() =>
    filterCat === "همه" ? procedures : procedures.filter(p => p.category === filterCat),
  [procedures, filterCat]);

  const sorted = useMemo(() =>
    [...availability].sort((a,b) => a.dayOfWeek - b.dayOfWeek),
  [availability]);

  // ── تاریخ‌های قابل‌رزرو (بر اساس روزهای کاری دندانپزشک) ──
  const availableDates = useMemo(() => {
    if (availability.length === 0) return [];
    const workingDays = new Set(availability.map(a => a.dayOfWeek));
    const list = [];
    for (let i = 0; i < BOOKING_HORIZON_DAYS; i++) {
      const dt = addDays(new Date(), i);
      if (workingDays.has(dt.getDay())) list.push(dt);
    }
    return list;
  }, [availability]);

  // ── اسلات‌های ساعتی برای تاریخ و خدمت انتخاب‌شده ──
  const timeSlots = useMemo(() => {
    if (!selectedDate || !selectedProc) return [];
    const dayAvail = availability.find(a => a.dayOfWeek === selectedDate.getDay());
    if (!dayAvail) return [];

    const startMin = timeToMinutes(dayAvail.startTime);
    const endMin   = timeToMinutes(dayAvail.endTime);
    const before   = selectedProc.bufferBeforeMinutes || 0;
    const duration = selectedProc.durationMinutes || 0;
    const after    = selectedProc.bufferAfterMinutes || 0;
    const block     = before + duration + after;
    if (block <= 0 || startMin >= endMin) return [];

    const now = new Date();
    const isToday = toYMD(selectedDate) === toYMD(now);
    const nowMin  = now.getHours() * 60 + now.getMinutes();

    const slots = [];
    let cursor = startMin;
    while (cursor + block <= endMin) {
      const treatStart = cursor + before;
      if (!isToday || treatStart >= nowMin + MIN_LEAD_MINUTES) {
        slots.push(minutesToTime(treatStart));
      }
      cursor += block;
    }
    return slots;
  }, [selectedDate, selectedProc, availability]);

  // وقتی خدمت عوض می‌شه، تاریخ/ساعت انتخابی قبلی معتبر نیست
  useEffect(() => {
    setSelectedDate(null);
    setSelectedTime(null);
  }, [selectedProc]);

  // وقتی تاریخ عوض می‌شه، ساعت انتخابی قبلی رو پاک کن
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate]);

  // ── ثبت رزرو ──
  const handleBook = useCallback(async () => {
    if (!selectedProc || !dentistId || !selectedDate || !selectedTime) return;
    setBooking(true);
    try {
      // گرفتن CSRF token از کوکی
      const csrf = Cookies.get("csrf_token") ?? "";
      if (!csrf) throw { status: 0, message: "CSRF token یافت نشد. لطفاً دوباره وارد شوید." };

      const payload = {
        reservedForId:       dentistId,
        reservedProcedureId: selectedProc.id,
        from:                localToUtcIso(selectedDate, selectedTime),
      };

      console.log("📤 payload:", payload);
      console.log("🔐 csrf:", csrf);

      const res = await fetch(`${BASE_URL}/api/v1/reservations`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrf,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      console.log("📥 response:", res.status, data);

      if (!res.ok) throw { status: res.status, message: data?.message ?? `خطا ${res.status}` };

      setBooked(true);
    } catch (e) {
      console.error("❌ error:", e);
      if (e.status === 409) {
        showToast("شما در ۳ روز گذشته رزرو فعال پیش این دندانپزشک دارید.", "error");
      } else if (e.status === 401) {
        showToast("لطفاً ابتدا وارد حساب کاربری شوید.", "error");
      } else if (e.status === 400) {
        showToast(e.message ?? "اطلاعات ارسالی نادرست است.", "error");
      } else {
        showToast(e.message ?? "خطایی رخ داد. دوباره تلاش کنید.", "error");
      }
    } finally {
      setBooking(false);
    }
  }, [selectedProc, dentistId, selectedDate, selectedTime]);

  // ── صفحه موفقیت ──
  if (booked) {
    const dateLabel = selectedDate ? dateChipLabel(selectedDate).dayMonth : "";
    return (
      <div dir="rtl" className="min-h-screen bg-teal-500 flex flex-col items-center justify-center p-6 gap-6"
        style={{fontFamily:"'Vazirmatn','Tahoma',sans-serif"}}>
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl shadow-teal-700/30">
          <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div className="text-center text-white">
          <h2 className="text-2xl font-black mb-2">نوبت ثبت شد!</h2>
          <p className="text-teal-100 text-sm mb-1">درخواست رزرو «{selectedProc?.name}» ارسال شد</p>
          {selectedTime && (
            <p className="text-teal-100 text-xs mb-1">{dateLabel} ساعت {selectedTime}</p>
          )}
          <p className="text-teal-200 text-xs">منتظر تأیید دندانپزشک باشید</p>
        </div>

        <button onClick={() => { setBooked(false); setSelectedProc(null); setSelectedDate(null); setSelectedTime(null); }}
          className="text-teal-200 text-sm underline underline-offset-4">
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F7F8FA]" style={{fontFamily:"'Vazirmatn','Tahoma',sans-serif"}}>
      <Toast msg={toast.msg} type={toast.type}/>

      {/* ── Header ── */}
      <div className="bg-white sticky top-0 z-30 border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center gap-3">
          <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
          <div className="flex-1">
            <p className="text-[11px] text-slate-400 leading-none">رزرو نوبت</p>
            {dentistLoading
              ? <Skeleton className="h-4 w-32 mt-0.5"/>
              : <p className="text-sm font-bold text-slate-800">
                  دکتر {d.firstName} {d.lastName}
                </p>
            }
          </div>
          {!dentistLoading && d.averageRating != null && (
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-xs font-bold text-amber-700">{d.averageRating}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-4 pb-36 space-y-4">

        {/* ── Dentist Banner ── */}
        {dentistLoading ? (
          <Skeleton className="h-32"/>
        ) : dentistError ? (
          <ErrorBox message="بارگذاری اطلاعات دندانپزشک ناموفق بود"/>
        ) : (
          <div className="bg-gradient-to-bl from-teal-600 to-teal-500 rounded-2xl p-5 text-white shadow-lg shadow-teal-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-black">
                {(d.firstName ?? "د")[0]}
              </div>
              <div className="flex-1">
                <p className="text-teal-100 text-xs mb-0.5">
                  {d.specialization && `متخصص ${d.specialization}`}
                  {d.degree && ` · ${d.degree}`}
                </p>
                <h1 className="text-lg font-black leading-tight">
                  دکتر {d.firstName} {d.lastName}
                </h1>
                {d.averageRating != null && (
                  <div className="flex items-center gap-1 mt-1">
                    {[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= Math.round(d.averageRating)}/>)}
                    {d.reviewCount != null && (
                      <span className="text-teal-200 text-[10px] mr-1">{d.reviewCount} نظر</span>
                    )}
                  </div>
                )}
              </div>
              {d.yearsOfExperience != null && (
                <div className="text-left shrink-0">
                  <p className="text-[10px] text-teal-200">سابقه</p>
                  <p className="text-xl font-black">{d.yearsOfExperience}</p>
                  <p className="text-[10px] text-teal-200">سال</p>
                </div>
              )}
            </div>
            {d.addressText && (
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-1.5 text-teal-100 text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {d.addressText}
              </div>
            )}
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex">
            {[
              { key:"procedures", label:"خدمات درمانی", count: procedures.length },
              { key:"schedule",   label:"زمان‌بندی",    count: availability.length },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold border-b-2 transition-all
                  ${tab === t.key
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-slate-400 hover:text-slate-500"}`}>
                {t.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                  ${tab === t.key ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400"}`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>

          {/* ── Procedures Tab ── */}
          {tab === "procedures" && (
            procsLoading ? <ProceduresSkeleton/> :
            procsError   ? <ErrorBox message="بارگذاری خدمات ناموفق بود"/> :
            procedures.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">خدمتی ثبت نشده</div>
            ) : (
              <div className="p-4 space-y-3">
                {categories.length > 2 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setFilterCat(cat)}
                        className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all
                          ${filterCat === cat
                            ? "bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-200"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
                <div className="space-y-2.5">
                  {filtered.map(p => (
                    <ProcedureCard key={p.id} proc={p} selected={selectedProc} onSelect={setSelectedProc}/>
                  ))}
                </div>
              </div>
            )
          )}

          {/* ── Schedule Tab ── */}
          {tab === "schedule" && (
            availLoading ? <ScheduleSkeleton/> :
            availError   ? <ErrorBox message="بارگذاری زمان‌بندی ناموفق بود"/> :
            availability.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm">زمان‌بندی ثبت نشده</div>
            ) : (
              <div className="p-4 space-y-4">
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  سبز = روز کاری | خاکستری = تعطیل
                </p>
                <WeekGrid availability={availability}/>
                <div className="space-y-2 pt-2">
                  {sorted.map(slot => {
                    const h = parseInt(slot.endTime) - parseInt(slot.startTime);
                    return (
                      <div key={slot.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                        <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0"/>
                        <span className="text-sm font-semibold text-slate-700 flex-1">{DAY_LABELS[slot.dayOfWeek]}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-lg">{slot.startTime}</span>
                          <span className="text-slate-300 text-xs">←</span>
                          <span className="text-xs font-mono bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-lg">{slot.endTime}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 bg-white border border-slate-100 px-1.5 py-0.5 rounded-md">{h}h</span>
                      </div>
                    );
                  })}
                </div>
                {ALL_DAYS.some(d => !availability.find(a => a.dayOfWeek === d)) && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs font-semibold text-amber-700 mb-1">روزهای تعطیل</p>
                    <p className="text-xs text-amber-600">
                      {ALL_DAYS.filter(d => !availability.find(a => a.dayOfWeek === d)).map(d => DAY_LABELS[d]).join("، ")}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* ── Date/Time Picker (بعد از انتخاب خدمت) ── */}
        {selectedProc && (
          <DateTimePicker
            dates={availableDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            slots={timeSlots}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        )}

        {/* ── Selected Summary ── */}
        {selectedProc && (
          <div className="bg-white border border-teal-200 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">🦷</div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">خدمت انتخابی</p>
                <p className="text-sm font-bold text-slate-800">{selectedProc.name}</p>
              </div>
              <div className="text-left shrink-0">
                <p className="text-xs text-slate-400">{selectedProc.durationMinutes} دقیقه درمان</p>

              </div>
              <button onClick={() => setSelectedProc(null)}
                className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {selectedDate && selectedTime && (
              <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
                <CalendarIcon className="w-3.5 h-3.5 text-teal-500"/>
                <span className="text-xs font-bold text-teal-700">
                  {DAY_LABELS[selectedDate.getDay()]} {dateChipLabel(selectedDate).dayMonth} — ساعت {selectedTime}
                </span>
              </div>
            )}

            <TimelineBar
              before={selectedProc.bufferBeforeMinutes || 0}
              duration={selectedProc.durationMinutes || 0}
              after={selectedProc.bufferAfterMinutes || 0}
            />
          </div>
        )}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="fixed inset-x-0 bottom-0 z-30 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4">
        <div className="max-w-lg mx-auto">
          {!selectedProc ? (
            <div className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-100">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
              </svg>
              <span className="text-sm text-slate-400 font-medium">یک خدمت انتخاب کنید</span>
            </div>
          ) : !selectedDate ? (
            <div className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-100">
              <CalendarIcon className="w-4 h-4 text-slate-400"/>
              <span className="text-sm text-slate-400 font-medium">یک تاریخ انتخاب کنید</span>
            </div>
          ) : !selectedTime ? (
            <div className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-100">
              <ClockIcon className="w-4 h-4 text-slate-400"/>
              <span className="text-sm text-slate-400 font-medium">یک ساعت انتخاب کنید</span>
            </div>
          ) : (
            <button onClick={handleBook} disabled={booking}
              className="w-full py-4 rounded-2xl bg-teal-500 text-white font-black text-base shadow-lg shadow-teal-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
              {booking ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  <span>در حال ثبت...</span>
                </>
              ) : (
                <>
                  <span>ثبت نوبت</span>

                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}