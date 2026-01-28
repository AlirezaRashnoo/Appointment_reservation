import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Time from "../../component/Time";
import Button from "../../component/Button";
import { IoChevronBackOutline } from "react-icons/io5";
import { useAppointmentStore } from "@/stores/appointment";
import { useUserStore } from "@/stores/useUserStore";
// import supabase from "@/api/supabase";
import { toast, Bounce } from "react-toastify";
import { eachMinuteOfInterval, format } from "date-fns";
import dayjs from "dayjs";
import jalaliPlugin from "dayjs-jalali";

dayjs.extend(jalaliPlugin);

function TimeVisit() {
//   const { id: dentistId } = useParams();
//   const {
//     selectedTime,
//     selectedDate,
//     setSelectedDate,
//     clearSelectedTime,
//     clearSelectedDate,
//   } = useAppointmentStore();
//   const { profile } = useUserStore();

//   const [morningSlots, setMorningSlots] = useState([]);
//   const [afternoonSlots, setAfternoonSlots] = useState([]);
//   const [dateList, setDateList] = useState([]);
//   const [workingDays, setWorkingDays] = useState([]);

//   // واکشی روزهای کاری دندان‌پزشک
//   useEffect(() => {
//     const fetchWorkingDays = async () => {
//       if (!dentistId) return;

//       const { data, error } = await supabase
//         .from("dentist_schedule")
//         .select("day_of_week")
//         .eq("dentist_id", dentistId);

//       if (error) {
//         console.error(error);
//         toast.error("خطا در واکشی روزهای کاری", { transition: Bounce });
//         return;
//       }

//       const days = data.map((d) => d.day_of_week);
//       setWorkingDays(days);
//     };

//     fetchWorkingDays();
//   }, [dentistId]);

//   // تولید تاریخ‌های آینده فقط برای روزهای کاری (۷ روز آینده)
//   useEffect(() => {
//     const generateNextDays = (count = 7) => {
//       const days = [];
//       const today = new Date();
//       for (let i = 0; i < count; i++) {
//         const date = new Date(today);
//         date.setDate(today.getDate() + i);

//         const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
//         if (workingDays.includes(dayOfWeek)) {
//           days.push(date);
//         }
//       }
//       return days;
//     };

//     if (workingDays.length > 0) {
//       setDateList(generateNextDays(7));
//     } else {
//       setDateList([]);
//     }
//   }, [workingDays]);

//   // واکشی زمان‌های آزاد وقتی تاریخ انتخاب شد
//   useEffect(() => {
//     const fetchFreeSlots = async () => {
//       if (!selectedDate || !dentistId) return;

//       const dayOfWeek = new Date(selectedDate).toLocaleDateString("en-US", {
//         weekday: "long",
//       });

//       try {
//         const { data: schedule } = await supabase
//           .from("dentist_schedule")
//           .select("*")
//           .eq("dentist_id", dentistId)
//           .eq("day_of_week", dayOfWeek)
//           .single();

//         if (!schedule) {
//           toast.info("برای این روز برنامه‌ای ثبت نشده است", { transition: Bounce });
//           setMorningSlots([]);
//           setAfternoonSlots([]);
//           return;
//         }

//         const { data: appointments } = await supabase
//           .from("appointments")
//           .select("appointment_time")
//           .eq("dentist_id", dentistId)
//           .in("status", ["pending", "confirmed"])
//           .gte("appointment_time", `${format(new Date(selectedDate), "yyyy-MM-dd")}T00:00:00`)
//           .lt("appointment_time", `${format(new Date(selectedDate), "yyyy-MM-dd")}T23:59:59`);

//         const reservedTimes =
//           appointments?.map((a) => format(new Date(a.appointment_time), "HH:mm")) || [];

//         const slots = eachMinuteOfInterval(
//           {
//             start: new Date(`${format(selectedDate, "yyyy-MM-dd")}T${schedule.start_time}`),
//             end: new Date(`${format(selectedDate, "yyyy-MM-dd")}T${schedule.end_time}`),
//           },
//           { step: 30 }
//         ).map((d) => format(d, "HH:mm"));

//         const free = slots.filter((s) => !reservedTimes.includes(s));
//         const morning = free.filter((t) => t < "13:00");
//         const afternoon = free.filter((t) => t >= "13:00");

//         setMorningSlots(morning);
//         setAfternoonSlots(afternoon);
//       } catch (err) {
//         console.error("Error fetching schedule:", err);
//         toast.error("خطا در واکشی برنامه کاری", { transition: Bounce });
//         setMorningSlots([]);
//         setAfternoonSlots([]);
//       }
//     };

//     fetchFreeSlots();
//   }, [selectedDate, dentistId]);

//   const handleReserve = async () => {
//     if (!selectedDate || !selectedTime) {
//       toast.info("لطفاً تاریخ و ساعت نوبت را انتخاب کنید", { transition: Bounce });
//       return;
//     }
//     if (!profile || profile.role !== "patient") {
//       toast.error("فقط بیماران می‌توانند نوبت رزرو کنند", { transition: Bounce });
//       return;
//     }

//     const appointmentDate = new Date(selectedDate);
//     const [hour, minute] = selectedTime.split(":");
//     appointmentDate.setHours(Number(hour));
//     appointmentDate.setMinutes(Number(minute));

//     // تاریخ میلادی (ISO)
//     const isoDate = appointmentDate.toISOString();

//     // تاریخ شمسی صحیح با dayjs-jalali
//     const jalaliDate = dayjs(appointmentDate).format("jYYYY/jMM/jDD");

//     const { data, error } = await supabase
//       .from("appointments")
//       .insert({
//         patient_id: profile.id,
//         dentist_id: dentistId,
//         appointment_time: isoDate,           // میلادی
//         appointment_date_jalali: jalaliDate, // شمسی
//         status: "pending",
//       })
//       .select();

//     if (error) {
//       toast.error("خطا در ثبت نوبت", { transition: Bounce });
//     } else {
//       toast.success("نوبت با موفقیت ثبت شد", { transition: Bounce });
//       clearSelectedTime();
//       clearSelectedDate();
//       window.location.replace(`appointment-Details/${data[0]?.id}`);
//     }
//   };

//     return (
//     <>
//       <header className="bg-gray-200 py-2 mb-6">
//         <div className="container">
//           <div className="flex items-center gap-x-5">
//             <Button href="/dentist">
//               <IoChevronBackOutline className="size-8 rotate-180" />
//             </Button>
//             <div>
//               <p className="font-bold text-lg">نوبت گیری اینترنتی مطب</p>
//               <p className="font-light text-sm">ابتدا تاریخ و سپس ساعت ویزیت را انتخاب کنید</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container space-y-8">
//         {/* نوار تاریخ‌ها */}
//         <div className="overflow-x-auto flex gap-2 pb-2 px-2">
//           {dateList.length === 0 ? (
//             <p className="text-gray-500">هیچ روز کاری برای این دندان‌پزشک در هفته آینده ثبت نشده است</p>
//           ) : (
//             dateList.map((date) => {
//               const formatted = date.toLocaleDateString("fa-IR", {
//                 weekday: "short",
//                 day: "numeric",
//                 month: "short",
//               });

//               const isSelected =
//                 selectedDate &&
//                 new Date(selectedDate).toDateString() === date.toDateString();

//               return (
//                 <button
//                   key={date.toISOString()}
//                   onClick={() => setSelectedDate(date)}
//                   className={`min-w-[90px] px-3 py-2 rounded-xl border text-sm transition ${
//                     isSelected ? "bg-blue-600 text-white" : "bg-white text-gray-700"
//                   }`}
//                 >
//                   {formatted}
//                 </button>
//               );
//             })
//           )}
//         </div>

//         {/* نمایش زمان‌های آزاد دسته‌بندی‌شده */}
//         {selectedDate ? (
//           <>
//             {morningSlots.length > 0 && (
//               <div>
//                 <p className="font-bold text-blue-600 mb-2">صبح</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {morningSlots.map((time) => (
//                     <Time key={time} time={time} />
//                   ))}
//                 </div>
//               </div>
//             )}

// {afternoonSlots.length > 0 && (
//               <div>
//                 <p className="font-bold text-blue-600 mb-2">عصر</p>
//                 <div className="flex flex-wrap gap-2">
//                   {afternoonSlots.map((time) => (
//                     <Time key={time} time={time} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {morningSlots.length === 0 && afternoonSlots.length === 0 && (
//               <p className="text-gray-500">هیچ زمان آزادی در این روز وجود ندارد</p>
//             )}
//           </>
//         ) : (
//           <p className="text-center text-sm text-gray-500 mt-6">
//             لطفاً ابتدا یک تاریخ انتخاب کنید
//           </p>
//         )}
//       </div>

//       {/* دکمه رزرو نهایی */}
//       <div className="fixed bottom-0 w-full bg-white h-[70px] p-3 shadow-Main border-t-2 border-black/10">
//         <div className="absolute left-2">
//           <Button
//             onClick={handleReserve}
//             className="flex items-center justify-between bg-blue-500 w-[120px] rounded-3xl h-10 text-white px-3"
//           >
//             رزرو نوبت
//             <IoChevronBackOutline className="size-6" />
//           </Button>
//         </div>
//       </div>
//     </>
//   );



  return(
    <div>انتخاب تایم ویزیت</div>
  )
}

export default TimeVisit;

