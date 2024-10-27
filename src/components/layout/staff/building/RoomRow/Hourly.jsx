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
            const selectedDateString = new Date(selectedDate).toLocaleDateString('en-GB');
            
            // Chỉ kiểm tra giờ trong cùng ngày đã chọn và không bỏ qua các khoảng thời gian từ 00:00 đến trước 7:00
            return (
                bookingStart.toLocaleDateString('en-GB') <= selectedDateString &&
                bookingEnd.toLocaleDateString('en-GB') >= selectedDateString &&
                bookingStart.getHours() <= hour &&
                bookingEnd.getHours() >= hour
            );
        });
    
        setSelectedRoom({ workspace, hour });
        setBookingsForModal(bookings); // Cập nhật bookings cho modal
        setModalOpen(true); // Mở modal
    };
    
    
    // Lấy danh sách khoảng thời gian booking
    const getBookingRanges = (bookings, date) => {
        if (!Array.isArray(bookings)) return [];
    
        return bookings.reduce((acc, { startTime, endTime, status }) => {
            if (status === 'cancelled') return acc; // Bỏ qua booking có trạng thái cancelled
    
            const start = new Date(startTime);
            const end = new Date(endTime);
            const currentDate = new Date(date);
    
            // Định dạng ngày với múi giờ Việt Nam
            const currentDateString = currentDate.toLocaleDateString('en-GB');
            const startDateString = start.toLocaleDateString('en-GB');
            const endDateString = end.toLocaleDateString('en-GB');
    
            // Chỉ lấy booking trong ngày đã chọn và không tô ô ngày trước đó
            if (startDateString <= currentDateString && endDateString >= currentDateString) {
                const startHour = startDateString === currentDateString ? start.getHours() : 0;
                let endHour = endDateString === currentDateString ? end.getHours() - 1 : 23;
    
                // Nếu giờ kết thúc là 23:59, tô luôn ô giờ thứ 23
                if (end.getHours() === 23 && end.getMinutes() === 59) {
                    endHour = 23;
                }
    
                acc.push({
                    startHour,
                    endHour,
                    status // Lưu trạng thái vào khoảng thời gian booking
                });
            }
            return acc;
        }, []);
    };
    
    
    // Style ô dựa vào trạng thái booking
    const renderCellStyle = (isBooked, isStart, isEnd) => ({
        backgroundColor: isBooked ? '#90EE90' : 'white',
        padding: 0,
        border: '1px solid #ddd',
        borderRadius: isStart ? '15px 0 0 15px' : isEnd ? '0 15px 15px 0' : '0', // Bo góc trái khi là ô bắt đầu và phải khi là ô kết thúc
        cursor: isBooked ? 'pointer' : 'default',
    });

    const renderBookingCell = (workspace, hour, bookingRanges) => {
        // Tìm tất cả booking cho giờ hiện tại
        const bookingsAtHour = bookingRanges.filter(({ startHour, endHour }) => hour >= startHour && hour <= endHour);
        const isBooked = bookingsAtHour.length > 0; // Kiểm tra nếu có booking
        const isSingleBooking = bookingsAtHour.length === 1; // Kiểm tra nếu có đúng 1 booking
        const booking = isSingleBooking ? bookingsAtHour[0] : null; // Nếu có 1 booking, lấy nó
    
        const isStart = isSingleBooking && hour === booking.startHour; // Ô bắt đầu
        const isEnd = isSingleBooking && hour === booking.endHour; // Ô kết thúc
    
        // Tùy chỉnh màu sắc dựa trên trạng thái
        let cellColor = 'white'; // Mặc định là màu trắng
        if (isBooked) {
            const status = isSingleBooking ? booking.status : 'multi'; // Nếu có nhiều booking, gán trạng thái khác
            if (['confirm', 'paid', 'check-in'].includes(status)) {
                cellColor = '#90EE90'; // Màu xanh lá
            } else if (['usage', 'check-out', 'check-amenities'].includes(status)) {
                cellColor = '#ADD8E6'; // Màu xanh dương
            } else if (['damaged-payment'].includes(status)) {
                cellColor = '#F95454'; // Màu đỏ 
            } else if (['complete', 'cancelled'].includes(status)) {
                cellColor = 'white'; // Màu trắng
            }
        }
    
        return (
            <td
                key={`${workspace.workspace_id}-${hour}`}
                style={{
                    ...renderCellStyle(isBooked, isStart, isEnd),
                    position: 'relative',
                    backgroundColor: isBooked ? 'transparent' : 'white',
                    borderRadius: isStart && isEnd ? '15px' : isStart ? '15px 0 0 15px' : isEnd ? '0 15px 15px 0' : '0',
                }}
                onClick={() => isBooked && handleCellClick(workspace, hour)}
            >
                {isBooked && (
                    <div
                        style={{
                            backgroundColor: cellColor,
                            height: '75%', // Chiều cao của màu tô
                            width: '100%',
                            position: 'absolute',
                            top: '13%', // Điều chỉnh vị trí
                            borderRadius: isStart && isEnd ? '15px' : isStart ? '15px 0 0 15px' : isEnd ? '0 15px 15px 0' : '0',
                        }}
                    />
                )}
            </td>
        );
    };
    

    // Tính toán booking ranges cho tất cả workspaces
    const bookingRangesByWorkspace = useMemo(() => 
        workspaces.map(workspace => ({
            workspaceId: workspace.workspace_id,
            bookingRanges: getBookingRanges(workspace.bookings, selectedDate),
        })), 
        [workspaces, selectedDate]
        
    );

    useEffect(() => {
    }, [workspaces]);

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '120px' }}>Workspaces</th>
                        {hours.map(hour => (
                            <th key={hour}>{hour}:00</th>
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
