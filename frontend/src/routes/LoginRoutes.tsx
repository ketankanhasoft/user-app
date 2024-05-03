import React from "react";
import { lazy } from "react";
import Loadable from "../components/layout/Loadable";
import Layout from "../components/layout/layout";
import AuthLayout from "../components/layout/AuthLayout";
// Custom components
// import MinimalLayout from "layout/MinimalLayout";

// render - login
const AuthLogin = Loadable(lazy(() => import("../pages/authentication")));
const Users = Loadable(lazy(() => import("../pages/users")));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <AuthLogin />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
];

export default LoginRoutes;
