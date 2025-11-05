import React from "react";
// import HeaderProfiles from "../../component/ProfileHeader";
import { Outlet } from "react-router-dom";
import ProfileHeader from "../../component/ProfileHeader";
import MenuLink from "@/component/MenuLink";



function UserPanel() {
    return ( 
        <>
            {/* <HeaderProfiles /> */}
            <div className="bg-blue-50">
                {/* <UserPanelHeader/> */}
                <ProfileHeader>
                    <MenuLink href="/" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        نوبت‌های من
                    </MenuLink>

                    <MenuLink href="#" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        ذخیره شده‌ها
                    </MenuLink>

                    <MenuLink href="#" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        سوالات و نظرات من
                    </MenuLink>

                    <MenuLink href="/details" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        اطلاعات حساب کاربری
                    </MenuLink>

                    <MenuLink href="#" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        سوالات رایج کاربران
                    </MenuLink>
                </ProfileHeader>
                <Outlet />
            </div>
        </>
     );
}

export default UserPanel;





