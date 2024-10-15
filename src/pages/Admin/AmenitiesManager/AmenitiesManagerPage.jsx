import React, { useEffect, useState } from "react";

import { getAmenity } from "../../../config/api.admin.js";
import { getAmenityById } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";

import { useLocation } from "react-router-dom";

const AmenitiesManagerPage = () => {
  const location = useLocation();

  const [amenity, setAmenity] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  //const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAmenityDetails, setSelectedAmenityDetails] = useState("");
  const [amenityToDelete, setAmenityToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newAmenity, setNewAmenity] = useState({
    amenity_name: '',
    image: null,
    original_price: 0,
    depreciation_price: '',
    rent_price: '',
  });

  const [responseData, setResponseData] = useState(null);

  //Hiện data lên table
  const fetchAmenity = async () => {
    try {
      const res = await getAmenity();
      console.log("API response:", res); // Inspect API response
      if (res && res.data && Array.isArray(res.data.rows)) {
        setAmenity(res.data.rows);
      } else {
        setAmenity([]); // Initialize as an empty array if data is not as expected
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenity();
  }, []);

  //Hàm click lên hàng để hiện more details
  const handleRowClick = async (amenity_id) => {
    try {
      const res = await getAmenityById(amenity_id);
      if (res && res.data) {
        setSelectedAmenityDetails(res.data);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error("Error fetching amenity details", err);
    }
  };
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

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCurrentAmenity((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleRowClick = (amenity) => {
  //   // Set the current amenity details in a structured form
  //   setCurrentAmenityDetails({
  //     ID: amenity.id,
  //     Name: amenity.name,
  //     "Original Price": amenity.originalPrice,
  //     "Depreciation Price": amenity.depreciationPrice,
  //     "Rent Price": amenity.rentPrice,
  //     Type: amenity.type,
  //     Status: amenity.status,
  //     Images: amenity.images.join(", ") // Assuming images are URLs
  //   });
  //   setShowDetailsModal(true);
  // };

  // const handleAddAmenitySubmit = (e) => {
  //   e.preventDefault();
  //   const newAmenity = {
  //     ...currentAmenity,
  //     id: generateAmenityId(),
  //     status: "Active",
  //   };
  //   setAmenities([...amenities, newAmenity]);
  //   setShowAddModal(false);
  //   setSuccessMessage("Amenity Added Successfully!");
  //   setCurrentAmenity({
  //     id: "",
  //     name: "",
  //     images: "",
  //     originalPrice: "",
  //     depreciationPrice: "",
  //     rentPrice: "",
  //     type: "",
  //     status: "",
  //   });
  // };

  // const handleUpdateAmenitySubmit = (e) => {
  //   e.preventDefault();
  //   setAmenities((prevAmenities) => {
  //     const amenityIndex = prevAmenities.findIndex(
  //       (amenity) => amenity.id === currentAmenity.oldId
  //     );
  //     if (amenityIndex !== -1) {
  //       const updatedAmenities = [...prevAmenities];
  //       updatedAmenities[amenityIndex] = { ...currentAmenity };
  //       return updatedAmenities;
  //     }
  //     return prevAmenities;
  //   });
  //   setShowUpdateModal(false);
  //   setSuccessMessage("Amenity Updated Successfully!");
  //   setCurrentAmenity({
  //     id: "",
  //     name: "",
  //     images: "",
  //     originalPrice: "",
  //     depreciationPrice: "",
  //     rentPrice: "",
  //     type: "",
  //     status: "",
  //   });
  // };

  // const handleDeleteAmenity = () => {
  //   setAmenities((prevAmenities) =>
  //     prevAmenities.filter((amenity) => amenity.id !== amenityToDelete.id)
  //   );
  //   setShowDeleteModal(false);
  //   setSuccessMessage("Amenity Deleted Successfully!");
  // };

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const closeSuccessMessage = () => {
  //   setSuccessMessage("");
  // };

  // const filteredAmenities = amenities.filter(
  //   (amenity) =>
  //     amenity.id.includes(searchTerm) ||
  //     amenity.name.includes(searchTerm) ||
  //     amenity.status.includes(searchTerm)
  // );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Amenities</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          // searchTerm={searchTerm}
          // handleSearchChange={handleSearchChange}
          // placeholder="Search by ID, name, or status"
        />

        {/* Add Button */}
        <div className="ml-2">
          {/* <AddButton onClick={() => setShowAddModal(true)} label="Add Amenity" /> */}
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
              <th>Amenity Name</th>
              <th>Original Price</th>
              <th>Depreciation Price</th>
              <th>Rent Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(amenity) && amenity.map((amenity) => (
                <tr key={amenity.amenity_id}>
                  <td>{amenity.amenity_name}</td>
                  <td>{amenity.original_price}</td>
                  <td>{amenity.depreciation_price}</td>
                  <td>{amenity.rent_price}</td>
                  <td>{amenity.status}</td>
                  <td className="flex"></td>
                  <td className="flex space-x-2">
                    {/* Update Button */}
                    {/* <UpdateButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click from being triggered
                        setCurrentAmenity({ ...amenity, oldId: amenity.id });
                        setShowUpdateModal(true);
                      }}
                    /> */}
                    
                    {/* Delete Button */}
                    {/* <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click from being triggered
                        setAmenityToDelete(amenity);
                        setShowDeleteModal(true);
                      }}
                    /> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {/* <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={currentAmenityDetails}
      />

      {/* Add, Update, Delete Modals */}
      {/* <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddAmenitySubmit}
        currentItem={currentAmenity}
        onInputChange={handleInputChange}
        fields={addAmenityFields}
      /> */}

      {/* <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateAmenitySubmit}
        currentItem={currentAmenity}
        onInputChange={handleInputChange}
        fields={updateAmenityFields}
      /> */}

      {/* <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteAmenity}
        itemToDelete={amenityToDelete}
        itemType="amenity"
      /> */}
    </div>
  );
};

export default AmenitiesManagerPage;

