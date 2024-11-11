import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getCustomer } from "../../../config/api.admin.js";
import { getCustomerById } from "../../../config/api.admin.js"
import { putCustomer } from "../../../config/api.admin.js";
import { getStaff } from "../../../config/api.admin.js";
import { getManager } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";
import { set } from "date-fns";
import Swal from 'sweetalert2';

const CustomersManagerPage = () => {
  const location = useLocation();

  const [customer, setCustomer] = useState(null);
  const [staff, setStaff] = useState([]);
  const [manager, setManager] = useState([]);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    date_of_birth: '',
    image: null,
    status: ''
  });
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [noCustomerFound, setNoCustomerFound] = useState(false); // State để kiểm tra xem có customer nào được tìm thấy không

  const formatDate = (dateString) => {
    if (!dateString) return "None";
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return "None";
    }
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

  //Hiện data lên table
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await getCustomer(statusFilter, genderFilter, searchTerm);
      if (res && res.data && Array.isArray(res.data.rows)) {
        setCustomer(res.data.rows);
        setNoCustomerFound(res.data.rows.length === 0); // Cập nhật state noCustomerFound
      } else {
        setCustomer([]);
        setNoCustomerFound(true); // Cập nhật state noCustomerFound
      }
    } catch (err) {
      setError(err);
      setNoCustomerFound(true); // Cập nhật state noCustomerFound
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [statusFilter, genderFilter, searchTerm]); 

  //Hàm click lên hàng để hiện more details
  const handleRowClick = async (customer_id) => {
    try {
      const res = await getCustomerById(customer_id);
      if (res && res.data.User) {
        const userDetails = res.data.User;
        // Format the date_of_birth before setting details
        const formattedDetails = {
          ...userDetails,
          date_of_birth: formatDate(userDetails.date_of_birth)
        };
  
        console.log("API response for user_id: ", formattedDetails);
        setSelectedCustomerDetails(formattedDetails);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error("Error fetching customer details", err);
    }
  };

  //Khu vực hàm dành cho block/unblock
  const handleToggleStatus = async (customer) => {
    const newStatus = customer.status === "active" ? "inactive" : "active";
    const action = newStatus === "active" ? "unblock" : "block";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this customer?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await putCustomer(customer.user_id, { ...customer, status: newStatus });
        
        setCustomer((prevCustomer) =>
          prevCustomer.map((c) =>
            c.user_id === customer.user_id
              ? { ...c, status: newStatus }
              : c
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

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Customers</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Customer Name"
        />
      </div>

      <div className="mb-4 flex gap-4">
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="select select-bordered select-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          id="genderFilter"
          value={genderFilter}
          onChange={handleGenderFilterChange}
          className="select select-bordered select-sm"
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div>
        {/* <SuccessAlert message={successMessage} onClose={closeSuccessMessage} /> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {noCustomerFound ? (
          <div className="text-center text-gray-500">No Customer Found</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Date of birth</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customer && customer.map((customer) => (
                <tr key={customer.user_id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(customer.Customer.customer_id)}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.gender}</td>
                  <td>{formatDate(customer.date_of_birth)}</td>
                  <td>
                    <div
                      className={`badge uppercase w-20 font-bold text-gray-100 ${
                        customer.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {" "}
                      {customer.status}
                    </div>
                  </td>
                  <td className="flex space-x-2">
                    {/* Block/Unblock Button */}
                    <BlockButton
                      status={customer.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStatus(customer);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedCustomerDetails}
      />
    </div>
  );
};

export default CustomersManagerPage;