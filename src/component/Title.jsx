import React from "react";


function Title(props) {
    return ( 
        <div className="flex items-center mb-5 font-bold justify-between text-sm">
            <div className="">
                <h4 className="text-black">{props.text}</h4>
            </div>
            {props.children}
        </div>
     );
}

export default Title;