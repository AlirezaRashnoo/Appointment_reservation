import Button from '@/component/Button';
import React, { useState, useEffect } from 'react';
import { FaEye, FaTrashAlt, FaSearch, FaSyncAlt } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
 
const statusLabels = {
  active: 'فعال',
  pending: 'در انتظار',
  inactive: 'غیرفعال',
};
 
const statusStyles = {
  active: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  inactive: 'bg-red-100 text-red-500 border border-red-200',
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
 
function Avatar({ phone }) {
  const colors = [
    'bg-violet-100 text-violet-600',
    'bg-sky-100 text-sky-600',
    'bg-teal-100 text-teal-600',
    'bg-rose-100 text-rose-600',
    'bg-orange-100 text-orange-600',
  ];
  const idx = (phone?.charCodeAt(4) ?? 0) % colors.length;
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${colors[idx]}`}>
      {phone?.slice(-2) ?? '??'}
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
 
  // const handleView = (id) => {
  //   navigate(`/user/patient/${id}`)
  // };
 
  const counts = {
    all: patients.length,
    active: patients.filter(u => u.status === 'active').length,
    pending: patients.filter(u => u.status === 'pending').length,
    inactive: patients.filter(u => u.status === 'inactive').length,
  };
 
  if (error) return (
    <div className="p-8 bg-base-200 min-h-screen flex items-center justify-center">
      <div className="bg-base-100 rounded-2xl shadow p-8 text-center max-w-sm w-full">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-base-content/70 mb-4 text-sm">{error}</p>
        <button className="btn btn-primary btn-sm" onClick={fetchPatients}>تلاش مجدد</button>
      </div>
    </div>
  );
 
  return (
    <div className="p-6 bg-base-200 min-h-screen" dir="rtl">
 
      {/* هدر */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-base-content">لیست بیماران</h1>
          <p className="text-sm text-base-content/40 mt-0.5">
            {loading ? 'در حال بارگذاری...' : `${patients.length} بیمار ثبت‌شده`}
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-base-100 shadow-sm text-sm text-base-content/60 hover:text-primary hover:shadow transition-all"
          onClick={fetchPatients}
          disabled={loading}
        >
          <FaSyncAlt size={12} className={loading ? 'animate-spin' : ''} />
          بروزرسانی
        </button>
      </div>
 
      {/* فیلتر وضعیت */}
      {!loading && (
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { key: 'all', label: 'همه', color: 'border-base-300 bg-base-100' },
            { key: 'active', label: 'فعال', color: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
            { key: 'pending', label: 'در انتظار', color: 'border-amber-200 bg-amber-50 text-amber-700' },
            { key: 'inactive', label: 'غیرفعال', color: 'border-red-200 bg-red-50 text-red-500' },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-4 py-2 rounded-xl border text-xs font-medium transition-all ${color} ${
                statusFilter === key ? 'ring-2 ring-primary ring-offset-1 shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {label}
              <span className="mr-1.5 opacity-60">({counts[key]})</span>
            </button>
          ))}
        </div>
      )}
 
      {/* جستجو */}
      <div className="relative mb-5 max-w-sm">
        <FaSearch size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/30" />
        <input
          type="text"
          placeholder="جستجو با شماره موبایل..."
          className="input input-bordered w-full text-sm pr-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
          dir="ltr"
        />
      </div>
 
      {/* جدول */}
      <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="loading loading-spinner loading-md text-primary"></span>
            <p className="text-xs text-base-content/40">در حال دریافت اطلاعات...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table text-sm w-full">
              <thead>
                <tr className="bg-base-200/50 text-base-content/50 text-xs">
                  <th className="font-semibold py-3.5 px-5">بیمار</th>
                  <th className="font-semibold py-3.5 px-5">وضعیت</th>
                  <th className="font-semibold py-3.5 px-5">تاریخ ثبت‌نام</th>
                  <th className="font-semibold py-3.5 px-5">آخرین تغییر</th>
                  <th className="font-semibold py-3.5 px-5"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-t border-base-200 hover:bg-base-50/80 transition-colors group">
 
                    {/* بیمار */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <Avatar phone={user.phoneNumber} />
                        <div>
                          <p className="font-mono font-semibold text-base-content tracking-wider">
                            {user.phoneNumber}
                          </p>
                          <p className="text-xs text-base-content/30 font-mono mt-0.5">
                            {user.id?.substring(0, 8)}…
                          </p>
                        </div>
                      </div>
                    </td>
 
                    {/* وضعیت */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[user.status] ?? 'bg-base-300'}`}></span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[user.status] ?? 'bg-base-200 text-base-content/50'}`}>
                          {statusLabels[user.status] ?? user.status}
                        </span>
                      </div>
                    </td>
 
                    {/* تاریخ ثبت */}
                    <td className="py-3.5 px-5 text-xs text-base-content/50">
                      {formatDate(user.createdAt)}
                    </td>
 
                    {/* آخرین تغییر */}
                    <td className="py-3.5 px-5 text-xs text-base-content/50">
                      {formatDate(user.modifiedAt)}
                    </td>
 
                    {/* عملیات */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2 transition-opacity">
                        <Button to={`/admin-panel/users/patient/${user.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white"
                          // onClick={() => handleView(user.id)}
                          // title="ویرایش پروفایل"
                        >
                          <FaEye size={15} />
                          ویرایش 
                        </Button>
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-40"
                          onClick={() => handleDelete(user)}
                          disabled={deletingId === user.id}
                          title="حذف بیمار"
                        >
                          {deletingId === user.id
                            ? <span className="loading loading-spinner loading-xs"></span>
                            : <FaTrashAlt size={10} />}
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
 
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="text-center py-16">
                      <div className="text-4xl mb-3">👤</div>
                      <p className="text-base-content/40 text-sm">بیماری یافت نشد</p>
                      {search && (
                        <button
                          className="mt-3 text-xs text-primary hover:underline"
                          onClick={() => setSearch('')}
                        >
                          پاک کردن جستجو
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
 
      {/* فوتر تعداد */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-base-content/30 mt-3 text-left">
          نمایش {filtered.length} از {patients.length} بیمار
        </p>
      )}
    </div>
  );
}