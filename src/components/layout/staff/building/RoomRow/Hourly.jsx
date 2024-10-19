import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import hook
import './RoomSchedule.scss';
import RoomModal from '../../building/RoomModal/RoomModal';
import { getWorkspaceByBuildingId } from '../../../../../config/api.staff';

const Hourly = ({ selectedDate, selectedStatus, workspaces, fetchBookingsApi }) => {
    // const { buildingId } = useOutletContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookings, setBookings] = useState({});
    const hours = [...Array(24).keys()];

    // useEffect(() => {
    //     // const fetchWorkspaces = async () => {
    //     //     try {
    //     //         const response = await getWorkspaceByBuildingId(buildingId); 
    //     //         if (response.data && response.data.err === 0) {
    //     //             setWorkspaces(response.data.data); 
    //     //         }
    //     //     } catch (error) {
    //     //         console.error('Error fetching workspaces:', error);
    //     //     }
    //     // };

    // }, [buildingId]); 

    // useEffect(() => {
    //     const fetchBookingsWorkspace = async () => {
    //         try {
    //             const fetchedBookings = await Promise.all(
    //                 workspaces.map(async (workspace) => {
    //                     const response = await fetchBookingsApi(workspace.workspace_id, selectedDate);
    //                     const data = await response.json();
    //                     return { workspaceId: workspace.workspace_id, bookings: data.bookings || [] };
    //                 })
    //             );

    //             const bookingsMap = fetchedBookings.reduce((acc, { workspaceId, bookings }) => {
    //                 acc[workspaceId] = bookings.map(booking => ({
    //                     startHour: new Date(booking.start_time_date).getHours(),
    //                     endHour: new Date(booking.end_time_date).getHours()
    //                 }));
    //                 return acc;
    //             }, {});

    //             setBookings(bookingsMap);
    //         } catch (error) {
    //             console.error('Error fetching bookings:', error);
    //         }
    //     };

    //     if (workspaces.length > 0) {
    //         fetchBookingsWorkspace();
    //     }
    // }, [selectedDate, workspaces, fetchBookingsApi]);

    const handleCellClick = (workspace, hour) => {
        setSelectedRoom({ ...workspace, hour });
        setModalOpen(true);
    };

    const getStatusColor = (workspaceId, hour) => {
        const workspaceBookings = bookings[workspaceId] || [];
        
        for (const { startHour, endHour } of workspaceBookings) {
            if (hour >= startHour && hour < endHour) {
                return 'rgba(76, 252, 56, 0.5)';
            }
        }

        return 'transparent';
    };
    console.log(workspaces)

    return (
        <div className='room-schedule'>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '110px'}}>Workspace</th>
                        {hours.map(hour => (
                            <th key={hour}>{hour}:00</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {workspaces.map((workspace) => (
                        <tr key={workspace.workspace_id}>
                            <td>{workspace.workspace_name}</td>
                            {hours.map((hour) => {
                                // Initialize `isBooked` to false for the current hour
                                let isBooked = false;
                                let start = false;
                                let end = false;

                                // Check if bookings exist and iterate safely
                                if (Array.isArray(workspace.bookings)) {
                                    for (const booking of workspace.bookings) {
                                        const startHour = new Date(booking.startTime).getHours();
                                        const endHour = new Date(booking.endTime).getHours();
                                        if (startHour <= hour && hour <= endHour) {
                                            if (startHour == hour){
                                                start = true;
                                            }
                                            if(endHour == hour) {
                                                end = true;
                                            }
                                            isBooked = true;
                                            break; 
                                        }
                                        
                                    }
                                }

                                const borderRadiusStyle = {
                                    margin:"0px 2px",
                                    borderRadius: `${start ? '10px 0 0 10px' : ''} ${end ? '0 10px 10px 0' : ''}`.trim()
                                };

                                const cellStyle = {
                                    backgroundColor: isBooked ? '#90EE90' : 'white',
                                    padding: 0, 
                                    border: isBooked ? '0px' : '1px solid #ddd', // Remove gap effect
                                    ...borderRadiusStyle,
                                };

                                return (
                                    <td
                                        key={`${workspace.workspace_id}-${hour}`}
                                        style={{ ...cellStyle }} // Green if booked, white otherwise
                                        onClick={() => handleCellClick(workspace, hour)}
                                    >
                                    </td>
                                );
                            })}
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

export default Hourly;
