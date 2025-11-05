// import React from "react";
// import Button from "./Button";
// import { useState } from "react";
// // import Input from "./Input";
// import MenuLink from "./MenuLink";
// import Cookies from "js-cookie";

// function ProfileHeader() {

//     const [isShowMenu, setIsShowMenu] = useState(false)

//     return ( 
//         <>
//             <header className="flex items-center justify-between h-[75px] px-[25px] shadow-Main">       
//                 <Button className="flex items-center justify-center border border-gray-300 p-1 rounded-xl" onClick={()=> setIsShowMenu(true)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//                     </svg>
//                 </Button>
//                 <Button className="flex items-center gap-x-2 text-red-500" >
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
//                     </svg>
//                     خروج از حساب
//                 </Button>
//             </header>

//             <div className={`${isShowMenu ?"h-full":""} fixed top-0 w-full bg-black/60 z-40`} onClick={()=> setIsShowMenu(false)}></div>

//             <div className={`fixed z-50 ${isShowMenu? "inset-0":"-right-[250px]"} max-w-[250px] bg-blue-500 p-3 pt-12 transition-all duration-300 text-white`}>
//                 {/* <div className="flex items-center justify-between pb-3 border-b border-black">
//                     <div className="flex items-center gap-x-1">
//                         <img src="../images/logo.jpg" alt="logo" />
//                         <h1 className="text-mainColor text-lg">دندانپزشکان لرستان</h1>
//                     </div>
//                     <IoCloseOutline className="size-8 transition-all duration-300" onClick={()=> setIsShowMenu(false)}/>
//                 </div> */}

//                 <div className="pt-10 pb-[38px] text-center border-b border-white">
//                     {/* <Button href="/userpanel" className="inline-flex items-center justify-center rounded-[10px] text-center w-full h-11 bg-blue-400 text-white font-normal">
//                         پروفایل من |
//                     </Button> */}

//                     <div className="flex items-center justify-center size-[100px] mt-auto mb-6 mx-auto rounded-full overflow-hidden bg-white">
//                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 text-blue-500">
//                             <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
//                         </svg>

//                     </div>
//                     <p className="mb-2 text-[17px]">دکتر شمس</p>
//                     <p className="mb-2 text-sm">09332852151</p>



//                     {/* {isLogin ?(
//                         <Button href="/userpanel" className="inline-flex items-center justify-center rounded-[10px] text-center w-full h-11 bg-blue-400 text-white font-normal">
//                             پروفایل من |
//                         </Button>

//                     ):(
//                         <Button href="/login" className="inline-flex items-center justify-center rounded-[10px] text-center w-full h-11 bg-blue-400 text-white font-normal">
//                             ورود/عضویت
//                         </Button>
//                     )} */}
//                 </div>
//                 <div className="my-8 space-y-6 py-5 px-[15px]">
//                     <MenuLink href="/" className="flex items-center gap-x-5">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
//                         </svg>
//                         نوبت های من
//                     </MenuLink>
//                     <MenuLink href="/blog" className="flex items-center gap-x-5">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
//                         </svg>
//                        ذخیره شده ها
//                     </MenuLink>
//                     <MenuLink href="/blog" className="flex items-center gap-x-5">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
//                         </svg>


//                         سوالات و نظرات من
//                     </MenuLink>
//                     <MenuLink href="details" className="flex items-center gap-x-5">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//                         </svg>

//                         اطلاعات حساب کاربری
//                     </MenuLink>
//                     <MenuLink href="#" className="flex items-center gap-x-5">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
//                         </svg>

//                         سوالات رایج کاربران
//                     </MenuLink>
                    
                    
//                 </div>
//             </div>
//         </>
//      );
// }

// export default ProfileHeader;


// --------------------------------------------------------

// import React, { useState } from "react";
// import { useUserStore } from "@/stores/useUserStore";
// import { FiBell, FiLogOut, FiMenu, FiX } from "react-icons/fi";

// export default function ProfileHeader() {
//   const profile = useUserStore((state) => state.profile);
//   const [menuOpen, setMenuOpen] = useState(false);

//   if (!profile) return null;

//   return (
//     <header className="bg-blue-50 shadow-md sticky top-0 z-50">
//       <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//         {/* لوگو یا نام سایت */}
//         <div className="text-blue-900 font-extrabold text-xl md:text-2xl select-none">
//           DentalCare
//         </div>

//         {/* منوی دسکتاپ */}
//         <nav className="hidden md:flex items-center space-x-8 text-blue-900 font-medium">
//           <div className="flex items-center space-x-4">
//             {/* عکس پروفایل */}
//             {profile.profile_image_url ? (
//               <img
//                 src={profile.profile_image_url}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
//               />
//             ) : (
//               <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-white font-semibold text-lg border-2 border-blue-300">
//                 {profile.name?.charAt(0).toUpperCase() || "?"}
//               </div>
//             )}

//             {/* نام و تخصص */}
//             <div className="flex flex-col leading-tight">
//               <span className="text-lg font-semibold">{profile.name}</span>
//               <span className="text-sm text-blue-700">{profile.field || "دندان‌پزشک"}</span>
//             </div>
//           </div>

//           {/* آیکون‌ها */}
//           <button
//             aria-label="notifications"
//             className="relative p-2 rounded-full hover:bg-blue-100 transition"
//           >
//             <FiBell className="w-6 h-6" />
//             {/* نقطه قرمز اعلان */}
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </button>

//           <button
//             aria-label="logout"
//             className="p-2 rounded-full hover:bg-blue-100 transition"
//             onClick={() => alert("خروج انجام شود")}
//           >
//             <FiLogOut className="w-6 h-6" />
//           </button>
//         </nav>

//         {/* منوی موبایل */}
//         <button
//           className="md:hidden p-2 rounded-md hover:bg-blue-100 transition"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="menu"
//         >
//           {menuOpen ? <FiX className="w-7 h-7 text-blue-900" /> : <FiMenu className="w-7 h-7 text-blue-900" />}
//         </button>
//       </div>

//       {/* منوی موبایل باز شونده */}
//       {menuOpen && (
//         <nav className="md:hidden bg-blue-50 px-6 pb-4 space-y-4 border-t border-blue-200">
//           <div className="flex items-center space-x-4">
//             {profile.profile_image_url ? (
//               <img
//                 src={profile.profile_image_url}
//                 alt="profile"
//                 className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
//               />
//             ) : (
//               <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center text-white font-semibold text-lg border-2 border-blue-300">
//                 {profile.name?.charAt(0).toUpperCase() || "?"}
//               </div>
//             )}

//             <div className="flex flex-col leading-tight">
//               <span className="text-lg font-semibold">{profile.name}</span>
//               <span className="text-sm text-blue-700">{profile.field || "دندان‌پزشک"}</span>
//             </div>
//           </div>

//           <button
//             aria-label="notifications"
//             className="w-full text-right p-2 rounded-md hover:bg-blue-100 transition flex items-center justify-end space-x-2"
//           >
//             <span>اعلان‌ها</span>
//             <FiBell className="w-6 h-6" />
//           </button>
//           <button
//             aria-label="logout"
//             onClick={() => alert("خروج انجام شود")}
//             className="w-full text-right p-2 rounded-md hover:bg-blue-100 transition flex items-center justify-end space-x-2"
//           >
//             <span>خروج</span>
//             <FiLogOut className="w-6 h-6" />
//           </button>
//         </nav>
//       )}
//     </header>
//   );
// }



// ------------------------------------------------------------------------------



import React, { useState } from "react";
import Button from "./Button";
import MenuLink from "./MenuLink";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
import supabase from "@/api/supabase";

function ProfileHeader({children}) {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const profile = useUserStore((state) => state.profile);
  const clearProfile = useUserStore((state) => state.clearProfile);
  const navigate = useNavigate();


  if (!profile) return null;


  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      clearProfile(); // پاک کردن اطلاعات کاربر از Zustand
      navigate("/"); // هدایت به صفحه لاگین (یا صفحه اصلی)
    } catch (err) {
      console.error("خطا در خروج از حساب:", err.message);
      alert("مشکلی در خروج از حساب رخ داد");
    }
  };

  return (
    <>
      {/* --- Header Bar --- */}
      <header className="flex items-center justify-between h-[75px] px-[25px] shadow-Main bg-white">
        <Button
          className="flex items-center justify-center border border-gray-300 p-1 rounded-xl"
          onClick={() => setIsShowMenu(true)}
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>

        {/* Logout Button */}
        <Button className="flex items-center gap-x-2 text-red-500" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
          خروج از حساب
        </Button>
      </header>

      {/* --- Overlay --- */}
      <div
        className={`${isShowMenu ? "h-full" : ""} fixed top-0 w-full bg-black/60 z-40`}
        onClick={() => setIsShowMenu(false)}
      ></div>

      {/* --- Side Menu --- */}
      <div
        className={`fixed z-50 ${
          isShowMenu ? "inset-0" : "-right-[250px]"
        } max-w-[250px] bg-blue-500 p-3 pt-12 transition-all duration-300 text-white`}
      >
        <div className="pt-10 pb-[38px] text-center border-b border-white">
          {/* Avatar */}
          <div className="flex items-center justify-center size-[100px] mt-auto mb-6 mx-auto rounded-full overflow-hidden bg-white">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-blue-500 font-bold text-3xl">
                {profile.name?.charAt(0) || "؟"}
              </div>
                // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 text-blue-500">
                //     <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                // </svg>
            )}
          </div>

          {/* Name */}
          <p className="mb-2 text-[17px] font-semibold">{profile.name || "بدون نام"}</p>

          {/* Phone */}
          <p className="mb-2 text-sm">{profile.phone || "شماره‌ای وارد نشده"}</p>
        </div>

        {/* --- Menu Links --- */}
        <div className="my-8 space-y-6 py-5 px-[15px]">
          {/* <MenuLink href="/" className="flex items-center gap-x-5">
            <svg className="size-6 text-white">...</svg>
            نوبت‌های من
          </MenuLink>

          <MenuLink href="/blog" className="flex items-center gap-x-5">
            <svg className="size-6 text-white">...</svg>
            ذخیره شده‌ها
          </MenuLink>

          <MenuLink href="/questions" className="flex items-center gap-x-5">
            <svg className="size-6 text-white">...</svg>
            سوالات و نظرات من
          </MenuLink>

          <MenuLink href="/details" className="flex items-center gap-x-5">
            <svg className="size-6 text-white">...</svg>
            اطلاعات حساب کاربری
          </MenuLink>

          <MenuLink href="/faq" className="flex items-center gap-x-5">
            <svg className="size-6 text-white">...</svg>
            سوالات رایج کاربران
          </MenuLink> */}

          {children}
        </div>
      </div>
    </>
  );
}

export default ProfileHeader;