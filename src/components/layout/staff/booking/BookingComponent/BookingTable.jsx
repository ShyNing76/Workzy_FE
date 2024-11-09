import React from 'react';
import BookingRow from './BookingRow';

const BookingTable = ({ bookings, currentPage, handleChangeStatus, setSelectedBooking, setShowDetailModal }) => (
    <div className="overflow-x-auto">
        <table className="table table-compact w-full">
            <thead>
                <tr className="bg-base-200 text-base-content text-sm">
                    <th className="w-10">Index</th>
                    <th className="w-35">Customer Name</th>
                    <th className="w-30">Workspace Name</th>
                    <th className="w-36">Start Time</th>
                    <th className="w-36">End Time</th>
                    <th className="w-30">Booking Type</th>
                    <th className="w-30">Total Price</th>
                    <th className="w-50">Status</th>
                    <th className="w-60">Actions</th>
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
