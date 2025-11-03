
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaRegCalendarDays } from "react-icons/fa6";
import { BiPhoneCall } from "react-icons/bi";
import Button from "@/component/Button";
import supabase from "@/api/supabase";
import { useUserStore } from "@/stores/useUserStore";

function Appointments() {
  const { profile } = useUserStore();

  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["appointments", profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          id,
          appointment_time,
          status,
          dentist:dentist_id (
            id,
            name,
            phone,
            avatar_url,
            specialty,
            long_address
          )
        `)
        .eq("patient_id", profile.id)
        .order("appointment_time", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!profile?.id,
  });

  if (isLoading) return <p className="text-center mt-10">در حال بارگذاری نوبت‌ها...</p>;
  if (error) return <p className="text-center text-red-500">خطا در دریافت نوبت‌ها</p>;
  if (!appointments?.length) return <p className="text-center mt-10">شما هنوز نوبتی ثبت نکرده‌اید</p>;

  return (
    <div className="container mt-16">
      {appointments.map((appt) => {
        const date = new Date(appt.appointment_time);
        const formattedDate = date.toLocaleDateString("fa-IR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
        const formattedTime = date.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={appt.id} className="relative h-80">
            <div className="absolute -top-6 right-1/2 bg-white rounded-full p-4">
              <FaRegCalendarDays className="fill-blue-500 size-8" />
            </div>
            <div className="py-3 px-3.5 bg-white rounded-xl shadow-md">
              <div className="child:py-3 child:border-b child:border-black/5">
                <div className="flex items-center justify-between">
                  <p>تاریخ نوبت</p>
                  <p>{formattedDate}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>ساعت نوبت</p>
                  <p>{formattedTime}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4 pb-4 pt-3">
                  <img
                    src={appt.dentist?.avatar_url}
                    className="w-16 h-16 rounded-full object-cover"
                    alt="profile_img"
                  />
                  <div className="inline-block w-fit relative text-right">
                    <h1 className="text-base">{appt.dentist?.name || "نامشخص"}</h1>
                    <span className="text-[13px]">{appt.dentist?.specialty || "دندانپزشک"}</span>
                  </div>
                </div>
                <Button href={`tel:${appt.dentist?.phone || ""}`}>
                  <BiPhoneCall className="size-6 text-green-400" />
                </Button>
              </div>
              <div className="text-sm pt-3">
                <p>آدرس: {appt.dentist?.long_address || "نامشخص"}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Appointments;

