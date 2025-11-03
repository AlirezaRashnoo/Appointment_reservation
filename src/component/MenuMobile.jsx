// import React, { useState } from "react";
// import Button from "./Button";
// import Modal from "./Modal";
// import { IoMdBook } from "react-icons/io";
// import { FcAdvertising } from "react-icons/fc";
// import Cookies from "js-cookie";

// function MenuMobile() {
//     const [isShowModal,setIsShowModal] = useState(false)

//     const searchHandeler = ()=>{
//         console.log("click shod");
//         setIsShowModal(!isShowModal)
//     }

//     return ( 
//         <>
//             <div className="fixed bottom-0 h-[68px] bg-white w-full z-30 border-t border-secoundColor">
//                 <ul className="flex items-center justify-around child:p-2.5 child:text-[10px] child:text-gray-500">
//                     <li>
//                         <Button href={`${Cookies.get("refreshtoken") ? "/user-panel":"/login"}`} className="flex flex-col items-center gap-y-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
//                             </svg>
//                             {Cookies.get("refreshtoken") ? "پروفایل":"ورود/ثبت نام"}
//                         </Button>
//                     </li>
//                     <li>
//                         <Button href="/allDentist" className="flex flex-col items-center gap-y-1">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
//                             </svg>
//                             دندانپزشکان
//                         </Button>
//                     </li>
//                     <li>
//                         <Button href="/" className="flex flex-col items-center gap-y-1 text-white -mt-7 bg-blue-500 w-12 h-20 rounded-t-full pt-[13px]">
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-white">
//                                 <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
//                                 <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
//                             </svg>
//                             خانه
//                         </Button>
//                     </li>
//                     <li>
//                         <Button href="/blog" className="flex flex-col items-center gap-y-1" onClick={searchHandeler}>
//                             {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
//                                 <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
//                             </svg> */}
//                             <IoMdBook className="size-6"/>
//                             مقاله ها
//                         </Button>
//                     </li>
//                     <li>
//                         <Button href="/registerdentist" className="flex flex-col items-center gap-y-1">
//                             {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
//                                 <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
//                             </svg> */}
//                             <FcAdvertising className="size-6 text-slate-500 fill-slate-500" />
//                             تبلیغات
//                         </Button>
//                     </li>
//                 </ul>
//             </div>
//         </>
//      );
// }

// export default MenuMobile;









// import React, { useState, useEffect } from "react";
// import Button from "./Button";
// import { IoMdBook } from "react-icons/io";
// import { FcAdvertising } from "react-icons/fc";
// import { useUserStore } from "@/stores/useUserStore";

// function MenuMobile() {
//   const [isShowModal, setIsShowModal] = useState(false);
//   const profile = useUserStore((state) => state.profile);

//   useEffect(() => {
//     // console.log("Current profile:", profile);
//   }, [profile]);

//   const searchHandler = () => {
//     console.log("click shod");
//     setIsShowModal(!isShowModal);
//   };

//   return (
//     <>
//       <div className="fixed bottom-0 h-[68px] bg-white w-full z-30 border-t border-secoundColor">
//         <ul className="flex items-center justify-around child:p-2.5 child:text-[10px] child:text-gray-500">
//           <li>
//             <Button
//               href={profile ? "/user-panel" : "/login"}
//               className="flex flex-col items-center gap-y-1"
//             >
//               {profile ? "ورود به پنل" : "ورود/ثبت نام"}
//             </Button>
//           </li>
//           {/* بقیه لینک‌ها */}
//           <li>
//             <Button href="/allDentist" className="flex flex-col items-center gap-y-1">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
//                 </svg>
//               دندانپزشکان
//             </Button>
//           </li>
//           <li>
//             <Button href="/" className="flex flex-col items-center gap-y-1 text-white -mt-7 bg-blue-500 w-12 h-20 rounded-t-full pt-[13px]">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-white">
//                     <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
//                     <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
//                 </svg>
//               خانه
//             </Button>
//           </li>
//           <li>
//             <Button href="/blog" className="flex flex-col items-center gap-y-1" onClick={searchHandler}>
//               <IoMdBook className="size-6" />
//               مقاله ها
//             </Button>
//           </li>
//           <li>
//             <Button href="/registerdentist" className="flex flex-col items-center gap-y-1">
//               <FcAdvertising className="size-6 text-slate-500 fill-slate-500" />
//               تبلیغات
//             </Button>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default MenuMobile;


// ----------------------------------------------------------


import React, { useState } from "react";
import Button from "./Button";
import { IoMdBook } from "react-icons/io";
import { FcAdvertising } from "react-icons/fc";
import { useUserStore } from "@/stores/useUserStore";
import { getDashboardPath } from "@/utils/routeHelpers"; // مسیر را اصلاح کن متناسب با ساختار پروژه


function MenuMobile() {
  const [isShowModal, setIsShowModal] = useState(false);
  const profile = useUserStore((state) => state.profile);

  const searchHandler = () => {
    setIsShowModal(!isShowModal);
  };

  // گرفتن مسیر پنل داینامیک بر اساس نقش کاربر
  const dashboardLink =  profile?.userStatus=="actived" ? getDashboardPath(profile.role) : "/login";
  // const dashboardLink = profile ? getDashboardPath(profile.role);

const isDentist = profile?.role === "dentist";
const isActived = profile?.userStatus === "actived";
const isPending = profile?.userStatus === "pending";

const handleClick = (e) => {
  if (isDentist && isPending) {
    e.preventDefault();
    alert("اطلاعاتتون در حال بررسی است");
  }
};

const href = isDentist
  ? isActived
    ? "/dentist-panel/details"
    : "/registerdentist"
  : "/registerdentist";

const label = isDentist && isActived ? "تبلیغات" : "ثبت دندان پزشکان";




  return (
    <>
      <div className="fixed bottom-0 h-[68px] bg-white w-full z-30 border-t border-secoundColor">
        <ul className="flex items-center justify-around child:p-2.5 child:text-[10px] child:text-gray-500">
          <li>
            {profile?.userStatus=="pending"?(
              <Button className="flex flex-col items-center gap-y-1"
                  onClick={handleClick}
              >
                 {/* onClick={handleClick} */}
                حساب کاربری
              </Button>
            ):(
              <Button href={dashboardLink} className="flex flex-col items-center gap-y-1">
                {profile?.userStatus=="actived" ? "پنل کاربری" : "ورود/ثبت نام"}
              </Button>
            )}
          </li>
          {/* بقیه لینک‌ها */}
          <li>
            <Button href="/allDentist" className="flex flex-col items-center gap-y-1">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                 </svg>
              دندانپزشکان
            </Button>
          </li>
          <li>
            <Button href="/" className="flex flex-col items-center gap-y-1 text-white -mt-7 bg-blue-500 w-12 h-20 rounded-t-full pt-[13px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-white">
                     <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                     <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                 </svg>
              خانه
            </Button>
          </li>
          <li>
            <Button href="/blog" className="flex flex-col items-center gap-y-1" onClick={searchHandler}>
              <IoMdBook className="size-6" />
              مقاله ها
            </Button>
          </li>
          <li>
            {/* <Button href="/registerdentist" className="flex flex-col items-center gap-y-1">
              <FcAdvertising className="size-6 text-slate-500 fill-slate-500" />
              تبلیغات
            </Button> */}
            {/* {profile?.userStatus=="pending"?(

            ):(

            )} */}
            {/* <Button href={profile?.role=="dentist" && profile?.userStatus=="actived" ? "/dentist-panel/details":profile?.role=="dentist" && profile?.userStatus=="pending"? alert("اطلاعاتتون در حال برسی است"):"/registerdentist"} className="flex flex-col items-center gap-y-1">
              <FcAdvertising className="size-6 text-slate-500 fill-slate-500" />
              {profile?.role=="dentist" && profile?.userStatus=="actived" ? "تبلیغات" : "ثبت دندان پزشکان"}
            </Button> */}

            {profile?.userStatus=="pending"?(
              <Button
                  // href={href}
                  
                  onClick={handleClick}
                  className="flex flex-col items-center gap-y-1"
                >
                  <FcAdvertising className="size-6 text-slate-500 fill-slate-500" />
                  {label}
              </Button>
            ):(
              <Button
                  href={href}
                  
                  // onClick={handleClick}
                  className="flex flex-col items-center gap-y-1"
                >
                  <FcAdvertising className="size-6 text-slate-500 fill-slate-500" />
                  {label}
              </Button>

            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default MenuMobile;