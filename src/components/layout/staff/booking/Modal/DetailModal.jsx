import React from 'react';

// Helper to clean currency strings
const parseCurrency = (value) => {
    const sanitizedValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    return Number(sanitizedValue) || 0; // Convert to number or fallback to 0
};

const formatCurrency = (amount) => {
    const validAmount = Number(amount) || 0; // Ensure valid number
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(validAmount);
};

// Modal component to display booking details
const DetailModal = ({ booking, onClose }) => {
    if (!booking) return null; // If no booking data, render nothing
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
            }}
        >
            <dialog className="modal" open style={{ zIndex: 100 }}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Booking Detail</h3>
                    <ul className="list-none mt-4">
                        <li className="flex justify-between mb-2">
                            <span>1. Workspace Price</span>
                            <span>{booking.total_workspace_price}</span>
                        </li>
                        <li className="flex justify-between mb-2">
                            <span>2. Amenities</span>
                        </li>
                        <div className="overflow-x-auto mt-2 mb-2">
                            <table className="table table-xs">
                                <thead>
                                    <tr>
                                        <th style={{ width: '150px'}}>Amenity Name</th>
                                        <th style={{ width: '130px'}}>Price</th>
                                        <th style={{ width: '130px'}}>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booking.amenities && booking.amenities.length > 0 ? (
                                        booking.amenities.map((amenity, index) => (
                                            <tr key={index}>
                                                <td>{amenity.amenity_name || 'N/A'}</td>
                                                <td>{formatCurrency(parseCurrency(amenity.rent_price))}</td>
                                                <td>{amenity.quantity || 0}</td>
                                                <td>{formatCurrency(parseCurrency(amenity.total_price))}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No amenities added
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <h1>_____________________________________________________________________</h1>
                            <li className="flex justify-between mb-1" style={{fontSize: '12px'}}>
                                <span>Total Amenities Price</span>
                                <span>{booking.total_amenities_price}</span>
                            </li>
                        </div>
                        <li className="flex justify-between mb-1">
                            <span>3. Broken Price</span>
                            <span>{booking.total_broken_price}</span>
                        </li>
                        <p>_______________________________________________________________________</p>
                        <li className="flex justify-between mb-2">
                            <span>Total Price</span>
                            <span>{booking.total_price}</span>
                        </li>
                    </ul>

                    <div className="modal-action">
                        <button onClick={onClose} className="px-4 py-2 mt-4 bg-gray-300 rounded">
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DetailModal;
