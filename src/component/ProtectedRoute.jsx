import React from "react";
import { useUserStore } from "@/stores/useUserStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  const profile = useUserStore((state) => state.profile);

  if (!profile) {
    // اگر لاگین نیست ریدایرکت به لاگین
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(profile.role)) {
    // اگه نقش کاربر تو roles نیست، مثلا دسترسی نداره
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}