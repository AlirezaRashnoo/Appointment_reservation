import React from "react";


function Services(props) {
    return ( 
        <li className={`${props.iconTik ? "flex items-center gap-x-4 py-5" : "list-disc list-inside pr-2"}`}>
            {props.iconTik ?(
                <>
                    <div className="bg-green-400 flex items-center justify-center p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                    </div>
                    <p>{props.text}</p>
                </>
            ):(
                props.text

            )}
        </li>
     );
}

export default Services;