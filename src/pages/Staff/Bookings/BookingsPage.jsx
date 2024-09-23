import { React, useState } from 'react';
import './BookingsPage.scss'; 

const BookingsPage = () => {
    const [status, setStatus] = useState("Completed");
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [bookings, setBookings] = useState([
        { id: 1, customerId: 1, price: 200000, additionalPrice: 21000, brokenPrice: 0, totalPrice: 221000, workspaceId: 1, createDate: '12/09/2024', bookingDate: '13/09/2024', status: "Available" },
        { id: 2, customerId: 2, price: 100000, additionalPrice: 0, brokenPrice: 0, totalPrice: 100000, workspaceId: 2, createDate: '6/09/2024', bookingDate: '14/09/2024', status: "Available" },
        { id: 3, customerId: 3, price: 500000, additionalPrice: 0, brokenPrice: 0, totalPrice: 500000, workspaceId: 3, createDate: '09/09/2024', bookingDate: '14/09/2024', status: "Available" },
        { id: 4, customerId: 4, price: 180000, additionalPrice: 0, brokenPrice: 0, totalPrice: 180000, workspaceId: 4, createDate: '10/09/2024', bookingDate: '14/09/2024', status: "Available" },
        { id: 5, customerId: 5, price: 250000, additionalPrice: 0, brokenPrice: 0, totalPrice: 250000, workspaceId: 5, createDate: '14/09/2024', bookingDate: '14/09/2024', status: "Available" },
        { id: 6, customerId: 6, price: 200000, additionalPrice: 0, brokenPrice: 350000, totalPrice: 550000, workspaceId: 1, createDate: '14/09/2024', bookingDate: '15/09/2024', status: "Available" },
    ]);

    const handleCheckInOut = (index) => {
        const updatedBookings = [...bookings];
        const booking = updatedBookings[index];
        if (booking.status === "Available") {
            booking.status = "Using";
        } else if (booking.status === "Using") {
            booking.status = "Checking Utilities";
        } else {
            booking.status = "Available";
        }
        setBookings(updatedBookings);
    };

    const toggleDetailModal = () => {
        setShowDetailModal(!showDetailModal);
    };

    const renderBookingRow = (booking, index) => (
        <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.customerId}</td>
            <td>{booking.price}</td>
            <td>{booking.additionalPrice}</td>
            <td>{booking.brokenPrice}</td>
            <td>{booking.totalPrice}</td>
            <td>{booking.workspaceId}</td>
            <td>{booking.createDate}</td>
            <td>{booking.bookingDate}</td>
            <td>{booking.status}</td> 
            <td>
                <button className='check-in-button' onClick={() => handleCheckInOut(index)}>
                    {booking.status === "Available" ? 'Check In' : booking.status === "Using" ? 'Check Utilities' : 'Check Out'}
                </button>
                <div className='buttons'>
                    <button onClick={toggleDetailModal}>Detail</button>
                </div>
                {showDetailModal && (
                    <dialog className='modal' open>
                        <div className='modal-box'>
                            <h3 className='font-bold text-lg'>Detail</h3>
                            <div className='modal-action'>
                                <button onClick={toggleDetailModal}>Close</button>
                            </div>
                        </div>
                    </dialog>
                )}
            </td>
        </tr>
    );

    return (
        <div className='booking-container'>
            <div className='main-bookings-content'>
                <div className='search-bar'>
                    <input type="text" placeholder='Search' />
                </div>
                
                <table className='booking-table'>
                    <thead>
                        <tr>
                            <th>BookingID</th>
                            <th>CustomerID</th>
                            <th>WorkspacePrice</th>
                            <th>Additional utilities price</th>
                            <th>Broken_price</th>
                            <th>Total price</th>
                            <th>WorkspaceID</th>
                            <th>Create Booking</th>
                            <th>Date Booking</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(renderBookingRow)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingsPage;
