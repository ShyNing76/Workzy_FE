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
import HCMBuildingsManagerPage from "./pages/Admin/BuildingsManager/HoChiMinh/HCMBuildingManagerPage.jsx";
import HNBuildingsManagerPage from "./pages/Admin/BuildingsManager/HaNoi/HNBuildingManagerPage.jsx";
import HCMWorkspacesManagerPage from "./pages/Admin/WorkspacesManager/HoChiMinh/HCMWorkspacesManagerPage.jsx";
import HNWorkspacesManagerPage from "./pages/Admin/WorkspacesManager/HaNoi/HNWorkspacesManagerPage.jsx";
import AmenitiesManagerPage from "./pages/Admin/AmenitiesManager/AmenitiesManagerPage.jsx";
import WorkspacesTypesManagerPage from "./pages/Admin/WorkspaceTypesManager/WorkspaceTypesManager.jsx";
import PaymentsManagerPage from "./pages/Admin/PaymentsManager/PaymentsManagerPage.jsx";
import BookingsManagerPage from "./pages/Admin/BookingsManager/BookingsManagerPage.jsx";
import ReviewsManagerPage from "./pages/Admin/ReviewsManager/ReviewsManagerPage.jsx";
import TrackAndAnalyzeReport from "./pages/Admin/Track&AnalyzeReport/Track&AnalyzeReport.jsx";


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
      {
        path: "hcmbuildingmanager",
        element: <HCMBuildingsManagerPage/>,
      },
      {
        path: "hnbuildingmanager",
        element: <HNBuildingsManagerPage/>,
      },
      {
        path: "hcmworkspacesmanager",
        element: <HCMWorkspacesManagerPage />,
      },
      {
        path: "hnworkspacesmanager",
        element: <HNWorkspacesManagerPage />,
      },
      {
        path: "amenitiesmanager",
        element: <AmenitiesManagerPage />,
      },
      {
        path: "workspacetypesmanager",
        element: <WorkspacesTypesManagerPage />,
      },
      {
        path: "paymentsmanager",
        element: <PaymentsManagerPage />,
      },
      {
        path: "bookingsmanager",
        element: <BookingsManagerPage />,
      },
      {
        path: "reviewsmanager",
        element: <ReviewsManagerPage />,
      },
      {
        path: "trackandanalyzereport",
        element: <TrackAndAnalyzeReport />,
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
