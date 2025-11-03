// routeHelpers.js
export const dashboardPaths = {
    patient: "/user-panel/details",
    dentist: "/dentist-panel",
    admin: "/admin-panel/home", // فرض کردم صفحه اصلی پنل ادمین /home است
  };
  
  export function getDashboardPath(role) {
    return dashboardPaths[role] || "/login";
  }