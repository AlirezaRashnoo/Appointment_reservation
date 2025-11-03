import React from "react";
import Button from "./Button";
import Input from "./Input";

function Footer() {
    const scrolTop = ()=>{
        console.log("top broo")
        // scrolTop(0,0)
        scrollTo(0,0)
    }
    return ( 
        <footer className="mt-40 pb-12">
            <Button href="#" className="flex items-center justify-center size-9 bg-blue-500 rounded-full text-white text-center py-1 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
            </Button>
            <div>
                <div className="h-[154px] pt-[34px] -my-4">
                    <div className="relative bg-blue-500 h-full">
                        <div className="container">
                            <div className="">
                                <div>
                                    <span className="text-[13px] block py-6 text-white">به جمع هزاران دندانپزشک ما بپیوندید</span>
                                    <Button href="#" className="inline-block w-[133px] h-9 py-2.5 px-5 bg-white rounded-[100px] text-[10px] text-black mr-4">
                                        ثبت نام دندانپزشکان
                                    </Button>
                                </div>
                                <img src="../images/image-dentist-footer.png" alt="dentist-image" className="absolute bottom-0 w-[120px] left-3.5"/>
                                
                            </div>
                            <div className="pb-16">
                                <div>
                                    <div>
                                        <p className="block text-base mt-9 mb-5">شبکه های اجتماعی ما</p>
                                        <div className="flex items-center justify-between">
                                            <Button href="#">
                                                <img src="../images/instagram_icon.png" alt="media_img" className="size-10 rounded-full"/>
                                            </Button>
                                            <Button href="#">
                                                <img src="../images/whatsapp_icon.png" alt="media_img" className="size-10 rounded-full"/>
                                            </Button>
                                            <Button href="#">
                                                <img src="../images/telegram_icon.jpg" alt="media_img" className="size-10 rounded-full"/>
                                            </Button>
                                            <Button href="#">
                                                <img src="../images/twiter_icon.jpg" alt="media_img" className="size-10 rounded-full"/>
                                            </Button>
                                            <Button href="#">
                                                <img src="../images/facebook_icon.jpg" alt="media_img" className="size-10 rounded-full"/>
                                            </Button>
                                            
                                        </div>
                                    </div>
                                    <div>
                                        <p className="block text-base mt-9 mb-5">عضویت در خبرنامه</p>
                                        <form>
                                            <div className="relative border border-secoundColor rounded-[100px] overflow-hidden bg-white block">
                                                <Input element="input" type="text" className="h-11 w-[69%] text-xs m-1 p-2.5" placeholder="شماره موبایل خود را وارد کنید" maxLength=""/>
                                                <button type="submit" className="absolute left-[5px] h-11 bg-blue-500 rounded-[100px] py-2.5 px-[26px] text-white my-[5px]">تایید</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex mt-12">
                                    <div className="w-1/2">
                                        <ul className="child:py-2.5 child:pl-10 child:text-sm">
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    قوانین و مقرارات
                                                </Button>

                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    حریم خصوصی
                                                </Button>

                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    فرصت های شغلی
                                                </Button>

                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>
                                                <Button href="#" clasName="block">
                                                    درباره ما
                                                </Button>
                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>
                                                <Button href="#" clasName="block">
                                                    تماس با ما
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="w-1/2 child:text-sm">
                                        <ul className="child:py-2.5 child:pl-10">
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    صفحه اصلی
                                                </Button>

                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    ثبت نام دندانپزشک
                                                </Button>

                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    مجله دندانپزشکی
                                                </Button>

                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    جدید ترین مطالب
                                                </Button>
                                            </li>
                                            <li className="flex items-center gap-x-2">
                                                <span className="size-[7px] rounded-full bg-blue-500"></span>

                                                <Button href="#" clasName="block">
                                                    پربازدید ترین مطالب
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </div>
                                <div className="flex items-center justify-between h-[110px] max-h-full my-8">
                                    <div className="flex items-center justify-center p-[5px] h-full rounded-[20px] bg-white shadow-Main ">
                                        <img src="../images/bank-logo.png" alt="image_logo" className="max-h-full w-auto"/>
                                    </div>
                                    <div className="flex items-center justify-center p-[5px] h-full rounded-[20px] bg-white shadow-Main ">
                                        <img src="../images/samandehi-min.png" alt="image_logo" className="max-h-full w-auto"/>
                                    </div>
                                    <div className="flex items-center justify-center p-[5px] h-full rounded-[20px] bg-white shadow-Main ">
                                        <img src="../images/E-namad.png" alt="image_logo" className="max-h-full w-auto"/>
                                    </div>
                                </div>
                                <div className="">
                                    <span className="inline-block text-black text-[15px] mb-3.5">خلاصه ای از ما</span>
                                    <div>
                                        <p className="text-justify leading-7">سامانه نوبت دهی اینترنتی دندانپزشکان ایران با هدف سهولت دسترسی به دندانپزشکان معتبر در ایران در سال 1399 راه اندازی گردیده است. در سایت دندانپزشکان ایران میتوانید مرجع کاملی از دندانپزشکان در شهرهای مختلف ایران مانند دندانپزشک در تهران ، اصفهان ، مشهد ، دندانپزشک در شیراز و... را مشاهده نمایید. امکان اخذ نوبت اینترنتی همچنین امکان استفاده از تخفیف های ویژه برای کاربران سایت فراهم گردیده است. سایت دندانپزشکان ایران اولین و تنها سامانه تخصصی نوبت دهی اینترنتی دندانپزشکان در ایران می باشد . در بخش مجله سلامت سایت دندانپزشکان ایران ، نکات و مطالب مفیدی درباره‌ی مراقبت از دندان و سلامت دهان و دندان برای شما عزیزان ارائه گردیده است.</p>
                                    </div>
                                </div>
                                <div className="text-center p-4 text-white text-xs bg-blue-400 leading-6 mt-4">
                                    مسئولیت صحت آگهی های درج شده در این سایت بعهده آگهی دهنده میباشد. تمام حقوق و محتویات این سایت متعلق به علیرضا رشنو و علی میباشد و هرگونه کپی برداری بدون ذکر منبع پیگرد قانونی دارد ©
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
     );
}

export default Footer;