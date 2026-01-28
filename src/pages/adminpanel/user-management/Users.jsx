import React from "react";
import { Outlet } from "react-router-dom";


function Users() {

    return ( 
        <>
        <div>
            Users
        </div>
        <Outlet />
        </>
     );
}

export default Users;