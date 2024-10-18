import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getBuilding } from "../../../config/api.admin";
import { getBuildingById } from "../../../config/api.admin";
import { getManager } from "../../../config/api.admin";
import { postBuilding } from "../../../config/api.admin";
import { putBuilding } from "../../../config/api.admin";
import { assignManagerToBuilding } from "../../../config/api.admin";
import { removeManagerFromBuilding } from "../../../config/api.admin";
import { deleteBuilding } from "../../../config/api.admin"

// import SearchBar from "../../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
// import SuccessAlert from "../../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";

const BuildingManagerPage = () => {
  const location = useLocation();

  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedBuildingDetails, setSelectedBuildingDetails] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");

  const [newBuilding, setNewBuilding] = useState({
    building_name: '',
    location: '',
    address: '',
    rating: 0,
    images: [],
    description: '',
    status: 'active',
    google_address: ''
  });

  const [updateBuilding, setUpdateBuilding] = useState({
    building_name: '',
    location: '',
    address: '',
    rating: 0,
    images: [],
    description: '',
    status: 'active',
    google_address: ''
  });
  const [responseData, setResponseData] = useState (null);
  const [managers, setManagers] = useState([]);

  //Hiện data lên table
  const fetchBuilding = async () => {
    try {
      const res = await getBuilding();
      console.log("API response:", res);
      if (res && res.data) {
        setBuilding(res.data);
      } else {
        setBuilding([])
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const fetchManagers = async () => {
    try {
      const res = await getManager();
      if (res && res.data) {
        setManagers(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch managers:", err);
    }
  };

  useEffect(() => {
    fetchBuilding();
    fetchManagers();
  }, []);

  //Khu vực hàm dành cho add

  const handleAddBuilding = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form submit

    try {
      const Building = await postBuilding(newBuilding);
      console.log('oooResponse:', Building)
      console.log('API Response:', newBuilding);
      if (Building && Building.data) {
        const buildingId = Building.data.building_id;
        setResponseData(Building.data);
        fetchBuilding();
        setShowAddModal(false);
        setSuccessMessage('Building added successfully!');
        setNewBuilding({
          building_name: '',
          location: '',
          address: '',
          rating: 0,
          images: [],
          description: '',
          status: 'active',
          google_address: ''
        });
      } else {
        console.error('Unexpected response format:', Building);
      }
    } catch (err) {
      console.error('Failed to add building:', err);
    }
  };

  const addBuildingFields = [
    { name: "building_name", label: "Building Name", type: "text", value: `${newBuilding.building_name}`},
    { name: "location", label: "Location", type: "text", value: `${newBuilding.location}` },
    { name: "address", label: "Address", type: "text", value: `${newBuilding.address}` },
    { name: "rating", label: "Rating", type: "number", value: `${newBuilding.rating}` },
    { name: 'google_address', label: 'Google Address', type: 'text', value: `${newBuilding.google_address}` },
    { name: 'images', label: 'Images', type: 'file', multiple: true },
    { name: "description", label: "Description", type: "text", value: `${newBuilding.description}` },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuilding({ 
      ...newBuilding, 
      [name]: value 
    });
  }

  //Khu vực hàm dành cho update

  const handleUpdateBuilding = async (e) => {
    e.preventDefault();
    try {
      const updateResult = await putBuilding(updateBuilding.building_id, updateBuilding);
      if (updateBuilding.manager_id) {
        await assignManagerToBuilding(updateBuilding.building_id, updateBuilding.manager_id);
      } else {
        await removeManagerFromBuilding(updateBuilding.building_id);
      }
      fetchBuilding();
      setShowUpdateModal(false);
      setSuccessMessage('Building updated successfully!');
    } catch (err) {
      console.error("Error updating building:", err);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateBuilding((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'active' : 'inactive') : value,
    }))
  };

  const handleUpdateClick = (building) => {
    setUpdateBuilding(building);
    setShowUpdateModal(true);
  }

  const updateBuildingFields = [
    { name: "location", label: "Location", type: "text", value: `${updateBuilding.location}` },
    { name: "address", label: "Address", type: "text", value: `${updateBuilding.address}` },
    { name: "rating", label: "Rating", type: "number", value: `${updateBuilding.rating}` },
    { name: 'google_address', label: 'Google Address', type: 'text', value: `${updateBuilding.google_address}` },
    { name: 'images', label: 'Images', type: 'file', multiple: true },
    { name: "description", label: "Description", type: "text", value: `${updateBuilding.description}`},
    { 
      label: "Status", 
      type: "checkbox", 
      name: "status", 
      checked: `${updateBuilding.status}` === "active", 
      onChange: handleUpdateChange,
      checkboxLabels: { checked: "active", unchecked: "inactive" }
    },
  ];

  //Khu vực hàm dành cho delete

  const handleDeleteBuilding = async (e) => {
    if (!buildingToDelete) return;

    try {
      // Call the deleteWorkspaceType API to set the status to inactive
      await deleteBuilding(buildingToDelete.building_id);
  
      // Update the local state to reflect the change
      setBuilding(
        building.map((type) => 
          type.building_id === buildingToDelete.building_id
            ? { ...type, status: "inactive" }
            : type
        )
      );
  
      setShowDeleteModal(false);
      setSuccessMessage('Workspace type status set to inactive successfully!');
    } catch (err) {
      console.error('Failed to set workspace type status to inactive:', err);
    }
  };

  // const handleSearchChange = (e) => {
  //   // setSearchTerm(e.target.value);
  // };

  // const closeSuccessMessage = () => {
  //   // setSuccessMessage("");
  // };

  // const filteredBuildings = buildings.filter(
    // (building) =>
    //   building.id.includes(searchTerm) ||
    //   building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   building.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   building.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   building.managerId.includes(searchTerm) ||
    //   building.status.toString().includes(searchTerm) ||
    //   building.rating.toString().includes(searchTerm) ||
    //   building.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Building List</h1>

      <div className="grid grid-cols-2">
        {/* <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          placeholder="Search building"
        /> */}

        {/* Add Button */}
        <div className="ml-2">
          <AddButton onClick={setShowAddModal} label="Add Building" />
        </div>
      </div>

      <div>
        {/* <SuccessAlert message={successMessage} onClose={closeSuccessMessage} /> */}
      </div>

      <div className="overflow-x-auto flex flex-1">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Building Name</th>
              <th>Manager</th>
              <th>Location</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(building) && building.map((building) => (
                <tr key={building.building_id}>
                  <td>{building.building_name}</td>
                  <td>{building.manager_id}</td>
                  <td>{building.location}</td>
                  <td>{building.address}</td>
                  <td>{building.status}</td>

                  <td className="flex space-x-2">
                    <UpdateButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClick(building)
                      }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setBuildingToDelete(building);
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddBuilding}
        currentItem={newBuilding}
        onInputChange={handleInputChange}
        fields={addBuildingFields}
      />

       <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateBuilding}
        currentItem={updateBuilding}
        onInputChange={handleUpdateChange}
        fields={updateBuildingFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteBuilding}
        itemToDelete={buildingToDelete}
        itemType="building"
      />
    </div>
  );
};

export default BuildingManagerPage;
