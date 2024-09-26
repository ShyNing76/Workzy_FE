import React, { useState } from 'react';
import './TimeGrid.scss';

const rooms = [
    {
        name: 'No 1',
        bookings: [
            { status: 'booked', hours: [3, 4, 5], days: [10], months: [1, 2] }, 
            { status: 'available', hours: [6, 7, 8], days: [4, 5, 6], months: [3, 4] },
            { status: 'in_use', hours: [10, 11], days: [1], months: [5] },
        ]
    },
    {
        name: 'No 2',
        bookings: [
            { status: 'available', hours: [], days: [30], months: [6] },
            { status: 'under_maintenance', hours: [23], days: [23], months: [7] }
        ]
    },
    {
        name: 'No 3',
        bookings: [
            { status: 'under_maintenance', hours: [8], days: [8], months: [8] }
        ]
    },
    {
        name: 'No 4',
        bookings: [
            { status: 'in_use', hours: [10, 11, 12, 15, 17], days: [10, 11], months: [9, 10] },
            { status: 'available', hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 16, 18, 19, 20, 21, 22, 23], days: [1, 2, 3], months: [11, 12] }
        ]
    },
];

const RoomRow = ({ roomName, bookings, viewType }) => {
    const getStatusForHour = (hour) => {
        const booking = bookings.find(b => Array.isArray(b.hours) && b.hours.includes(hour));
        return booking ? booking.status : 'available';
    };

    const getStatusForDay = (day) => {
        const booking = bookings.find(b => Array.isArray(b.days) && b.days.includes(day));
        return booking ? booking.status : 'available';
    };

    const getStatusForMonth = (month) => {
        const months = bookings.map(b => b.month); 
        const booking = bookings.find(b => Array.isArray(b.months) && b.months.includes(month));
        return booking ? booking.status : 'available';
    };

    return (
        <div className="room-row">
            <div className="room-name">{roomName}</div>
            <div className="room-times">
                {viewType === 'hourly' && Array.from({ length: 24 }, (_, i) => {
                    const statusClass = getStatusForHour(i);
                    return (
                        <div key={i} className={`time-slot ${statusClass}`}>
                            {i}:00
                        </div>
                    );
                })}
                {viewType === 'daily' && Array.from({ length: 31 }, (_, i) => {
                    const statusClass = getStatusForDay(i + 1);
                    return (
                        <div key={i} className={`time-slot ${statusClass}`}>
                            {i + 1}
                        </div>
                    );
                })}
                {viewType === 'monthly' && Array.from({ length: 12 }, (_, i) => {
                    const statusClass = getStatusForMonth(i + 1); 
                    return (
                        <div key={i} className={`time-slot ${statusClass}`}>
                            {i + 1}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const TimeGrid = ({ selectedStatus }) => {
    const [viewType, setViewType] = useState('hourly'); 

    const filteredRooms = rooms.filter((room) => {
        return selectedStatus === '' || room.bookings.some(b => b.status === selectedStatus);
    });

    return (
        <div className="time-grid ${selectedType}">
            <div className="control">
                <select 
                    id="type-select" 
                    value={viewType} 
                    onChange={(e) => setViewType(e.target.value)}
                >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <div className="grid-header">
                <div className="empty-cell"></div>
                <div className="time-headers">
                    {viewType === 'hourly' && Array.from({ length: 24 }, (_, i) => (
                        <div className="time-header" key={i}>{i}:00</div>
                    ))}
                    {viewType === 'daily' && Array.from({ length: 31 }, (_, i) => (
                        <div className="time-header" key={i}>{i + 1}</div>
                    ))}
                    {viewType === 'monthly' && Array.from({ length: 12 }, (_, i) => (
                        <div className="time-header" key={i}>{i + 1}</div>
                    ))}
                </div>
            </div>
            <div className="grid-body">
                {filteredRooms.map((room, index) => (
                    <RoomRow key={index} roomName={room.name} bookings={room.bookings} viewType={viewType} />
                ))}
            </div>
        </div>
    );
};

export default TimeGrid;
