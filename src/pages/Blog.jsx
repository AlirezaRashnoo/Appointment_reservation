import React from "react";
import Button from "../component/Button";
import BlogBox from "../component/BlogBox";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Input from "../component/Input";
import MenuMobile from "../component/MenuMobile";

function Blog() {
    return ( 
        <>
            <Header/>
            <div className="bg-white">
                <div className="container">
                    <div className="">
                        <div className="flex flex-col items-center justify-center gap-y-3 sm:flex-row sm:justify-between py-8">
                            <div className="flex items-center gap-x-2">
                                <span className="hidden lg:inline-block bg-orange-300 size-3.5"></span>
                                <h3 className="text-2xl">وبلاگ</h3>
                            </div>
                            <p className="text-slate-500">417 مقاله</p>
                        </div>
                        <div className="flex flex-col gap-y-5 mb-6 lg:flex-row gap-x-8 lg:items-start">
                            <div className="flex items-center justify-between bg-white h-14 lg:w-1/3 rounded-lg overflow-hidden shadow-Main text-slate-500">
                                <Input element="input" type="text" className="w-full px-2 bg-white" placeholder="جستجو مقاله ها ..." maxLength=""/>
                                <Button className="flex items-center justify-center h-full px-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                                {/* <Button className="flex items-center justify-center bg-mainColor h-full px-3" type="" disabled={true}>
                                    <IoSearchOutline className="size-5 text-white"/>
                                </Button> */}

                            </div>
                            <div className="space-y-8">
                                <div className="bg-white h-14 rounded-md shadow-Main">
                                    <Button className="lg:hidden flex items-center gap-x-3 justify-center text-center text-slate-500 w-full h-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                        <span>جدید ترین</span>
                                    </Button>
                                    <div className="hidden lg:flex items-center text-center gap-x-6 h-full pr-4">
                                        <div className="flex items-center gap-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                            </svg>
                                           <span> مرتب سازی براساس:</span>
                                        </div>
                                        <Button to="#">
                                            عادی
                                        </Button>
                                        <Button to="#">
                                            جدید ترین
                                        </Button>
                                        <Button to="#">
                                            قدیمی ترین
                                        </Button>
                                        <Button to="#">
                                            پربازدید ترین
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                    <BlogBox />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <MenuMobile />
        </>
     );
}

export default Blog;