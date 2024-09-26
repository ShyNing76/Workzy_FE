import React, { useState } from "react";
import RoomControls from "../../../components/staff/building/RoomControls/RoomControls";
import TimeGrid from "../../../components/staff/building/timegrid/TimeGrid";
import './BuildingRoomPage.scss'; 

const BuildingRoomPage = () => {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedType, setSelectedType] = useState('hourly');
    const [selectedDate, setSelectedDate] = useState('');

    return (
        <div>
            <RoomControls 
                selectedStatus={selectedStatus} 
                setSelectedStatus={setSelectedStatus} 
                selectedType={selectedType} 
                setSelectedType={setSelectedType} 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
            />
            <br/>
            <TimeGrid selectedStatus={selectedStatus} />
        </div>
    );
}

export default BuildingRoomPage;
