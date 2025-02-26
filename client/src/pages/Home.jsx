// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import { fetchRoutes } from "../redux/RouteSlice";
// import { Logout } from "../redux/AuthSlice";
// import { post } from "../services/ApiEndpoint";
// import Swal from "sweetalert2";
// import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
// import "./Header.css";

// export default function Home() {
//   const user = useSelector((state) => state.Auth.user);
//   const roleRoutes = useSelector((state) => state.route.routes);
//   const routeLoading = useSelector((state) => state.route.loading);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (user?.role) {
//       console.log("Fetching routes for role:", user.role);
//       dispatch(fetchRoutes(user.role));
//     }
//   }, [dispatch, user?.role]);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   const handleLogout = async () => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "orange",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, logout!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await post("/api/auth/logout");
//         dispatch(Logout());
//         localStorage.removeItem("token");
//         navigate("/login");
//         Swal.fire("Logged out!", "You have been successfully logged out.", "success");
//       } catch (error) {
//         Swal.fire("Error", "Something went wrong during logout!", "error");
//       }
//     }
//   };

//   if (routeLoading) {
//     return <div>Loading routes...</div>;
//   }

//   return (
//     <div className="home">
//       {user?.role === "admin" ? (
//         <button onClick={() => navigate("/admin-dash")} className="menubtn">
//           <AiOutlineMenu size={21} />
//         </button>
//       ):(
//         <button></button>
//       )}

//       <nav>
//         {roleRoutes.length > 0 ? (
//           roleRoutes.map((route, index) => {
//             const cleanRoute = route.replace(/^\/+/, ""); // Remove leading slash

//             // Capitalize the first letter of each route
//             const formattedRoute = cleanRoute.charAt(0).toUpperCase() + cleanRoute.slice(1);

//             return (
//               <NavLink key={index} to={`/${cleanRoute}`}>
//                 {formattedRoute}
//               </NavLink>
//             );
//           })
//         ) : (
//           <p>No routes available for this role.</p>
//         )}


//         {user && (
//           <button onClick={handleLogout} className="homebtn">
//             <AiOutlineLogout size={13} /> Logout
//           </button>
//         )}
//       </nav>
//     </div>
//   );
// }


import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchRoutes } from "../redux/RouteSlice";
import { Logout } from "../redux/AuthSlice";
import { post } from "../services/ApiEndpoint";
import Swal from "sweetalert2";
import { AiOutlineLogout, AiOutlineMenu, AiOutlineArrowLeft } from "react-icons/ai"; // Import back arrow
import "./Header.css";

export default function Home() {
  const user = useSelector((state) => state.Auth.user);
  const roleRoutes = useSelector((state) => state.route.routes);
  const routeLoading = useSelector((state) => state.route.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role) {
      console.log("Fetching routes for role:", user.role);
      dispatch(fetchRoutes(user.role));
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      try {
        await post("/api/auth/logout");
        dispatch(Logout());
        localStorage.removeItem("token");
        navigate("/login");
        Swal.fire("Logged out!", "You have been successfully logged out.", "success");
      } catch (error) {
        Swal.fire("Error", "Something went wrong during logout!", "error");
      }
    }
  };

  if (routeLoading) {
    return <div>Loading routes...</div>;
  }

  return (
    <div className="home">
      {/* Show menu icon if admin, else show back arrow */}
      {user?.role === "admin" ? (
        <button onClick={() => navigate("/admin-dash")} className="menubtn">
          <AiOutlineMenu size={21} />
        </button>
      ) : (
        <button onClick={() => navigate('/login')} className="backbtn">
          <AiOutlineArrowLeft size={21} />
        </button>
      )}

      <nav>
        {roleRoutes.length > 0 ? (
          roleRoutes.map((route, index) => {
            const cleanRoute = route.replace(/^\/+/, ""); // Remove leading slash
            const formattedRoute = cleanRoute.charAt(0).toUpperCase() + cleanRoute.slice(1); // Capitalize first letter

            return (
              <NavLink key={index} to={`/${cleanRoute}`}>
                {formattedRoute}
              </NavLink>
            );
          })
        ) : (
          <p>No routes available for this role.</p>
        )}

        {user && (
          <button onClick={handleLogout} className="homebtn">
            <AiOutlineLogout size={13} /> Logout
          </button>
        )}
      </nav>
    </div>
  );
}
