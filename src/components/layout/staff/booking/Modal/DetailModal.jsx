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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="modal modal-open">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-lg mb-4">Booking Detail</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span className="font-medium">1. Booking ID:</span>
                            <span>{booking.booking_id}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">2. Workspace Price:</span>
                            <span>{formatCurrency(parseCurrency(booking.total_workspace_price))}</span>
                        </li>
                        <li className="font-medium">3. Amenities Added:</li>
                        <div className="overflow-x-auto mb-2">
                            <table className="table table-compact w-full">
                                <thead>
                                    <tr>
                                        <th>Amenity Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
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
                                            <td colSpan="4" className="text-center">No amenities added</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <li className="flex justify-between border-t pt-2 mt-2">
                            <span className="font-medium">Total Price Of Amenities Added:</span>
                            <span>{formatCurrency(parseCurrency(booking.total_amenities_price))}</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">4. Broken Price:</span>
                            <span>{formatCurrency(parseCurrency(booking.total_broken_price))}</span>
                        </li>
                        <li className="flex justify-between border-t pt-2 mt-2">
                            <span className="font-semibold">Total Price:</span>
                            <span>{formatCurrency(parseCurrency(booking.total_price))}</span>
                        </li>
                    </ul>

                    <div className="modal-action mt-4">
                        <button onClick={onClose} className="btn btn-primary">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
