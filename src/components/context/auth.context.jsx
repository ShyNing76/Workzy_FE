import React, { createContext, useState, useEffect } from "react";
import { extractToken, isTokenExpired } from "../../utils/userToken.authen";

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    try {
      return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false };
    } catch {
      return { isAuthenticated: false };
    }
  });

  const [roleId, setRoleId] = useState(() => {
    return localStorage.getItem("roleId") || null;
  });

  const [appLoading, setAppLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch (error) {
      console.error("Error saving auth to localStorage:", error);
    }
  }, [auth]);

  useEffect(() => {
    if (roleId) {
      localStorage.setItem("roleId", roleId);
    } else {
      localStorage.removeItem("roleId");
    }
  }, [roleId]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const bearerToken = localStorage.getItem("access_token");

      const handleLogout = () => {
        // Sửa lại cách xóa localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("roleId");
        localStorage.removeItem("auth");

        setAuth({
          isAuthenticated: false,
        });
        setRoleId(null);

        if (window.location.pathname !== "/") {
          window.location.replace("/");
        } else {
          location.reload();
        }
      };

      if (!bearerToken) {
        return;
      }

      const token = extractToken(bearerToken);

      if (isTokenExpired(token)) {
        handleLogout();
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(interval);
  }, []); // Thêm dependencies

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        roleId,
        setRoleId,
        appLoading,
        setAppLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
