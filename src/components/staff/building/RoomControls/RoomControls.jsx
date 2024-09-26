import React, { useEffect, useState } from 'react';
import './RoomControls.scss'; 

const RoomControls = ({ selectedStatus, setSelectedStatus, selectedType, setSelectedType, selectedDate, setSelectedDate }) => {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; 
        setCurrentDate(today);
        setSelectedDate(today); 
    }, [setSelectedDate]); 

    return (
        <div className="room-controls">
            <div className="control">
                <select 
                    id="status-select" 
                    value={selectedStatus} 
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value=""> Select Status </option>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                    <option value="in_use">InProcess</option>
                    <option value="under_maintenance">Under Maintenance</option>
                </select>
            </div>
            <div className="control">
                <input 
                    type="date" 
                    id="date-picker" 
                    value={currentDate} 
                    onChange={(e) => {
                        setCurrentDate(e.target.value);
                        setSelectedDate(e.target.value); 
                    }} 
                />
            </div>
        </div>
    );
};

export default RoomControls;
