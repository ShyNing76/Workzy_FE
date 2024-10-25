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
          console.log("API Response (Full):", response);
  
          if (!response || response.err !== 0 || !response.data) {
            throw new Error("Invalid response structure");
          }
  
          const uniqueAmenities = response.data.uniqueAmenities;
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
      setSelectedAmenities((prev) =>
        prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity]
      );
    };
  
    const handleDone = async () => {
      try {
          if (selectedAmenities.length === 0) {
              await handleChangeStatus(bookingId, "completed");
          } else {
              console.log(selectedAmenities);
              await handleSendBrokenAmenities(bookingId, selectedAmenities);
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
  };
  
    console.log("Loading State:", loading);
  
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
                      onChange={() => handleCheckboxChange(amenity)}
                    />
                    {amenity}
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
  