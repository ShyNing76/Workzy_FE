import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./MainPage.scss";

const MainPage = () => {
  const location = useLocation(); 
  const [staffBuilding, setStaffBuilding] = useState("");

  useEffect(() => {
    const fetchBuilding = async () => {
      const respone = await fetch("/api/getStaffBuilding");
      const data = await respone.json();
      setStaffBuilding(data.building);
    };
    fetchBuilding();
  })

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo-container">
          <div className="circle">WZ</div>
          <h1>Workzy Staff at {staffBuilding}</h1>
        </div>
      </header>
      <div className="tabs">
        <Link to="/staff" className={`tab ${location.pathname === '/staff' ? 'active' : ''}`}>
           Home
        </Link>
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
