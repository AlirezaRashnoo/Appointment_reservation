import React from "react";


function DentistBox() {
    return ( 
        <div className="relative bg-white p-4 pb-3 w-[214] border border-secoundColor rounded-[20px] overflow-hidden">
            <span className="absolute left-0 top-0 bg-primeryColor text-base text-textColorSecound w-[63px] h-[43px] py-[13px] px-[23px] rounded-br-full">VIP</span>
            <div>
                <div className="relative flex items-center justify-center size-[133px] mx-auto">
                    <img src="./images/dentist_box_imag1.webp" alt="image" className="rounded-full w-[67%] absolute"/>
                    <img src="./images/dentist_box_backgroundImag.svg" alt="" className="w-full"/>
                </div>
                <div className="mt-3.5 text-center mb-3.5">
                    <p className="text-[13px] mb-1.5">کلینیک دندان پزشکی سیب</p>
                    <p className="text-xs text-gray-500">کلیه خدمات دندان پزشکی</p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 stroke-gray-500 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                </div>
                <div className="border-t border-primeryColor pt-3 mt-2.5 text-xs">
                    <p className="text-center text text-gray-500">تهران,شهرک اندیشه</p>
                </div>
            </div>
        </div>
     );
}

export default DentistBox;