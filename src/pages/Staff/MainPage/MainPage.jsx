import { Link, Outlet, useLocation, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStaffBuildingId, getBuildingById, getWorkspaceByBuildingId } from "../../../config/api.staff";
import "./MainPage.scss";

const MainPage = () => {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [buildingName, setBuildingName] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchBuildingData = async () => {
      try {
        const buildingId = await fetchBuildingId();
        const buildingData = await fetchBuildingDataById(buildingId);
        const workspaceData = await fecthWorkspaceByBuildingId(buildingId);

        if (buildingData && buildingData.err === 0){
          setBuildingName(buildingData.data.building_name);
        }

        if (workspaceData && workspaceData.err === 0){
          setWorkspaces(workspaceData.data);
        }
      } catch (error) {
        console.error('Error when getting building data:', error);
      }
    };

    fetchBuildingData();
  }, []);

  const fetchBuildingId = async () => {
    const BuildingIdRes = await getStaffBuildingId();
    const buildingId = BuildingIdRes.data.building_id;
    setBuildingId(buildingId);
    console.log('Building ID: ', buildingId);
    return buildingId;
  };

  const fetchBuildingDataById = async (buildingId) => {
    const buildingData = await getBuildingById(buildingId);
    console.log("BuildingData: ", buildingData);
    return buildingData;
  };

  const fecthWorkspaceByBuildingId = async (buildingId) => {
    const workspaceData = await getWorkspaceByBuildingId(buildingId);
    console.log('Workspace: ', workspaceData.data);
    return workspaceData;
  };

  const handleLogoClick = () => {
    navigate('/staff');
  }

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo-container" onClick={handleLogoClick} style={{cursor: 'pointer'}}>
          <div className="circle">WZ</div>
          <h1>Workzy Staff at { buildingName}</h1> 
        </div>
      </header>
      <div className="tabs">
        <Link to="/staff/buildingroom" className={`tab ${location.pathname === '/staff/buildingroom' ? 'active' : ''}`}>
          Building's Room
        </Link>
        <Link to="/staff/bookings" className={`tab ${location.pathname === '/staff/bookings' ? 'active' : ''}`}>
          Bookings Management 
        </Link>
        <Link to="/staff/wishlist" className={`tab ${location.pathname === '/staff/wishlist' ? 'active' : ''}`}>
          Wishlist
        </Link>
      </div>
      
      <main className="content">
        {location.pathname === '/staff' ? (
          <div className="background-container">
            <h2 className="overlay-text">Working environment improves quality of life</h2>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default MainPage;
