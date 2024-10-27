import React from 'react';
import './RoomModal.scss';

const convertToVietnamTime = (dateString) => {
    const date = new Date(dateString);
    const options = { timeZone: 'Asia/Ho_Chi_Minh' };
    return date.toLocaleString('vi-VN', { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit', hour12: false 
    }).replace(',', '');
};

const Modal = ({ isOpen, onClose, workspaceType, bookings }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">
                    {workspaceType || 'Workspace Details'}
                </h2>
                {bookings && bookings.length > 0 ? (
                    <div className="bookings-info">
                        {bookings.map((booking, index) => (
                            <div key={index} className="booking-item">
                                <h3>Customer: {booking.customerName}</h3>
                                <p>Start Time: {convertToVietnamTime(booking.startTime)}</p>
                                <p>End Time: {convertToVietnamTime(booking.endTime)}</p>
                                <p>Status: {booking.status}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No bookings available.</div>
                )}
            </div>
        </div>
    );
};

export default Modal;
