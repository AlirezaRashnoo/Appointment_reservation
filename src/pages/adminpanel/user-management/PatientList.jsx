import Button from '@/component/Button';
import React, { useState, useEffect } from 'react';
import { FaEye, FaTrashAlt, FaSearch, FaSpinner, FaUserInjured } from 'react-icons/fa';

const statusLabels = {
  active: 'فعال',
  pending: 'در انتظار',
  inactive: 'غیرفعال',
};

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  inactive: 'bg-red-50 text-red-600 ring-1 ring-inset ring-red-200',
};

const statusDot = {
  active: 'bg-emerald-500',
  pending: 'bg-amber-400',
  inactive: 'bg-red-400',
};

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fa-IR', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

function Avatar({ phone, sizeClass = 'w-10 h-10', textClass = 'text-sm' }) {
  const colors = [
    'bg-violet-50 text-violet-600 ring-1 ring-inset ring-violet-200',
    'bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-200',
    'bg-teal-50 text-teal-600 ring-1 ring-inset ring-teal-200',
    'bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-200',
    'bg-orange-50 text-orange-600 ring-1 ring-inset ring-orange-200',
  ];
  const idx = (phone?.charCodeAt(4) ?? 0) % colors.length;
  return (
    <div className={`${sizeClass} rounded-full flex items-center justify-center ${textClass} font-bold shrink-0 ${colors[idx]}`}>
      {phone?.slice(-2) ?? '??'}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className={`w-1.5 h-1.5 rounded-full ${statusDot[status] ?? 'bg-gray-300'}`} />
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status] ?? 'bg-gray-100 text-gray-500 ring-1 ring-inset ring-gray-200'}`}>
        {statusLabels[status] ?? status}
      </span>
    </div>
  );
}

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://dentist-reyn.onrender.com/api/v1/users?page=1&limit=200&orderBy=createdAt',
        { credentials: 'include', headers: { 'Content-Type': 'application/json' } }
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const all = data?.data?.users ?? [];
      const onlyPatients = all.filter(u => u.role === 'patient');
      setPatients(onlyPatients);
      setFiltered(onlyPatients);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  useEffect(() => {
    let list = [...patients];
    if (statusFilter !== 'all') list = list.filter(u => u.status === statusFilter);
    if (search.trim()) list = list.filter(u => u.phoneNumber.includes(search.trim()));
    setFiltered(list);
  }, [search, statusFilter, patients]);

  const handleDelete = async (user) => {
    if (!window.confirm(`آیا از حذف بیمار "${user.phoneNumber}" مطمئن هستید؟`)) return;
    setDeletingId(user.id);
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setPatients(prev => prev.filter(u => u.id !== user.id));
    } catch (err) {
      alert(`خطا در حذف: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  const counts = {
    all: patients.length,
    active: patients.filter(u => u.status === 'active').length,
    pending: patients.filter(u => u.status === 'pending').length,
    inactive: patients.filter(u => u.status === 'inactive').length,
  };

  const filterPills = [
    { key: 'all', label: 'همه', activeClass: 'bg-gray-900 text-white ring-gray-900' },
    { key: 'active', label: 'فعال', activeClass: 'bg-emerald-600 text-white ring-emerald-600' },
    { key: 'pending', label: 'در انتظار', activeClass: 'bg-amber-500 text-white ring-amber-500' },
    { key: 'inactive', label: 'غیرفعال', activeClass: 'bg-red-500 text-white ring-red-500' },
  ];

  if (error) return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-8 text-center max-w-sm w-full">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-gray-500 mb-5 text-sm">{error}</p>
        <button
          className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
          onClick={fetchPatients}
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen" dir="rtl">

      {/* هدر */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">لیست بیماران</h1>
        <p className="text-sm text-gray-400 mt-1">
          {loading ? 'در حال بارگذاری...' : `${patients.length} بیمار ثبت‌شده`}
        </p>
      </div>

      {!loading && (
        <div className="flex flex-wrap gap-2 mb-5">
          {filterPills.map(({ key, label, activeClass }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-4 py-2 rounded-xl text-xs font-medium ring-1 ring-inset transition-all ${
                statusFilter === key
                  ? activeClass
                  : 'bg-white text-gray-500 ring-gray-200 hover:ring-gray-300'
              }`}
            >
              {label}
              <span className={`mr-1.5 ${statusFilter === key ? 'opacity-80' : 'opacity-50'}`}>
                ({counts[key]})
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="relative mb-5 max-w-sm">
        <FaSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
        <input
          type="text"
          placeholder="جستجو با شماره موبایل..."
          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pr-9 pl-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition"
          value={search}
          onChange={e => setSearch(e.target.value)}
          dir="ltr"
        />
      </div>

      {loading && (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 flex flex-col items-center justify-center py-20 gap-3">
          <FaSpinner className="animate-spin text-2xl text-gray-400" />
          <p className="text-xs text-gray-400">در حال دریافت اطلاعات...</p>
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 py-16 px-4 text-center">
          <FaUserInjured className="mx-auto text-4xl text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">بیماری یافت نشد</p>
          {search && (
            <button
              className="mt-3 text-xs text-gray-900 font-medium hover:underline"
              onClick={() => setSearch('')}
            >
              پاک کردن جستجو
            </button>
          )}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs">
                  <th className="text-right font-semibold py-3.5 px-5">بیمار</th>
                  <th className="text-right font-semibold py-3.5 px-5">وضعیت</th>
                  <th className="text-right font-semibold py-3.5 px-5">تاریخ ثبت‌نام</th>
                  <th className="text-right font-semibold py-3.5 px-5">آخرین تغییر</th>
                  <th className="text-right font-semibold py-3.5 px-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">

                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <Avatar phone={user.phoneNumber} />
                        <div>
                          <p className="font-mono font-semibold text-gray-900 tracking-wider">
                            {user.phoneNumber}
                          </p>
                          <p className="text-xs text-gray-300 font-mono mt-0.5">
                            {user.id?.substring(0, 8)}…
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-5">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="py-3.5 px-5 text-xs text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="py-3.5 px-5 text-xs text-gray-500">
                      {formatDate(user.modifiedAt)}
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <Button
                          to={`/admin-panel/users/patient/${user.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition"
                        >
                          <FaEye className="text-xs" />
                          ویرایش
                        </Button>
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                          onClick={() => handleDelete(user)}
                          disabled={deletingId === user.id}
                          title="حذف بیمار"
                        >
                          {deletingId === user.id
                            ? <FaSpinner className="animate-spin text-xs" />
                            : <FaTrashAlt className="text-xs" />}
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="md:hidden space-y-3">
          {filtered.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Avatar phone={user.phoneNumber} sizeClass="w-11 h-11" />
                <div className="min-w-0">
                  <p className="font-mono font-semibold text-gray-900 tracking-wider truncate">
                    {user.phoneNumber}
                  </p>
                  <p className="text-xs text-gray-300 font-mono mt-0.5">
                    {user.id?.substring(0, 8)}…
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <StatusBadge status={user.status} />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <div>
                  <p className="text-gray-300 mb-0.5">تاریخ ثبت‌نام</p>
                  <p>{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-0.5">آخرین تغییر</p>
                  <p>{formatDate(user.modifiedAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <Button
                  to={`/admin-panel/users/patient/${user.id}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition"
                >
                  <FaEye className="text-xs" />
                  ویرایش
                </Button>
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(user)}
                  disabled={deletingId === user.id}
                >
                  {deletingId === user.id
                    ? <FaSpinner className="animate-spin text-xs" />
                    : <FaTrashAlt className="text-xs" />}
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-left">
          نمایش {filtered.length} از {patients.length} بیمار
        </p>
      )}
    </div>
  );
}