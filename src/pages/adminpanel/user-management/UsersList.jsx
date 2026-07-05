import React, { useState, useMemo } from 'react';
import { FaEye, FaTrashAlt, FaUser } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '@/component/Button';
import { FaRegEdit } from "react-icons/fa";
import Cookies from "js-cookie";
// سرویس API برای ارتباط با بک‌اند
import apiService from '@/features/api';

const roleLabels = {
  admin: 'ادمین',
  dentist: 'دندان‌پزشک',
  patient: 'بیمار',
};

const roleColors = {
  admin: 'text-red-500',
  dentist: 'text-blue-500',
  patient: 'text-green-500',
};

const statusLabels = {
  active: 'فعال',
  pending: 'در انتظار تایید',
  inactive: 'غیرفعال',
};

const statusColors = {
  active: 'badge-success',
  pending: 'badge-warning',
  inactive: 'badge-error',
};

// تابع کمکی برای فرمت تاریخ
const formatDate = (dateString) => {
  if (!dateString) return 'ثبت نشده';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR');
  } catch (error) {
    return 'تاریخ نامعتبر';
  }
};

// تابع fetch داده‌ها از API واقعی
const fetchUsers = async () => {
  try {
    const response = await apiService.get('/users?page=1&limit=100&orderBy=createdAt');
    
    // بررسی ساختار پاسخ API
    if (response.data && response.data.data && response.data.data.users) {
      return response.data.data.users;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.response?.data?.message || 'خطا در دریافت لیست کاربران');
  }
};

// تابع حذف کاربر از طریق API
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

export default function UsersList() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const queryClient = useQueryClient();

  // استفاده از React Query برای مدیریت state و cache
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
  


  // Mutation برای حذف کاربر
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate and refetch
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

  // فیلتر کردن کاربران با useMemo برای بهینه‌سازی
  const filteredUsers = useMemo(() => {
    if (!users || users.length === 0) return [];
    
    return users.filter((user) => {
      const searchTerm = search.toLowerCase();
      
      // جستجو در فیلدهای موجود
      const matchesSearch = searchTerm === '' || 
        (user.phoneNumber && user.phoneNumber.toLowerCase().includes(searchTerm)) ||
        (user.id && user.id.toLowerCase().includes(searchTerm));
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, filterRole, filterStatus]);

 

  // نمایش loading
  if (isLoading) {
    return (
      <div className="p-6 space-y-8 bg-base-200 min-h-screen">
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a href="/admin-panel">پنل مدیریت</a></li>
            <li>کاربران</li>
          </ul>
        </div>
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  // نمایش error
  if (isError) {
    return (
      <div className="p-6 space-y-8 bg-base-200 min-h-screen">
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a href="/admin-panel">پنل مدیریت</a></li>
            <li>کاربران</li>
          </ul>
        </div>
        <div className="alert alert-error">
          <span>خطا در بارگذاری کاربران: {error.message}</span>
          <button 
            className="btn btn-sm btn-primary"
            onClick={() => refetch()}
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-base-200 min-h-screen">
      <div className="text-sm breadcrumbs">
        <ul>
          <li><a href="/admin-panel">پنل مدیریت</a></li>
          <li>کاربران</li>
        </ul>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-base-content">مدیریت کاربران</h1>
        <p className="text-sm text-base-content/60">
          تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
        </p>
      </div>

      {/* فیلتر و جستجو */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="جستجو بر اساس شماره تلفن یا ID..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">همه نقش‌ها</option>
          <option value="patient">بیمار</option>
          <option value="dentist">دندان‌پزشک</option>
          <option value="admin">ادمین</option>
        </select>
        <select
          className="select select-bordered w-full"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">همه وضعیت‌ها</option>
          <option value="active">فعال</option>
          <option value="pending">در انتظار تایید</option>
          <option value="inactive">غیرفعال</option>
        </select>
      </div>

      {/* جدول کاربران */}
      <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
        <table className="table table-zebra text-sm">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>#</th>
              <th>شناسه</th>
              <th>شماره تلفن</th>
              <th>نقش</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>آخرین تغییر</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td className="font-mono text-xs">
                  {user.id.substring(0, 8)}...
                </td>
                <td className="font-bold" dir="ltr">{user.phoneNumber}</td>
                <td>
                  <span className={`badge ${roleColors[user.role] || 'badge-neutral'}`}>
                    {roleLabels[user.role] || 'نامشخص'}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-outline ${statusColors[user.status] || 'badge-neutral'}`}>
                    {statusLabels[user.status] || user.status}
                  </span>
                </td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.modifiedAt)}</td>
                <td>
                  <div className="flex gap-2">
                    {/* فقط دکمه حذف باقی می‌ماند */}
                    <button
                      className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600 flex items-center justify-center gap-1"
                      onClick={() => handleDeleteUser(user)}
                      disabled={deleteUserMutation.isPending}
                    >
                      {deleteUserMutation.isPending ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <FaTrashAlt className="mr-1" />
                      )}
                      حذف
                    </button>
                  </div>
                  
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-base-content/60 py-6">
                  {users.length === 0 ? 'هیچ کاربری یافت نشد.' : 'نتیجه‌ای با فیلترهای انتخاب شده یافت نشد.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}