import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ServicesPage from "./pages/Service/ServicesPage.jsx";
import LocationPage from "./pages/Location/LocationPage.jsx";
import AboutPage from "./pages/About/AboutPage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import MainPage from "./pages/Staff/MainPage/MainPage.jsx";
import BookingsPage from "./pages/Staff/Bookings/BookingsPage.jsx";
import BuildingRoomPage from "./pages/Staff/BuildingRoom/BuildingRoomPage.jsx"

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

  //Staff
  {
    path: "staff",
    element: <MainPage />,
    children: [
      {
        path: "buildingroom",
        element: <BuildingRoomPage />,
      },
      {
        path: "bookings",
        element: <BookingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
  // </StrictMode>,
);
