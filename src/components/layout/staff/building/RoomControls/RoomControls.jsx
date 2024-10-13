import React, { useEffect, useState } from 'react';
import './RoomControls.scss'; 
import Hourly from '../RoomRow/Hourly';
import Daily from '../RoomRow/Daily';
import Monthly from '../RoomRow/Monthly';
import { getWorkspaceByBuildingId, getStaffBuildingId } from '../../../../../config/api.staff';

const RoomControls = ({ selectedStatus, setSelectedStatus, selectedType, setSelectedType, selectedDate, setSelectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]); 
    const [workspaceType, setWorkspaceType] = useState(''); 
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
    const [workspaces, setWorkspaces] = useState([]); 
    const [workspaceTypes, setWorkspaceTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null); // Thêm state cho workspace được chọn

    useEffect(() => {
        const fetchBuildingAndWorkspaces = async () => {
            try {
                const buildingResponse = await getStaffBuildingId();
                if (buildingResponse && buildingResponse.err === 0) {
                    const buildingId = buildingResponse.data.building_id;
                    await fetchWorkspaces(buildingId);
                }
            } catch (error) {
                console.error('Error when getting building_id:', error);
            }
        };

        fetchBuildingAndWorkspaces();
    }, []);

    const fetchWorkspaces = async (id) => {
        try {
            const response = await getWorkspaceByBuildingId(id);
            if (response && response.err === 0) {
                setWorkspaces(response.data); 
                const types = [...new Set(response.data.map(ws => ws.WorkspaceType.workspace_type_name))];
                setWorkspaceTypes(types);
            }
        } catch (error) {
            console.error('Error when fetching workspaces:', error);
        }
    };

    const getDateInputType = () => {
        switch (selectedType) {
            case 'hourly':
                return 'date';
            case 'daily':
                return 'month';
            case 'monthly':
                return 'number';
            default:
                return 'date';
        }
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        if (selectedType === 'monthly') {
            setSelectedYear(value);
        } else {
            setCurrentDate(value);
            setSelectedDate(value);
        }
    };

    const handleWorkspaceClick = (workspace) => {
        setSelectedWorkspace(workspace); // Cập nhật workspace được chọn
        setIsModalOpen(true); // Mở modal
    };

    const renderTable = () => {
        switch (selectedType) {
            case 'hourly':
                return <Hourly selectedDate={currentDate} selectedStatus={selectedStatus} workspaces={filteredWorkspaces()} onWorkspaceClick={handleWorkspaceClick} />;
            case 'daily':
                return <Daily selectedDate={currentDate} selectedStatus={selectedStatus} workspaces={filteredWorkspaces()} onWorkspaceClick={handleWorkspaceClick} />;
            case 'monthly':
                return <Monthly selectedStatus={selectedStatus} workspaces={filteredWorkspaces()} onWorkspaceClick={handleWorkspaceClick} />;
            default:
                return null;
        }
    };

    const filteredWorkspaces = () => {
        return workspaceType ? workspaces.filter(workspace => workspace.WorkspaceType.workspace_type_name === workspaceType) : workspaces;
    };

    return (
        <div className="room-controls-wrapper" style={{ width: '100%' }}>
            <div className="room-controls">
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="status-select">Select Status</label>
                        <select 
                            className="form-select" 
                            id="status-select" 
                            value={selectedStatus} 
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">Status</option>
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                            <option value="in_use">In Process</option>
                            <option value="under_maintenance">Under Maintenance</option>
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="workspace-type-select">Select Workspace Type</label>
                        <select 
                            className="form-select" 
                            id="workspace-type-select" 
                            value={workspaceType} 
                            onChange={(e) => setWorkspaceType(e.target.value)} 
                        >
                            <option value="">All Workspace Type</option>
                            {workspaceTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="type-select">Select Booking Type</label>
                        <select 
                            className="form-select" 
                            id="type-select" 
                            value={selectedType} 
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="date-picker">Select {selectedType === 'hourly' ? 'Date' : selectedType === 'daily' ? 'Month' : 'Year'}</label>
                        <input 
                            type={getDateInputType()} 
                            id="date-picker" 
                            value={selectedType === 'daily' ? selectedYear : currentDate} 
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
                <div className="room-table">
                    {renderTable()}
                </div>
                {isModalOpen && selectedWorkspace && (
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} room={selectedWorkspace} bookingType={selectedType} />
                )}
            </div>
        </div>
    );
};

export default RoomControls;
