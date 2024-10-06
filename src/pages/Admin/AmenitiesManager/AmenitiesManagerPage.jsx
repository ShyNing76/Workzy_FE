import React, { useState } from "react";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";

import { useLocation } from "react-router-dom";

const AmenitiesManagerPage = () => {
  const location = useLocation();

  const [amenities, setAmenities] = useState([
    {
      id: "AM01",
      name: "Amenity A",
      images: [],
      originalPrice: 100000,
      depreciationPrice: 80000,
      rentPrice: 20000,
      type: "type1",
      status: "Active",
    },
    {
      id: "AM02",
      name: "Amenity B",
      images: [],
      originalPrice: 200000,
      depreciationPrice: 90000,
      rentPrice: 30000,
      type: "type2",
      status: "Inactive",
    },
    {
      id: "AM03",
      name: "Amenity C",
      images: [],
      originalPrice: 300000,
      depreciationPrice: 100000,
      rentPrice: 40000,
      type: "type3",
      status: "Active",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState({
    id: "",
    name: "",
    images: "",
    originalPrice: "",
    depreciationPrice: "",
    rentPrice: "",
    type: "",
    status: "",
  });
  const [amenityToDelete, setAmenityToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const addAmenityFields = [
    { name: "name", label: "Amenity Name", type: "text" },
    { name: "images", label: "Images", type: "file", multiple: true },
    { name: "originalPrice", label: "Original Price", type: "number" },
    { name: "depreciationPrice", label: "Depreciation Price", type: "number" },
    { name: "rentPrice", label: "Rent Price", type: "number" },
    { name: "type", label: "Type", type: "text" },
  ];

  const updateAmenityFields = [
    { name: "id", label: "Amenity ID", type: "text" },
    { name: "name", label: "Amenity name", type: "text" },
    { name: "images", label: "Images", type: "file", multiple: true },
    { name: "originalPrice", label: "Original Price", type: "number" },
    { name: "depreciationPrice", label: "Depreciation Price", type: "number" },
    { name: "rentPrice", label: "Rent Price", type: "number" },
    { name: "type", label: "Type", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "checkbox",
      checkboxLabels: { checked: "Available", unchecked: "Unavailable" },
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAmenity((prev) => ({ ...prev, [name]: value }));
  };

  const generateAmenityId = () => {
    const lastId =
      amenities.length > 0 ? amenities[amenities.length - 1].id : "AM00";
    const newId = `AM${(parseInt(lastId.substring(2)) + 1)
      .toString()
      .padStart(2, "0")}`;
    return newId;
  };

  const handleAddAmenitySubmit = (e) => {
    e.preventDefault();
    const newAmenity = {
      ...currentAmenity,
      id: generateAmenityId(),
      status: "Active",
    };
    setAmenities([...amenities, newAmenity]);
    setShowAddModal(false);
    setSuccessMessage("Amenity Added Successfully!");
    setCurrentAmenity({
      id: "",
      name: "",
      images: "",
      originalPrice: "",
      depreciationPrice: "",
      rentPrice: "",
      type: "",
      status: "",
    });
  };

  const handleUpdateAmenitySubmit = (e) => {
    e.preventDefault();
    setAmenities((prevAmenities) => {
      const amenityIndex = prevAmenities.findIndex(
        (amenity) => amenity.id === currentAmenity.oldId
      );
      if (amenityIndex !== -1) {
        const updatedAmenities = [...prevAmenities];
        updatedAmenities[amenityIndex] = { ...currentAmenity };
        return updatedAmenities;
      }
      return prevAmenities;
    });
    setShowUpdateModal(false);
    setSuccessMessage("Amenity Updated Successfully!");
    setCurrentAmenity({
      id: "",
      name: "",
      images: "",
      originalPrice: "",
      depreciationPrice: "",
      rentPrice: "",
      type: "",
      status: "",
    });
  };

  const handleDeleteAmenity = () => {
    setAmenities((prevAmenities) =>
      prevAmenities.filter((amenity) => amenity.id !== amenityToDelete.id)
    );
    setShowDeleteModal(false);
    setSuccessMessage("Amenity Deleted Successfully!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  const filteredAmenities = amenities.filter(
    (amenity) =>
      amenity.id.includes(searchTerm) ||
      amenity.name.includes(searchTerm) ||
      amenity.status.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Amenities</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          placeholder="Search by ID, name, or status"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton
            onClick={() => setShowAddModal(true)}
            label="Add Amenity"
          />
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
              <th>Amenity ID</th>
              <th>Amenity Name</th>
              <th>Images</th>
              <th>Original Price</th>
              <th>Depreciation Price</th>
              <th>Rent Price</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAmenities.length > 0 ? (
              filteredAmenities.map((amenity) => (
                <tr key={amenity.id}>
                  <td>{amenity.id}</td>
                  <td>{amenity.name}</td>
                  <td>{amenity.images}</td>
                  <td>{amenity.originalPrice}</td>
                  <td>{amenity.depreciationPrice}</td>
                  <td>{amenity.rentPrice}</td>
                  <td>{amenity.type}</td>
                  <td>{amenity.status}</td>
                  <td className="flex space-x-2">
                    {/* Update Button */}
                    <UpdateButton
                      onClick={() => {
                        setCurrentAmenity({ ...amenity, oldId: amenity.id });
                        setShowUpdateModal(true);
                      }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={() => {
                        setAmenityToDelete(amenity);
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Amenitys Found
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
        onSubmit={handleAddAmenitySubmit}
        currentItem={currentAmenity}
        onInputChange={handleInputChange}
        fields={addAmenityFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateAmenitySubmit}
        currentItem={currentAmenity}
        onInputChange={handleInputChange}
        fields={updateAmenityFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteAmenity}
        itemToDelete={amenityToDelete}
        itemType="amenity"
      />
    </div>
  );
};

export default AmenitiesManagerPage;
