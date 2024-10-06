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
import { createBrowserRouter } from "react-router-dom";
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
        path: "/location/building",
        element: <Building />,
      },
      {
        path: "/location/building/roomdetail",
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
            element: <Profile />,
          },
          {
            path: "membership",
            element: <Profile />,
          },
          {
            path: "support",
            element: <Profile />,
          },
          {
            path: "notification",
            element: <Profile />,
          },
        ],
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
