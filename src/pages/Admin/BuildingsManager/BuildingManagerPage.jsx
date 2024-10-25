import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { getBuilding, getManager, postBuilding, putBuilding, assignManagerToBuilding, removeManagerFromBuilding, deleteBuilding } from "../../../config/api.admin";
import AddModal from "../../../components/layout/Admin/Modals/AddModal";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";

const BuildingManagerPage = () => {
  const location = useLocation();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
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
  const [managers, setManagers] = useState([]);

  // Fetch building và managers
  const fetchBuilding = async () => {
    try {
      const res = await getBuilding();
      setBuilding(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagers = async () => {
    try {
      const res = await getManager();
      setManagers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch managers:", err);
    }
  };

  useEffect(() => {
    fetchBuilding();
    fetchManagers();
  }, []);

    // Utility function to get manager name by ID
    const getManagerNameById = (managerId) => {
      const manager = managers.find(manager => manager.user_id === managerId);
      return manager ? manager.name : 'N/A';
    };

  // Extract unique locations from the buildings
  const getUniqueLocations = () => {
    if (!building) return [];
    return ["all", ...new Set(building.map(b => b.location))];
  };

  // Xử lý thêm building
  const handleAddBuilding = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in newBuilding) {
      if (key === 'images' && newBuilding.images.length > 0) {
        Array.from(newBuilding.images).forEach(file => formData.append('images', file));
      } else {
        formData.append(key, newBuilding[key]);
      }
    }

    try {
      const Building = await postBuilding(formData);
      if (Building && Building.data) {
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
      }
    } catch (err) {
      console.error('Failed to add building:', err);
    }
  };

  const addBuildingFields = [
    { name: "building_name", label: "Building Name", type: "text", value: `${newBuilding.building_name}` },
    { name: "location", label: "Location", type: "text", value: `${newBuilding.location}` },
    { name: "address", label: "Address", type: "text", value: `${newBuilding.address}` },
    { name: "rating", label: "Rating", type: "number", value: `${newBuilding.rating}` },
    { name: 'google_address', label: 'Google Address', type: 'text', value: `${newBuilding.google_address}` },
    { name: "description", label: "Description", type: "text", value: `${newBuilding.description}` },
    { name: 'images', label: 'Images', type: 'file', multiple: true }
  ];

  

  const resetNewBuilding = () => {
    setNewBuilding({
      building_name: '',
      location: '',
      address: '',
      rating: 0,
      google_address: '',
      description: '',
      image: null,
      status: 'active'
    });
  };

  // Xử lý cập nhật building
  const handleUpdateBuilding = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in updateBuilding) {
      if (key === 'images' && updateBuilding.images.length > 0) {
        Array.from(updateBuilding.images).forEach(file => formData.append('images', file));
      } else {
        formData.append(key, updateBuilding[key]);
      }
    }

    try {
      await putBuilding(updateBuilding.building_id, formData);
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

  // Xử lý xóa building
  const handleDeleteBuilding = async () => {
    if (!buildingToDelete) return;

    try {
      await deleteBuilding(buildingToDelete.building_id);
      fetchBuilding();
      setShowDeleteModal(false);
      setSuccessMessage('Building deleted successfully!');
    } catch (err) {
      console.error('Failed to delete building:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setNewBuilding({ ...newBuilding, images: files });
    } else {
      setNewBuilding({ ...newBuilding, [name]: value });
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setUpdateBuilding({ ...updateBuilding, images: files });
    } else {
      setUpdateBuilding({ ...updateBuilding, [name]: value });
    }
  };


  const updateBuildingFields = [
    { name: "location", label: "Location", type: "text", value: `${updateBuilding.location}` },
    { name: "address", label: "Address", type: "text", value: `${updateBuilding.address}` },
    { name: "rating", label: "Rating", type: "number", value: `${updateBuilding.rating}` },
    { name: 'google_address', label: 'Google Address', type: 'text', value: `${updateBuilding.google_address}` },
    { name: "description", label: "Description", type: "text", value: `${updateBuilding.description}` },
    { name: 'images', label: 'Images', type: 'file', multiple: true }
  ];

  const filteredBuilding = Array.isArray(building)
  ? building.filter((item) => {
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesSearchTerm = item.building_name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearchTerm;
    })
  : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Building List</h1>

      <div className="grid grid-cols-2">
        <div className="ml-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Building Name"
        />
          
          <AddButton onClick={() => {
            resetNewBuilding();
            setShowAddModal(true)
          }} 
            label="Add Building" />
        </div>
      </div>

      <div className="flex justify-end mr-2">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            {getUniqueLocations().map((location, index) => (
              <option key={index} value={location}>
                {location === "all" ? "All Locations" : location}
              </option>
            ))}
          </select>
        </div>

      <div className="overflow-x-auto flex flex-1">
        <table className="table w-full">
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
            {filteredBuilding.map((building) => (
                <tr key={building.building_id}>
                  <td>{building.building_name}</td>
                  <td>{getManagerNameById(building.manager_id)}</td>
                  <td>{building.location}</td>
                  <td>{building.address}</td>
                  <td>{building.status}</td>

                  <td className="flex space-x-2">
                    <UpdateButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setUpdateBuilding(building);
                        setShowUpdateModal(true);
                      }}
                    />

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
        successMessage={successMessage}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateBuilding}
        currentItem={updateBuilding}
        onInputChange={handleUpdateChange}
        fields={updateBuildingFields}
        successMessage={successMessage}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSubmit={handleDeleteBuilding}
        itemToDelete={buildingToDelete}
        successMessage={successMessage}
      />
    </div>
  );
};

export default BuildingManagerPage;
