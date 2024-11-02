import React, { useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const Daily = ({ selectedDate, workspaces }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingsForModal, setBookingsForModal] = useState([]);

    const dateObj = new Date(selectedDate);
    const daysInMonth = [...Array(new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, 0).getDate()).keys()].map(i => i + 1);

    const checkIfBooked = (bookings, day) => {
        if (!Array.isArray(bookings) || bookings.length === 0) return [];

        const startOfDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), day);
        const endOfDay = new Date(dateObj.getFullYear(), dateObj.getMonth(), day + 1);

        return bookings.filter(booking => {
            const startTime = new Date(booking.startTime);
            const endTime = new Date(booking.endTime);

            // Exclude completed or cancelled bookings
            if (booking.status === 'completed' || booking.status === 'cancelled') {
                return false;
            }

            return (endTime - startTime >= 24 * 60 * 60 * 1000) && 
                   (startTime < endOfDay && endTime >= startOfDay);
        });
    };

    const getCellStyle = (bookings, day) => {
        const bookedSlots = checkIfBooked(bookings, day);
    
        if (bookedSlots.length === 0) {
            return { backgroundColor: 'white', padding: 0, border: '1px solid #ddd', position: 'relative' };
        }
    
        const startTime = new Date(bookedSlots[0].startTime);
        const endTime = new Date(bookedSlots[0].endTime);
    
        const isStartOfBooking = day === startTime.getDate() && startTime.getMonth() === dateObj.getMonth();
        const isEndOfBooking = day === endTime.getDate() && endTime.getMonth() === dateObj.getMonth();
    
        return {
            padding: 0,
            border: '1px solid #ddd',
            position: 'relative',
            borderRadius: `${isStartOfBooking ? '15px 0 0 15px' : ''} ${isEndOfBooking ? '0 15px 15px 0' : ''}`.trim(),
            backgroundColor: bookedSlots.length > 0 ? 'transparent' : 'white',
        };
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirm':
            case 'paid':
            case 'check-in':
                return '#90EE90';
            case 'usage':
            case 'check-out':
            case 'check-amenities':
                return '#ADD8E6';
            case 'damaged-payment':
                return '#F95454';
            default:
                return 'transparent';
        }
    };

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '140px' }}>Workspaces</th>
                        {daysInMonth.map(day => (
                            <th key={day} style={{ fontSize: '0.90rem', textAlign: 'center' }}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {workspaces.map((workspace) => {
                        const bookingsForWorkspace = workspace.bookings || [];

                        return (
                            <tr key={workspace.workspace_id}>
                                <td>{workspace.workspace_name}</td>
                                {daysInMonth.map((day) => {
                                    const cellStyle = getCellStyle(bookingsForWorkspace, day);
                                    const bookedSlots = checkIfBooked(bookingsForWorkspace, day);
                                    const statusColor = bookedSlots.length > 0 ? getStatusColor(bookedSlots[0].status) : 'transparent';

                                    return (
                                        <td
                                            key={`${workspace.workspace_id}-${day}`}
                                            style={{
                                                ...cellStyle,
                                                position: 'relative'
                                            }}
                                            onClick={() => {
                                                if (bookedSlots.length > 0) {
                                                    setSelectedRoom(workspace);
                                                    setBookingsForModal(bookedSlots);
                                                    setModalOpen(true);
                                                }
                                            }}
                                        >
                                            {bookedSlots.length > 0 && (
                                                <div
                                                    style={{
                                                        backgroundColor: statusColor,
                                                        height: '75%', 
                                                        width: '100%',
                                                        position: 'absolute',
                                                        top: '13%', 
                                                        left: 0,
                                                        borderRadius: cellStyle.borderRadius,
                                                    }}
                                                />
                                            )}
                                        </td>
                                    );
                                })}
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

export default Daily;
