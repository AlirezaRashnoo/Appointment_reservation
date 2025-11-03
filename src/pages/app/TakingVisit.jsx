import React from "react";
import { Outlet } from "react-router-dom";

function TakingVisit() {
    return ( 
        <>
            {/* <HeaderProfiles /> */}
            <div className="">
                {/* <UserPanelHeader/> */}
                <Outlet />
            </div>
        </>
    );
}

export default TakingVisit;