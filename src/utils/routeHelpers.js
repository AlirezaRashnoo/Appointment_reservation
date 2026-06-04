
export const dashboardPaths = {
  patient: "/user-panel/details",
  dentist: "/dentist-panel/details",
  admin: "/admin-panel/home",
};

// تابع default export
const getDashboardPath = (role) => dashboardPaths[role] || "/login";

export default getDashboardPath;