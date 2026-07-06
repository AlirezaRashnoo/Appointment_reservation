import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Swal from "sweetalert2";
import Button from "../component/Button";
import Header from "../component/Header";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";
import Cookies from "js-cookie";

// Zod validation schema
const schema = z.object({
  otpCode: z
    .string()
    .min(6, "کد تایید باید ۶ رقمی باشد")
    .max(6, "کد تایید باید ۶ رقمی باشد")
    .regex(/^\d+$/, "کد تایید باید فقط شامل عدد باشد"),
});

const RESEND_SECONDS = 60;
const verifyOTP = async (data) => {
  try {
    const payload = {
      phoneNumber: localStorage.getItem("phone"),
      otp: data.otpCode,
    };

    const response = await axios.post(
      "https://dentist-reyn.onrender.com/api/v1/auth/verify-otp",
      payload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "تایید کد با مشکل مواجه شد.");
  }
};

const resendOTP = async () => {
  const phoneNumber = localStorage.getItem("phone");
  const response = await axios.post(
    "https://dentist-reyn.onrender.com/api/v1/auth/resend-otp",
    { phoneNumber },
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  return response.data;
};

export default function VerifyOTP() {
  const navigate = useNavigate();
  const setCsrfToken = useUserStore((state) => state.setCsrfToken);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { otpCode: "" },
  });

  const otpValue = watch("otpCode") || "";
  const digits = otpValue.split("");
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const phone = typeof window !== "undefined" ? localStorage.getItem("phone") : null;

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "کد تایید با موفقیت انجام شد!",
        confirmButtonColor: "#3b82f6",
      });
      const csrfToken = data?.data?.csrfToken;
      if (csrfToken) {
        setCsrfToken(csrfToken);
        Cookies.set("csrf_token", csrfToken, { path: "/", expires: 1 / 24 });
        // navigate("/");
        window.location="/";
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: error.message || "تایید کد با مشکل مواجه شد.",
        confirmButtonColor: "#3b82f6",
      });
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOTP,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "کد جدید ارسال شد",
        confirmButtonColor: "#3b82f6",
        timer: 1800,
        showConfirmButton: false,
      });
      setSecondsLeft(RESEND_SECONDS);
      setValue("otpCode", "");
      inputsRef.current[0]?.focus();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: error.message || "ارسال مجدد کد با مشکل مواجه شد.",
        confirmButtonColor: "#3b82f6",
      });
    },
  });

  const handleDigitChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, "");
    const chars = otpValue.split("");
    chars[index] = value.slice(-1) || "";
    const next = chars.join("").slice(0, 6);
    setValue("otpCode", next, { shouldValidate: true });

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    setValue("otpCode", pasted, { shouldValidate: true });
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const maskedPhone = phone ? phone.replace(/(\d{4})\d+(\d{2})/, "$1•••$2") : null;

  return (
    <>
      <Header />
      <div className="flex items-center justify-center px-4 py-10 min-h-screen bg-gray-50">
        <div className="bg-white w-full max-w-[420px] sm:max-w-[460px] p-6 xs:p-10 rounded-2xl shadow-Main border border-gray-100">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082M9.75 3.104a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-1.307L5 14.5M19.8 15.3l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 20.909a48.25 48.25 0 01-8.135-.682c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
            </div>
            <h1 className="text-black text-xl xs:text-2xl font-bold mb-2">
              تایید کد OTP
            </h1>
            <p className="text-gray-400 text-sm xs:text-[15px] leading-6">
              کد ۶ رقمی ارسال شده به شماره
              {maskedPhone ? (
                <span className="text-gray-600 font-medium"> {maskedPhone} </span>
              ) : (
                " شما "
              )}
              را وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP boxes */}
            <div>
              <div className="flex items-center justify-center gap-2 xs:gap-3" dir="ltr">
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digits[index] || ""}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-14 xs:w-12 xs:h-16 text-center text-xl font-semibold rounded-lg bg-blue-50 border-2 outline-none transition-colors
                      ${
                        errors.otpCode
                          ? "border-red-300 focus:border-red-400"
                          : "border-transparent focus:border-blue-400 focus:bg-white"
                      }`}
                  />
                ))}
              </div>
              {errors.otpCode && (
                <p className="text-red-500 text-sm text-center mt-3">
                  {errors.otpCode.message}
                </p>
              )}
            </div>

            {/* Resend */}
            <div className="flex items-center justify-center text-sm">
              {secondsLeft > 0 ? (
                <span className="text-gray-400">
                  ارسال مجدد کد تا {secondsLeft} ثانیه دیگر
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => resendMutation.mutate()}
                  disabled={resendMutation.isLoading}
                  className="text-blue-500 font-medium hover:text-blue-600 transition-colors disabled:opacity-50"
                >
                  {resendMutation.isLoading ? "در حال ارسال..." : "ارسال مجدد کد"}
                </button>
              )}
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full p-1.5 xs:p-2 text-white text-lg xs:text-xl text-center rounded-md hover:bg-blue-600 group transition-colors bg-blue-500 h-12 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={mutation.isLoading || otpValue.length !== 6}
              >
                {mutation.isLoading ? "در حال تایید..." : "تایید کد"}
              </Button>

              <div className="text-center">
                <Button href="/register" className="text-gray-400 text-sm font-medium">
                  بازگشت به ثبت‌ نام
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
