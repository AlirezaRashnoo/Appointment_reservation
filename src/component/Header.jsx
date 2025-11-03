import React, { useEffect } from "react";
import Button from "./Button";
import { useState } from "react";
import Input from "./Input";
// import { IoClose } from "react-icons/io5";
import MenuLink from "./MenuLink";
import { IoCloseOutline } from "react-icons/io5";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";


function Header() {
    const [isShowSearchBox,setIsShowSearchBox] = useState(false)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [isLogin,setIsLogin] = useState('')
    const profile = useUserStore((state) => state.profile);

    useEffect(()=>{
        const token = Cookies.get("refreshtoken")
        if(token){
            setIsLogin(token)
        }
    },[isLogin])

    return (
        <>
            <header className="bg-white">
                {/* header mobile */}
                <div className="py-4 border-b border-gray-300">
                    <div className="container">
                        <div className="flex items-center justify-between">
                            <div onClick={()=> setIsShowMenu(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </div>
                            <div>
                                <div className="flex items-center gap-x-1">
                                    <img src="./images/logo.jpg" alt="logo" />
                                    <h1 className="text-mainColor text-lg">دندانپزشکان لرستان</h1>
                                </div>
                            </div>
                            <div>
                                <Button onClick={()=>setIsShowSearchBox(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>

                    </div>
                    <div className="container flex items-center justify-center">
                        <div className={`${isShowSearchBox ? "top-1/2 bottom-1/2":"-top-[149px]"} transition-all duration-200 fixed w-11/12 h-[149px] p-4 bg-white z-50 rounded-2xl`}>
                            <div className="space-y-8">
                                <div className="flex items-center justify-between text-black">
                                    <p className="text-lg">جستجو</p>
                                    {/* <IoCloseOutline className="size-6" onClick={()=>setIsShowSearchBox(!isShowSearchBox)}/> */}
                                    <Button onClick={()=>setIsShowSearchBox(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-black/50">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </Button>
                                </div>
                                <div className="flex items-center justify-between bg-gray-200 h-14 rounded-lg overflow-hidden">
                                    <Input element="input" type="text" className="w-full px-2 bg-gray-200" placeholder="جستجوی دندانپزشکان ..." maxLength=""/>
                                    <Button className="flex items-center justify-center bg-mainColor h-full px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                        </svg>
                                    </Button>
                                    {/* <Button className="flex items-center justify-center bg-mainColor h-full px-3" type="" disabled={true}>
                                        <IoSearchOutline className="size-5 text-white"/>
                                    </Button> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* sideBar */}
            {/* <div className="fixed inset-0 z-50 max-w-[300px] mr-auto bg-white px-2.5 py-4 border border-red-500">
                <div className="flex items-center justify-between border-b border-gray-400 pb-3">
                    <div className="flex items-center gap-x-1">
                        <img src="./images/logo.jpg" alt="logo" />
                        <h1 className="text-mainColor text-lg">دندانپزشکان لرستان</h1>
                    </div>
                    <div>
                        <Button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </Button>
                    </div>
                </div>
                <div>

                </div>
            </div> */}
            <div className={`${isShowSearchBox || isShowMenu ?"h-full":""} fixed top-0 w-full bg-black/60 z-40`}></div>
            <div className={`fixed z-50 ${isShowMenu? "inset-0":"-left-[300px]"} max-w-[300px] mr-auto bg-white p-3 transition-all duration-300`}>
                <div className="flex items-center justify-between pb-3 border-b border-black">
                    <div className="flex items-center gap-x-1">
                        <img src="./images/logo.jpg" alt="logo" />
                        <h1 className="text-mainColor text-lg">دندانپزشکان لرستان</h1>
                    </div>
                    {/* <IoClose className="size-8 transition-all duration-300" onClick={()=> setIsShowMenu(false)}/> */}
                    <IoCloseOutline className="size-8 transition-all duration-300" onClick={()=> setIsShowMenu(false)}/>
                </div>

                <div className="px-4 mt-4">
                    {profile ?(
                        <Button href="/userpanel" className="inline-flex items-center justify-center rounded-[10px] text-center w-full h-11 bg-blue-400 text-white font-normal">
                            پروفایل من |
                        </Button>

                    ):(
                        <Button href="/login" className="inline-flex items-center justify-center rounded-[10px] text-center w-full h-11 bg-blue-400 text-white font-normal">
                            ورود/عضویت
                        </Button>
                    )}
                </div>
                <div className="my-4 space-y-8">
                    <MenuLink href="/" className="flex items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        خانه

                    </MenuLink>
                    <MenuLink className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                            </svg>
                            دسته بندی پزشکان
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                        </svg>

                    </MenuLink>
                    <MenuLink href="/blog" className="flex items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        مجله دندان پزشکی
                    </MenuLink>
                    <MenuLink href="/registerdentist" className="flex items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                        سفارش تبلیغ
                    </MenuLink>
                    <MenuLink href="#" className="flex items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                        درباره ما
                    </MenuLink>
                    <MenuLink href="#" className="flex items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>

                        ارتباط با پشتیبانی
                    </MenuLink>
                    <MenuLink href="#" className="flex items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                        </svg>

                        قوانین و مقررات
                    </MenuLink>
                    <MenuLink href="#" className="flex items-center gap-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-blue-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>

                        سوالات متداول
                    </MenuLink>
                </div>
            </div>
        </>
     );
}

export default Header;