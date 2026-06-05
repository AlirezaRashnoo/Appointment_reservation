import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useUserStore } from "@/stores/useUserStore";
import Swal from "sweetalert2";
import Cookies from "js-cookie";



const API_BASE_URL = "https://dentist-reyn.onrender.com/api/v1";

const schema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید").optional().nullable(),
  bio: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
});

// گرفتن csrf_token از cookie به صورت مطمئن
// const getCsrfToken = () => {
//   const match = document.cookie.match(/(^|;)\\s*csrf_token=([^;]+)/);
//   return match ? match[2] : null;
// };

function AccountDetails() {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();
  // const user = useUserStore((state) => state.user);
  
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const csrfToken = Cookies.get("csrf_token")


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      avatar: "",
    },
  });

  // پر کردن فرم از store
  useEffect(() => {
    console.log(csrfToken);
    console.log(user?.profile?.avatar,"یبتردیبخکرخیب");
    
    if (!user) return;
    reset({
      firstName: user.profile?.firstName || "",
      lastName: user.profile?.lastName || "",
      email: user.profile?.email || "",
      bio: user.profile?.bio || "",
      avatar: user.profile?.avatar || "",
    });
  }, [user, reset]);

  // ویرایش پروفایل
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      console.log("CSRF token sent:", csrfToken); // بررسی در console

      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "خطا در بروزرسانی اطلاعات");
      }
      return (await response.json()).data;
    },
    onSuccess: (data) => {
      setUser({
        ...user,
        profile: { ...user.profile, ...data },
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      Swal.fire({
        text: "اطلاعات با موفقیت بروزرسانی شد",
        icon: "success",
        confirmButtonText: "متوجه شدم",
      });
    },
    onError: (error) => {
      Swal.fire({
        text: `خطا: ${error.message}`,
        icon: "error",
        confirmButtonText: "متوجه شدم",
      });
    },
  });

  // آپلود آواتار
  const uploadAvatar = async (file) => {
    if (!file) return;
    setUploading(true);
    setUploadError("");

    try {
      // const csrfToken = getCsrfToken();

      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(`${API_BASE_URL}/users/me/avatar`, {
        method: "PATCH",
        credentials: "include",
        headers: { "X-CSRF-Token": csrfToken },
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "خطا در آپلود عکس");
      }

      const result = await response.json();
      const newAvatarUrl = result.data?.avatarUrl;

      if (newAvatarUrl) {
        setValue("avatar", newAvatarUrl);
        setUser({
          ...user,
          profile: { ...user.profile, avatar: newAvatarUrl },
        });
        Swal.fire({
          text: "آپلود عکس با موفقیت انجام شد",
          icon: "success",
          confirmButtonText: "متوجه شدم",
        });
      }
    } catch (error) {
      setUploadError(error.message || "خطا در آپلود");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  if (!user) {
    return (
      <div className="pb-16 bg-blue-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">در حال بارگذاری اطلاعات...</p>
      </div>
    );
  }

  return (
    <div className="pb-16 bg-blue-50 min-h-screen">
      <div className="container mx-auto max-w-4xl px-4">
                <div className="flex items-center gap-x-3 pt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="size-7 text-blue-600"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
          <h4 className="text-lg font-semibold text-gray-800">ویرایش اطلاعات کاربر</h4>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl mt-6">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label>نام</label>
                <input
                  {...register("firstName")}
                  className="w-full mt-1 p-2.5 border rounded"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label>نام خانوادگی</label>
                <input
                  {...register("lastName")}
                  className="w-full mt-1 p-2.5 border rounded"
                />
              </div>

              {/* Phone */}
              <div>
                <label>شماره موبایل</label>
                <input
                  value={user.phoneNumber || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div>

              {/* Email */}
              <div>
                <label>ایمیل</label>
                <input
                  {...register("email")}
                  className="w-full mt-1 p-2.5 border rounded"
                />
              </div>

              {/* Role */}
              {/* <div>
                <label>نقش کاربری</label>
                <input
                  value={user.role || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div> */}

              <div>
                <label>کد ملی</label>
                <input
                  value={user?.profile.nationalCode || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div>

              {/* Status */}
              <div>
                <label>وضعیت حساب</label>
                <input
                  value={user.status || ""}
                  disabled
                  className="w-full mt-1 p-2.5 bg-gray-100 border rounded"
                />
              </div>

              {/* Avatar */}
              <div className="sm:col-span-2">
                <label>عکس پروفایل</label>
                <div className="flex gap-4 mt-2">
                  {user?.profile?.avatar && (
                    <img
                      src={user.profile.avatar}
                      alt="profile"
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                  )}
                  <div>
                    <input
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
                </div>
              </div>

              {/* Bio */}
              <div className="sm:col-span-2">
                <label>اگر سابقه بیماری دارید بنویسید</label>
                <textarea
                  {...register("bio")}
                  rows={5}
                  className="w-full mt-1 p-2.5 border rounded"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={mutation.isPending || uploading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                {mutation.isPending ? "در حال ارسال..." : "تغییر اطلاعات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;

