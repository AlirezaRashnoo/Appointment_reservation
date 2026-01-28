import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "react-toastify";

// واکشی برنامه کاری
// const fetchSchedule = async (dentistId) => {
//   const { data, error } = await supabase
//     .from("dentist_schedule")
//     .select("*")
//     .eq("dentist_id", dentistId)
//     .order("day_of_week", { ascending: true });
//   if (error) throw error;
//   return data;
// };

// // ذخیره روز کاری جدید
// const saveSchedule = async (schedule) => {
//   const { data, error } = await supabase.from("dentist_schedule").insert(schedule);
//   if (error) throw error;
//   return data;
// };

// // حذف روز کاری
// const deleteSchedule = async (id) => {
//   const { error } = await supabase.from("dentist_schedule").delete().eq("id", id);
//   if (error) throw error;
//   return id;
// };

export default function ScheduleSettings() {
  // const profile = useUserStore((state) => state.profile);
  // const dentistId = profile?.id;

  // const queryClient = useQueryClient();

  // const { data: schedule = [], isLoading } = useQuery({
  //   queryKey: ["schedule", dentistId],
  //   queryFn: () => fetchSchedule(dentistId),
  //   enabled: !!dentistId,
  // });

  // const mutationSave = useMutation({
  //   mutationFn: saveSchedule,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["schedule", dentistId] });
  //     toast.success("روز کاری ثبت شد ✅");
  //     reset();
  //   },
  //   onError: () => toast.error("خطا در ذخیره روز کاری ❌"),
  // });

  // const mutationDelete = useMutation({
  //   mutationFn: deleteSchedule,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["schedule", dentistId] });
  //     toast.success("روز کاری حذف شد 🗑️");
  //   },
  //   onError: () => toast.error("خطا در حذف روز کاری ❌"),
  // });

  // const { register, handleSubmit, reset } = useForm();

  // const onSubmit = (formData) => {
  //   if (!dentistId) return;

  //   if (formData.end <= formData.start) {
  //     toast.error("ساعت پایان باید بعد از ساعت شروع باشد ❌");
  //     return;
  //   }

  //   mutationSave.mutate({
  //     dentist_id: dentistId,
  //     day_of_week: formData.day,
  //     start_time: formData.start,
  //     end_time: formData.end,
  //   });
  // };

  // if (!dentistId) {
  //   return <p className="text-red-500">شناسه دندان‌پزشک پیدا نشد!</p>;
  // }

  // return (
  //   <div className="p-6 max-w-3xl mx-auto">
  //     <h1 className="text-2xl font-bold mb-6 text-center">📅 برنامه کاری دندان‌پزشک</h1>

  //     {/* فرم افزودن روز کاری */}
  //     <form
  //       onSubmit={handleSubmit(onSubmit)}
  //       className="bg-white border rounded-xl shadow-md p-6 mb-6 space-y-4"
  //     >
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         <select {...register("day")} className="select select-bordered w-full">
  //           <option value="Saturday">شنبه</option>
  //           <option value="Sunday">یکشنبه</option>
  //           <option value="Monday">دوشنبه</option>
  //           <option value="Tuesday">سه‌شنبه</option>
  //           <option value="Wednesday">چهارشنبه</option>
  //           <option value="Thursday">پنج‌شنبه</option>
  //           <option value="Friday">جمعه</option>
  //         </select>

  //         <input type="time" {...register("start")} className="input input-bordered w-full" />
  //         <input type="time" {...register("end")} className="input input-bordered w-full" />
  //       </div>

  //       <button
  //         type="submit"
  //         className="btn btn-primary w-full mt-4"
  //         disabled={mutationSave.isPending}
  //       >
  //         {mutationSave.isPending ? "⏳ در حال ذخیره..." : "✅ ذخیره روز کاری"}
  //       </button>
  //     </form>

  //     {/* لیست روزهای کاری */}
  //     <div className="grid gap-4">
  //       {isLoading ? (
  //         <p>در حال بارگذاری...</p>
  //       ) : schedule.length === 0 ? (
  //         <p className="text-gray-500 text-center">هیچ برنامه کاری ثبت نشده است.</p>
  //       ) : (
  //         schedule.map((s) => (
  //           <div
  //             key={s.id}
  //             className="flex justify-between items-center bg-blue-50 border rounded-lg p-4 shadow-sm"
  //           >
  //             <div>
  //               <p className="font-bold">{s.day_of_week}</p>
  //               <p className="text-sm text-gray-600">
  //                 {s.start_time} تا {s.end_time}
  //               </p>
  //             </div>
  //             <button
  //               className="btn btn-sm btn-error"
  //               onClick={() => mutationDelete.mutate(s.id)}
  //             >
  //               حذف
  //             </button>
  //           </div>
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );


  return(

    <div>ScheduleSettings</div>
  )
}



