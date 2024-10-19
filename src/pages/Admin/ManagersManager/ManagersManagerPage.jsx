import React, { useEffect, useState } from "react";
import { getManager } from "../../../config/api.admin.js";
import { getManagerById } from "../../../config/api.admin.js";
import { postManager } from "../../../config/api.admin.js";
import { putManager } from "../../../config/api.admin.js";
import { deleteManager } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import BlockButton from '../../../components/layout/Admin/Buttons/BlockButton.jsx'; 

import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';


const ManagersManagerPage = () => {
  const location = useLocation();

  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedManagerDetails, setSelectedManagerDetails] = useState(null);
  const [newManager, setNewManager] = useState({
    name: '',
    email: '',
    password: '',
    date_of_birth: '',
    phone: '',
    status: '',
  });
  const [responseData, setResponseData] = useState(null);

  //Hiện data lên table
  const fetchManager = async () => {
    try {
      const res = await getManager();
      console.log("API response: ", res);
      if (res && res.data) {
        setManager(res.data);
      } else {
        setManager([]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManager();
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

//Hiện detail khi click vô 1 hàng

const handleRowClick = async (user_id) => {
  try {
    const res = await getManagerById(user_id);
    if (res && res.data) {
      setSelectedManagerDetails(res.data);
      setShowDetailsModal(true);
  }
  } catch (err) {
    console.error("Error fetching manager details: ", err);
  }
};

//Khu vực hàm dành cho add

const handleAddManger = async (e) => {
  e.preventDefault();

    // Validation logic with SweetAlert
    if (!newManager.name) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Manager name is required.',
        position: 'top-end',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newManager.email) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Manager email is required.',
        position: 'top-end',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newManager.password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Manager password is required.',
        position: 'top-end',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newManager.phone) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Manager phone is required.',
        position: 'top-end',
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

  const formData = new FormData();

  formData.append('name', newManager.name);
  formData.append('email', newManager.email);
  formData.append('password', newManager.password);
  formData.append('phone', newManager.phone);

  try {
    const Manager = await postManager(newManager);
    setResponseData(Manager);

    fetchManager();
    setShowAddModal(false);
    setSuccessMessage("Manager Added Successfully!");
    setNewManager({ 
      name: '', 
      email: '', 
      password: '', 
      phone: '',
      status: 'active'
    });
  } catch(err){
    console.error("Error adding Manager: ", err);
  }
};

const addManagerFields = [
  { label: "Name", type: "text", name: "name", value: `${newManager.name}` },
  { label: "Email", type: "text", name: "email", value: `${newManager.email}` },
  { label: "Password", type: "text", name: "password", value: `${newManager.password}` },
  { label: "Phone number:", type: "text", name: "phone", value: `${newManager.phone}` },
];

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewManager({
    ...newManager,
    [name]: value,
  });
};

//Khu vực hàm dành cho delete

const handleDeleteManager = async () => {
  if (!managerToDelete) return;

  try {
    // Call the deleteWorkspaceType API to set the status to inactive
    await deleteManager(managerToDelete.Manager.user_id);

    // Update the local state to reflect the change
    setManager(
      manager.map((type) => 
        type.Manager.user_id === managerToDelete.Manager.user_id
          ? { ...type, status: "inactive" }
          : type
      ))
      setShowDeleteModal(false);
      setSuccessMessage('Manager status set to inactive successfully!');
    } catch (err) {
      console.error('Failed to set manager status to inactive:', err);
    }
  }

  //Khu vực dành cho hàm blovk/unblock
  const handleToggleStatus = async (manager) => {
    const newStatus = manager.status === "active" ? "inactive" : "active"; // Toggle status
    const action = newStatus === "active" ? "unblock" : "block";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this manager?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: 'Cancel',
    });

    try {
      // Make API call to update status
      await putManager(manager.Manager.user_id, {...manager, status: newStatus });
  
      // Update local state to reflect the new status
      setManager((prevManagers) =>
        prevManagers.map((m) =>
          m.Manager.user_id === manager.Manager.user_id
            ? { ...m, status: newStatus }
            : m
        )
      );
      Swal.fire({
        icon: 'success',
        title: `Manager status has been set to ${newStatus} successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error toggling manager status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Failed to set manager status to ${newStatus}. Try again later.`,
      });
    }
  };

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const closeSuccessMessage = () => {
  //   setSuccessMessage("");
  // };

  // const filteredManagers = managers.filter(
  //   (manager) =>
  //     manager.id.includes(searchTerm) ||
  //     manager.fname.includes(searchTerm) ||
  //     manager.lname.includes(searchTerm) ||
  //     manager.info.includes(searchTerm)
  // );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Managers</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          // searchTerm={searchTerm}
          // handleSearchChange={handleSearchChange}
          // placeholder="Search by ID, name, or information"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton
            onClick={() => setShowAddModal(true)}
            label="Add Manager"
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
              <th>Manager Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date of birth</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(manager) && manager.map((manager) => (
                // <tr key={manager.user_id} className="cursor-pointer">
                <tr key={manager.Manager.user_id} className="hover:bg-gray-100" onClick={() => handleRowClick(manager.Manager.user_id)}>
                  <td>{manager.name}</td>
                  <td>{manager.email}</td>
                  <td>{manager.gender}</td>
                  <td>{manager.date_of_birth}</td>
                  <td>{manager.status}</td>
                  <td>

                    <BlockButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStatus(manager);
                    }}
                    status={manager.status}
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
        onSubmit={handleAddManger}
        currentItem={newManager}
        onInputChange={handleInputChange}
        fields={addManagerFields}
      />

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onDelete={handleDeleteManager}
        details={selectedManagerDetails}
        itemType="manager"
      />
    </div>
  );
};

export default ManagersManagerPage;
