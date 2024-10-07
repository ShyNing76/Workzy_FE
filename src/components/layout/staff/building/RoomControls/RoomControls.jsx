import React, { useEffect, useState } from 'react';
import './RoomControls.scss'; 
import TimeSlot from '../RoomRow/TimeSlot';
import Daily from '../RoomRow/Daily';
import Monthly from '../RoomRow/Monthly';

const RoomControls = ({ selectedStatus, setSelectedStatus, selectedType, setSelectedType, selectedDate, setSelectedDate }) => {
    const [currentDate, setCurrentDate] = useState('');
    const [workspaceType, setWorkspaceType] = useState('Single POD'); 

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0]; 
        setCurrentDate(today);
        setSelectedDate(today); 
    }, [setSelectedDate]); 

    const renderTable = () => {
        switch (selectedType) {
            case 'hourly':
                return <TimeSlot selectedDate={selectedDate} selectedStatus={selectedStatus} workspaceType={workspaceType} />; 
            case 'daily':
                return <Daily selectedDate={selectedDate} selectedStatus={selectedStatus} workspaceType={workspaceType} />;  
            case 'monthly':
                return <Monthly selectedDate={selectedDate} selectedStatus={selectedStatus} workspaceType={workspaceType} />; 
            default:
                return null;
        }
    };

    return (
        <div className="room-controls-wrapper" style={{ width: '100%' }}>
            <div className="room-controls">
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="status-select">Select Status</label>
                        <select 
                            id="status-select" 
                            value={selectedStatus} 
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                            <option value="in_use">In Process</option>
                            <option value="under_maintenance">Under Maintenance</option>
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="workspace-type-select">Select Workspace Type</label>
                        <select 
                            id="workspace-type-select" 
                            value={workspaceType} 
                            onChange={(e) => setWorkspaceType(e.target.value)} 
                        >
                            <option value="Single POD">Single POD</option>
                            <option value="Double POD">Double POD</option>
                            <option value="Quad POD">Quad POD</option>
                            <option value="Working Room">Working Room</option>
                            <option value="Meeting Room">Meeting Room</option>
                            <option value="Event Space">Event Space</option>
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="type-select">Select Booking Type</label>
                        <select 
                            id="type-select" 
                            value={selectedType} 
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="hourly">TimeSlot</option>
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="date-picker">Select Date</label>
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
                <div className="table-container">
                    {renderTable()}
                </div>
                <div className="status-legend">
                    <div className="status-item">
                        <div className="status-color" style={{ backgroundColor: '#D9D9D9' }}></div>
                        <div className="status-label">Available</div>
                    </div>
                    <div className="status-item">
                        <div className="status-color" style={{ backgroundColor: '#4CFC38' }}></div>
                        <div className="status-label">Booked</div>
                    </div>
                    <div className="status-item">
                        <div className="status-color" style={{ backgroundColor: '#379CFA' }}></div>
                        <div className="status-label">In Process</div>
                    </div>
                    <div className="status-item">
                        <div className="status-color" style={{ backgroundColor: '#FF0000' }}></div>
                        <div className="status-label">Under Maintenance</div>
                    </div>
                </div>
            </div>
        </div>
    );
};    

export default RoomControls;
