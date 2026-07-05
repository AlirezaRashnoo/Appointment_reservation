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
// import Rules from "./pages/app/Rules"
import TimeVisit from "./pages/app/TimeVisit"


import AdminPanel from "./pages/adminpanel/AdminPanel"
import HomeAdminPanel from "./pages/adminpanel/Home"
import Articles from "./pages/adminpanel/Articles"
import Comments from "./pages/adminpanel/Comments"
import NotFound from "./pages/Unauthorized"
import TakingVisit from "./pages/app/TakingVisit"
import AppointmentsUser from "./pages/Userpanel/Appointments"
import PatientList from "./pages/adminpanel/user-management/PatientList"
import UsersList from "./pages/adminpanel/user-management/UsersList"
import AppointmentsDentist from "./pages/dentistpanel/Appointments"
import WorkingHours from "./pages/dentistpanel/WorkingHours"
import VerifyOTP from "./pages/VerifyOTP"
import DentistProfile from "./pages/adminpanel/user-management/DentistProfile"
import ProfilePatients from "./pages/adminpanel/user-management/ProfilePatients"
import DentistList from "./pages/adminpanel/user-management/DentistList"
import Services from "./pages/dentistpanel/Services"


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
        // { path: "rules", element: <Rules /> },
      ],
    },
  
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
        { path: "WorkingHours", element: <WorkingHours /> },
        { path: "services", element: <Services /> },
      ],
    },
  
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
  
    {
      path: "/admin-panel",
      element: <AdminPanel />,
      children: [
        { index: true, element: <HomeAdminPanel /> },
        { path: "home", element: <HomeAdminPanel /> }, 
        { path: "users", element: <UsersList /> },                    
        { path: "users/patients-list", element: <PatientList/> },        
        { path: "users/dentist-list", element: <DentistList/> },        
        { path: "users/dentist/:id", element: <DentistProfile /> },    
        { path: "users/patient/:id", element: <ProfilePatients /> },   
        
        { path: "articles", element: <Articles /> },
        { path: "articles/:id", element: <Articles /> },              
        { path: "comments", element: <Comments /> },
      ],
    },


  ];



export default routes