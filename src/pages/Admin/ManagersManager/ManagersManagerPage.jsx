import React, { useState } from "react";

import SearchBar from "../../../components/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/Admin/Modals/UpdateModal.jsx";
import SuccessModal from "../../../components/Admin/Modals/SuccessModal.jsx";
import AddButton from "../../../components/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/Admin/Buttons/DeleteButton.jsx";

import { useLocation } from "react-router-dom";

const ManagersManagerPage = () => {
    const location = useLocation();

    const [managers, setManagers] = useState([
      { id: "MN01", fname: "Van A", lname: "Le", info: "Staff manager " },
      { id: "MN02", fname: "Van B", lname: "Nguyen", info: "Room manager" },
      { id: "MN03", fname: "Duy Long", lname: "Do", info: "Location manager" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentManager, setCurrentManager] = useState({ id: "", fname: "", lname: "", info: "" });
    const [managerToDelete, setManagerToDelete] = useState(null);
    const [successModal, setSuccessModal] = useState({ show: false, message: "" });
    const [successMessage, setSuccessMessage] = useState("");

    const managerFields = [
        { name: 'id', label: 'Manager ID', type: 'text' },
        { name: 'fname', label: 'First Name', type: 'text' },
        { name: 'lname', label: 'Last Name', type: 'text' },
        { name: 'info', label: 'Information', type: 'text' }
    ];
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentManager((prev) => ({ ...prev, [name]: value }));
    };

    const generateManagerId = () => {
        const lastId = managers.length > 0 ? managers[managers.length - 1].id : "MN00";
        const newId = `MN${(parseInt(lastId.substring(2)) + 1).toString().padStart(2, '0')}`;
        return newId;
    };

    const handleAddManagerSubmit = (e) => {
        e.preventDefault();
        const newManager = { ...currentManager, id: generateManagerId(), name: `${currentManager.fname} ${currentManager.lname}` };
        setManagers([...managers, newManager]);
        setShowAddModal(false);
        setSuccessMessage("Manager Added Successfully!");
        setSuccessModal({ show: true, message: "Manager Added Successfully!" });
        setCurrentManager({ id: '', fname: '', lname: '', info: '' });
    };

    const handleUpdateManagerSubmit = (e) => {
      e.preventDefault();
      setManagers((prevManagers) => {
          const managerIndex = prevManagers.findIndex((manager) => manager.id === currentManager.oldId);
          if (managerIndex !== -1) {
              const updatedManagers = [...prevManagers];
              updatedManagers[managerIndex] = { ...currentManager, name: `${currentManager.fname} ${currentManager.lname}` };
              return updatedManagers;
          }
          return prevManagers;
      });
      setShowUpdateModal(false);
      setSuccessModal({ show: true, message: "Manager Updated Successfully!" });
      setCurrentManager({ id: '', fname: '', lname: '', info: '' });
    };
  

    const handleDeleteManager = () => {
      setManagers((prevManagers) =>
          prevManagers.filter((manager) => manager.id !== managerToDelete.id)
      );
      setShowDeleteModal(false);
      setSuccessModal({ show: true, message: "Manager Deleted Successfully!" });
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const closeSuccessModal = () => {
      setSuccessModal({ show: false, message: "" });
    };
  
    const filteredManagers = managers.filter(
      (manager) =>
        manager.id.includes(searchTerm) ||
        manager.fname.includes(searchTerm) ||
        manager.lname.includes(searchTerm) ||
        manager.info.includes(searchTerm)
    );
  
    return (
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Managers</h1>

        <div className="grid grid-cols-2">
            <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            placeholder="Search by ID, name, or information"
            />

            {/* Add Button */}
            <div className="ml-2">
                <AddButton onClick={() => setShowAddModal(true)} label="Add Manager" />
            </div>
            
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Manager ID</th>
                <th>Manager Name</th>
                <th>Information</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredManagers.length > 0 ? (
                filteredManagers.map((manager) => (
                  <tr key={manager.id}>
                    <td>{manager.id}</td>
                    <td>{manager.lname} {manager.fname}</td>
                    <td>{manager.info}</td>
                    <td>
                      {/* Update Button */}
                      <UpdateButton
                        onClick={() => {
                          setCurrentManager({ ...manager, oldId: manager.id });
                          setShowUpdateModal(true);
                        }}
                      />

                      {/* Delete Button */}
                      <DeleteButton
                        onClick={() => {
                          setManagerToDelete({...manager, name: `${manager.lname} ${manager.fname}`,});
                          setShowDeleteModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Managers Found
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
            onSubmit={handleAddManagerSubmit}
            currentItem={currentManager}
            onInputChange={handleInputChange}
            fields={managerFields}
      />

      <UpdateModal
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            onSubmit={handleUpdateManagerSubmit}
            currentItem={currentManager}
            onInputChange={handleInputChange}
            fields={managerFields}
      />

      <DeleteModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDeleteManager}
            itemToDelete={managerToDelete}
            itemType="manager"
      />

      <SuccessModal
          show={successModal.show}
          message={successModal.message}
          onClose={closeSuccessModal}
      />
  </div>
    );
};

export default ManagersManagerPage;