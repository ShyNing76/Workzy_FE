import App from "../App.jsx";

import HomePage from "../pages/Customer/Home/HomePage.jsx";
import RegisterPage from "../pages/Customer/Register/RegisterPage.jsx";
import LoginPage from "../pages/Customer/Login/LoginPage.jsx";
import ServicesPage from "../pages/Customer/Service/ServicesPage.jsx";
import LocationPage from "../pages/Customer/Location/LocationPage.jsx";
import AboutPage from "../pages/Customer/About/AboutPage.jsx";
import ContactPage from "../pages/Customer/Contact/ContactPage.jsx";
import Profile from "../pages/Customer/Profile/Profile.jsx";
import User from "../pages/Customer/User/User.jsx";
import RoomDetail from "../pages/Customer/Room detail/RoomDetail.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ScrollToTop from "../components/context/scrollToTop.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Building from "../pages/Customer/Building/Building.jsx";
import GoogleCallback from "../pages/Customer/GoogleCallBack/GoogleCallback.jsx";
import SinglePOD from "../pages/Customer/SinglePOD/SinglePOD.jsx";
import DoublePOD from "../pages/Customer/DoublePOD/DoublePOD.jsx";
import QuadPOD from "../pages/Customer/QuadPOD/QuadPOD.jsx";
import MeetingRoom from "../pages/Customer/MeetingRoom/MeetingRoom.jsx";
import WorkingRoom from "../pages/Customer/WorkingRoom/WorkingRoom.jsx";
import EventSpace from "../pages/Customer/EventSpace/EventSpace.jsx";
import MemberShipPage from "../pages/Customer/MemberShip/MemberShipPage.jsx";

import AdminDashboardPage from "../pages/Admin/AdminDashboard/AdminDashboardPage.jsx";
import ServicesManagerPage from "../pages/Admin/ServicesManager/ServicesManagerPage.jsx";
import ManagersManagerPage from "../pages/Admin/ManagersManager/ManagersManagerPage.jsx";
import StaffsManagerPage from "../pages/Admin/StaffsManager/StaffsManagerPage.jsx";
import MembersManagerPage from "../pages/Admin/MembersManager/MembersManagerPage.jsx";
import VIPsManagerPage from "../pages/Admin/VIPsManager/VIPsManagerPage.jsx";
import HCMBuildingsManagerPage from "../pages/Admin/BuildingsManager/HoChiMinh/HCMBuildingManagerPage.jsx";
import HNBuildingsManagerPage from "../pages/Admin/BuildingsManager/HaNoi/HNBuildingManagerPage.jsx";
import HCMWorkspacesManagerPage from "../pages/Admin/WorkspacesManager/HoChiMinh/HCMWorkspacesManagerPage.jsx";
import HNWorkspacesManagerPage from "../pages/Admin/WorkspacesManager/HaNoi/HNWorkspacesManagerPage.jsx";
import AmenitiesManagerPage from "../pages/Admin/AmenitiesManager/AmenitiesManagerPage.jsx";
import WorkspacesTypesManagerPage from "../pages/Admin/WorkspaceTypesManager/WorkspaceTypesManager.jsx";
import PaymentsManagerPage from "../pages/Admin/PaymentsManager/PaymentsManagerPage.jsx";
import BookingsManagerPage from "../pages/Admin/BookingsManager/BookingsManagerPage.jsx";
import ReviewsManagerPage from "../pages/Admin/ReviewsManager/ReviewsManagerPage.jsx";
import TrackAndAnalyzeReport from "../pages/Admin/Track&AnalyzeReport/Track&AnalyzeReport.jsx";

import MainPage from "../pages/Staff/MainPage/MainPage.jsx";
import BookingManagement from "../pages/Staff/Bookings/BookingManagement.jsx";
import BuildingRoomPage from "../pages/Staff/BuildingRoom/BuildingRoomPage.jsx";
import Wishlist from "../pages/Staff/Wishlist/Wishlist.jsx"
import MyBooking from "../pages/Customer/MyBooking/MyBooking.jsx";
import SupportCenter from "../pages/Customer/SupportCenter/SupportCenter.jsx";
import NotificationPage from "../pages/Customer/Notification/NotificationPage.jsx";
import PaymentPage from "../pages/Customer/Payment/Payment.jsx";

// Role id store in local Storage after login and register

export const router = createBrowserRouter([
  // Customer
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      //path of services
      {
        path: "services/single-pod",
        element: <SinglePOD />,
      },

      {
        path: "services/double-pod",
        element: <DoublePOD />,
      },

      {
        path: "services/quad-pod",
        element: <QuadPOD />,
      },

      {
        path: "services/meeting-room",
        element: <MeetingRoom />,
      },

      {
        path: "services/working-room",
        element: <WorkingRoom />,
      },

      {
        path: "services/event-space",
        element: <EventSpace />,
      },

      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "location",
        element: <LocationPage />,
      },
      {
        path: "/location/:buildingId",
        element: <Building />,
      },
      {
        path: "/location/building/:roomid",
        element: <RoomDetail />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "/booking/payment",
        element: (
          <>
            <PrivateRoute requiredRoleID="4">
              <PaymentPage />
            </PrivateRoute>
          </>
        ),
      },
      {
        path: "user",
        element: (
          <>
            <PrivateRoute requiredRoleID="4">
              <User />
            </PrivateRoute>
          </>
        ),
        children: [
          {
            path: "account",
            element: <Profile />,
          },
          {
            path: "booking",
            element: <MyBooking />,
          },
          {
            path: "membership",
            element: <MemberShipPage />,
          },
          {
            path: "support",
            element: <SupportCenter />,
          },
          {
            path: "notification",
            element: <NotificationPage />,
          },
        ],
      },
    ],
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
      { path: "servicesmanager", element: <ServicesManagerPage /> },
      { path: "managersmanager", element: <ManagersManagerPage /> },
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
        element: <HCMBuildingsManagerPage />,
      },
      {
        path: "hnbuildingmanager",
        element: <HNBuildingsManagerPage />,
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

  //Staff
  {
    path: "staff",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/staff" />,
      },
      {
        path: "buildingroom",
        element: <BuildingRoomPage />,
      },
      {
        path: "bookings",
        element: <BookingManagement />,
      },
      {
        path: "wishlist",
        element: <Wishlist/>,
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

  // Call back google
  {
    path: "api/v1/auth/google/callback", //5173
    element: <GoogleCallback />,
  },

  {
    path: "*",
    element: <LoginPage />,
  },
]);
