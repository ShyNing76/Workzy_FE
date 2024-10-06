import { Link, Outlet, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import "./MainPage.scss";

const MainPage = () => {
  const location = useLocation(); 

  return (
    <div className="main-container">
      <header className="header">
        <div className="logo-container">
          <div className="circle">WZ</div>
          <h1>Workzy Staff at Location</h1>
        </div>
      </header>
      <div className="tabs">
        <Link to="/staff" className={`tab ${location.pathname === '/staff' ? 'active' : ''}`}>
          <IoHomeOutline size={20} /> Home
        </Link>
        <Link to="/staff/buildingroom" className={`tab ${location.pathname === '/staff/buildingroom' ? 'active' : ''}`}>
          Building's Room
        </Link>
        <Link to="/staff/bookings" className={`tab ${location.pathname === '/staff/bookings' ? 'active' : ''}`}>
          Bookings
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
