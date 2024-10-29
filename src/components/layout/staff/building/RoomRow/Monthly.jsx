import React, { useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const Monthly = ({ selectedStatus, workspaces = [] }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingsForModal, setBookingsForModal] = useState([]);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleCellClick = (workspace) => {
        setSelectedRoom(workspace);
        setModalOpen(true);
        setBookingsForModal(bookings);
    };

    const checkIfMonthlyBooking = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
    
        // Kiểm tra nếu khoảng thời gian là ít nhất 1 tháng
        const oneMonthLater = new Date(start);
        oneMonthLater.setMonth(start.getMonth() + 1);
    
        return end >= oneMonthLater && end.getDate() === start.getDate();
    };    

    const getCellStyleAndRender = (bookings, monthIndex) => {
        let startOffset = 0, endOffset = 0, endTimeForMonth = null;
        let status = null;

        bookings.forEach(({ startTime, endTime, status: bookingStatus }) => {
            const start = new Date(startTime);
            const end = new Date(endTime);
    
            // Chỉ xét những booking kéo dài ít nhất 1 tháng
            if (checkIfMonthlyBooking(startTime, endTime)) {
                if (start.getMonth() <= monthIndex && end.getMonth() >= monthIndex) {
                    startOffset = start.getMonth() === monthIndex ? start.getDate() : 1;
                    endOffset = end.getMonth() === monthIndex
                        ? end.getDate()
                        : new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate();
                    endTimeForMonth = end;
                }
                if (!status || end >= endTimeForMonth) {
                    status = bookingStatus; // Lưu status đúng cho ô
                }
            }
        });

        // Xác định màu sắc dựa trên trạng thái
        let cellColor = 'white'; // Mặc định là màu trắng
        if (status === 'confirm' || status === 'paid' || status === 'check-in') {
            cellColor = '#85F685'; // Màu xanh lá cho booked
        } else if (status === 'usage' || status === 'check-out' || status === 'check-amenities' || status === 'damamed-payment') {
            cellColor = '#85C1F6'; // Màu xanh dương cho in use
        }
    
        return {
            startOffset,
            endOffset,
            endTimeForMonth,
            style: {
                position: 'absolute',
                backgroundColor: cellColor, // Sử dụng màu theo trạng thái
                height: '75%',
                width: `${((endOffset - startOffset + 1) / 30) * 100}%`,
                left: `${((startOffset - 1) / 30) * 100}%`,
                top: '12%', // Điều chỉnh căn giữa màu tô theo trục dọc
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
                        <th style={{ width: '120px' }}>Workspaces</th>
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
                                        const { startOffset, endOffset, endTimeForMonth, style } = getCellStyleAndRender(
                                            bookingsForWorkspace, index
                                        );

                                        return (
                                            <td
                                                key={index}
                                                style={{ position: 'relative' }}
                                                onClick={() => handleCellClick(workspace)}
                                            >
                                                {startOffset > 0 && endOffset > 0 && (
                                                    <div
                                                        style={style} // Sử dụng style đã tính toán
                                                    />
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
