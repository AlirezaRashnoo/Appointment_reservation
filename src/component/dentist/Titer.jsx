import React from "react";

function Titer(props) {
    return ( 
        <div className="h-[1px] bg-gray-400 mb-8 text-center">
            <span className="relative -top-3 m-auto px-5 bg-white block w-fit">{props.title}</span>
        </div>
     );
}

export default Titer;