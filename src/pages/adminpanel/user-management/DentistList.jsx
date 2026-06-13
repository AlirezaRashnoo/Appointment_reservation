import Button from '@/component/Button';
import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
 
const statusLabels = {
  active: 'فعال',
  pending: 'در انتظار تایید',
  inactive: 'غیرفعال',
};
 
const statusStyles = {
  active: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  inactive: 'bg-red-100 text-red-600 border border-red-200',
};
 
export default function DentistList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dentist-reyn.onrender.com/api/v1/dentist/admin', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      setUsers(data?.data?.dentists ?? []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const handleDeleteUser = async (user) => {
    if (!window.confirm(`آیا از حذف "${user.firstName ?? 'این کاربر'}" مطمئن هستید؟`)) return;
    setDeletingId(user.userId);
    try {
      const response = await fetch(`/api/v1/dentist/${user.userId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setUsers(prev => prev.filter(u => u.userId !== user.userId));
    } catch (err) {
      alert(`خطا در حذف: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };
 
  const handleViewUser = (userId) => {
    window.location.href = `/dentists/${userId}`;
    // اگر از React Router استفاده می‌کنی، این خط رو جایگزین کن:
    // navigate(`/dentists/${userId}`);
  };
 
  useEffect(() => { fetchUsers(); }, []);
 
  if (error) return (
    <div className="p-8 bg-base-200 min-h-screen flex items-center justify-center">
      <div className="bg-base-100 rounded-2xl shadow p-8 text-center max-w-sm w-full">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-base-content/70 mb-4">{error}</p>
        <button className="btn btn-primary btn-sm" onClick={fetchUsers}>تلاش مجدد</button>
      </div>
    </div>
  );
 
  return (
    <div className="p-6 bg-base-200 min-h-screen" dir="rtl">
 
      {/* هدر */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-base-content">دندان‌پزشکان</h1>
          <p className="text-sm text-base-content/50 mt-0.5">
            {loading ? 'در حال بارگذاری...' : `${users.length} دندان‌پزشک ثبت‌شده`}
          </p>
        </div>
      </div>
 
      {/* جدول */}
      <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="loading loading-spinner loading-md text-primary"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table text-sm w-full">
              <thead>
                <tr className="bg-base-200/60 text-base-content/60 text-xs uppercase tracking-wide">
                  <th className="font-medium py-4 px-5">دندان‌پزشک</th>
                  <th className="font-medium py-4 px-5">تخصص</th>
                  <th className="font-medium py-4 px-5">سابقه</th>
                  <th className="font-medium py-4 px-5">امتیاز</th>
                  <th className="font-medium py-4 px-5">وضعیت</th>
                  <th className="font-medium py-4 px-5 text-left">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.userId}
                    className="border-t border-base-200 hover:bg-base-50 transition-colors"
                  >
                    {/* دندان‌پزشک */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-base-200" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {user.firstName?.charAt(0) ?? '؟'}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-base-content leading-tight">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : 'بدون نام'}
                          </p>
                          <p className="text-xs text-base-content/40 font-mono mt-0.5">
                            {user.userId?.substring(0, 8)}…
                          </p>
                        </div>
                      </div>
                    </td>
 
                    {/* تخصص */}
                    <td className="py-4 px-5 text-base-content/70">
                      {user.specialization ?? <span className="text-base-content/30">—</span>}
                    </td>
 
                    {/* سابقه */}
                    <td className="py-4 px-5 text-base-content/70">
                      {user.yearsOfExperience != null
                        ? `${user.yearsOfExperience} سال`
                        : <span className="text-base-content/30">—</span>}
                    </td>
 
                    {/* امتیاز */}
                    <td className="py-4 px-5">
                      {user.averageRating ? (
                        <div className="flex items-center gap-1 text-amber-500">
                          <span>⭐</span>
                          <span className="font-semibold text-base-content">{user.averageRating}</span>
                          <span className="text-xs text-base-content/40">({user.ratingCount})</span>
                        </div>
                      ) : (
                        <span className="text-base-content/30">—</span>
                      )}
                    </td>
 
                    {/* وضعیت */}
                    <td className="py-4 px-5">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[user.status] ?? 'bg-base-200 text-base-content/50'}`}>
                        {statusLabels[user.status] ?? user.status}
                      </span>
                    </td>
 
                    {/* عملیات */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <Button to={`/admin-panel/users/dentist/${user.userId}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                          // onClick={() => handleViewUser(user.userId)}
                          // title="مشاهده پروفایل"
                        >
                          <FaEye size={12} />
                          ویرایش
                        </Button>
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-40"
                          onClick={() => handleDeleteUser(user)}
                          disabled={deletingId === user.userId}
                          title="حذف"
                        >
                          {deletingId === user.userId ? (
                            <span className="loading loading-spinner loading-xs"></span>
                          ) : (
                            <FaTrashAlt size={11} />
                          )}
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
 
                {users.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="text-center py-14">
                      <div className="text-3xl mb-2">🦷</div>
                      <p className="text-base-content/40 text-sm">هیچ دندان‌پزشکی یافت نشد</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}