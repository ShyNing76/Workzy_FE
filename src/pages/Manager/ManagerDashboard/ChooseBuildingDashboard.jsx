import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllManagerBuilding } from '../../../config/apiManager';



const ChooseBuildingDashboard = () => {
    const [building, setBuilding] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchBuilding = async () => {
        try {
          const res = await getAllManagerBuilding();
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
            <div className="grid grid-cols-3 gap-4 mt-6">
                {building.map((building) => (
                <div
                    key={building.building_id}
                    onClick={() => handleBuildingClick(building.building_id)} // Đưa sự kiện onClick lên thẻ <div>
                    className="card card-compact bg-base-100 shadow-xl cursor-pointer transition-transform transform hover:scale-105"
                >
                    <figure>
                        <img
                            src={building.BuildingImages[0].image}
                            alt={building.building_name}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title text-center">{building.building_name}</h2>
                        <div className="card-actions justify-end">
                            {/* Chỗ này không cần nút, nên có thể bỏ đi nếu không cần */}
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseBuildingDashboard;
