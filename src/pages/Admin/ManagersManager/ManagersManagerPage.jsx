import React, { useEffect, useState } from "react";
import { getManager } from "../../../config/api.admin.js";
import { getManagerById } from "../../../config/api.admin.js";
import { postManager } from "../../../config/api.admin.js";
import { putManager } from "../../../config/api.admin.js";
import { deleteManager } from "../../../config/api.admin.js"

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";

import { useLocation } from "react-router-dom";


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
    setNewManager({ name: '', email: '', password: '', date_of_birth: '', phone: ''});
  } catch(err){
    console.error("Error adding Manager: ", err);
  }
};

const addManagerFields = [
  { label: "Name", type: "text", name: "name", value: `${newManager.name}` },
  { label: "Email", type: "text", name: "email", value: `${newManager.email}` },
  { label: "Password", type: "text", name: "password", value: `${newManager.password}` },
  { label: "Date of birth:", type: "date", name: "date_of_birth", value: `${newManager.date_of_birth}`},
  { label: "Phone number:", type: "text", name: "phone", value: `${newManager.phone}` },
];

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewManager({
    ...newManager,
    [name]: value,
  });
};

//Khu vực hàm dành cho update

const handleUpdateManager = async (e) => {
  e.preventDefault();
  try{
    await putManager(newManager.Manager.user_id, newManager);
    fetchManager();
    setShowUpdateModal(false);
    setSuccessMessage("Manager Updated Successfully!");
  } catch (err) {
    console.error("Error updating Manager: ", err)
  }
}

const handleUpdateChange = (e) => {
  const { name, value } = e.target;
  setNewManager((prev) => ({ 
    ...prev, 
    [name]: value }));
};


const handleUpdateClick = (manager) => {
  setNewManager(manager);
  setShowUpdateModal(true);
};

const updateManagerFields = [
  { label: "Name", type: "text", name: "name", value: newManager.name },
  { label: "Email", type: "text", name: "email", value: newManager.email },
  { label: "Password", type: "text", name: "password", value: newManager.password },
  { label: "Date of birth", type: "date", name: "date_of_birth", value: newManager.date_of_birth },
  { label: "Phone number:", type: "text", name: "phone", value: newManager.phone },
];

//Khu vực hàm dành cho delete

const handleDeleteManager = async () => {
  if (managerToDelete) {
    const updatedManager = {
      ...managerToDelete,
      status: "inactive"
    };
    try {
      await putManager(managerToDelete.Manager.user_id, updatedManager);
      fetchManager(); // Refresh the manager list
      setSuccessMessage("Manager Inactivated Successfully!");
    } catch (err) {
      console.error("Error inactivating manager: ", err);
    }
    setShowDeleteModal(false);
  }
};


  // const handleDeleteManager = () => {
  //   setManagers((prevManagers) =>
  //     prevManagers.filter((manager) => manager.id !== managerToDelete.id)
  //   );
  //   setSuccessMessage("Manager Deleted Successfully!");
  //   setShowDeleteModal(false);
  // };

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
                <tr key={manager.user_id} className="cursor-pointer">
                {/*<tr key={manager.user_id} className="cursor-pointer" onClick={() => handleRowClick(manager.Manager.user_id)}>*/}
                  <td>{manager.name}</td>
                  <td>{manager.email}</td>
                  <td>{manager.gender}</td>
                  <td>{manager.date_of_birth}</td>
                  <td>{manager.status}</td>
                  <td>
                    {/* Update Button */}
                    <UpdateButton onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateClick(manager)
                    }} 
                    />

                    {/* Delete Button */}
                   <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setManagerToDelete(manager);
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
        onSubmit={handleAddManger}
        currentItem={newManager}
        onInputChange={handleInputChange}
        fields={addManagerFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateManager}
        currentItem={newManager}
        onInputChange={handleUpdateChange}
        fields={updateManagerFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteManager}
        itemToDelete={managerToDelete}
        itemType="manager"
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
