import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "../../../components/context/auth.context";
import { getUserAuthen } from "../../../config/api";
import { getStaffBuildingId } from "../../../config/api.staff";

const Staff = () => {
  const { auth, setAuth, appLoading, setAppLoading, setRoleId, roleId } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [buildingName, setBuildingName] = useState("");
  const [buildingId, setBuildingId] = useState("");

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
    const buildingName = BuildingIdRes.data.building_name; // Lấy buildingName
    return { buildingId, buildingName }; // Trả về cả buildingId và buildingName
  };

  const handleLogoClick = () => {
    navigate("/staff");
  };

  return (
    <>
      {appLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="main-container">
          <header className="header">
            <div
              className="logo-container"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            >
              <div className="circle">WZ</div>
              <h1>Workzy Staff at {buildingName}</h1>
            </div>
          </header>
          <div className="tabs">
            <Link
              to="/staff/buildingroom"
              className={`tab ${
                location.pathname === "/staff/buildingroom" ? "active" : ""
              }`}
            >
              Building's Workspaces
            </Link>
            <Link
              to="/staff/bookings"
              className={`tab ${
                location.pathname === "/staff/bookings" ? "active" : ""
              }`}
            >
              Bookings Management
            </Link>
            <Link
              to="/staff/wishlist"
              className={`tab ${
                location.pathname === "/staff/wishlist" ? "active" : ""
              }`}
            >
              Wishlist
            </Link>
          </div>

          <main className="content">
            <Outlet context={{ buildingId }} />
          </main>
        </div>
      )}
    </>
  );
};

export default Staff;
