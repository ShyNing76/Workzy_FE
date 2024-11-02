import React, { useState, useEffect, useMemo } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const Hourly = ({ selectedDate, workspaces}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingsForModal, setBookingsForModal] = useState([]);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    const handleCellClick = (workspace, hour) => {
        const bookings = workspace.bookings.filter(booking => {
            const bookingStart = new Date(booking.startTime);
            const bookingEnd = new Date(booking.endTime);
            const selectedDateStart = new Date(selectedDate).setHours(0, 0, 0, 0);
            const selectedDateEnd = new Date(selectedDate).setHours(23, 59, 59, 999);
    
            return (
                (bookingStart <= selectedDateEnd && bookingEnd >= selectedDateStart) &&
                bookingStart.getHours() <= hour && bookingEnd.getHours() >= hour
            );
        });
    
        // Check if any booking at this hour is "completed" or "cancelled"
        const isNonClickable = bookings.some(({ status }) => 
            status === 'completed' || status === 'cancelled'
        );
    
        // Open modal only if the booking is clickable
        if (!isNonClickable) {
            setSelectedRoom({ workspace, hour });
            setBookingsForModal(bookings);
            setModalOpen(true);
        }
    };   
    
    const getBookingRanges = (bookings, date) => {
        if (!Array.isArray(bookings)) return [];
    
        const currentDateStart = new Date(date).setHours(0, 0, 0, 0);
        const currentDateEnd = new Date(date).setHours(23, 59, 59, 999);
    
        return bookings.reduce((acc, { startTime, endTime, status }) => {
            if (status === 'cancelled') return acc;
    
            const start = new Date(startTime);
            const end = new Date(endTime);
    
            if (start <= currentDateEnd && end >= currentDateStart) {
                const isStartDate = start.toDateString() === new Date(date).toDateString();
                const isEndDate = end.toDateString() === new Date(date).toDateString();
                
                acc.push({
                    startHour: start < currentDateStart ? 0 : start.getHours(),
                    endHour: end > currentDateEnd ? 23 : end.getHours(),
                    status,
                    isActualStart: isStartDate,
                    isActualEnd: isEndDate
                });
            }
            return acc;
        }, []);
    };    

    const renderBookingCell = (workspace, hour, bookingRanges) => {
        const bookingsAtHour = bookingRanges.filter(({ startHour, endHour }) => 
            hour >= startHour && hour <= endHour
        );
        const isBooked = bookingsAtHour.length > 0;
        const isSingleBooking = bookingsAtHour.length === 1;
        const booking = isSingleBooking ? bookingsAtHour[0] : null;
        
        const isStart = isSingleBooking && hour === booking.startHour && booking.isActualStart;
        const isEnd = isSingleBooking && hour === booking.endHour && booking.isActualEnd;
    
        let cellColor = 'white';
        let isClickable = true; // Default to clickable
    
        if (isBooked) {
            const status = isSingleBooking ? booking.status : 'multi';
            if (['confirm', 'paid', 'check-in'].includes(status)) {
                cellColor = '#90EE90';
            } else if (['usage', 'check-out', 'check-amenities'].includes(status)) {
                cellColor = '#ADD8E6';
            } else if (['damaged-payment'].includes(status)) {
                cellColor = '#F95454';
            } else if (['complete', 'cancelled'].includes(status)) {
                cellColor = 'white';
                isClickable = false; // Disable clicking for completed/cancelled bookings
            }
        }
    
        return (
            <td
                key={`${workspace.workspace_id}-${hour}`}
                style={{
                    position: 'relative',
                    backgroundColor: isBooked ? 'transparent' : 'white',
                    padding: 0,
                    border: '1px solid #ddd',
                    cursor: isClickable && isBooked ? 'pointer' : 'default',
                }}
                onClick={() => isClickable && isBooked && handleCellClick(workspace, hour)}
            >
                {isBooked && (
                    <div
                        style={{
                            backgroundColor: cellColor,
                            height: '75%',
                            width: '100%',
                            position: 'absolute',
                            top: '13%',
                            borderRadius: isStart && isEnd ? '15px' : 
                                        isStart ? '15px 0 0 15px' : 
                                        isEnd ? '0 15px 15px 0' : '0',
                        }}
                    />
                )}
            </td>
        );
    };

    const bookingRangesByWorkspace = useMemo(() => 
        workspaces.map(workspace => ({
            workspaceId: workspace.workspace_id,
            bookingRanges: getBookingRanges(workspace.bookings, selectedDate),
        })), 
        [workspaces, selectedDate]
    );

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '140px' }}>Workspaces</th>
                        {hours.map(hour => (
                            <th key={hour} style={{ fontSize: '0.90rem', textAlign: 'center' }}>{hour}:00</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bookingRangesByWorkspace.map(({ workspaceId, bookingRanges }) => {
                        const workspace = workspaces.find(ws => ws.workspace_id === workspaceId);
                        return (
                            <tr key={workspaceId}>
                                <td>{workspace.workspace_name}</td>
                                {hours.map(hour => renderBookingCell(workspace, hour, bookingRanges))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {modalOpen && (
                <RoomModal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    bookings={bookingsForModal} 
                />
            )}
        </div>
    );
};

export default Hourly;
