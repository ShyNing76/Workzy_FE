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
import ManagerPage from "../pages/Manager/ManagerPage.jsx";
import ManagerAssign from "../pages/Manager/ManagerAssign/ManagerAssign.jsx";
import ManagerDashBoard from "../pages/Manager/ManagerDashboard/ManagerDashBoard.jsx";
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
import ManagersManagerPage from "../pages/Admin/ManagersManager/ManagersManagerPage.jsx";
import StaffsManagerPage from "../pages/Admin/StaffsManager/StaffsManagerPage.jsx";
import CustomersManagerPage from "../pages/Admin/CustomersManager/CustomersManagerPage.jsx";
import BuildingsManagerPage from "../pages/Admin/BuildingsManager/BuildingManagerPage";
import WorkspacesManagerPage from "../pages/Admin/WorkspacesManager/WorkspacesManagerPage";
import AmenitiesManagerPage from "../pages/Admin/AmenitiesManager/AmenitiesManagerPage.jsx";
import WorkspacesTypesManagerPage from "../pages/Admin/WorkspaceTypesManager/WorkspaceTypesManager.jsx";
import PaymentsManagerPage from "../pages/Admin/PaymentsManager/PaymentsManagerPage.jsx";
import BookingsManagerPage from "../pages/Admin/BookingsManager/BookingsManagerPage.jsx";
import ReviewsManagerPage from "../pages/Admin/ReviewsManager/ReviewsManagerPage.jsx";
import VouchersManagerPage from "../pages/Admin/VouchersManager/VouchersManagerPage";

import MainPage from "../pages/Staff/MainPage/MainPage.jsx";
import BookingManagement from "../pages/Staff/Bookings/BookingManagement.jsx";
import BuildingWorkspaces from "../pages/Staff/BuildingRoom/BuildingWorkspaces.jsx";
import PaymentPage from "../pages/Customer/Payment/Payment.jsx";
import Wishlist from "../pages/Staff/Wishlist/Wishlist.jsx";
import MyBooking from "../pages/Customer/MyBooking/MyBooking.jsx";
import SupportCenter from "../pages/Customer/SupportCenter/SupportCenter.jsx";
import NotificationPage from "../pages/Customer/Notification/NotificationPage.jsx";

import ManageStaff from "../pages/Manager/ManageStaff/ManageStaff.jsx";
import ManageReview from "../pages/Manager/ManageReview/ManageReview.jsx";
import BookingDetail from "../pages/Customer/BookingDetail/BookingDetail.jsx";
import BookingAmenities from "../pages/Customer/BookingAmenities/BookingAmenities.jsx";
import Admin from "../pages/Admin/AdminMain/Admin.jsx";
import Staff from "../pages/Staff/StaffMain/Staff.jsx";

import AccessDenied from "../pages/Customer/AccessDenied/AccessDenied.jsx";
import NotFound from "../pages/Customer/NotFound/NotFound.jsx";

import AnimatedRoutes from "../Routers/AnimatedRoute.jsx";

// Role id store in local Storage after login and register

export const router = createBrowserRouter([
  // Customer
  {
    path: "/",
    element: <AnimatedRoutes />,

    children: [
      {
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
            path: "restricted",
            element: <AccessDenied />,
          },
          {
            path: "*",
            element: <NotFound />,
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
                path: "booking/:bookingId",
                element: <BookingDetail />,
              },
              {
                path: "booking/amenities/:bookingId",
                element: <BookingAmenities />,
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
    ],
  },

  // Admin
  {
    path: "admin",
    element: (
      <>
        <PrivateRoute requiredRoleID="1">
          <Admin />
        </PrivateRoute>
      </>
    ),

    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: "managersmanager",
        element: <ManagersManagerPage />,
      },
      {
        path: "staffsmanager",
        element: <StaffsManagerPage />,
      },
      {
        path: "customersmanager",
        element: <CustomersManagerPage />,
      },
      {
        path: "buildingmanager",
        element: <BuildingsManagerPage />,
      },
      {
        path: "workspacesmanager",
        element: <WorkspacesManagerPage />,
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
        path: "vouchersmanager",
        element: <VouchersManagerPage />,
      },
    ],
    // condition: (user) => user.isAdmin, // Add condition to check if user is admin before rendering the routes
  },

  //Staff
  {
    path: "staff",
    element: (
      <>
        <PrivateRoute requiredRoleID="3">
          <Staff />
        </PrivateRoute>
      </>
    ),

    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "buildingroom",
        element: <BuildingWorkspaces />,
      },
      {
        path: "bookings",
        element: <BookingManagement />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
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

  // Manager
  {
    path: "manager",
    element: (
      <>
        <PrivateRoute requiredRoleID="2">
          <ManagerPage />
        </PrivateRoute>
      </>
    ),

    children: [
      {
        path: "",
        element: <ManagerDashBoard />,
      },

      {
        path: "manager-assign",
        element: <ManagerAssign />,
      },

      {
        path: "manager-manage-staff",
        element: <ManageStaff />,
      },
      {
        path: "manager-manage-review",
        element: <ManageReview />,
      },
    ],
  },
]);
