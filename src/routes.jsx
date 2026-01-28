import Home from "./pages/Home"
import AllDentist from "./pages/AllDentist"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dentist from "./pages/app/DataListDentist"
import Blog from "./pages/Blog"
import RegisterDentist from "./pages/RegisterDentist"

import UserPanel from "./pages/Userpanel/UserPanel"
import UserDetails from "./pages/Userpanel/AccountDetails"

import DentistPanel from "./pages/dentistpanel/DentistPanel"
import DentistDetails from "./pages/dentistpanel/AccountDetails"
import Rules from "./pages/app/Rules"
import TimeVisit from "./pages/app/TimeVisit"
import AppointmentDetails from "./pages/app/AppointmentDetails"


import AdminPanel from "./pages/adminpanel/AdminPanel"
import HomeAdminPanel from "./pages/adminpanel/Home"
import Articles from "./pages/adminpanel/Articles"
import Comments from "./pages/adminpanel/Comments"
import Users from "./pages/adminpanel/user-management/Users"
import NotFound from "./pages/Unauthorized"
import Unauthorized from "./pages/Unauthorized"
import TakingVisit from "./pages/app/TakingVisit"
import AppointmentsUser from "./pages/Userpanel/Appointments"
import UsersList from "./pages/adminpanel/user-management/UsersList"
import ProfileUser from "./pages/adminpanel/user-management/ProfileUser"
// import RoleProtectedRoute from "./features/RoleProtectedRoute "
import AppointmentsDentist from "./pages/dentistpanel/Appointments"
import ScheduleSettings from "./pages/dentistpanel/ScheduleSettings"
import VerifyOTP from "./pages/VerifyOTP"


let routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/verify-otp", element: <VerifyOTP /> },
    { path: "/allDentist", element: <AllDentist /> },
    { path: "/blog", element: <Blog /> },
    { path: "/registerdentist", element: <RegisterDentist /> },
    { path: "*", element: <NotFound /> },
  
    {
      path: "/dentist/:id/*",
      element: <TakingVisit />,
      children: [
        { index: true, element: <Dentist /> },
        { path: "time-visit", element: <TimeVisit /> },
        { path: "rules", element: <Rules /> },
        { path: "appointment-Details/:appointmentId", element: <AppointmentDetails /> },
      ],
    },
  
    // 🦷 Dentist Panel (محافظت‌شده)
    {
      path: "/dentist-panel/*",
      element: 
      // <RoleProtectedRoute allowedRoles={["dentist"]}>
          <DentistPanel />,
      // </RoleProtectedRoute>,
      children: [
        // { path: "", element: <DentistHome /> },
        { path: "details", element: <DentistDetails /> },
        { path: "appointments", element: <AppointmentsDentist /> },
        { path: "schedulesettings", element: <ScheduleSettings /> },
      ],
    },
  
    // 👤 User Panel (محافظت‌شده)
    {
      path: "/user-panel/*",
      element: 
        // <RoleProtectedRoute allowedRoles={["patient"]}>
            <UserPanel />,
        // </RoleProtectedRoute>,
      children: [
        { path: "details", element: <UserDetails /> },
        { path: "appointments", element: <AppointmentsUser /> },
      ],
    },
  
    // 🛠 Admin Panel (محافظت‌شده)
    {
      path: "/admin-panel/*",
      element: 
      // <RoleProtectedRoute allowedRoles={["admin"]}>
          <AdminPanel />,
      // </RoleProtectedRoute>,
      children: [
        { path: "home", element: <HomeAdminPanel /> },
        {
          path: "users/*",
          element: <Users />,
          children: [
            { index: true, element: <UsersList /> },
            { path: ":id", element: <ProfileUser /> },
          ],
        },
        { path: "articles", element: <Articles /> },
        { path: "comments", element: <Comments /> },
      ],
    },


  ];



export default routes