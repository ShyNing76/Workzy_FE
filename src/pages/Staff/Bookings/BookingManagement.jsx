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
        const [isFetched, setIsFetched] = useState(false);
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

        const fetchBookingData = async (page = 1) => {
            try {
                if (!buildingId || isFetched) return; 

                const response = await getBooking(buildingId, page, itemsPerPage);
                if (!response?.data?.rows) throw new Error("Unexpected data format.");

                const bookings = response.data.rows;

                if (bookings.length === 0) return; // Dừng lại nếu không còn booking

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

                setBookings(prevBookings => [...prevBookings, ...bookingsData]);
                setFilteredBookings(prevBookings => [...prevBookings, ...bookingsData]);

                // Tự động chuyển sang trang tiếp theo nếu còn booking
                if (bookings.length === itemsPerPage) {
                    await fetchBookingData(page + 1);
                }

                setIsFetched(true);
            } catch (error) {
                console.error("Error fetching booking data:", error);
            }
        };

        useEffect(() => {
            if (!isFetched) fetchBookingData(currentPage);
        }, [buildingId]);

        // Hàm kiểm tra và chuẩn hóa dữ liệu
        const validateAmenitiesData = (bookingId, selectedAmenities) => {
            if (!bookingId) {
                console.error("Booking ID is required.");
                return null;
            }
        
            const validAmenities = selectedAmenities
                .filter((amenity) => 
                    amenity.amenity_name?.trim() !== "" && amenity.quantity > 0
                );
        
            if (validAmenities.length === 0) {
                console.error("No valid amenities found.");
                return null;
            }
        
            return {
                booking_id: bookingId,
                amenities_quantities: validAmenities,
            };
        };
        

        const handleSendBrokenAmenities = async (bookingId, selectedAmenities) => {
            try {
                const amenitiesQuantities = selectedAmenities.map((amenity) => ({
                    amenity_name: amenity.amenity_name.trim(), // Đảm bảo không có khoảng trắng thừa
                    quantity: amenity.quantity,
                }));
        
                if (amenitiesQuantities.length === 0) {
                    throw new Error("No amenities selected");
                }
        
                const requestBody = {
                    booking_id: bookingId,
                    amenities_quantities: amenitiesQuantities,
                };
        
                console.log("Request body:", requestBody);
        
                const response = await sendBrokenAmenities(requestBody);
                if (response.err) {
                    throw new Error(response.message);
                }
        
                console.log("Send broken amenities successful:", response.message);
            } catch (error) {
                console.error("Error sending broken amenities:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message || "An error occurred!",
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
                            className="btn btn-sm btn-active"
                            onClick={() => { 
                                setSelectedBooking(booking); 
                                setShowDetailModal(true); 
                            }}
                        >
                            Detail
                        </button>
                        {booking.status === "check-in" && (
                            <button 
                                className="btn btn-sm btn-accent btn-accent"
                                onClick={() => handleChangeStatus(booking.booking_id, "usage")}>
                                Confirm Check-In
                            </button>
                        )}
                        {booking.status === "paid" && (
                            <button 
                                className="btn btn-sm btn-accent btn-accent"
                                onClick={() => handleChangeStatus(booking.booking_id, "usage")}>
                                Check-In
                            </button>
                        )}
                        {booking.status === "check-out" && (
                            <button 
                                className="btn btn-sm btn-accent btn-accent"
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
                                {currentBookings.map((booking, index) => renderBookingRow(booking, index))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination">
                        <button 
                        className='btn btn-xs btn-outline'
                        style={{ marginRight: "20px" }}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span style={{ marginRight: "20px"}}>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button 
                        className='btn btn-xs btn-outline'
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
                {showDetailModal && selectedBooking && (
                    <DetailModal 
                        booking={selectedBooking} 
                        onClose={() => setShowDetailModal(false)} 
                    />
                )}
                {showAmenitiesModal && selectedBooking && (
                    <CheckAmenitiesModal 
                        bookingId={selectedBooking.booking_id}
                        onDone={handleAmenitiesDone} 
                        onClose={() => setShowAmenitiesModal(false)} 
                        handleChangeStatus={handleChangeStatus} 
                        handleSendBrokenAmenities={handleSendBrokenAmenities}
                    />
                )}
            </div>
        );
    };

    export default BookingManagement;
