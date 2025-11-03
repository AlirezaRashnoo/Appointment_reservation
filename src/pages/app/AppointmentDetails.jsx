// import React from "react";
// import Header from "../../component/Header";
// import Button from "../../component/Button";
// import { IoChevronBackOutline } from "react-icons/io5";

// function AppointmentDetails() {
//     return (
//         <>
//             <Header />
//             <div className="flex items-center justify-between gap-x-5 text-sm mx-3">
//                 <Button href="#" className="flex items-center gap-x-2 mt-7 px-3 py-3 border border-gray-300 rounded-3xl">
//                     <div>آیکن</div>
//                     <p>بازگشت به پروفایل دندانپزشک</p>
//                 </Button>
//                 <Button href="#" className="inline-flex items-center gap-x-2 bg-blue-500 text-white mt-7 px-3 py-3 border border-gray-300 rounded-3xl">
//                     <p>رفتن به صفحه خانه</p>
//                     <div>آیکن</div>
//                 </Button>
//             </div>
//             <div className="mt-12">
//                 <div className="container">
//                     <div className="w-full px-3 py-6 border border-gray-300 shadow-Main rounded-xl">
//                         <div className="mb-7 text-center">
//                             <h4 className="text-lg font-semibold">لطفا مشخصات خود را وارد کنید</h4>
//                         </div>
//                         <div>
//                             <form className="space-y-3">
//                                 {/* <div className="space-y-2">
//                                     <label htmlFor="name" className="text-sm">
//                                         نام
//                                         <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="px-1.5">
//                                         <input type="text" className="w-full border border-gray-300 rounded-xl px-2 py-1.5 outline-none placeholder:text-xs" placeholder="نام"/>
//                                     </div>
//                                 </div> */}
//                                 <div className="space-y-2">
//                                     <label htmlFor="name" className="text-sm">
//                                         نام و نام خانوادگی
//                                         <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="px-1.5">
//                                         <input type="text" className="w-full border border-gray-300 rounded-xl px-2 py-1.5 outline-none placeholder:text-xs" placeholder="نام و نام خانوادگی"/>
//                                     </div>
//                                 </div>
//                                 {/* <div className="space-y-2">
//                                     <label htmlFor="name" className="text-sm">
//                                        شماره تماس
//                                         <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="px-1.5">
//                                         <input type="text" className="w-full border border-gray-300 rounded-xl px-2 py-1.5 outline-none placeholder:text-xs" placeholder="شماره تماس"/>
//                                     </div>
//                                 </div> */}
//                                 <div className="space-y-2 pb-3">
//                                     <label htmlFor="name" className="text-sm">
//                                         سال تولد
//                                         <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="px-1.5">
//                                         <input type="text" className="w-full border border-gray-300 rounded-xl px-2 py-1.5 outline-none placeholder:text-xs" placeholder="سال تولد"/>
//                                     </div>
//                                 </div>
//                                 {/* <div className="space-y-2 pb-3">
//                                     <label htmlFor="name" className="text-sm">
//                                         بیمه
//                                         <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="px-1.5">
//                                         <input type="" className="w-full border border-gray-300 rounded-xl px-2 py-1.5 outline-none placeholder:text-xs" placeholder="سال تولد"/>
//                                     </div>
//                                 </div> */}
//                                 <Button href="#" className="flex items-center justify-center bg-green-400 w-32 rounded-3xl h-10 text-white px-3">
//                                     ثبت نوبت
//                                     {/* <IoChevronBackOutline className="size-6"/> */}
//                                 </Button>                               
//                             </form>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             <div className="container mb-96">
//                 <div className="mt-10 py-3 px-3.5 bg-blue-100 rounded-xl">
//                     <div className="flex items-center gap-x-4 pb-4 border-b border-dashed border-black/10">
//                         <div className="inline-block mr-2 size-[90px] overflow-hidden border border-gray-200 rounded-full">
//                             <img src="../images/dentist_img.webp" className="size-full object-cover" alt="profile_img" />
//                         </div>
//                         <div className="inline-block w-fit relative text-right">
//                             <h1 className="text-base">دکتر آزاده انجم روز</h1>
//                             <span className="text-[13px]">جراح - دندانپزشک</span>
//                         </div>
//                     </div>
//                     <div className="text-sm">
//                         <div className="child:py-3 child:border-b child:border-black/5">
//                             <div className="flex items-center justify-between">
//                                 <p>تاریخ نوبت</p>
//                                 <p>یکشنبه , 25 خرداد</p>
//                             </div>
//                             <div className="flex items-center justify-between">
//                                 <p>ساعت نوبت</p>
//                                 <p>14:30</p>
//                             </div>
//                         </div>
//                         <div className="pt-3">
//                             <p>آدرس: شیراز خیابان فلسطین(باغشاه), تقاطع هدایت , ساختمان سبز , طبقه اول , واحد اول</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//          );
// }

// export default AppointmentDetails;



// -----------------------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import supabase from "@/api/supabase";
// import { useUserStore } from "@/stores/useUserStore";

// export default function AppointmentDetails() {
//   const { appointmentId } = useParams();
//   const patient = useUserStore((state) => state.profile); // اطلاعات بیمار از Zustand
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
//     <div className="max-w-3xl mx-auto mt-8 space-y-8">
//       {/* اطلاعات بیمار */}
//       <section className="bg-white shadow rounded-xl p-4 border border-gray-200">
//         <h2 className="text-lg font-bold text-blue-700 mb-4">اطلاعات بیمار</h2>
//         <div className="flex items-center gap-4">
//           <img src={patient.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover" loading="lazy" />
//           <div>
//             <p><strong>نام:</strong> {patient.name} {patient.last_name}</p>
//             <p><strong>شماره تماس:</strong> {patient.phone}</p>
//           </div>
//         </div>
//         <div className="mt-4 text-sm text-gray-700">
//           <p><strong>تاریخ نوبت:</strong> {formattedDate}</p>
//           <p><strong>ساعت نوبت:</strong> {formattedTime}</p>
//         </div>
//       </section>

//       {/* اطلاعات دندان‌پزشک */}
//       <section className="bg-white shadow rounded-xl p-4 border border-gray-200">
//         <h2 className="text-lg font-bold text-green-700 mb-4">اطلاعات دندان‌پزشک</h2>
//         <div className="flex items-center gap-4">
//           <img src={dentist.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover" loading="lazy" />
//           <div>
//             <p><strong>نام:</strong> {dentist.name} {dentist.last_name}</p>
//             <p><strong>تخصص:</strong> {dentist.specialty}</p>
//             <p><strong>شماره تماس:</strong> {dentist.phone}</p>
//           </div>
//         </div>
//         <div className="mt-4 text-sm text-gray-700">
//           <p><strong>آدرس مطب:</strong> {dentist.address}</p>
//         </div>
//       </section>
//     </div>
//   );
// }



// -----------------------------------------------------------------------------------------------


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";
import { IoCalendarOutline, IoTimeOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineMedicalServices, MdLocationOn } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
 
export default function AppointmentDetails() {
  const { appointmentId } = useParams();
  const patient = useUserStore((state) => state.profile);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appointmentId) {
      setError("شناسه نوبت معتبر نیست");
      setLoading(false);
      return;
    }

    async function fetchAppointment() {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          id,
          appointment_time,
          dentist:dentist_id(id, name, phone, avatar_url, specialty, address)
        `)
        .eq("id", appointmentId)
        .maybeSingle();

      if (error) {
        console.error("خطا در دریافت نوبت:", error);
        setError("خطا در دریافت اطلاعات نوبت");
      } else if (!data) {
        setError("نوبت مورد نظر یافت نشد");
      } else {
        setAppointment(data);
      }

      setLoading(false);
    }

    fetchAppointment();
  }, [appointmentId]);

  if (loading) return <div className="text-center mt-10">در حال بارگذاری...</div>;
  if (error || !appointment || !patient) return <div className="text-center mt-10 text-red-500">{error || "اطلاعات یافت نشد"}</div>;

  const { dentist, appointment_time } = appointment;
  const date = new Date(appointment_time);
  const formattedDate = date.toLocaleDateString("fa-IR", { weekday: "long", day: "numeric", month: "long" });
  const formattedTime = date.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });

  
  return (

  <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-2xl border border-gray-200 p-6 font-vazir">
  {/* هدر رسید */}
  <div className="text-center mb-8">
    <h1 className="text-2xl font-extrabold text-blue-700">📄 رسید نوبت پزشکی</h1>
    <p className="text-sm text-gray-500 mt-1">این رسید جهت تأیید رزرو نوبت صادر شده است</p>
  </div>

  {/* اطلاعات نوبت */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
    <div className="flex items-center gap-2">
      <span className="text-blue-500">🗓️</span>
      <span><strong>تاریخ نوبت:</strong> {formattedDate}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-blue-500">⏰</span>
      <span><strong>ساعت نوبت:</strong> {formattedTime}</span>
    </div>
  </div>

  <hr className="border-gray-300 my-4" />

  {/* اطلاعات بیمار */}
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-blue-600 mb-3">👤 اطلاعات بیمار</h2>
    <div className="flex items-center gap-4">
    {patient?.avatar_url?(
      <div className="relative w-[115px] h-[115px] flex-shrink-0">
          <img
          src="./images/dentist_box_backgroundImag.svg"
          alt="background"
          className="absolute inset-0 w-full h-full  object-cover rounded-full"
          />
          <img
          src={patient.avatar_url || "/default-avatar.png"}
          alt={patient.name}
          className="absolute inset-0 w-[70%] h-[70%] m-auto rounded-full object-cover border-2 border-white shadow"
          />
      </div>
        ):(
        <FaCircleUser className="size-16 fill-gray-500" />
      )}
      {/* <img src={patient.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover border border-gray-300" /> */}
      <div className="text-sm text-gray-800 space-y-1">
        <p><strong>نام:</strong> {patient.name} {patient.last_name}</p>
        <p><strong>شماره تماس:</strong> {patient.phone}</p>
      </div>
    </div>
  </section>

  <hr className="border-gray-300 my-4" />

  {/* اطلاعات دندان‌پزشک */}
  <section>
    <h2 className="text-lg font-semibold text-green-600 mb-3">🩺 اطلاعات دندان‌پزشک</h2>
    <div className="flex items-center gap-4">
      <img src={dentist.avatar_url} alt="avatar" className="w-16 h-16 rounded-full object-cover border border-gray-300" />
      <div className="text-sm text-gray-800 space-y-1">
        <p><strong>نام:</strong> {dentist.name}</p>
        <p><strong>تخصص:</strong> {dentist.specialty}</p>
        <p><strong>شماره تماس:</strong> {dentist.phone}</p>
        <p><strong>آدرس مطب:</strong> {dentist.address}</p>
      </div>
    </div>
  </section>

  {/* راهنمای پایانی */}
  <div className="mt-8 text-center text-xs text-gray-500 italic">
    لطفاً ۱۵ دقیقه قبل از زمان نوبت در مطب حضور داشته باشید.  
    در صورت نیاز به لغو نوبت، با شماره مطب تماس بگیرید.
  </div>
</div>
  );
}


// -----------------------------------------------------------------------------------------------




