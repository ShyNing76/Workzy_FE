import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBuilding } from '../../../config/apiManager';



const ChooseBuildingDashboard = () => {
    const [building, setBuilding] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchBuilding = async () => {
        try {
          const res = await getAllBuilding();
          setBuilding(res.data || []);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuilding();
    }, []);

    const handleBuildingClick = (building_id) => {
        navigate(`manager-dashboard/${building_id}`); // Navigate with building_id
    };

return (
    <div className="container mx-auto p-4">
        <h2 className="text-4xl font-black mt-5 ml-6">Choose Building</h2>
        <div className="grid grid-cols-4 gap-4 mt-6">
            {building.map((building) => (
                <div key={building.building_id} className="card shadow-lg">
                    <button 
                        onClick={() => handleBuildingClick(building.building_id)} // Handle click
                        className="card-body btn btn-neutral"
                    >
                        <h2 className="card-title text-center">{building.building_name}</h2>
                    </button>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ChooseBuildingDashboard;
