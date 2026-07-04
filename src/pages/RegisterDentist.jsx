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