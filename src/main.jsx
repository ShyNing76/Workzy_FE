import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },


        ],
    },
    {
        path: "register",
        element: <RegisterPage />,
    },
    {
        path: "login",
        element: <LoginPage />,
    },
]);


createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
);
