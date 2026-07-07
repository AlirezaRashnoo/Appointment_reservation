import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toJalaali } from 'jalaali-js';

const API_BASE = 'https://dentist-reyn.onrender.com/api/v1';

const fetchReservations = async () => {
  const csrfToken = Cookies.get('csrf_token');
  if (!csrfToken) throw new Error('CSRF Token یافت نشد');

  const { data } = await axios.get(`${API_BASE}/reservations`, {
    params: { orderBy: 'utcEndedAt', limit: 10, page: 1 },
    headers: { 'x-csrf-token': csrfToken },
    withCredentials: true,
  });
  return data;
};

const toShamsi = (localDateStr) => {
  if (!localDateStr) return '-';
  const [month, day, year] = localDateStr.split('/').map(Number);
  if (!month || !day || !year) return '-';
  const jDate = toJalaali(year, month, day);
  return `${jDate.jy}/${String(jDate.jm).padStart(2, '0')}/${String(jDate.jd).padStart(2, '0')}`;
};

const getDuration = (utcStart, utcEnd) => {
  if (!utcStart || !utcEnd) return '';
  const minutes = Math.round((new Date(utcEnd) - new Date(utcStart)) / 60000);
  if (!Number.isFinite(minutes) || minutes <= 0) return '';
  return `${minutes} دقیقه`;
};

const AppointmentsUser = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reservations'],
    queryFn: fetchReservations,
    retry: 2,
  });

  const reservations = data?.data?.reservations || [];
  const total = data?.data?.total || 0;

  // وضعیت‌ها با رنگ‌های مدرن و ملایم‌تر
  const getStatusInfo = (status) => {
    const config = {
      pending:   { label: 'در انتظار تایید', bg: 'bg-amber-50/70', text: 'text-amber-700', border: 'border-amber-200/60', dot: 'bg-amber-500' },
      accepted:  { label: 'تایید شده', bg: 'bg-emerald-50/70', text: 'text-emerald-700', border: 'border-emerald-200/60', dot: 'bg-emerald-500' },
      confirmed: { label: 'تایید نهایی', bg: 'bg-emerald-50/70', text: 'text-emerald-700', border: 'border-emerald-200/60', dot: 'bg-emerald-500' },
      cancelled: { label: 'لغو شده', bg: 'bg-rose-50/70', text: 'text-rose-700', border: 'border-rose-200/60', dot: 'bg-rose-500' },
      completed: { label: 'انجام شده', bg: 'bg-blue-50/70', text: 'text-blue-700', border: 'border-blue-200/60', dot: 'bg-blue-500' },
    };
    return config[status] || { label: status, bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-slate-50/50">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-teal-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-teal-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-sm font-medium text-slate-500 tracking-wide animate-pulse">در حال دریافت لیست نوبت‌ها...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-24 bg-white p-8 rounded-3xl shadow-xl shadow-slate-100/50 text-center border border-slate-100">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-rose-500">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">خطا در برقراری ارتباط</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">متاسفانه نتوانستیم اطلاعات رزروها را دریافت کنیم. لطفاً اتصال اینترنت خود را بررسی کنید.</p>
        <button 
          onClick={() => refetch()} 
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98]"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 bg-slate-50/30 min-h-screen font-sans" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-slate-200/60 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">رزروهای اخیر</h1>
          <p className="text-slate-500 text-sm mt-1.5 font-medium">مجموعاً <span className="text-teal-600 font-bold mx-0.5">{total}</span> نوبت در سیستم ثبت شده است</p>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <p className="text-lg font-bold text-slate-700">هیچ رزوری یافت نشد</p>
          <p className="text-slate-400 text-sm mt-1">در حال حاضر نوبت فعالی برای نمایش وجود ندارد.</p>
        </div>
      ) : (
        // Grid Layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reservations.map((res) => {
            const status = getStatusInfo(res.status);
            const duration = getDuration(res.utcStartedAt, res.utcEndedAt);

            const patient = res.reservedBy || {};
            const profile = patient.profile || {};
            const fullName = profile.fullName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'بیمار بدون نام';
            const avatar = profile.avatar;
            const phone = patient.phoneNumber;

            return (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group justify-between"
              >
                <div className="p-6">
                  {/* Card Top: Status & Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text} border ${status.border}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                      {status.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded">ID: #{res.id?.toString().slice(-4)}</span>
                  </div>

                  {/* Patient Profile */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 shadow-inner">
                      {avatar ? (
                        <img src={avatar} alt={fullName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-teal-50 text-teal-600 font-bold text-lg">
                          {fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-lg truncate group-hover:text-teal-600 transition-colors">{fullName}</h3>
                      {phone && (
                        <p className="text-slate-400 text-xs mt-1 font-mono flex items-center gap-1.5" dir="ltr">
                          <span>{phone}</span>
                          <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.454-5.148-3.777-6.596-6.6a1.31 1.31 0 01.417-1.173l1.293-.97a1.31 1.31 0 00.417-1.174V2.25a2.25 2.25 0 00-2.25-2.25H2.25z" />
                          </svg>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Appointment Details Inner Box */}
                  <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 space-y-3.5">
                    {/* Date and Time */}
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-white rounded-lg text-slate-500 shadow-sm border border-slate-100">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-slate-800">{toShamsi(res.localDateStartedAt)}</p>
                        <p className="text-slate-500 text-xs mt-0.5 font-mono" dir="ltr">
                          {res.localTimeStartedAt} - {res.localTimeEndedAt}
                        </p>
                      </div>
                    </div>

                    {/* Duration */}
                    {duration && (
                      <div className="flex items-center gap-3 pt-2.5 border-t border-slate-200/50 text-teal-700">
                        <div className="p-1.5 bg-teal-50 rounded-lg text-teal-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6M12 12l2 2m4-2a8 8 0 11-16 0 8 8 0 0116 0z" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold">مدت زمان جلسه: {duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="h-1 w-full bg-gradient-to-l from-teal-500/0 via-teal-500/0 to-teal-500/0 group-hover:from-teal-500 group-hover:to-emerald-400 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsUser;