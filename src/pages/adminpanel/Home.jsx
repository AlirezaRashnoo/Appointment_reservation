// import React from "react";
// import Card from "../../component/paneladmin/Card";
// import TitlePages from "../../component/paneladmin/TitlePages";
// import Button from "../../component/Button";
// function Home() {
//     return ( 
//         <>
//         <TitlePages title="صفحه اصلی"/>
//             <div className="space-y-6">
//                 <div className="grid grid-cols-3 gap-3 child:rounded-lg">
//                     <Card title="کاربران" number="5,563" description="تعداد کل کاربران سایت"/>
//                     <Card title="نوبت های ثبت شده امروز" number="46" description="مجوع نوبت های ثبت شده امروز"/>
//                     <Card title="تعداد پزشکان" number="540" description="تعداد کل پزشکان"/>
//                     <Card title="نوبت های ثبت شده" number="12,469" description="تعداد کل نوبت های ثبت شده تا به امروز"/>
//                     <Card title="تعداد بیماران " number="5,023" description="تعداد کل بیماران"/>
//                     <Card title="مجموع تبلیغات پزشکان" number="6,423" description="تعداد کل تبلیغات موجود در سایت"/>
//                 </div>
//                 {/* const Button = ({type} )=>{
//         return <button className={"WidghetLgButton " + type}>{type}</button>
//     } */}
//                 {/* flex-[2]  */}
//                 <div className="flex gap-x-2">
                                     
//                      <div className="w-full mb-6 p-3 shadow shadow-[rgba(0,0,0,0.75)] bg-white rounded-lg max-h-96 xl:max-h-[480px] overflow-y-auto">
//                         <h3 className="text-lg font-semibold mb-3">آخرین کاربران ثبت نام شده</h3>
//                         <table className="w-full">
//                             <tr className="child:text-right h-11">
//                                 <th>نام و نام خانوادگی</th>
//                                 <th>تاریخ</th>
//                                 {/* <th>شماره تلفن</th> */}
//                                 <th>ایمیل</th>
//                                 <th>نوع کاربر</th>
//                             </tr>
//                             {/* {transactions.map(transaction =>(
//                             ))} */}
                           
//                             <tr className="text-sm child:h-14">
//                                 <td className="flex items-center">
//                                     <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                                     <div className="max-w-28 line-clamp-2">
//                                         <span className="">امیر محمد احمدی پور چگنی</span>
//                                     </div>
//                                 </td>
//                                 <td className="font-light">
//                                     1404/2/13
//                                 </td>
//                                 <td className="font-light">
//                                     alirezarashnoo85@gmail.com
//                                 </td>
//                                 <td>
//                                     <p className="w-full flex items-center justify-center">بیمار</p>
//                                 </td>
//                             </tr>
//                             <tr className="text-sm child:h-14">
//                                 <td className="flex items-center">
//                                     <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                                     <div className="max-w-28 line-clamp-2">
//                                         <span className="">امیر محمد احمدی پور چگنی</span>
//                                     </div>
//                                 </td>
//                                 <td className="font-light">
//                                     1404/2/13
//                                 </td>
//                                 <td className="font-light">
//                                     alirezarashnoo85@gmail.com
//                                 </td>
//                                 <td>
//                                     <p className="w-full flex items-center justify-center">بیمار</p>
//                                 </td>
//                             </tr>
//                             <tr className="text-sm child:h-14">
//                                 <td className="flex items-center">
//                                     <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                                     <div className="max-w-28 line-clamp-2">
//                                         <span className="">امیر محمد احمدی پور چگنی</span>
//                                     </div>
//                                 </td>
//                                 <td className="font-light">
//                                     1404/2/13
//                                 </td>
//                                 <td className="font-light">
//                                     alirezarashnoo85@gmail.com
//                                 </td>
//                                 <td>
//                                     <p className="w-full flex items-center justify-center">بیمار</p>
//                                 </td>
//                             </tr>
//                             <tr className="text-sm child:h-14">
//                                 <td className="flex items-center">
//                                     <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                                     <div className="max-w-28 line-clamp-2">
//                                         <span className="">امیر محمد احمدی پور چگنی</span>
//                                     </div>
//                                 </td>
//                                 <td className="font-light">
//                                     1404/2/13
//                                 </td>
//                                 <td className="font-light">
//                                     alirezarashnoo85@gmail.com
//                                 </td>
//                                 <td>
//                                     <p className="w-full flex items-center justify-center">بیمار</p>
//                                 </td>
//                             </tr>
//                             <tr className="text-sm child:h-14">
//                                 <td className="flex items-center">
//                                     <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                                     <div className="max-w-28 line-clamp-2">
//                                         <span className="">امیر محمد احمدی پور چگنی</span>
//                                     </div>
//                                 </td>
//                                 <td className="font-light">
//                                     1404/2/13
//                                 </td>
//                                 <td className="font-light">
//                                     alirezarashnoo85@gmail.com
//                                 </td>
//                                 <td>
//                                     <p className="w-full flex items-center justify-center">بیمار</p>
//                                 </td>
//                             </tr>
//                             <tr className="text-sm child:h-14">
//                                 <td className="flex items-center">
//                                     <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                                     <div className="max-w-28 line-clamp-2">
//                                         <span className="">امیر محمد احمدی پور چگنی</span>
//                                     </div>
//                                 </td>
//                                 <td className="font-light">
//                                     1404/2/13
//                                 </td>
//                                 <td className="font-light">
//                                     alirezarashnoo85@gmail.com
//                                 </td>
//                                 <td>
//                                     <p className="w-full flex items-center justify-center">بیمار</p>
//                                 </td>
//                             </tr>
//                             <tr className="text-sm child:h-14">
//                                 <td className="flex items-center">
//                                     <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                                     <div className="max-w-28 line-clamp-2">
//                                         <span className="">امیر محمد احمدی پور چگنی</span>
//                                     </div>
//                                 </td>
//                                 <td className="font-light">
//                                     1404/2/13
//                                 </td>
//                                 <td className="font-light">
//                                     alirezarashnoo85@gmail.com
//                                 </td>
//                                 <td>
//                                     <p className="w-full flex items-center justify-center">بیمار</p>
//                                 </td>
//                             </tr>
                           
                            
//                         </table>
//                      </div>                       
                                         
                                          

//                 </div>

                
//             </div>
//         </>
//      );
// }

// export default Home;



// ---------------------------------------------------------------------------



// import React from 'react';

// const stats = [
//   { label: 'دندان‌پزشکان', value: 12, color: 'bg-blue-500' },
//   { label: 'بیماران', value: 87, color: 'bg-green-500' },
//   { label: 'نوبت‌ها', value: 230, color: 'bg-purple-500' },
//   { label: 'در انتظار', value: 14, color: 'bg-yellow-500' },
// ];

// const recentAppointments = [
//   {
//     id: 1,
//     patient: 'علی رضایی',
//     dentist: 'دکتر ناصری',
//     time: '1404/07/01 - 10:30',
//     status: 'در انتظار',
//   },
//   {
//     id: 2,
//     patient: 'مریم احمدی',
//     dentist: 'دکتر شریفی',
//     time: '1404/07/01 - 12:00',
//     status: 'تأیید شده',
//   },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800">داشبورد مدیریت</h1>

//       {/* کارت‌های آماری */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className={`rounded-xl shadow-md p-6 text-white ${stat.color}`}
//           >
//             <div className="text-sm">{stat.label}</div>
//             <div className="text-2xl font-bold">{stat.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* جدول نوبت‌ها */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">نوبت‌های اخیر</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-right">
//             <thead>
//               <tr className="border-b text-gray-500">
//                 <th className="py-2 px-4">بیمار</th>
//                 <th className="py-2 px-4">دندان‌پزشک</th>
//                 <th className="py-2 px-4">زمان</th>
//                 <th className="py-2 px-4">وضعیت</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentAppointments.map((appt) => (
//                 <tr key={appt.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-4">{appt.patient}</td>
//                   <td className="py-2 px-4">{appt.dentist}</td>
//                   <td className="py-2 px-4">{appt.time}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         appt.status === 'در انتظار'
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : 'bg-green-100 text-green-700'
//                       }`}
//                     >
//                       {appt.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// ---------------------------------------------------------------------------




// import React from 'react';
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from 'recharts';

// const stats = [
//   { label: 'دندان‌پزشکان', value: 12, color: 'bg-blue-500' },
//   { label: 'بیماران', value: 87, color: 'bg-green-500' },
//   { label: 'نوبت‌ها', value: 230, color: 'bg-purple-500' },
//   { label: 'در انتظار', value: 14, color: 'bg-yellow-500' },
// ];

// const appointmentData = [
//   { date: '26 شهریور', count: 5 },
//   { date: '27 شهریور', count: 8 },
//   { date: '28 شهریور', count: 4 },
//   { date: '29 شهریور', count: 10 },
//   { date: '30 شهریور', count: 7 },
// ];

// const roleData = [
//   { name: 'دندان‌پزشک', value: 12 },
//   { name: 'بیمار', value: 87 },
//   { name: 'ادمین', value: 1 },
// ];

// const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

// const recentAppointments = [
//   {
//     id: 1,
//     patient: 'علی رضایی',
//     dentist: 'دکتر ناصری',
//     time: '1404/07/01 - 10:30',
//     status: 'در انتظار',
//   },
//   {
//     id: 2,
//     patient: 'مریم احمدی',
//     dentist: 'دکتر شریفی',
//     time: '1404/07/01 - 12:00',
//     status: 'تأیید شده',
//   },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800">داشبورد مدیریت</h1>

//       {/* کارت‌های آماری */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className={`rounded-xl shadow-md p-6 text-white ${stat.color}`}
//           >
//             <div className="text-sm">{stat.label}</div>
//             <div className="text-2xl font-bold">{stat.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* نمودارها */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">روند نوبت‌ها در هفته اخیر</h3>
//           <LineChart width={400} height={250} data={appointmentData}>
//             <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
//             <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//           </LineChart>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6">
//           <h3 className="text-lg font-semibold mb-4 text-gray-700">ترکیب نقش کاربران</h3>
//           <PieChart width={400} height={250}>
//             <Pie
//               data={roleData}
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//               dataKey="value"
//             >
//               {roleData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>
//       </div>

//       {/* جدول نوبت‌ها */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">نوبت‌های اخیر</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-right">
//             <thead>
//               <tr className="border-b text-gray-500">
//                 <th className="py-2 px-4">بیمار</th>
//                 <th className="py-2 px-4">دندان‌پزشک</th>
//                 <th className="py-2 px-4">زمان</th>
//                 <th className="py-2 px-4">وضعیت</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentAppointments.map((appt) => (
//                 <tr key={appt.id} className="border-b hover:bg-gray-100">
//                   <td className="py-2 px-4">{appt.patient}</td>
//                   <td className="py-2 px-4">{appt.dentist}</td>
//                   <td className="py-2 px-4">{appt.time}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${
//                         appt.status === 'در انتظار'
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : 'bg-green-100 text-green-700'
//                       }`}
//                     >
//                       {appt.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// --------------------------------------------------------------------------------------






// import React from 'react';
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const stats = [
//   { label: 'دندان‌پزشکان', value: 12, color: 'bg-blue-600' },
//   { label: 'بیماران', value: 87, color: 'bg-green-600' },
//   { label: 'نوبت‌ها', value: 230, color: 'bg-indigo-600' },
//   { label: 'در انتظار', value: 14, color: 'bg-yellow-500' },
// ];

// const appointmentData = [
//   { date: '26 شهریور', count: 5 },
//   { date: '27 شهریور', count: 8 },
//   { date: '28 شهریور', count: 4 },
//   { date: '29 شهریور', count: 10 },
//   { date: '30 شهریور', count: 7 },
// ];

// const recentAppointments = [
//   {
//     id: 1,
//     patient: 'علی رضایی',
//     dentist: 'دکتر ناصری',
//     time: '1404/07/01 - 10:30',
//     status: 'در انتظار',
//   },
//   {
//     id: 2,
//     patient: 'مریم احمدی',
//     dentist: 'دکتر شریفی',
//     time: '1404/07/01 - 12:00',
//     status: 'تأیید شده',
//   },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className="p-6 space-y-10 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-gray-800">داشبورد مدیریت</h1>

//       {/* کارت‌های آماری */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className={`rounded-lg shadow-sm p-5 text-white ${stat.color} hover:scale-[1.02] transition-transform`}
//           >
//             <div className="text-sm opacity-80">{stat.label}</div>
//             <div className="text-3xl font-bold mt-2">{stat.value}</div>
//           </div>
//         ))}
//       </div>

//       {/* نمودار خطی */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-6 text-gray-700">روند نوبت‌ها در هفته اخیر</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={appointmentData}>
//             <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
//             <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* جدول نوبت‌ها */}
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-6">نوبت‌های اخیر</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-right">
//             <thead>
//               <tr className="border-b bg-gray-50 text-gray-600">
//                 <th className="py-3 px-4">بیمار</th>
//                 <th className="py-3 px-4">دندان‌پزشک</th>
//                 <th className="py-3 px-4">زمان</th>
//                 <th className="py-3 px-4">وضعیت</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentAppointments.map((appt) => (
//                 <tr key={appt.id} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">{appt.patient}</td>
//                   <td className="py-3 px-4">{appt.dentist}</td>
//                   <td className="py-3 px-4">{appt.time}</td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         appt.status === 'در انتظار'
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : 'bg-green-100 text-green-700'
//                       }`}
//                     >
//                       {appt.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




// -----------------------------------------------------------------------------



// import React from 'react';
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { FaUserMd, FaUserInjured, FaCalendarAlt, FaClock } from 'react-icons/fa';

// const stats = [
//   { label: 'دندان‌پزشکان', value: 12, icon: <FaUserMd className="text-3xl text-blue-600" /> },
//   { label: 'بیماران', value: 87, icon: <FaUserInjured className="text-3xl text-green-600" /> },
//   { label: 'نوبت‌ها', value: 230, icon: <FaCalendarAlt className="text-3xl text-indigo-600" /> },
//   { label: 'در انتظار', value: 14, icon: <FaClock className="text-3xl text-yellow-500" /> },
// ];

// const appointmentData = [
//   { date: '26 شهریور', count: 5 },
//   { date: '27 شهریور', count: 8 },
//   { date: '28 شهریور', count: 4 },
//   { date: '29 شهریور', count: 10 },
//   { date: '30 شهریور', count: 7 },
// ];

// const recentAppointments = [
//   {
//     id: 1,
//     patient: 'علی رضایی',
//     dentist: 'دکتر ناصری',
//     time: '1404/07/01 - 10:30',
//     status: 'در انتظار',
//   },
//   {
//     id: 2,
//     patient: 'مریم احمدی',
//     dentist: 'دکتر شریفی',
//     time: '1404/07/01 - 12:00',
//     status: 'تأیید شده',
//   },
// ];

// export default function AdminDashboard() {
//   return (
//     <div className="p-6 space-y-10 bg-base-200 min-h-screen">
//       <h1 className="text-4xl font-extrabold text-gray-800">داشبورد مدیریت</h1>

//       {/* کارت‌های آماری */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div key={stat.label} className="card bg-base-100 shadow-xl">
//             <div className="card-body items-center text-center">
//               {stat.icon}
//               <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
//               <div className="text-3xl font-bold text-primary">{stat.value}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* نمودار خطی */}
//       <div className="card bg-base-100 shadow-md p-6">
//         <h3 className="text-xl font-semibold mb-6 text-gray-700">روند نوبت‌ها در هفته اخیر</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={appointmentData}>
//             <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
//             <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* جدول نوبت‌ها */}
//       <div className="card bg-base-100 shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-6">نوبت‌های اخیر</h2>
//         <div className="overflow-x-auto">
//           <table className="table table-zebra text-sm text-right">
//             <thead>
//               <tr className="text-gray-600">
//                 <th>بیمار</th>
//                 <th>دندان‌پزشک</th>
//                 <th>زمان</th>
//                 <th>وضعیت</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentAppointments.map((appt) => (
//                 <tr key={appt.id}>
//                   <td>{appt.patient}</td>
//                   <td>{appt.dentist}</td>
//                   <td>{appt.time}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         appt.status === 'در انتظار' ? 'badge-warning' : 'badge-success'
//                       }`}
//                     >
//                       {appt.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }




// ------------------------------------------------------------------------------


import React from 'react'
import {
  FaUserMd,
  FaUserInjured,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaBell,
  FaPlus,
  FaUsersCog,
  FaCogs,
} from 'react-icons/fa'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function AdminDashboard() {
  const stats = [
    { label: 'کاربران', value: 120, icon: <FaUserInjured className="text-3xl text-green-600" /> },
    { label: 'دندان‌پزشک‌ها', value: 35, icon: <FaUserMd className="text-3xl text-blue-600" /> },
    { label: 'نوبت‌ها', value: 210, icon: <FaCalendarAlt className="text-3xl text-indigo-600" /> },
    { label: 'در انتظار', value: 14, icon: <FaClock className="text-3xl text-yellow-500" /> },
    { label: 'تأیید پزشک', value: 5, icon: <FaCheckCircle className="text-3xl text-red-500" /> },
  ]

  const appointmentData = [
    { date: '26 شهریور', count: 5 },
    { date: '27 شهریور', count: 8 },
    { date: '28 شهریور', count: 4 },
    { date: '29 شهریور', count: 10 },
    { date: '30 شهریور', count: 7 },
  ]

  const recentAppointments = [
    {
      id: 1,
      patient: 'علی رضایی',
      dentist: 'دکتر ناصری',
      time: '1404/07/01 - 10:30',
      status: 'در انتظار',
    },
    {
      id: 2,
      patient: 'مریم احمدی',
      dentist: 'دکتر شریفی',
      time: '1404/07/01 - 12:00',
      status: 'تأیید شده',
    },
  ]

  const pendingDentists = [
    { id: 1, name: 'دکتر فاطمه قاسمی', specialty: 'ارتودنسی' },
    { id: 2, name: 'دکتر محمدی', specialty: 'جراحی لثه' },
  ]

  const notifications = [
    { id: 1, message: 'پیام جدید از دکتر ناصری', time: '2 ساعت پیش' },
    { id: 2, message: 'کاربر جدید ثبت‌نام کرد', time: '5 ساعت پیش' },
  ]

  return (
    <div className="p-6 space-y-10 bg-base-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800">داشبورد مدیریت</h1>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              {stat.icon}
              <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* نمودار نوبت‌ها */}
      <div className="card bg-base-100 shadow-md p-6">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">روند نوبت‌ها در هفته اخیر</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={appointmentData}>
            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* جدول نوبت‌های اخیر */}
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">نوبت‌های اخیر</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm text-right">
            <thead>
              <tr className="text-gray-600">
                <th>بیمار</th>
                <th>دندان‌پزشک</th>
                <th>زمان</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {recentAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.patient}</td>
                  <td>{appt.dentist}</td>
                  <td>{appt.time}</td>
                  <td>
                    <span
                      className={`badge ${
                        appt.status === 'در انتظار' ? 'badge-warning' : 'badge-success'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* درخواست تأیید پزشک‌ها */}
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">درخواست‌های تأیید پزشک</h2>
        <ul className="space-y-4">
          {pendingDentists.map((dentist) => (
            <li key={dentist.id} className="flex justify-between items-center">
              <div>
                <p className="font-bold">{dentist.name}</p>
                <p className="text-sm text-gray-500">{dentist.specialty}</p>
              </div>
              <div className="space-x-2">
                <button className="btn btn-sm btn-success">تأیید</button>
                <button className="btn btn-sm btn-error">رد</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* اعلان‌ها */}
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">اعلان‌ها</h2>
        <ul className="space-y-3">
          {notifications.map((note) => (
            <li key={note.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaBell className="text-yellow-500" />
                <span>{note.message}</span>
              </div>
              <span className="text-xs text-gray-400">{note.time}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* میان‌برهای مدیریتی */}
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">میان‌برهای مدیریتی</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="btn btn-outline btn-primary flex items-center gap-2">
            <FaPlus /> افزودن پزشک جدید
          </button>
          <button className="btn btn-outline btn-secondary flex items-center gap-2">
            <FaUsersCog /> مدیریت کاربران
          </button>
          <button className="btn btn-outline btn-accent flex items-center gap-2">
            <FaCogs /> تنظیمات سایت
          </button>
        </div>
      </div>
    </div>
  )
}



