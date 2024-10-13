import React from 'react';
import AmenitiesDetail from '../Amenities/AmenitiesDetail';

const CheckAmenitiesModal = ({ booking, onCheckAmenities, onDone, onClose }) => {
    if (!booking) return null;

    const handleCheckboxChange = (amenitiesId) => {
        onCheckAmenities(amenitiesId);
    };

    const handleModalClick = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click trên modal
    };

    return (
        <dialog className='modal' open onClick={onClose}>
            <div className='modal-box' onClick={handleModalClick}>
                <h3 className='font-bold text-lg'>Select Amenities for {booking.workspacetype}</h3>
                <AmenitiesDetail
                    workspaceType={booking.workspacetype}
                    selectedAmenities={booking.amenitiesChecked}
                    onCheck={handleCheckboxChange}
                />
                <div className='modal-action'>
                    <button type="button" onClick={onDone}>Done</button>
                    <button type="button" onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

export default CheckAmenitiesModal;
