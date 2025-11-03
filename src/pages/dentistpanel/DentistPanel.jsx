import ProfileHeader from "@/component/ProfileHeader";
import React from "react";
import { Outlet } from "react-router-dom";

function DentistPanel() {
    return ( 
        <>
            {/* <HeaderProfiles /> */}
            <div className="">
                {/* <UserPanelHeader/> */}
                <ProfileHeader />
                <Outlet />
            </div>
        </>
    );
}

export default DentistPanel;