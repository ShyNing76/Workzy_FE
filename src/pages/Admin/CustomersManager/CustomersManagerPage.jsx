import React, { useState } from "react";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";

import { useLocation } from "react-router-dom";

const CustomersManagerPage = () => {
  const location = useLocation();

  const [customers, setCustomers] = useState([
    { id: "MB01", fname: "Van A", lname: "Le", role: "MB", info: "Khách hàng 1" },
    { id: "MB02", fname: "Van B", lname: "Nguyen", role: "MB", info: "Khách hàng 2" },
    { id: "MB03", fname: "Duy Long", lname: "Do", role: "MB", info: "Khách hàng 3" },
    { id: "V01", fname: "Van A", lname: "Le", role: "V", info: "VIP 1" },
    { id: "V02", fname: "Van B", lname: "Nguyen", role: "V", info: "VIP 2" },
    { id: "V03", fname: "Duy Long", lname: "Do", role: "V", info: "VIP 1" },
  ]);

  const [role, setRole] = useState([
    { id: "MB", name: "Member" },
    { id: "V", name: "VIP" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({
    id: "",
    fname: "",
    lname: "",
    role: "",
    info: "",
  });
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const addCustomerFields = [
    { name: "fname", label: "First Name", type: "text" },
    { name: "lname", label: "Last Name", type: "text" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: role.map((role) => ({
        label: role.name,
        value: role.id,
      })),
      className: "select select-bordered w-full",
    },
    { name: "info", label: "Information", type: "text" },
  ];

  const updateCustomerFields = [
    { name: "id", label: "Staff ID", type: "text" },
    { name: "fname", label: "First Name", type: "text" },
    { name: "lname", label: "Last Name", type: "text" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: role.map((role) => ({
        label: role.name,
        value: role.id,
      })),
      className: "select select-bordered w-full",
    },
    { name: "info", label: "Information", type: "text" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const generateCustomerId = (rolePrefix) => {
    // Filter Customers by the current role to find last assigned ID for that role
    const filteredCustomers = customers.filter(customer => customer.role === rolePrefix);
  
    // Determine the last ID used for the given role
    const lastId = 
      filteredCustomers.length > 0 
        ? filteredCustomers[filteredCustomers.length - 1].id 
        : `${rolePrefix}00`;
  
    // Generate the new ID
    const newId = `${rolePrefix}${(parseInt(lastId.substring(2)) + 1).toString().padStart(2, "0")}`;
  
    return newId;
  };

  const handleAddCustomerSubmit = (e) => {
    e.preventDefault();
    const rolePrefix = currentCustomer.role || "MB"; // Default to "MB" if role not set
    const newCustomer = {
      ...currentCustomer,
      id: generateCustomerId(rolePrefix),
      name: `${currentCustomer.fname} ${currentCustomer.lname}`,
    };
    setCustomers([...customers, newCustomer]);
    setShowAddModal(false);
    setSuccessMessage("Customer Added Successfully!");
    setCurrentCustomer({ id: "", fname: "", lname: "", role: "", info: "" });
  };

  const handleUpdateCustomerSubmit = (e) => {
    e.preventDefault();
    setCustomers((prevCustomers) => {
      const customerIndex = prevCustomers.findIndex(
        (customer) => customer.id === currentCustomer.oldId
      );
      if (customerIndex !== -1) {
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[customerIndex] = {
          ...currentCustomer,
          name: `${currentCustomer.fname} ${currentCustomer.lname}`,
        };
        return updatedCustomers;
      }
      return prevCustomers;
    });
    setShowUpdateModal(false);
    setSuccessMessage("Customer Updated Successfully!");
    setCurrentCustomer({ id: "", fname: "", lname: "", role: "", info: "" });
  };

  const handleDeleteCustomer = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== customerToDelete.id)
    );
    setShowDeleteModal(false);
    setSuccessMessage("Customer Deleted Successfully!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.id.includes(searchTerm) ||
      customer.fname.includes(searchTerm) ||
      customer.lname.includes(searchTerm) ||
      customer.role.includes(searchTerm) ||
      customer.info.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Customers</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          placeholder="Search by ID, name, or information"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton onClick={() => setShowAddModal(true)} label="Add Customer" />
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
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Role</th>
              <th>Information</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>
                    {customer.lname} {customer.fname}
                  </td>
                  <td>{customer.role}</td>
                  <td>{customer.info}</td>
                  <td>
                    {/* Update Button */}
                    <UpdateButton
                      onClick={() => {
                        setCurrentCustomer({ ...customer, oldId: customer.id });
                        setShowUpdateModal(true);
                      }}
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Customers Found
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
      />
    </div>
  );
};

export default CustomersManagerPage;
