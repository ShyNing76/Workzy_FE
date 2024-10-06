import React, { useEffect, useState } from 'react';
import './RoomSchedule.scss';

const Daily = ({ selectedDate, selectedStatus }) => {
    const [roomStatus, setRoomStatus] = useState({});
    
    const rooms = ['No 1', 'No 2', 'No 3', 'No 4', 'No 5'];

    const monthDays = {
        1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
        7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
    };

    useEffect(() => {
        const selectedMonth = new Date(selectedDate).getMonth() + 1;
        const daysInMonth = monthDays[selectedMonth];
        const newRoomStatus = generateRoomStatus(daysInMonth);
        setRoomStatus(newRoomStatus);
    }, [selectedDate]);

    const generateRoomStatus = (daysInMonth) => {
        const statusOptions = ['available', 'booked', 'in_use', 'under_maintenance'];
        const generatedStatus = {};

        rooms.forEach(room => {
            generatedStatus[room] = Array.from({ length: daysInMonth }, () => {
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
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {Array.from({ length: monthDays[new Date(selectedDate).getMonth() + 1] }, (_, i) => i + 1).map((day) => (
                            <th key={day}>{day}</th>
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


export default Daily;
