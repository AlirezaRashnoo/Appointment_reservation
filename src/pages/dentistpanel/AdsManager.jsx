// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useUserStore } from "@/stores/useUserStore";
// import Button from "@/component/Button";
// import supabase from "@/api/supabase";


// const schema = z.object({
//   long_address: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است."),
//   education: z.array(z.string()).optional(),
//   services: z.array(z.string()).optional(),
// });

// export default function DentistPublicProfile() {
//   const profile = useUserStore((state) => state.profile);
//   const [activeTab, setActiveTab] = useState("education");
//   const [adId, setAdId] = useState(null); // برای ذخیره id رکورد ads

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       long_address: "",
//       education: [],
//       services: [],
//     },
//   });

//   const education = watch("education") || [];
//   const services = watch("services") || [];

//   // واکشی اطلاعات پروفایل عمومی از جدول ads
//   useEffect(() => {
//     async function fetchPublicProfile() {
//       if (!profile?.id) return;

//       const { data, error } = await supabase
//         .from("ads")
//         .select("id, long_address, education, services")
//         .eq("dentist_id", profile.id)
//         .single();

//       if (error || !data) return;

//       setAdId(data.id);
//       setValue("long_address", data.long_address || "");
//       setValue("education", data.education || []);
//       setValue("services", data.services || []);
//     }

//     fetchPublicProfile();
//   }, [profile?.id, setValue]);

//   // ذخیره یا آپدیت اطلاعات در جدول ads
//   const onSubmit = async (data) => {
//     const { long_address, education, services } = data;
//     console.log(profile.id)

//     if (adId) {
//       const { error } = await supabase
//         .from("ads")
//         .update({ long_address, education, services })
//         .eq("id", adId);

//       if (error) {
//         console.error("خطا در آپدیت پروفایل عمومی:", error.message);
//       }
//     } else {
//       const { data: inserted, error } = await supabase
//         .from("ads")
//         .insert([{ dentist_id: profile.id, long_address, education, services }])
//         .select()
//         .single();

//       if (error) {
//         console.error("خطا در درج پروفایل عمومی:", error.message);
//       } else {
//         console.log(data);
//         setAdId(inserted.id);
//       }
//     }
//   };

//   const addField = (key) => {
//     const current = watch(key) || [];
//     setValue(key, [...current, ""]);
//   };

//   const updateField = (key, index, value) => {
//     const current = [...watch(key)];
//     current[index] = value;
//     setValue(key, current);
//   };

//   const removeField = (key, index) => {
//     const current = [...watch(key)];
//     current.splice(index, 1);
//     setValue(key, current);
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mt-6 space-y-6 border border-blue-100">
//       <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
//         پروفایل عمومی شما
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <ReadOnlyField label="نام" value={profile?.name} />
//         <ReadOnlyField label="شماره تماس" value={profile?.phone} />
//         <ReadOnlyField label="کد نظام پزشکی" value={profile?.medical_code} />
//         <ReadOnlyField label="تخصص" value={profile?.specialty} />
//         <ReadOnlyField
//           label="سابقه کار (سال)"
//           value={profile?.experience ? `${profile.experience} سال` : ""}
//         />
//       </div>
//       <ReadOnlyField label="درباره من" value={profile?.bio} textarea />

//       {/* تب‌ها */}
//       <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
//         <TabButton label="سوابق تحصیلی" active={activeTab === "education"} onClick={() => setActiveTab("education")} />
//         <TabButton label="خدمات قابل ارائه" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
//         <TabButton label="آدرس مطب" active={activeTab === "long_address"} onClick={() => setActiveTab("long_address")} />
//       </div>

//       {/* فرم ویرایش */}
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[65vh] overflow-y-auto pr-1 sm:pr-2">

//         {activeTab === "education" && (
//           <div>
//             <label className="block text-blue-700 mb-2 font-medium">سوابق تحصیلی</label>
//             {education.map((item, index) => (
//               <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={item}
//                   onChange={(e) => updateField("education", index, e.target.value)}
//                   className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
//                   placeholder="مثلاً: دندانپزشکی - دانشگاه تهران"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeField("education", index)}
//                   className="text-red-500 hover:text-red-700 text-sm"
//                 >
//                   🗑️ حذف
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addField("education")}
//               className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
//             >
//               ➕ افزودن سابقه تحصیلی
//             </button>
//           </div>
//         )}

//         {activeTab === "services" && (
//           <div>
//             <label className="block text-blue-700 mb-2 font-medium">خدمات قابل ارائه</label>
//             {services.map((item, index) => (
//               <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={item}
//                   onChange={(e) => updateField("services", index, e.target.value)}
//                   className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
//                   placeholder="مثلاً: ایمپلنت، عصب‌کشی، جرم‌گیری"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeField("services", index)}
//                   className="text-red-500 hover:text-red-700 text-sm"
//                 >
//                   🗑️ حذف
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addField("services")}
//               className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
//             >
//               ➕ افزودن خدمت جدید
//             </button>
//           </div>
//         )}

//         {activeTab === "long_address" && (
//           <div>
//             <label className="block text-blue-700 mb-2 font-medium">آدرس دقیق مطب</label>
//             <textarea
//               {...register("long_address")}
//               rows={3}
//               className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
//               placeholder="مثلاً: خیابان انقلاب، کوچه ۱۲، پلاک ۳، طبقه دوم"
//             />
//             {errors.long_address && (
//               <p className="text-red-500 text-sm mt-1">{errors.long_address.message}</p>
//             )}
//           </div>
//         )}

//         <Button
//           type="submit"
//           className="w-full py-2 sm:py-2.5 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all duration-200"
//         >
//           ذخیره تغییرات
//         </Button>
//       </form>
//     </div>
//   );
// }

// function ReadOnlyField({ label, value, textarea }) {
//   return (
//     <div>
//       <label className="block text-blue-700 mb-1 font-medium">{label}</label>
//       {textarea ? (
//         <textarea
//           rows={3}
//           className="w-full px-3 py-2 border border-blue-100 rounded-md bg-gray-50 text-gray-600 shadow-inner resize-none"
//           disabled
//           value={value || ""}
//         />
//       ) : (
//         <input
//           type="text"
//           value={value || ""}
//           disabled
//           className="w-full px-3 py-2 border border-blue-100 rounded-md bg-gray-50 text-gray-600 shadow-inner"
//         />
//       )}
//     </div>
//   );
// }

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



// -------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useUserStore } from "@/stores/useUserStore";
// import Button from "@/component/Button";
// import supabase from "@/api/supabase";

// const schema = z.object({
//   long_address: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است."),
//   education: z.array(z.string()).optional(),
//   services: z.array(z.string()).optional(),
//   phone_numbers: z.array(z.string().regex(/^09\d{9}$/, "شماره معتبر نیست")).max(2, "حداکثر دو شماره مجاز است").optional(),
// });

// export default function DentistPublicProfile() {
//   const profile = useUserStore((state) => state.profile);
//   const [activeTab, setActiveTab] = useState("education");
//   const [adId, setAdId] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       long_address: "",
//       education: [],
//       services: [],
//       phone_numbers: [],
//     },
//   });

//   const education = watch("education") || [];
//   const services = watch("services") || [];
//   const phone_numbers = watch("phone_numbers") || [];

//   useEffect(() => {
//     async function fetchPublicProfile() {
//       if (!profile?.id) return;

//       const { data, error } = await supabase
//         .from("ads")
//         .select("id, long_address, education, services, phone_numbers")
//         .eq("dentist_id", profile.id)
//         .single();

//       if (error || !data) return;

//       setAdId(data.id);
//       setValue("long_address", data.long_address || "");
//       setValue("education", data.education || []);
//       setValue("services", data.services || []);
//       setValue("phone_numbers", data.phone_numbers || []);
//     }

//     fetchPublicProfile();
//   }, [profile?.id, setValue]);

//   const onSubmit = async (data) => {
//     const { long_address, education, services, phone_numbers } = data;

//     if (adId) {
//       await supabase
//         .from("ads")
//         .update({ long_address, education, services, phone_numbers })
//         .eq("id", adId);
//     } else {
//       const { data: inserted } = await supabase
//         .from("ads")
//         .insert([{ dentist_id: profile.id, long_address, education, services, phone_numbers }])
//         .select()
//         .single();

//       setAdId(inserted.id);
//     }
//   };

//   const addField = (key) => {
//     const current = watch(key) || [];
//     setValue(key, [...current, ""]);
//   };

//   const updateField = (key, index, value) => {
//     const current = [...watch(key)];
//     current[index] = value;
//     setValue(key, current);
//   };

//   const removeField = (key, index) => {
//     const current = [...watch(key)];
//     current.splice(index, 1);
//     setValue(key, current);
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mt-6 space-y-6 border border-blue-100">
//       <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">پروفایل عمومی شما</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <ReadOnlyField label="نام" value={profile?.name} />
//         <ReadOnlyField label="شماره تماس" value={profile?.phone} />
//         <ReadOnlyField label="کد نظام پزشکی" value={profile?.medical_code} />
//         <ReadOnlyField label="تخصص" value={profile?.specialty} />
//         <ReadOnlyField label="سابقه کار (سال)" value={profile?.experience ? `${profile.experience} سال` : ""} />
//       </div>
//       <ReadOnlyField label="درباره من" value={profile?.bio} textarea />

//       <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
//         <TabButton label="سوابق تحصیلی" active={activeTab === "education"} onClick={() => setActiveTab("education")} />
//         <TabButton label="خدمات قابل ارائه" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
//         <TabButton label="آدرس مطب" active={activeTab === "long_address"} onClick={() => setActiveTab("long_address")} />
//         <TabButton label="شماره‌های تماس دیگر" active={activeTab === "phone_numbers"} onClick={() => setActiveTab("phone_numbers")} />
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[65vh] overflow-y-auto pr-1 sm:pr-2">
//         {activeTab === "education" && (
//           <FieldList title="سوابق تحصیلی" keyName="education" values={education} updateField={updateField} removeField={removeField} addField={addField} />
//         )}

//         {activeTab === "services" && (
//           <FieldList title="خدمات قابل ارائه" keyName="services" values={services} updateField={updateField} removeField={removeField} addField={addField} />
//         )}

//         {activeTab === "phone_numbers" && (
//           <div>
//             <label className="block text-blue-700 mb-2 font-medium">شماره‌های تماس دیگر</label>
//             {phone_numbers.map((item, index) => (
//               <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={item}
//                   onChange={(e) => updateField("phone_numbers", index, e.target.value)}
//                   className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
//                   placeholder="مثلاً: 09123456789"
//                 />
//                 <button type="button" onClick={() => removeField("phone_numbers", index)} className="text-red-500 hover:text-red-700 text-sm">🗑️ حذف</button>
//               </div>
//             ))}
//             {phone_numbers.length < 2 && (
//               <button type="button" onClick={() => addField("phone_numbers")} className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">➕ افزودن شماره تماس</button>
//             )}
//             {errors.phone_numbers && <p className="text-red-500 text-sm mt-1">{errors.phone_numbers.message}</p>}
//           </div>
//         )}

//         {activeTab === "long_address" && (
//           <div>
//             <label className="block text-blue-700 mb-2 font-medium">آدرس دقیق مطب</label>
//             <textarea {...register("long_address")} rows={3} className="w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200" placeholder="مثلاً: خیابان انقلاب، کوچه ۱۲، پلاک ۳، طبقه دوم" />
//             {errors.long_address && <p className="text-red-500 text-sm mt-1">{errors.long_address.message}</p>}
//           </div>
//         )}

//         <Button type="submit" className="w-full py-2 sm:py-2.5 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all duration-200">ذخیره تغییرات</Button>
//       </form>
//     </div>
//   );
// }

// function ReadOnlyField({ label, value, textarea }) {
//   return (
//     <div>
//       <label className="block text-blue-700 mb-1 font-medium">{label}</label>
//       {textarea ? (
//         <textarea rows={3} className="w-full px-3 py-2 border border-blue-100 rounded-md bg-gray-50 text-gray-600 shadow-inner resize-none" disabled value={value || ""} />
//       ) : (
//         <input type="text" value={value || ""} disabled className="w-full px-3 py-2 border border-blue-100 rounded-md bg-gray-50 text-gray-600 shadow-inner" />
//       )}
//     </div>
//   );
// }

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





// ----------------------------------------------------------------------------------------


import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserStore } from "@/stores/useUserStore";
import Button from "@/component/Button";
import supabase from "@/api/supabase";
import Swal from "sweetalert2";

const schema = z.object({
  long_address: z.string().max(500, "حداکثر ۵۰۰ کاراکتر مجاز است."),
  education: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  phone_numbers: z.array(z.string().regex(/^09\d{9}$/, "شماره معتبر نیست")).max(2, "حداکثر دو شماره مجاز است").optional(),
});

export default function DentistPublicProfile() {
  const profile = useUserStore((state) => state.profile);
  const [activeTab, setActiveTab] = useState("education");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      long_address: "",
      education: [],
      services: [],
      phone_numbers: [],
      
    },

  });

  const education = watch("education") || [];
  const services = watch("services") || [];
  const phone_numbers = watch("phone_numbers") || [];

  useEffect(() => {
    if (!profile?.id) return;

    setValue("long_address", profile.long_address || "");
    setValue("education", profile.education || []);
    setValue("services", profile.services || []);
    setValue("phone_numbers", profile.phone_numbers || []);
  }, [profile, setValue]);

  const onSubmit = async (data) => {
    const { long_address, education, services, phone_numbers } = data;

    const { error } = await supabase
      .from("profiles")
      .update({ long_address, education, services, phone_numbers })
      .eq("id", profile.id);

    if (error) {
      console.error("خطا در ذخیره اطلاعات:", error);
      // alert("خطا در ذخیره اطلاعات");
      Swal.fire({
        text: "خطا در ذخیره اطلاعات",
        icon: 'error',
        confirmButtonText: 'متوجه شدم',
        // confirmButtonColor:"green",
      })
    } else {
      // alert("اطلاعات با موفقیت ذخیره شد");
      Swal.fire({
        text: "اطلاعات با موفقیت ذخیره شد",
        icon: 'success',
        confirmButtonText: 'متوجه شدم',
        // confirmButtonColor:"green",
      })
    }
  };

  const addField = (key) => {
    const current = watch(key) || [];
    setValue(key, [...current, ""]);
  };

  const updateField = (key, index, value) => {
    const current = [...watch(key)];
    current[index] = value;
    setValue(key, current);
  };

  const removeField = (key, index) => {
    const current = [...watch(key)];
    current.splice(index, 1);
    setValue(key, current);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8 mt-6 space-y-6 border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">پروفایل عمومی شما</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ReadOnlyField label="نام" value={profile?.name} />
        <ReadOnlyField label="شماره تماس" value={profile?.phone} />
        <ReadOnlyField label="کد نظام پزشکی" value={profile?.medical_code} />
        <ReadOnlyField label="تخصص" value={profile?.specialty} />
        <ReadOnlyField label="سابقه کار (سال)" value={profile?.experience ? `${profile.experience} سال` : ""} />
      </div>
      <ReadOnlyField label="درباره من" value={profile?.bio} textarea />

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 mb-4">
        <TabButton label="سوابق تحصیلی" active={activeTab === "education"} onClick={() => setActiveTab("education")} />
        <TabButton label="خدمات قابل ارائه" active={activeTab === "services"} onClick={() => setActiveTab("services")} />
        <TabButton label="آدرس مطب" active={activeTab === "long_address"} onClick={() => setActiveTab("long_address")} />
        <TabButton label="شماره‌های تماس دیگر" active={activeTab === "phone_numbers"} onClick={() => setActiveTab("phone_numbers")} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-h-[65vh] overflow-y-auto pr-1 sm:pr-2">
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
        )}

        <Button type="submit" className="w-full py-2 sm:py-2.5 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition-all duration-200">ذخیره تغییرات</Button>
      </form>
    </div>
  );
}

function ReadOnlyField({ label, value, textarea }) {
  return (
    <div>
      <label className="block text-blue-700 mb-1 font-medium">{label}</label>
      {textarea ? (
        <textarea rows={3} className="w-full px-3 py-2 border border-blue-100 rounded-md bg-gray-50 text-gray-600 shadow-inner resize-none" disabled value={value || ""} />
      ) : (
        <input type="text" value={value || ""} disabled className="w-full px-3 py-2 border border-blue-100 rounded-md bg-gray-50 text-gray-600 shadow-inner" />
      )}
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
        active
          ? "bg-blue-500 text-white shadow"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
      }`}
    >
      {label}
    </button>
  );
}

function FieldList({ title, keyName, values, updateField, removeField, addField }) {
  return (
    <div>
      <label className="block text-blue-700 mb-2 font-medium">{title}</label>
      {values.map((item, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateField(keyName, index, e.target.value)}
            className="w-full sm:flex-grow px-3 py-2 border border-blue-200 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
          />
          <button
            type="button"
            onClick={() => removeField(keyName, index)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            🗑️ حذف
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addField(keyName)}
        className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
      >
        ➕ افزودن
      </button>
    </div>
  );
}

