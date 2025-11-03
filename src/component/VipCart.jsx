import React from "react";


function VipCart(props) {
    return ( 
        <div className="relative bg-white border border-secoundColor rounded-[20px] overflow-hidden">
            <span className="absolute left-0 top-0 bg-primeryColor text-base text-textColorSecound w-[63px] h-[43px] py-[13px] px-[23px] rounded-br-full">VIP</span>
            {props.children}
        </div>
     );
}

export default VipCart;