import React from "react";
import Button from "./Button";


function MenuLink(props) {
    if(props.to){
        return (
            <Button to={props.to} className={props.className}>
                {props.children}
            </Button>
        );
    }
    else{
        return ( 
    
            <Button href={props.href} className={props.className}>
                {props.children}
            </Button>
         );
    }
}

export default MenuLink;