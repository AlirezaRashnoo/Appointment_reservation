// import { Navigate, Outlet } from "react-router-dom";
// import { useUserStore } from "@/stores/useUserStore";

// const RoleProtectedRoute = ({ allowedRoles }) => {
//   const { profile } = useUserStore();

//   if (!profile) return <Navigate to="/login" />;
//   if (!allowedRoles.includes(profile?.role)) return <Navigate to="/unauthorized" />;

//   return <Outlet />;
// };

// export default RoleProtectedRoute;






import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { profile } = useUserStore();

  // حالت بارگذاری: هنوز مشخص نیست کاربر کیه
  if (profile === null) {
    return <div>در حال بارگذاری...</div>; // یا یک spinner حرفه‌ای
  }

  // اگر نقش مجاز نیست
  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;

