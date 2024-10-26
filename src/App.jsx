import Navbar from "./components/layout/Customer/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Customer/Footer/Footer.jsx";
import { AuthContext } from "./components/context/auth.context.jsx";
import { useContext, useEffect, useState } from "react";
import { getUserAuthen } from "./config/api.js";

function App() {
  const [refresh, setRefresh] = useState(false);

  const { auth, setAuth, appLoading, setAppLoading, setRoleId, roleId } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      // Kiểm tra nếu đã có auth trong localStorage thì không cần fetch lại
      if (!auth.isAuthenticated) {
        setAppLoading(true);
        try {
          const res = await getUserAuthen();
          if (res && res.data && res.err === 0) {
            setAuth({
              isAuthenticated: true,
            });
            setRoleId(res.data.role_id);
          } else {
            setAuth({
              isAuthenticated: false,
            });
            setRoleId(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Xóa localStorage khi có lỗi
          localStorage.removeItem("auth");
          localStorage.removeItem("roleId");
        } finally {
          setAppLoading(false);
        }
      }
    };

    fetchAccount();
  }, [setAuth, setRoleId, setAppLoading, auth.isAuthenticated]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar refresh={refresh} />
        <div className="flex-grow">
          <Outlet context={{ refresh, setRefresh }} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
