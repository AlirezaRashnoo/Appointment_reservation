import React, { useState } from "react";
import Button from "./Button";
import MenuLink from "./MenuLink";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";

function ProfileHeader({children}) {
  // const [isShowMenu, setIsShowMenu] = useState(false);
  // const profile = useUserStore((state) => state.profile);
  // const clearProfile = useUserStore((state) => state.clearProfile);
  // const navigate = useNavigate();


  // if (!profile) return null;


  // const handleLogout = async () => {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;

  //     clearProfile(); // پاک کردن اطلاعات کاربر از Zustand
  //     navigate("/"); // هدایت به صفحه لاگین (یا صفحه اصلی)
  //   } catch (err) {
  //     console.error("خطا در خروج از حساب:", err.message);
  //     alert("مشکلی در خروج از حساب رخ داد");
  //   }
  // };

  // return (
  //   <>
  //     {/* --- Header Bar --- */}
  //     <header className="flex items-center justify-between h-[75px] px-[25px] shadow-Main bg-white">
  //       <Button
  //         className="flex items-center justify-center border border-gray-300 p-1 rounded-xl"
  //         onClick={() => setIsShowMenu(true)}
  //       >
  //         {/* Hamburger Icon */}
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           strokeWidth="1.5"
  //           stroke="currentColor"
  //           className="size-8"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
  //           />
  //         </svg>
  //       </Button>

  //       {/* Logout Button */}
  //       <Button className="flex items-center gap-x-2 text-red-500" onClick={handleLogout}>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           strokeWidth="1.5"
  //           stroke="currentColor"
  //           className="size-5"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
  //           />
  //         </svg>
  //         خروج از حساب
  //       </Button>
  //     </header>

  //     {/* --- Overlay --- */}
  //     <div
  //       className={`${isShowMenu ? "h-full" : ""} fixed top-0 w-full bg-black/60 z-40`}
  //       onClick={() => setIsShowMenu(false)}
  //     ></div>

  //     {/* --- Side Menu --- */}
  //     <div
  //       className={`fixed z-50 ${
  //         isShowMenu ? "inset-0" : "-right-[250px]"
  //       } max-w-[250px] bg-blue-500 p-3 pt-12 transition-all duration-300 text-white`}
  //     >
  //       <div className="pt-10 pb-[38px] text-center border-b border-white">
  //         {/* Avatar */}
  //         <div className="flex items-center justify-center size-[100px] mt-auto mb-6 mx-auto rounded-full overflow-hidden bg-white">
  //           {profile.avatar_url ? (
  //             <img
  //               src={profile.avatar_url}
  //               alt="avatar"
  //               className="w-full h-full object-cover"
  //             />
  //           ) : (
  //             <div className="flex items-center justify-center w-full h-full text-blue-500 font-bold text-3xl">
  //               {profile.name?.charAt(0) || "؟"}
  //             </div>
  //               // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-12 text-blue-500">
  //               //     <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  //               // </svg>
  //           )}
  //         </div>

  //         {/* Name */}
  //         <p className="mb-2 text-[17px] font-semibold">{profile.name || "بدون نام"}</p>

  //         {/* Phone */}
  //         <p className="mb-2 text-sm">{profile.phone || "شماره‌ای وارد نشده"}</p>
  //       </div>

  //       {/* --- Menu Links --- */}
  //       <div className="my-8 space-y-6 py-5 px-[15px]">
          

  //         {children}
  //       </div>
  //     </div>
  //   </>
  // );

  return(
    <div>Header</div>

  )
}

export default ProfileHeader;