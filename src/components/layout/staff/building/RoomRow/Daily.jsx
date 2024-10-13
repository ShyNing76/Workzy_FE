import React, { useEffect, useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const Daily = ({ selectedStatus, workspaces, selectedDate }) => { 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
        const date = new Date(selectedDate);
        if (isNaN(date)) return; 

        const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
    }, [selectedDate]);

    const handleCellClick = (workspace, day) => {
        setSelectedRoom({ ...workspace, day });
        setModalOpen(true);
    };

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th>Workspace</th>
                        {daysInMonth.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {workspaces.map((workspace) => (
                        <tr key={workspace.workspace_id}>
                            <td>{workspace.workspace_name}</td> {/* Hiển thị tên workspace */}
                            {daysInMonth.map(day => (
                                <td
                                    key={day}
                                    onClick={() => handleCellClick(workspace, day)}
                                >
                                    N/A {/* Tạm thời để N/A cho trạng thái */}
                                </td>
                            ))}
                        </tr>
                    ))}
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

export default Daily;
