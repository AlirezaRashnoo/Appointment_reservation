import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";
import Button from "../component/Button";
import Header from "../component/Header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Zod validation schema
const schema = z.object({
  otpCode: z.string().min(6, "کد تایید باید ۶ رقمی باشد").max(6, "کد تایید باید ۶ رقمی باشد"),
});


const verifyOTP = async (data) => {
  try {
    const payload = {
      phoneNumber: localStorage.getItem("phone"),  
      otp: data.otpCode,
    };
    
    console.log("Sending otp payload:", JSON.stringify(payload, null, 2));
    
    const response = await axios.post("https://dentist-reyn.onrender.com/api/v1/auth/verify-otp", payload,
       {
      headers: {"Content-Type": "application/json",},
      withCredentials: true
    });
    
    console.log("Full Response from Server:", response);
    
    return response.data;
  } catch (error) {
    console.error("Error during OTP verification:", error);
    throw new Error(error.response?.data?.message || "تایید کد با مشکل مواجه شد.");
  }
};

export default function VerifyOTP() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      console.log("Server Response:", data);
      Swal.fire("کد تایید با موفقیت انجام شد!");
      navigate("/")
    },
    onError: (error) => {
      console.log("Error response:", error.response?.data || error);
      Swal.fire("خطا", error.message || "تایید کد با مشکل مواجه شد.", "error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center px-4 py-6 min-h-screen">
        <div className="bg-white w-[450px] sm:w-[500px] p-5 xs:p-10 rounded-lg shadow-Main">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-black text-xl xs:text-2xl text-center">تایید کد OTP</h1>
            <div>
              <Button href="/register" className="text-black font-semibold">بازگشت</Button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="otpCode" className="text-gray-400 text-[13px] xs:text-base">کد تایید</label>
              <input
                {...register("otpCode")}
                type="text"
                placeholder="کد تایید"
                className="w-full bg-blue-100 p-2 rounded-md h-14"
              />
              {errors.otpCode && <p className="text-red-500 text-sm">{errors.otpCode.message}</p>}
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "در حال تایید..." : "تایید کد"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

