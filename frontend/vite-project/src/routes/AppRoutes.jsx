import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Login from "../Login";
import SignUp from "../signUp";
import Verify from "../verify/verify";
import Dashboard from "../dashboard";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "verify",
        element:<Verify />
      },
      {
        path: "dashboard",
        element:<Dashboard />
      },
    ],
  },
]);

export default AppRoutes;