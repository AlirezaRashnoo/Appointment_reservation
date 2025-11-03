// import React, { useState } from "react";
// import TitlePages from "../../component/paneladmin/TitlePages";
// import Button from "../../component/Button";
// function Users() {

//     const [isShowProfile,setIsShowProfile] = useState(false)




//     return (
//         <>
//             <TitlePages title="کاربران"/>
//             <div className={`${isShowProfile ? "grid grid-cols-2 gap-x-3":""} `}>
//                 <div className="bg-white p-3 shadow-Main rounded-lg">
//                     <div className="space-y-4">
//                         <div>
//                             <h1 className="text-lg font-semibold">افزودن کاربر جدید</h1>
//                         </div>
//                         <div className="">
//                             <form>
//                             {/* grid grid-cols-2 gap-3 */}
//                                 <div className="grid grid-cols-2 gap-2">
//                                     <div className="w-full space-y-2">
//                                         <label htmlFor="username">نام و نام خانوادگی</label>
//                                         <div className="w-full">
//                                             <input type="text" className="outline-none w-full bg-gray-100 py-2 pr-2 rounded-lg placeholder:text-xs" placeholder="نام و نام خانوادگی خود را وارد کنید ..."/>
//                                         </div>
//                                     </div>
//                                     <div className="w-full space-y-2">
//                                         <label htmlFor="username">نام و نام خانوادگی</label>
//                                         <div className="w-full">
//                                             <input type="text" className="outline-none w-full bg-gray-100 py-2 pr-2 rounded-lg placeholder:text-xs" placeholder="نام و نام خانوادگی خود را وارد کنید ..."/>
//                                         </div>
//                                     </div>
//                                     <div className="w-full space-y-2">
//                                         <label htmlFor="username">ایمیل</label>
//                                         <div className="w-full">
//                                             <input type="text" className="outline-none w-full bg-gray-100 py-2 pr-2 rounded-lg placeholder:text-xs" placeholder="ایمیل خود را وارد کنید ..."/>
//                                         </div>
//                                     </div>
//                                     <div className="w-full space-y-2">
//                                         <label htmlFor="username">رمز عبور</label>
//                                         <div className="w-full">
//                                             <input type="text" className="outline-none w-full bg-gray-100 py-2 pr-2 rounded-lg placeholder:text-xs" placeholder="رمز عبور خود را وارد کنید ..."/>
//                                         </div>
//                                     </div>
//                                     <div className="w-full space-y-2">
//                                         <label htmlFor="username">شماره تلفن</label>
//                                         <div className="w-full">
//                                             <input type="text" className="outline-none w-full bg-gray-100 py-2 pr-2 rounded-lg placeholder:text-xs" placeholder="شماره تلفن خود را وارد کنید ..."/>
//                                         </div>
//                                     </div>
                                    
//                                 </div>
//                                 <Button type="submit" className="flex items-center justify-center bg-green-400 w-32 rounded-[10px] h-11 mt-3 text-white shadow-Main">
//                                     افزودن
//                                 </Button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={`${isShowProfile ? "":"hidden"}`}>
//                     پروفایل کاربر
//                 </div>
               
//             </div>
//             <div className="mt-3">                                     
//                 <div className="w-full mb-6 p-3 shadow shadow-[rgba(0,0,0,0.75)] bg-white rounded-lg max-h-96 overflow-y-auto">
//                 <h3 className="text-lg font-semibold mb-3">لیست کاربران</h3>
//                 <table className="w-full">
                    
//                     <tr className="child:text-right h-14 bg-gray-100 text-sm">
//                         <th>نام و نام خانوادگی</th>
//                         <th>تاریخ ثبت نام</th>
//                         {/* <th>شماره تلفن</th> */}
//                         <th>ایمیل</th>
//                         <th>وضعیت</th>
//                         <th>نوع کاربر</th>
//                         <th>ویرایش</th>
//                         <th>تغییر سطح</th>
//                         <th>حذف</th>
//                     </tr>
//                     {/* {transactions.map(transaction =>(
//                     ))} */}
                    
                   
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md" onClick={()=>setIsShowProfile(!isShowProfile)}>پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد احمدی پور چگنی</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">بیمار</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-green-400">
//                             تایید شده
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
//                     <tr className="text-xs child:h-10">
//                         <td className="flex items-center">
//                             <img src="../images/admin_image.jpg" alt="img" className="size-9 rounded-full object-cover ml-2"/>
//                             <div className="max-w-28 line-clamp-2">
//                                 <span className="">امیر محمد</span>
//                             </div>
//                         </td>
//                         <td className="font-light">
//                             1404/2/13
//                         </td>
//                         <td className="font-light">
//                             alirezarashnoo85@gmail.com
//                         </td>
//                         <td className="font-light text-orange-400">
//                             در انتظار ...
//                         </td>
//                         <td>
//                             <p className="w-full flex items-center justify-center">پزشک</p>
//                         </td>
                        
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">پروفایل</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-blue-500 p-1 text-white rounded-md">تغییر نقش</Button>
//                         </td>
//                         <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">حذف</Button>
//                         </td>
//                         {/* <td>
//                             <Button className="w-full flex items-center justify-center bg-red-500 p-1 text-white rounded-md">بن</Button>
//                         </td> */}
//                     </tr>
                    
                   
                   
                    
                    
//                 </table>
//                 </div>                                                                                               
//             </div>
//         </>
//      );
// }

// export default Users;


// --------------------------------------------------------------------------------------------


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