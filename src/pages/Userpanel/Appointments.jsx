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

const toShamsi = (gregorianDateStr) => {
  if (!gregorianDateStr) return '-';
  const date = new Date(gregorianDateStr);
  const jDate = toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  return `${jDate.jy}/${String(jDate.jm).padStart(2, '0')}/${String(jDate.jd).padStart(2, '0')}`;
};

const getDuration = (start, end) => {
  if (!start || !end) return '';
  const s = start.split(':').map(Number);
  const e = end.split(':').map(Number);
  const minutes = (e[0] - s[0]) * 60 + (e[1] - s[1]);
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

  const getStatusInfo = (status) => {
    const config = {
      pending: { label: 'در انتظار', color: 'yellow', icon: '⏳' },
      confirmed: { label: 'تایید شده', color: 'emerald', icon: '✅' },
      cancelled: { label: 'لغو شده', color: 'rose', icon: '❌' },
      completed: { label: 'تمام شده', color: 'blue', icon: '🎉' },
    };
    return config[status] || { label: status, color: 'gray', icon: '•' };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-teal-600"></div>
        <p className="mt-4 text-gray-500">در حال بارگذاری رزروها...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-3xl shadow text-center border border-red-100">
        <p className="text-red-600 text-xl mb-4">⚠️ خطا در دریافت اطلاعات</p>
        <button 
          onClick={() => refetch()} 
          className="px-8 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">رزروهای اخیر</h1>
          <p className="text-gray-600 mt-2 text-lg">مجموع {total} نوبت ثبت شده</p>
        </div>
        {/* <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl transition-all active:scale-95 shadow-lg shadow-teal-200"
        >
          🔄 به‌روزرسانی
        </button> */}
      </div>

      {reservations.length === 0 ? (
        <div className="bg-white rounded-3xl p-20 text-center border border-gray-100">
          <div className="text-7xl mb-6">📅</div>
          <p className="text-2xl font-medium text-gray-700">هیچ رزوری ثبت نشده است</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reservations.map((res) => {
            const statusInfo = getStatusInfo(res.status);
            const duration = getDuration(res.localTimeStartedAt, res.localTimeEndedAt);

            const patient = res.reservedFor?.user || {};
            const profile = patient.profile || {};
            const fullName = profile.fullName || 
                           `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'بیمار';
            const avatar = profile.avatar;
            const phone = patient.phoneNumber;

            return (
              <div
                key={res.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Status */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl text-sm font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-700 border border-${statusInfo.color}-200`}>
                      <span>{statusInfo.icon}</span>
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md flex-shrink-0 bg-gray-100">
                      {avatar ? (
                        <img 
                          src={avatar} 
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl bg-teal-100 text-teal-600">
                          👤
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-2xl text-gray-900 truncate">{fullName}</p>
                      {phone && (
                        <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                          📞 {phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">📅</span>
                      <div>
                        <p className="font-medium text-lg text-gray-900">{toShamsi(res.utcStartedAt)}</p>
                        <p className="text-gray-600">
                          {res.localTimeStartedAt} — {res.localTimeEndedAt}
                        </p>
                      </div>
                    </div>

                    {duration && (
                      <div className="flex items-center gap-3 text-teal-700">
                        <span className="text-xl">⏱️</span>
                        <span className="font-medium">مدت زمان: {duration}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                {/* <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-xs text-gray-500 flex justify-between">
                  <span>شناسه: {res.id.slice(0, 8)}...</span>
                  <span>ثبت توسط: {res.reservedBy?.id?.slice(0, 8)}...</span>
                </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AppointmentsUser;