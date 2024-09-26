import React, { useState } from 'react';
import './BookingsPage.scss'; 
import DetailModal from '../../../components/staff/booking/DetailModal';
import SearchBar from '../../../components/staff/booking/SearchBar'; 
import UtilitiesModal from '../../../components/staff/booking/UtilitiesModal'; 

const BookingsPage = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showUtilitiesModal, setShowUtilitiesModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([
        { id: 1, customerId: 1, price: 200000, additionalPrice: 21000, brokenPrice: 0, totalPrice: 221000, workspaceId: 1, createDate: '12/09/2024', bookingDate: '13/09/2024', status: "Paid", utilitiesChecked: [] },
        { id: 2, customerId: 2, price: 100000, additionalPrice: 0, brokenPrice: 0, totalPrice: 100000, workspaceId: 2, createDate: '6/09/2024', bookingDate: '14/09/2024', status: "Paid", utilitiesChecked: [] },
        { id: 3, customerId: 3, price: 500000, additionalPrice: 0, brokenPrice: 0, totalPrice: 500000, workspaceId: 3, createDate: '09/09/2024', bookingDate: '14/09/2024', status: "Paid", utilitiesChecked: [] },
        { id: 4, customerId: 4, price: 180000, additionalPrice: 0, brokenPrice: 0, totalPrice: 180000, workspaceId: 4, createDate: '10/09/2024', bookingDate: '14/09/2024', status: "Paid", utilitiesChecked: [] },
        { id: 5, customerId: 5, price: 250000, additionalPrice: 0, brokenPrice: 0, totalPrice: 250000, workspaceId: 5, createDate: '14/09/2024', bookingDate: '14/09/2024', status: "Paid", utilitiesChecked: [] },
        { id: 6, customerId: 6, price: 200000, additionalPrice: 0, brokenPrice: 0, totalPrice: 550000, workspaceId: 1, createDate: '14/09/2024', bookingDate: '15/09/2024', status: "Paid", utilitiesChecked: [] },
    ]);

    const handleCheckInOut = (index) => {
        const updatedBookings = [...bookings];
        const booking = updatedBookings[index];

        if (booking.status === "Paid") {
            booking.status = "In-Process";
        } else if (booking.status === "In-Process") {
            booking.status = "Checking Utilities";
        } else if (booking.status === "Checking Utilities") {
            setSelectedBooking(booking);
            setShowUtilitiesModal(true);
            return;
        }

        setBookings(updatedBookings);
    };

    const handleUtilitiesCheck = (utilitiesId) => {
        const updatedBooking = { ...selectedBooking };
        if (updatedBooking.utilitiesChecked.includes(utilitiesId)) {
            updatedBooking.utilitiesChecked = updatedBooking.utilitiesChecked.filter(id => id !== utilitiesId);
        } else {
            updatedBooking.utilitiesChecked.push(utilitiesId);
        }
        setSelectedBooking(updatedBooking);
    };

    const handleDone = () => {
        const updatedBookings = [...bookings];
        const bookingIndex = updatedBookings.findIndex(b => b.id === selectedBooking.id);
        const booking = updatedBookings[bookingIndex];

        
        const printerPrice = 25000000;
        const papershredderPrice = 350000;
        const faxmachinePrice = 4750000;
        const computerPrice = 7500000;
        const monitorPrice = 2500000;

        booking.brokenPrice = 0;
        if (!booking.utilitiesChecked.includes(1)) {
            booking.brokenPrice += printerPrice;
        }
        if (!booking.utilitiesChecked.includes(2)) {
            booking.brokenPrice += papershredderPrice;
        }
        if (!booking.utilitiesChecked.includes(3)) {
            booking.brokenPrice += faxmachinePrice;
        }
        if (!booking.utilitiesChecked.includes(4)) {
            booking.brokenPrice += computerPrice;
        }
        if (!booking.utilitiesChecked.includes(5)) {
            booking.brokenPrice += monitorPrice;
        }

        
        booking.totalPrice = booking.price + booking.additionalPrice + booking.brokenPrice;

        if (booking.utilitiesChecked.length === 5) {
            booking.status = "Complete"; 
        } else {
            booking.status = "Blocked"; 
        }

        setBookings(updatedBookings);
        setShowUtilitiesModal(false);
        setSelectedBooking(null);
    };

    const renderBookingRow = (booking, index) => (
        <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.customerId}</td>
            <td>{booking.price.toLocaleString('vi-VN')}</td>
            <td>{booking.additionalPrice.toLocaleString('vi-VN')}</td>
            <td>{booking.createDate}</td>
            <td>{booking.bookingDate}</td>
            <td>{booking.workspaceId}</td>
            <td>{booking.brokenPrice.toLocaleString('vi-VN')}</td>
            <td>{booking.totalPrice.toLocaleString('vi-VN')}</td>
            <td>{booking.status}</td> 
            <td>
                {booking.status === "Complete" ? (
                    <button onClick={() => { setSelectedBooking(booking); setShowDetailModal(true); }}>
                        Detail
                    </button>
                ) : (
                    <>
                        <button className='check-in-button' onClick={() => handleCheckInOut(index)}>
                            {booking.status === "Blocked" ? 'Report' : (booking.status === "In-Process" ? 'Check Utilities' : (booking.status === "Checking Utilities" ? 'Check Out' : 'Check In'))}
                        </button>
                        <button onClick={() => { setSelectedBooking(booking); setShowDetailModal(true); }}>
                            Detail
                        </button>
                    </>
                )}
            </td>
        </tr>
    );

    return (
        <div className='booking-container'>
            <div className='main-bookings-content'>
                <SearchBar />
                <div className='table-responsive'>
                <table className='booking-table'>
                    <thead>
                        <tr>
                            <th>BookingID</th>
                            <th>CustomerID</th>
                            <th>WorkspacePrice</th>
                            <th>Additional utilities price</th>
                            <th>Create Booking</th>
                            <th>Date Booking</th>
                            <th>WorkspaceID</th>                           
                            <th>Broken_price</th>
                            <th>Total price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(renderBookingRow)}
                    </tbody>
                </table>
                </div>
                {showDetailModal && selectedBooking && (
                    <DetailModal booking={selectedBooking} onClose={() => setShowDetailModal(false)} />
                )}

                {showUtilitiesModal && selectedBooking && (
                    <UtilitiesModal 
                        booking={selectedBooking} 
                        onCheckUtility={handleUtilitiesCheck} 
                        onDone={handleDone} 
                        onClose={() => setShowUtilitiesModal(false)} 
                    />
                )}
            </div>
        </div>
    );
};

export default BookingsPage;
