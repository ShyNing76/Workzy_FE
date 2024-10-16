import React, { useState, useEffect } from 'react';
import './BookingManagement.scss';
import Swal from "sweetalert2";
import DetailModal from '../../../components/layout/staff/booking/Modal/DetailModal';
import CheckAmenitiesModal from '../../../components/layout/staff/booking/Modal/CheckAmenitiesModal.jsx'
import SearchBar from '../../../components/layout/staff/booking/SearchBar/SearchBar';
import { getBooking, postBookingStatus, sendBrokenAmenities } from '../../../config/api.staff.js';
import { useOutletContext } from 'react-router-dom';

const BookingManagement = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const { workspaces, buildingId } = useOutletContext();

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        };
        return date.toLocaleString('vi-VN', options).replace(',', ''); 
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
            if (!response || !response.data || !Array.isArray(response.data.rows)) {
                throw new Error("Unexpected data format.");
            }

            const bookingsData = response.data.rows.map(booking => ({
                booking_id: booking.booking_id,
                workspace_id: booking.workspace_id,
                workspace_name: booking.Workspace?.workspace_name || "Không xác định",
                start_time_date: formatDate(booking.start_time_date),
                end_time_date: formatDate(booking.end_time_date),
                createdAt: formatDate(booking.createdAt),
                workspace_price: formatCurrency(booking.workspace_price),
                total_price: formatCurrency(booking.total_price),
                status: booking.BookingStatuses?.at(-1)?.status || "N/A",
                booking_type: bookingTypeMap[booking.booking_type_id] || "Không xác định",
                total_amenities_price: formatCurrency(booking.total_amenities_price || 0),
                total_broken_price: formatCurrency(booking.total_broken_price || 0),
                customer_name: booking.Customer?.User?.name || "Không xác định"
            }));

            setBookings(bookingsData);
            setFilteredBookings(bookingsData);
        } catch (error) {
            console.error("Error fetching booking data:", error);
        }
    };

    useEffect(() => {
        if (buildingId) fetchBookingData();
    }, [buildingId]);

    const handleSearch = (bookingId) => {
        const filtered = bookingId 
            ? bookings.filter(booking => booking.booking_id.includes(bookingId)) 
            : bookings;
        setFilteredBookings(filtered);
    };

    const handleSendBrokenAmenities = async (bookingId, selectedAmenities) =>{
        try {
            console.log(selectedAmenities);
            const data = {
                    amenity_name: selectedAmenities,
                    booking_id: bookingId,
                  };
            const response = await sendBrokenAmenities(data); // Replace with your actual API function
            
            if (response?.data?.err) throw new Error("Unable to report broken amenities.");
    
            // Success message
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Broken amenities reported successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            setFilteredBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.booking_id === bookingId ? { ...booking,status: "damage-payment" } : booking
                )
            );

            const selected = bookings.find(b => b.booking_id === bookingId); 
            setSelectedBooking(selected);
            setShowAmenitiesModal(true); 
            // Optionally, update UI or state here if needed
            // Example: refresh bookings, close modal, etc.
    
        } catch (error) {
            console.error("Error reporting broken amenities:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to report broken amenities.",
                showConfirmButton: true,
            });
        }
    
    }

    const handleChangeStatus = async (booking_id, status) => {
        try {
            const response = await postBookingStatus(booking_id, status);
            if (response?.data?.err) throw new Error("Lỗi không xác định.");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Cập nhật trạng thái thành công!",
                showConfirmButton: false,
                timer: 1500,
            });

            setFilteredBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking.booking_id === booking_id ? { ...booking, status } : booking
                )
            );

            if (status === "check-amenities") {
                const selected = bookings.find(b => b.booking_id === booking_id); 
                setSelectedBooking(selected);
                setShowAmenitiesModal(true); 
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    const handleAmenitiesDone = () => {
        if (selectedBooking) {
            handleChangeStatus(selectedBooking.booking_id, "completed"); // Gọi hàm để cập nhật trạng thái
            setShowAmenitiesModal(false); // Đóng modal
        }
    };

    const renderBookingRow = (booking, index) => (
        <tr key={booking.booking_id}>
            <td>{index + 1}</td>
            <td>{booking.customer_name}</td>
            <td>{booking.workspace_name}</td>
            <td>{booking.start_time_date}</td>
            <td>{booking.end_time_date}</td>
            <td>{booking.booking_type}</td>
            <td>{booking.total_price}</td>
            <td>{booking.status}</td>
            <td>
                <div className="buttons">
                    <button
                        style={{ backgroundColor: 'rgba(0, 130, 0, 0.64)', color: 'white' }}
                        onClick={() => { setSelectedBooking(booking); setShowDetailModal(true); }}
                    >
                        Detail
                    </button>
                    {booking.status === "check-in" && (
                        <button onClick={() => handleChangeStatus(booking.booking_id, "in-process")}>
                            Confirm Check-In 
                        </button>
                    )}
                    {booking.status === "check-out" && (
                        <button onClick={() => handleChangeStatus(booking.booking_id, "check-amenities")}>
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
                <SearchBar onSearch={handleSearch} />
                <div className="table-responsive">
                    <table className="booking-table">
                        <thead>
                            <tr>
                                <th style={{ width: '120px'}}>Booking ID</th>
                                <th style={{ width: '160px'}}>Customer Name</th>
                                <th style={{ width: '170px'}}>Workspace Name</th>
                                <th style={{ width: '170px'}}>Start Time</th>
                                <th style={{ width: '170px'}}>End Time</th>
                                <th style={{ width: '130px'}}>Booking Type</th>
                                <th style={{ width: '140px'}}>Total Price</th>
                                <th style={{ width: '170px'}}>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((booking, index) => renderBookingRow(booking, index))
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