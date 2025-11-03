// import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// import supabase from "@/api/supabase";
// import VipCart from "@/component/VipCart";
// import Header from "@/component/Header";
// import Button from "@/component/Button";
// import { FaCircleUser } from "react-icons/fa6";

// export default function AllDentist() {
//   const [dentists, setDentists] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchDentists() {
//       const { data, error } = await supabase
//         .from("profiles")
//         .select("*")
//         .eq("role", "dentist")
//         .eq("DentistProfileStatus","published")

//       if (!error) setDentists(data);
//       setLoading(false);
//     }

//     fetchDentists();
//   }, []);

//   if (loading) return <div className="text-center mt-10">در حال بارگذاری لیست...</div>;

//   return (
//     <>
//         <Header />
//         <div className="mb-96">
//             <div className="container">
//                 <div className="my-[30px]">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-x-2">
//                             <img src="../images/Tooth_image.png" alt="Tooth" className="w-[30px] h-9" />
//                             <p className="text-sm">لیست دندان پزشکان</p>
//                         </div>
//                         <div>
//                             <Button className="flex items-center gap-x-7 bg-white shadow-Main text-xs px-4 h-10 rounded-2xl">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
//                                 </svg>
//                                 فیلتر ها
//                             </Button>
//                         </div>
//                     </div>
//                     <p className="text-[11px] text-gray-400 pt-2">{dentists.length} دندانپزشک</p>
//                 </div>
//                 {/* <div className="space-y-3">
//                     {dentists.map((dentist) => (
//                         // <a
//                         //   key={dentist.id}
//                         //   href={`/dentist/${dentist.id}`}
//                         //   className="block p-4 border rounded shadow hover:bg-gray-50 transition"
//                         // >
//                         //   <h3 className="text-lg font-bold">{dentist.name}</h3>
//                         //   <p className="text-gray-600">🎓 تخصص: {dentist.specialty}</p>
//                         //   <p className="text-gray-600">⏳ سابقه: {dentist.experience}</p>
//                         // </a>

                        
//                         <VipCart>
//                         <a key={dentist.id}
//                            href={`/dentist/${dentist.id}`}
//                         >
//                             <div className="flex items-center gap-x-5 px-3 pt-2 mb-4">
//                                 <div className="relative flex items-center justify-center size-[115px]">
//                                     <img src={dentist.avatar_url} alt="image" className="rounded-full w-[67%] absolute"/>
//                                     <img src="./images/dentist_box_backgroundImag.svg" alt="" className="w-full"/>
//                                 </div>
//                                 <div className="text-center">
//                                     <p className="text-[13px] mb-1.5">{dentist.name}</p>
//                                     <div className="space-y-2 text-xs text-gray-500">
//                                         <p>{dentist.specialty}</p>
//                                         <p> {dentist.experience} سال سابقه دندان پزشکی</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="relative -bottom-6 bg-blue-50 h-14 p-4">
//                                 <div className="flex items-center justify-between child:-mt-9">
//                                     <div className="flex items-center gap-x-2">
//                                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-gray-400">
//                                             <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
//                                         </svg>
//                                         <p className="text-[11px]">{dentist.address}</p>
//                                     </div>
//                                     <Button href={`/dentist/${dentist.id}`} className="flex items-center justify-center bg-blue-600 text-white px-2 h-8 rounded-xl text-sm">
//                                         دریافت نوبت
//                                     </Button>
//                                 </div>
//                             </div>
//                         </a>
//                         </VipCart>
//                     ))}
//                 </div> */}


// <div className="space-y-6">
//   {dentists.map((dentist) => (
//     <VipCart key={dentist.id}>
//       <a href={`/dentist/${dentist.id}`} className="block">
//         {/* بخش بالای کارت */}
//         <div className="flex items-center gap-4 px-4 pt-4">
//           {/* عکس پروفایل با بک‌گراند */}
//           {dentist.avatar_url?(
//             <div className="relative w-[115px] h-[115px] flex-shrink-0">
//               <img
//                 src="./images/dentist_box_backgroundImag.svg"
//                 alt="background"
//                 className="absolute inset-0 w-full h-full  object-cover rounded-full"
//               />
//               <img
//                 src={dentist.avatar_url || "/default-avatar.png"}
//                 alt={dentist.name}
//                 className="absolute inset-0 w-[70%] h-[70%] m-auto rounded-full object-cover border-2 border-white shadow"
//               />
//             </div>
//            ):(
//             <FaCircleUser className="size-16 fill-gray-500" />
//            )}

//           {/* اطلاعات دندان‌پزشک */}
//           <div className="flex-1 text-right">
//             <p className="text-base font-semibold text-gray-800 mb-1">{dentist.name}</p>
//             <div className="space-y-1 text-sm text-gray-500">
//               <p>🎓 {dentist.specialty}</p>
//               <p>⏳ {dentist.experience} سال سابقه دندان‌پزشکی</p>
//             </div>
//           </div>
//         </div>

//         {/* بخش پایین کارت */}
//         <div className="bg-blue-50 mt-6 px-4 py-3 rounded-b-lg">
//           <div className="flex items-center justify-between">
//             {/* آدرس */}
//             <div className="flex items-center gap-2 text-gray-600 text-xs">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4">
//                 <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
//               </svg>
//               <span>{dentist.address}</span>
//             </div>

//             {/* دکمه نوبت‌گیری */}
//             <Button
//               href={`/dentist/${dentist.id}`}
//               className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
//             >
//               دریافت نوبت
//             </Button>
//           </div>
//         </div>
//       </a>
//     </VipCart>
//   ))}
// </div>

                     
//             </div>
//         </div>

//     </>
//   );
// }






















import { useQuery } from "@tanstack/react-query";
import supabase from "@/api/supabase";
import VipCart from "@/component/VipCart";
import Header from "@/component/Header";
import Button from "@/component/Button";
import { FaCircleUser } from "react-icons/fa6";


const fetchDentists = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "dentist")
    .eq("DentistProfileStatus", "published");

  if (error) throw new Error(error.message);
  return data;
};

export default function AllDentist() {
  const { data: dentists = [], isLoading, isError, error } = useQuery({
    queryKey: ["dentists"],
    queryFn: fetchDentists,
    staleTime: 1000 * 60 * 5, // 5 دقیقه کش
  });

  if (isLoading) return <div className="text-center mt-10">در حال بارگذاری لیست...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">خطا: {error.message}</div>;

  return (
    <>
      <Header />
      {/* ادامه کد مثل قبل */}

      <div className="mb-96 font-DanaMedium">
            <div className="container">
                <div className="my-[30px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <img src="../images/Tooth_image.png" alt="Tooth" className="w-[30px] h-9" />
                            <p className="text-sm">لیست دندان پزشکان</p>
                        </div>
                        <div>
                            <Button className="flex items-center gap-x-7 bg-white shadow-Main text-xs px-4 h-10 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                </svg>
                                فیلتر ها
                            </Button>
                        </div>
                    </div>
                    <p className="text-[11px] text-gray-400 pt-2">{dentists.length} دندانپزشک</p>
                </div>
                <div className="space-y-3">
                    {dentists.map((dentist) => (
                        // <a
                        //   key={dentist.id}
                        //   href={`/dentist/${dentist.id}`}
                        //   className="block p-4 border rounded shadow hover:bg-gray-50 transition"
                        // >
                        //   <h3 className="text-lg font-bold">{dentist.name}</h3>
                        //   <p className="text-gray-600">🎓 تخصص: {dentist.specialty}</p>
                        //   <p className="text-gray-600">⏳ سابقه: {dentist.experience}</p>
                        // </a>

                        
                        <VipCart key={dentist.id}>
                        <a 
                           href={`/dentist/${dentist.id}`}
                        >
                            <div className="flex items-center gap-x-5 px-3 pt-2 mb-4">
                                {/* <div className="relative flex items-center justify-center size-[115px]">
                                    <img src={dentist.avatar_url} alt="image" className="rounded-full w-[67%] absolute"/>
                                    <img src="./images/dentist_box_backgroundImag.svg" alt="" className="w-full"/>
                                </div> */}
                                {dentist?.avatar_url?(
                                    <div className="relative w-[115px] h-[115px] flex-shrink-0">
                                        <img
                                        src="./images/dentist_box_backgroundImag.svg"
                                        alt="background"
                                        className="absolute inset-0 w-full h-full  object-cover rounded-full"
                                        />
                                        <img
                                        src={dentist.avatar_url || "/default-avatar.png"}
                                        alt={dentist.name}
                                        className="absolute inset-0 w-[70%] h-[70%] m-auto rounded-full object-cover border-2 border-white shadow"
                                        />
                                    </div>
                                    ):(
                                    <FaCircleUser className="size-16 fill-gray-500" />
                                )}
                                <div className="text-center">
                                    <p className="text-[13px] mb-1.5">{dentist.name}</p>
                                    <div className="space-y-2 text-xs text-gray-500">
                                        <p>{dentist.specialty}</p>
                                        <p> {dentist.experience} سال سابقه دندان پزشکی</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative -bottom-6 bg-blue-50 h-14 p-4">
                                <div className="flex items-center justify-between child:-mt-9">
                                    <div className="flex items-center gap-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-gray-400">
                                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-[11px]">{dentist.address}</p>
                                    </div>
                                    <Button className="flex items-center justify-center bg-blue-600 text-white px-2 h-8 rounded-xl text-sm">
                                        دریافت نوبت
                                    </Button>
                                </div>
                            </div>
                        </a>
                        </VipCart>
                    ))}
                </div>
            </div>
        </div>
    </>
  );
}
