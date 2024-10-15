import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getCustomer } from "../../../config/api.admin.js";
import { getCustomerById } from "../../../config/api.admin.js"
import { removeCustomer } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import { set } from "date-fns";


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
      const handleRowClick = async (customer_id) => {
        try {
          const res = await getCustomerById(customer_id);
          if (res && res.data) {
            setSelectedCustomerDetails(res.data);
            setShowDetailsModal(true);
          }
        } catch (err) {
          console.error("Error fetching workspace type details", err);
        }
      };

  const addCustomerFields = [
    // { name: "fname", label: "First Name", type: "text" },
    // { name: "lname", label: "Last Name", type: "text" },
    // {
    //   name: "role",
    //   label: "Role",
    //   type: "select",
    //   options: role.map((role) => ({
    //     label: role.name,
    //     value: role.id,
    //   })),
    //   className: "select select-bordered w-full",
    // },
    // { name: "info", label: "Information", type: "text" },
  ];

  const updateCustomerFields = [
    // { name: "id", label: "Staff ID", type: "text" },
    // { name: "fname", label: "First Name", type: "text" },
    // { name: "lname", label: "Last Name", type: "text" },
    // {
    //   name: "role",
    //   label: "Role",
    //   type: "select",
    //   options: role.map((role) => ({
    //     label: role.name,
    //     value: role.id,
    //   })),
    //   className: "select select-bordered w-full",
    // },
    // { name: "info", label: "Information", type: "text" },
  ];

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setCurrentCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomerSubmit = (e) => {
    // e.preventDefault();
    // const rolePrefix = currentCustomer.role || "MB"; // Default to "MB" if role not set
    // const newCustomer = {
    //   ...currentCustomer,
    //   id: generateCustomerId(rolePrefix),
    //   name: `${currentCustomer.fname} ${currentCustomer.lname}`,
    // };
    // setCustomers([...customers, newCustomer]);
    // setShowAddModal(false);
    // setSuccessMessage("Customer Added Successfully!");
    // setCurrentCustomer({ id: "", fname: "", lname: "", role: "", info: "" });
  };

  const handleUpdateCustomerSubmit = (e) => {
    // e.preventDefault();
    // setCustomers((prevCustomers) => {
    //   const customerIndex = prevCustomers.findIndex(
    //     (customer) => customer.id === currentCustomer.oldId
    //   );
    //   if (customerIndex !== -1) {
    //     const updatedCustomers = [...prevCustomers];
    //     updatedCustomers[customerIndex] = {
    //       ...currentCustomer,
    //       name: `${currentCustomer.fname} ${currentCustomer.lname}`,
    //     };
    //     return updatedCustomers;
    //   }
    //   return prevCustomers;
    // });
    // setShowUpdateModal(false);
    // setSuccessMessage("Customer Updated Successfully!");
    // setCurrentCustomer({ id: "", fname: "", lname: "", role: "", info: "" });
  };

  const handleDeleteCustomer = async () => {
    try {
      if (customerToDelete) {
        await removeCustomer(customerToDelete.customer_id);
        setCustomer((prevCustomers) =>
          prevCustomers.map((cust) => 
            cust.customer_id === customerToDelete.customer_id 
              ? { ...cust, status: "inactive" } 
              : cust
          )
        );
        setSuccessMessage("Customer status set to inactive successfully!");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
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
        <div className="ml-2">
          <AddButton onClick={() => setShowAddModal(true)} label="Add Customer" />
        </div>
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
                <tr key={customer.user_id} className="cursor-pointer" onClick={() => handleRowClick(customer.customer_id)}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.gender}</td>
                  <td>{customer.date_of_birth}</td>
                  <td>{customer.status}</td>
                  <td className="flex space-x-2">
                    {/* Update Button */}
                    <UpdateButton
                      // onClick={() => {
                      //   setCurrentCustomer({ ...customer, oldId: customer.id });
                      //   setShowUpdateModal(true);
                      // }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={() => {
                        setCustomerToDelete({
                          ...customer,
                          name: `${customer.lname} ${customer.fname}`,
                        });
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
      {/* <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddCustomerSubmit}
        currentItem={currentCustomer}
        onInputChange={handleInputChange}
        fields={addCustomerFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateCustomerSubmit}
        currentItem={currentCustomer}
        onInputChange={handleInputChange}
        fields={updateCustomerFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteCustomer}
        itemToDelete={customerToDelete}
        itemType="customer"
      /> */}

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedCustomerDetails}
      />
    </div>
  );
};

export default CustomersManagerPage;
