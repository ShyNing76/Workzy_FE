
import React, { useState, useEffect } from 'react';
import './BookingManagement.scss';
import DetailModal from '../../../components/layout/staff/booking/Modal/DetailModal';
import SearchBar from '../../../components/layout/staff/booking/SearchBar/SearchBar';
import CheckAmenitiesModal from '../../../components/layout/staff/booking/Modal/CheckAmenitiesModal ';
import AmenitiesIcon from '../../../components/layout/staff/booking/Amenities/AmenitiesIcon';

const BookingManagement = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([
        { id: 1, customername: "John Doe", price: 50, additionalPrice: 0, brokenPrice: 0, totalPrice: 50, workspacetype: "Single POD", workspacename: "WY11S", createDate: '12/09/2024', bookingDate: '13/09/2024', status: "Confirmed", amenitiesChecked: [] },
        { id: 2, customername: "Jane Smith", price: 50, additionalPrice: 0, brokenPrice: 0, totalPrice: 50, workspacetype: "Quad POD", workspacename: "WY11D", createDate: '6/09/2024', bookingDate: '14/09/2024', status: "Confirmed", amenitiesChecked: [] },
        { id: 3, customername: "Michael Johnson", price: 70, additionalPrice: 0, brokenPrice: 0, totalPrice: 70, workspacetype: "Working Room", workspacename: "WY22W", createDate: '09/09/2024', bookingDate: '14/09/2024', status: "Confirmed", amenitiesChecked: [] },
        { id: 4, customername: "Emily Davis", price: 90, additionalPrice: 0, brokenPrice: 0, totalPrice: 90, workspacetype: "Meeting Room", workspacename: "WY32M", createDate: '10/09/2024', bookingDate: '14/09/2024', status: "Confirmed", amenitiesChecked: [] },
        { id: 5, customername: "Sarah Brown", price: 120, additionalPrice: 0, brokenPrice: 0, totalPrice: 120, workspacetype: "Event Space", workspacename: "WY01E", createDate: '14/09/2024', bookingDate: '14/09/2024', status: "Confirmed", amenitiesChecked: [] },
    ]);
    const [filteredBookings, setFilteredBookings] = useState(bookings);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking.status === "Confirmed" 
                    ? { ...booking, status: "Paid" } 
                    : booking
                )
            );
        }, 3000);//time tạm thời để test
    
        return () => clearTimeout(timer);
    }, []);
    

    const handleSearch = (bookingId) => {
        if (!bookingId) {
            setFilteredBookings(bookings);
            setIsSearching(false);
            return;
        }

        const filtered = bookings.filter(booking => booking.id.toString() === bookingId);
        setFilteredBookings(filtered);
        setIsSearching(true); 
    };

    const handleCheckIn = (index) => {
        const updatedBookings = [...bookings];
        const bookingIndex = isSearching ? bookings.findIndex(b => b.id === filteredBookings[index].id) : index;
        const booking = updatedBookings[bookingIndex];
        
        if (booking.status === "Paid") {
            booking.status = "In-Process";
            setBookings(updatedBookings);

            setTimeout(() => {
                const updatedBookingsAfterTimeout = [...bookings];
                const currentBooking = updatedBookingsAfterTimeout[bookingIndex];

                if (currentBooking.status === "In-Process") {
                    currentBooking.status = "Check Out";
                    setBookings(updatedBookingsAfterTimeout);
                }
            }, 5000);
        }
    };

    const handleCheckOut = (index) => {
        const updatedBookings = [...bookings];
        const bookingIndex = isSearching ? bookings.findIndex(b => b.id === filteredBookings[index].id) : index;
        const booking = updatedBookings[bookingIndex];
        
        if (booking.status === "In-Process") {
            booking.status = "Check Out";
        }
        
        setBookings(updatedBookings);
    };

    const amenitiesCount = {
        "Single POD": 2,
        "Double POD": 2,
        "Quad POD": 3,
        "Working Room": 6,
        "Meeting Room": 7,
        "Event Space": 5,
    };

    const amenitiesData = {
        "Single POD": {
            amenities: [
                { name: "Coffee and Tea", price: 0 },
                { name: "Wifi", price: 41 },
            ],
        },
        "Double POD": {
            amenities: [
                { name: "Coffee and Tea", price: 0 },
                { name: "Wifi", price: 41 },
            ],
        },
        "Quad POD": {
            amenities: [
                { name: "Coffee and Tea", price: 0 },
                { name: "Wifi", price: 41 },
                { name: "Printer", price: 68 },
            ],
        },
        "Working Room": {
            amenities: [
                { name: "Coffee and Tea", price: 0 },
                { name: "Wifi", price: 41 },
                { name: "Printer", price: 68 },
                { name: "Screen", price: 95 },
                { name: "Telephone for room", price: 49 },
                { name: "White board", price: 39 },
            ],
        },
        "Meeting Room": {
            amenities: [
                { name: "Coffee and Tea", price: 0 },
                { name: "Wifi", price: 41 },
                { name: "Printer", price: 68 },
                { name: "Screen", price: 95 },
                { name: "Telephone for room", price: 49 },
                { name: "White board", price: 39 },
                { name: "Projector", price: 186 },
            ],
        },
        "Event Space": {
            amenities: [
                { name: "Coffee and Tea", price: 0 },
                { name: "Wifi", price: 41 },
                { name: "Screen", price: 95 },
                { name: "White board", price: 39 },
                { name: "Projector", price: 186 },
            ],
        },
    };

    const calculateUnselectedAmenitiesCost = (booking) => {
        const allAmenities = amenitiesData[booking.workspacetype].amenities;
        const selectedAmenities = booking.amenitiesChecked;
        
        return allAmenities.reduce((total, amenity) => {
            if (!selectedAmenities.includes(amenity.name)) {
                total += amenity.price;
            }
            return total;
        }, 0);
    };

    const calculateTotalPrice = (booking) => {
        const brokenPrice = booking.brokenPrice || 0;
        const additionalPrice = booking.additionalPrice || 0;
        return booking.price + brokenPrice + additionalPrice;
    };

    const handleCheckAmenities = (amenityId) => {
        const updatedBooking = { ...selectedBooking };
    
        if (updatedBooking.amenitiesChecked.includes(amenityId)) {
            updatedBooking.amenitiesChecked = updatedBooking.amenitiesChecked.filter(id => id !== amenityId);
        } else {
            updatedBooking.amenitiesChecked.push(amenityId);
        }
    
        setSelectedBooking(updatedBooking);
    };
    

    const handleDone = () => {
        const updatedBookings = bookings.map(booking => {
            if (booking.id === selectedBooking.id) {
                const totalAmenities = amenitiesCount[booking.workspacetype];
                if (booking.amenitiesChecked.length === totalAmenities) {
                    booking.status = "Complete"; 
                } else {
                    booking.status = "Waiting Paid";
                }
    
                const unselectedAmenitiesCost = calculateUnselectedAmenitiesCost(booking);
                booking.brokenPrice = unselectedAmenitiesCost;
                booking.totalPrice = calculateTotalPrice(booking);
            }
            return booking;
        });
    
        setBookings(updatedBookings);
        setShowAmenitiesModal(false);
        setSelectedBooking(null);
    };
    
    

    const handlePayment = (bookingId) => {
        const updatedBookings = bookings.map(booking => {
            if (booking.id === bookingId && booking.status === "Waiting Paid") {
                booking.status = "Complete";
            }
            return booking;
        });
    
        setBookings(updatedBookings); 
        setFilteredBookings(updatedBookings.filter(booking => booking.name.includes(searchTerm)));
    };
    
    const renderBookingRow = (booking, index) => (
        <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.customername}</td>
            <td>{booking.workspacetype}</td>
            <td>{booking.workspacename}</td>
            <td>
                <AmenitiesIcon workspaceType={booking.workspacetype} />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>${booking.totalPrice}</td>
            <td>{booking.status}</td>
            <td>
                <div className="buttons">
                    <button className="detail-button" onClick={() => { setSelectedBooking(booking); setShowDetailModal(true); }}>
                        Detail
                    </button>
                    {booking.status === "Paid" && (
                        <button className="check-in-button" onClick={() => handleCheckIn(index)}>
                            Check In
                        </button>
                    )}
                    {booking.status === "Check Out" && (
                        <button className="check-amenities-button" onClick={() => { setSelectedBooking(booking); setShowAmenitiesModal(true); }}>
                            Check Amenities
                        </button>
                    )}
                    {booking.status === "Waiting Paid" && (
                        <button className="payment-button" onClick={() => handlePayment(booking.id)}>
                            Paid
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
                                <th style={{ width: '100px' }}>BookingID</th>
                                <th style={{ width: '140px' }}>Customer Name</th>
                                <th style={{ width: '140px' }}>Workspace Type</th>
                                <th style={{ width: '150px' }}>Workspace Name</th>  
                                <th style={{ width: '220px' }}>Amenities</th>  
                                <th>Start Time</th>  
                                <th>End Time</th>           
                                <th>Booking Type</th>          
                                <th style={{ width: '90px' }}>Total price</th>
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
                                        <td colSpan="8">No matching bookings found</td>
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
                        onCheckAmenities={handleCheckAmenities} 
                        onDone={handleDone} 
                    />
                )}
            </div>
        </div>
    );
};

export default BookingManagement;