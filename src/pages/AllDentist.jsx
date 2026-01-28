import { useQuery } from "@tanstack/react-query";
// import supabase from "@/api/supabase";
import VipCart from "@/component/VipCart";
import Header from "@/component/Header";
import Button from "@/component/Button";
import { FaCircleUser } from "react-icons/fa6";
import Footer from "@/component/Footer";
import MenuMobile from "@/component/MenuMobile";



export default function AllDentist() {


  return (
    <>
      <Header />


      <div className="mb-96 mt-32 font-DanaMedium">
            <div className="container">
                <div className="my-[30px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <img src="../images/Tooth_image.png" alt="Tooth" className="w-[30px] h-9" />
                            <p className="text-sm">لیست دندان پزشکان</p>
                        </div>
                        
                    </div>
                    {/* <p className="text-[11px] text-gray-400 pt-2">{dentists.length} دندانپزشک</p> */}
                    <p className="text-[11px] text-gray-400 pt-2">123 دندانپزشک</p>
                </div>
                <div className="space-y-3 md:grid md:grid-cols-2 md:gap-x-2 xl:grid-cols-3">
                    {/* {dentists.map((dentist) => (
                        

                        
                        <VipCart key={dentist.id}>
                        <a 
                           href={`/dentist/${dentist.id}`}
                        >
                            <div className="flex items-center gap-x-5 px-3 pt-2 mb-4">
                                
                                {dentist?.avatar_url?(
                                    <div className="relative w-[115px] h-[115px] flex-shrink-0">
                                        <img
                                        src="./images/dentist_box_backgroundImag.svg"
                                        alt="background"
                                        className="absolute inset-0 w-full h-full  object-cover rounded-full"
                                        />
                                        <img
                                        src={dentist.avatar_url || "/default-avatar.png"}
                                        alt={dentist.name}
                                        className="absolute inset-0 w-[70%] h-[70%] m-auto rounded-full object-cover border-2 border-white shadow"
                                        />
                                    </div>
                                    ):(
                                    <FaCircleUser className="size-16 fill-gray-500" />
                                )}
                                <div className="text-center">
                                    <p className="text-[13px] mb-1.5">{dentist.name}</p>
                                    <div className="space-y-2 text-xs text-gray-500">
                                        <p>{dentist.specialty}</p>
                                        <p> {dentist.experience} سال سابقه دندان پزشکی</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative -bottom-6 bg-blue-50 h-14 p-4">
                                <div className="flex items-center justify-between child:-mt-9">
                                    <div className="flex items-center gap-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-gray-400">
                                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-[11px]">{dentist.address}</p>
                                    </div>
                                    <Button className="flex items-center justify-center bg-blue-600 text-white px-2 h-8 rounded-xl text-sm">
                                        دریافت نوبت
                                    </Button>
                                </div>
                            </div>
                        </a>
                        </VipCart>
                    ))} */}
                </div>
            </div>
            <Footer />
        </div>
        <MenuMobile />
    </>
  );
}
