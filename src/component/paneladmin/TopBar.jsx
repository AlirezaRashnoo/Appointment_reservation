import React, { useEffect } from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { useUserStore } from "@/stores/useUserStore";
import { FaCircleUser } from "react-icons/fa6";



function TopBar() {

    const profile = useUserStore((state) => state.user);

    
    


    return ( 
        <div className="fixed left-0 w-4/5 top-0 h-16 bg-white shadow-Main z-50">
            {/* <div>Salam</div> */}
            <div className="flex justify-between items-center h-full px-3">
                <div className="flex items-center gap-x-3">
                    <input type="text" className="w-48 h-7 px-2 outline-none bg-blue-100 rounded-md text-xs" placeholder="جستجو..."/>
                    آیکن زنگوله
                </div>
                <div className="flex items-center gap-x-3">
                    <p>
                        {profile?.profile?.fullName} خوش آمدید!
                        {/* خوش آمدید */}
                    </p>
                    {profile?.profile?.avatar_url?
                    (
                        <img src={profile?.profile?.avatar_url} alt="img100" className="size-10 rounded-full cursor-pointer ml-2"/>
                    ):(
                        <FaCircleUser className="size-10 fill-gray-500"/>
                    )
                    }
                    {/* عکس پروفایل */}
                </div>
            </div>
        </div>
     );
}

export default TopBar;