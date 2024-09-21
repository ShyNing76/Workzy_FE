import React, { useState } from 'react';
import './Bookings.scss'; 
import { Link } from 'react-router-dom';
import HeaderStaff from '../../../components/staff/HeaderStaff';

const BookingsPage = () => {
    return(
        <div className='booking-container'>
            <HeaderStaff/>
                <nav className='navbar'>
                    <ul>
                        <li><a href="/"><i className="fas fa-home"></i> Home</a></li>
                    </ul>
                </nav>
            <div className='sidebar'>
                <h2>Building's Room</h2>
                <h3>Bookngs</h3>
            </div>
            <div className='main-bookings-content'>
                <div className='search-bar'>
                    <input type="text" placeholder='Search' />
                </div>
                <table className='booking-table'>
                    <thead>
                        <tr>
                            <th>BookingID</th>
                            <th>UserID</th>
                            <th>Deposit payment</th>
                            <th>Deposit price</th>
                            <th>Checkout payment</th>
                            <th>Total price</th>
                            <th>RoomID</th>
                            <th>Booking Date</th>
                            <th>CheckIn Date</th>
                            <th>CheckOut Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>TRUE</td>
                            <td>200.000</td>
                            <td>TRUE</td>
                            <td>500.000</td>
                            <td>1</td>
                            <td>05/09/2024</td>
                            <td>07/09/2024</td>
                            <td>07/09/2024</td>
                            <td>Completed</td>
                        </tr>
                    </tbody>
                </table>
                <div className='buttons'>
                    <button>CheckIn</button>
                    <button>Detail</button>
                </div>
            </div>
        </div>

    );
}
export default BookingsPage;