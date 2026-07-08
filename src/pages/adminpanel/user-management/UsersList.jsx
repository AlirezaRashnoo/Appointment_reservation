import React, { useState, useMemo } from 'react';
import { FaTrashAlt, FaUserCircle, FaSearch, FaFilter, FaRedoAlt, FaSpinner } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from "js-cookie";
import apiService from '@/features/api';

const roleLabels = {
  admin: 'ادمین',
  dentist: 'دندان‌پزشک',
  patient: 'بیمار',
};

const roleClasses = {
  admin: 'bg-red-50 text-red-600 ring-1 ring-inset ring-red-200',
  dentist: 'bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-200',
  patient: 'bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200',
};

const roleIconColor = {
  admin: 'text-red-400',
  dentist: 'text-blue-400',
  patient: 'text-emerald-400',
};

const statusLabels = {
  active: 'فعال',
  pending: 'در انتظار تایید',
  inactive: 'غیرفعال',
};

const statusClasses = {
  active: 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  pending: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200',
  inactive: 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200',
};

const formatDate = (dateString) => {
  if (!dateString) return 'ثبت نشده';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  } catch (error) {
    return 'تاریخ نامعتبر';
  }
};

const fetchUsers = async () => {
  try {
    const response = await apiService.get('/users?page=1&limit=100&orderBy=createdAt');

    if (response.data && response.data.data && response.data.data.users) {
      console.log(response.data);
      
      return response.data.data.users;
    }

    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.response?.data?.message || 'خطا در دریافت لیست کاربران');
  }
};

const deleteUser = async (userId) => {
  try {
    const csrfToken = Cookies.get("csrf_token");

    const response = await apiService.delete(`/users/${userId}`, {
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(
      error.response?.data?.message || "خطا در حذف کاربر"
    );
  }
};

function RoleBadge({ role }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${roleClasses[role] || 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200'}`}>
      {roleLabels[role] || 'نامشخص'}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200'}`}>
      {statusLabels[status] || status}
    </span>
  );
}

function StatCard({ label, value, accentClass }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-2.5 h-10 rounded-full ${accentClass}`} />
    </div>
  );
}

export default function UsersList() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleDeleteUser = async (user) => {
    const confirmed = window.confirm(
      `آیا از حذف کاربر با شماره "${user.phoneNumber}" مطمئن هستید؟`
    );

    if (!confirmed) return;

    try {
      await deleteUserMutation.mutateAsync(user.id);
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!users || users.length === 0) return [];

    return users.filter((user) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch = searchTerm === '' ||
        (user.phoneNumber && user.phoneNumber.toLowerCase().includes(searchTerm)) ||
        (user.id && user.id.toLowerCase().includes(searchTerm));

      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, filterRole, filterStatus]);

  const stats = useMemo(() => {
    const active = users.filter((u) => u.status === 'active').length;
    const pending = users.filter((u) => u.status === 'pending').length;
    const inactive = users.filter((u) => u.status === 'inactive').length;
    return { total: users.length, active, pending, inactive };
  }, [users]);

  const hasActiveFilters = search !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const resetFilters = () => {
    setSearch('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  const selectClasses = "w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  // نمایش loading
  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li><a href="/admin-panel" className="hover:text-gray-700">پنل مدیریت</a></li>
            <li>/</li>
            <li className="text-gray-700">کاربران</li>
          </ol>
        </nav>
        <div className="flex flex-col justify-center items-center h-64 gap-3">
          <FaSpinner className="animate-spin text-3xl text-blue-500" />
          <p className="text-sm text-gray-500">در حال بارگذاری کاربران...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
        <nav className="text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li><a href="/admin-panel" className="hover:text-gray-700">پنل مدیریت</a></li>
            <li>/</li>
            <li className="text-gray-700">کاربران</li>
          </ol>
        </nav>
        <div className="rounded-2xl bg-red-50 ring-1 ring-inset ring-red-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-sm text-red-700">خطا در بارگذاری کاربران: {error.message}</span>
          <button
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition shrink-0"
            onClick={() => refetch()}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen" dir="rtl">
      <nav className="text-sm text-gray-500">
        <ol className="flex items-center gap-2">
          <li><a href="/admin-panel" className="hover:text-gray-700">پنل مدیریت</a></li>
          <li>/</li>
          <li className="text-gray-700">کاربران</li>
        </ol>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">مدیریت کاربران</h1>
          <p className="text-sm text-gray-500 mt-1">
            نمایش {filteredUsers.length} از {users.length} کاربر
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="کل کاربران" value={stats.total} accentClass="bg-blue-500" />
        <StatCard label="فعال" value={stats.active} accentClass="bg-emerald-500" />
        <StatCard label="در انتظار تایید" value={stats.pending} accentClass="bg-amber-500" />
        <StatCard label="غیرفعال" value={stats.inactive} accentClass="bg-gray-400" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3 text-gray-500">
          <FaFilter className="text-xs" />
          <span className="text-sm font-medium">فیلترها</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative md:col-span-2">
            <FaSearch className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="جستجو بر اساس شماره تلفن یا شناسه..."
              className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pr-9 pl-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={selectClasses}
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">همه نقش‌ها</option>
            <option value="patient">بیمار</option>
            <option value="dentist">دندان‌پزشک</option>
            <option value="admin">ادمین</option>
          </select>
          <select
            className={selectClasses}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="pending">در انتظار تایید</option>
            <option value="inactive">غیرفعال</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 mt-3 text-sm text-gray-500 hover:text-gray-800 transition"
          >
            <FaRedoAlt className="text-xs" />
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 py-16 px-4 text-center">
          <FaUserCircle className="mx-auto text-4xl text-gray-200 mb-3" />
          <p className="text-gray-500">
            {users.length === 0 ? 'هیچ کاربری یافت نشد.' : 'نتیجه‌ای با فیلترهای انتخاب شده یافت نشد.'}
          </p>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="mt-3 text-sm text-blue-600 hover:text-blue-800 transition">
              پاک کردن فیلترها
            </button>
          )}
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="hidden md:block bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-right font-medium py-3 px-4">کاربر</th>
                  <th className="text-right font-medium py-3 px-4">شناسه</th>
                  <th className="text-right font-medium py-3 px-4">شماره تلفن</th>
                  <th className="text-right font-medium py-3 px-4">نقش</th>
                  <th className="text-right font-medium py-3 px-4">وضعیت</th>
                  <th className="text-right font-medium py-3 px-4">تاریخ ایجاد</th>
                  <th className="text-right font-medium py-3 px-4">آخرین تغییر</th>
                  <th className="text-right font-medium py-3 px-4">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <FaUserCircle className={`text-2xl ${roleIconColor[user.role] || 'text-gray-300'} size-8`} />
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-500">
                      {user.id.substring(0, 8)}...
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900" dir="ltr">{user.phoneNumber}</td>
                    <td className="py-3 px-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="py-3 px-4 text-gray-500">{formatDate(user.createdAt)}</td>
                    <td className="py-3 px-4 text-gray-500">{formatDate(user.modifiedAt)}</td>
                    <td className="py-3 px-4">
                      <button
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleDeleteUser(user)}
                        disabled={deleteUserMutation.isPending}
                      >
                        {deleteUserMutation.isPending ? (
                          <FaSpinner className="animate-spin text-xs" />
                        ) : (
                          <FaTrashAlt className="text-xs" />
                        )}
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="md:hidden space-y-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FaUserCircle className={`text-3xl shrink-0 ${roleIconColor[user.role] || 'text-gray-300'}`} />
                  <div>
                    <p className="font-bold text-gray-900" dir="ltr">{user.phoneNumber}</p>
                    <p className="font-mono text-xs text-gray-400 mt-0.5">
                      {user.id.substring(0, 8)}...
                    </p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 w-8 h-8 text-red-600 hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  onClick={() => handleDeleteUser(user)}
                  disabled={deleteUserMutation.isPending}
                >
                  {deleteUserMutation.isPending ? (
                    <FaSpinner className="animate-spin text-xs" />
                  ) : (
                    <FaTrashAlt className="text-xs" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <RoleBadge role={user.role} />
                <StatusBadge status={user.status} />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                <div>
                  <p className="text-gray-400 mb-0.5">تاریخ ایجاد</p>
                  <p>{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-0.5">آخرین تغییر</p>
                  <p>{formatDate(user.modifiedAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}




