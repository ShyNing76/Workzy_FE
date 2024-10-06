import Navbar from "./components/layout/Customer/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Customer/Footer/Footer.jsx";
import { AuthContext } from "./components/context/auth.context.jsx";
import { useContext, useEffect, useState } from "react";
import { getUserAuthen } from "./config/api.js";

function App() {
  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);

      const res = await getUserAuthen();
      if (res && res.data && res.err === 0) {
        setAuth({
          isAuthenticated: true,
        });
      }

      setAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <>
      {appLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar refresh={refresh} />
          <div className="flex-grow">
            <Outlet context={{ refresh, setRefresh }} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
