import React from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { useUserStore } from "@/stores/useUserStore";
import { FaCircleUser } from "react-icons/fa6";



function TopBar() {

    const profile = useUserStore((state) => state.profile);
    


    return ( 
        <div className="fixed left-0 w-4/5 top-0 h-16 bg-white shadow-Main z-50">
            {/* <div>Salam</div> */}
            <div className="flex justify-between items-center h-full px-3">
                <div className="flex items-center gap-x-3">
                    <input type="text" className="w-48 h-7 px-2 outline-none bg-blue-100 rounded-md text-xs" placeholder="جستجو..."/>
                    آیکن زنگوله
                </div>
                <div className="flex items-center gap-x-3">
                    {/* <div className="relative cursor-pointer mr-[10px] text-gray-600">
                        <IoNotificationsCircleOutline />
                        <span className="absolute -top-[5px] right-0 flex items-center justify-center text-[10px] bg-red-500 text-white size-4 rounded-full">2</span>
                    </div>
                    <div className="relative cursor-pointer mr-[10px] text-gray-600">
                        <IoNotificationsCircleOutline />
                        <span className="absolute -top-[5px] right-0 flex items-center justify-center text-[10px] bg-red-500 text-white size-4 rounded-full">2</span>
                    </div>
                    <div className="cursor-pointer">
                        <IoNotificationsCircleOutline />
                    </div> */}
                    <p>
                        {profile?.name} خوش آمدید!
                    </p>
                    {profile?.avatar_url?
                    (
                        <img src={profile.avatar_url} alt="img100" className="size-10 rounded-full cursor-pointer ml-2"/>
                    ):(
                        <FaCircleUser className="size-10 fill-gray-500"/>
                    )
                    }
                </div>
            </div>
        </div>
     );
}

export default TopBar;