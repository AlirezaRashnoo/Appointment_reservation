import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import supabase from '@/api/supabase';
import { useUserStore } from '@/stores/useUserStore';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { FaUser } from 'react-icons/fa6';
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import dayjs from "dayjs";
import moment from "moment-jalaali";



function AppointmentsDentist() {
//   const { profile } = useUserStore();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [selectedAppt, setSelectedAppt] = useState(null);

//   const { data, error, isLoading } = useQuery({
//     queryKey: ['appointments', profile?.id],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from('appointments')
//         .select(`
//           id,
//           appointment_time,
//           status,
//           patient:patient_id (
//             id,
//             name,
//             avatar_url,
//             phone,
//             email,
//             birthdate,
//             bio
//           )
//         `)
//         .eq('dentist_id', profile?.id)
//         .order('appointment_time', { ascending: true });

//       if (error) throw error;
//       return data;
//     }
//   });

//   if (isLoading) return <div className="loading loading-spinner text-primary"></div>;
//   if (error) return <p className="text-error">خطا در دریافت نوبت‌ها: {error.message}</p>;

//   // فیلتر و جستجو
//   const filteredData = data
//     ?.filter((appt) =>
//       appt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       appt.patient.phone.includes(searchTerm)
//     )
//     ?.filter((appt) =>
//       statusFilter === 'all' ? true : appt.status === statusFilter
//     );

//   // آمار کلی
//   const stats = {
//     total: data?.length || 0,
//     confirmed: data?.filter((a) => a.status === 'confirmed').length || 0,
//     pending: data?.filter((a) => a.status === 'pending').length || 0,
//     cancelled: data?.filter((a) => a.status === 'cancelled').length || 0,
//   };

//   const chartData = [
//     { name: 'تأیید شده', value: stats.confirmed },
//     { name: 'در انتظار', value: stats.pending },
//     { name: 'لغو شده', value: stats.cancelled },
//   ];

//   const COLORS = ['#22c55e', '#facc15', '#ef4444'];

//   // const updateStatus = async (id, newStatus) => {
//   //   await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
//   // };

//   const updateStatus = async (id, newStatus, patientName) => {
//     const { error } = await supabase
//       .from('appointments')
//       .update({ status: newStatus })
//       .eq('id', id);
  
//     if (error) {
//       toast.error(`خطا در تغییر وضعیت نوبت ${patientName}`);
//     } else {
//       if (newStatus === 'confirmed') {
//         toast.success(`نوبت ${patientName} با موفقیت تأیید شد ✅`);
//       } else if (newStatus === 'pending') {
//         toast.info(`نوبت ${patientName} در حالت انتظار قرار گرفت ⏳`);
//       } else if (newStatus === 'cancelled') {
//         toast.warn(`نوبت ${patientName} لغو شد ❌`);
//       }
//     }
//   };
  
//   // const deleteAppointment = async (id) => {
//   //   await supabase.from('appointments').delete().eq('id', id);
//   // };

//   const deleteAppointment = async (id, patientName) => {
//     const { error } = await supabase.from('appointments').delete().eq('id', id);
  
//     if (error) {
//       toast.error(`خطا در حذف نوبت ${patientName}`);
//     } else {
//       toast.success(`نوبت ${patientName} با موفقیت حذف شد 🗑️`);
//       queryClient.invalidateQueries(['appointments']); // برای رفرش لیست
//     }
//   };
  

//   return (
//     <div className="p-6 space-y-8 bg-base-200 min-h-screen">
//       {/* مسیر ناوبری */}
//       <div className="text-sm breadcrumbs">
//         <ul>
//           <li><a href="/dentist-panel">پنل دندان‌پزشک</a></li>
//           <li>نوبت‌ها</li>
//         </ul>
//       </div>
  
//       {/* تیتر و آمار */}
//       <div className="flex items-center justify-between flex-wrap gap-4">
//         <h1 className="text-3xl font-bold text-base-content">مدیریت نوبت‌ها</h1>
//         <p className="text-sm text-base-content/60">
//           تعداد کل: {data?.length || 0} | نمایش داده شده: {filteredData?.length || 0}
//         </p>
//       </div>
  
//       {/* آمار کلی + نمودار */}
//       <div className="stats shadow mb-6">
//         <div className="stat">
//           <div className="stat-title">کل نوبت‌ها</div>
//           <div className="stat-value">{stats.total}</div>
//         </div>
//         <div className="stat">
//           <div className="stat-title">تأیید شده</div>
//           <div className="stat-value text-success">{stats.confirmed}</div>
//         </div>
//         <div className="stat">
//           <div className="stat-title">در انتظار</div>
//           <div className="stat-value text-warning">{stats.pending}</div>
//         </div>
//         <div className="stat">
//           <div className="stat-title">لغو شده</div>
//           <div className="stat-value text-error">{stats.cancelled}</div>
//         </div>
//       </div>
  
//       <div className="mb-6 w-full h-64">
//   <ResponsiveContainer>
//     <PieChart>
//       <Pie
//         data={chartData}
//         cx="50%"
//         cy="50%"
//         innerRadius={60}
//         outerRadius={100}
//         paddingAngle={5}
//         dataKey="value"
//         isAnimationActive={true}
//         animationDuration={800}
//         animationEasing="ease-out"
//         label={({ name, value }) =>
//           `${name}: ${((value / stats.total) * 100).toFixed(1)}%`
//         }
//       >
//         {chartData.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index]} />
//         ))}
//       </Pie>
//       <Tooltip />
//       <Legend />
//       <text
//         x="50%"
//         y="50%"
//         textAnchor="middle"
//         dominantBaseline="middle"
//         className="text-xl font-bold"
//       >
//         {stats.total} کل
//       </text>
//     </PieChart>
//   </ResponsiveContainer>
// </div>

  
//       {/* فیلتر و جستجو */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام یا شماره..."
//           className="input input-bordered w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           className="select select-bordered w-full"
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="all">همه وضعیت‌ها</option>
//           <option value="confirmed">تأیید شده</option>
//           <option value="pending">در انتظار</option>
//           <option value="cancelled">لغو شده</option>
//         </select>
//       </div>
  
//       {/* جدول نوبت‌ها */}
//       {filteredData?.length === 0 ? (
//         <div className="alert alert-info">هیچ نوبتی یافت نشد.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table table-zebra w-full">
//             <thead>
//               <tr>
//                 <th>عکس پروفایل</th>
//                 <th>نام بیمار</th>
//                 <th>شماره تماس</th>
//                 <th>ایمیل</th>
//                 <th>زمان نوبت</th>
//                 <th>وضعیت</th>
//                 <th>اقدامات</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData?.map((appt) => (
//                 <tr key={appt.id}>
//                   <td>
//                     <div className="avatar">
//                       <div className="w-12 h-12 rounded-full">
//                         {appt.patient.avatar_url ? (
//                           <img 
//                             src={appt.patient.avatar_url} 
//                             alt={appt.patient.name || 'کاربر'}
//                             className="rounded-full object-cover w-10 h-10"
//                             loading="lazy"
//                             onError={(e) => {
//                               e.target.style.display = 'none';
//                             }}
//                           />
//                         ) : (
//                           <div className="w-12 h-12 rounded-full bg-base-300 flex items-center justify-center">
//                             <FaUser className="text-base-content/60" />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </td>
//                   <td>{appt.patient.name}</td>
//                   <td>{appt.patient.phone}</td>
//                   <td>{appt.patient.email || 'ثبت نشده'}</td>
//                   {/* <td>
//                     {new Date(appt.appointment_time).toLocaleDateString("fa-IR", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                       timeZone: "Asia/Tehran",   // 👈 اضافه کن
//                     })}
//                     {" - "}
//                     {new Date(appt.appointment_time).toLocaleTimeString("fa-IR", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       timeZone: "Asia/Tehran",   // 👈 اضافه کن
//                     })}
//                   </td> */}


//                     <td>
//                       {moment(appt.appointment_time).utcOffset(210).format("jYYYY/jMM/jDD")}
//                       {" - "}
//                       {moment(appt.appointment_time).utcOffset(210).format("HH:mm")}
//                     </td>
                   
//                     <td>
//                     {appt.status === 'confirmed' ? (
//                       <span className="text-green-500">تأیید شده</span>
//                     ) : appt.status === 'pending' ? (
//                       <span className="text-orange-500">در انتظار</span>
//                     ) : (
//                       <span className="text-red-500">لغو شده</span>
//                     )}
//                   </td>
//                   {/* <td className="flex gap-2">
//                     <button
//                       className="btn btn-sm btn-success"
//                       onClick={() => updateStatus(appt.id, 'confirmed')}
//                     >
//                       تأیید
//                     </button>
                    
//                     <button
//                       className="btn btn-sm btn-outline btn-error text-black"
//                       onClick={() => updateStatus(appt.id, 'cancelled')}
//                     >
//                       لغو
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline btn-info"
//                       onClick={() => setSelectedAppt(appt)}
//                     >
//                       جزئیات
//                     </button>
//                     <button
//                       className="btn btn-sm btn-error"
//                       onClick={() => deleteAppointment(appt.id)}
//                     >
//                       حذف
//                     </button>
//                   </td> */}
//                   <td className="flex gap-2">
//                     <button
//                       className="btn btn-sm btn-success"
//                       onClick={() => updateStatus(appt.id, 'confirmed', appt.patient.name)}
//                     >
//                       تأیید
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline btn-error text-black"
//                       onClick={() => updateStatus(appt.id, 'cancelled', appt.patient.name)}
//                     >
//                       لغو
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline btn-info"
//                       onClick={() => setSelectedAppt(appt)}
//                     >
//                       جزئیات
//                     </button>
//                     <button
//                       className="btn btn-sm btn-error"
//                       onClick={() => deleteAppointment(appt.id, appt.patient.name)}
//                     >
//                       حذف
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//            {/* مودال کلی */}
//            {selectedAppt && (
//         <dialog open className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg mb-4">جزئیات نوبت</h3>
//             <div className="space-y-3">
//               <p><strong>بیمار:</strong> {selectedAppt.patient.name}</p>
//               <p><strong>شماره تماس:</strong> {selectedAppt.patient.phone}</p>
//               <p><strong>ایمیل:</strong> {selectedAppt.patient.email || 'ثبت نشده'}</p>
//               <p><strong>تاریخ تولد:</strong> {selectedAppt.patient.birthdate || 'ثبت نشده'}</p>
//               <p><strong>زمان نوبت:</strong> {new Date(selectedAppt.appointment_time).toLocaleString()}</p>
//               <p>
//                 <strong>وضعیت:</strong>{' '}
//                 {selectedAppt.status === 'confirmed' ? (
//                   <span className="badge badge-success">تأیید شده</span>
//                 ) : selectedAppt.status === 'pending' ? (
//                   <span className="badge badge-warning">در انتظار</span>
//                 ) : (
//                   <span className="badge badge-error">لغو شده</span>
//                 )}
//               </p>
//             </div>

//             {/* بخش یادداشت پزشک */}
//             <div className="mt-4">
//               <label className="label">
//                 <span className="label-text">یادداشت پزشک</span>
//               </label>
//               <textarea
//                 className="textarea textarea-bordered w-full"
//                 placeholder="یادداشت یا توضیحات مربوط به این نوبت..."
//               ></textarea>
//             </div>

//             <div className="modal-action">
//               <button className="btn" onClick={() => setSelectedAppt(null)}>بستن</button>
//             </div>
//           </div>
//         </dialog>
//       )}
//     </div>
//   );



// --------------------------------New-------------------------------------------------

  return(
    
    <div>AppointmentsDentist</div>

  )

}

export default AppointmentsDentist;

