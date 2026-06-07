// import Footer from "../component/Footer";
// import Header from "../component/Header";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// // import supabase from "@/api/supabase";
// import { useUserStore } from "@/stores/useUserStore";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";


// const schema = z.object({
//   name: z
//     .string()
//     .min(3, "نام باید حداقل ۳ حرف باشد")
//     .regex(/^[آ-ی\s]+$/, "فقط حروف فارسی مجاز است"),
//   medical_code: z
//     .string()
//     .regex(/^\d{6,12}$/, "کد نظام پزشکی باید بین ۶ تا ۱۲ رقم باشد"),
//   specialty: z.string().min(2, "زمینه فعالیت الزامی است"),
//   phone: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
//   email: z.string().email("ایمیل نامعتبر است"),
//   experience: z.string().min(1, "لطفاً سابقه را وارد کنید"),
//   password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
// });

// export default function RegisterDentist() {
  



//   return (
//     <section className="bg-gray-100">
//       <Header />
//       <div className="pt-20 mt-20">
//         <div className="px-5">
//           <div>
//             <h1 className="text-center text-xl font-bold">فرم عضویت و دریافت پروفایل</h1>
//             <div className="text-center mt-16">
//               <p className="text-[17px] leading-[30px] font-normal">
//                 برای عضویت در سایت دندانپزشکان لرستان، لطفا فرم زیر را تکمیل نمایید. کارشناسان ما در اولین فرصت با شما تماس خواهند گرفت.
//               </p>
//             </div>
//           </div>
  
//           <div className="flex items-center justify-center mt-8">
//             <form  className="w-2/3 child:mb-4 child:pb-1 lg:grid grid-cols-2 gap-3">
              
//               <div className="space-y-2">
//                 <label className="font-semibold">نام</label>
//                 <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white" placeholder="کیبورد در حالت تایپ فارسی باشد" />
//                 {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
//               </div>
//               <div className="space-y-2">
//                 <label className="font-semibold">نام خانوادگی</label>
//                 <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white" placeholder="کیبورد در حالت تایپ فارسی باشد" />
//                 {/* {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>} */}
//               </div>
  
//               <div className="space-y-2">
//                 <label className="font-semibold">کد نظام پزشکی</label>
//                 <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white" placeholder="کد نظام پزشکی بین 6 تا 12 رقم می باشد"  />
//                 {/* {errors.medical_code && <p className="text-red-500 text-sm">{errors.medical_code.message}</p>} */}
//               </div>

//               <div className="space-y-2">
//                 <label className="font-semibold">کد ملی</label>
//                 <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white" placeholder="کد نظام پزشکی بین 6 تا 12 رقم می باشد"  />
//                 {/* {errors.medical_code && <p className="text-red-500 text-sm">{errors.medical_code.message}</p>} */}
//               </div>
  
//               <div className="space-y-2">
//                 <label className="font-semibold">زمینه فعالیت</label>
//                 <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"  />
//                 {/* {errors.field && <p className="text-red-500 text-sm">{errors.field.message}</p>} */}
//               </div>
//               <div className="space-y-2">
//                 <label className="font-semibold">شماره موبایل</label>
//                 <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white" placeholder="09928976543"  />
//                 {/* {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>} */}
//               </div>
//               <div className="space-y-2">
//                 <label className="font-semibold">ایمیل</label>
//                 <input type="email" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white" placeholder="yourFuckingEmail@gmail.com"  />
//                 {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}
//               </div>
//               <div className="space-y-2">
//                 <label className="font-semibold">سابقه</label>
//                 <input type="text" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"  />
//                 {/* {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>} */}
//               </div>
//               <div className="space-y-2">
//                 <label className="font-semibold">رمز عبور</label>
//                 <input type="password" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"  />
//                 {/* {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}
//               </div>
//               <div className="space-y-2">
//                 <label className="font-semibold">تکرار رمز عبور</label>
//                 <input type="password" className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"  />
//                 {/* {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}
//               </div>
  
//               <button
//                 type="submit"
//                 // disabled={isSubmitting}
//                 className="flex items-center justify-center mx-auto bg-blue-400 w-[150px] rounded-[10px] h-11 text-white"
//               >
//                 {/* {isSubmitting ? "در حال ارسال..." : "ثبت نام"} */}
//                 ثبت نام
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </section>
//   );
// }




// import Footer from "../component/Footer";
// import Header from "../component/Header";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import Swal from "sweetalert2";

// const schema = z
//   .object({
//     firstName: z
//       .string()
//       .min(2, "نام باید حداقل ۲ حرف باشد"),
//     lastName: z
//       .string()
//       .min(2, "نام خانوادگی الزامی است"),
//     medicalCouncilNumber: z
//       .string()
//       .regex(
//         /^\d{6,12}$/,
//         "کد نظام پزشکی باید بین ۶ تا ۱۲ رقم باشد"
//       ),
//     nationalCode: z
//       .string()
//       .regex(
//         /^\d{10}$/,
//         "کد ملی باید ۱۰ رقم باشد"
//       ),
//     specialization: z
//       .string()
//       .min(
//         2,
//         "زمینه فعالیت الزامی است"
//       ),

//     phoneNumber: z
//       .string()
//       .regex(
//         /^09\d{9}$/,
//         "شماره موبایل نامعتبر است"
//       ),
//     email: z
//       .string()
//       .email(
//         "ایمیل نامعتبر است"
//       ),
//     yearsOfExperience: z
//       .coerce
//       .number(),

//     password: z
//       .string()
//       .min(
//         6,
//         "رمز عبور حداقل ۶ کاراکتر باشد"
//       ),

//     confirmPassword: z.string(),

//   })

//   .refine(
//     (data)=>
//       data.password ===
//       data.confirmPassword,

//     {
//       path:["confirmPassword"],
//       message:
//       "رمزها یکسان نیستند"
//     }
//   );

// export default function RegisterDentist() {

//   const {
//     register,
//     handleSubmit,
//     formState:{
//       errors,
//       isSubmitting
//     }
//   } = useForm({

//     resolver:
//       zodResolver(schema)

//   });


//   const onSubmit = async (data)=>{

//     try{

//       const payload={

//         phoneNumber:
//         data.phoneNumber,

//         password:
//         data.password,

//         confirmPassword:
//         data.confirmPassword,

//         nationalCode:
//         data.nationalCode,

//         medicalCouncilNumber:
//         data.medicalCouncilNumber,

//         birthDateShamsi:
//         "1360/05/15",

//         yearsOfExperience:
//         Number(
//           data.yearsOfExperience
//         ),

//         specialization:
//         data.specialization,

//         degree:
//         "دکترای حرفه‌ای دندانپزشکی",

//         profile:{

//           email:
//           data.email,

//           firstName:
//           data.firstName,

//           lastName:
//           data.lastName

//         }

//       };


//       await axios.post(

//         "https://dentist-reyn.onrender.com/api/v1/dentist/me",

//         payload

//       );


//       Swal.fire({

//         icon:"success",
//         title:"ثبت شد",
//         text:
//         "اطلاعات شما ثبت شد\n در صورت تایید پروفایل شما نمایش داده میشود"
//       });

//     }

//     catch(error){

//       Swal.fire({

//         icon:"error",

//         title:"خطا",

//         text:
//         error?.response?.data?.message ||
//         "مشکلی رخ داد"

//       });

//     }

//   };


//   return (

// <section className="bg-gray-100">

// <Header />

// <div className="pt-20 mt-20">

// <div className="px-5">

// <div>

// <h1 className="text-center text-xl font-bold">

// فرم عضویت و دریافت پروفایل

// </h1>

// <div className="text-center mt-16">

// <p className="text-[17px] leading-[30px] font-normal">

// برای عضویت در سایت دندانپزشکان لرستان،
// لطفا فرم زیر را تکمیل نمایید

// </p>

// </div>

// </div>


// <div className="flex items-center justify-center mt-8">

// <form

// onSubmit={handleSubmit(onSubmit)}

// className="w-2/3 child:mb-4 child:pb-1 lg:grid grid-cols-2 gap-3"

// >

// <div className="space-y-2">

// <label className="font-semibold">

// نام

// </label>

// <input

// {...register("firstName")}

// type="text"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// placeholder="نام"

// />

// {errors.firstName && (

// <p className="text-red-500 text-sm">

// {errors.firstName.message}

// </p>

// )}

// </div>


// <div className="space-y-2">

// <label>

// نام خانوادگی

// </label>

// <input

// {...register("lastName")}

// type="text"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// placeholder="نام خانوادگی"

// />

// {errors.lastName && (

// <p className="text-red-500 text-sm">

// {errors.lastName.message}

// </p>

// )}

// </div>


// <div className="space-y-2">

// <label>

// کد نظام پزشکی

// </label>

// <input

// {...register("medicalCouncilNumber")}

// type="text"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// {errors.medicalCouncilNumber && (

// <p className="text-red-500 text-sm">

// {errors.medicalCouncilNumber.message}

// </p>

// )}

// </div>


// <div className="space-y-2">

// <label>

// کد ملی

// </label>

// <input

// {...register("nationalCode")}

// type="text"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// {errors.nationalCode && (

// <p className="text-red-500 text-sm">

// {errors.nationalCode.message}

// </p>

// )}

// </div>


// <div className="space-y-2">

// <label>

// زمینه فعالیت

// </label>

// <input

// {...register("specialization")}

// type="text"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// </div>


// <div className="space-y-2">

// <label>

// شماره موبایل

// </label>

// <input

// {...register("phoneNumber")}

// type="text"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// </div>


// <div className="space-y-2">

// <label>

// ایمیل

// </label>

// <input

// {...register("email")}

// type="email"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// </div>


// <div className="space-y-2">

// <label>

// سابقه

// </label>

// <input

// {...register("yearsOfExperience")}

// type="number"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// </div>


// <div className="space-y-2">

// <label>

// رمز عبور

// </label>

// <input

// {...register("password")}

// type="password"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// </div>


// <div className="space-y-2">

// <label>

// تکرار رمز عبور

// </label>

// <input

// {...register("confirmPassword")}

// type="password"

// className="h-11 pt-1.5 px-3 rounded-lg text-sm w-full outline-none bg-white"

// />

// </div>


// <button

// type="submit"

// disabled={isSubmitting}

// className="flex items-center justify-center mx-auto bg-blue-400 w-[150px] rounded-[10px] h-11 text-white"

// >

// {

// isSubmitting

// ?

// "در حال ارسال..."

// :

// "ثبت نام"

// }

// </button>

// </form>

// </div>

// </div>

// </div>

// <Footer />

// </section>

// );

// }








import Footer from "../component/Footer";
import Header from "../component/Header";
import FormField from "@/component/FormField";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import Swal from "sweetalert2";

const API_URL =
  "https://dentist-reyn.onrender.com/api/v1/dentist/me";
const schema = z
  .object({
    firstName: z
      .string()
      .min(2, "نام باید حداقل ۲ حرف باشد"),
    lastName: z
      .string()
      .min(
        2,
        "نام خانوادگی الزامی است"
      ),
    medicalCouncilNumber: z
      .string()
      .regex(
        /^\d{6,12}$/,
        "کد نظام پزشکی باید بین ۶ تا ۱۲ رقم باشد"
      ),
    nationalCode: z
      .string()
      .regex(
        /^\d{10}$/,
        "کد ملی باید ۱۰ رقم باشد"
      ),
    specialization: z
      .string()
      .min(
        2,
        "زمینه فعالیت الزامی است"
      ),
    phoneNumber: z
      .string()
      .regex(
        /^09\d{9}$/,
        "شماره موبایل نامعتبر است"
      ),
    email: z
      .string()
      .email(
        "ایمیل نامعتبر است"
      ),
      degree: z
      .string()
      .min(
        2,
        "مدرک تحصیلی الزامی است"
      ),
    yearsOfExperience: z
      .coerce
      .number(),
    password: z
      .string()
      .min(
        6,
        "رمز عبور حداقل ۶ کاراکتر باشد"
      ),
    confirmPassword: z.string(),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "رمزها یکسان نیستند",
    }
  );

export default function RegisterDentist() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm({
    resolver:
      zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      phoneNumber:
        data.phoneNumber,
      password:
        data.password,
      confirmPassword:
        data.confirmPassword,
      nationalCode:
        data.nationalCode,
      medicalCouncilNumber:
        data.medicalCouncilNumber,
      birthDateShamsi:
        "1360/05/15",
      yearsOfExperience:
        Number(
          data.yearsOfExperience
        ),
      specialization:
        data.specialization,
      degree:
        "دکترای حرفه‌ای دندانپزشکی",
      profile: {
        email:
          data.email,
        firstName:
          data.firstName,
        lastName:
          data.lastName,
      }
    };

    try {

      await axios.post(
        API_URL,
        payload
      );

      Swal.fire({
        icon: "success",
        title: "ثبت شد",
        text:
          "اطلاعات شما ثبت شد\nدر صورت تایید پروفایل شما نمایش داده خواهد شد",
      });

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "خطا",
        text:
          error?.response?.data?.message ||
          "مشکلی رخ داد",
      });

    }
  };


  return (
    <section className="bg-gray-100">

      <Header />

      <div className="pt-20 mt-20">

        <div className="px-5">

          <div>

            <h1 className="text-center text-xl font-bold">

              فرم عضویت و دریافت پروفایل

            </h1>

          </div>

          <div className="flex items-center justify-center mt-8">

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="
                w-2/3
                child:mb-4
                child:pb-1
                lg:grid
                grid-cols-2
                gap-3
              "
            >
              <FormField
                label="نام"
                name="firstName"
                register={register}
                error={errors.firstName}
              />

              <FormField
                label="نام خانوادگی"
                name="lastName"
                register={register}
                error={errors.lastName}
              />

              <FormField
                label="کد نظام پزشکی"
                name="medicalCouncilNumber"
                register={register}
                error={errors.medicalCouncilNumber}
              />

              <FormField
                label="کد ملی"
                name="nationalCode"
                register={register}
                error={errors.nationalCode}
              />

              <FormField
                label="زمینه فعالیت"
                name="specialization"
                register={register}
                error={errors.specialization}
              />

              <FormField
                label="شماره موبایل"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber}
              />

              <FormField
                label="ایمیل"
                name="email"
                register={register}
                error={errors.email}
              />

              <FormField
                label="سابقه"
                name="yearsOfExperience"
                type="number"
                register={register}
                error={errors.yearsOfExperience}
              />

              <FormField
                label="رمز عبور"
                name="password"
                type="password"
                register={register}
                error={errors.password}
              />

              <FormField
                label="تکرار رمز"
                name="confirmPassword"
                type="password"
                register={register}
                error={errors.confirmPassword}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  flex
                  items-center
                  justify-center
                  mx-auto
                  bg-blue-400
                  w-[150px]
                  rounded-[10px]
                  h-11
                  text-white
                  col-span-2
                "
              >
                {isSubmitting
                  ? "در حال ارسال..."
                  : "ثبت نام"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />

    </section>
  );
}