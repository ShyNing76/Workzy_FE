import React from 'react';

const convertToVietnamTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit', hour12: false 
    }).replace(',', '');
};

const capitalizeFirstLetter = (string) => {
    if (!string) return ''; // Return empty string if no input
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Modal = ({ isOpen, onClose, workspaceType, bookings }) => {
    if (!isOpen) return null;
    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>×</button>
                <h2 className="text-lg font-bold">
                    {workspaceType || 'Workspace Details'}
                </h2>
                {bookings && bookings.length > 0 ? (
                    <div className="my-4">
                        {bookings.map((booking, index) => (
                            <div key={index} className="border p-4 my-2 rounded">
                                <h3 className="font-semibold">Customer: {booking.customerName}</h3>
                                <p>Start Time: {convertToVietnamTime(booking.startTime)}</p>
                                <p>End Time: {convertToVietnamTime(booking.endTime)}</p>
                                <p>Status: {capitalizeFirstLetter(booking.status)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500">No bookings available.</div>
                )}
            </div>
        </div>
    );
};

export default Modal;
