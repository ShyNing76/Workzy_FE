import React from 'react';
import BookingRow from './BookingRow';

const BookingTable = ({ bookings, currentPage, handleChangeStatus, setSelectedBooking, setShowDetailModal }) => (
    <div className="table-container">
        <table className="table table-xs table-pin-rows table-pin-cols">
            <thead>
                <tr style={{fontSize: '16px'}}>
                    <th style={{ width: '50px'}}>Index</th>
                    <th style={{ width: '160px'}}>Customer Name</th>
                    <th style={{ width: '160px'}}>Workspace Name</th>
                    <th style={{ width: '150px'}}>Start Time</th>
                    <th style={{ width: '150px'}}>End Time</th>
                    <th style={{ width: '130px'}}>Booking Type</th>
                    <th style={{ width: '140px'}}>Total Price</th>
                    <th style={{ width: '160px'}}>Status</th>
                    <th style={{ width: '250px'}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking, index) => 
                    <BookingRow 
                        key={booking.booking_id}
                        booking={booking}
                        index={index}
                        currentPage={currentPage}
                        handleChangeStatus={handleChangeStatus}
                        setSelectedBooking={setSelectedBooking}
                        setShowDetailModal={setShowDetailModal}
                    />
                )}
            </tbody>
        </table>
    </div>
);

export default BookingTable;