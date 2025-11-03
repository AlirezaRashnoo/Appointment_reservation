import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../../component/paneladmin/TopBar";
import SidBar from "../../component/paneladmin/SidBar";

function AdminPanel() {
    return ( 
        <>
            <TopBar />
            <div className="grid grid-cols-5">
                <SidBar />
                {/* <UserPanelHeader/> */}
                <div className="col-span-4 bg-gray-100 mt-14 pt-6 px-3">
                    <Outlet />

                </div>

            </div>
        </>
    );
}

export default AdminPanel;