import React from "react";

const AmenitiesDetail = ({ workspaceType, selectedAmenities = [], onCheck }) => {
    const amenitiesList = {
        "Single POD": ["Coffee and Tea", "Wifi"],
        "Double POD": ["Coffee and Tea", "Wifi"],
        "Quad POD": ["Coffee and Tea", "Wifi", "Printer"],
        "Working Room": ["Coffee and Tea", "Wifi", "Printer", "Screen", "Telephone for room", "White board"],
        "Meeting Room": ["Coffee and Tea", "Wifi", "Printer", "Screen", "Telephone for room", "White board", "Projector"],
        "Event Space": ["Coffee and Tea", "Wifi", "Screen", "White board", "Projector"],
    };

    const amenities = amenitiesList[workspaceType] || [];

    const handleCheckboxChange = (event) => {
        const amenity = event.target.value;
        onCheck(amenity);
    };

    return (
        <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {amenities.map((amenity, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                        <label>
                            <input
                                type="checkbox"
                                value={amenity}
                                checked={selectedAmenities.includes(amenity)} // Kiểm tra xem amenity đã được chọn chưa
                                onChange={handleCheckboxChange}
                            />
                            {amenity}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AmenitiesDetail;
