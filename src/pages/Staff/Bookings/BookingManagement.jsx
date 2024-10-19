import React, { useState, useEffect } from 'react';
import './BookingManagement.scss';
import Swal from "sweetalert2";
import DetailModal from '../../../components/layout/staff/booking/Modal/DetailModal';
import CheckAmenitiesModal from '../../../components/layout/staff/booking/Modal/CheckAmenitiesModal.jsx';
import { getBooking, postBookingStatus, sendBrokenAmenities } from '../../../config/api.staff.js';
import { useOutletContext } from 'react-router-dom';

const BookingManagement = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const { buildingId } = useOutletContext();

    const formatCurrency = (amount) => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', { 
            year: 'numeric', month: '2-digit', day: '2-digit', 
            hour: '2-digit', minute: '2-digit', hour12: false 
        }).replace(',', ''); 
    };

    const bookingTypeMap = {
        "4d0018e8-f983-4e3e-a8aa-50706a5130ce": "Hourly",
        "69b28f52-263e-4e53-821e-d7bada7c8cdd": "Daily",
        "401ef5d7-62b8-49cb-95e8-fc47a0a9c965": "Monthly"
    };

    const fetchBookingData = async () => {
        try {
            if (!buildingId) throw new Error("Building ID is not valid.");
            const response = await getBooking(buildingId);
            if (!response?.data?.rows) throw new Error("Unexpected data format.");

            const bookingsData = response.data.rows.map(booking  => {
                // Extracting amenities data from BookingAmenities
                const bookingAmenities = booking.Amenities?.map(amenity => {
                const bookingAmenityDetails = amenity.BookingAmenities || {};
                
                return {
                    amenity_name: amenity.amenity_name,
                    rent_price: formatCurrency(bookingAmenityDetails.price || 0),
                    quantity: bookingAmenityDetails.quantity || 0,
                    total_price: formatCurrency(bookingAmenityDetails.total_price || 0)
                };
            });             
                                                       
                return {
                    booking_id: booking.booking_id,
                    workspace_id: booking.workspace_id,
                    workspace_name: booking.Workspace?.workspace_name || "Unknown",
                    start_time_date: formatDate(booking.start_time_date),
                    end_time_date: formatDate(booking.end_time_date),
                    workspace_price: formatCurrency(booking.workspace_price),
                    total_price: formatCurrency(booking.total_price),
                    total_workspace_price: formatCurrency(booking.total_workspace_price),
                    status: booking.BookingStatuses?.at(-1)?.status || "N/A",
                    booking_type: bookingTypeMap[booking.booking_type_id] || "Unknown",
                    total_amenities_price: formatCurrency(booking.total_amenities_price || 0),
                    total_broken_price: formatCurrency(booking.total_broken_price || 0),
                    customer_name: booking.Customer?.User?.name || "Unknown",
                    amenities: bookingAmenities 
                };
            });
            setBookings(bookingsData);
            setFilteredBookings(bookingsData);
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    };

    useEffect(() => {
        if (buildingId) fetchBookingData();
    }, [buildingId]);

    const handleSendBrokenAmenities = async (bookingId, selectedAmenities) => {
        try {
            const data = {
                amenity_name: selectedAmenities,
                booking_id: bookingId,
            };
            const response = await sendBrokenAmenities(data);
            if (response?.data?.err) throw new Error("Unable to report broken amenities.");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Broken amenities reported successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            setFilteredBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.booking_id === bookingId ? { ...booking, status: "damage-payment" } : booking
                )
            );

            setSelectedBooking(bookings.find(b => b.booking_id === bookingId));
            setShowAmenitiesModal(true);
        } catch (error) {
            console.error("Error reporting broken amenities:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to report broken amenities.",
                showConfirmButton: true,
            });
        }
    };

    const handleChangeStatus = async (booking_id, status) => {
        try {
            const response = await postBookingStatus(booking_id, status);
            if (response?.data?.err) throw new Error("Unknown error.");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Status updated successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            setFilteredBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.booking_id === booking_id ? { ...booking, status } : booking
                )
            );

            if (status === "check-amenities") {
                setSelectedBooking(bookings.find(b => b.booking_id === booking_id));
                setShowAmenitiesModal(true);
            }
        } catch (error) {
            console.error("Error while updating status:", error);
        }
    };

    const handleAmenitiesDone = () => {
        if (selectedBooking) {
            handleChangeStatus(selectedBooking.booking_id, "completed");
            setShowAmenitiesModal(false);
        }
    };

    const renderBookingRow = (booking, index) => (
        <tr key={booking.booking_id}>
            <td style={{fontSize: '13px'}}>{index + 1}</td>
            <td style={{fontSize: '13px'}}>{booking.customer_name}</td>
            <td style={{fontSize: '13px'}}>{booking.workspace_name}</td>
            <td style={{fontSize: '13px'}}>{booking.start_time_date}</td>
            <td style={{fontSize: '13px'}}>{booking.end_time_date}</td>
            <td style={{fontSize: '13px'}}>{booking.booking_type}</td>
            <td style={{fontSize: '13px'}}>{booking.total_price}</td>
            <td style={{fontSize: '13px'}}>{booking.status}</td>
            <td style={{fontSize: '13px'}}>
                <div className="buttons" style={{ display: 'flex', gap: '30px' }}>
                    <button
                        className="btn btn-outline"                       
                        onClick={() => { setSelectedBooking(booking); setShowDetailModal(true); }}
                    >
                        Detail
                    </button>
                    {booking.status === "check-in" && (
                        <button 
                            className="btn btn-outline btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "in-process")}>
                                Confirm Check-In 
                        </button>
                    )}
                    {booking.status === "check-out" && (
                        <button 
                            className="btn btn-outline btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "check-amenities")}>
                                Check Amenities 
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className="booking-container">
            <div className="main-bookings-content">
                <div className="overflow-x-auto">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th style={{ width: '80px', fontSize: '15px'}}>Index</th>
                                <th style={{ width: '160px', fontSize: '15px'}}>Customer Name</th>
                                <th style={{ width: '170px', fontSize: '15px'}}>Workspace Name</th>
                                <th style={{ width: '160px', fontSize: '15px'}}>Start Time</th>
                                <th style={{ width: '160px', fontSize: '15px'}}>End Time</th>
                                <th style={{ width: '130px', fontSize: '15px'}}>Booking Type</th>
                                <th style={{ width: '140px', fontSize: '15px'}}>Total Price</th>
                                <th style={{ width: '170px', fontSize: '15px'}}>Status</th>
                                <th style={{ width: '270px', fontSize: '15px'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map(renderBookingRow)
                            ) : (
                                <tr>
                                    <td colSpan="9">No bookings available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {showDetailModal && selectedBooking && (
                    <DetailModal booking={selectedBooking} onClose={() => setShowDetailModal(false)} />
                )}
                {showAmenitiesModal && selectedBooking && (
                    <CheckAmenitiesModal
                        bookingId={selectedBooking.booking_id}
                        onClose={() => setShowAmenitiesModal(false)}
                        handleChangeStatus={handleChangeStatus}
                        handleSendBrokenAmenities={handleSendBrokenAmenities}
                    />
                )}
            </div>
        </div>
    );
};

export default BookingManagement;
