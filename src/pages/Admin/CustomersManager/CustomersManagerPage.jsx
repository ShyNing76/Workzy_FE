import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getCustomer } from "../../../config/api.admin.js";
import { getCustomerById } from "../../../config/api.admin.js"
import { removeCustomer } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import { set } from "date-fns";
import Swal from 'sweetalert2';


const CustomersManagerPage = () => {
  const location = useLocation();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  //const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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

  //Hiện data lên table
  const fetchCustomer = async () => {
    try {
      const res = await getCustomer();
      console.log("API response", res);
      if (res && res.data && Array.isArray(res.data.rows)){
        setCustomer(res.data.rows);
      } else {
        setCustomer([]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomer();
  }, []); 

      //Hàm click lên hàng để hiện more details
      const handleRowClick = async (user_id) => {
        console.log("Clicked user_id: ", user_id);
        try {
          const res = await getCustomerById(user_id);
          if (res && res.data) {
            setSelectedCustomerDetails(res.data);
            setShowDetailsModal(true);
          }
        } catch (err) {
          console.error("Error fetching workspace type details", err);
        }
      };

  const handleDeleteCustomer = async () => {
    try {
      if (customerToDelete) {
        // Make sure to use the correct identifier, assumed to be customer_id
        const response = await removeCustomer(customerToDelete.user_id);
  
        if (response && response.status === 200) { // Check if response is successful
          setCustomer((prevCustomers) =>
            prevCustomers.map((cust) => 
              // Update only the selected customer
              cust.user_id === customerToDelete.user_id 
                ? { ...cust, status: "inactive" } 
                : cust
            )
          );
          setSuccessMessage("Customer status set to inactive successfully!");
        } else {
          throw new Error("Failed to update status");
        }
      }
    } catch (error) {
      console.error("Error setting customer to inactive:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const closeSuccessMessage = () => {
  //   setSuccessMessage("");
  // };

  // const filteredCustomers = customers.filter(
  //   (customer) =>
  //     customer.id.includes(searchTerm) ||
  //     customer.fname.includes(searchTerm) ||
  //     customer.lname.includes(searchTerm) ||
  //     customer.role.includes(searchTerm) ||
  //     customer.info.includes(searchTerm)
  // );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Customers</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          // searchTerm={searchTerm}
          // handleSearchChange={handleSearchChange}
          // placeholder="Search by ID, name, or information"
        />

        {/* Add Button */}
        {/* <div className="ml-2">
          <AddButton onClick={() => setShowAddModal(true)} label="Add Customer" />
        </div> */}
      </div>

      <div>
        {/* <SuccessAlert message={successMessage} onClose={closeSuccessMessage} /> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
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
            {Array.isArray(customer) && customer.map((customer) => (
                <tr key={customer.user_id} className="cursor-pointer" onClick={() => handleRowClick(customer.Customer.user_id)}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.date_of_birth}</td>
                  <td>{customer.status}</td>
                  <td className="flex space-x-2">

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setCustomerToDelete(customer);
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

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteCustomer}
        itemToDelete={customerToDelete}
        itemType="customer"
      /> 

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedCustomerDetails}
      />
    </div>
  );
};

export default CustomersManagerPage;
