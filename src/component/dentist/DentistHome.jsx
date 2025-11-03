// import React from "react";
// import { useUserStore } from "@/stores/useUserStore";

// export default function DentistHome() {
//   const profile = useUserStore((state) => state.profile);

//   // نمونه داده‌های استاتیک برای آمار و اعلان (میتونی اینا رو از API بگیری)
//   const stats = {
//     todaysAppointments: 5,
//     upcomingAppointments: 12,
//     recentPatients: 8,
//   };

//   const notifications = [
//     "جلسه با بیمار جدید در ساعت ۱۵:۰۰",
//     "یادآوری تکمیل مدارک پزشکی",
//     "پیام جدید از مدیریت کلینیک",
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <header className="flex items-center justify-between mb-8">
//         <div className="flex items-center gap-4">
//           <img
//             src={profile?.avatar_url || "/default-avatar.png"}
//             alt="Profile"
//             className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
//           />
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               سلام، {profile?.name || "دندانپزشک عزیز"}
//             </h1>
//             <p className="text-gray-600">{profile?.specialty || "تخصص شما"}</p>
//           </div>
//         </div>
//       </header>

//       {/* Stats Cards */}
//       <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <h3 className="text-xl font-semibold mb-2 text-blue-600">نوبت‌های امروز</h3>
//           <p className="text-3xl font-bold">{stats.todaysAppointments}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <h3 className="text-xl font-semibold mb-2 text-green-600">نوبت‌های آینده</h3>
//           <p className="text-3xl font-bold">{stats.upcomingAppointments}</p>
//         </div>
//         <div className="bg-white rounded-lg shadow p-6 text-center">
//           <h3 className="text-xl font-semibold mb-2 text-purple-600">مراجعات اخیر</h3>
//           <p className="text-3xl font-bold">{stats.recentPatients}</p>
//         </div>
//       </section>

//       {/* Quick Actions */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">دسترسی سریع</h2>
//         <div className="flex flex-wrap gap-4">
//           <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
//             ثبت نوبت جدید
//           </button>
//           <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition">
//             مشاهده نوبت‌ها
//           </button>
//           <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition">
//             ویرایش پروفایل
//           </button>
//           <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600 transition">
//             پیام‌ها
//           </button>
//         </div>
//       </section>

//       {/* Notifications */}
//       <section>
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">اعلان‌ها</h2>
//         {notifications.length === 0 ? (
//           <p className="text-gray-500">اعلانی وجود ندارد.</p>
//         ) : (
//           <ul className="space-y-2">
//             {notifications.map((note, idx) => (
//               <li
//                 key={idx}
//                 className="bg-white p-4 rounded-lg shadow flex items-center gap-3 text-gray-700"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-blue-500"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 17h5l-1.405-1.405M19 13v-2a7 7 0 00-14 0v2m7 6v1m-4 0h8"
//                   />
//                 </svg>
//                 <span>{note}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// }



// ---------------------------------------------------


import React from "react";
import { useUserStore } from "@/stores/useUserStore";

export default function DentistDashboard() {
  const profile = useUserStore((state) => state.profile);

  const stats = [
    {
      title: "نوبت‌های امروز",
      value: 4,
      color: "blue",
      icon: "📅",
    },
    {
      title: "نوبت‌های آینده",
      value: 11,
      color: "green",
      icon: "⏳",
    },
    {
      title: "مراجعه‌کنندگان جدید",
      value: 3,
      color: "purple",
      icon: "🦷",
    },
  ];

  const quickActions = [
    { title: "ثبت نوبت", color: "blue", icon: "➕" },
    { title: "مدیریت بیماران", color: "teal", icon: "👥" },
    { title: "مشاهده پیام‌ها", color: "indigo", icon: "💬" },
    { title: "ویرایش پروفایل", color: "gray", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-600 shadow">
            <img
              src={profile?.avatar_url || "/default-avatar.png"}
              alt="avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              سلام، {profile?.name || "دندان‌پزشک عزیز"} 👋
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              {profile?.specialty || "تخصص ثبت نشده"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white p-6 rounded-xl shadow border-t-4 border-${stat.color}-500 transition hover:shadow-lg`}
          >
            <div className="flex items-center gap-4">
              <div className={`text-3xl`}>{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              className={`flex flex-col items-center justify-center gap-2 bg-${action.color}-100 text-${action.color}-700 hover:bg-${action.color}-200 rounded-xl p-4 transition`}
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="text-sm font-medium">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments - Placeholder */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">نوبت‌های آینده</h2>
        <div className="bg-white p-6 rounded-xl shadow text-gray-600 text-center">
          <p>فعلاً نوبتی ثبت نشده است.</p>
        </div>
      </div>
    </div>
  );
}