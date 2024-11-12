import React, { useEffect, useState } from "react";
import { getManager } from "../../../config/api.admin.js";
import { getManagerById } from "../../../config/api.admin.js";
import { postManager } from "../../../config/api.admin.js";
import { putManager } from "../../../config/api.admin.js";
import { deleteManager } from "../../../config/api.admin.js";
import { getStaff } from "../../../config/api.admin.js";
import { getCustomer } from "../../../config/api.admin.js";

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

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const ManagersManagerPage = () => {
  const location = useLocation();

  const [manager, setManager] = useState(null);
  const [staff, setStaff] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [managerToDelete, setManagerToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedManagerDetails, setSelectedManagerDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [newManager, setNewManager] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    date_of_birth: "",
    phone: "",
    status: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [noManagerFound, setNoManagerFound] = useState(false); // State để kiểm tra xem có manager nào được tìm thấy không

  const formatDate = (dateString) => {
    if (!dateString) return "None";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "None";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const fetchManager = async () => {
    try {
      const res = await getManager(statusFilter, genderFilter, searchTerm);
      console.log("API response: ", res);
      if (res && res.data) {
        setManager(res.data);
        setNoManagerFound(res.data.length === 0); // Cập nhật state noManagerFound
      } else {
        setManager([]);
        setNoManagerFound(true); // Cập nhật state noManagerFound
      }
    } catch (err) {
      setError(err);
      setNoManagerFound(true); // Cập nhật state noManagerFound
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManager();
  }, [statusFilter, genderFilter, searchTerm]);

  const fetchData = async () => {
    try {
      const staffRes = await getStaff();
      const customerRes = await getCustomer();

      setStaff(staffRes.data.rows || []);
      setCustomer(customerRes.data.rows || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleRowClick = async (user_id) => {
    try {
      const res = await getManagerById(user_id);
      if (res && res.data) {
        const details = {
          ...res.data,
          date_of_birth: formatDate(res.data.date_of_birth), // Format date
        };
        setSelectedManagerDetails(details);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error("Error fetching manager details: ", err);
    }
  };

  const handleAddManger = async (e) => {
    e.preventDefault();

    if (
      !newManager.name ||
      !newManager.email ||
      !newManager.password ||
      !newManager.phone
    ) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (newManager.password !== newManager.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Passwords do not match.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    // Attempt to find duplicates in manager, staff, and customer lists
    const emailExists = [...manager, ...staff, ...customer].some(
      (item) => item.email === newManager.email
    );
    const phoneExists = [...manager, ...staff, ...customer].some(
      (item) => item.phone === newManager.phone
    );

    if (emailExists) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "A user with this email already exists.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (phoneExists) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "A user with this phone number already exists.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const emailDuplicate =
      staff && staff.some((item) => item.email === newManager.email);
    if (emailDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "A staff member with this email already exists.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const phoneDuplicate =
      staff && staff.some((item) => item.phone === newManager.phone);
    if (phoneDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "A staff member with this phone number already exists.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const formData = new FormData();

    formData.append("name", newManager.name);
    formData.append("email", newManager.email);
    formData.append("password", newManager.password);
    formData.append("phone", newManager.phone);

    try {
      const Manager = await postManager(newManager);
      setResponseData(Manager);

      fetchManager();
      setShowAddModal(false);
      setSuccessMessage("Manager Added Successfully!");
      setNewManager({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        status: "active",
      });
    } catch (err) {
      console.error("Error adding Manager: ", err);
    }
  };

  const addManagerFields = [
    { label: "Name", type: "text", name: "name", value: `${newManager.name}` },
    {
      label: "Email",
      type: "text",
      name: "email",
      value: `${newManager.email}`,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: `${newManager.password}`,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: `${newManager.confirmPassword}`,
    },
    {
      label: "Phone number:",
      type: "text",
      name: "phone",
      value: `${newManager.phone}`,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewManager({
      ...newManager,
      [name]: value,
    });
  };

  const resetNewManager = () => {
    setNewManager({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      date_of_birth: "",
      phone: "",
      status: "",
    });
  };

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
        )
      );
      setShowDeleteModal(false);
      setSuccessMessage("Manager status set to inactive successfully!");
    } catch (err) {
      console.error("Failed to set manager status to inactive:", err);
    }
  };

  const handleToggleStatus = async (manager) => {
    const newStatus = manager.status === "active" ? "inactive" : "active"; // Toggle status
    const action = newStatus === "active" ? "unblock" : "block";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this manager?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: "Cancel",
    });

    try {
      // Make API call to update status
      await putManager(manager.Manager.user_id, {
        ...manager,
        status: newStatus,
      });

      // Update local state to reflect the new status
      setManager((prevManagers) =>
        prevManagers.map((m) =>
          m.Manager.user_id === manager.Manager.user_id
            ? { ...m, status: newStatus }
            : m
        )
      );
      Swal.fire({
        icon: "success",
        title: `Manager status has been set to ${newStatus} successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error toggling manager status:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to set manager status to ${newStatus}. Try again later.`,
      });
    }
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Managers</h1>

      <div className="grid grid-cols-2 items-center">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Manager Name"
        />

        <div className="ml-2 flex justify-end">
          <AddButton
            onClick={() => {
              resetNewManager();
              setShowAddModal(true);
            }}
            label="Add Manager"
          />
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="select select-bordered select-sm max-w-xs"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          id="genderFilter"
          value={genderFilter}
          onChange={handleGenderFilterChange}
          className="select select-bordered select-sm max-w-xs"
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {noManagerFound ? (
          <div className="text-center text-gray-500">No manager found</div>
        ) : (
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
              {manager &&
                manager.map((manager) => (
                  <tr
                    key={manager.Manager.user_id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(manager.Manager.user_id)}
                  >
                    <td>{manager.name}</td>
                    <td>{manager.email}</td>
                    <td>{manager.gender}</td>
                    <td>{formatDate(manager.date_of_birth)}</td>
                    <td>
                      <div
                        className={`badge uppercase w-20 font-bold text-gray-100 ${
                          manager.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {" "}
                        {manager.status}
                      </div>
                    </td>
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
        )}
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
        details={selectedManagerDetails}
      />
    </div>
  );
};

export default ManagersManagerPage;
