import React, { useState, useEffect } from 'react';
import './BookingManagement.scss';
import Swal from "sweetalert2";
import DetailModal from '../../../components/layout/staff/booking/Modal/DetailModal.jsx';
import CheckAmenitiesModal from '../../../components/layout/staff/booking/Modal/CheckAmenitiesModal.jsx';
import { 
    getBooking, 
    postBookingStatus, 
    sendBrokenAmenities, 
    getBookingTypeById 
} from '../../../config/api.staff.js';
import { useOutletContext } from 'react-router-dom';

const BookingManagement = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Số booking hiển thị mỗi trang
    const { buildingId } = useOutletContext();

    const formatCurrency = amount => 
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount));

    const formatDate = dateString => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', { 
            year: 'numeric', month: '2-digit', day: '2-digit', 
            hour: '2-digit', minute: '2-digit', hour12: false 
        }).replace(',', ''); 
    };

    const fetchBookingData = async () => {
        try {
            if (!buildingId) throw new Error("Building ID is not valid.");

            const response = await getBooking(buildingId);
            if (!response?.data?.rows) throw new Error("Unexpected data format.");

            const bookings = response.data.rows;
            const bookingTypeCache = {};

            const getBookingType = async (booking_type_id) => {
                if (bookingTypeCache[booking_type_id]) {
                    return bookingTypeCache[booking_type_id];
                }
                const response = await getBookingTypeById(booking_type_id);
                const bookingType = response?.data?.type || "Unknown";
                bookingTypeCache[booking_type_id] = bookingType;
                return bookingType;
            };

            const bookingsData = [];
            for (const booking of bookings) {
                const bookingType = await getBookingType(booking.booking_type_id);
                const bookingAmenities = booking.Amenities?.map(amenity => {
                    const details = amenity.BookingAmenities || {};
                    return {
                        amenity_name: amenity.amenity_name,
                        rent_price: formatCurrency(details.price || 0),
                        quantity: details.quantity || 0,
                        total_price: formatCurrency(details.total_price || 0),
                    };
                });
                console.log(bookingAmenities)

                bookingsData.push({
                    booking_id: booking.booking_id,
                    workspace_id: booking.workspace_id,
                    workspace_name: booking.Workspace?.workspace_name || "Unknown",
                    start_time_date: formatDate(booking.start_time_date),
                    end_time_date: formatDate(booking.end_time_date),
                    workspace_price: formatCurrency(booking.workspace_price),
                    total_price: formatCurrency(booking.total_price),
                    total_workspace_price: formatCurrency(booking.total_workspace_price),
                    status: booking.BookingStatuses?.at(-1)?.status || "N/A",
                    booking_type: bookingType,
                    total_amenities_price: formatCurrency(booking.total_amenities_price || 0),
                    total_broken_price: formatCurrency(booking.total_broken_price || 0),
                    customer_name: booking.Customer?.User?.name || "Unknown",
                    amenities: bookingAmenities,
                });
            }

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
        } catch (error) {
            console.error("Error reporting broken amenities:", error);
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

            if (status === "check-in" || status === "check-amenities") {
                setSelectedBooking(bookings.find(b => b.booking_id === booking_id));
                if (status === "check-amenities") {
                    setShowAmenitiesModal(true);
                }
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
        <tr style={{ fontSize: '13px' }} className="hover" key={booking.booking_id}>
            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>{booking.customer_name}</td>
            <td>{booking.workspace_name}</td>
            <td>{booking.start_time_date}</td>
            <td>{booking.end_time_date}</td>
            <td>{booking.booking_type}</td>
            <td>{booking.total_price}</td>
            <td className="badge badge-outline">{booking.status}</td>
            <td>
                <div className="buttons" style={{ display: 'flex', gap: '30px' }}>
                    <button
                        className="btn btn-sm btn-outline"
                        onClick={() => { 
                            console.log("Selected Booking:", booking);
                            setSelectedBooking(booking); 
                            setShowDetailModal(true); 
                        }}
                    >
                        Detail
                    </button>
                    {booking.status === "check-in" && (
                        <button 
                            className="btn btn-sm btn-outline btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "usage")}>
                            Confirm Check-In
                        </button>
                    )}
                    {booking.status === "paid" && (
                        <button 
                            className="btn btn-sm btn-outline btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "usage")}>
                            Check-In
                        </button>
                    )}
                    {booking.status === "check-out" && (
                        <button 
                            className="btn btn-sm btn-outline btn-accent"
                            onClick={() => handleChangeStatus(booking.booking_id, "check-amenities")}>
                            Check Amenities 
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );

    // Tính số trang dựa trên số booking
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const currentBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="booking-container">
            <div className="main-bookings-content">
                <div className="table-container">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr style={{fontSize: '16px'}}>
                                <th style={{ width: '80px'}}>Index</th>
                                <th style={{ width: '160px'}}>Customer Name</th>
                                <th style={{ width: '170px'}}>Workspace Name</th>
                                <th style={{ width: '160px'}}>Start Time</th>
                                <th style={{ width: '160px'}}>End Time</th>
                                <th style={{ width: '130px'}}>Booking Type</th>
                                <th style={{ width: '140px'}}>Total Price</th>
                                <th style={{ width: '170px'}}>Status</th>
                                <th style={{ width: '270px'}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBookings.map(renderBookingRow)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagination">
                <button className="btn btn-xs btn-outline" style={{ marginRight: "10px" }} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span style={{ marginRight: "10px" }}>Page {currentPage} of {totalPages}</span>
                <button className="btn btn-xs btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
            {showDetailModal && (
                <DetailModal
                    booking={selectedBooking}
                    onClose={() => setShowDetailModal(false)}
                />
            )}
           {
                showAmenitiesModal && (
                    <CheckAmenitiesModal 
                        bookingId={selectedBooking.booking_id}
                        onClose={() => setShowAmenitiesModal(false)} 
                        handleChangeStatus={handleChangeStatus} 
                        handleSendBrokenAmenities={handleSendBrokenAmenities} 
                    />
                )
            }
        </div>
    );
};

export default BookingManagement;
