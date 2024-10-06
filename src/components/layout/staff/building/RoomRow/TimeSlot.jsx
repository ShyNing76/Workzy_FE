import React, { useEffect, useState } from 'react';
import './RoomSchedule.scss';

const TimeSlot = ({ selectedDate, selectedStatus }) => {
    const [roomStatus, setRoomStatus] = useState({});
    const rooms = ['No 1', 'No 2', 'No 3', 'No 4', 'No 5'];
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

    useEffect(() => {
        const generatedStatus = generateRoomStatus();
        setRoomStatus(generatedStatus);
    }, [selectedDate]); 

    const generateRoomStatus = () => {
        const statusOptions = ['available', 'booked', 'in_use', 'under_maintenance'];
        const generatedStatus = {};

        rooms.forEach(room => {
            generatedStatus[room] = Array.from({ length: 24 }, () => {
                return statusOptions[Math.floor(Math.random() * statusOptions.length)];
            });
        });

        return generatedStatus;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'available':
                return '#D9D9D9'; 
            case 'booked':
                return 'rgba(76, 252, 56, 0.5)'; 
            case 'in_use':
                return 'rgba(55, 156, 250, 0.5)'; 
            case 'under_maintenance':
                return 'rgba(255, 0, 0, 0.5)'; 
            default:
                return 'transparent'; 
        }
    };

    return (
        <div className="room-schedule">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {hours.map((hour) => (
                            <th key={hour}>{hour}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room}>
                            <td>{room}</td>
                            {roomStatus[room]?.map((status, index) => {
                                if (selectedStatus && selectedStatus !== status) {
                                    return <td key={index} style={{ backgroundColor: 'transparent' }}></td>;
                                }
                                return <td key={index} style={{ backgroundColor: getStatusColor(status) }}></td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default TimeSlot;
