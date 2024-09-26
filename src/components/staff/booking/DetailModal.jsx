import React from 'react';

const DetailModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
        <dialog className='modal' open>
            <div className='modal-box'>
                <h3 className='font-bold text-lg'>Booking Details</h3>
                <p>Workspace ID: {booking.workspaceId}</p>
                <p>Customer ID: {booking.customerId}</p>
                <p>Total Price: {booking.totalPrice.toLocaleString('vi-VN')}</p>
                <div className='modal-action'>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

export default DetailModal;
