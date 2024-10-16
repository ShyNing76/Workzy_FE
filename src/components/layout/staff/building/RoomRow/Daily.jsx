import React, { useEffect, useState } from 'react';
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';

const Daily = ({ selectedStatus, workspaces, selectedDate }) => { 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        const date = new Date(selectedDate);
        if (isNaN(date)) return; 

        // goi api /api/v1/booking/get/workspace_id=....&date
        /*
            => [{
                booking_id: 
                workspace_id: 1
                start_time_date:1
                end_time_date:3
                status:
                },{
                booking_id: 
                workspace_id: 1
                start_time_date:3
                end_time_date:5
                status:
                },{
                booking_id: 
                workspace_id: 1
                start_time_date:
                end_time_date:
                status:
                },{
                booking_id: 
                workspace_id: 
                start_time_date:
                end_time_date:
                status:
                }]
        */

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
                        <th style={{ width: '110px'}}>Workspace</th>
                        {daysInMonth.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {workspaces.map((workspace) => (
                        <tr key={workspace.workspace_id}>
                            <td>{workspace.workspace_name}</td> 
                            {daysInMonth.map(day => (
                                <td
                                    key={day}
                                    onClick={() => handleCellClick(workspace, day)}
                                >
                                    
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
