import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getWorkspaceType } from "../../../config/api.admin";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";

const WorkspacesTypesManagerPage = () => {
  const location = useLocation();

  const [workspaceType, setWorkspaceType] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWorkspaceType, setCurrentWorkspaceType] = useState({
    id: "",
    name: "",
    image: [],
    description: "",
    status: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workspaceTypeToDelete, setWorkspaceTypeToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [buildingFilter, setBuildingFilter] = useState("");

  // Fetch workspace types when the component mounts
  useEffect(() => {
    const fetchWorkspaceTypes = async () => {
      try {
        const data = await getWorkspaceType(); // If you have an endpoint that returns all types
        setWorkspaceType(data);
      } catch (error) {
        console.error("Failed to fetch workspace types", error);
      }
    };

    fetchWorkspaceTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCurrentWorkspaceType((prev) => ({ ...prev, [name]: value }));
  };

  // ... Rest of your component code, such as adding, updating, or deleting logic
  
  const filteredWorkspaceType = workspaceType.filter((workspaceType) => {
    return (
      workspaceType.id.includes(searchTerm) ||
      workspaceType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workspaceType.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      workspaceType.status.toLowerCase().includes(buildingFilter.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-black mb-4">Manage Workspace Types</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by ID, name, or status"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton
            onClick={() => setShowAddModal(true)}
            label="Add Service"
          />
        </div>
      </div>

      <div>
        <SuccessAlert message={successMessage} onClose={() => setSuccessMessage("")} />
      </div>
      
      {/* Table and other modals can be included here */}
    </div>
  );
};

export default WorkspacesTypesManagerPage;
