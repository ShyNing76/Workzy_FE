import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

import { getWorkspaceType } from "../../../config/api.admin.js";
import { getWorkspaceTypeById } from "../../../config/api.admin.js";
import { postWorkspaceType } from "../../../config/api.admin.js";
import { putWorkspaceType } from "../../../config/api.admin.js";
import { deleteWorkspaceType } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";


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
      status: 'active',
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

    useEffect(() => {
      if (successMessage) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: successMessage,
          position: "top-end",
          toast: true, // makes it a toast message
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() => setSuccessMessage("")); // clear the message after showing
      }
    }, [successMessage]);
    
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

    const checkIfNameExists = async (name) => {
      try {
        const res = await getWorkspaceType();
        const existingTypes = res.data.rows || [];
        
        // Kiểm tra tên đã tồn tại không (không bao gồm tên hiện tại)
        return existingTypes.some(type => 
          type.workspace_type_name.toLowerCase() === name.toLowerCase() &&
          type.workspace_type_id !== newWorkspaceType.workspace_type_id // loại trừ tên hiện tại
        );
      } catch (err) {
        console.error("Error checking for existing workspace type names:", err);
        return false; // Giả sử không tồn tại nếu có lỗi
      }
    };

    //Khu vực hàm dành cho add
    
     const handleAddWorkspaceType = async (e) => {
       e.preventDefault();

               // Validation logic
               if (!newWorkspaceType.workspace_type_name) {
                Swal.fire({
                  icon: 'error',
                  title: 'Validation Error',
                  text: 'Workspace type name is required.',
                  position: 'top-end',
                  toast: true,
                  timer: 3000,
                  timerProgressBar: true,
                  showConfirmButton: false,
                });
                return;
              }

        const formData = new FormData();
      
        formData.append('workspace_type_name', newWorkspaceType.name);
        formData.append('image', newWorkspaceType.image);
        formData.append('description', newWorkspaceType.description);
        formData.append('status', newWorkspaceType.status);
      console.log('FormData:', Object.fromEntries(formData.entries())); // Log FormData content
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

    // Kiểm tra xem tên có tồn tại không
    const nameExists = await checkIfNameExists(newWorkspaceType.workspace_type_name);
    
    if (nameExists) {
      setError("Workspace type name already exists."); // Hiện thông báo lỗi
      return;
    }
  
    try {
      const updatedWorkspaceType = {
        ...newWorkspaceType,
        status: newWorkspaceType.status === "active" ? "active" : "inactive", // Đảm bảo trạng thái chính xác
      };
  
      console.log('newWorkspaceType:', newWorkspaceType); // Log để kiểm tra giá trị
      await putWorkspaceType(updatedWorkspaceType.workspace_type_id, updatedWorkspaceType);
      fetchWorkspaceType(); // Tải lại dữ liệu
      setShowUpdateModal(false);
      setSuccessMessage('Workspace type updated successfully!');
      setError(null); // Reset lỗi
    } catch (err) {
      console.error('Failed to update workspace type:', err);
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleUpdateChange = (e) => {
    const { name, type, value, checked } = e.target;
  
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
    { label: "Name", type: "text", name: "workspace_type_name", value: `${newWorkspaceType.workspace_type_name}` },
    { label: "Image", type: "file", name: "image", value: `${newWorkspaceType.image}` },
    { label: "Description", type: "text", name: "description", value: `${newWorkspaceType.description}` },
    { 
      label: "Status", 
      type: "checkbox", 
      name: "status", 
      checked: `${newWorkspaceType.status}` === "active", 
      onChange: handleUpdateChange,
      checkboxLabels: { checked: "active", unchecked: "inactive" }
    },

  ];

  //Khu vực hàm dành cho block/unblock
  const handleToggleStatus = async (workspaceType) => {
    const newStatus = workspaceType.status === "active" ? "inactive" : "active";
    const action = newStatus === "active" ? "unblock" : "block";
  
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this workspace type?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: 'Cancel',
    });
  
    if (result.isConfirmed) {
      try {
        await putWorkspaceType(workspaceType.workspace_type_id, { ...workspaceType, status: newStatus });
        
        setWorkspaceType((prevTypes) =>
          prevTypes.map((type) =>
            type.workspace_type_id === workspaceType.workspace_type_id
              ? { ...type, status: newStatus }
              : type
          )
        );
        
        Swal.fire({
          icon: 'success',
          title: `Workspace type status has been set to ${newStatus} successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error toggling workspace type status:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Failed to set workspace type status to ${newStatus}. Try again later.`,
        });
      }
    }
  };

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
      <div className="overflow-x-auto flex flex-1">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Workspace Type Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(workspaceType) && workspaceType.map((workspaceType) => (
              <tr key={workspaceType.workspace_type_id} className="hover:bg-gray-100" onClick={() => handleRowClick(workspaceType.workspace_type_id)}>
                <td>{workspaceType.workspace_type_name}</td>
                <td>{workspaceType.description}</td>
                <td>{workspaceType.status}</td>
                <td className="flex space-x-2">
                  {/* Update Button */}
                  <UpdateButton onClick={(e) => {
                    e.stopPropagation()
                    handleUpdateClick(workspaceType)
                  }}
                  />

                    {/* Block/Unblock Button */}
                  <BlockButton
                    status={workspaceType.status}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStatus(workspaceType);
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

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedWorkspaceTypeDetails}
      />
    </div>
  );
};

export default WorkspacesTypesManagerPage;
