import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStaffBuildingId } from "../../../config/api.staff";
import "./MainPage.scss";

const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buildingName, setBuildingName] = useState("");
  const [buildingId, setBuildingId] = useState("");

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
    console.log("Building ID: ", buildingId);
    console.log("Building Name: ", buildingName);
    return { buildingId, buildingName }; // Trả về cả buildingId và buildingName
  };

  const handleLogoClick = () => {
    navigate("/staff");
  };

  return (
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
          Building's Room
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
        {location.pathname === "/staff" ? (
          <div className="background-container">
            <h2 className="overlay-text">
              Working environment improves quality of life
            </h2>
          </div>
        ) : (
          <Outlet context={{ buildingId }} />
        )}
      </main>
    </div>
  );
};

export default MainPage;
