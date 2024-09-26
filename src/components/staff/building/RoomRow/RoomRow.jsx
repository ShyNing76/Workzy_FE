
import React from 'react';

const RoomRow = ({ roomName, bookedTimes }) => {
    const isBooked = (hour) => {
        return Array.isArray(bookedTimes) && bookedTimes.includes(hour); 
    };

    return (
        <div className="room-row">
            <div className="room-name">{roomName}</div>
            <div className="room-times">
                {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className={`time-slot ${isBooked(i) ? 'booked' : ''}`}>
                        {i}:00
                    </div>
                ))}
            </div>
        </div>
    );
};


export default RoomRow;
