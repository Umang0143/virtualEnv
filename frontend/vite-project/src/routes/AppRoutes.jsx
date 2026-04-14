import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Login from "../login";
import SignUp from "../signUp";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default AppRoutes;