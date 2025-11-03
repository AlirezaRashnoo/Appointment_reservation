import React from "react";


function Input(props) {

    const onChangHandeler = (event) =>{
        console.log(event.target.value);
    }
    const element = props.element === 'input' ? (
        <input
            type={props.type}
            placeholder={props.placeholder}
            className={`outline-none ${props.className}`}
            // maxLength={maxLength}
            value={props.value}
            
            onChange={onChangHandeler}
        />
    ):(
        <textarea
            placeholder={props.placeholder}
            className={props.className}
            value={props.value}
            
            onChange={onChangHandeler}
        />
    )
    
    return ( 
        <div>
            {element}
        </div>
     );
}

export default Input;