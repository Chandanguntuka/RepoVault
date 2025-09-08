// // import React, { use, useEffect} from 'react';
// // import { useNavigate, useRoute } from 'react-router-dom';

// // // Pages list

// // import Dashboard from './components/dashboard/Dashboard.jsx';
// // import Profile from './components/user/Profile.jsx';
// // import Login from './components/auth/Login.jsx';
// // import Signup from './components/auth/Signup.jsx';

// // //Atuh contentxt
// // import { useAuth } from './authContext.jsx';

// // const ProjectRoutes = () => {
// //   const { currentUser, setCurrentUser } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // is t perfrm the what can happen the intial function call
// //     const userIdFromStorage = localStorage.getItem('userId');
// //     if (userIdFromStorage && !currentUser) {
// //       setCurrentUser(userIdFromStorage);
// //     } 
// //     if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
// //       navigate('/auth');
// //     }

// //     if(userIdFromStorage && window.location.pathname === '/auth') {
// //       navigate('/');
// //     }   
// //   }, [currentUser, setCurrentUser, navigate]);

// //   let element = useRoutes([
// //     {
// //         path:'/',
// //         element: <Dashboard />
// //     },
// //     {
// //         path: '/profile',
// //         element: <Profile />
// //     },
// //     {
// //         path: '/auth',
// //         element: <Login />
// //     },
// //     {
// //         path: '/signup',
// //         element: <Signup />
// //     }

// //   ])

// //   return element;
// // }

// // export default ProjectRoutes;
// import React, { useEffect } from "react";
// import {useNavigate, useRoutes} from 'react-router-dom'

// // Pages List
// import Dashboard from "./components/dashboard/Dashboard";
// import Profile from "./components/user/Profile";
// import Login from "./components/auth/Login";
// import Signup from "./components/auth/Signup";

// // Auth Context
// import { useAuth } from "./authContext";

// const ProjectRoutes = ()=>{
//     const {currentUser, setCurrentUser} = useAuth();
//     const navigate = useNavigate();

//     useEffect(()=>{
//         const userIdFromStorage = localStorage.getItem("userId");

//         if(userIdFromStorage && !currentUser){
//             setCurrentUser(userIdFromStorage);
//         }

//         if(!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname))
//         {
//             navigate("/auth");
//         }

//         if(userIdFromStorage && window.location.pathname=='/auth'){
//             navigate("/");
//         }
//     }, [currentUser, navigate, setCurrentUser]);

//     let element = useRoutes([
//         {
//             path:"/",
//             element:<Dashboard/>
//         },
//         {
//             path:"/auth",
//             element:<Login/>
//         },
//         {
//             path:"/signup",
//             element:<Signup/>
//         },
//         {
//             path:"/profile",
//             element:<Profile/>
//         }
//     ]);

//     return element;
// }

// export default ProjectRoutes;

import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from "react-router-dom";

// Pages
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (!userIdFromStorage && !["/auth", "/signup"].includes(location.pathname)) {
      navigate("/auth");
    }

    if (userIdFromStorage && location.pathname === "/auth") {
      navigate("/");
    }
  }, [currentUser, location.pathname, navigate, setCurrentUser]);

  const routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />
    },
    {
      path: "/auth",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/profile",
      element: <Profile />
    },
      {
    path: "*",
    element: <h1 style={{color: "white"}}>404 - Page Not Found</h1>
  }
  ]);

  return routes;
};

export default ProjectRoutes;
