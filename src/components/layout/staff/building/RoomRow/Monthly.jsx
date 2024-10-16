import React, { useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const Monthly = ({ selectedStatus, workspaces = [] }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleCellClick = (workspace, month) => {
        setSelectedRoom({ ...workspace, month });
        setModalOpen(true);
    };

    // Kiểm tra dữ liệu đầu vào
    if (!Array.isArray(workspaces)) {
        console.error("workspaces is not an array", workspaces);
        return <div>Không có dữ liệu</div>;
    }

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '110px'}}>Workspace</th>
                        {months.map((month, index) => (
                            <th key={index}>{month}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {workspaces.length > 0 ? (
                        workspaces.map((workspace) => {
                            // Nếu statuses không tồn tại hoặc không phải là mảng, gán giá trị mặc định
                            const statuses = Array.isArray(workspace.statuses) && workspace.statuses.length === 12 
                                ? workspace.statuses 
                                : Array(12).fill(''); // Mảng mặc định với 12 phần tử N/A

                            return (
                                <tr key={workspace.workspace_id}>
                                    <td>{workspace.workspace_name}</td>
                                    {months.map((month, index) => (
                                        <td
                                            key={index}
                                            style={{ backgroundColor: 'transparent' }} // Màu nền tạm thời
                                            onClick={() => handleCellClick(workspace, month)}
                                        >
                                            {statuses[index]} {/* Hiển thị trạng thái hoặc N/A */}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={months.length + 1}>Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {modalOpen && (
                <RoomModal 
                    isOpen={modalOpen} 
                    onClose={() => setModalOpen(false)} 
                    room={selectedRoom} 
                />
            )}
        </div>
    );
};

export default Monthly;
