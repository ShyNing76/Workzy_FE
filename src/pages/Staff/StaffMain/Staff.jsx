import React, { useContext } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../../../components/context/auth.context";
import { getUserAuthen } from "../../../config/api";
import { getStaffBuildingId } from "../../../config/api.staff";
import { FaRegHeart } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { PiCalendarCheckBold } from "react-icons/pi";

const Staff = () => {
  const { auth, setAuth, appLoading, setAppLoading, setRoleId, roleId } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [buildingName, setBuildingName] = useState("");
  const [buildingId, setBuildingId] = useState("");

  useEffect(() => {
    const fetchAccount = async () => {
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
          localStorage.removeItem("auth");
          localStorage.removeItem("roleId");
        } finally {
          setAppLoading(false);
        }
      }
    };

    fetchAccount();
  }, [setAuth, setRoleId, setAppLoading, auth.isAuthenticated]);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const { buildingId, buildingName } = await fetchBuildingId();
        setBuildingId(buildingId);
        setBuildingName(buildingName);
      } catch (error) {
        console.error("Error when getting building data:", error);
      }
    };

    fetchBuildingData();
  }, []);

  const fetchBuildingId = async () => {
    const BuildingIdRes = await getStaffBuildingId();
    const buildingId = BuildingIdRes.data.building_id;
    const buildingName = BuildingIdRes.data.building_name;
    return { buildingId, buildingName };
  };

  const handleLogoutStaff = () => {
    localStorage.clear("access_token", "roleId");
    setAuth({
      isAuthenticated: false,
    });
    setRoleId(null);
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <>
      {appLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="main-container">
          <header className="header" style={{ display: "flex" }}>
            <div
              className="logo-container"
              onClick={() => handleLogoClick()}
              style={{ cursor: "pointer" }}
            >
              <div className="circle">WZ</div>
              <h1>
                Workzy Staff at {buildingName}
              </h1>
              <button
                onClick={() => handleLogoutStaff()}
                className="btn"
                style={{
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
            <label htmlFor="my-drawer-2" className="btn btn-primary lg:hidden">
              Open drawer
            </label>
          </header>

          <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              <main className="content">
                <Outlet context={{ buildingId }} />
              </main>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-50 p-4">
                <li>
                  <Link
                    to="/staff/buildingroom"
                    className={`menu-item ${location.pathname === "/staff/buildingroom" ? "active" : ""}`}
                  >
                    <BsBuildings className="mr-2 text-xl h-[calc(6vh-1rem)]" /> 
                    Building's Workspaces
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staff/bookings"
                    className={`menu-item ${location.pathname === "/staff/bookings" ? "active" : ""}`}
                  >
                    <PiCalendarCheckBold className="mr-2 text-xl h-[calc(6vh-1rem)]" />
                    Bookings Management
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staff/wishlist"
                    className={`menu-item ${location.pathname === "/staff/wishlist" ? "active" : ""}`}
                  >
                    <FaRegHeart className="mr-2 text-xl h-[calc(6vh-1rem)]" /> 
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Staff;
