import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import Button from "../component/Button";

function BlogBox() {
    return ( 
        <div className="bg-white h-[320px] py-3 px-[15px] border border-secoundColor rounded-xl shadow-Main">
            {/* <FaCircleUser/> */}
            <div className="flex items-center justify-between mb-2 text-gray-400">
                <div className="flex items-center gap-x-1">
                    <FaCircleUser className="size-5 text-gray-500"/>
                    <span className="text-[10px]">امین روغنیان</span>
                </div>
                <span className="text-[10px]">44 ساعت قبل</span>

            </div>
            <div className="flex items-center justify-center child:rounded-md">
                <img src="../images/blog_box_image1.jpg" alt="image_blog" className="h-[160px] w-full bg-cover object-center"/>
            </div>
            <div className="h-11 mb-2 mt-4 text-xs">
                <p className="line-through-[23px]">بهترین دهانشویه برای سنگ لوزه چیست؟</p>
            </div>
            <div className="flex items-center justify-between border-t border-primeryColor h-12 py-3">
                <div className="flex items-center gap-x-4 text-gray-400">
                    <div className="flex items-center gap-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                        </svg>

                        <span className="text-[10px]">37 بازدید</span>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                        <span className="text-[10px]">0 لایک</span>
                    </div>
                </div>
                <div>
                    <Button type="text">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
        // stroke-linecap
     );
}

export default BlogBox;