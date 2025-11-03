import React from "react";
// import HeaderProfiles from "../../component/ProfileHeader";
import { Outlet } from "react-router-dom";
import ProfileHeader from "../../component/ProfileHeader";




function UserPanel() {
    return ( 
        <>
            {/* <HeaderProfiles /> */}
            <div className="bg-blue-50">
                {/* <UserPanelHeader/> */}
                <ProfileHeader />
                <Outlet />
            </div>
        </>
     );
}

export default UserPanel;





