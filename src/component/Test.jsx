import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "نام را وارد کنید"),
});

export default function Test() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    alert("ارسال شد: " + JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="نام" />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        ارسال
      </button>
    </form>
  );
}