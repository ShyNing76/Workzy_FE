import React, { useEffect, useState } from "react";
import { getStaff, getStaffById } from "../../../config/api.admin.js";
import { postStaff } from "../../../config/api.admin.js";
import { putStaff } from "../../../config/api.admin.js";
import { deleteStaff } from "../../../config/api.admin.js";
import { getManager } from "../../../config/api.admin.js";
import { getCustomer } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import SuccessModal from "../../../components/layout/Admin/Modals/SuccessModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";

import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const StaffsManagerPage = () => {
  const location = useLocation();

  const [staff, setStaff] = useState(null);
  const [manager, setManager] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [newStaff, setNewStaff] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
  });
  const [response, setResponseData] = useState(null);
  const [selectedStaffDetails, setSelectedStaffDetails] = useState(null);
  const [noStaffFound, setNoStaffFound] = useState(false); // State để kiểm tra xem có staff nào được tìm thấy không

  const formatDateToISO = (dateString) => {
    if (!dateString || !dateString.includes("/")) {
      return ""; // Default or handle missing date
    }
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

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

  const fetchStaff = async () => {
    try {
      const res = await getStaff(statusFilter, genderFilter, searchTerm);
      if (res && res.data && Array.isArray(res.data.rows)) {
        setStaff(res.data.rows);
        setNoStaffFound(res.data.rows.length === 0); // Cập nhật state noStaffFound
      } else {
        setStaff([]);
        setNoStaffFound(true); // Cập nhật state noStaffFound
      }
    } catch (err) {
      setError(err);
      setNoStaffFound(true); // Cập nhật state noStaffFound
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [statusFilter, genderFilter, searchTerm]);

  const fetchData = async () => {
    try {
      const managerRes = await getManager();
      const customerRes = await getCustomer();

      setManager(managerRes.data.rows || []);
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
      const res = await getStaffById(user_id);
      if (res && res.data) {
        const staffDetails = {
          ...res.data,
          date_of_birth: formatDate(res.data.date_of_birth),
        };

        setSelectedStaffDetails(staffDetails);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error("Error fetching staff type details: ", err);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();

    if (
      !newStaff.name ||
      !newStaff.email ||
      !newStaff.password ||
      !newStaff.phone
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

    const isEmailDuplicate = [...staff, ...manager, ...customer].some(
      (person) => person.email === newStaff.email
    );
    if (isEmailDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "This email is already in use.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const isPhoneDuplicate = [...staff, ...manager, ...customer].some(
      (person) => person.phone === newStaff.phone
    );
    if (isPhoneDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "This phone number is already in use.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newStaff.name) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Staff name is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newStaff.email) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Staff email is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newStaff.password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Staff password is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newStaff.phone) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Staff phone is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const emailDuplicate =
      staff && staff.some((item) => item.email === newStaff.email);
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
      staff && staff.some((item) => item.phone === newStaff.phone);
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

    if (newStaff.password !== newStaff.confirmPassword) {
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

    try {
      const { email, password, phone, name } = newStaff;
      const staffResponse = await postStaff({ email, password, phone, name });
      setSuccessMessage(
        `Staff member ${staffResponse.data.name} added successfully!`
      );
      setShowAddModal(false);
      setNewStaff({ email: "", password: "", phone: "", name: "" });
      fetchStaff();
    } catch (err) {
      console.error("Failed to add new staff member:", err);
      setError(err.response?.data?.message || "Failed to add new staff");
    }
  };

  const addStaffFields = [
    { label: "Name", type: "text", name: "name", value: `${newStaff.name}` },
    { label: "Email", type: "text", name: "email", value: `${newStaff.email}` },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: `${newStaff.password}`,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      value: `${newStaff.confirmPassword}`,
    },
    { label: "Phone", type: "text", name: "phone", value: `${newStaff.phone}` },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  const resetNewStaff = () => {
    setNewStaff({
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      name: "",
    });
  };

  const handleStatusToggle = async (staff) => {
    const newStatus = staff.status === "active" ? "inactive" : "active";
    const action = newStatus === "active" ? "unblock" : "block";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this staff?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await putStaff(staff.user_id, { ...staff, status: newStatus });

        setStaff((prevStaff) =>
          prevStaff.map((s) =>
            s.user_id === staff.user_id ? { ...s, status: newStatus } : s
          )
        );

        Swal.fire({
          icon: "success",
          title: `Staff status has been set to ${newStatus} successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error toggling workspace type status:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to set staff status to ${newStatus}. Try again later.`,
        });
      }
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
      <h1 className="text-4xl font-black mb-4">Manage Staffs</h1>

      <div className="grid grid-cols-2 items-center">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Staff Name"
        />

        <div className="ml-2 flex justify-end">
          <AddButton
            onClick={() => {
              resetNewStaff();
              setShowAddModal(true);
            }}
            label="Add Staff"
          />
        </div>
      </div>

      <div className="mb-4 flex gap-4">
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

      <div className="overflow-x-auto">
        {noStaffFound ? (
          <div className="text-center text-gray-500">No staff found</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Date of birth</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(staff) &&
                staff.map((staff) => (
                  <tr
                    key={staff.user_id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(staff.user_id)}
                  >
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.gender}</td>
                    <td>{formatDate(staff.date_of_birth)}</td>
                    <td>{staff.phone}</td>
                    <td>
                      <div
                        className={`badge uppercase w-20 font-bold text-gray-100 ${
                          staff.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {" "}
                        {staff.status}
                      </div>
                    </td>
                    <td>
                      <BlockButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusToggle(staff);
                        }}
                        status={staff.status}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStaff}
        currentItem={newStaff}
        onInputChange={handleInputChange}
        fields={addStaffFields}
      />

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedStaffDetails}
      />
    </div>
  );
};

export default StaffsManagerPage;
