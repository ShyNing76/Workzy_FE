import React from 'react';
import { FaCoffee, FaWifi, FaPrint, FaTv, FaPhone, FaChalkboard, FaVideo } from 'react-icons/fa';
import './AmenitiesIcon.scss';

const amenitiesIconMap = {
"Coffee and Tea": <FaCoffee />,
"Wifi": <FaWifi />,
"Printer": <FaPrint />,
"Screen": <FaTv />,
"Telephone for room": <FaPhone />,
"White board": <FaChalkboard />,
"Projector": <FaVideo />,
};

const workspaceAmenitiesMap = {
"Single POD": ["Coffee and Tea", "Wifi"],
"Double POD": ["Coffee and Tea", "Wifi"],
"Quad POD": ["Coffee and Tea", "Wifi", "Printer"],
"Working Room": ["Coffee and Tea", "Wifi", "Printer", "Screen", "Telephone for room", "White board"],
"Meeting Room": ["Coffee and Tea", "Wifi", "Printer", "Screen", "Telephone for room", "White board", "Projector"],
"Event Space": ["Coffee and Tea", "Wifi", "Screen", "White board", "Projector"],
};

const AmenitiesIcon = ({ workspaceType }) => {
const amenities = workspaceAmenitiesMap[workspaceType] || [];

return (
    <div className="amenities-icons">
        {amenities.map((amenity, idx) => (
            <div key={idx} className="amenity-icon" title={amenity}>
                {amenitiesIconMap[amenity]}
            </div>
        ))}
    </div>
);


};

export default AmenitiesIcon;