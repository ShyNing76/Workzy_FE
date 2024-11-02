import React, { createContext, useState, useEffect } from "react";
import { extractToken, isTokenExpired } from "../../utils/userToken.authen";
import { decryptRoleId, encryptRoleId } from "../../utils/encryptRoleId";

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
    const storedEncryptedRoleId = localStorage.getItem("roleId");
    const decryptedRoleId = storedEncryptedRoleId
      ? decryptRoleId(storedEncryptedRoleId)
      : null;

    return decryptedRoleId;
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
      const encryptedRoleId = encryptRoleId(roleId);

      localStorage.setItem("roleId", encryptedRoleId);
      updateTawkWidget(parseInt(roleId));
    } else {
      localStorage.removeItem("roleId");
    }
  }, [roleId]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const bearerToken = localStorage.getItem("access_token");

      const handleLogout = () => {
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

  // Tawk To chat widget
  const updateTawkWidget = (role) => {
    const intervalId = setInterval(() => {
      if (window.Tawk_API) {
        clearInterval(intervalId); // Dừng kiểm tra khi đã có Tawk_API
        if (role === 4) {
          window.Tawk_API.showWidget(); // Hiển thị widget cho customer
        } else {
          if (typeof window.Tawk_API.hideWidget === "function") {
            window.Tawk_API.hideWidget(); // Ẩn widget cho các role khác
          } else {
            console.error("Tawk_API.hideWidget is not a function");
          }
        }
      }
    }, 1000);

    // Dừng kiểm tra sau 10 giây để tránh vòng lặp vô tận
    setTimeout(() => clearInterval(intervalId), 10000);
  };

  useEffect(() => {
    const bearerToken = localStorage.getItem("access_token");
    const localRoleId = localStorage.getItem("roleId");
    const storedRoleId = localRoleId ? decryptRoleId(localRoleId) : null;

    if (bearerToken && storedRoleId) {
      setAuth({ isAuthenticated: true });
      setRoleId(storedRoleId);

      // Khởi tạo Tawk.to
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      // Kiểm tra role và ẩn/hiện widget ngay khi đăng nhập
      updateTawkWidget(parseInt(storedRoleId));

      const currentPath = window.location.pathname;
      let targetPath;

      // Điều hướng dựa trên roleId bằng window.location
      switch (parseInt(storedRoleId)) {
        case 1:
          targetPath = "/admin"; // Admin trang chủ
          break;
        case 2:
          targetPath = "/manager"; // Manager trang chủ
          break;
        case 3:
          targetPath = "/staff"; // Staff trang chủ
          break;
        case 4:
          targetPath = "/"; // Customer trang chủ
          break;
        default:
          targetPath = "/";
          break;
      }

      // Chỉ điều hướng nếu người dùng không ở đúng trang dựa trên roleId
      if (
        currentPath !== targetPath &&
        !currentPath.startsWith(targetPath) // Kiểm tra xem người dùng đã ở trang con của rolePath chưa
      ) {
        window.location.replace(targetPath);
      }
    }
  }, []);

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
