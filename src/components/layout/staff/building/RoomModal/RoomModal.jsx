import React, { useEffect, useState } from 'react';
import { getWorkspaceByBuildingId, getStaffBuildingId } from '../../../../../config/api.staff.js'; 
import './RoomModal.scss';

const Modal = ({ isOpen, onClose, room, bookingType }) => {
    const [workspaceDetails, setWorkspaceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkspaceDetails = async () => {
            if (!isOpen || !room) return;
            setLoading(true);
            setError(null);
            try {
                const buildingResponse = await getStaffBuildingId();
                if (buildingResponse && buildingResponse.err === 0) {
                    const buildingId = buildingResponse.data.building_id;
                    const workspaceResponse = await getWorkspaceByBuildingId(buildingId);
                    if (workspaceResponse && workspaceResponse.err === 0) {
                        const foundWorkspace = workspaceResponse.data.find(ws => ws.id === room.id);
                        console.log('Found Workspace:', foundWorkspace); 
                        setWorkspaceDetails(foundWorkspace);
                    } else {
                        setError('Error when fetching workspaces.');
                    }
                }
            } catch (error) {
                setError('Error while fetching building.');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaceDetails();
    }, [isOpen, room]);

    const getPrice = () => {
        if (!workspaceDetails) return 'N/A';

        switch (bookingType) {
            case 'hourly':
                return workspaceDetails.price_per_hour ? `${Number(workspaceDetails.price_per_hour).toLocaleString()} đ` : 'N/A';
            case 'daily':
                return workspaceDetails.price_per_day ? `${Number(workspaceDetails.price_per_day).toLocaleString()} đ` : 'N/A';
            case 'monthly':
                return workspaceDetails.price_per_month ? `${Number(workspaceDetails.price_per_month).toLocaleString()} đ` : 'N/A';
            default:
                return 'N/A';
        }
    };

    if (!isOpen || !workspaceDetails) return null;

    if (loading) {
        return <div>Loading workspace...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">
                    {workspaceDetails ? `${workspaceDetails.WorkspaceType?.workspace_type_name} - ${workspaceDetails.workspace_name}` : 'Thông tin không có sẵn'}
                </h2>
                <div className="price">
                    <h3>Price: {getPrice()}</h3> {/* Hiển thị giá */}
                </div>
                <div className="status">
                    <h3>Status: </h3>
                </div>
            </div>
        </div>
    );
};

export default Modal;
