import React, { useState, useEffect } from "react";
import axios from "axios";
import './Wishlist.scss';

const Wishlist = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/api/v1/bookings');
                if (Array.isArray(response.data)) {
                    setBookings(response.data);
                } else {
                    console.error("Data is not an array", response.data);
                    setBookings([]);
                }
            } catch (err) {
                console.error("Error fetching bookings", err);
                setBookings([]);
            }
        };

        fetchBookings();
    }, []);

    const handleSendNotification = async (customerID, workspaceName) => {
        try {
            const response = await axios.post('/api/v1/wishList/', {
                workspace_ids: [workspaceName],
                customer_id: customerID
            }, {
                headers: {
                    'Authorization': 'your_token_here'
                }
            });
            setSuccessMessage(`Notification sent for ${workspaceName}`);
        } catch (error) {
            setError("Error sending notification");
        }
    };

    return (
        <div className="wishlist">
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Workspace Type</th>
                        <th>Workspace Name</th>
                        <th>Description</th>
                        <th>Booking Type</th> 
                        <th>Start Time</th>
                        <th>End time</th>
                        <th>Price</th>
                        <th>Amenities</th>
                        <th>Creation Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((customer) => (
                        customer.workspaces.map((workspace, index) => (
                            <tr key={`${customer.customerID}-${index}`}>
                                {index === 0 && (
                                    <>
                                        <td rowSpan={customer.workspaces.length}>{customer.customerID}</td>
                                        <td rowSpan={customer.workspaces.length}>{customer.customerName}</td>
                                    </>
                                )}
                                <td>{workspace.workspaceType}</td>
                                <td>{workspace.workspaceName}</td>
                                <td>{workspace.description.split("\n").map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}</td>
                                <td>{workspace.bookingType}</td>
                                <td>{workspace.price}</td>
                                <td>{workspace.amenities}</td>
                                <td>{workspace.creationDate}</td>
                                <td>{workspace.status}</td>
                                <td>
                                    <button onClick={() => handleSendNotification(customer.customerID, workspace.workspaceName)}>
                                        Send Notification
                                    </button>
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Wishlist;
