

import React, { useEffect } from "react";
import { useNavigate, useRoutes, useLocation } from "react-router-dom";

// Pages
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// // // Auth Context
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

    if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
      navigate("/auth");
    }

    if (userIdFromStorage && window.location.pathname === "/auth") {
      navigate("/");
    }
  }, [currentUser, location.pathname, navigate, setCurrentUser]);
  //reload the page when user logs in or logs out to update the routes accordingly

   let element = useRoutes([
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

  return element;
};

export default ProjectRoutes;
