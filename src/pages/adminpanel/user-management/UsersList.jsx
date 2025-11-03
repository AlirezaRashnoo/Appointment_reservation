// import React, { useState } from 'react';

// const users = [
//   { id: 1, name: 'علی رضایی', role: 'dentist', phone: '09123456789', joined: '1404/06/01' },
//   { id: 2, name: 'مریم احمدی', role: 'patient', phone: '09351234567', joined: '1404/06/03' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05' },
// ];

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// export default function UsersList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = user.name.includes(search);
//     const matchesRole = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800">مدیریت کاربران</h1>

//       {/* فیلتر و جستجو */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام..."
//           className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-sm"
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//         >
//           <option value="all">همه نقش‌ها</option>
//           <option value="admin">ادمین</option>
//           <option value="dentist">دندان‌پزشک</option>
//           <option value="patient">بیمار</option>
//         </select>
//       </div>

//       {/* جدول کاربران */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <table className="w-full text-sm text-right">
//           <thead>
//             <tr className="border-b bg-gray-50 text-gray-600">
//               <th className="py-3 px-4">نام</th>
//               <th className="py-3 px-4">نقش</th>
//               <th className="py-3 px-4">شماره تماس</th>
//               <th className="py-3 px-4">تاریخ عضویت</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-4">{user.name}</td>
//                 <td className="py-3 px-4">{roleLabels[user.role]}</td>
//                 <td className="py-3 px-4">{user.phone}</td>
//                 <td className="py-3 px-4">{user.joined}</td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="py-4 text-center text-gray-500">
//                   هیچ کاربری یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// ----------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const users = [
//   { id: 1, name: 'علی رضایی', role: 'dentist', phone: '09123456789', joined: '1404/06/01', email: 'ali@dentist.com' },
//   { id: 2, name: 'مریم احمدی', role: 'patient', phone: '09351234567', joined: '1404/06/03', email: 'maryam@patient.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
// ];

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleStyles = {
//   admin: 'bg-red-100 text-red-700',
//   dentist: 'bg-blue-100 text-blue-700',
//   patient: 'bg-green-100 text-green-700',
// };

// export default function UsersList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const navigate = useNavigate();

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = user.name.includes(search) || user.phone.includes(search);
//     const matchesRole = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-gray-800">مدیریت کاربران</h1>
//         <p className="text-sm text-gray-500">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام یا شماره..."
//           className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border rounded-lg shadow-sm"
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//         >
//           <option value="all">همه نقش‌ها</option>
//           <option value="admin">ادمین</option>
//           <option value="dentist">دندان‌پزشک</option>
//           <option value="patient">بیمار</option>
//         </select>
//       </div>

//       {/* جدول کاربران */}
//       <div className="bg-white rounded-xl shadow-md p-6 overflow-auto">
//         <table className="w-full text-sm text-right">
//           <thead>
//             <tr className="border-b bg-gray-100 text-gray-600">
//               <th className="py-3 px-4">نام</th>
//               <th className="py-3 px-4">نقش</th>
//               <th className="py-3 px-4">ایمیل</th>
//               <th className="py-3 px-4">شماره تماس</th>
//               <th className="py-3 px-4">تاریخ عضویت</th>
//               <th className="py-3 px-4">عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-4 font-medium">{user.name}</td>
//                 <td className="py-3 px-4">
//                   <span className={`px-2 py-1 rounded-full text-xs ${roleStyles[user.role]}`}>
//                     {roleLabels[user.role]}
//                   </span>
//                 </td>
//                 <td className="py-3 px-4">{user.email}</td>
//                 <td className="py-3 px-4">{user.phone}</td>
//                 <td className="py-3 px-4">{user.joined}</td>
//                 <td className="py-3 px-4 space-x-2">
//                   <button
//                     onClick={() => navigate(`/admin-panel/users/${user.id}`)}
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     جزئیات
//                   </button>
//                   <button
//                     onClick={() => navigate(`/admin-panel/users/${user.id}/edit`)}
//                     className="text-green-600 hover:underline text-sm"
//                   >
//                     ویرایش
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="py-4 text-center text-gray-500">
//                   هیچ کاربری یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// ----------------------------------------------------------------------------



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEdit } from 'react-icons/fa';

// const users = [
//   { id: 1, name: 'علی رضایی', role: 'dentist', phone: '09123456789', joined: '1404/06/01', email: 'ali@dentist.com' },
//   { id: 2, name: 'مریم احمدی', role: 'patient', phone: '09351234567', joined: '1404/06/03', email: 'maryam@patient.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
// ];

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'badge-error',
//   dentist: 'badge-info',
//   patient: 'badge-success',
// };

// export default function UsersList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const navigate = useNavigate();

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = user.name.includes(search) || user.phone.includes(search);
//     const matchesRole = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت کاربران</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام یا شماره..."
//           className="input input-bordered w-full md:w-1/2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select
//           className="select select-bordered w-full md:w-1/3"
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//         >
//           <option value="all">همه نقش‌ها</option>
//           <option value="admin">ادمین</option>
//           <option value="dentist">دندان‌پزشک</option>
//           <option value="patient">بیمار</option>
//         </select>
//       </div>

//       {/* جدول کاربران */}
//       <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>نام</th>
//               <th>نقش</th>
//               <th>ایمیل</th>
//               <th>شماره تماس</th>
//               <th>تاریخ عضویت</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td className="font-bold">{user.name}</td>
//                 <td>
//                   <span className={`badge ${roleColors[user.role]}`}>
//                     {roleLabels[user.role]}
//                   </span>
//                 </td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.joined}</td>
//                 <td className="flex gap-2">
//                   <button
//                     onClick={() => navigate(`/admin-panel/users/${user.id}`)}
//                     className="btn btn-sm btn-outline btn-info"
//                   >
//                     <FaEye className="mr-1" /> جزئیات
//                   </button>
//                   <button
//                     onClick={() => navigate(`/admin-panel/users/${user.id}/edit`)}
//                     className="btn btn-sm btn-outline btn-success"
//                   >
//                     <FaEdit className="mr-1" /> ویرایش
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center text-base-content/60 py-6">
//                   هیچ کاربری یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }





// -----------------------------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye, FaEdit } from 'react-icons/fa';

// const users = [
//   { id: 1, name: 'علی رضایی', role: 'dentist', phone: '09123456789', joined: '1404/06/01', email: 'ali@dentist.com' },
//   { id: 2, name: 'مریم احمدی', role: 'patient', phone: '09351234567', joined: '1404/06/03', email: 'maryam@patient.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 4, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 5, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
// ];

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'badge-error',
//   dentist: 'badge-info',
//   patient: 'badge-success',
// };

// export default function UsersList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const navigate = useNavigate();

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = user.name.includes(search) || user.phone.includes(search);
//     const matchesRole = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       {/* مسیر صفحه */}
//       <div className="text-sm breadcrumbs">
//         <ul>
//           <li><a href="/admin-panel">پنل مدیریت</a></li>
//           <li>کاربران</li>
//         </ul>
//       </div>

//       {/* عنوان و آمار */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت کاربران</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* جستجو و فیلتر نقش */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام یا شماره..."
//           className="input input-bordered w-full md:w-1/2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <div className="tabs tabs-boxed w-full md:w-1/2">
//           <a className={`tab ${filterRole === 'all' ? 'tab-active' : ''}`} onClick={() => setFilterRole('all')}>همه</a>
//           <a className={`tab ${filterRole === 'patient' ? 'tab-active' : ''}`} onClick={() => setFilterRole('patient')}>بیمار</a>
//           <a className={`tab ${filterRole === 'dentist' ? 'tab-active' : ''}`} onClick={() => setFilterRole('dentist')}>دندان‌پزشک</a>
//           <a className={`tab ${filterRole === 'admin' ? 'tab-active' : ''}`} onClick={() => setFilterRole('admin')}>ادمین</a>
//         </div>
//       </div>

//       {/* جدول کاربران */}
//       <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
//         <table className="table text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>کاربر</th>
//               <th>نقش</th>
//               <th>ایمیل</th>
//               <th>شماره تماس</th>
//               <th>تاریخ عضویت</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td className="flex items-center gap-3">
//                   <div className="avatar">
//                     <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                       <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
//                     </div>
//                   </div>
//                   <span className="font-bold">{user.name}</span>
//                 </td>
//                 <td>
//                   <span className={`badge ${roleColors[user.role]}`}>
//                     {roleLabels[user.role]}
//                   </span>
//                 </td>
//                 <td>{user.email}</td>
//                 <td>{user.phone}</td>
//                 <td>{user.joined}</td>
//                 <td className="">
//                   <button
//                     onClick={() => navigate(`/admin-panel/users/${user.id}`)}
//                     className="btn btn-sm btn-outline btn-info"
//                   >
//                     <FaEye className="mr-1" /> مشاهده
//                   </button>
//                   {/* <button
//                     onClick={() => navigate(`/admin-panel/users/${user.id}/edit`)}
//                     className="btn btn-sm btn-outline btn-success"
//                   >
//                     <FaEdit className="mr-1" /> ویرایش
//                   </button> */}
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center text-base-content/60 py-6">
//                   هیچ کاربری یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaEye } from 'react-icons/fa';

// const users = [
//   { id: 1, name: 'علی رضایی', role: 'dentist', phone: '09123456789', joined: '1404/06/01', email: 'ali@dentist.com' },
//   { id: 2, name: 'مریم احمدی', role: 'patient', phone: '09351234567', joined: '1404/06/03', email: 'maryam@patient.com' },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', joined: '1404/06/05', email: 'sara@admin.com' },
//   { id: 4, name: 'حسین کریمی', role: 'dentist', phone: '09129876543', joined: '1404/06/07', email: 'hossein@dentist.com' },
//   { id: 5, name: 'زهرا موسوی', role: 'patient', phone: '09351239876', joined: '1404/06/09', email: 'zahra@patient.com' },
// ];

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'badge-error',
//   dentist: 'badge-info',
//   patient: 'badge-success',
// };

// export default function UsersList() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const navigate = useNavigate();

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch = user.name.includes(search) || user.phone.includes(search);
//     const matchesRole = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       {/* مسیر صفحه */}
//       <div className="text-sm breadcrumbs">
//         <ul>
//           <li><a href="/admin-panel">پنل مدیریت</a></li>
//           <li>کاربران</li>
//         </ul>
//       </div>

//       {/* عنوان و آمار */}
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت کاربران</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {users.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام یا شماره..."
//           className="input input-bordered w-full"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <div className="form-control w-full">
//           <label className="label">
//             <span className="label-text text-base-content font-medium">فیلتر نقش</span>
//           </label>
//           <select
//             className="select select-bordered"
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//           >
//             <option value="all">همه نقش‌ها</option>
//             <option value="patient">بیمار 🧑‍⚕️</option>
//             <option value="dentist">دندان‌پزشک 🦷</option>
//             <option value="admin">ادمین 🛠️</option>
//           </select>
//         </div>
//       </div>

//       {/* جدول کاربران */}
//       <div className="bg-base-100 rounded-xl shadow">
//         <table className="table table-fixed w-full text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th className="w-1/4">کاربر</th>
//               <th className="w-1/6">نقش</th>
//               <th className="w-1/4">شماره تماس</th>
//               <th className="w-1/4">تاریخ عضویت</th>
//               <th className="w-1/6">عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td className="flex items-center gap-3 truncate">
//                   <div className="avatar">
//                     <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                       <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
//                     </div>
//                   </div>
//                   <span className="font-bold">{user.name}</span>
//                 </td>
//                 <td>
//                   <span className={`badge`}>
//                     {roleLabels[user.role]}
//                   </span>
//                 </td>
//                 <td>{user.phone}</td>
//                 <td>{user.joined}</td>
//                 <td>
//                   <button
//                     onClick={() => navigate(`/admin-panel/users/${user.id}`)}
//                     className="btn btn-sm btn-outline btn-info"
//                   >
//                     <FaEye className="mr-1" /> مشاهده
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center text-base-content/60 py-6">
//                   هیچ کاربری یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// ------------------------------------------------------------------------------


// import React, { useEffect, useState } from 'react';
// import { FaEye, FaTrashAlt } from 'react-icons/fa';
// import supabase from '@/api/supabase';


// const usersStatic = [
//   { id: 1, name: 'علی رضایی', role: 'dentist', phone: '09123456789', email: 'ali@dentist.com', joined: '1404/06/01', isActive: true },
//   { id: 2, name: 'مریم احمدی', role: 'patient', phone: '09351234567', email: 'maryadfbgbgm@patient.com', joined: '1404/06/03', isActive: true },
//   { id: 3, name: 'سارا محمدی', role: 'admin', phone: '09121234567', email: 'sara@admin.com', joined: '1404/06/05', isActive: false },
// ];

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'badge-error',
//   dentist: 'badge-info',
//   patient: 'badge-success',
// };

// export default function UsersPage() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   // const [selectedUser, setSelectedUser] = useState(null);
//   const [users, setUsers] = useState(null);


//   // let { data: profiles, error } = await supabase
//   // .from('profiles')
//   // .select('*')
//   useEffect(() => {
//     fetchDentistProfile()
//   }, []);

//   const fetchDentistProfile = async () => {
    
    
//     const { data, error } = await supabase
//       .from("profiles")
//       .select('*')
//     if (error || !data) {
//       setError("خطا در دریافت داده های کاربران");
//     } else {
//       setUsers(data);
//       console.log(data);

//     }

//     // setLoading(false);
//   };
//   const filteredUsers = usersStatic.filter((user) => {
//     const matchesSearch = user.name.includes(search) || user.phone.includes(search);
//     const matchesRole = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

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
//           تعداد کل: {usersStatic.length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام یا شماره..."
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
//       </div>

//       {/* جدول کاربران */}
//       <div className="bg-base-100 rounded-xl shadow">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>نام</th>
//               <th>نقش</th>
//               <th>شماره</th>
//               <th>ایمیل</th>
//               <th>وضعیت</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td className="font-bold">{user.name}</td>
//                 <td><span className={`badge ${roleColors[user.role]}`}>{roleLabels[user.role]}</span></td>
//                 <td>{user.phone}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   {user.isActive ? (
//                     <span className="badge badge-outline badge-success">فعال</span>
//                   ) : (
//                     <span className="badge badge-outline badge-error">غیرفعال</span>
//                   )}
//                 </td>
//                 <td className="flex gap-2">
//                   <button
//                     className="btn btn-sm btn-outline btn-info"
//                     // onClick={() => setSelectedUser(user)}
//                   >
//                     <FaEye className="mr-1" /> جزئیات
//                   </button>
//                   <button
//                     className="btn btn-sm btn-outline btn-error"
//                     onClick={() => alert(`کاربر ${user.name} حذف شد.`)}
//                   >
//                     <FaTrashAlt className="mr-1" /> حذف
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center text-base-content/60 py-6">
//                   هیچ کاربری یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal جزئیات کاربر */}
//       {/* {selectedUser && (
//         <dialog id="user-details" className="modal modal-open">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg mb-2">جزئیات کاربر</h3>
//             <p><strong>نام:</strong> {selectedUser.name}</p>
//             <p><strong>نقش:</strong> {roleLabels[selectedUser.role]}</p>
//             <p><strong>شماره:</strong> {selectedUser.phone}</p>
//             <p><strong>ایمیل:</strong> {selectedUser.email}</p>
//             <p><strong>تاریخ عضویت:</strong> {selectedUser.joined}</p>
//             <p><strong>وضعیت:</strong> {selectedUser.isActive ? 'فعال' : 'غیرفعال'}</p>
//             <div className="modal-action">
//               <button className="btn" onClick={() => setSelectedUser(null)}>بستن</button>
//             </div>
//           </div>
//         </dialog>
//       )} */}
//     </div>
//   );
// }










// import React, { useEffect, useState } from 'react';
// import { FaEye, FaTrashAlt, FaUser } from 'react-icons/fa';
// import supabase from '@/api/supabase';

// const usersStatic = [
//   { 
//     id: 1, 
//     name: 'علی رضایی', 
//     role: 'dentist', 
//     phone: '09123456789', 
//     email: 'ali@dentist.com', 
//     joined: '1404/06/01', 
//     isActive: true,
//     avatar_url: null 
//   },
//   { 
//     id: 2, 
//     name: 'مریم احمدی', 
//     role: 'patient', 
//     phone: '09351234567', 
//     email: 'maryam@patient.com', 
//     joined: '1404/06/03', 
//     isActive: true,
//     avatar_url: null 
//   },
//   { 
//     id: 3, 
//     name: 'سارا محمدی', 
//     role: 'admin', 
//     phone: '09121234567', 
//     email: 'sara@admin.com', 
//     joined: '1404/06/05', 
//     isActive: false,
//     avatar_url: null 
//   },
// ];

// const roleLabels = {
//   admin: 'ادمین',
//   dentist: 'دندان‌پزشک',
//   patient: 'بیمار',
// };

// const roleColors = {
//   admin: 'badge-error',
//   dentist: 'badge-info',
//   patient: 'badge-success',
// };

// export default function UsersPage() {
//   const [search, setSearch] = useState('');
//   const [filterRole, setFilterRole] = useState('all');
//   const [users, setUsers] = useState(null);

//   useEffect(() => {
//     fetchUsersProfile();
//   }, []);

//   const fetchUsersProfile = async () => {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select('*');
    
//     if (error || !data) {
//       console.error("خطا در دریافت داده های کاربران:", error);
//       // در صورت خطا از داده‌های استاتیک استفاده می‌کنیم
//       setUsers(usersStatic);
//     } else {
//       setUsers(data);
//       console.log(data);
//     }
//   };

//   const filteredUsers = (users || usersStatic).filter((user) => {
//     const matchesSearch = user.name?.includes(search) || user.phone?.includes(search);
//     const matchesRole = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesRole;
//   });

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
//           تعداد کل: {(users || usersStatic).length} | نمایش داده شده: {filteredUsers.length}
//         </p>
//       </div>

//       {/* فیلتر و جستجو */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام یا شماره..."
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
//       </div>

//       {/* جدول کاربران */}
//       <div className="bg-base-100 rounded-xl shadow overflow-x-auto">
//         <table className="table table-zebra text-sm">
//           <thead className="bg-base-300 text-base-content">
//             <tr>
//               <th>عکس</th>
//               <th>نام</th>
//               <th>نقش</th>
//               <th>شماره</th>
//               <th>ایمیل</th>
//               <th>وضعیت</th>
//               <th>عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td>
//                   <div className="avatar">
//                     <div className="w-10 h-10 rounded-full">
//                       {user.avatar_url ? (
//                         <img 
//                           src={user.avatar_url} 
//                           alt={user.name}
//                           className="rounded-full object-cover"
//                           onError={(e) => {
//                             e.target.style.display = 'none';
//                             e.target.nextSibling.style.display = 'flex';
//                           }}
//                         />
//                       ) : (
//                         <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
//                           <FaUser className="text-base-content/60" />
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="font-bold">{user.name}</td>
//                 <td>
//                   <span className={`badge ${roleColors[user.role]}`}>
//                     {roleLabels[user.role]}
//                   </span>
//                 </td>
//                 <td>{user.phone}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   {user.isActive ? (
//                     <span className="badge badge-outline badge-success">فعال</span>
//                   ) : (
//                     <span className="badge badge-outline badge-error">غیرفعال</span>
//                   )}
//                 </td>
//                 <td>
//                   <div className="flex gap-2">
//                     <button
//                       className="btn btn-sm btn-outline btn-info"
//                     >
//                       <FaEye className="mr-1" /> جزئیات
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline btn-error"
//                       onClick={() => alert(`کاربر ${user.name} حذف شد.`)}
//                     >
//                       <FaTrashAlt className="mr-1" /> حذف
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//             {filteredUsers.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center text-base-content/60 py-6">
//                   هیچ کاربری یافت نشد.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }















import React, { useState, useMemo } from 'react';
import { FaEye, FaTrashAlt, FaUser } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/api/supabase';
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
  console.log(data);
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
