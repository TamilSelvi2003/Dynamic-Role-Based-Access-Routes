// import React, { useEffect } from 'react';
// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/login/Login';
// import Register from './pages/login/Register';
// import Admin from './pages/Admin/Admin';
// import { Toaster } from 'react-hot-toast';
// import AdminLaouts from './Layouts/AdminLaouts';
// import UserLayout from './Layouts/UserLayout';
// import CashierLayouts from './Layouts/CashierLayouts';
// import PublicLayouts from './Layouts/PublicLayouts';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateUser } from './redux/AuthSlice';
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import Header from './pages/Header';
// import CreateRole from './pages/roles/roles'
// import CreateRoute from './pages/roles/routes'
// import DynamicPage from './pages/dynamicRoutes/DynamicPage';


// export default function App() {
//   const user = useSelector((state) => state.Auth.user);
//   const dispatch = useDispatch();
 
//   useEffect(() => {
//     if (!user) {
//       dispatch(updateUser());
//     }
//   }, [dispatch, user]);

//   const ProtectedRoute = ({ user, children }) => {
//     return user ? children : <Navigate to="/login" />;
//   };
  

//   return (
//     <>
//       <BrowserRouter>
//         <Toaster />
//         <Routes>
//           <Route path="/" element={<UserLayout />}>
//             <Route index element={<Home />} />
//           </Route>
//           <Route path="/" element={<AdminLaouts />}>
//             <Route index element={<Home />} />
//           </Route>
//           <Route path="/" element={<CashierLayouts />}>
//             <Route index element={<Home />} />
//           </Route>
//           <Route path="/" element={<PublicLayouts />}>
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="header" element={<Header />} />
//           </Route>

//           <Route path="/:pageName" element={<DynamicPage />} />
//            <Route path="/admin-dash" element={<ProtectedRoute user={user}><AdminDashboard /></ProtectedRoute>} />

//           <Route path='/role' element={<CreateRole/>} />
//           <Route path='/route' element={<CreateRoute/>} />
//           <Route path='admin' element={<Admin/>}/>
      
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }


import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/AuthSlice";
import { fetchRoutes } from "./redux/RouteSlice";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Admin from './pages/Admin/Admin'
import AdminDashboard from "./pages/Admin/AdminDashboard";
import DynamicPage from "./pages/dynamicRoutes/DynamicPage";
import PublicLayouts from "./Layouts/PublicLayouts";
import ProtectedRoute from "./pages/ProtectedRoutes";
import ViewUser from "./pages/Admin/View";
import CreateRole from './pages/roles/roles'
import CreateRoute from './pages/roles/routes'
import Header from './pages/Header'
import Unauthorized from "./pages/dynamicRoutes/UnAuthorized";  // Create this page

export default function App() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(updateUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      dispatch(fetchRoutes(user.role));
    }
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayouts />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="header" element={<Header />} />
        </Route>

        {/* Dynamic Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin-dash" element={<AdminDashboard />} />
          <Route path="/:pageName" element={<DynamicPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/role" element={<CreateRole />} />
          <Route path="/route" element={<CreateRoute />} />
          <Route path="/viewuser/:id" element={<ViewUser />} />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
