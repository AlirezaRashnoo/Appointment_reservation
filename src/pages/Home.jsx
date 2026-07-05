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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaCircleUser } from "react-icons/fa6";

const BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

const fetchExperiencedDentists = async () => {
    const { data } = await axios.get(`${BASE_URL}/dentist/all`, {
        params: { limit: 10, page: 1, orderBy: "yearsOfExperience" },
    });
    return data.data.dentists;
};

const fetchNewestDentists = async () => {
    const { data } = await axios.get(`${BASE_URL}/dentist/all?limit=10&page=1&orderBy=averageRating`, {
        // params: { limit: 10, page: 1 },
    });
    return data.data.dentists;
};

const DentistCard = ({ dentist }) => (
    <VipCart>
        <a href={`/dentist/${dentist.userId}`}>
            <div className="p-4 pb-3">
                <div className="relative flex items-center justify-center size-[133px] mx-auto">
                    <img src="./images/dentist_box_backgroundImag.svg" alt="" className="w-full" />
                    {dentist?.avatar?(
                    // <div>
                        <img
                            src={dentist.avatar}
                            alt={`${dentist.firstName} ${dentist.lastName}`}
                            className="rounded-full w-[67%] absolute object-cover"
                        />
                    // </div>
                    ):(
                        // <div className="relative w-[115px] h-[115px] flex-shrink-0">
                        <>
                            <img
                            src="./images/dentist_box_backgroundImag.svg"
                            alt="background"
                            className="absolute inset-0 w-full h-full object-cover rounded-full"
                            />
                            <FaCircleUser className="absolute inset-0 w-[70%] h-[70%] m-auto fill-gray-400" />
                        </>
                        // </div>
                    )}
                </div>
                <div className="mt-3.5 text-center mb-3.5">
                    <p className="text-[13px] mb-1.5">
                        {dentist.firstName && dentist.lastName
                            ? `${dentist.firstName} ${dentist.lastName}`
                            : "نام نامشخص"}
                    </p>
                    <p className="text-xs text-gray-500">
                        {dentist.specialization || "تخصص نامشخص"}
                    </p>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 stroke-gray-500 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                </div>
                <div className="border-t border-primeryColor pt-3 mt-2.5 text-xs">
                    <p className="text-center text-gray-500">
                        {dentist.yearsOfExperience} سال سابقه
                    </p>
                </div>
            </div>
        </a>
    </VipCart>
);

const DentistCardSkeleton = () => (
    <div className="animate-pulse p-4 rounded-xl bg-white shadow-sm">
        <div className="size-[133px] bg-gray-200 rounded-full mx-auto mb-4" />
        <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
    </div>
);

function Home() {
    const {
        data: experienced = [],
        isLoading: loadingExperienced,
        isError: errorExperienced,
    } = useQuery({
        queryKey: ["dentists", "experienced"],
        queryFn: fetchExperiencedDentists,
    });

    const {
        data: newest = [],
        isLoading: loadingNewest,
        isError: errorNewest,
    } = useQuery({
        queryKey: ["dentists", "newest"],
        queryFn: fetchNewestDentists,
    });

    const validExperienced = experienced.filter((d) => d.firstName && d.lastName);
    const validNewest = newest.filter((d) => d.firstName && d.lastName);

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

                        {/* با سابقه‌ترین دندان‌پزشکان */}
                        <section className="mb-10">
                            <Title text="با سابقه‌ترین دندان‌پزشکان">
                                <Button href="/allDentist" className="flex items-center justify-center text-mainColor">
                                    مشاهده همه
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </Button>
                            </Title>
                            {errorExperienced ? (
                                <p className="text-center text-red-400 text-sm py-4">خطا در دریافت اطلاعات</p>
                            ) : (
                                <Slider navigation={false}>
                                    {loadingExperienced
                                        ? Array(4).fill(0).map((_, i) => (
                                            <SwiperSlide key={i}>
                                                <DentistCardSkeleton />
                                            </SwiperSlide>
                                        ))
                                        : validExperienced.map((dentist) => (
                                            <SwiperSlide key={dentist.userId}>
                                                <DentistCard dentist={dentist} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Slider>
                            )}
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

                        {/* جدیدترین دندان‌پزشکان */}
                        <section className="mb-10">
                            <Title text="جدیدترین دندان‌پزشکان">
                                <Button href="/allDentist" className="flex items-center justify-center text-mainColor">
                                    مشاهده همه
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                </Button>
                            </Title>
                            {errorNewest ? (
                                <p className="text-center text-red-400 text-sm py-4">خطا در دریافت اطلاعات</p>
                            ) : (
                                <Slider navigation={false}>
                                    {loadingNewest
                                        ? Array(4).fill(0).map((_, i) => (
                                            <SwiperSlide key={i}>
                                                <DentistCardSkeleton />
                                            </SwiperSlide>
                                        ))
                                        : validNewest.map((dentist) => (
                                            <SwiperSlide key={dentist.userId}>
                                                <DentistCard dentist={dentist} />
                                            </SwiperSlide>
                                        ))
                                    }
                                </Slider>
                            )}
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