import App from "../App.jsx";

import HomePage from "../pages/Home/HomePage.jsx";
import RegisterPage from "../pages/Register/RegisterPage.jsx";
import LoginPage from "../pages/Login/LoginPage.jsx";
import ServicesPage from "../pages/Service/ServicesPage.jsx";
import LocationPage from "../pages/Location/LocationPage.jsx";
import AboutPage from "../pages/About/AboutPage.jsx";
import ContactPage from "../pages/Contact/ContactPage.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import User from "../pages/User/User.jsx";
import RoomDetail from "../pages/Room detail/RoomDetail.jsx";
import { createBrowserRouter } from "react-router-dom";
import ScrollToTop from "../components/context/scrollToTop.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Building from "../pages/Building/Building.jsx";
import GoogleCallback from "../pages/GoogleCallBack/GoogleCallback.jsx";

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
        path: "building",
        element: <Building />,
      },
      {
        path: "roomdetail",
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
