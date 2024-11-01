import React, { useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const Monthly = ({ selectedDate, workspaces = [] }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingsForModal, setBookingsForModal] = useState([]);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const selectedDateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
    const selectedMonth = selectedDateObj.getMonth();
    const selectedYear = selectedDateObj.getFullYear();

    const isValidBooking = (booking, monthIndex) => {
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
        const bookingDuration = (end - start) / (1000 * 60 * 60 * 24);

        return (
            booking.status !== 'completed' &&
            booking.status !== 'cancelled' &&
            bookingDuration >= 30 &&
            start.getMonth() <= monthIndex &&
            end.getMonth() >= monthIndex &&
            start.getFullYear() <= selectedYear &&
            end.getFullYear() >= selectedYear &&
            (
                (start.getDate() === 1 || start.getHours() === 0) ||
                (start.getMonth() === monthIndex && start.getFullYear() === selectedYear) ||
                (end.getMonth() === monthIndex && end.getFullYear() === selectedYear)
            )
        );
    };

    const handleCellClick = (workspace, monthIndex) => {
        setSelectedRoom(workspace);
        setModalOpen(true);
        
        const filteredBookings = (workspace.bookings || []).filter(booking => 
            isValidBooking(booking, monthIndex)
        );
        
        setBookingsForModal(filteredBookings);
    };

    const checkIfMonthlyBooking = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const bookingDuration = (end - start) / (1000 * 60 * 60 * 24);
    
        if (bookingDuration < 30) {
            return false; 
        }
    
        const isSpanningMonths = (start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear());
    
        return (
            (isSpanningMonths && 
                (start.getDate() === 1 || start.getHours() === 0)) ||
            (start.getMonth() === selectedMonth && start.getFullYear() === selectedYear) ||
            (end.getMonth() === selectedMonth && end.getFullYear() === selectedYear)
        );
    };    
    
    const getCellStyleAndRender = (bookings, monthIndex) => {
        let startOffset = 0,
            endOffset = 0,
            endTimeForMonth = null;
        let status = null;
        let isClickable = false;
    
        bookings.forEach(({ startTime, endTime, status: bookingStatus }) => {
            const start = new Date(startTime);
            const end = new Date(endTime);
    
            if (
                checkIfMonthlyBooking(startTime, endTime) &&
                start.getFullYear() <= selectedYear &&
                end.getFullYear() >= selectedYear &&
                start.getMonth() <= monthIndex &&
                end.getMonth() >= monthIndex &&
                bookingStatus !== 'completed' &&
                bookingStatus !== 'cancelled'
            ) {
                startOffset = start.getMonth() === monthIndex ? start.getDate() : 1;
                endOffset = end.getMonth() === monthIndex
                    ? end.getDate()
                    : new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
                endTimeForMonth = end;
                if (!status || end >= endTimeForMonth) {
                    status = bookingStatus;
                }
                isClickable = true;
            }
        });
    
        let cellColor = 'white';
        if (status === 'confirm' || status === 'paid' || status === 'check-in') {
            cellColor = '#85F685';
        } else if (status === 'usage' || status === 'check-out' || status === 'check-amenities' || status === 'damaged-payment') {
            cellColor = '#85C1F6';
        }
    
        return {
            startOffset,
            endOffset,
            endTimeForMonth,
            isClickable,
            style: {
                position: 'absolute',
                backgroundColor: cellColor,
                height: '75%',
                width: `${((endOffset - startOffset + 1) / 30) * 100}%`,
                left: `${((startOffset - 1) / 30) * 100}%`,
                top: '12%',
                borderRadius: endTimeForMonth && endOffset === new Date(
                    endTimeForMonth.getFullYear(),
                    endTimeForMonth.getMonth() + 1, 0
                ).getDate()
                    ? '10px 0 0 10px'
                    : startOffset === 1
                        ? '0 10px 10px 0'
                        : '0',
            }
        };
    };

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '140px' }}>Workspaces</th>
                        {months.map((month, index) => (
                            <th key={index} style={{ fontSize: '0.90rem', textAlign: 'center' }}>{month}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {workspaces.length > 0 ? (
                        workspaces.map(workspace => {
                            const bookingsForWorkspace = workspace.bookings || [];

                            return (
                                <tr key={workspace.workspace_id}>
                                    <td>{workspace.workspace_name}</td>
                                    {months.map((_, index) => {
                                        const { startOffset, endOffset, endTimeForMonth, style, isClickable } = getCellStyleAndRender(
                                            bookingsForWorkspace, index
                                        );

                                        return (
                                            <td
                                                key={index}
                                                style={{ position: 'relative' }}
                                                onClick={isClickable ? () => handleCellClick(workspace, index) : null}  
                                            >
                                                {startOffset > 0 && endOffset > 0 && (
                                                    <div style={style} />
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={months.length + 1}></td>
                        </tr>
                    )}
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

export default Monthly;