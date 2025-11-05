import Home from "./pages/Home"
import AllDentist from "./pages/AllDentist"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dentist from "./pages/app/DataListDentist"
import Blog from "./pages/Blog"
import Confirm from "./pages/Confirm"
import RegisterDentist from "./pages/RegisterDentist"

import UserPanel from "./pages/Userpanel/UserPanel"
import UserDetails from "./pages/Userpanel/AccountDetails"

// import Counter from "./pages/Userpanel/Counter"
import DentistHome from "./component/dentist/DentistHome"
import DentistPanel from "./pages/dentistpanel/DentistPanel"
import DentistDetails from "./pages/dentistpanel/AccountDetails"
// import AdsManager from "./pages/dentistpanel/AdsManager"

// import TakingVisit from "./pages/app/TakingVisit"
import Rules from "./pages/app/Rules"
// import Visit from "./pages/app/Visit"
import TimeVisit from "./pages/app/TimeVisit"
import AppointmentDetails from "./pages/app/AppointmentDetails"


import AdminPanel from "./pages/adminpanel/AdminPanel"
import HomeAdminPanel from "./pages/adminpanel/Home"
import Articles from "./pages/adminpanel/Articles"
import Comments from "./pages/adminpanel/Comments"
import Groupy from "./pages/adminpanel/Groupy"
import Users from "./pages/adminpanel/user-management/Users"
import Menous from "./pages/adminpanel/Menous"
import NotFound from "./pages/Unauthorized"
import Unauthorized from "./pages/Unauthorized"
import TakingVisit from "./pages/app/TakingVisit"
import Appointments from "./pages/Userpanel/Appointments"
import UsersList from "./pages/adminpanel/user-management/UsersList"
// import EditUserForm from "./pages/adminpanel/user-management/EditUserForm"
import ProfileUser from "./pages/adminpanel/user-management/ProfileUser"
import RoleProtectedRoute from "./features/RoleProtectedRoute "

// let routes = [

//     {path: '/',element: <Home />},
//     {path: '/allDentist',element: <AllDentist />},
//     {path: '/login',element: <Login />},
//     {path: '/register',element: <Register />},
//     {path: '/confirm',element: <Confirm />},
//     // {path: '/dentist/:id',element: <Dentist />},
//     {path: '/blog',element: <Blog />},
//     {path: '/registerdentist',element: <RegisterDentist />},
//     // {path: '/rules',element: <Rules />},
//     {path: '*',element: <NotFound />},

//     // {
//     //     path: "/dentist/:id/*", element: <Dentist />, children: [
//     //         // { path: "", element: <TimeVisit /> },
//     //         { path: "time-visit", element: <TimeVisit /> },
//     //         { path: "visit", element: <Visit /> },
//     //         { path: "rules", element: <Rules /> },
//     //         { path: "record-Information", element: <RecordInformation /> },
//     //     ]
//     // },
//     {
//         path: "/dentist/:id/*",
//         element: <TakingVisit />,
//         children: [
//           { index: true, element: <Dentist /> }, // مسیر پیش‌فرض
//           { path: "time-visit", element: <TimeVisit /> },
//         //   { path: "visit", element: <Visit /> },
//           { path: "rules", element: <Rules /> },
//           { path: "appointment-Details/:appointmentId", element: <AppointmentDetails /> },
//         ],
//     },
      
//     {
//         path: "/dentist-panel/*", element: <DentistPanel />, children: [
//             { path: "", element: <DentistHome /> },
//             { path: "details", element: <DentistDetails /> },
//             // { path: "adds", element: <AdsManager /> },
//         ]
//     },
//     {
//         path: "/user-panel/*", element: <UserPanel />, children: [
//             // { path: "", element: <Counter /> },
//             { path: "details", element: <UserDetails /> },
//             { path: "appointments", element: <Appointments /> },
//         ]
//     },
//     // {
//     //     path: "/admin-panel/*", element: <AdminPanel />, children: [
//     //         { path: "home", element: <HomeAdminPanel /> },
//     //         { path: "users", element: <Users /> },
//     //         { path: "articles", element: <Articles /> },
//     //         { path: "comments", element: <Comments /> },
//     //         { path: "groupy", element: <Groupy /> },
//     //         { path: "menous", element: <Menous /> },
//     //     ]
//     // },
// // ------------------------------------------------------------------------------
//     {
//         path: "/admin-panel/*", element: <AdminPanel />, children: [
//             { path: "home", element: <HomeAdminPanel /> },
//             { 
//                 path: "users/*", element: <Users /> ,children:[
//                     //{ path: "", element: <UsersList /> },
//                     // { path: "user-details/:id", element: <ProfileUser/>},
//                     //{ path: ":id", element: <ProfileUser/>},
//                     // { path: "edit-user-form/:id", element: <EditUserForm /> },
//                     { index: true, element: <UsersList /> }, // /admin-panel/users
//                     { path: ":id", element: <ProfileUser /> }, // /admin-panel/users/123
//                 ]
//             },
//             { path: "articles", element: <Articles /> },
//             { path: "comments", element: <Comments /> },
//             { path: "groupy", element: <Groupy /> },
//             { path: "menous", element: <Menous /> },
//         ]
//     },

    
    
// ]



let routes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/confirm", element: <Confirm /> },
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
      <RoleProtectedRoute allowedRoles={["dentist"]}>
          <DentistPanel />
      </RoleProtectedRoute>,
      children: [
        { path: "", element: <DentistHome /> },
        { path: "details", element: <DentistDetails /> },
      ],
    },
  
    // 👤 User Panel (محافظت‌شده)
    {
      path: "/user-panel/*",
      element: 
        <RoleProtectedRoute allowedRoles={["patient"]}>
            <UserPanel />
        </RoleProtectedRoute>,
      children: [
        { path: "details", element: <UserDetails /> },
        { path: "appointments", element: <Appointments /> },
      ],
    },
  
    // 🛠 Admin Panel (محافظت‌شده)
    {
      path: "/admin-panel/*",
      element: <RoleProtectedRoute allowedRoles={["admin"]} />,
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
        { path: "groupy", element: <Groupy /> },
        { path: "menous", element: <Menous /> },
      ],
    },
  ];



export default routes