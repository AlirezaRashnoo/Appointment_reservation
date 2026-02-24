import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
// import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const schema = z.object({
  name: z.string().min(2, "نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  // email: z.string().email("ایمیل نامعتبر است"),
  birthdate: z.string().optional(),
  national_code: z.string().optional(),
  address: z.string().optional(),
  specialty: z.string().optional(),
  experience: z.string().optional(),
  bio: z.string().optional(),
  avatar_url: z.string().optional(),
  long_address: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است."),
  education: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  phone_numbers: z.array(z.string().regex(/^09\d{9}$/, "شماره معتبر نیست")).max(2, "حداکثر دو شماره مجاز است").optional(),
});

export default function AccountDetails() {
  

return (
  <div className="pb-16 bg-blue-50 min-h-screen">
    <div className="container mx-auto max-w-4xl px-4">
      {/* Header */}
      <div className="flex items-center gap-x-3 pt-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-7 text-blue-600" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
        </svg>
        <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات دندان‌پزشک</h4>
      </div>

      {/* Form Container */}
      <div className="bg-white shadow-md p-6 rounded-xl mt-6">
        <form >
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
              <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50" />
              {/* {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>} */}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">شماره موبایل</label>
              <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">ایمیل</label>
              <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" placeholder="example@gmail.com" />
            </div>

            {/* Birthdate */}
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
              <input type="date" className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>



            {/* <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">تاریخ تولد</label>
            <div className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 child:outline-none">
                  <DatePicker
                    className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 child:outline-none"
                    id="birth-date"
                    {...register("birthdate")}
                    value={birthDate}
                    onChange={setBirthDate}
                    calendar={persian}
                    locale={persian_fa}
                    format="YYYY/MM/DD"
                    placeholder="تاریخ تولد را انتخاب کنید"
                    
                  />
            </div> */}





            {/* National Code */}
            <div>
              <label htmlFor="national_code" className="block text-sm font-medium text-gray-700">کد ملی</label>
              <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">آدرس</label>
              <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>

            {/* Medical Code */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">کد پزشکی</label>
              <input disabled className="w-full mt-1 p-2.5 rounded-md text-sm bg-gray-100 border border-gray-200" defaultValue={data?.medical_code} />
            </div> */}
            <div>
              <label htmlFor="medical_code" className="block text-sm font-medium text-gray-700">کد نظام پزشکی</label>
              <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            {/* Specialty */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">تخصص شما</label>
              <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">سابقه کار</label>
              <input  className="w-full mt-1 p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            {/* Upload Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">آپلود تصویر</label>
              {/* <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadAvatar(file);
                }}
                className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
              {uploading && <p className="text-blue-500 text-sm mt-1">در حال آپلود...</p>}
              {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>} */}
            </div>

            {/* Bio */}
            <div className="sm:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">درباره من</label>
              <textarea
                // {...register("bio")}
                rows={5}
                className="mt-1 w-full p-2.5 rounded-md text-sm border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              />
            </div>
          </div>

          {/* <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
            <TabButton label="سوابق تحصیلی" active={activeTab === "education"} onClick={() => setActiveTab("education")} />
            <TabButton label="خدمات قابل ارائه" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
            <TabButton label="آدرس مطب" active={activeTab === "long_address"} onClick={() => setActiveTab("long_address")} />
            <TabButton label="شماره‌های تماس دیگر" active={activeTab === "phone_numbers"} onClick={() => setActiveTab("phone_numbers")} />
          </div>
          {activeTab === "education" && (
              <FieldList title="سوابق تحصیلی" keyName="education" values={education} updateField={updateField} removeField={removeField} addField={addField} />
          )}

          {activeTab === "services" && (
            <FieldList title="خدمات قابل ارائه" keyName="services" values={services} updateField={updateField} removeField={removeField} addField={addField} />
          )}

          {activeTab === "phone_numbers" && (
            <div>
              <label className="block text-blue-700 mb-2 font-medium">شماره‌های تماس دیگر</label>
              {phone_numbers.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateField("phone_numbers", index, e.target.value)}
                    className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
                    placeholder="مثلاً: 09123456789"
                  />
                  <button type="button" onClick={() => removeField("phone_numbers", index)} className="text-red-500 hover:text-red-700 text-sm">🗑️ حذف</button>
                </div>
              ))}
              {phone_numbers.length < 2 && (
                <button type="button" onClick={() => addField("phone_numbers")} className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">➕ افزودن شماره تماس</button>
              )}
              {errors.phone_numbers && <p className="text-red-500 text-sm mt-1">{errors.phone_numbers.message}</p>}
            </div>
          )}

          {activeTab === "long_address" && (
            <div>
              <label className="block text-blue-700 mb-2 font-medium">آدرس دقیق مطب</label>
              <textarea {...register("long_address")} rows={3} className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200" placeholder="مثلاً: خیابان انقلاب، کوچه ۱۲، پلاک ۳، طبقه دوم" />
              {errors.long_address && <p className="text-red-500 text-sm mt-1">{errors.long_address.message}</p>}
            </div>
          )} */}
          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              // disabled={isLoading || uploading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-sm shadow-md transition disabled:opacity-60"
            >
              {/* {isLoading || uploading ? "در حال ارسال..." : "ذخیره و انتشار"} */}
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);






// تابع onSubmit اصلاح شده
}



// function TabButton({ label, active, onClick }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
//         active
//           ? "bg-blue-500 text-white shadow"
//           : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// function FieldList({ title, keyName, values, updateField, removeField, addField }) {
//   return (
//     <div>
//       <label className="block text-blue-700 mb-2 font-medium">{title}</label>
//       {values.map((item, index) => (
//         <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
//           <input
//             type="text"
//             value={item}
//             onChange={(e) => updateField(keyName, index, e.target.value)}
//             className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
//           />
//           <button
//             type="button"
//             onClick={() => removeField(keyName, index)}
//             className="text-red-500 hover:text-red-700 text-sm"
//           >
//             🗑️ حذف
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={() => addField(keyName)}
//         className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
//       >
//         ➕ افزودن
//       </button>
//     </div>
//   );
// }

