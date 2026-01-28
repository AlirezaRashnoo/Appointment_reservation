import React from "react";
import Button from "../component/Button";
import Title from "../component/Title";
import Slider from "../component/Slider";
import { SwiperSlide } from "swiper/react";
import BlogBox from "../component/BlogBox";
import MenuMobile from "../component/MenuMobile";
import VipCart from "../component/VipCart";
import Footer from "../component/Footer";
import Header from "../component/Header";
// import supabase from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";



function Home() {
    
    
    

    return ( 
        <>
            <Header />
            <div className="mb-96 mt-28">
                <div className="p-4 md:flex md:flex-row-reverse md:items-center md:justify-between">
                    <div className="relative flex items-center justify-center md:w-1/2">
                        <img src="./images/image_home.webp" alt="image" className="rounded-full w-[67%] absolute"/>
                        <img src="./images/header-background.png" alt="" className="w-full"/>
                    </div>
                    <div className="md:max-w-[50%]">
                        <div className="text-center child:mb-3 sm:child:mb-6">
                            <p className="">سامانه آنلاین</p>
                            <h2 className="text-xl sm:text-2xl md:text-4xl">نوبت دهی اینترنتی دندانپزشکان لرستان </h2>
                            <p className="text-sm sm:text-base md:text-lg md:hidden">برای مشاهده دندانپزشکان، نام تخصص، نام دندانپزشک، شهر یا محله را جستجو کنید</p>
                            <p className="hidden text-sm md:block md:text-xl">سایت دندانپزشکان ایران ، مرجع نوبت دهی و معرفی بهترین دندانپزشکان در ایران می باشد. از دندانپزشکان معتبر نوبت بگیرید و از تخفیف خدمات دندانپزشکی بهره مند شوید.</p>
                        </div>
                        <div>
                            <form>
                                <div className="flex items-center justify-between bg-white h-16 rounded-lg overflow-hidden shadow-Main my-4">
                                    <input type="text" className="w-full px-2 bg-white outline-none" placeholder="جستجوی دندان پزشک ..." maxLength=""/>
                                    <Button className="flex items-center justify-center bg-mainColor h-full px-3" type="submit">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <main>
                    <div className="container space-y-8">
                       
                        <section className="mb-10">
                            <Title text="با سابقه‌ترین دندان‌پزشکان">
                            <Button href="/allDentist" className="flex items-center justify-center text-mainColor">
                                مشاهده همه
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </Button>
                            </Title>
                            {/* <div>
                                <Slider navigation={false}>
                                {experience.map((dentist) => (
                                    <SwiperSlide key={dentist.id}>
                                    <VipCart>
                                        <a href={`/dentist/${dentist.id}`}>
                                            <div className="p-4 pb-3">
                                            <div className="relative flex items-center justify-center size-[133px] mx-auto">
                                                <img src="./images/dentist_box_backgroundImag.svg" alt="" className="w-full" />
                                                <img src={dentist.avatar_url || "/default-avatar.png"} alt={dentist.name} className="rounded-full w-[67%] absolute object-cover" />
                                            </div>
                                            <div className="mt-3.5 text-center mb-3.5">
                                                <p className="text-[13px] mb-1.5">{dentist.name}</p>
                                                <p className="text-xs text-gray-500">{dentist.specialty}</p>
                                            </div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 stroke-gray-500 mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                </svg>
                                            </div>
                                            <div className="border-t border-primeryColor pt-3 mt-2.5 text-xs">
                                                <p className="text-center text text-gray-500">{dentist.address}</p>
                                            </div>
                                            </div>
                                        </a>
                                        
                                    </VipCart>
                                    </SwiperSlide>
                                ))}
                                </Slider>
                            </div> */}
                        </section>
                        
                        <section>
                            <div className="sm:grid sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 mx-auto">
                                <div className="flex items-center justify-center">
                                    <img src="../images/categury_img1.webp" alt="categury_img1" className="rounded-[20px]"/>
                                </div>
                                <div>
                                    <img src="../images/categury_img2.webp" alt="categury_img2" className="hidden sm:block rounded-[20px]"/>
                                </div>
                                <div>
                                    <img src="../images/categury_img3.webp" alt="categury_img3" className="hidden md:block rounded-[20px]"/>
                                </div>
                            </div>
                        </section>
                        <section className="mb-10">
                            <Title text="جدیدترین دندان‌پزشکان">
                            <Button href="/allDentist" className="flex items-center justify-center text-mainColor">
                                مشاهده همه
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                </svg>
                            </Button>
                            </Title>
                            {/* <div>
                            <Slider navigation={false}>
                            {newest.map((dentist) => (
                                <SwiperSlide key={dentist.id}>
                                    <VipCart>
                                        <a href={`/dentist/${dentist.id}`}>
                                        <div className="p-4 pb-3">
                                    <div className="relative flex items-center justify-center size-[133px] mx-auto">
                                        <img src="./images/dentist_box_backgroundImag.svg" alt="" className="w-full" />
                                        <img src={dentist.avatar_url || "/default-avatar.png"} alt={dentist.name} className="rounded-full w-[67%] absolute object-cover" />
                                    </div>
                                    <div className="mt-3.5 text-center mb-3.5">
                                        <p className="text-[13px] mb-1.5">{dentist.name}</p>
                                        <p className="text-xs text-gray-500">{dentist.specialty}</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 stroke-gray-500 mx-auto">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </div>
                                    <div className="border-t border-primeryColor pt-3 mt-2.5 text-xs">
                                        <p className="text-center text text-gray-500">{dentist.address}</p>
                                    </div>
                                        </div>

                                        </a>
                                    </VipCart>
                                </SwiperSlide>
                            ))}
                            </Slider>
                            </div> */}
                        </section>

                        <section className="sm:hidden">
                            <div className="flex items-center justify-center">
                                <img src="../images/categury_img2.webp" alt="categury_img2" className="rounded-[20px]"/>
                            </div>
                        </section>
                        <section>
                            <div>
                                <Title text="جدیدترین مطالب مجله سلامت">
                                    <Button href="/blog" className="flex items-center justify-center text-mainColor">
                                        مشاهده همه
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>
                                    </Button>
                                </Title>
                            </div>
                            <div>
                                <Slider navigation={false}>
                                    <SwiperSlide>
                                        <BlogBox />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <BlogBox />
                                    </SwiperSlide>
                                </Slider>
                            </div>
                        </section>
                        <section className="sm:hidden">
                            <div className="flex items-center justify-center">
                                <img src="../images/categury_img3.webp" alt="categury_img2" className="rounded-[20px]"/>
                            </div>
                        </section>
                        <section>
                            <div>
                                <Title text="دندان پزشکان خرم آباد">
                                    <Button href="/allDentist" className="flex items-center justify-center text-mainColor">
                                        مشاهده همه
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>
                                    </Button>
                                </Title>
                            </div>
                            {/* <div>
                                <Slider navigation={false}>
                                    <SwiperSlide>
                                        <VipCart>
                                            <div className="p-4 pb-3">
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
                                        </VipCart>
                                    </SwiperSlide>
                                </Slider>
                            </div> */}
                        </section>
                    </div>
                    
                </main>
                <Footer/>
                <MenuMobile/>
            </div>
        </>
    );
}

export default Home;