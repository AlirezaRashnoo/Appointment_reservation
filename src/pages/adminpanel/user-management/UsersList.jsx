import React, { useState, useMemo } from 'react';
import { FaEye, FaTrashAlt, FaUser } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import supabase from '@/api/supabase';
import Button from '@/component/Button';
import { FaRegEdit } from "react-icons/fa";

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

// تابع fetch داده‌ها
const fetchUsers = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select('*')
    .order('created_at', { ascending: false });
  // console.log(data);
  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const queryClient = useQueryClient();

  // استفاده از React Query برای مدیریت state و cache
  const {
    data: users = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Mutation برای حذف کاربر
  const deleteUserMutation = useMutation({
    mutationFn: async (userId) => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // فیلتر کردن کاربران با useMemo برای بهینه‌سازی
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    
    return users.filter((user) => {
      const searchTerm = search.toLowerCase();
      const matchesSearch = 
        user.full_name?.toLowerCase().includes(searchTerm) ||
        user.phone?.includes(search);
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      
      return matchesSearch && matchesRole;
    });
  }, [users, search, filterRole]);

  const handleDeleteUser = async (user) => {
    if (window.confirm(`آیا از حذف کاربر "${user.name}" مطمئن هستید؟`)) {
      try {
        await deleteUserMutation.mutateAsync(user.id);
      } catch (error) {
        alert(`خطا در حذف کاربر: ${error.message}`);
      }
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="جستجو بر اساس نام یا شماره..."
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
      </div>

      {/* جدول کاربران */}
      <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
        <table className="table table-zebra text-sm">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th>عکس</th>
              <th>نام</th>
              <th>نقش</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>وضعیت</th>
              <th>پروفایل عمومی</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      {user.avatar_url ? (
                        <img 
                          src={user.avatar_url} 
                          alt={user.name || 'کاربر'}
                          className="rounded-full object-cover w-10 h-10"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                          <FaUser className="text-base-content/60" />
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="font-bold">{user.name || 'نامشخص'}</td>
                <td>
                  <span className={`badge ${roleColors[user.role] || 'badge-neutral'}`}>
                    {roleLabels[user.role] || 'نامشخص'}
                  </span>
                </td>
                <td>{user.phone || 'ثبت نشده'}</td>
                <td>{user.email || 'ثبت نشده'}</td>
                {/* <td>
                  {user.userStatus=="active" ? (
                    <span className="badge badge-outline badge-success">فعال</span>
                  ) : (
                    <span className="badge badge-outline badge-error">غیرفعال</span>
                  )}
                </td> */}
                <td>
                  {(() => {
                    switch(user.userStatus) {
                      case "actived":
                        return <span className="badge badge-outline badge-success">تایید شده</span>;
                      case "pending":
                        return <span className="badge badge-outline badge-warning">در انتظار تایید</span>;
                      case "inActive":
                        return <span className="badge badge-outline badge-error">غیر فعال</span>;
                      // default:
                      //   return <span className="badge badge-outline badge-neutral">نامشخص</span>;
                    }
                  })()}
                </td>
                <td>
                  {(() => {
                    switch(user.DentistProfileStatus) {
                      case "published":
                        return <span className="badge badge-outline badge-success">منتشر شده</span>;
                      case "pending":
                        return <span className="badge badge-outline badge-warning">در حال برسی</span>;
                      case "inActive":
                        return <span className="badge badge-outline badge-error">غیر فعال</span>;
                      default:
                        return <span className="badge badge-outline badge-neutral">---------------</span>;
                    }
                  })()}
                </td>
                <td>
                  <div className="flex gap-2">
                    {/* <button
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => {
                        // باز کردن مودال جزئیات کاربر
                        document.getElementById(`user_modal_${user.id}`).showModal();
                      }}
                    >
                      <FaEye className="mr-1 size-4" /> مشاهده
                    </button> */}
                    <Button className="btn btn-sm btn-outline btn-info" href={`/admin-panel/users/${user.id}`}>
                        <FaRegEdit className="mr-1 size-4" /> ویرایش
                    </Button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
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
                  
                  {/* مودال جزئیات کاربر */}
                  <dialog id={`user_modal_${user.id}`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg mb-4">جزئیات کاربر</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="avatar">
                            <div className="w-16 h-16 rounded-full">
                              {user.avatar_url ? (
                                <img 
                                  src={user.avatar_url} 
                                  alt={user.full_name || 'کاربر'}
                                  className="rounded-full object-cover w-16 h-16"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center">
                                  <FaUser className="text-2xl text-base-content/60" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{user.full_name || 'نامشخص'}</h4>
                            <span className={`badge ${roleColors[user.role] || 'badge-neutral'}`}>
                              {roleLabels[user.role] || 'نامشخص'}
                            </span>
                          </div>
                        </div>
                        <p><strong>ایمیل:</strong> {user.email || 'ثبت نشده'}</p>
                        <p><strong>شماره تلفن:</strong> {user.phone || 'ثبت نشده'}</p>
                        <p><strong>تاریخ ایجاد:</strong> {formatDate(user.created_at)}</p>
                        <p><strong>وضعیت:</strong> 
                          {user.userStatus=="active" ? (
                            <span className="badge badge-success mr-2">فعال</span>
                          ) : (
                            <span className="badge badge-error mr-2">غیرفعال</span>
                          )}
                        </p>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">بستن</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-base-content/60 py-6">
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
