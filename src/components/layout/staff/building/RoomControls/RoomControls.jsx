import React, { useEffect, useState } from 'react';
import './RoomControls.scss'; 
import Hourly from '../RoomRow/Hourly';
import Daily from '../RoomRow/Daily';
import Monthly from '../RoomRow/Monthly';
import { getWorkspaceByBuildingId } from '../../../../../config/api.staff';
import { useOutletContext } from "react-router-dom";

const RoomControls = ({ selectedStatus, setSelectedStatus, selectedType, setSelectedType, selectedDate, setSelectedDate }) => {
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]); 
    const [workspaceType, setWorkspaceType] = useState(''); 
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null); 
    const [workspaces, setWorkspaces] = useState([]);
    const [workspaceTypes, setWorkspaceTypes] = useState([]);
    const { buildingId } = useOutletContext();

    useEffect(() => {
        const fetchWorkspaces = async () => {
            if (!buildingId) {
                console.error('Building ID is undefined');
                return;
            }
            try {
                const response = await getWorkspaceByBuildingId(buildingId);
                if (response?.err === 0) {
                    setWorkspaces(response.data);
                    setWorkspaceTypes([...new Set(response.data.map(ws => ws.WorkspaceType.workspace_type_name))]);
                }
            } catch (error) {
                console.error('Error fetching workspaces:', error);
            }
        };
    
        fetchWorkspaces();
    }, [buildingId]);
    

    const getDateInputType = () => {
        switch (selectedType) {
            case 'hourly': return 'date';
            case 'daily': return 'month';
            case 'monthly': return 'number';
            default: return 'date';
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
        setSelectedWorkspace(workspace);
        setIsModalOpen(true);
    };

    const renderTable = () => {
        const filteredWorkspaces = workspaceType ? workspaces.filter(workspace => workspace.WorkspaceType.workspace_type_name === workspaceType) : workspaces;
        
        switch (selectedType) {
            case 'hourly':
                return <Hourly selectedDate={currentDate} selectedStatus={selectedStatus} workspaces={filteredWorkspaces} onWorkspaceClick={handleWorkspaceClick} />;
            case 'daily':
                return <Daily selectedDate={currentDate} selectedStatus={selectedStatus} workspaces={filteredWorkspaces} onWorkspaceClick={handleWorkspaceClick} />;
            case 'monthly':
                return <Monthly selectedStatus={selectedStatus} workspaces={filteredWorkspaces} onWorkspaceClick={handleWorkspaceClick} />;
            default:
                return null;
        }
    };

    return (
        <div className="room-controls-wrapper" style={{ width: '100%' }}>
            <div className="room-controls">
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="status-select">Select Status</label>
                        <select className="form-select" id="status-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="">Status</option>
                            <option value="available">Available</option>
                            <option value="booked">Booked</option>
                            <option value="in_use">In Process</option>
                            <option value="under_maintenance">Under Maintenance</option>
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="workspace-type-select">Select Workspace Type</label>
                        <select className="form-select" id="workspace-type-select" value={workspaceType} onChange={(e) => setWorkspaceType(e.target.value)}>
                            <option value="">All Workspace Type</option>
                            {workspaceTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="type-select">Select Booking Type</label>
                        <select className="form-select" id="type-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                    <div className="control">
                        <label htmlFor="date-picker">Select {selectedType === 'hourly' ? 'Date' : selectedType === 'daily' ? 'Month' : 'Year'}</label>
                        <input type={getDateInputType()} id="date-picker" value={selectedType === 'daily' ? selectedYear : currentDate} onChange={handleDateChange} />
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
