// ---------------------------------------------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { Outlet, useParams } from "react-router-dom";
// import supabase from "@/api/supabase";
// import Header from "@/component/Header";
// import Footer from "@/component/Footer";
// import { SlSocialInstagram } from "react-icons/sl";
// import { CiBarcode } from "react-icons/ci"; 
// import Button from "@/component/Button";
// import Input from "@/component/Input";
// import { BiPhoneCall } from "react-icons/bi";
// import Titer from "@/component/dentist/Titer";
// import Services from "@/component/dentist/Services";
// import { IoSendSharp } from "react-icons/io5";
// import Comment from "@/component/Comment";
// import { useUserStore } from "@/stores/useUserStore";

// export default function PublicDentistProfile() {
//   const { id: dentistId } = useParams(); // گرفتن id از URL
//   const [profileDentist, setProfileDentist] = useState(null);
//   const [ads, setAds] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isShowPhonInformation,setIsShowPhonInformation] = useState(false)
//   const [text, setText] = useState("");
//   const [comments, setComments] = useState([]);
//   const profile = useUserStore((state) => state.profile);

//   const commentsHandleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;

//     const { error } = await supabase.from("comments").insert([
//       {
//         dentist_id: dentistId,
//         patient_id: profile.id,
//         text,
//         user_name:profile.name,
//         user_avatar:profile.avatar_url
//       },
//     ]);
//     console.log("name: ",profile.name);
//     console.log("user_avatar: ",profile.avatar_url);

//     if (!error) {
//       setText("");
//     //   onCommentAdded(); // رفرش لیست کامنت‌ها
//     }
//   };
  
//   const fetchComments = async () => {
//     const { data } = await supabase
//       .from("comments")
//       .select("id, text, reply, created_at, patient:patient_id(name),user_name,user_avatar")
//       .eq("dentist_id", dentistId)
//       .order("created_at", { ascending: false });

//     setComments(data || []);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [dentistId]);
  
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [{ data: profileData, error: profileError }, { data: adsData, error: adsError }] =
//           await Promise.all([
//             supabase.from("profiles").select("*").eq("id", dentistId).single(),
//             supabase.from("ads").select("*").eq("dentist_id", dentistId).single(),
//           ]);

//         if (profileError || adsError) throw new Error("خطا در دریافت اطلاعات");

//         setProfileDentist(profileData);
//         setAds(adsData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (dentistId) fetchData();
//   }, [dentistId]);

//   if (loading) return <div className="text-center mt-10">در حال بارگذاری...</div>;
//   if (error || !profileDentist) return <div className="text-center mt-10 text-red-500">پروفایل یافت نشد</div>;

//   return (
//     <>
//     <Header/>
//     <div>
//         <div className="">
//             <div className="h-40">
//                 <img src="/images/dentist-page-header2-mobile.webp" alt="image" className="w-full h-full object-cover object-left"/>
//                 <div className="absolute -mt-[76px] left-5 flex items-center gap-x-3 text-white h-6">
//                     <div>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
//                         </svg>
//                     </div>
//                     <div>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
//                         </svg>
//                     </div>
//                     <div>
//                         <SlSocialInstagram className="h-6 text-xl" stroke="2"/>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-full absolute bg-white -mt-[30px] rounded-t-[30px] h-[31px]"></div>
//             <div className="container">
//                 <div className="space-y-12">
//                     <div className="flex items-center gap-x-4">
//                         <div className="inline-block mr-2 size-[90px] overflow-hidden border border-gray-200 rounded-full">
//                             <img src={profileDentist.avatar_url} className="size-full object-cover" alt="profile_img" />
//                         </div>
//                         <div className="inline-block w-fit relative text-right">
//                             <h1 className="text-base">{profileDentist.name}</h1>
//                             <span className="text-[13px]">{profileDentist.specialty}</span>
//                             <p className="text-[13px]">{profileDentist.address}</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-between">
//                         <div className="flex flex-col items-center justify-center text-center border-r border-gray-200 w-1/3 h-20 mt-1.5">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 479 643" width="30" className="-mt-2.5 pb-1">
//                                 <path d="M138.37 543.56l14.42-53.62c4.56-15.24 9.76-30.33 15.5-45.17 4.95-12.78 10.71-25.29 16.75-37.6 6.64-13.54 14.88-26.16 24.13-38.13 6.5-8.42 13.41-16.46 21.27-23.56 6.68-6.03 13.67-11.84 21.09-16.92 7.72-5.28 16.11-9.57 24.22-14.28.54-.32 1.14-.54 1.86-.48l-10.79 6.76c-9 5.66-17.18 12.34-25.06 19.46-10.75 9.72-19.93 20.71-28.15 32.61-6.27 9.07-11.75 18.56-16.72 28.39-6.35 12.55-11.53 25.57-16.28 38.8-6.59 18.36-11.53 37.19-16.1 56.12-2.65 10.99-4.48 22.17-6.81 33.24-1.89 9-3.26 18.17-7.8 26.42-2.83 5.13-7.71 8.06-12.12 7.11-4.34-.93-7.46-3.61-10.03-6.97-5.59-7.31-8.19-15.98-10.11-24.72-3.09-14.07-5.62-28.26-8.19-42.44-1.55-8.52-2.87-17.08-4.05-25.66-.64-4.65-.87-9.36-1.07-14.05-.28-6.41-.44-12.82-.51-19.23-.1-9.08 1.01-18.06 3.08-26.87 2.31-9.84 4.8-19.66 7.66-29.36 1.73-5.88 4.22-11.54 6.54-17.23 4.16-10.2 3.73-20.32-.23-30.44-3.8-9.71-8.69-18.86-14.36-27.58L81.23 259.5c-4.91-7.8-9.14-16.04-13.62-24.1-5.63-10.13-9.85-20.85-13.22-31.93-2.5-8.23-4.41-16.59-5-25.18-.49-7.13-1.16-14.3-.94-21.43.41-13.32 2.92-26.25 8.58-38.5 4.02-8.71 9.04-16.73 15.6-23.67 6.21-6.57 13.81-11.16 22.34-14.12 8.36-2.9 16.94-4.85 25.82-5.17 6.07-.21 12.16-.68 18.22-.43 7.01.3 14 1.17 20.98 1.96l24.09 3.08 21.96 3.44c6.79.9 13.63 1.67 20.46 2.06 9.85.56 19.72 1.17 29.57.97 13.9-.28 27.46-2.84 40.3-8.48 2.7-1.19 5.39-2.38 8.16-3.43-5.35 4.49-11.57 7.44-18.16 9.33-6.35 1.83-12.92 3.02-19.45 4.1-4.37.72-8.84.97-13.28 1.07l-37.04.49c-7.23-.02-14.47-.55-21.69-.99-6.44-.4-12.87-1.03-19.31-1.49l-23.37-1.51c-6.32-.31-12.67-.74-18.98-.44-9.58.46-19.18 1.39-28.32 4.56-7.18 2.5-13.76 6.11-19.71 11.01-6.19 5.11-11.05 11.18-14.6 18.28-3.79 7.58-6.13 15.63-6.53 24.16-.17 3.53-.53 7.06-.46 10.59.15 8.2 1.05 16.36 3.26 24.26 2.72 9.74 5.47 19.52 9.04 28.96 4.72 12.47 10.61 24.47 17.87 35.69 5.28 8.16 10.82 16.17 16.47 24.09l22.18 30.49c7.7 11.2 13.22 23.49 15.46 37 1.56 9.43.6 18.64-3.35 27.52-3.69 8.27-7.57 16.51-10.37 25.09-2.53 7.77-4.18 15.92-5.36 24.03-1.37 9.44-1.95 19-2.62 28.53-.42 6.05-.72 12.16-.47 18.21.36 8.71 1.08 17.42 1.99 26.09.96 9.12 1.98 18.27 3.61 27.28 1.95 10.79 4.59 21.44 7.03 32.59zM243.1 354.2c11.76 9.08 19.85 20.92 25.75 34.46 3.94 9.03 6.71 18.41 8.77 27.98 1.33 6.18 1.86 12.54 2.72 18.82 1.49 10.88 1.85 21.84 1.44 32.79-.32 8.55-1.14 17.08-1.97 25.6-.68 6.99-1.58 13.97-2.57 20.92l-3.46 21.97c-.85 5.96-1.64 11.95-2.06 17.96-.69 9.73-1.07 19.48-1.57 29.23-.03.5.05 1 .1 2.03 2.38-1.02 4.65-1.74 6.67-2.89 8.05-4.6 14.17-11.21 19.48-18.73 6.56-9.29 11.84-19.3 16.69-29.52 5.63-11.87 10.06-24.24 13.47-36.91 3.01-11.2 5.66-22.52 8.14-33.85 1.66-7.56 2.86-15.22 4.05-22.87.89-5.77 1.46-11.59 2.12-17.39l2.52-23.19a111.4 111.4 0 0 0 .52-7.54l.52-17.71c.19-8.03.11-16.07.57-24.07.89-15.52 2.73-30.91 8.17-45.62 3.48-9.39 7.73-18.42 13.07-26.89 8.07-12.82 16.72-25.3 24.32-38.39 10.09-17.39 18.24-35.75 22.36-55.55 1.85-8.88 2.84-17.98 3.66-27.02.65-7.14.87-14.37.51-21.53-.57-11.25-1.94-22.43-5.17-33.32-2.34-7.87-5.53-15.3-9.92-22.25-6.36-10.06-14.93-17.67-25.57-22.81-8.27-4-17.05-6.56-26.25-7.41-6.09-.56-12.19-1.44-18.29-1.41-7.03.03-14.08.65-21.08 1.47-7.6.89-15.26 1.79-22.67 3.6-13.77 3.36-27.4 7.3-41.04 11.17-6.44 1.83-12.76 4.06-19.35 5.63 3.48-1.75 6.87-3.72 10.47-5.19 8.21-3.36 16.45-6.68 24.81-9.66 12.76-4.55 25.93-7.66 39.23-10.09 6.07-1.11 12.26-1.61 18.42-2.1 6.79-.53 13.61-1.14 20.4-.97 11.19.28 22.27 1.71 33.05 5.04 8.26 2.55 15.97 6.23 22.91 11.3 7.35 5.37 13.22 12.14 17.8 20.08 6.9 11.98 10.56 25.08 13.39 38.42 1.28 6.02 1.68 12.25 2.12 18.42.55 7.64 1.15 15.32.96 22.96-.28 10.62-1.19 21.18-3.31 31.68-3.01 14.91-7.5 29.31-14.02 42.99-5.11 10.73-10.97 21.12-16.58 31.61-5.18 9.69-10.77 19.18-15.65 29.01-5.57 11.21-9.51 23.06-11.3 35.51-.65 4.56-.73 9.2-1.1 13.81l-2.02 25.09-.54 8.3-2.05 24.32c-1.02 9.54-2.03 19.11-3.61 28.57-2.04 12.2-4.6 24.32-7 36.46-2.85 14.44-6.6 28.67-11.84 42.4-4.38 11.49-9.24 22.84-14.75 33.83-6.27 12.52-14.3 23.99-23.37 34.74-6.37 7.55-13.16 14.59-21.56 19.84-6.89 4.32-12.89 5.1-19.57.59-3.44-2.32-4.83-5.94-5.58-9.72-1.72-8.68-.55-17.32 1.24-25.83l9.78-44.82c1.68-8.42 2.71-16.99 3.64-25.53.95-8.76 1.52-17.57 2.05-26.37.36-5.9.82-11.84.44-17.72-.65-10.1-1.89-20.15-2.93-30.22-.9-8.72-3.36-17.09-6.13-25.35-3.32-9.89-7.88-19.21-13.91-27.74-2.58-3.67-5.68-6.96-8.54-10.42z"></path>
//                             </svg>
//                             <span  className="block text-[15px]">{profileDentist.experience} سال</span>
//                             <span className="text-xs block text-gray-300">سابقه پزشکی</span>
//                         </div>
//                         <div className="flex flex-col items-center justify-center text-center border-r border-gray-200 w-1/3 h-[80px] mt-1.5">
//                             <CiBarcode className="size-12 -mt-2.5 pb-1"/>
//                             <span className="block text-[15px]">{profileDentist.medical_code}</span>
//                             <span className="text-xs block text-gray-300">کد نظام پزشکی</span>
//                         </div>
//                         <div className="flex flex-col items-center justify-center text-center border border-gray-200 w-1/3 h-auto rounded-[20px] -mt-[11px] pt-3.5 pb-2.5">
//                             <div className="flex items-center justify-center bg-green-500 p-1.5 rounded-full">
//                                 <div className="flex items-center justify-center bg-white size-12 rounded-full text-green-500 text-sm font-bold">
//                                     100%
//                                 </div>
//                             </div>
                            
//                             <span className="text-xs block text-gray-300">رضایت کاربران</span>
//                         </div>
                        
//                     </div>
//                     <div className="grid grid-cols-2 gap-x-4 h-[45px] child:text-white child:rounded-[10px] child:flex child:items-center child:justify-center font-bold">
//                         <Button className="bg-green-500">مشاوره آنلاین</Button>
//                         <Button href={`${dentistId}/time-visit`} className="bg-blue-500">نوبت بگیرید</Button>
//                     </div>
//                 </div>
//                 <div className="flex items-center justify-between py-1 px-3 my-4 h-[75px] select-none rounded-[10px] border border-gray-200">
//                     <div>
//                         <span className="block pb-2 font-bold tet-sm">مشاهده نمونه کار ها</span>
//                         <img src="./images/img-group_dentist.svg" alt="group-img" />
//                     </div>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 text-orange-500">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
//                     </svg>
//                 </div>
//                 <div className="space-y-3 mb-16">
//                     <div className="p-[15px] leading-[30px] mt-2.5 rounded-[20px] shadow-Main clear-both">
//                         <div className="pb-3 border-b border-gray-200">
//                         {ads.long_address}
//                         </div>
//                         <div className="flex items-center justify-between pt-3">
//                             <div className="flex items-center gap-x-3">
//                                 <BiPhoneCall className="size-5 text-green-500 rotate-[270deg]"/>
//                                 <p>اطلاعات تماس مطب</p>
//                             </div>
//                             <Button className="text-blue-500" onClick={()=>setIsShowPhonInformation(!isShowPhonInformation)}>(نمایش)</Button>
//                         </div>

//                     </div>
//                     <div className="flex items-center justify-between p-[15px] leading-[30px] mt-2.5 rounded-[20px] shadow-Main">
//                         <span className="text-[15px]">سوابق تحصیلی و پزشکی دکتر محمد سالار منتظر لطف اللهی</span>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-blue-600">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
//                         </svg>

//                     </div>
//                     <div className="flex items-center justify-between p-[15px] leading-[30px] mt-2.5 rounded-[20px] shadow-Main">
//                         <span className="text-[15px]">بیمه های قابل پذیرش</span>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-blue-600">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
//                         </svg>

//                     </div>
//                 </div>
//                 <div>
//                     <Titer title="خدمات"/>
//                     <ul>
//                         {ads.services.map((service)=>
//                             <Services text={service} iconTik={true}/>
//                         )}
//                     </ul>
//                 </div>

//                 <div>
//                     <div className="mt-12">
//                         <Titer title={`معرفی دکتر ${profileDentist.name}`}/>
//                     </div>
//                     <div>
//                         <p className="text-justify leading-7 text-sm">{profileDentist.bio}</p>
//                     </div>
//                 </div>



//                 <div>
//                     <div className="my-12">
//                         <Titer title="امتیازات و نظرات کاربران"/>
//                     </div>
//                     <div className="flex items-center justify-between gap-x-4">
//                         <div className="flex flex-col items-center justify-center gap-y-2.5 text-center border border-gray-200 w-[calc(100%-207px)] h-[157px] max-w-[157px] rounded-[20px] mt-[11px] pt-5 pb-2.5">
//                             <div className="flex items-center justify-center bg-green-500 p-2 rounded-full">
//                                 <div className="flex items-center justify-center bg-white size-20 rounded-full text-green-500 text-sm font-bold">
//                                     %100
//                                 </div>
//                             </div>
//                             <span className="text-xs block text-gray-300">امتیاز ثبت نشده</span>
//                         </div>
//                         <div className="space-y-3 w-2/3 text-xs">
//                             <div className="flex items-center justify-between">
//                                 <p>کیفیت خدمات</p>
//                                 <p>%</p>
//                             </div>
//                             <div className="h-[5px] bg-gray-200"></div>
//                             <div className="flex items-center justify-between">
//                                 <p>محیط مطب</p>
//                                 <p>%</p>
//                             </div>
//                             <div className="h-[5px] bg-gray-200"></div>
//                             <div className="flex items-center justify-between">
//                                 <p>خلاق و رفتار دندانپزشک</p>
//                                 <p>%</p>
//                             </div>
//                             <div className="h-[5px] bg-gray-200"></div>
//                             <div className="flex items-center justify-between">
//                                 <p>اخلاق و رفتار منشی</p>
//                                 <p>%</p>
//                             </div>
//                             <div className="h-[5px] bg-gray-200"></div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-blue-100 rounded-[20px] px-6 pt-[23px] pb-[5px] mt-20 mb-14">
//                     <h3 className="text-black mb-2.5 text-2.5">
//                         سوالات و نظرات خود را برای دکتر {profileDentist.name} ارسال کنید
//                     </h3>
//                     <form onSubmit={commentsHandleSubmit}>
//                         <div className="relative bg-white overflow-hidden p-2 rounded-[10px] mt-4 mb-3 border border-gray-300">
//                         <textarea
//                             className="w-full h-[131px] outline-none resize-none"
//                             rows={6}
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                             placeholder="نظر یا سوال خود را بنویسید..."
//                         />
//                         <button
//                             type="submit"
//                             className="absolute bottom-3 left-3 flex items-center justify-center bg-blue-500 size-11 rounded-full"
//                         >
//                             <IoSendSharp className="size-5 text-white" />
//                         </button>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="space-y-6">
//                     <p className="text-[13px] mb-4">{comments.length} کاربر تا الان نظر داده‌اند</p>
//                     {comments.map((c)=>
//                         <Comment key={c.id} userName={c.user_name} date={new Date(c.created_at).toLocaleDateString("fa-IR")} text={c.text} numberComments={comments.length} imageProfile={c?.user_avatar}/>
                        
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </div>
//         <div className={`fixed bottom-0 w-full ${isShowPhonInformation ? "": "hidden"} bg-white shadow-main z-50 h-44 px-3 pt-8 pb-5 rounded-t-2xl space-y-2.5`}>
//             <div className="relative h-9 bg-green-400 rounded-3xl">
//                 <div className="absolute right-0 flex items-center justify-center h-full w-12 bg-green-500 rounded-full">
//                     <BiPhoneCall className="size-6 rotate-[270deg] text-white"/>
//                 </div>
//                 <div className="flex items-center justify-center h-full text-sm text-white">
//                     {profileDentist.phone}
//                 </div>
//             </div>
//             {ads.phone_numbers?.map((phone_number)=>
//                 <div className="relative h-9 bg-white border border-black/20 rounded-3xl">
//                     <div className="absolute right-0 flex items-center justify-center h-full w-12 bg-green-500 rounded-full">
//                         <BiPhoneCall className="size-6 rotate-[270deg] text-white"/>
//                     </div>
//                     <div className="flex items-center justify-center h-full text-sm text-black">
//                         {phone_number}
//                     </div>
//                 </div>
//             )}        
//         </div>
//         <div className={`${isShowPhonInformation ?"h-full":""} fixed top-0 w-full bg-black/60 z-40`} onClick={()=>setIsShowPhonInformation(!isShowPhonInformation)}></div>
//     </div>
//     {/* <Outlet /> */}
    
//     </>
//   );
// }



// --------------------------------------------------------------------------------------------


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "@/api/supabase";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { SlSocialInstagram } from "react-icons/sl";
import { CiBarcode } from "react-icons/ci"; 
import Button from "@/component/Button";
// import Input from "@/component/Input";
import { BiPhoneCall } from "react-icons/bi";
import Titer from "@/component/dentist/Titer";
import Services from "@/component/dentist/Services";
import { IoSendSharp } from "react-icons/io5";
import Comment from "@/component/Comment";
import { useUserStore } from "@/stores/useUserStore";
import { FaCircleUser } from "react-icons/fa6";
import { Proportions } from "lucide-react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";



export default function DentistProfilePage() {
  const { id: dentistId } = useParams(); // گرفتن id از URL
  const profile = useUserStore((state) => state.profile);

  const [profileDentist, setProfileDentist] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShowPhonInformation, setIsShowPhonInformation] = useState(false);

  // ارسال کامنت
  const commentsHandleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if(profile){
        const { error } = await supabase.from("comments").insert([
            {
              dentist_id: dentistId,
              patient_id: profile.id,
              content,
              user_name: profile.name,
              user_avatar: profile.avatar_url,
            },
          ]);
          if (!error) {
              setText("");
              fetchComments(); // رفرش لیست کامنت‌ها
              toast.success('کامنت شما ثبت و درصورت تایید ادمین نمایش داده می شود', {
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
            }
        
        }
        else{
            alert("برای درج کامنت ابتدا وارد شوید");
            toast.error('برای ثبت نظر ابتدا وارد شوید', {
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
        }
    }

    // if (!error) {
    //   setText("");
    //   fetchComments(); // رفرش لیست کامنت‌ها
    // }

//     const { error } = await supabase.from("comments").insert([
//       {
//         dentist_id: dentistId,
//         patient_id: profile.id,
//         content,
//         user_name: profile.name,
//         user_avatar: profile.avatar_url,
//       },
//     ]);

//     if (!error) {
//       setText("");
//       fetchComments(); // رفرش لیست کامنت‌ها
//     }
//   };

  // گرفتن کامنت‌ها
  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("id, content, reply, created_at, patient:patient_id(name), user_name, user_avatar")
      .eq("dentist_id", dentistId)
      .eq("status", "approved") // فقط کامنت‌های تایید شده
      .order("created_at", { ascending: false });



    setComments(data || []);
  };

  // گرفتن اطلاعات دندان‌پزشک از جدول profiles
  const fetchDentistProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", dentistId)
      .single();

    if (error || !data) {
      setError("خطا در دریافت اطلاعات دندان‌پزشک");
    } else {
      setProfileDentist(data);
      console.log(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (dentistId) {
      fetchDentistProfile();
      fetchComments();
    //   console.log(profileDentist);
    }
  }, [dentistId]);

  if (loading) return <div className="text-center mt-10">در حال بارگذاری...</div>;
  if (error || !profileDentist) return <div className="text-center mt-10 text-red-500">پروفایل یافت نشد</div>;

  
  return (
    <>
    <Header/>
    <div>
        <div className="">
            <div className="h-40">
                <img src="/images/dentist-page-header2-mobile.webp" alt="image" className="w-full h-full object-cover object-left"/>
                <div className="absolute -mt-[76px] left-5 flex items-center gap-x-3 text-white h-6">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                    </div>
                    <div>
                        <SlSocialInstagram className="h-6 text-xl" stroke="2"/>
                    </div>
                </div>
            </div>
            <div className="w-full absolute bg-white -mt-[30px] rounded-t-[30px] h-[31px]"></div>
            <div className="container">
                <div className="space-y-12">
                    <div className="flex items-center gap-x-4">
                        {profileDentist?.avatar_url?
                            (
                                <div className="inline-block mr-2 size-[90px] overflow-hidden border border-gray-200 rounded-full">
                                    <img src={profileDentist.avatar_url} className="size-full object-cover" alt="profile_img" />
                                </div>

                            ):(
                                <FaCircleUser className="size-16 fill-gray-500" />
                            )

                        }

                        <div className="inline-block w-fit relative text-right">
                            <h1 className="text-base">{profileDentist.name}</h1>
                            <span className="text-[13px]">{profileDentist.specialty}</span>
                            <p className="text-[13px]">{profileDentist.address}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col items-center justify-center text-center border-r border-gray-200 w-1/3 h-20 mt-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 479 643" width="30" className="-mt-2.5 pb-1">
                                <path d="M138.37 543.56l14.42-53.62c4.56-15.24 9.76-30.33 15.5-45.17 4.95-12.78 10.71-25.29 16.75-37.6 6.64-13.54 14.88-26.16 24.13-38.13 6.5-8.42 13.41-16.46 21.27-23.56 6.68-6.03 13.67-11.84 21.09-16.92 7.72-5.28 16.11-9.57 24.22-14.28.54-.32 1.14-.54 1.86-.48l-10.79 6.76c-9 5.66-17.18 12.34-25.06 19.46-10.75 9.72-19.93 20.71-28.15 32.61-6.27 9.07-11.75 18.56-16.72 28.39-6.35 12.55-11.53 25.57-16.28 38.8-6.59 18.36-11.53 37.19-16.1 56.12-2.65 10.99-4.48 22.17-6.81 33.24-1.89 9-3.26 18.17-7.8 26.42-2.83 5.13-7.71 8.06-12.12 7.11-4.34-.93-7.46-3.61-10.03-6.97-5.59-7.31-8.19-15.98-10.11-24.72-3.09-14.07-5.62-28.26-8.19-42.44-1.55-8.52-2.87-17.08-4.05-25.66-.64-4.65-.87-9.36-1.07-14.05-.28-6.41-.44-12.82-.51-19.23-.1-9.08 1.01-18.06 3.08-26.87 2.31-9.84 4.8-19.66 7.66-29.36 1.73-5.88 4.22-11.54 6.54-17.23 4.16-10.2 3.73-20.32-.23-30.44-3.8-9.71-8.69-18.86-14.36-27.58L81.23 259.5c-4.91-7.8-9.14-16.04-13.62-24.1-5.63-10.13-9.85-20.85-13.22-31.93-2.5-8.23-4.41-16.59-5-25.18-.49-7.13-1.16-14.3-.94-21.43.41-13.32 2.92-26.25 8.58-38.5 4.02-8.71 9.04-16.73 15.6-23.67 6.21-6.57 13.81-11.16 22.34-14.12 8.36-2.9 16.94-4.85 25.82-5.17 6.07-.21 12.16-.68 18.22-.43 7.01.3 14 1.17 20.98 1.96l24.09 3.08 21.96 3.44c6.79.9 13.63 1.67 20.46 2.06 9.85.56 19.72 1.17 29.57.97 13.9-.28 27.46-2.84 40.3-8.48 2.7-1.19 5.39-2.38 8.16-3.43-5.35 4.49-11.57 7.44-18.16 9.33-6.35 1.83-12.92 3.02-19.45 4.1-4.37.72-8.84.97-13.28 1.07l-37.04.49c-7.23-.02-14.47-.55-21.69-.99-6.44-.4-12.87-1.03-19.31-1.49l-23.37-1.51c-6.32-.31-12.67-.74-18.98-.44-9.58.46-19.18 1.39-28.32 4.56-7.18 2.5-13.76 6.11-19.71 11.01-6.19 5.11-11.05 11.18-14.6 18.28-3.79 7.58-6.13 15.63-6.53 24.16-.17 3.53-.53 7.06-.46 10.59.15 8.2 1.05 16.36 3.26 24.26 2.72 9.74 5.47 19.52 9.04 28.96 4.72 12.47 10.61 24.47 17.87 35.69 5.28 8.16 10.82 16.17 16.47 24.09l22.18 30.49c7.7 11.2 13.22 23.49 15.46 37 1.56 9.43.6 18.64-3.35 27.52-3.69 8.27-7.57 16.51-10.37 25.09-2.53 7.77-4.18 15.92-5.36 24.03-1.37 9.44-1.95 19-2.62 28.53-.42 6.05-.72 12.16-.47 18.21.36 8.71 1.08 17.42 1.99 26.09.96 9.12 1.98 18.27 3.61 27.28 1.95 10.79 4.59 21.44 7.03 32.59zM243.1 354.2c11.76 9.08 19.85 20.92 25.75 34.46 3.94 9.03 6.71 18.41 8.77 27.98 1.33 6.18 1.86 12.54 2.72 18.82 1.49 10.88 1.85 21.84 1.44 32.79-.32 8.55-1.14 17.08-1.97 25.6-.68 6.99-1.58 13.97-2.57 20.92l-3.46 21.97c-.85 5.96-1.64 11.95-2.06 17.96-.69 9.73-1.07 19.48-1.57 29.23-.03.5.05 1 .1 2.03 2.38-1.02 4.65-1.74 6.67-2.89 8.05-4.6 14.17-11.21 19.48-18.73 6.56-9.29 11.84-19.3 16.69-29.52 5.63-11.87 10.06-24.24 13.47-36.91 3.01-11.2 5.66-22.52 8.14-33.85 1.66-7.56 2.86-15.22 4.05-22.87.89-5.77 1.46-11.59 2.12-17.39l2.52-23.19a111.4 111.4 0 0 0 .52-7.54l.52-17.71c.19-8.03.11-16.07.57-24.07.89-15.52 2.73-30.91 8.17-45.62 3.48-9.39 7.73-18.42 13.07-26.89 8.07-12.82 16.72-25.3 24.32-38.39 10.09-17.39 18.24-35.75 22.36-55.55 1.85-8.88 2.84-17.98 3.66-27.02.65-7.14.87-14.37.51-21.53-.57-11.25-1.94-22.43-5.17-33.32-2.34-7.87-5.53-15.3-9.92-22.25-6.36-10.06-14.93-17.67-25.57-22.81-8.27-4-17.05-6.56-26.25-7.41-6.09-.56-12.19-1.44-18.29-1.41-7.03.03-14.08.65-21.08 1.47-7.6.89-15.26 1.79-22.67 3.6-13.77 3.36-27.4 7.3-41.04 11.17-6.44 1.83-12.76 4.06-19.35 5.63 3.48-1.75 6.87-3.72 10.47-5.19 8.21-3.36 16.45-6.68 24.81-9.66 12.76-4.55 25.93-7.66 39.23-10.09 6.07-1.11 12.26-1.61 18.42-2.1 6.79-.53 13.61-1.14 20.4-.97 11.19.28 22.27 1.71 33.05 5.04 8.26 2.55 15.97 6.23 22.91 11.3 7.35 5.37 13.22 12.14 17.8 20.08 6.9 11.98 10.56 25.08 13.39 38.42 1.28 6.02 1.68 12.25 2.12 18.42.55 7.64 1.15 15.32.96 22.96-.28 10.62-1.19 21.18-3.31 31.68-3.01 14.91-7.5 29.31-14.02 42.99-5.11 10.73-10.97 21.12-16.58 31.61-5.18 9.69-10.77 19.18-15.65 29.01-5.57 11.21-9.51 23.06-11.3 35.51-.65 4.56-.73 9.2-1.1 13.81l-2.02 25.09-.54 8.3-2.05 24.32c-1.02 9.54-2.03 19.11-3.61 28.57-2.04 12.2-4.6 24.32-7 36.46-2.85 14.44-6.6 28.67-11.84 42.4-4.38 11.49-9.24 22.84-14.75 33.83-6.27 12.52-14.3 23.99-23.37 34.74-6.37 7.55-13.16 14.59-21.56 19.84-6.89 4.32-12.89 5.1-19.57.59-3.44-2.32-4.83-5.94-5.58-9.72-1.72-8.68-.55-17.32 1.24-25.83l9.78-44.82c1.68-8.42 2.71-16.99 3.64-25.53.95-8.76 1.52-17.57 2.05-26.37.36-5.9.82-11.84.44-17.72-.65-10.1-1.89-20.15-2.93-30.22-.9-8.72-3.36-17.09-6.13-25.35-3.32-9.89-7.88-19.21-13.91-27.74-2.58-3.67-5.68-6.96-8.54-10.42z"></path>
                            </svg>
                            <span  className="block text-[15px]">{profileDentist.experience} سال</span>
                            <span className="text-xs block text-gray-300">سابقه پزشکی</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center border-r border-gray-200 w-1/3 h-[80px] mt-1.5">
                            <CiBarcode className="size-12 -mt-2.5 pb-1"/>
                            <span className="block text-[15px]">{profileDentist.medical_code}</span>
                            <span className="text-xs block text-gray-300">کد نظام پزشکی</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center border border-gray-200 w-1/3 h-auto rounded-[20px] -mt-[11px] pt-3.5 pb-2.5">
                            <div className="flex items-center justify-center bg-green-500 p-1.5 rounded-full">
                                <div className="flex items-center justify-center bg-white size-12 rounded-full text-green-500 text-sm font-bold">
                                    100%
                                </div>
                            </div>
                            
                            <span className="text-xs block text-gray-300">رضایت کاربران</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 h-[45px] child:text-white child:rounded-[10px] child:flex child:items-center child:justify-center font-bold">
                        <Button className="bg-green-500">مشاوره آنلاین</Button>
                        <Button href={`${dentistId}/rules`} className="bg-blue-500">نوبت بگیرید</Button>
                    </div>
                </div>
                <div className="flex items-center justify-between py-1 px-3 my-4 h-[75px] select-none rounded-[10px] border border-gray-200">
                    <div>
                        <span className="block pb-2 font-bold tet-sm">مشاهده نمونه کار ها</span>
                        <img src="./images/img-group_dentist.svg" alt="group-img" />
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 text-orange-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <div className="space-y-3 mb-16">
                    <div className="p-[15px] leading-[30px] mt-2.5 rounded-[20px] shadow-Main clear-both">
                        <div className="pb-3 border-b border-gray-200">
                        {profileDentist.long_address}
                        </div>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center gap-x-3">
                                <BiPhoneCall className="size-5 text-green-500 rotate-[270deg]"/>
                                <p>اطلاعات تماس مطب</p>
                            </div>
                            <Button className="text-blue-500" onClick={()=>setIsShowPhonInformation(!isShowPhonInformation)}>(نمایش)</Button>
                        </div>

                    </div>
                    <div className="flex items-center justify-between p-[15px] leading-[30px] mt-2.5 rounded-[20px] shadow-Main">
                        <span className="text-[15px]">سوابق تحصیلی و پزشکی دکتر محمد سالار منتظر لطف اللهی</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                    </div>
                    {/* <div className="flex items-center justify-between p-[15px] leading-[30px] mt-2.5 rounded-[20px] shadow-Main">
                        <span className="text-[15px]">بیمه های قابل پذیرش</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>

                    </div> */}
                </div>
                <div>
                    <Titer title="خدمات"/>
                    <ul>
                        {profileDentist.services?.map((service)=>
                            <Services text={service} iconTik={true}/>
                        )}
                    </ul>
                </div>

                <div>
                    <div className="mt-12">
                        <Titer title={`معرفی دکتر ${profileDentist.name}`}/>
                    </div>
                    <div>
                        <p className="text-justify leading-7 text-sm">{profileDentist.bio}</p>
                    </div>
                </div>



                <div>
                    <div className="my-12">
                        <Titer title="امتیازات و نظرات کاربران"/>
                    </div>
                    <div className="flex items-center justify-between gap-x-4">
                        <div className="flex flex-col items-center justify-center gap-y-2.5 text-center border border-gray-200 w-[calc(100%-207px)] h-[157px] max-w-[157px] rounded-[20px] mt-[11px] pt-5 pb-2.5">
                            <div className="flex items-center justify-center bg-green-500 p-2 rounded-full">
                                <div className="flex items-center justify-center bg-white size-20 rounded-full text-green-500 text-sm font-bold">
                                    %100
                                </div>
                            </div>
                            <span className="text-xs block text-gray-300">امتیاز ثبت نشده</span>
                        </div>
                        <div className="space-y-3 w-2/3 text-xs">
                            <div className="flex items-center justify-between">
                                <p>کیفیت خدمات</p>
                                <p>%</p>
                            </div>
                            <div className="h-[5px] bg-gray-200"></div>
                            <div className="flex items-center justify-between">
                                <p>محیط مطب</p>
                                <p>%</p>
                            </div>
                            <div className="h-[5px] bg-gray-200"></div>
                            <div className="flex items-center justify-between">
                                <p>خلاق و رفتار دندانپزشک</p>
                                <p>%</p>
                            </div>
                            <div className="h-[5px] bg-gray-200"></div>
                            <div className="flex items-center justify-between">
                                <p>اخلاق و رفتار منشی</p>
                                <p>%</p>
                            </div>
                            <div className="h-[5px] bg-gray-200"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-100 rounded-[20px] px-6 pt-[23px] pb-[5px] mt-20 mb-14">
                    <h3 className="text-black mb-2.5 text-2.5">
                        سوالات و نظرات خود را برای دکتر {profileDentist.name} ارسال کنید
                    </h3>
                    <form onSubmit={commentsHandleSubmit}>
                        <div className="relative bg-white overflow-hidden p-2 rounded-[10px] mt-4 mb-3 border border-gray-300">
                        <textarea
                            className="w-full h-[131px] outline-none resize-none"
                            rows={6}
                            value={content}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="نظر یا سوال خود را بنویسید..."
                        />
                        <button
                            type="submit"
                            className="absolute bottom-3 left-3 flex items-center justify-center bg-blue-500 size-11 rounded-full"
                        >
                            <IoSendSharp className="size-5 text-white" />
                        </button>
                        </div>
                    </form>
                </div>
                <div className="space-y-6">
                    <p className="text-[13px] mb-4">{comments.length} کاربر تا الان نظر داده‌اند</p>
                    {comments.map((c)=>
                        <Comment key={c.id} userName={c.user_name} date={new Date(c.created_at).toLocaleDateString("fa-IR")} content={c.content} numberComments={comments.length} imageProfile={c?.user_avatar} reply={c.reply} replyDate={c.replied_at} imageDentistReplyed={profileDentist?.avatar_url} dentistName={profileDentist?.name}/>
                        
                    )}
                </div>
            </div>
            <Footer />
        </div>
        <div className={`fixed bottom-0 w-full ${isShowPhonInformation ? "": "hidden"} bg-white shadow-main z-50 h-44 px-3 pt-8 pb-5 rounded-t-2xl space-y-2.5`}>
            <div className="relative h-9 bg-green-400 rounded-3xl">
                <div className="absolute right-0 flex items-center justify-center h-full w-12 bg-green-500 rounded-full">
                    <BiPhoneCall className="size-6 rotate-[270deg] text-white"/>
                </div>
                <div className="flex items-center justify-center h-full text-sm text-white">
                    {profileDentist.phone}
                </div>
            </div>
            {profileDentist.phone_numbers?.map((phone_number)=>
                <div className="relative h-9 bg-white border border-black/20 rounded-3xl">
                    <div className="absolute right-0 flex items-center justify-center h-full w-12 bg-green-500 rounded-full">
                        <BiPhoneCall className="size-6 rotate-[270deg] text-white"/>
                    </div>
                    <div className="flex items-center justify-center h-full text-sm text-black">
                        {phone_number}
                    </div>
                </div>
            )}        
        </div>
        <div className={`${isShowPhonInformation ?"h-full":""} fixed top-0 w-full bg-black/60 z-40`} onClick={()=>setIsShowPhonInformation(!isShowPhonInformation)}></div>
    </div>
    
    
    </>
  );
}

