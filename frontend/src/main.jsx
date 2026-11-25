import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import "./App.css";
import App from "./App";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Computer from "./pages/Computer";
import Laboratory from "./pages/Laboratory";
import LaboratoryClaude from "./pages/LaboratoryClaude";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

// REACT ROUTER (DATA MODE)
const router = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  {
    path: "/",
    component: App,
    children: [
      { index: true, component: Home },
      { path: "inventory", Component: Inventory },
      { path: "computers", Component: Computer },
      { path: "laboratories", Component: Laboratory },
      { path: "reports", Component: Reports },
      { path: "labtrack", Component: LaboratoryClaude },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
