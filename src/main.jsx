import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home/HomePage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ServicesPage from "./pages/Service/ServicesPage.jsx";
import LocationPage from "./pages/Location/LocationPage.jsx";
import AboutPage from "./pages/About/AboutPage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: "services",
                element: <ServicesPage/>,
                children: [
                    {
                        path: "service1",
                        element: <ServicesPage/>
                    },
                    {
                        path: "service2",
                        element: <ServicesPage/>
                    }
                ]
            },
            {
                path: "location",
                element: <LocationPage/>,
            },
            {
                path: "about",
                element: <AboutPage/>,
            },
            {
                path: "contact",
                element: <ContactPage/>,
            },

        ],
    },
    {
        path: "register",
        element: <RegisterPage/>,
    },
    {
        path: "login",
        element: <LoginPage/>,
    },
]);


createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <RouterProvider router={router}/>
    // </StrictMode>,
);
