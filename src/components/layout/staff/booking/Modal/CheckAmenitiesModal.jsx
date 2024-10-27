import React, { useEffect, useState } from 'react';
import { getAmenitiesByBookingId } from '../../../../../config/api.staff';
import Swal from "sweetalert2";

const isValidGUID = (guid) => {
    const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return guidRegex.test(guid);
};

const CheckAmenitiesModal = ({ bookingId, onClose, handleChangeStatus, handleSendBrokenAmenities }) => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    useEffect(() => {
        if (!isValidGUID(bookingId)) {
            setError("Invalid ID. Please check again.");
            setLoading(false);
            return;
        }
  
        const fetchAmenities = async () => {
            try {
                const response = await getAmenitiesByBookingId(bookingId);  
                if (!response || response.err !== 0 || !response.data) {
                    throw new Error("Invalid response structure");
                }
  
                const uniqueAmenities = response.data.uniqueAmenitiesWithQuantity; // Đã thay đổi ở đây
                if (Array.isArray(uniqueAmenities)) {
                    setAmenities(uniqueAmenities);
                } else {
                    throw new Error("Invalid amenities format");
                }
            } catch (err) {
                console.error("Error calling API:", err);
                setError("Error while retrieving amenities list");
            } finally {
                setLoading(false);
            }
        };
  
        fetchAmenities();
    }, [bookingId]);
  
    const handleCheckboxChange = (amenity) => {
        setSelectedAmenities((prev) => {
            const found = prev.find((item) => item.amenity_name === amenity.amenity_name);
            
            if (found) {
                // Nếu đã có tiện ích này, loại bỏ nó
                return prev.filter((item) => item.amenity_name !== amenity.amenity_name);
            } else {
                // Nếu chưa có, thêm vào với thông tin chính xác
                return [...prev, { 
                    amenity_name: amenity.amenity_name, 
                    quantity: amenity.quantity
                }];
            }
        });
    };    
    
    
    const handleDone = async () => {
        try {
            if (selectedAmenities.length === 0) {
                await handleChangeStatus(bookingId, "completed");
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Status updated successfully to completed!",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.reload(); // Reload the page after the alert is closed
                });
            } else {
                await handleSendBrokenAmenities(bookingId, selectedAmenities);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Status updated successfully to damaged-payment!",
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.reload(); // Reload the page after the alert is closed
                });
            }
        } catch (err) {
            console.error("Error handling Done:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred while updating the status!",
            });
        } finally {
            onClose(); // Đóng modal sau khi xử lý xong
        }
    };    
    
    const handleModalClick = (event) => {
        event.stopPropagation();
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
        <dialog className="modal" open onClick={onClose}>
            <div className="modal-box" onClick={handleModalClick}>
                <h3 className="font-bold text-lg">List of amenities</h3>
                <ul>
                    {amenities.length > 0 ? (
                        amenities.map((amenity, index) => (
                            <li key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(amenity)} // Truyền toàn bộ đối tượng
                                    />
                                    {amenity.amenity_name} (Quantity: {amenity.quantity})
                                </label>
                            </li>

                        ))
                    ) : (
                        <li>No amenities available</li>
                    )}
                </ul>
                <div className="modal-action">
                    <button type="button" onClick={handleDone}>
                        Done
                    </button>
                </div>
            </div>
        </dialog>
    );
};
  
export default CheckAmenitiesModal;
