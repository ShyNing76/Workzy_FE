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
    console.log(booking.amenities);
    return (
        <dialog className="modal" open>
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
                    <div className="overflow-x-auto mt-2 mb-4">
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th style={{ width: '140px'}}>Amenity Name</th>
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
                    </div>
                    <li className="flex justify-between mb-2">
                        <span>3. Broken Price</span>
                        <span>{booking.total_broken_price}</span>
                    </li>

                    {/* Separator */}
                    <p>_______________________________________________________________________</p>

                    {/* Total Price */}
                    <li className="flex justify-between mb-2">
                        <span>Total Price</span>
                        <span>{booking.total_price}</span>
                    </li>
                </ul>

                {/* Modal Action - Close Button */}
                <div className="modal-action">
                    <button onClick={onClose} className="px-4 py-2 mt-4 bg-gray-300 rounded">
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default DetailModal;
