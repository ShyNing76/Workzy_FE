import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

import { getWorkspaceType } from "../../../config/api.admin.js";
import { getWorkspaceTypeById } from "../../../config/api.admin.js";
import { postWorkspaceType } from "../../../config/api.admin.js";
import { putWorkspaceType } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";

const WorkspacesTypesManagerPage = () => {
  const location = useLocation();

    const [workspaceType, setWorkspaceType] = useState(null); // State để lưu trữ dữ liệu
    const [loading, setLoading] = useState(true); // State loading
    const [error, setError] = useState(null); // State lỗi
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [workspaceTypeToDelete, setWorkspaceTypeToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedWorkspaceTypeDetails, setSelectedWorkspaceTypeDetails] = useState(null);
    
    const [newWorkspaceType, setNewWorkspaceType] = useState({
      workspace_type_name: '',
      image: null,
      description: '',
      status: '',
    });

    const [responseData, setResponseData] = useState (null);

    //Hiện data lên table
    const fetchWorkspaceType = async () => {
      try {
        const res = await getWorkspaceType();
        console.log("API response:", res); // Inspect API response
        if (res && res.data && Array.isArray(res.data.rows)) {
          setWorkspaceType(res.data.rows);
        } else {
          setWorkspaceType([]); // Initialize as an empty array if data is not as expected
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchWorkspaceType();
    }, []);
    
    //Hàm click lên hàng để hiện more details
    const handleRowClick = async (workspace_type_id) => {
      try {
        const res = await getWorkspaceTypeById(workspace_type_id);
        if (res && res.data) {
          setSelectedWorkspaceTypeDetails(res.data);
          setShowDetailsModal(true);
        }
      } catch (err) {
        console.error("Error fetching workspace type details", err);
      }
    };

    //Khu vực hàm dành cho add
    
     const handleAddWorkspaceType = async (e) => {
       e.preventDefault();
        const formData = new FormData();
      
        formData.append('workspace_type_name', newWorkspaceType.name);
        formData.append('image', newWorkspaceType.image);
        formData.append('description', newWorkspaceType.description);
        formData.append('status', newWorkspaceType.status); // Default to 'active' if not provided)
    
       try {
         const WorkspaceType = await postWorkspaceType(newWorkspaceType);
         setResponseData(WorkspaceType);
        //  setWorkspaceType([...workspaceType, newWorkspaceType]); // Assuming you add the returned data to the state
         fetchWorkspaceType(); // Re-fetch data after posting
         setShowAddModal(false);
         setSuccessMessage('Workspace type added successfully!');
         setNewWorkspaceType({ name: '', image: null, description: '' });
       } catch (err) {
         console.error('Failed to add workspace type:', err);
       }
     };

     const addWorkspaceTypeFields = [
      { label: "Name", type: "text", name: "workspace_type_name", value: `${newWorkspaceType.workspace_type_name}` },
      { label: "Image", type: "file", name: "image", value: `${newWorkspaceType.image}` },
      { label: "Description", type: "text", name: "description", value: `${newWorkspaceType.description}`  },
    ];

     const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewWorkspaceType({
        ...newWorkspaceType,
        [name]: value,
      });
    };

  // if (loading) 
  //   return <p>Loading...</p>;
  // if (error)
  //   return <p>Something went wrong: {error.message}</p>;

  //Khu vực hàm dành cho update

  const handleUpdateWorkspaceType = async (e) => {
    e.preventDefault();
    try {
      const updatedWorkspaceType = {
        ...newWorkspaceType,
        status: newWorkspaceType.status, // Ensure this is either "active" or "inactive"
      };
      await putWorkspaceType(updatedWorkspaceType.workspace_type_id, updatedWorkspaceType);
      fetchWorkspaceType();
      setShowUpdateModal(false);
      setSuccessMessage('Workspace type updated successfully!');
    } catch (err) {
      console.error('Failed to update workspace type:', err);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewWorkspaceType((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 'active' : 'inactive') : value,
    }));
  };

  const handleUpdateClick = (workspaceType) => {
    setNewWorkspaceType({
      ...workspaceType,
      status: workspaceType.status === "active" ? "active" : "inactive"
    });
    setShowUpdateModal(true);
  };

  const updateWorkspaceTypeFields = [
    { label: "Name", type: "text", name: "workspace_type_name", value: newWorkspaceType.workspace_type_name },
    { label: "Image", type: "file", name: "image", value: newWorkspaceType.image },
    { label: "Description", type: "text", name: "description", value: newWorkspaceType.description },
    { 
      label: "Status", 
      type: "checkbox", 
      name: "status", 
      checked: newWorkspaceType.status === "active", 
      onChange: handleUpdateChange,
      checkboxLabels: { checked: "Active", unchecked: "Inactive" }
    },

  ];

//Khu vực hàm dành cho delete
  const handleDeleteWorkspaceType = async (e) => {
    e.preventDefault();
    try {
      const updatedWorkspaceType = { ...newWorkspaceType, status: newWorkspaceType.status ? "active" : "inactive" };
      await putWorkspaceType(updatedWorkspaceType.workspace_type_id, updatedWorkspaceType);
      fetchWorkspaceType();
      setShowUpdateModal(false);
      setSuccessMessage('Workspace type updated successfully!');
    } catch (err) {
      console.error('Failed to update workspace type:', err);
    }
  }

  // const [searchTerm, setSearchTerm] = useState("");

  // const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // const closeSuccessMessage = () => setSuccessMessage("");

  // const filteredWorkspaceType = workspaceType.filter((workspaceType) => {
  //   return (
  //     workspaceType.id.includes(searchTerm) ||
  //     workspaceType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     workspaceType.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     workspaceType.status.toLowerCase().includes(buildingFilter.toLowerCase())
  //   );
  // });

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-black mb-4">Manage Workspace Types</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          //searchTerm={searchTerm}
          //handleSearchChange={handleSearchChange}
          placeholder="Search by ID, name, or status"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton
            onClick={() => setShowAddModal(true)}
            label="Add Workspace Type"
          />
        </div>
      </div>

      {/* <div>
        <SuccessAlert message={successMessage} onClose={closeSuccessMessage} />
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Workspace Type ID</th>
              <th>Workspace Type Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(workspaceType) && workspaceType.map((workspaceType) => (
              <tr key={workspaceType.workspace_type_id} className="cursor-pointer" onClick={() => handleRowClick(workspaceType.workspace_type_id)}>
                <td>{workspaceType.workspace_type_id}</td>
                <td>{workspaceType.workspace_type_name}</td>
                <td>{workspaceType.status}</td>
                <td className="flex space-x-2">
                  {/* Update Button */}
                  <UpdateButton onClick={(e) => {
                    e.stopPropagation()
                    handleUpdateClick(workspaceType)
                  }}
                  />

                  {/* Delete Button */}
                  <DeleteButton onClick={(e) => {
                    e.stopPropagation();
                    setWorkspaceTypeToDelete(workspaceType);
                    setShowDeleteModal(true);
                  }}
                  />
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
      </div>

      {/* Add, Update, Delete, Success Modals */}
        <AddModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddWorkspaceType}
          currentItem={newWorkspaceType}
          onInputChange={handleInputChange}
          fields={addWorkspaceTypeFields}
        />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateWorkspaceType}
        currentItem={newWorkspaceType}
        onInputChange={handleUpdateChange}
        fields={updateWorkspaceTypeFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteWorkspaceType}
        itemToDelete={workspaceTypeToDelete}
        itemType="workspaceType"
      />

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedWorkspaceTypeDetails}
      />
    </div>
  );
};

export default WorkspacesTypesManagerPage;
