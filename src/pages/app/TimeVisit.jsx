// import React from "react";
// import Header from "../../component/Header";
// import Time from "../../component/Time";
// import Button from "../../component/Button";
// import { IoChevronBackOutline } from "react-icons/io5";
// import { IoSunny } from "react-icons/io5";
// import { BsSunsetFill } from "react-icons/bs";

// function TimeVisit() {

//     const morningTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
//     const eveningTimes = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];



//     return ( 
//         <>
//             {/* <Header /> */}
//             <header className="bg-gray-200 py-2 mb-10">
//                 <div className="container">
//                     <div className="flex items-center gap-x-5 ">
//                         <div>
//                             <Button href="/dentist" className="w-full h-[300px]">
//                                 <IoChevronBackOutline className="size-8 rotate-180"/>
//                             </Button>
//                         </div>
//                         <div className="">
//                             <p className="font-bold text-lg">نوبت گیری اینترنتی مطب</p>
//                             <p className="font-light text-sm">برای رزرو نوبت , ساعت ویزیت را انتخاب کنید</p>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//             <div className="container">
//                 <div className="space-y-4 mt-8">
//                     <div className="">
//                         <div className="flex items-center gap-x-1 pr-5 mb-3">
//                             <IoSunny className="size-6 fill-yellow-200"/>
//                             <div>صبح</div>
//                         </div>
//                         <div className="flex items-center gap-1.5 flex-wrap max-w-80 sm:max-w-[450px] child:w-20 child:h-9 child:border child:border-gray-400 child:px-1.5 child:py-1 child:rounded-xl">
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                         </div>
//                     </div>
//                     <div className="">
//                         <div className="flex items-center gap-x-1 pr-5 mb-3">
//                             <div></div>
//                             <BsSunsetFill className="size-6 fill-yellow-200"/>
//                             <div>عصر</div>
//                         </div>
//                         <div className="flex items-center gap-1.5 flex-wrap max-w-80 child:w-20 child:h-9 child:border child:border-gray-400 child:px-1.5 child:py-1 child:rounded-xl">
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                             <Time />        
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="fixed bottom-0 w-full bg-white h-[70px] p-3 shadow-Main border-t-2 border-black/10">
//                 <div className="absolute left-2">
//                     <Button href="rules" className="flex items-center justify-between bg-blue-500 w-[120px] rounded-3xl h-10 text-white px-3">
//                        رزرو نوبت 
//                         <IoChevronBackOutline className="size-6"/>
//                     </Button>
//                 </div>
//             </div>
//         </>
//      );
// }

// export default TimeVisit;



// -------------------------------------------------------------------------------



// import React from "react";
// import Time from "../../component/Time";
// import Button from "../../component/Button";
// import { IoChevronBackOutline, IoSunny } from "react-icons/io5";
// import { BsSunsetFill } from "react-icons/bs";
// import { useAppointmentStore } from "@/stores/appointment";
// import { useUserStore } from "@/stores/useUserStore";
// import supabase from "@/api/supabase";

// const morningTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
// const eveningTimes = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

// function TimeVisit({ dentistId }) {
//   const { selectedTime, clearSelectedTime } = useAppointmentStore();
//   const { profile } = useUserStore();

//   const handleReserve = async () => {
//     if (!selectedTime || !profile) {
//       alert("لطفاً یک ساعت را انتخاب کنید");
//       return;
//     }

//     const appointmentDate = new Date();
//     const [hour, minute] = selectedTime.split(":");
//     appointmentDate.setHours(Number(hour));
//     appointmentDate.setMinutes(Number(minute));
//     appointmentDate.setSeconds(0);

//     const { error } = await supabase.from("appointments").insert({
//       patient_id: profile.id,
//       dentist_id,
//       appointment_time: appointmentDate.toISOString(),
//       status: "pending",
//     });

//     if (error) {
//       console.error(error);
//       alert("خطا در ثبت نوبت");
//     } else {
//       alert("نوبت با موفقیت ثبت شد");
//       clearSelectedTime();
//     }
//   };

//   return (
//     <>
//       <header className="bg-gray-200 py-2 mb-10">
//         <div className="container">
//           <div className="flex items-center gap-x-5">
//             <Button href="/dentist">
//               <IoChevronBackOutline className="size-8 rotate-180" />
//             </Button>
//             <div>
//               <p className="font-bold text-lg">نوبت گیری اینترنتی مطب</p>
//               <p className="font-light text-sm">برای رزرو نوبت، ساعت ویزیت را انتخاب کنید</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container space-y-8">
//         <div>
//           <div className="flex items-center gap-x-1 pr-5 mb-3">
//             <IoSunny className="size-6 fill-yellow-200" />
//             <div>صبح</div>
//           </div>
//           <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//             {morningTimes.map((time) => (
//               <Time key={time} time={time} />
//             ))}
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center gap-x-1 pr-5 mb-3">
//             <BsSunsetFill className="size-6 fill-yellow-200" />
//             <div>عصر</div>
//           </div>
//           <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//             {eveningTimes.map((time) => (
//               <Time key={time} time={time} />
//             ))}
//           </div>
//         </div>
//       </div>

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
// }

// export default TimeVisit;



// --------------------------------------------------------------------------------------


// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Time from "../../component/Time";
// import Button from "../../component/Button";
// import { IoChevronBackOutline, IoSunny } from "react-icons/io5";
// import { BsSunsetFill } from "react-icons/bs";
// import { useAppointmentStore } from "@/stores/appointment";
// import { useUserStore } from "@/stores/useUserStore";
// import supabase from "@/api/supabase";

// const morningTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
// const eveningTimes = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

// function TimeVisit() {
//   const { id } = useParams();
// //   const navigate = useNavigate();
//   const { selectedTime, clearSelectedTime } = useAppointmentStore();
//   const { profile } = useUserStore();

//   // console.log(id);

//   const handleReserve = async () => {
//     if (!selectedTime) {
//       alert("لطفاً یک ساعت را انتخاب کنید");
//       return;
//     }

//     if (!profile || profile.role !== "patient") {
//       alert("فقط بیماران می‌توانند نوبت رزرو کنند");
//       return;
//     }

//     if (!id) {
//       alert("شناسه دندان‌پزشک نامعتبر است");
//       return;
//     }

//     const appointmentDate = new Date();
//     const [hour, minute] = selectedTime.split(":");
//     appointmentDate.setHours(Number(hour));
//     appointmentDate.setMinutes(Number(minute));
//     appointmentDate.setSeconds(0);




//   const { data, error } = await supabase
//   .from("appointments")
//   .insert({
//     patient_id: profile.id,
//     dentist_id: id,
//     appointment_time: appointmentDate.toISOString(),
//     status: "pending",
//   })
//   .select(); // این خط باعث میشه داده‌ی ثبت‌شده برگرده

// if (error) {
//   console.error(error);
//   alert("خطا در ثبت نوبت");
// } else {
//   console.log(data[0]?.id); // لاگ گرفتن ریسپانس
//   alert("نوبت با موفقیت ثبت شد");
//   clearSelectedTime();
//   window.location.replace(`appointment-Details/${data[0]?.id}`);
// }


//   };

//   return (
//     <>
//       <header className="bg-gray-200 py-2 mb-10">
//         <div className="container">
//           <div className="flex items-center gap-x-5">
//             <Button href="/dentist">
//               <IoChevronBackOutline className="size-8 rotate-180" />
//             </Button>
//             <div>
//               <p className="font-bold text-lg">نوبت گیری اینترنتی مطب</p>
//               <p className="font-light text-sm">برای رزرو نوبت، ساعت ویزیت را انتخاب کنید</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container space-y-8">
//         <div>
//           <div className="flex items-center gap-x-1 pr-5 mb-3">
//             <IoSunny className="size-6 fill-yellow-200" />
//             <div>صبح</div>
//           </div>
//           <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//             {morningTimes.map((time) => (
//               <Time key={time} time={time} />
//             ))}
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center gap-x-1 pr-5 mb-3">
//             <BsSunsetFill className="size-6 fill-yellow-200" />
//             <div>عصر</div>
//           </div>
//           <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//             {eveningTimes.map((time) => (
//               <Time key={time} time={time} />
//             ))}
//           </div>
//         </div>
//       </div>

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
// }

// export default TimeVisit;



// -----------------------------------------------------------------------------------------


// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Time from "../../component/Time";
// import Button from "../../component/Button";
// import { IoChevronBackOutline, IoSunny } from "react-icons/io5";
// import { BsSunsetFill } from "react-icons/bs";
// import { useAppointmentStore } from "@/stores/appointment";
// import { useUserStore } from "@/stores/useUserStore";
// import supabase from "@/api/supabase";

// const morningTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
// const eveningTimes = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

// function TimeVisit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { selectedTime, selectedDate, setSelectedDate, clearSelectedTime, clearSelectedDate } = useAppointmentStore();
//   const { profile } = useUserStore();

//   const handleReserve = async () => {
//     if (!selectedDate || !selectedTime) {
//       alert("لطفاً تاریخ و ساعت نوبت را انتخاب کنید");
//       return;
//     }

//     if (!profile || profile.role !== "patient") {
//       alert("فقط بیماران می‌توانند نوبت رزرو کنند");
//       return;
//     }

//     if (!id) {
//       alert("شناسه دندان‌پزشک نامعتبر است");
//       return;
//     }

//     const appointmentDate = new Date(selectedDate);
//     const [hour, minute] = selectedTime.split(":");
//     appointmentDate.setHours(Number(hour));
//     appointmentDate.setMinutes(Number(minute));
//     appointmentDate.setSeconds(0);

//     const { data, error } = await supabase
//       .from("appointments")
//       .insert({
//         patient_id: profile.id,
//         dentist_id: id,
//         appointment_time: appointmentDate.toISOString(),
//         status: "pending",
//       })
//       .select();

//     if (error) {
//       console.error(error);
//       alert("خطا در ثبت نوبت");
//     } else {
//       alert("نوبت با موفقیت ثبت شد");
//       clearSelectedTime();
//       clearSelectedDate();
//       navigate(`/appointment-Details/${data[0]?.id}`);
//     }
//   };

//   const generateNext7Days = () => {
//     const days = [];
//     const today = new Date();
//     for (let i = 0; i < 7; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       days.push(date);
//     }
//     return days;
//   };

//   const dateList = generateNext7Days();

//   return (
//     <>
//       <header className="bg-gray-200 py-2 mb-10">
//         <div className="container">
//           <div className="flex items-center gap-x-5">
//             <Button href="/dentist">
//               <IoChevronBackOutline className="size-8 rotate-180" />
//             </Button>
//             <div>
//               <p className="font-bold text-lg">نوبت گیری اینترنتی مطب</p>
//               <p className="font-light text-sm">برای رزرو نوبت، ابتدا تاریخ و سپس ساعت را انتخاب کنید</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="container space-y-8">
//         {/* انتخاب تاریخ */}
//         <div className="overflow-x-auto flex gap-2 pb-2">
//           {dateList.map((date) => {
//             const formatted = date.toLocaleDateString("fa-IR", {
//               weekday: "short",
//               day: "numeric",
//               month: "short",
//             });

//             const isSelected =
//               selectedDate &&
//               new Date(selectedDate).toDateString() === date.toDateString();

//             return (
//               <button
//                 key={date.toISOString()}
//                 onClick={() => setSelectedDate(date)}
//                 className={`min-w-[100px] px-3 py-2 rounded-xl border ${
//                   isSelected ? "bg-blue-500 text-white" : "bg-white text-gray-700"
//                 }`}
//               >
//                 {formatted}
//               </button>
//             );
//           })}
//         </div>

//         {/* انتخاب ساعت */}
//         {selectedDate ? (
//           <>
//             <div>
//               <div className="flex items-center gap-x-1 pr-5 mb-3">
//                 <IoSunny className="size-6 fill-yellow-200" />
//                 <div>صبح</div>
//               </div>
//               <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//                 {morningTimes.map((time) => (
//                   <Time key={time} time={time} />
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center gap-x-1 pr-5 mb-3">
//                 <BsSunsetFill className="size-6 fill-yellow-200" />
//                 <div>عصر</div>
//               </div>
//               <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//                 {eveningTimes.map((time) => (
//                   <Time key={time} time={time} />
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-sm text-gray-500">لطفاً ابتدا یک تاریخ انتخاب کنید</p>
//         )}
//       </div>

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
// }

// export default TimeVisit;


// ------------------------------------------------------------------------------------


// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Time from "../../component/Time";
// import Button from "../../component/Button";
// import { IoChevronBackOutline, IoSunny } from "react-icons/io5";
// import { BsSunsetFill } from "react-icons/bs";
// import { useAppointmentStore } from "@/stores/appointment";
// import { useUserStore } from "@/stores/useUserStore";
// import supabase from "@/api/supabase";
// import { Calendar } from "react-modern-calendar-datepicker";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";

// const morningTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
// const eveningTimes = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

// function TimeVisit() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const {
//     selectedTime,
//     selectedDate,
//     setSelectedDate,
//     clearSelectedTime,
//     clearSelectedDate,
//   } = useAppointmentStore();
//   const { profile } = useUserStore();

//   const handleReserve = async () => {
//     if (!selectedDate || !selectedTime) {
//       alert("لطفاً تاریخ و ساعت نوبت را انتخاب کنید");
//       return;
//     }

//     if (!profile || profile.role !== "patient") {
//       alert("فقط بیماران می‌توانند نوبت رزرو کنند");
//       return;
//     }

//     if (!id) {
//       alert("شناسه دندان‌پزشک نامعتبر است");
//       return;
//     }

//     const appointmentDate = new Date(
//       selectedDate.year,
//       selectedDate.month - 1,
//       selectedDate.day,
//       ...selectedTime.split(":").map(Number)
//     );

//     const { data, error } = await supabase
//       .from("appointments")
//       .insert({
//         patient_id: profile.id,
//         dentist_id: id,
//         appointment_time: appointmentDate.toISOString(),
//         status: "pending",
//       })
//       .select();

//     if (error) {
//       console.error(error);
//       alert("خطا در ثبت نوبت");
//     } else {
//       alert("نوبت با موفقیت ثبت شد");
//       clearSelectedTime();
//       clearSelectedDate();
//       navigate(`/appointment-Details/${data[0]?.id}`);
//     }
//   };

//   return (
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
//         {/* انتخاب تاریخ */}
        // <div className="max-w-xs mx-auto">
        //   <Calendar
        //     value={selectedDate}
        //     onChange={setSelectedDate}
        //     shouldHighlightWeekends
        //     locale="fa"
        //     calendarClassName="rounded-xl border border-gray-300 shadow-sm"
        //     colorPrimary="#3b82f6"
        //   />
        // </div>

//         {/* انتخاب ساعت */}
//         {selectedDate ? (
//           <>
//             <div>
//               <div className="flex items-center gap-x-1 pr-5 mb-3 mt-6">
//                 <IoSunny className="size-6 fill-yellow-200" />
//                 <div>صبح</div>
//               </div>
//               <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//                 {morningTimes.map((time) => (
//                   <Time key={time} time={time} />
//                 ))}
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center gap-x-1 pr-5 mb-3">
//                 <BsSunsetFill className="size-6 fill-yellow-200" />
//                 <div>عصر</div>
//               </div>
//               <div className="flex flex-wrap gap-1.5 max-w-[450px]">
//                 {eveningTimes.map((time) => (
//                   <Time key={time} time={time} />
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-sm text-gray-500 mt-6">لطفاً ابتدا یک تاریخ انتخاب کنید</p>
//         )}
//       </div>

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
// }

// export default TimeVisit;




// --------------------------------------------------------------------------------------



import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Time from "../../component/Time";
import Button from "../../component/Button";
import { IoChevronBackOutline, IoSunny } from "react-icons/io5";
import { BsSunsetFill } from "react-icons/bs";
import { useAppointmentStore } from "@/stores/appointment";
import { useUserStore } from "@/stores/useUserStore";
import supabase from "@/api/supabase";
import {toast,Bounce } from "react-toastify";

const morningTimes = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00"];
const eveningTimes = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

function TimeVisit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedTime,
    selectedDate,
    setSelectedDate,
    clearSelectedTime,
    clearSelectedDate,
  } = useAppointmentStore();
  const { profile } = useUserStore();

  const handleReserve = async () => {
    if (!selectedDate || !selectedTime) {
      // alert("لطفاً تاریخ و ساعت نوبت را انتخاب کنید");
      toast.info("لطفاً تاریخ و ساعت نوبت را انتخاب کنید", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
      return;
    }

    if (!profile || profile.role !== "patient") {
      // alert("فقط بیماران می‌توانند نوبت رزرو کنند");
      toast.error('فقط بیماران می‌توانند نوبت رزرو کنند', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
      return;
    }

    if (!id) {
      // alert("شناسه دندان‌پزشک نامعتبر است");
      toast.error("شناسه دندان‌پزشک نامعتبر است", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
      return;
    }

    const appointmentDate = new Date(selectedDate);
    const [hour, minute] = selectedTime.split(":");
    appointmentDate.setHours(Number(hour));
    appointmentDate.setMinutes(Number(minute));
    appointmentDate.setSeconds(0);

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        patient_id: profile.id,
        dentist_id: id,
        appointment_time: appointmentDate.toISOString(),
        status: "pending",
      })
      .select();

    if (error) {
      console.error(error);
      // alert("خطا در ثبت نوبت");
      toast.error("خطا در ثبت نوبت", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
      
    } else {
      // alert("نوبت با موفقیت ثبت شد");
      toast.success("نوبت با موفقیت ثبت شد", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
      clearSelectedTime();
      clearSelectedDate();
      // navigate(`/appointment-Details/${data[0]?.id}`);
      window.location.replace(`appointment-Details/${data[0]?.id}`);
    }
  };

  const generateNextDays = (count = 30) => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const dateList = generateNextDays();

  return (
    <>
      <header className="bg-gray-200 py-2 mb-6">
        <div className="container">
          <div className="flex items-center gap-x-5">
            <Button href="/dentist">
              <IoChevronBackOutline className="size-8 rotate-180" />
            </Button>
            <div>
              <p className="font-bold text-lg">نوبت گیری اینترنتی مطب</p>
              <p className="font-light text-sm">ابتدا تاریخ و سپس ساعت ویزیت را انتخاب کنید</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container space-y-8">
        {/* نوار تاریخ‌ها */}
        <div className="overflow-x-auto flex gap-2 pb-2 px-2">
          {dateList.map((date) => {
            const formatted = date.toLocaleDateString("fa-IR", {
              weekday: "short",
              day: "numeric",
              month: "short",
            });

            const isSelected =
              selectedDate &&
              new Date(selectedDate).toDateString() === date.toDateString();

            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`min-w-[90px] px-3 py-2 rounded-xl border text-sm transition ${
                  isSelected ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                }`}
              >
                {formatted}
              </button>
            );
          })}
        </div>

        {/* ساعت‌ها */}
        {selectedDate ? (
          <>
            <div>
              <div className="flex items-center gap-x-1 pr-5 mb-3 mt-6">
                <IoSunny className="size-6 fill-yellow-200" />
                <div>صبح</div>
              </div>
              <div className="flex flex-wrap gap-1.5 max-w-[450px]">
                {morningTimes.map((time) => (
                  <Time key={time} time={time} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-x-1 pr-5 mb-3">
                <BsSunsetFill className="size-6 fill-yellow-200" />
                <div>عصر</div>
              </div>
              <div className="flex flex-wrap gap-1.5 max-w-[450px]">
                {eveningTimes.map((time) => (
                  <Time key={time} time={time} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-sm text-gray-500 mt-6">لطفاً ابتدا یک تاریخ انتخاب کنید</p>
        )}
      </div>

      <div className="fixed bottom-0 w-full bg-white h-[70px] p-3 shadow-Main border-t-2 border-black/10">
        <div className="absolute left-2">
          <Button
            onClick={handleReserve}
            className="flex items-center justify-between bg-blue-500 w-[120px] rounded-3xl h-10 text-white px-3"
          >
            رزرو نوبت
            <IoChevronBackOutline className="size-6" />
          </Button>
        </div>
      </div>
      
    </>
  );
}

export default TimeVisit;



