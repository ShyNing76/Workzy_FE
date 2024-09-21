import React from 'react';
import './MainPage.scss'; 
import { Link } from 'react-router-dom';
import HeaderStaff from '../../../components/staff/HeaderStaff';
import '@fortawesome/fontawesome-free/css/all.min.css';

const MainPage = () => {
    return (
        <div className="container">           
            <HeaderStaff />
                <nav className='navbar'>
                    <ul>
                        <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                    </ul>
                </nav>
            
            <main className="main-content">
                <Link to="/Staff/BuildingRoom">
                    <button className="custom-button custom-button-buildingroom">
                        <div className="icon">🔲</div>
                        <h2>Building's Room</h2>
                    </button>
                </Link>
                <Link to="/Staff/BookingsPage">
                    <button className="custom-button custom-button-bookings">
                        <div className="icon">📋</div>
                        <h2>Bookings</h2>
                    </button>
                </Link>
            </main>
        </div>
    );
};

export default MainPage;
