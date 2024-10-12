import React, { useEffect, useState } from 'react';
import AmenitiesIcon from '../../booking/Amenities/AmenitiesIcon'; 
import { getWorkspaceByBuildingId, getStaffBuildingId } from '../../../../../config/api.staff.js'; 
import './RoomModal.scss';

const Modal = ({ isOpen, onClose, room }) => {
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
                        setWorkspaceDetails(foundWorkspace);
                    } else {
                        setError('Lỗi khi lấy workspace.');
                    }
                }
            } catch (error) {
                setError('Lỗi API.');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaceDetails();
    }, [isOpen, room]);

    if (!isOpen || !workspaceDetails) return null;

    if (loading) {
        return <div>Đang tải thông tin workspace...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="modal-title">
                {workspaceDetails ? `${workspaceDetails.WorkspaceType?.workspace_type_name} - ${workspaceDetails.workspace_name }` : 'Thông tin không có sẵn'}                
                </h2>
                <div className="price">
                    <h3>Price: {workspaceDetails?.price || 'N/A'}</h3>
                </div>
                <div className="status">
                    <h3>Status: {workspaceDetails?.status || 'N/A'}</h3>
                </div>
                <div className="amenities">
                    <AmenitiesIcon workspaceType={workspaceDetails?.WorkspaceType?.workspace_type_name} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
