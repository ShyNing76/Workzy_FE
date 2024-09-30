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

const ServicesManagerPage = () => {
    const location = useLocation();

    const [services, setServices] = useState([
      { id: "SV01", name: "Service A", status: "Active" },
      { id: "SV02", name: "Service B", status: "Inactive" },
      { id: "SV03", name: "Service C", status: "Active" },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentService, setCurrentService] = useState({ id: "", name: "", status: "" });
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [successModal, setSuccessModal] = useState({ show: false, message: "" });
    const [successMessage, setSuccessMessage] = useState("");

    const serviceFields = [
        { name: 'id', label: 'Service ID', type: 'text' },
        { name: 'name', label: 'Service Name', type: 'text' },
        { name: 'status', label: 'Status', type: 'text' }
      ];
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCurrentService((prev) => ({ ...prev, [name]: value }));
    };

    const generateServiceId = () => {
        const lastId = services.length > 0 ? services[services.length - 1].id : "SV00";
        const newId = `SV${(parseInt(lastId.substring(2)) + 1).toString().padStart(2, '0')}`;
        return newId;
    };

    const handleAddServiceSubmit = (e) => {
        e.preventDefault();
        const newService = { ...currentService, id: generateServiceId() };
        setServices([...services, newService]);
        setShowAddModal(false);
        setSuccessMessage("Service Added Successfully!");
        setSuccessModal({ show: true, message: "Service Added Successfully!" });
        setCurrentService({ id: '', name: '', status: '' });
    };

    const handleUpdateServiceSubmit = (e) => {
      e.preventDefault();
      setServices((prevServices) => {
          const serviceIndex = prevServices.findIndex((service) => service.id === currentService.oldId);
          if (serviceIndex !== -1) {
              const updatedServices = [...prevServices];
              updatedServices[serviceIndex] = { ...currentService };
              return updatedServices;
          }
          return prevServices;
      });
      setShowUpdateModal(false);
      setSuccessModal({ show: true, message: "Service Updated Successfully!" });
      setCurrentService({ id: '', name: '', status: '' });
    };
  

    const handleDeleteService = () => {
      setServices((prevServices) =>
          prevServices.filter((service) => service.id !== serviceToDelete.id)
      );
      setShowDeleteModal(false);
      setSuccessModal({ show: true, message: "Service Deleted Successfully!" });
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const closeSuccessModal = () => {
      setSuccessModal({ show: false, message: "" });
    };
  
    const filteredServices = services.filter(
      (service) =>
        service.id.includes(searchTerm) ||
        service.name.includes(searchTerm) ||
        service.status.includes(searchTerm)
    );
  
    return (
      <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Services</h1>

        <div className="grid grid-cols-2">
            <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            placeholder="Search by ID, name, or status"
            />

            {/* Add Button */}
            <div className="ml-2">
                <AddButton onClick={() => setShowAddModal(true)} label="Add Service" />
            </div>
            
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Service Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.name}</td>
                    <td>{service.status}</td>
                    <td>
                      {/* Update Button */}
                      <UpdateButton
                        onClick={() => {
                          setCurrentService({ ...service, oldId: service.id });
                          setShowUpdateModal(true);
                        }}
                      />

                      {/* Delete Button */}
                      <DeleteButton
                        onClick={() => {
                          setServiceToDelete(service);
                          setShowDeleteModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Services Found
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
            onSubmit={handleAddServiceSubmit}
            currentItem={currentService}
            onInputChange={handleInputChange}
            fields={serviceFields}
      />

      <UpdateModal
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            onSubmit={handleUpdateServiceSubmit}
            currentItem={currentService}
            onInputChange={handleInputChange}
            fields={serviceFields}
      />

      <DeleteModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={handleDeleteService}
            itemToDelete={serviceToDelete}
            itemType="service"
      />

      <SuccessModal
          show={successModal.show}
          message={successModal.message}
          onClose={closeSuccessModal}
      />
  </div>
    );
};

export default ServicesManagerPage;