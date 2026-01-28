import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";
import { IoCalendarOutline, IoTimeOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineMedicalServices, MdLocationOn } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
 
export default function AppointmentDetails() {
//   const { appointmentId } = useParams();
//   const patient = useUserStore((state) => state.profile);
//   const [appointment, setAppointment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!appointmentId) {
//       setError("شناسه نوبت معتبر نیست");
//       setLoading(false);
//       return;
//     }

//     async function fetchAppointment() {
//       const { data, error } = await supabase
//         .from("appointments")
//         .select(`
//           id,
//           appointment_time,
//           dentist:dentist_id(id, name, phone, avatar_url, specialty, address)
//         `)
//         .eq("id", appointmentId)
//         .maybeSingle();

//       if (error) {
//         console.error("خطا در دریافت نوبت:", error);
//         setError("خطا در دریافت اطلاعات نوبت");
//       } else if (!data) {
//         setError("نوبت مورد نظر یافت نشد");
//       } else {
//         setAppointment(data);
//       }

//       setLoading(false);
//     }

//     fetchAppointment();
//   }, [appointmentId]);

//   if (loading) return <div className="text-center mt-10">در حال بارگذاری...</div>;
//   if (error || !appointment || !patient) return <div className="text-center mt-10 text-red-500">{error || "اطلاعات یافت نشد"}</div>;

//   const { dentist, appointment_time } = appointment;
//   const date = new Date(appointment_time);
//   const formattedDate = date.toLocaleDateString("fa-IR", { weekday: "long", day: "numeric", month: "long" });
//   const formattedTime = date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

  
//   return (

//   <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl border border-gray-200 p-6 font-vazir">
//   {/* هدر رسید */}
//   <div className="text-center mb-8">
//     <h1 className="text-2xl font-extrabold text-blue-700">📄 رسید نوبت پزشکی</h1>
//     <p className="text-sm text-gray-500 mt-1">این رسید جهت تأیید رزرو نوبت صادر شده است</p>
//   </div>

//   {/* اطلاعات نوبت */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
//     <div className="flex items-center gap-2">
//       <span className="text-blue-500">🗓️</span>
//       <span><strong>تاریخ نوبت:</strong> {formattedDate}</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <span className="text-blue-500">⏰</span>
//       <span><strong>ساعت نوبت:</strong> {formattedTime}</span>
//     </div>
//   </div>

//   <hr className="border-gray-300 my-4" />

//   {/* اطلاعات بیمار */}
//   <section className="mb-6">
//     <h2 className="text-lg font-semibold text-blue-600 mb-3">👤 اطلاعات بیمار</h2>
//     <div className="flex items-center gap-4">
//     {patient?.avatar_url?(
//       <div className="relative w-[115px] h-[115px] flex-shrink-0">
//           <img
//           src={patient.avatar_url || "/default-avatar.png"}
//           alt={patient.name}
//           className="absolute inset-0 w-[70%] h-[70%] m-auto rounded-full object-cover border-2 border-white shadow"
//           />
//       </div>
//         ):(
//         <FaCircleUser className="size-16 fill-gray-500" />
//       )}
//       {/* <img src={patient.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover border border-gray-300" /> */}
//       <div className="text-sm text-gray-800 space-y-1">
//         <p><strong>نام:</strong> {patient.name} {patient.last_name}</p>
//         <p><strong>شماره تماس:</strong> {patient.phone}</p>
//       </div>
//     </div>
//   </section>

//   <hr className="border-gray-300 my-4" />

//   {/* اطلاعات دندان‌پزشک */}
//   <section>
//     <h2 className="text-lg font-semibold text-green-600 mb-3">🩺 اطلاعات دندان‌پزشک</h2>
//     <div className="flex items-center gap-4">
//       <img src={dentist.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover border border-gray-300" />
//       <div className="text-sm text-gray-800 space-y-1">
//         <p><strong>نام:</strong> {dentist.name}</p>
//         <p><strong>تخصص:</strong> {dentist.specialty}</p>
//         <p><strong>شماره تماس:</strong> {dentist.phone}</p>
//         <p><strong>آدرس مطب:</strong> {dentist.address}</p>
//       </div>
//     </div>
//   </section>

//   {/* راهنمای پایانی */}
//   <div className="mt-8 text-center text-xs text-gray-500 italic">
//     لطفاً ۱۵ دقیقه قبل از زمان نوبت در مطب حضور داشته باشید.  
//     در صورت نیاز به لغو نوبت، با شماره مطب تماس بگیرید.
//   </div>
// </div>
//   );








  return(
    <div>رسید نوبت</div>
  )
}

