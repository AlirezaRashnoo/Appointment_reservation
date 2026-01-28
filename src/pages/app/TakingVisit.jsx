import React from "react";
import { Outlet } from "react-router-dom";

function TakingVisit() {
    return ( 
        <>
            {/* <HeaderProfiles /> */}
            <div className="h-screen bg-white">
                {/* <UserPanelHeader/> */}
                <Outlet />
            </div>
        </>
    );
}

export default TakingVisit;