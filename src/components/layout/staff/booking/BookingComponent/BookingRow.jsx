import React from 'react';

const BookingRow = ({ booking, index, currentPage, itemsPerPage, handleChangeStatus, setSelectedBooking, setShowDetailModal }) => {
    const statusClass = (() => {
        switch (booking.status) {
            case "usage":
                return "badge-accent";
            case "paid":
                return "badge-warning";
            case "cancelled":
                return "badge-error";
            case "check-amenities":
                return "badge-primary";
            case "completed":
                return "badge-info";
            default:
                return "badge-neutral";
        }
    })();

    return (
        <tr style={{ fontSize: '13px' }} className="hover" key={booking.booking_id}>
            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>{booking.customer_name}</td>
            <td>{booking.workspace_name}</td>
            <td>{booking.start_time_date}</td>
            <td>{booking.end_time_date}</td>
            <td>{booking.booking_type}</td>
            <td>{booking.total_price}</td>
            <td>
                <span className={`badge text-xs mx-1 my-1 rounded-lg shadow-md ${statusClass}`}>
                    {booking.status}
                </span>
            </td>
            <td>
                <div className="buttons" style={{ display: 'flex', gap: '30px' }}>
                    <button
                        className="btn btn-sm"
                        onClick={() => { 
                            setSelectedBooking(booking); 
                            setShowDetailModal(true); 
                        }}
                    >
                        Detail
                    </button>
                    {booking.status === "check-in" && (
                        <button 
                            className="btn btn-sm btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "usage")}>
                            Confirm Check-In
                        </button>
                    )}
                    {booking.status === "paid" && (
                        <button 
                            className="btn btn-sm btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "usage")}>
                            Check-In
                        </button>
                    )}
                    {booking.status === "check-out" && (
                        <button 
                            className="btn btn-sm btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "check-amenities")}>
                            Check Amenities 
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default BookingRow;