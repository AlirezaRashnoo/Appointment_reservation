import Button from '@/component/Button';
import React, { useState, useEffect, useMemo } from 'react';
import { FaTrashAlt, FaEye, FaSpinner, FaTooth, FaStar, FaSearch } from 'react-icons/fa';

const statusLabels = {
  active: 'فعال',
  pending: 'در انتظار تایید',
  inactive: 'غیرفعال',
};

const statusStyles = {
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  inactive: 'bg-red-50 text-red-600 ring-1 ring-inset ring-red-200',
};

function Avatar({ user, sizeClass = 'w-10 h-10', textClass = 'text-sm' }) {
  const [imgError, setImgError] = useState(false);
  const hasAvatar = user.avatar && !imgError;

  if (hasAvatar) {
    return (
      <img
        src={user.avatar}
        alt={user.firstName ?? 'دندان‌پزشک'}
        onError={() => setImgError(true)}
        className={`${sizeClass} rounded-full object-cover ring-1 ring-gray-200 shrink-0`}
      />
    );
  }

  return (
    <div className={`${sizeClass} rounded-full bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200 flex items-center justify-center font-bold ${textClass} shrink-0`}>
      {user.firstName?.charAt(0) ?? '؟'}
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status] ?? 'bg-gray-100 text-gray-500 ring-1 ring-inset ring-gray-200'}`}>
      {statusLabels[status] ?? status}
    </span>
  );
}

function Rating({ user }) {
  if (!user.averageRating) return <span className="text-gray-300">—</span>;
  return (
    <div className="flex items-center gap-1 text-amber-500">
      <FaStar className="text-xs" />
      <span className="font-semibold text-gray-900">{user.averageRating}</span>
      <span className="text-xs text-gray-400">({user.ratingCount})</span>
    </div>
  );
}

export default function DentistList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dentist-reyn.onrender.com/api/v1/dentist/admin', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
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

  useEffect(() => { fetchUsers(); }, []);

  const counts = {
    all: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  };

  const filterPills = [
    { key: 'all', label: 'همه', activeClass: 'bg-gray-900 text-white ring-gray-900' },
    { key: 'active', label: 'فعال', activeClass: 'bg-emerald-600 text-white ring-emerald-600' },
    { key: 'pending', label: 'در انتظار', activeClass: 'bg-amber-500 text-white ring-amber-500' },
    { key: 'inactive', label: 'غیرفعال', activeClass: 'bg-red-500 text-white ring-red-500' },
  ];

  const filteredUsers = useMemo(() => {
    let list = [...users];

    if (statusFilter !== 'all') {
      list = list.filter(u => u.status === statusFilter);
    }

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter(u => {
        const fullName = `${u.firstName ?? ''} ${u.lastName ?? ''}`.toLowerCase();
        const specialization = (u.specialization ?? '').toLowerCase();
        return fullName.includes(term) || specialization.includes(term);
      });
    }

    return list;
  }, [users, search, statusFilter]);

  if (error) return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen flex items-center justify-center" dir="rtl">
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-8 text-center max-w-sm w-full">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-gray-500 mb-5 text-sm">{error}</p>
        <button
          className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition"
          onClick={fetchUsers}
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">دندان‌پزشکان</h1>
        <p className="text-sm text-gray-400 mt-1">
          {loading ? 'در حال بارگذاری...' : `${users.length} دندان‌پزشک ثبت‌شده`}
        </p>
      </div>

      {!loading && users.length > 0 && (
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

      {!loading && users.length > 0 && (
        <div className="relative mb-5 max-w-sm">
          <FaSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
          <input
            type="text"
            placeholder="جستجو با نام یا تخصص..."
            className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pr-9 pl-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      {loading && (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 flex flex-col items-center justify-center py-20 gap-3">
          <FaSpinner className="animate-spin text-2xl text-gray-400" />
          <p className="text-xs text-gray-400">در حال دریافت اطلاعات...</p>
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 py-16 px-4 text-center">
          <FaTooth className="mx-auto text-4xl text-gray-200 mb-3" />
          <p className="text-gray-400 text-sm">
            {users.length === 0 ? 'هیچ دندان‌پزشکی یافت نشد' : 'نتیجه‌ای با فیلترهای انتخاب شده یافت نشد'}
          </p>
          {(search || statusFilter !== 'all') && users.length > 0 && (
            <button
              className="mt-3 text-xs text-gray-900 font-medium hover:underline"
              onClick={() => { setSearch(''); setStatusFilter('all'); }}
            >
              پاک کردن فیلترها
            </button>
          )}
        </div>
      )}

      {!loading && filteredUsers.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs">
                  <th className="text-right font-medium py-4 px-5">دندان‌پزشک</th>
                  <th className="text-right font-medium py-4 px-5">تخصص</th>
                  <th className="text-right font-medium py-4 px-5">سابقه</th>
                  <th className="text-right font-medium py-4 px-5">امتیاز</th>
                  <th className="text-right font-medium py-4 px-5">وضعیت</th>
                  <th className="text-right font-medium py-4 px-5">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50 transition-colors">

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <Avatar user={user} />
                        <div>
                          <p className="font-semibold text-gray-900 leading-tight">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : 'بدون نام'}
                          </p>
                          <p className="text-xs text-gray-300 font-mono mt-0.5">
                            {user.userId?.substring(0, 8)}…
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-gray-600">
                      {user.specialization ?? <span className="text-gray-300">—</span>}
                    </td>

                    <td className="py-4 px-5 text-gray-600">
                      {user.yearsOfExperience != null
                        ? `${user.yearsOfExperience} سال`
                        : <span className="text-gray-300">—</span>}
                    </td>

                    <td className="py-4 px-5">
                      <Rating user={user} />
                    </td>

                    <td className="py-4 px-5">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <Button
                          to={`/admin-panel/users/dentist/${user.userId}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition"
                        >
                          <FaEye className="text-xs" />
                          ویرایش
                        </Button>
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                          onClick={() => handleDeleteUser(user)}
                          disabled={deletingId === user.userId}
                          title="حذف"
                        >
                          {deletingId === user.userId ? (
                            <FaSpinner className="animate-spin text-xs" />
                          ) : (
                            <FaTrashAlt className="text-xs" />
                          )}
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

      {!loading && filteredUsers.length > 0 && (
        <div className="md:hidden space-y-3">
          {filteredUsers.map((user) => (
            <div key={user.userId} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Avatar user={user} sizeClass="w-12 h-12" textClass="text-base" />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 leading-tight truncate">
                    {user.firstName && user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : 'بدون نام'}
                  </p>
                  <p className="text-xs text-gray-300 font-mono mt-0.5">
                    {user.userId?.substring(0, 8)}…
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <StatusBadge status={user.status} />
                <Rating user={user} />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <div>
                  <p className="text-gray-300 mb-0.5">تخصص</p>
                  <p>{user.specialization ?? '—'}</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-0.5">سابقه</p>
                  <p>{user.yearsOfExperience != null ? `${user.yearsOfExperience} سال` : '—'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <Button
                  to={`/admin-panel/users/dentist/${user.userId}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition"
                >
                  <FaEye className="text-xs" />
                  ویرایش
                </Button>
                <button
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  onClick={() => handleDeleteUser(user)}
                  disabled={deletingId === user.userId}
                >
                  {deletingId === user.userId ? (
                    <FaSpinner className="animate-spin text-xs" />
                  ) : (
                    <FaTrashAlt className="text-xs" />
                  )}
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredUsers.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-left">
          نمایش {filteredUsers.length} از {users.length} دندان‌پزشک
        </p>
      )}
    </div>
  );
}