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
  
                const uniqueAmenities = response.data.uniqueAmenitiesWithQuantity;
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
                // Bỏ chọn tiện ích nếu đã tồn tại
                return prev.filter((item) => item.amenity_name !== amenity.amenity_name);
            } else {
                // Thêm tiện ích vào danh sách với quantity mặc định là 1
                return [...prev, { amenity_name: amenity.amenity_name, quantity: 1 }];
            }
        });
    };

    const handleQuantityChange = (amenity, value) => {
        setSelectedAmenities((prev) => 
            prev.map((item) => 
                item.amenity_name === amenity.amenity_name
                    ? { ...item, quantity: value }
                    : item
            )
        );
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
                    window.location.reload();
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
            onClose();
        }
        console.log("Final selected amenities with quantities:", selectedAmenities); // Log toàn bộ dữ liệu đã chọn
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
                        amenities.map((amenity, index) => {
                            const isSelected = selectedAmenities.some(
                                (item) => item.amenity_name === amenity.amenity_name
                            );
                            return (
                                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ flexGrow: 1 }}>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleCheckboxChange(amenity)}
                                        />
                                        {amenity.amenity_name} - {amenity.quantity}
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={amenity.quantity}
                                        value={
                                            isSelected
                                                ? selectedAmenities.find((item) => item.amenity_name === amenity.amenity_name)?.quantity || 1
                                                : 1
                                        }
                                        onChange={(e) =>
                                            handleQuantityChange(amenity, parseInt(e.target.value))
                                        }
                                        disabled={!isSelected} // Vô hiệu hóa input nếu chưa chọn checkbox
                                        style={{ marginLeft: "8px", width: "60px" }}
                                    />
                                </li>
                            );
                        })
                    ) : (
                        <li>No amenities available</li>
                    )}
                </ul>
                <div className="modal-action">
                    <button type="button" onClick={handleDone} className="px-4 py-2 mt-4 bg-gray-300 rounded">
                        Done
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default CheckAmenitiesModal;
