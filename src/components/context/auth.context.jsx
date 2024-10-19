import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Khởi tạo từ localStorage nếu có
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false };
  });

  const [roleId, setRoleId] = useState(() => {
    // Khởi tạo roleId từ localStorage nếu có
    return localStorage.getItem("roleId") || null;
  });

  const [appLoading, setAppLoading] = useState(false);

  // Lưu auth state vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // Lưu roleId vào localStorage khi thay đổi
  useEffect(() => {
    if (roleId) {
      localStorage.setItem("roleId", roleId);
    } else {
      localStorage.removeItem("roleId");
    }
  }, [roleId]);

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
