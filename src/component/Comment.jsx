// import React from "react";
// import { FaCircleUser } from "react-icons/fa6";
// import { TiArrowBackOutline } from "react-icons/ti";
// import { Link } from "react-router-dom";

// function Comment({dentistId ,onCommentAdded}) {



//     return ( 
//         <>
//             <div className="bg-white p-4 rounded-xl border border-dashed border-black md:h-28">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-x-2">
//                         <FaCircleUser className="size-9 fill-gray-500"/>
//                         <div className="flex flex-col gap-y-1 font-semibold">
//                             <span className="text-sm">علیرضا رشنو</span>
//                             <span className="text-xs">1404/1/04</span>
//                         </div>
//                     </div>
//                     <div className="rounded-full hover:bg-slate-300 w-9 h-9 flex items-center justify-center">
//                         <TiArrowBackOutline className="size-6"/>
//                     </div>
//                     {/* {isLogin?(
//                         <div className="rounded-full hover:bg-slate-300 w-9 h-9 flex items-center justify-center">
//                             <TiArrowBackOutline className="size-6"/>
//                         </div>
//                     ):(
//                         <Link to="/login" className="flex items-center justify-center bg-orange-500 text-white h-8 w-24 rounded-md font-semibold">وارد شوید</Link>
//                     )} */}
                    
//                 </div>
//                 <div className="pt-3 font-medium text-sm">
//                     <p>سلام من از کار ایشون راضی بودم</p>
//                 </div>
//             </div>
//         </>
//      );
// }

// export default Comment;

    // console.log(isLogin);



// ----------------------------------------------------


import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";
import supabase from "@/api/supabase";

export default function Comment(props) {

  return (
        <div className="bg-white p-4 rounded-xl border border-dashed border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              {props.imageProfile?(
                <img 
                src={props.imageProfile}
                alt="avatar"
                className="object-cover size-12 rounded-full"
              />
              ):(
                  <FaCircleUser className="size-9 fill-gray-500" />

              )}
              <div className="flex flex-col gap-y-1 font-semibold">
                <span className="text-sm">{props.userName}</span>
                <span className="text-xs">{props.date}</span>
              </div>
            </div>
            <div className="rounded-full hover:bg-slate-300 w-9 h-9 flex items-center justify-center">
              <TiArrowBackOutline className="size-6" />
            </div>
          </div>
          <div className="pt-3 font-medium text-sm">
            <p>{props.content}</p>
            {/* {props.reply && (
              <p className="text-blue-600 mt-2">👨‍⚕️ پاسخ دکتر: {props.reply}</p>
            )} */}
            {props.reply &&(
              <div className="bg-blue-100/80 px-4 py-3 space-y-3 rounded-xl mt-3">
                  <div className="flex items-center gap-x-3">
                      {props.imageDentistReplyed?
                        (
                          <img src={props.imageDentistReplyed} alt="image" className="object-cover size-12 rounded-full"/>
                        ):(
                            <FaCircleUser className="size-9 fill-gray-500" />
                        )
                      }
                      <div className="">
                        <p>{props.dentistName} | دندانپزشک</p>
                        <p className="text-red-500">{props.replyDate}</p>
                        {/* {console.log(props.replyDate)} */}
                      </div>
                  </div>

                  <div className="">
                    <p>{props.reply}</p>
                  </div>
              </div>
            )}
          </div>
        </div>
  );
}









    












       