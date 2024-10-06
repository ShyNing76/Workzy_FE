import React, { useState } from "react";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import SuccessModal from "../../../components/layout/Admin/Modals/SuccessModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";

import { useLocation } from "react-router-dom";

const VIPsManagerPage = () => {
  const location = useLocation();

  const [VIPs, setVIPs] = useState([
    { id: "V01", fname: "Van A", lname: "Le", type: "VIP 1" },
    { id: "V02", fname: "Van B", lname: "Nguyen", type: "VIP 2" },
    { id: "V03", fname: "Duy Long", lname: "Do", type: "VIP 1" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentVIP, setCurrentVIP] = useState({
    id: "",
    fname: "",
    lname: "",
    type: "",
  });
  const [VIPToDelete, setVIPToDelete] = useState(null);
  const [successModal, setSuccessModal] = useState({
    show: false,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const addVIPFields = [
    { name: "fname", label: "First Name", type: "text" },
    { name: "lname", label: "Last Name", type: "text" },
    { name: "type", label: "VIP level", type: "text" },
  ];

  const updateVIPFields = [
    { name: "id", label: "Staff ID", type: "text" },
    { name: "fname", label: "First Name", type: "text" },
    { name: "lname", label: "Last Name", type: "text" },
    { name: "type", label: "VIP level", type: "text" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVIP((prev) => ({ ...prev, [name]: value }));
  };

  const generateVIPId = () => {
    const lastId = VIPs.length > 0 ? VIPs[VIPs.length - 1].id : "V00";
    const newId = `V${(parseInt(lastId.substring(1)) + 1)
      .toString()
      .padStart(2, "0")}`;
    return newId;
  };

  const handleAddVIPSubmit = (e) => {
    e.preventDefault();
    const newVIP = {
      ...currentVIP,
      id: generateVIPId(),
      name: `${currentVIP.fname} ${currentVIP.lname}`,
    };
    setVIPs([...VIPs, newVIP]);
    setShowAddModal(false);
    setSuccessMessage("VIP Added Successfully!");
    setSuccessModal({ show: true, message: "VIP Added Successfully!" });
    setCurrentVIP({ id: "", fname: "", lname: "", type: "" });
  };

  const handleUpdateVIPSubmit = (e) => {
    e.preventDefault();
    setVIPs((prevVIPs) => {
      const VIPIndex = prevVIPs.findIndex((VIP) => VIP.id === currentVIP.oldId);
      if (VIPIndex !== -1) {
        const updatedVIPs = [...prevVIPs];
        updatedVIPs[VIPIndex] = {
          ...currentVIP,
          name: `${currentVIP.fname} ${currentVIP.lname}`,
        };
        return updatedVIPs;
      }
      return prevVIPs;
    });
    setShowUpdateModal(false);
    setSuccessModal({ show: true, message: "VIP Updated Successfully!" });
    setCurrentVIP({ id: "", fname: "", lname: "", type: "" });
  };

  const handleDeleteVIP = () => {
    setVIPs((prevVIPs) => prevVIPs.filter((VIP) => VIP.id !== VIPToDelete.id));
    setShowDeleteModal(false);
    setSuccessModal({ show: true, message: "VIP Deleted Successfully!" });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeSuccessModal = () => {
    setSuccessModal({ show: false, message: "" });
  };

  const filteredVIPs = VIPs.filter(
    (VIP) =>
      VIP.id.includes(searchTerm) ||
      VIP.fname.includes(searchTerm) ||
      VIP.lname.includes(searchTerm) ||
      VIP.type.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage VIPs</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          placeholder="Search by ID, name, or VIP level"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton onClick={() => setShowAddModal(true)} label="Add VIP" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>VIP ID</th>
              <th>VIP Name</th>
              <th>VIP level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVIPs.length > 0 ? (
              filteredVIPs.map((VIP) => (
                <tr key={VIP.id}>
                  <td>{VIP.id}</td>
                  <td>
                    {VIP.lname} {VIP.fname}
                  </td>
                  <td>{VIP.type}</td>
                  <td>
                    {/* Update Button */}
                    <UpdateButton
                      onClick={() => {
                        setCurrentVIP({ ...VIP, oldId: VIP.id });
                        setShowUpdateModal(true);
                      }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={() => {
                        setVIPToDelete({
                          ...VIP,
                          name: `${VIP.lname} ${VIP.fname}`,
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
                  No VIPs Found
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
        onSubmit={handleAddVIPSubmit}
        currentItem={currentVIP}
        onInputChange={handleInputChange}
        fields={addVIPFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateVIPSubmit}
        currentItem={currentVIP}
        onInputChange={handleInputChange}
        fields={updateVIPFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteVIP}
        itemToDelete={VIPToDelete}
        itemType="VIP"
      />

      <SuccessModal
        show={successModal.show}
        message={successModal.message}
        onClose={closeSuccessModal}
      />
    </div>
  );
};

export default VIPsManagerPage;
