import React, { useEffect, useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const TimeSlot = ({ selectedDate, selectedStatus, workspaces  }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const hours = [...Array(24).keys()];

    
    const handleCellClick = (workspace, hour) => {
        setSelectedRoom({ ...workspace, hour });
        setModalOpen(true);
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
                        <th>Workspace</th>
                        {hours.map(hour => (
                            <th key={hour}>{hour}:00</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {workspaces.map((workspace) => (
                    <tr key={workspace.workspace_id}>
                        <td>{workspace.workspace_name}</td>
                        {hours.map(hour => (
                            <td 
                                key={`${workspace.workspace_id}-${hour}`}
                                style={{ backgroundColor: getStatusColor(workspace.statuses ? workspace.statuses[hour] : undefined) }}
                                onClick={() => handleCellClick(workspace, hour)}
                            >
                                {workspace.statuses ? workspace.statuses[hour] : 'N/A'}
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

export default TimeSlot;
