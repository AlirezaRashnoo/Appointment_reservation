import ProfileHeader from "@/component/ProfileHeader";
import React from "react";
import { Outlet } from "react-router-dom";
import MenuLink from "@/component/MenuLink";

function DentistPanel() {
    return ( 
        <>
            {/* <HeaderProfiles /> */}
            <div className="">
                {/* <UserPanelHeader/> */}
                <ProfileHeader>
                    <MenuLink href="#" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        نوبت ها
                    </MenuLink>

                    <MenuLink href="dentist-panel/details" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        اطلاعات حساب کاربری
                    </MenuLink>

                    <MenuLink href="/faq" className="flex items-center gap-x-5">
                        <svg className="size-6 text-white">...</svg>
                        سوالات رایج کاربران
                    </MenuLink>
                </ProfileHeader>
                <Outlet />
            </div>
        </>
    );
}

export default DentistPanel;