import React from "react";
import Button from "../../component/Button";
import { IoChevronBackOutline } from "react-icons/io5";
import { useState } from "react";

function Rules() {

    const [accepted, setAccepted] = useState(false);


    return ( 
       <div>
            <header className="bg-gray-200 py-2 mb-10">
                <div className="container">
                    <div className="flex items-center gap-x-5 ">
                        <div>
                            <Button href="/dentist" className="w-full h-[300px]">
                                <IoChevronBackOutline className="size-8 rotate-180"/>
                            </Button>
                        </div>
                        <div className="">
                            <p className="text-red-500 font-bold text-lg">لطفا مطالعه کنید</p>
                            <p className="font-medium">قوانین و مقررات این مطب جهت نوبت گیری اینترنتی</p>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="space-y-5">

                    <div className="flex items-center gap-x-1">
                        <div className="bg-red-500 w-5 h-[3px]"></div>
                        پرداختی شما به مبلغ 0 تومان جهت اخذ نوبت بوده است
                        (در حال حاضر بابت اخذ نوبت هزینه ای دریافت نمی گردد)
                    </div>
                    <div className="flex items-center gap-x-1">
                        <div className="bg-red-500 w-5 h-[3px]"></div>
                        درصورت داشتن هرگونه علایم بیماری از جمله تب, سرفه, گلودرد لطفا از حضور در مطب خودداری کنید
                    </div>
                    <div className="flex items-center gap-x-1">
                        <div className="bg-red-500 w-5 h-[3px]"></div>
                        فرایند رزرو نوبت پس از انتخاب زمان نوبت دهی, به صورت خودکار انجام می شود
                        (نیازی نیست فرم رزرو نوبت را دوباره پر کنید)
                    </div>
                    <div className="flex items-center gap-x-1">
                        <div className="bg-red-500 w-5 h-[3px]"></div>
                        درصورتی که در سایت عضو نیستید لطفا نسبت به ثبت نام در سایت اقدام فرمایید
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 w-full flex items-center justify-between bg-white h-[76px] px-3 shadow-Main">
                <div className="flex items-center gap-x-3">
                <input
                    type="checkbox"
                    id="rules"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                />
                    <label htmlFor="rules">قوانین و مقررات را قبول دارم</label>
                </div>
                <div className="flex items-center justify-center">
                {/* flex items-center justify-center mx-auto bg-blue-400 w-[150px] rounded-[10px] h-11 text-white */}
                {/* flex items-center justify-between bg-blue-400 text-white px-3 py-2 rounded-2xl */}
                <Button
                    href={accepted ? "time-visit" : "#"}
                    className={`flex items-center justify-between mx-auto w-[120px] rounded-3xl h-10 px-3 ${
                    accepted ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!accepted}
                >
                        ادامه
                        <IoChevronBackOutline className="size-6"/>
                    </Button>
                </div>
            </div>
       </div>
     );
}

export default Rules;