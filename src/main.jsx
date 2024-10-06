// import ScrollToTop from "./components/context/scrollToTop.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";
import { router } from "./Routers/Router.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>

  // </StrictMode>,
);
