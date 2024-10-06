import React, { useState } from "react";
import { useLocation } from "react-router-dom";

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

  const [workspaceType, setWorkspaceType] = useState([
    {
      id: "TY1",
      name: "Type 1",
      image: [],
      description: "Loai 1",
      status: "Active",
    },
    {
      id: "TY2",
      name: "Type 2",
      image: [],
      description: "Loai 2",
      status: "Inactive",
    },
    {
      id: "TY3",
      name: "Type 3",
      image: [],
      description: "Loai 3",
      status: "Active",
    },
  ]);

  const addWorkspaceTypeFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Image", name: "image", type: "file" },
    { label: "Description", name: "description", type: "text" },
  ];

  const updateWorkspaceTypeFields = [
    { label: "Type ID", name: "id", type: "text" },
    { label: "Name", name: "name", type: "text" },
    { label: "Image", name: "image", type: "file" },
    { label: "Description", name: "description", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "checkbox",
      checkboxLabels: { checked: "Available", unchecked: "Unavailable" },
    },
  ];

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

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCurrentWorkspaceType((prev) => ({ ...prev, [name]: value }));
    const inputValue = type === "checkbox" ? checked : value;
  };

  const generateWorkspaceTypeId = () => {
    const lastId =
      workspaceType.length > 0
        ? workspaceType[workspaceType.length - 1].id
        : "TY0";
    const newId = `TY${parseInt(lastId.slice(2)) + 1}`;
    return newId;
  };

  const handleAddWorkspaceType = (e) => {
    e.preventDefault();
    const newWorkspace = {
      ...currentWorkspaceType,
      id: generateWorkspaceTypeId(),
      status: "Active",
    };
    setWorkspaceType([...workspaceType, newWorkspace]);
    setShowAddModal(false);
    setSuccessMessage("Workspace type added successfully!");
    setCurrentWorkspaceType({
      id: "",
      name: "",
      image: [],
      description: "",
      status: "",
    });
  };

  const handleUpdateWorkspaceType = (e) => {
    e.preventDefault();
    setWorkspaceType((prevWorkspaceTypes) => {
      const workspaceTypeIndex = prevWorkspaceTypes.findIndex(
        (workspaceType) => workspaceType.id === currentWorkspaceType.oldId
      );
      if (workspaceTypeIndex !== -1) {
        const updatedWorkspaceTypes = [...prevWorkspaceTypes];
        updatedWorkspaceTypes[workspaceTypeIndex] = { ...currentWorkspaceType };
        return updatedWorkspaceTypes;
      }
    });
    setShowUpdateModal(false);
    setSuccessMessage("Workspace type updated successfully!");
    setCurrentWorkspaceType({
      id: "",
      name: "",
      image: [],
      description: "",
      status: "",
    });
  };

  const handleDeleteWorkspaceType = () => {
    setWorkspaceType((prevWorkspaceTypes) =>
      prevWorkspaceTypes.filter(
        (workspaceType) => workspaceType.id !== workspaceTypeToDelete.id
      )
    );
    setShowDeleteModal(false);
    setSuccessMessage("Workspace type deleted successfully!");
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const closeSuccessMessage = () => setSuccessMessage("");

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
          handleSearchChange={handleSearchChange}
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
        <SuccessAlert message={successMessage} onClose={closeSuccessMessage} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Workspace Type ID</th>
              <th>Workspace Type Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkspaceType.length > 0 ? (
              filteredWorkspaceType.map((workspaceType) => (
                <tr key={workspaceType.id}>
                  <td>{workspaceType.id}</td>
                  <td>{workspaceType.name}</td>
                  <td>{workspaceType.description}</td>
                  <td>{workspaceType.status}</td>
                  <td>
                    {/* Update Button */}
                    <UpdateButton
                      onClick={() => {
                        setCurrentWorkspaceType({
                          ...workspaceType,
                          oldId: workspaceType.id,
                        });
                        setShowUpdateModal(true);
                      }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={() => {
                        setWorkspaceTypeToDelete(workspaceType);
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Workspace Type Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add, Update, Delete, Success Modals */}
      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddWorkspaceType}
        currentItem={currentWorkspaceType}
        onInputChange={handleInputChange}
        fields={addWorkspaceTypeFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateWorkspaceType}
        currentItem={currentWorkspaceType}
        onInputChange={handleInputChange}
        fields={updateWorkspaceTypeFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteWorkspaceType}
        itemToDelete={workspaceTypeToDelete}
        itemType="workspaceType"
      />
    </div>
  );
};

export default WorkspacesTypesManagerPage;
