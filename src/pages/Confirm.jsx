import React from "react";
import Button from "../component/Button";
import Input from "../component/Input";
import useEffect from "react";

function Confirm() {
    
    // const sendCode = ()=>{
    //     const code = Math.floor(Math.random()* 90000) + 10000
    //     console.log(code);
    // }
    window.addEventListener("load",()=>{
        const sendCode = setTimeout(()=>{
            const code = Math.floor(Math.random()* 90000) + 10000
            console.log(code);
            alert(code)
        },5000)
    })

    

    

    return ( 
    
       <main className="flex items-center justify-center px-4 py-6 min-h-screen">
           {/* <button onClick={sendCode}>send code</button> */}
           <div className="">
                <Button href="/" className="flex items-center justify-center mb-10">
                    <div className="flex items-center gap-x-1">
                        <img src="./images/logo.jpg" alt="logo" />
                        <h1 className="text-mainColor text-lg">دندانپزشکان لرستان</h1>
                    </div>
                </Button>
                <div className="max-w-[330px] w-full pt-5 pb-6 px-6 text-center bg-white rounded-xl shadow-Main">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xl">کد تایید</span>
                            <Button href="/login">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                            </Button>
                        </div>
                        <span className="inline-block text-center my-4 sm:my-5">
                            کد تایید برای 
                            <span> 09928965432 </span>
                            ارسال شد
                        </span>
                        <form>
                            <div className="flex justify-center gap-x-2">
                                <Input className="size-[50px] rounded-[10px] bg-blue-100 text-center" element="input" type="text" placeholder="-" maxlength="1"/>
                                <Input className="size-[50px] rounded-[10px] bg-blue-100 text-center" element="input" type="text" placeholder="-" maxlength="1"/>
                                <Input className="size-[50px] rounded-[10px] bg-blue-100 text-center" element="input" type="text" placeholder="-" maxlength="1"/>
                                <Input className="size-[50px] rounded-[10px] bg-blue-100 text-center" element="input" type="text" placeholder="-" maxlength="1"/>
                                <Input className="size-[50px] rounded-[10px] bg-blue-100 text-center" element="input" type="text" placeholder="-" maxlength="1"/>
                            </div>
                            <Button className="bg-blue-500 w-full h-11 mt-5 rounded-lg text-white">
                                تایید
                            </Button>
                            <div className="mt-3">
                                <p>ارسال مجدد کد تایید</p>
                            </div>
                        </form>
                    </div>
                </div>
           </div>
       </main>
     );
}

export default Confirm;