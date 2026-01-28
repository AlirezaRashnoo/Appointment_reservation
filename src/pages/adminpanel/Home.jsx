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



