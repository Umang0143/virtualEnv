import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./config/config.js";

function App() {
  return <RouterProvider router={AppRoutes} />;
}

export default App;