// import React from "react";


// function DentistList() {
//     return ( 
//         <div>DentistList</div>
//      );
// }

// export default DentistList;


// import React, { useState, useMemo } from 'react';
// import { FaEye, FaTrashAlt, FaUser } from 'react-icons/fa';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import Button from '@/component/Button';
// import { FaRegEdit } from "react-icons/fa";

// // سرویس API برای ارتباط با بک‌اند
// import apiService from '@/features/api';

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'text-red-500',
//   dentist: 'text-blue-500',
//   patient: 'text-green-500',
// };

// const statusLabels = {
//   active: 'فعال',
//   pending: 'در انتظار تایید',
//   inactive: 'غیرفعال',
// };

// const statusColors = {
//   active: 'badge-success',
//   pending: 'badge-warning',
//   inactive: 'badge-error',
// };

// // تابع کمکی برای فرمت تاریخ
// const formatDate = (dateString) => {
//   if (!dateString) return 'ثبت نشده';
  
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('fa-IR');
//   } catch (error) {
//     return 'تاریخ نامعتبر';
//   }
// };

// // تابع fetch داده‌ها از API واقعی
// const fetchUsers = async () => {
//   try {
//     const response = await apiService.get('/dentist/admin?page=1&limit=20&orderBy=nationalCode');
    
//     // بررسی ساختار پاسخ API
//     if (response.data && response.data.data && response.data.data.users) {
//       return response.data.data.users;
//     }
    
//     return [];
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw new Error(error.response?.data?.message || 'خطا در دریافت لیست کاربران');
//   }
// };

// // تابع حذف کاربر از طریق API
// const deleteUser = async (userId) => {
//   try {
//     const response = await apiService.delete(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw new Error(error.response?.data?.message || 'خطا در حذف کاربر');
//   }
// };

// export default function DentistList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const queryClient = useQueryClient();

//   // استفاده از React Query برای مدیریت state و cache
//   const {
//     data: users = [],
//     isLoading,
//     isError,
//     error,
//     refetch
//   } = useQuery({
//     queryKey: ['users'],
//     queryFn: fetchUsers,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     retry: 2,
//   });

//   // Mutation برای حذف کاربر
//   const deleteUserMutation = useMutation({
//     mutationFn: deleteUser,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ['users'] });
//     },
//   });

//   // فیلتر کردن کاربران با useMemo برای بهینه‌سازی
//   const filteredUsers = useMemo(() => {
//     if (!users || users.length === 0) return [];
    
//     return users.filter((user) => {
//       const searchTerm = search.toLowerCase();
      
//       // جستجو در فیلدهای موجود
//       const matchesSearch = searchTerm === '' || 
//         (user.phoneNumber && user.phoneNumber.toLowerCase().includes(searchTerm)) ||
//         (user.id && user.id.toLowerCase().includes(searchTerm));
      
//       const matchesRole = filterRole === 'all' || user.role === filterRole;
//       const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [users, search, filterRole, filterStatus]);

//   const handleDeleteUser = async (user) => {
//     if (window.confirm(`آیا از حذف کاربر با شماره "${user.phoneNumber}" مطمئن هستید؟`)) {
//       try {
//         await deleteUserMutation.mutateAsync(user.id);
//       } catch (error) {
//         alert(`خطا در حذف کاربر: ${error.message}`);
//       }
//     }
//   };

//   // نمایش loading
//   if (isLoading) {
//     return (
//       <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//         <div className="text-sm breadcrumbs">
//           <ul>
//             <li><a href="/admin-panel">پنل مدیریت</a></li>
//             <li>کاربران</li>
//           </ul>
//         </div>
//         <div className="flex justify-center items-center h-64">
//           <span className="loading loading-spinner loading-lg"></span>
//         </div>
//       </div>
//     );
//   }

//   // نمایش error
//   if (isError) {
//     return (
//       <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//         <div className="text-sm breadcrumbs">
//           <ul>
//             <li><a href="/admin-panel">پنل مدیریت</a></li>
//             <li>کاربران</li>
//           </ul>
//         </div>
//         <div className="alert alert-error">
//           <span>خطا در بارگذاری کاربران: {error.message}</span>
//           <button 
//             className="btn btn-sm btn-primary"
//             onClick={() => refetch()}
//           >
//             تلاش مجدد
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       <div className="text-sm breadcrumbs">
//         <ul>
//           <li><a href="/admin-panel">پنل مدیریت</a></li>
//           <li>کاربران</li>
//         </ul>
//       </div>

//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت کاربران</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس شماره تلفن یا ID..."
//           className="input input-bordered w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="select select-bordered w-full"
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//         >
//           <option value="all">همه نقش‌ها</option>
//           <option value="patient">بیمار</option>
//           <option value="dentist">دندان‌پزشک</option>
//           <option value="admin">ادمین</option>
//         </select>
//         <select
//           className="select select-bordered w-full"
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="all">همه وضعیت‌ها</option>
//           <option value="active">فعال</option>
//           <option value="pending">در انتظار تایید</option>
//           <option value="inactive">غیرفعال</option>
//         </select>
//       </div>

//       {/* جدول کاربران */}
//       <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>#</th>
//               <th>شناسه</th>
//               <th>شماره تلفن</th>
//               <th>نقش</th>
//               <th>وضعیت</th>
//               <th>تاریخ ایجاد</th>
//               <th>آخرین تغییر</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td className="font-mono text-xs">
//                   {user.id.substring(0, 8)}...
//                 </td>
//                 <td className="font-bold" dir="ltr">{user.phoneNumber}</td>
//                 <td>
//                   <span className={`badge ${roleColors[user.role] || 'badge-neutral'}`}>
//                     {roleLabels[user.role] || 'نامشخص'}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`badge badge-outline ${statusColors[user.status] || 'badge-neutral'}`}>
//                     {statusLabels[user.status] || user.status}
//                   </span>
//                 </td>
//                 <td>{formatDate(user.createdAt)}</td>
//                 <td>{formatDate(user.modifiedAt)}</td>
//                 <td>
//                   <div className="flex gap-2">
//                     {/* فقط دکمه حذف باقی می‌ماند */}
//                     <button
//                       className="btn btn-sm btn-outline btn-error"
//                       onClick={() => handleDeleteUser(user)}
//                       disabled={deleteUserMutation.isPending}
//                     >
//                       {deleteUserMutation.isPending ? (
//                         <span className="loading loading-spinner loading-xs"></span>
//                       ) : (
//                         <FaTrashAlt className="mr-1" />
//                       )}
//                       حذف
//                     </button>
//                   </div>
                  
//                   {/* مودال جزئیات کاربر */}
//                   <dialog id={`user_modal_${user.id}`} className="modal">
//                     <div className="modal-box">
//                       <h3 className="font-bold text-lg mb-4">جزئیات کاربر</h3>
//                       <div className="space-y-3">
//                         <p><strong>شناسه:</strong> {user.id}</p>
//                         <p><strong>شماره تلفن:</strong> {user.phoneNumber}</p>
//                         <p><strong>نقش:</strong> 
//                           <span className={`mr-2 badge ${roleColors[user.role] || 'badge-neutral'}`}>
//                             {roleLabels[user.role] || 'نامشخص'}
//                           </span>
//                         </p>
//                         <p><strong>وضعیت:</strong> 
//                           <span className={`mr-2 badge ${statusColors[user.status] || 'badge-neutral'}`}>
//                             {statusLabels[user.status] || user.status}
//                           </span>
//                         </p>
//                         <p><strong>تاریخ ایجاد:</strong> {formatDate(user.createdAt)}</p>
//                         <p><strong>آخرین تغییر:</strong> {formatDate(user.modifiedAt)}</p>
//                       </div>
//                       <div className="modal-action">
//                         <form method="dialog">
//                           <button className="btn">بستن</button>
//                         </form>
//                       </div>
//                     </div>
//                   </dialog>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center text-base-content/60 py-6">
//                   {users.length === 0 ? 'هیچ کاربری یافت نشد.' : 'نتیجه‌ای با فیلترهای انتخاب شده یافت نشد.'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }











// import React, { useState, useMemo, useEffect } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'text-red-500',
//   dentist: 'text-blue-500',
//   patient: 'text-green-500',
// };

// const statusLabels = {
//   active: 'فعال',
//   pending: 'در انتظار تایید',
//   inactive: 'غیرفعال',
// };

// const statusColors = {
//   active: 'badge-success',
//   pending: 'badge-warning',
//   inactive: 'badge-error',
// };

// const formatDate = (dateString) => {
//   if (!dateString) return 'ثبت نشده';
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('fa-IR');
//   } catch (error) {
//     return 'تاریخ نامعتبر';
//   }
// };

// export default function DentistList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   // دریافت کاربران
//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('/api/v1/dentist/admin?page=1&limit=20&orderBy');
//       if (!response.ok) throw new Error('خطا در دریافت لیست کاربران');
      
//       const data = await response.json();
//       if (data?.data?.users) {
//         setUsers(data.data.users);
//       } else {
//         setUsers([]);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // حذف کاربر
//   const handleDeleteUser = async (user) => {
//     if (!window.confirm(`آیا از حذف کاربر با شماره "${user.phoneNumber}" مطمئن هستید؟`)) {
//       return;
//     }

//     setDeletingId(user.id);
//     try {
//       const response = await fetch(`/api/users/${user.id}`, {
//         method: 'DELETE',
//       });
      
//       if (!response.ok) throw new Error('خطا در حذف کاربر');
      
//       // حذف موفق - به روزرسانی لیست
//       setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
//     } catch (err) {
//       alert(`خطا در حذف کاربر: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // بارگذاری اولیه
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // فیلتر کاربران
//   const filteredUsers = useMemo(() => {
//     if (!users || users.length === 0) return [];
    
//     return users.filter((user) => {
//       const searchTerm = search.toLowerCase();
//       const matchesSearch = searchTerm === '' || 
//         (user.phoneNumber && user.phoneNumber.toLowerCase().includes(searchTerm)) ||
//         (user.id && user.id.toLowerCase().includes(searchTerm));
      
//       const matchesRole = filterRole === 'all' || user.role === filterRole;
//       const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      
//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [users, search, filterRole, filterStatus]);

//   if (loading) {
//     return (
//       <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//         <div className="flex justify-center items-center h-64">
//           <div className="text-center">
//             <div className="loading loading-spinner loading-lg"></div>
//             <p className="mt-2">در حال بارگذاری...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//         <div className="alert alert-error">
//           <span>خطا در بارگذاری کاربران: {error}</span>
//           <button className="btn btn-sm btn-primary" onClick={fetchUsers}>
//             تلاش مجدد
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت کاربران</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس شماره تلفن یا ID..."
//           className="input input-bordered w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="select select-bordered w-full"
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//         >
//           <option value="all">همه نقش‌ها</option>
//           <option value="patient">بیمار</option>
//           <option value="dentist">دندان‌پزشک</option>
//           <option value="admin">ادمین</option>
//         </select>
//         <select
//           className="select select-bordered w-full"
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="all">همه وضعیت‌ها</option>
//           <option value="active">فعال</option>
//           <option value="pending">در انتظار تایید</option>
//           <option value="inactive">غیرفعال</option>
//         </select>
//       </div>

//       {/* جدول کاربران */}
//       <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>#</th>
//               <th>شناسه</th>
//               <th>شماره تلفن</th>
//               <th>نقش</th>
//               <th>وضعیت</th>
//               <th>تاریخ ایجاد</th>
//               <th>آخرین تغییر</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td className="font-mono text-xs">
//                   {user.id?.substring(0, 8)}...
//                 </td>
//                 <td className="font-bold" dir="ltr">{user.phoneNumber}</td>
//                 <td>
//                   <span className={`badge ${roleColors[user.role] || 'badge-neutral'}`}>
//                     {roleLabels[user.role] || 'نامشخص'}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`badge badge-outline ${statusColors[user.status] || 'badge-neutral'}`}>
//                     {statusLabels[user.status] || user.status}
//                   </span>
//                 </td>
//                 <td>{formatDate(user.createdAt)}</td>
//                 <td>{formatDate(user.modifiedAt)}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline btn-error"
//                     onClick={() => handleDeleteUser(user)}
//                     disabled={deletingId === user.id}
//                   >
//                     {deletingId === user.id ? (
//                       <span className="loading loading-spinner loading-xs"></span>
//                     ) : (
//                       <FaTrashAlt className="mr-1" />
//                     )}
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center text-base-content/60 py-6">
//                   {users.length === 0 ? 'هیچ کاربری یافت نشد.' : 'نتیجه‌ای با فیلترهای انتخاب شده یافت نشد.'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }












// import React, { useState, useMemo, useEffect } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'text-red-500',
//   dentist: 'text-blue-500',
//   patient: 'text-green-500',
// };

// const statusLabels = {
//   active: 'فعال',
//   pending: 'در انتظار تایید',
//   inactive: 'غیرفعال',
// };

// const statusColors = {
//   active: 'badge-success',
//   pending: 'badge-warning',
//   inactive: 'badge-error',
// };

// const formatDate = (dateString) => {
//   if (!dateString) return 'ثبت نشده';
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('fa-IR');
//   } catch (error) {
//     return 'تاریخ نامعتبر';
//   }
// };

// export default function DentistList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);
//   const [debugInfo, setDebugInfo] = useState(null); // ← اضافه شد

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     setDebugInfo(null);

//     const url = '/api/v1/dentist/admin?page=1&limit=20&orderBy';
//     console.log('🚀 [fetchUsers] شروع درخواست به:', url);

//     try {
//       const response = await fetch(url);

//       const status = response.status;
//       const contentType = response.headers.get('content-type');
//       const rawText = await response.text();

//       console.log('📡 [fetchUsers] status:', status);
//       console.log('📡 [fetchUsers] content-type:', contentType);
//       console.log('📡 [fetchUsers] raw response (first 500 chars):', rawText.substring(0, 500));

//       // ذخیره اطلاعات debug برای نمایش در UI
//       setDebugInfo({
//         url,
//         status,
//         contentType,
//         rawPreview: rawText.substring(0, 300),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${status} - سرور پاسخ خطا داد`);
//       }

//       if (!contentType || !contentType.includes('application/json')) {
//         throw new Error(`Content-Type اشتباه است: "${contentType}" (انتظار application/json)`);
//       }

//       let data;
//       try {
//         data = JSON.parse(rawText);
//         console.log('✅ [fetchUsers] JSON parse موفق:', data);
//       } catch (parseErr) {
//         console.error('❌ [fetchUsers] JSON parse خطا:', parseErr.message);
//         throw new Error(`پاسخ سرور JSON معتبر نیست: ${parseErr.message}`);
//       }

//       console.log('🔍 [fetchUsers] ساختار data:', {
//         hasData: !!data?.data,
//         hasUsers: !!data?.data?.users,
//         usersLength: data?.data?.users?.length ?? 'N/A',
//         keys: data ? Object.keys(data) : [],
//       });

//       if (data?.data?.dentists) {
//         setUsers(data.data.dentists);
//       }else {
//         console.warn('⚠️ [fetchUsers] فیلد data.users یافت نشد، ساختار کامل:', JSON.stringify(data).substring(0, 500));
//         setUsers([]);
//       }

//     } catch (err) {
//       console.error('❌ [fetchUsers] خطای نهایی:', err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (user) => {
//     if (!window.confirm(`آیا از حذف کاربر با شماره "${user.phoneNumber}" مطمئن هستید؟`)) return;

//     const url = `/api/users/${user.id}`;
//     console.log('🗑️ [handleDeleteUser] حذف کاربر:', { id: user.id, url });

//     setDeletingId(user.id);
//     try {
//       const response = await fetch(url, { method: 'DELETE' });

//       console.log('📡 [handleDeleteUser] status:', response.status);

//       if (!response.ok) throw new Error(`HTTP ${response.status}`);

//       setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
//       console.log('✅ [handleDeleteUser] حذف موفق');
//     } catch (err) {
//       console.error('❌ [handleDeleteUser] خطا:', err.message);
//       alert(`خطا در حذف کاربر: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const filteredUsers = useMemo(() => {
//     if (!users || users.length === 0) return [];
//     return users.filter((user) => {
//       const searchTerm = search.toLowerCase();
//       const matchesSearch = searchTerm === '' ||
//         (user.phoneNumber && user.phoneNumber.toLowerCase().includes(searchTerm)) ||
//         (user.id && user.id.toLowerCase().includes(searchTerm));
//       const matchesRole = filterRole === 'all' || user.role === filterRole;
//       const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [users, search, filterRole, filterStatus]);

//   if (loading) {
//     return (
//       <div className="p-6 bg-base-200 min-h-screen flex justify-center items-center">
//         <div className="text-center">
//           <div className="loading loading-spinner loading-lg"></div>
//           <p className="mt-2">در حال بارگذاری...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 space-y-4 bg-base-200 min-h-screen">
//         <div className="alert alert-error">
//           <span>❌ {error}</span>
//           <button className="btn btn-sm btn-primary" onClick={fetchUsers}>تلاش مجدد</button>
//         </div>

//         {/* باکس debug */}
//         {debugInfo && (
//           <div className="bg-base-100 rounded-xl p-4 space-y-2 text-sm font-mono border border-error">
//             <p className="font-bold text-base">🔍 اطلاعات Debug:</p>
//             <p>📌 URL: <span className="text-info">{debugInfo.url}</span></p>
//             <p>📊 Status: <span className={debugInfo.status === 200 ? 'text-success' : 'text-error'}>{debugInfo.status}</span></p>
//             <p>📄 Content-Type: <span className="text-warning">{debugInfo.contentType || 'ندارد'}</span></p>
//             <div>
//               <p className="font-bold">📝 پیش‌نمایش پاسخ سرور:</p>
//               <pre className="bg-base-200 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap break-all mt-1">
//                 {debugInfo.rawPreview}
//               </pre>
//             </div>
//           </div>
//         )}

//         <div className="bg-base-100 rounded-xl p-4 text-sm border">
//           <p className="font-bold mb-2">💡 چک‌لیست رفع مشکل:</p>
//           <ul className="space-y-1 list-disc list-inside text-base-content/70">
//             <li>آیا سرور backend در حال اجرا است؟</li>
//             <li>آدرس <code className="bg-base-200 px-1 rounded">/api/v1/dentist/admin</code> درست است؟</li>
//             <li>سرور باید <code className="bg-base-200 px-1 rounded">Content-Type: application/json</code> برگرداند</li>
//             <li>Console مرورگر را برای لاگ‌های کامل بررسی کنید (F12)</li>
//           </ul>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت کاربران</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس شماره تلفن یا ID..."
//           className="input input-bordered w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select className="select select-bordered w-full" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
//           <option value="all">همه نقش‌ها</option>
//           <option value="patient">بیمار</option>
//           <option value="dentist">دندان‌پزشک</option>
//           <option value="admin">ادمین</option>
//         </select>
//         <select className="select select-bordered w-full" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
//           <option value="all">همه وضعیت‌ها</option>
//           <option value="active">فعال</option>
//           <option value="pending">در انتظار تایید</option>
//           <option value="inactive">غیرفعال</option>
//         </select>
//       </div>

//       <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>#</th><th>شناسه</th><th>شماره تلفن</th><th>نقش</th>
//               <th>وضعیت</th><th>تاریخ ایجاد</th><th>آخرین تغییر</th><th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user, index) => (
//               <tr key={user.id}>
//                 <td>{index + 1}</td>
//                 <td className="font-mono text-xs">{user.id?.substring(0, 8)}...</td>
//                 <td className="font-bold" dir="ltr">{user.phoneNumber}</td>
//                 <td>
//                   <span className={`badge ${roleColors[user.role] || 'badge-neutral'}`}>
//                     {roleLabels[user.role] || 'نامشخص'}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`badge badge-outline ${statusColors[user.status] || 'badge-neutral'}`}>
//                     {statusLabels[user.status] || user.status}
//                   </span>
//                 </td>
//                 <td>{formatDate(user.createdAt)}</td>
//                 <td>{formatDate(user.modifiedAt)}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline btn-error"
//                     onClick={() => handleDeleteUser(user)}
//                     disabled={deletingId === user.id}
//                   >
//                     {deletingId === user.id
//                       ? <span className="loading loading-spinner loading-xs"></span>
//                       : <FaTrashAlt className="mr-1" />}
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center text-base-content/60 py-6">
//                   {users.length === 0 ? 'هیچ کاربری یافت نشد.' : 'نتیجه‌ای با فیلترهای انتخاب شده یافت نشد.'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }















// import React, { useState, useMemo, useEffect } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';

// const statusLabels = {
//   active: 'فعال',
//   pending: 'در انتظار تایید',
//   inactive: 'غیرفعال',
// };

// const statusColors = {
//   active: 'badge-success',
//   pending: 'badge-warning',
//   inactive: 'badge-error',
// };

// export default function DentistList() {
//   console.log('✅ DentistList rendered');
//   const [search, setSearch] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('/api/v1/dentist/admin?page=1&limit=20&orderBy');
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       const data = await response.json();
//       console.log('API Response:', data);  // ← اضافه کنید
//       console.log('Dentists array:', data?.data?.dentists);
//       setUsers(data?.data?.dentists ?? []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteUser = async (user) => {
//     if (!window.confirm(`آیا از حذف "${user.firstName ?? 'این کاربر'}" مطمئن هستید؟`)) return;
//     setDeletingId(user.userId);
//     try {
//       const response = await fetch(`/api/v1/dentist/${user.userId}`, { method: 'DELETE' });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       setUsers(prev => prev.filter(u => u.userId !== user.userId));
//     } catch (err) {
//       alert(`خطا در حذف: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const searchTerm = search.toLowerCase();
//       const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.toLowerCase();
//       const matchesSearch = searchTerm === '' ||
//         fullName.includes(searchTerm) ||
//         user.specialization?.toLowerCase().includes(searchTerm) ||
//         user.userId?.toLowerCase().includes(searchTerm);
//       const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
//       return matchesSearch && matchesStatus;
//     });
//   }, [users, search, filterStatus]);

//   if (loading) return (
//     <div className="p-6 bg-base-200 min-h-screen flex justify-center items-center">
//       <div className="text-center">
//         <div className="loading loading-spinner loading-lg"></div>
//         <p className="mt-2">در حال بارگذاری...</p>
//       </div>
//     </div>
//   );

//   if (error) return (
//     <div className="p-6 bg-base-200 min-h-screen">
//       <div className="alert alert-error">
//         <span>❌ {error}</span>
//         <button className="btn btn-sm btn-primary" onClick={fetchUsers}>تلاش مجدد</button>
//       </div>
//     </div>
//   );

//   useEffect(() => {
//   console.log('Users state updated:', users);
//   console.log('Number of users:', users.length);
// }, [users]);

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت دندان‌پزشکان</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام، تخصص یا ID..."
//           className="input input-bordered w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="select select-bordered w-full"
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//         >
//           <option value="all">همه وضعیت‌ها</option>
//           <option value="active">فعال</option>
//           <option value="pending">در انتظار تایید</option>
//           <option value="inactive">غیرفعال</option>
//         </select>
//       </div>

//       {/* جدول */}
//       <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>#</th>
//               <th>دندان‌پزشک</th>
//               <th>تخصص</th>
//               <th>سابقه (سال)</th>
//               <th>امتیاز</th>
//               <th>وضعیت</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user, index) => (
//               <tr key={user.userId}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <div className="flex items-center gap-3">
//                     {user.avatar
//                       ? <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
//                       : <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center text-xs">؟</div>
//                     }
//                     <div>
//                       <p className="font-bold">
//                         {user.firstName && user.lastName
//                           ? `${user.firstName} ${user.lastName}`
//                           : 'بدون نام'}
//                       </p>
//                       <p className="text-xs text-base-content/50 font-mono">{user.userId?.substring(0, 8)}...</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{user.specialization ?? '—'}</td>
//                 <td>{user.yearsOfExperience ?? '—'}</td>
//                 <td>
//                   {user.averageRating
//                     ? `⭐ ${user.averageRating} (${user.ratingCount})`
//                     : '—'}
//                 </td>
//                 <td>
//                   <span className={`badge badge-outline ${statusColors[user.status] ?? 'badge-neutral'}`}>
//                     {statusLabels[user.status] ?? user.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline btn-error"
//                     onClick={() => handleDeleteUser(user)}
//                     disabled={deletingId === user.userId}
//                   >
//                     {deletingId === user.userId
//                       ? <span className="loading loading-spinner loading-xs"></span>
//                       : <FaTrashAlt />}
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center text-base-content/60 py-6">
//                   {users.length === 0 ? 'هیچ دندان‌پزشکی یافت نشد.' : 'نتیجه‌ای با فیلترهای انتخاب شده یافت نشد.'}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { FaTrashAlt } from 'react-icons/fa';

// const statusLabels = {
//   active: 'فعال',
//   pending: 'در انتظار تایید',
//   inactive: 'غیرفعال',
// };

// const statusColors = {
//   active: 'badge-success',
//   pending: 'badge-warning',
//   inactive: 'badge-error',
// };

// export default function DentistList() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   // const fetchUsers = async () => {
//   //   setError(null);
//   //   try {
//   //     const response = await fetch('/api/v1/dentist/admin?page=1&limit=20&orderBy');
//   //     if (!response.ok) throw new Error(`HTTP ${response.status}`);
//   //     const data = await response.json();
//   //     console.log(data);
      
//   //     setUsers(data?.data?.dentists ?? []);
//   //   } catch (err) {
//   //     setError(err.message);
//   //   }
//   // };

// //   const fetchUsers = async () => {
// //   console.log('1️⃣ fetchUsers STARTED');  // ← این خط رو اضافه کن
// //   setError(null);
// //   try {
// //     console.log('2️⃣ Before fetch');
// //     const response = await fetch('/api/v1/dentist/admin?page=1&limit=20&orderBy');
// //     console.log('3️⃣ After fetch, status:', response.status);
// //     if (!response.ok) throw new Error(`HTTP ${response.status}`);
// //     const data = await response.json();
// //     console.log('4️⃣ Data received:', data);
// //     console.log('5️⃣ Dentists array:', data?.data?.dentists);
// //     setUsers(data?.data?.dentists ?? []);
// //     console.log('6️⃣ Users set, length:', data?.data?.dentists?.length);
// //   } catch (err) {
// //     console.error('❌ Error caught:', err);
// //     setError(err.message);
// //   } finally {
// //     console.log('7️⃣ fetchUsers FINISHED');
// //   }
// // };


// // const fetchUsers = async () => {
// //   console.log('Fetch started');
// //   try {
// //     // تست با یک API ساده و معروف
// //     const response = await fetch('https://jsonplaceholder.typicode.com/users');
// //     console.log('Response status:', response.status);
// //     const data = await response.json();
// //     console.log('Data from test API:', data);
// //     setUsers(data); // تست با داده JSONPlaceholder
// //   } catch (err) {
// //     console.error('Fetch error:', err);
// //     setError(err.message);
// //   }
// // };


// const fetchUsers = async () => {
//   console.log('Fetch started');
//   try {
//     // آدرس کامل با پورت صحیح
//     // const response = await fetch('https://dentist-reyn.onrender.com/api/v1/dentist/admin?page=1&limit=20&orderBy',{
//     const response = await fetch('https://dentist-reyn.onrender.com/api/v1/dentist/admin',{

//       credentials: 'include', // ← این خط رو اضافه کن (برای ارسال کوکی)
//         headers: {
//           'Content-Type': 'application/json',
//         },
//     })
   
//     console.log('Response status:', response.status);
//     const data = await response.json();
//     console.log('Data:', data);
//     setUsers(data?.data?.dentists ?? []);
//   } catch (err) {
//     console.error('Fetch error:', err);
//     setError(err.message);
//   }
// };
  
  
//   const handleDeleteUser = async (user) => {
//     if (!window.confirm(`آیا از حذف "${user.firstName ?? 'این کاربر'}" مطمئن هستید؟`)) return;
//     setDeletingId(user.userId);
//     try {
//       const response = await fetch(`/api/v1/dentist/${user.userId}`, { method: 'DELETE' });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       setUsers(prev => prev.filter(u => u.userId !== user.userId));
//     } catch (err) {
//       alert(`خطا در حذف: ${err.message}`);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   if (error) return (
//     <div className="p-6 bg-base-200 min-h-screen">
//       <div className="alert alert-error">
//         <span>❌ {error}</span>
//         <button className="btn btn-sm btn-primary" onClick={fetchUsers}>تلاش مجدد</button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت دندان‌پزشکان</h1>
//         <p className="text-sm text-base-content/60">تعداد کل: {users.length}</p>
//       </div>

//       {/* جدول */}
//       <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>#</th>
//               <th>دندان‌پزشک</th>
//               <th>تخصص</th>
//               <th>سابقه (سال)</th>
//               <th>امتیاز</th>
//               <th>وضعیت</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user.userId}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <div className="flex items-center gap-3">
//                     {user.avatar
//                       ? <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
//                       : <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center text-xs">؟</div>
//                     }
//                     <div>
//                       <p className="font-bold">
//                         {user.firstName && user.lastName
//                           ? `${user.firstName} ${user.lastName}`
//                           : 'بدون نام'}
//                       </p>
//                       <p className="text-xs text-base-content/50 font-mono">{user.userId?.substring(0, 8)}...</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>{user.specialization ?? '—'}</td>
//                 <td>{user.yearsOfExperience ?? '—'}</td>
//                 <td>
//                   {user.averageRating
//                     ? `⭐ ${user.averageRating} (${user.ratingCount})`
//                     : '—'}
//                 </td>
//                 <td>
//                   <span className={`badge badge-outline ${statusColors[user.status] ?? 'badge-neutral'}`}>
//                     {statusLabels[user.status] ?? user.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline btn-error"
//                     onClick={() => handleDeleteUser(user)}
//                     disabled={deletingId === user.userId}
//                   >
//                     {deletingId === user.userId
//                       ? <span className="loading loading-spinner loading-xs"></span>
//                       : <FaTrashAlt />}
//                     حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {users.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center text-base-content/60 py-6">
//                   هیچ دندان‌پزشکی یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }












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
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          onClick={() => handleViewUser(user.userId)}
                          title="مشاهده پروفایل"
                        >
                          <FaEye size={12} />
                          مشاهده
                        </button>
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