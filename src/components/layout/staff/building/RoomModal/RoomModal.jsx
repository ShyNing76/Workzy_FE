import React from 'react';
import AmenitiesIcon from '../../booking/Amenities/AmenitiesIcon'; 
import './RoomModal.scss'

const roomPrices = {
    "Single POD": 50,
    "Double POD": 50,
    "Quad POD": 50,
    "Working Room": 70,
    "Meeting Room": 90,
    "Event Space": 120,
};
const statusDisplay = {
    'in_use': 'In-Process',
    'available': 'Available',
    'booked': 'Booked',
    'under_maintenance': 'Under Maintenance'
};

const Modal = ({ isOpen, onClose, room }) => {
    if (!isOpen || !room) return null;

    const { id, status, type, bookingDetails } = room;
    const price = roomPrices[type] || 0;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">{type} - {id}</h2>
                <div className="price">
                    <h3>Price: ${price}/hour</h3>
                </div>
                <div className="status">
                    <h3>Status: {statusDisplay[room.status]}</h3>
                    {status === "booked" && bookingDetails && (
                        <div>
                            <p>Booking ID: {bookingDetails.id}</p>
                            <p>Customer Name: {bookingDetails.customerName}</p>
                            <p>Booking Date: {bookingDetails.date}</p>
                        </div>
                    )}
                </div>
                <div className="amenities">
                    <AmenitiesIcon workspaceType={type} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
