// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// // import { jwtDecode } from "jwt-decode";
// import HeaderProfiles from "../../component/ProfileHeader";
// import Swal from "sweetalert2";

// function AccountDetails() {

//     const [patient, setPatient] = useState(null)

    
//     const [brithday,setBrithday] = useState(null)
//     const [nationalCode,setNationalCode] = useState('')
//     const [address,setAddress] = useState('')
//     const [gender,setGender] = useState('')
//     const [about,setAbout] = useState('')
//     const [avatar,setAvatar] = useState('')

    

    
//     const token = Cookies.get("accesstoken")

//     useEffect(()=>{
//         fetch(`https://reservationdentist.pythonanywhere.com/auth/profile_patient/`, {
//             headers: {
//                 "Content-type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             setPatient(data)
            
//         })
//     },[])

//     const subitHandeler = async(e)=>{
//         e.preventDefault()

//         const formData = new FormData();
//         formData.append("avatar", avatar);
//         formData.append("national_code", nationalCode);
//         formData.append("brithday", brithday);
//         formData.append("about_me", about);
//         formData.append("gender", gender);
//         formData.append("address", address);

//         const response = await fetch(`https://reservationdentist.pythonanywhere.com/auth/profile_patient/update/`, {
//             method: 'PATCH',
//             headers: {
               
//                 Authorization: `Bearer ${token}`
//             },
//             body: formData,
//         })
//         //.then(res => res.json())
//         //.then(data => console.log(data))

//         if (!response.ok){
//             console.log("A");
//         } 
//         const data = await response.json();
//         console.log(data);
//         Swal.fire({
//             text: "اطلاعت با موفقیت ویرایش شد",
//             icon: 'success',
//             confirmButtonText: 'متوجه شدم!'
//         })
//         // window.location.replace("/")
//         return data
//     }

         



//     return ( 
        
//         <>
//             <HeaderProfiles name={patient? patient.user.full_name : "صبر کنید..."} phone={patient? patient.user.phone_number:"صبر کنید ..."}/>
//             <div className="pb-16 bg-blue-100 h-full">
//             {/* <button onClick={loger}>log information</button> */}
//             <div className="container">
//                 <div className="flex items-center gap-x-3 pt-8">
//                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-black">
//                         <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
//                     </svg>
//                     <h4 className="text-base">ویرایش اطلاعات کاربری</h4>
//                 </div>
//                 {/* { 
//                     <div className="flex items-center justify-center mx-auto text-center">
//                         <div className="py-2 px-5 text-sm font-medium text-white bg-orange-400 rounded-lg">
//                         <svg aria-hidden="true" role="status" className="inline w-5 h-5 me-2 text-white animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="orange-400"/>
//                             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#fff"/>
//                         </svg>
//                         درحال بارگیری ...
//                         </div>
//                     </div>
//                 } */}
//                 <div className="details dark:bg-zinc-800 p-4 rounded-lg">
//                     {/* <h3 className='font-morabba-medium pb-2 border-b-[1px] border-b-gray-400/50'> جزئیات حساب </h3> */}
//                     {patient &&
//                         <form className='mt-4' onSubmit={subitHandeler}>
//                             <div className='grid sm:grid-cols-2 gap-x-3 gap-y-5 child:space-y-3'>
//                                 <div>
//                                     <label htmlFor="name">نام و نام خانوادگی</label>
//                                     <input
//                                     type="text" 
//                                     id='user-name'
//                                     className='w-full mt-1 p-2 outline-none focus:outline-none border-[1px] border-gray-200 dark:border-gray-300 rounded text-sm placeholder:text-gray-600 bg-gray-100' 
//                                     placeholder=''
//                                     value={patient.user.full_name} onChange={(e) => setName(e.target.value)}
//                                     disabled/>
//                                 </div>
                                
//                                 <div>
//                                     <label htmlFor="user-phone">شماره موبایل</label>
//                                     <input type="text" id='user-phone' className='w-full mt-1 p-2 outline-none focus:outline-none dark:bg-blue-200/60 dark:placeholder:text-zinc-200 border-[1px] border-gray-200 dark:border-gray-300 rounded text-sm placeholder:text-gray-600 bg-gray-100' value={patient.user.phone_number} onChange={(e) => setPhone(e.target.value)} disabled/>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="user-email">ایمیل</label>
//                                     <input type="email" id='user-email' className='w-full mt-1 p-2 outline-none focus:outline-none dark:bg-blue-200/60 dark:placeholder:text-zinc-200 border-[1px] border-gray-200 dark:border-gray-300 rounded text-sm placeholder:text-gray-600 bg-gray-100' value={patient.user.email} onChange={(e) => setEmail(e.target.value)} disabled/>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="user-birthday"> تاریخ تولد </label>
//                                     <input type="text" id='user-birthday' className='w-full mt-1 p-2 outline-none focus:outline-none dark:bg-blue-200/60 dark:placeholder:text-zinc-200 border-[1px] border-gray-200 dark:border-gray-300 rounded text-sm placeholder:text-gray-600' placeholder={patient.brithday? patient.brithday : ""} value={brithday} onChange={(e) => setBrithday(e.target.value)}/>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="user-national-code">کد ملی</label>
//                                     <input type="text" id='user-national-code' className='w-full mt-1 p-2 outline-none focus:outline-none dark:bg-blue-200/60 dark:placeholder:text-zinc-200 border-[1px] border-gray-200 dark:border-gray-300 rounded text-sm placeholder:text-gray-600' placeholder={patient.national_code? patient.national_code :""} value={nationalCode} onChange={(e) => setNationalCode(e.target.value)}/>
//                                 </div>
//                                 <div>
//                                     <label htmlFor="user-address">آدرس</label>
//                                     <input type="text" id='user-address' className='w-full mt-1 p-2 outline-none focus:outline-none dark:bg-blue-200/60 dark:placeholder:text-zinc-200 border-[1px] border-gray-200 dark:border-gray-300 rounded text-sm placeholder:text-gray-600' placeholder={patient.address? patient.address : ""} value={address} onChange={(e) => setAddress(e.target.value)}/>
//                                 </div>
                                
//                                 <div>
//                                     <p>جنسیت</p>
//                                     <div className="flex items-center gap-x-4">
//                                         <div className="flex items-center gap-x-2">
//                                             <label htmlFor="male">مرد</label>
//                                             <input type="radio" id='male' name="option" value="male" className=''checked={patient.gender === 'male'} onChange={(e) => setGender(e.target.value)}/>
//                                         </div>
//                                         <div className="flex items-center gap-x-2">
//                                             <label htmlFor="female">زن</label>
//                                             <input 
//                                             type="radio" 
//                                             id='male' 
//                                             name="option" 
//                                             value='female'
//                                             className=''
//                                             checked={patient.gender === 'female'}
//                                             onChange={(e) => setGender(e.target.value)}
//                                             // {patient.gender? patient.gender == "female" : gender === "female"}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <input
//                                      type="file" 
//                                      accept="image/*" 
//                                      onChange={(e)=>setAvatar(e.target.files[0])}
//                                      //onChange={(e)=>setAvatar(URL.createObjectURL(e.target.files[0]))}
//                                      //onChange={handleImageChange}
//                                      />

//                                 </div>
//                                 <div>
//                                     <label htmlFor="user-about">اگر سابقه بیماری دارید بنویسید</label>
//                                     <textarea id='user-about' className='h-[131px] w-full mt-1 p-2 outline-none focus:outline-none border-[1px] border-gray-200 rounded text-sm placeholder:text-gray-600' rows={6} cols={50} value={about} placeholder={patient.about_me?patient.about_me : ""} onChange={(e) => setAbout(e.target.value)}/>
//                                 </div>
                                
//                             </div>
//                             <button className='bg-gray-300 w-32 h-12 rounded-xl mt-3 text-sm shadow-Main' onClick={subitHandeler}> تغییر اطلاعات </button>
//                         </form>
//                     }
//                 </div>
//             </div>
//             </div>
//         </>
//      );
// }

// export default AccountDetails;





// -------------------------------------------------------------------------------------
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";
import Swal from "sweetalert2";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

// const schema = z.object({
//     name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
//     // email: z.string().email("ایمیل نامعتبر است"),
//     birthdate: z.string().optional(),
//     // national_code: z.string().optional(),
//     // address: z.string().optional(),
//     // specialty: z.string().optional(),
//     // experience: z.string().optional(),
//     bio: z.string().optional(),
//     avatar_url: z.string().optional(),
//     // Gender
// });

const schema = z.object({
    name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
    birthdate: z.string().optional(),
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "لطفاً جنسیت را انتخاب کنید" }),
    }),
    bio: z.string().optional(),
    avatar_url: z.string().optional(),
  });
  


function AccountDetails() {

    const profile = useUserStore((state) => state.profile);
    const queryClient = useQueryClient();
  
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
  
    const { data, isLoading, error } = useQuery({
      queryKey: ["profile", profile?.user_id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", profile?.user_id)
          .single();
        if (error) throw error;
        return data;
      },
      enabled: !!profile?.user_id,
    });
  
    const mutation = useMutation({
      mutationFn: async (updatedData) => {
        const { data, error } = await supabase
          .from("profiles")
          .update(updatedData)
          .eq("user_id", profile?.user_id)
          .select();
        if (error) throw error;
        return data;
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["profile", profile?.user_id]);
        if (data && data.length > 0) {
          useUserStore.getState().setProfile(data[0]);
        }
        // alert("اطلاعات با موفقیت بروزرسانی شد");
        Swal.fire({
            text: "اطلاعات با موفقیت بروزرسانی شد",
            icon: 'success',
            confirmButtonText: 'متوجه شدم',
            // confirmButtonColor:"green",
          })
      },
      onError: (error) =>{
          Swal.fire({
              text: `خطا در بروزرسانی: ${error.message}`,
              icon: 'error',
              confirmButtonText: 'متوجه شدم',
              // confirmButtonColor:"green",
          })
          //   alert(`خطا در بروزرسانی: ${error.message}`)
      }
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      setValue,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: data,
    });
  
    useEffect(() => {
      if (data) {
        reset(data);
        useUserStore.getState().setProfile(data);
      }
    }, [data, reset]);
  
    const uploadAvatar = async (file) => {
      try {
        const currentProfile = useUserStore.getState().profile;
        if (!currentProfile?.user_id) {
          setUploadError("شناسه کاربر موجود نیست");
          return;
        }
    
        setUploading(true);
        setUploadError("");
    
        if (!file) throw new Error("فایل انتخاب نشده");
    
        const fileExt = file.name.split(".").pop();
        const fileName = `${currentProfile.user_id}/avatar.${fileExt}`;
        const filePath = `${fileName}`;
    
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });
    
        if (uploadError) throw uploadError;
    
        const {
          data: { publicUrl },
          error: publicUrlError,
        } = supabase.storage.from("avatars").getPublicUrl(filePath);
    
        if (publicUrlError ||  !publicUrl) throw publicUrlError ||  new Error("خطا در دریافت لینک");
    
        setValue("avatar_url", publicUrl);
        alert("آپلود عکس با موفقیت انجام شد");
      } catch (error) {
        setUploadError(error.message || "خطا در آپلود عکس");
      } finally {
        setUploading(false);
      }
    };
  
    // const onSubmit = (formData) => {
    //   mutation.mutate(formData);
    // };
  
    const onSubmit = (formData) => {
      const { phone, medical_code, ...filteredData } = formData; // حذف فیلدهای غیرقابل ویرایش
      mutation.mutate(filteredData);
      console.log("formData submited", formData);
    };
  
  
    if (isLoading) return <p>در حال بارگذاری اطلاعات...</p>;
  if (error) return <p className="text-red-500">خطا در بارگذاری پروفایل: {error.message}</p>;
  
  
  return (
    <div className="pb-16 bg-blue-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center gap-x-3 pt-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-blue-600" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات کاربر</h4>
        </div>
  
        {/* Form Container */}
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 gap-6">
  
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                <input {...register("name")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
  
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
                <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200" defaultValue={data?.phone} />
              </div>
  
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">ایمیل</label>
                <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="example@gmail.com" defaultValue={data?.email} />
              </div>
  
              {/* Birthdate */}
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
                <input type="date" {...register("birthdate")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div>
              
              




              {/* National Code */}
              {/* <div>
                <label htmlFor="national_code" className="block text-sm font-medium text-gray-700">کد ملی</label>
                <input {...register("national_code")} className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
              </div> */}
  
              {/* Upload Image */}
              {profile?.avatar_url?
                (
                  <div className="space-y-3">
                    <p>عکس پروفایل</p>
                    <div className="inline-block mr-2 size-[90px] overflow-hidden border border-gray-200 rounded-full">
                        <img src={profile.avatar_url} className="size-full object-cover" alt="profile_img" />
                    </div>
                  </div>
                ):(
                  <div>

                      <label className="block text-sm font-medium text-gray-700">آپلود تصویر</label>
                      <input
                        className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadAvatar(file);
                        }}
                      />
                    {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
                    {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
                  </div>
                )
              }

              {/* Gender */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">جنسیت</label>
                <div className="flex items-center gap-6">
                    <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value="male"
                        {...register("gender")}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">مرد</span>
                    </label>
                    <label className="inline-flex items-center">
                    <input
                        type="radio"
                        value="female"
                        {...register("gender")}
                        className="form-radio text-pink-500 focus:ring-pink-400"
                    />
                    <span className="ml-2 text-sm text-gray-700">زن</span>
                    </label>
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                </div>

  
              {/* Bio */}
              <div className="sm:col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">اگر سابقه بیماری دارید بنویسید</label>
                <textarea
                  {...register("bio")}
                  rows={5}
                  className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
              </div>
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isLoading || uploading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60"
              >
                {isLoading || uploading ? "در حال ارسال..." : "تغییر اطلاعات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;

