import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ServicesPage from "./pages/Service/ServicesPage.jsx";
import LocationPage from "./pages/Location/LocationPage.jsx";
import AboutPage from "./pages/About/AboutPage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import AdminDashboardPage from "./pages/Admin/AdminDashboard/AdminDashboardPage.jsx";
import ServicesManagerPage from "./pages/Admin/ServicesManager/ServicesManagerPage.jsx";
import ManagersManagerPage from "./pages/Admin/ManagersManager/ManagersManagerPage.jsx";
import StaffsManagerPage from "./pages/Admin/StaffsManager/StaffsManagerPage.jsx";
import MembersManagerPage from "./pages/Admin/MembersManager/MembersManagerPage.jsx";
import VIPsManagerPage from "./pages/Admin/VIPsManager/VIPsManagerPage.jsx";

const router = createBrowserRouter([
  // Customer
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
        children: [
          {
            path: "service1",
            element: <ServicesPage />,
          },
          {
            path: "service2",
            element: <ServicesPage />,
          },
        ],
      },
      {
        path: "location",
        element: <LocationPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
  // Regiser
  {
    path: "register",
    element: <RegisterPage />,
  },

  // Login
  {
    path: "login",
    element: <LoginPage />,
  },

  // Admin
  {
    path: "admin",
    element: <AdminDashboardPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin" />,
      },
      { path: "servicesmanager", 
        element: <ServicesManagerPage />,
      },
      { path: "managersmanager", 
        element: <ManagersManagerPage />,
      },
      {
        path: "staffsmanager",
        element: <StaffsManagerPage />,
      },
      {
        path: "membersmanager",
        element: <MembersManagerPage />,
      },
      {
        path: "vipsmanager",
        element: <VIPsManagerPage />,
      },
    ],
    // condition: (user) => user.isAdmin, // Add condition to check if user is admin before rendering the routes
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>

  // </StrictMode>,
);
