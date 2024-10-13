import React, { useState, useEffect } from 'react';
import './BookingManagement.scss';
import DetailModal from '../../../components/layout/staff/booking/Modal/DetailModal';
import SearchBar from '../../../components/layout/staff/booking/SearchBar/SearchBar';
import CheckAmenitiesModal from '../../../components/layout/staff/booking/Modal/CheckAmenitiesModal';
import { getBooking, getStaffBuildingId, getWorkspaceByBuildingId, getWorkspaceById } from '../../../config/api.staff';

const BookingManagement = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const staffBuildingResponse = await getStaffBuildingId();
                const staffBuildingId = staffBuildingResponse.data.building_id;
                const workspaceResponse = await getWorkspaceByBuildingId(staffBuildingId);
                const workspaceIds = workspaceResponse.data.map(workspace => workspace.workspace_id);

                const bookingResponse = await getBooking();
                console.log("Received Data:", bookingResponse);

                if (bookingResponse && bookingResponse.data && Array.isArray(bookingResponse.data.rows)) {
                    const bookingsData = await Promise.all(
                        bookingResponse.data.rows
                            .filter(booking => workspaceIds.includes(booking.workspace_id))
                            .map(async (booking) => {
                                const latestStatus = booking.BookingStatuses[booking.BookingStatuses.length - 1];
        
                                const formatCurrency = (amount) => {
                                    return new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(Number(amount));
                                };
        
                                const formatDate = (dateString) => {
                                    const date = new Date(dateString);
                                    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                                };
        
                                // Gọi API để lấy workspace_name
                                const workspaceResponse = await getWorkspaceById(booking.workspace_id);
                                const workspace_name = workspaceResponse.data ? workspaceResponse.data.workspace_name : ""; // Kiểm tra nếu có dữ liệu
        
                                return {
                                    booking_id: booking.booking_id,
                                    customer_name: "", 
                                    workspace_name: workspace_name, // Đặt workspace_name
                                    start_time_date: formatDate(booking.start_time_date),
                                    end_time_date: formatDate(booking.end_time_date),
                                    createdAt: formatDate(booking.createdAt), // Định dạng createdAt
                                    workspace_price: formatCurrency(booking.workspace_price), // Định dạng workspace_price
                                    additionalPrice: formatCurrency(booking.additionalPrice || 0), // Định dạng additionalPrice
                                    brokenPrice: formatCurrency(booking.brokenPrice || 0), // Định dạng brokenPrice
                                    total_price: formatCurrency(booking.total_price), // Định dạng total_price
                                    status: latestStatus.status,
                                };
                            })
                    );

                    setBookings(bookingsData);
                    setFilteredBookings(bookingsData);
                } else {
                    console.error("Unexpected data format:", bookingResponse);
                    alert("Có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại sau.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại sau.");
            }
        };

        fetchBookings();
    }, []);

    const handleSearch = (bookingId) => {
        if (!bookingId) {
            setFilteredBookings(bookings);
            setIsSearching(false);
            return;
        }

        const filtered = bookings.filter(booking => booking.booking_id.includes(bookingId));
        setFilteredBookings(filtered);
        setIsSearching(true); 
    };

    const renderBookingRow = (booking) => (
        <tr key={booking.booking_id}>
            <td title={booking.booking_id}>{booking.booking_id}</td>
            <td>{booking.customer_name || ''}</td>
            <td>{booking.workspace_name || ''}</td>
            <td>{booking.start_time_date}</td>
            <td>{booking.end_time_date}</td>
            <td>{booking.booking_type}</td>
            <td>{booking.total_price}</td>
            <td>{booking.status}</td>
            <td>
                <div className="buttons">
                    <button className="detail-button" onClick={() => { setSelectedBooking(booking); setShowDetailModal(true); }}>
                        Detail
                    </button>
                    {booking.status === "paid" && (
                    <button className="check-in-button" onClick={() => handleCheckIn(booking)}>
                        Check In
                    </button>
                )}
                </div>
            </td>
        </tr>
    );

    return (
        <div className='booking-container'>
            <div className='main-bookings-content'>
                <SearchBar onSearch={handleSearch} />
                <div className='table-responsive'>
                    <table className='booking-table'>
                        <thead>
                            <tr>
                                <th style={{ width: '200px' }}>BookingID</th>
                                <th style={{ width: '140px' }}>Customer Name</th>
                                <th style={{ width: '150px' }}>Workspace Name</th>  
                                <th style={{ width: '150px' }}>Start Time</th>  
                                <th style={{ width: '150px' }}>End Time</th>           
                                <th style={{ width: '150px' }}>Booking Type</th>          
                                <th style={{ width: '130px' }}>Total price</th>
                                <th style={{ width: '110px' }}>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isSearching ? (
                                filteredBookings.length > 0 ? (
                                    filteredBookings.map(renderBookingRow)
                                ) : (
                                    <tr>
                                        <td colSpan="10">No matching bookings found</td>
                                    </tr>
                                )
                            ) : (
                                bookings.map(renderBookingRow)
                            )}
                        </tbody>
                    </table>
                </div>
                {showDetailModal && selectedBooking && (
                    <DetailModal booking={selectedBooking} onClose={() => setShowDetailModal(false)} />
                )}
                {showAmenitiesModal && selectedBooking && (
                    <CheckAmenitiesModal 
                        booking={selectedBooking} 
                        onClose={() => setShowAmenitiesModal(false)} 
                    />
                )}
            </div>
        </div>
    );
};

export default BookingManagement;
