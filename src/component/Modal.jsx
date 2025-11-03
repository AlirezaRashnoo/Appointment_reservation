import React from "react";
import { IoMdClose } from "react-icons/io";
import Input from "./Input";
import Button from "./Button";


function Modal() {
    return ( 
        <div className="container">
            {/* <div className="fixed top-1/2 bottom-1/2 w-full bg-red-500 h-32 rounded-2xl z-50">
                <div className="flex items-center justify-between mx-2.5 text-black">
                    <span>جستجو</span>
                    <IoMdClose className="size-5"/>
                </div>
                <div>
                    <div className="flex items-center bg-white h-10 rounded-lg overflow-hidden">
                        <input type="text" className="outline-none w-full px-2" placeholder="جستجوی دندانپزشک"/>
                        <Button className="flex items-center justify-center bg-mainColor h-full px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div> */}
            <div className="-top-0 transition-all duration-200 fixed w-full h-[120px] bg-zinc-700 z-50">
                <div className="px-3 py-2 space-y-8">
                    <div className="flex items-center justify-between text-white">
                        <p>جستجو</p>
                        {/* <IoCloseOutline className="size-6" onClick={()=>setIsShowSearchBox(!isShowSearchBox)}/> */}
                        <p>بستن</p>
                    </div>
                    <div className="flex items-center bg-white h-10 rounded-lg overflow-hidden">
                        <input type="text" className="outline-none w-full px-2" placeholder="نام آهنگ, نام خواننده , نام آلبوم و..." maxLength=""/>
                        <button className="flex items-center justify-center bg-mainColor h-full px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {/* <Button className="flex items-center justify-center bg-mainColor h-full px-3" type="" disabled={true}>
                            <IoSearchOutline className="size-5 text-white"/>
                        </Button> */}

                    </div>
                </div>
            </div>
        </div>
     );
}

export default Modal;