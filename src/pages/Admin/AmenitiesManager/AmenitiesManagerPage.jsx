import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../components/context/priceFormat.jsx";
import Swal from 'sweetalert2';


import { getAmenity } from "../../../config/api.admin.js";
import { getAmenityById } from "../../../config/api.admin.js";
import { postAmenity } from "../../../config/api.admin.js";
import { putAmenity } from "../../../config/api.admin.js";
import { toggleAmenityStatus } from "../../../config/api.admin.js";
import { deleteAmenity } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";

import { useLocation } from "react-router-dom";
import { set } from "date-fns";

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
    depreciation_price: 0,
    rent_price: 0,
    status: 'active'
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

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: successMessage,
        position: "top-end",
        toast: true, // makes it a toast message
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => setSuccessMessage("")); // clear the message after showing
    }
  }, [successMessage]);

  //Hàm click lên hàng để hiện more details
  const handleRowClick = async (amenity_id) => {
    try {
      const res = await getAmenityById(amenity_id);
      if (res && res.data) {
        const amenityDetails = res.data;
  
        // Format price fields using formatCurrency function
        const formattedDetails = {
          ...amenityDetails,
          original_price: formatCurrency(amenityDetails.original_price),
          depreciation_price: formatCurrency(amenityDetails.depreciation_price),
          rent_price: formatCurrency(amenityDetails.rent_price),
        };
  
        setSelectedAmenityDetails(formattedDetails);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error("Error fetching amenity details", err);
    }
  };

  //Khu vực hàm dành cho add
  const handleAddAmenity = async (e) => {
    e.preventDefault();

        // Validation logic
        if (!newAmenity.amenity_name) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Amenity name is required.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
      
        if (newAmenity.original_price <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Original price must be greater than 0.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }

    const formData = new FormData();
    formData.append('amenity_name', newAmenity.amenity_name);
    formData.append('image', newAmenity.image);
    formData.append('original_price', newAmenity.original_price);

    try {
      // Attempt to add the amenity
      const Amenity = await postAmenity(newAmenity);
      setResponseData(Amenity);
      fetchAmenity();
      setShowAddModal(false);
      setSuccessMessage("Amenity added successfully!");
    } catch (err) {
      // Handle the duplicate error response
      if (err.res === 1) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.res.data.message || "An error occurred.",
          position: 'top-end',
          toast: true,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }

  

  const addAmenityFields = [
    { name: "amenity_name", label: "Amenity Name", type: "text", value: `${newAmenity.amenity_name}` },
    { name: "image", label: "Images", type: "file", multiple: true, value: `${newAmenity.image}` },
    { name: "original_price", label: "Original Price", type: "number", value: `${newAmenity.original_price}` },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setNewAmenity({
      ...newAmenity,
      [name]: files ? files[0] : value,
    })
  };

//Khu vực hàm dành cho update
  const handleUpdateAmenity = async (e) => {
    e.preventDefault();

        if (!newAmenity.amenity_name) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Amenity name is required.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
      
        if (newAmenity.original_price <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Original price must be greater than 0.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }

    try{
      await putAmenity(newAmenity.amenity_id, newAmenity)
      fetchAmenity();
      setShowUpdateModal(false);
      setSuccessMessage("Amenity updated successfully!");
    } catch (err) {
      console.error("Error updating amenity", err);
    }
  }

  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAmenity((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (checked ? 'active' : 'inactive') : value,
    }));
  }

  const handleUpdateClick = (amenity) => {
    setNewAmenity(amenity);
    setShowUpdateModal(true);
  }

  const updateAmenityFields = [
    { name: "amenity_name", label: "Amenity Name", type: "text", value: `${newAmenity.amenity_name}` },
    { name: "image", label: "Images", type: "file", multiple: true, value: `${newAmenity.image}` },
    { name: "original_price", label: "Original Price", type: "number", value: `${newAmenity.original_price}` },
    { 
      label: "Status", 
      type: "checkbox", 
      name: "status", 
      checked: `${newAmenity.status}` === "active", 
      onChange: handleUpdateChange,
      checkboxLabels: { checked: "active", unchecked: "inactive" }
    },
  ];

    
    //Khu vực hàm dành cho nut block/unblock
    const handleToggleStatus = async (amenity) => {
      const newStatus = amenity.status === "inactive" ? "active" : "inactive";
      const action = newStatus === "active" ? "unblock" : "block";
    
      // Trigger a confirmation dialog
      const result = await Swal.fire({
        icon: 'warning',
        title: `Are you sure you want to ${action} this amenity?`,
        showCancelButton: true,
        confirmButtonText: `Yes, ${action} it!`,
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });
    
      // If the user confirms, proceed with toggling
      if (result.isConfirmed) {
        try {
          await putAmenity(amenity.amenity_id, { ...amenity, status: newStatus });
    
          setAmenity((prevAmenities) =>
            prevAmenities.map((item) =>
              item.amenity_id === amenity.amenity_id ? { ...item, status: newStatus } : item
            )
          );
    
          Swal.fire({
            icon: 'success',
            title: `Amenity status has been set to ${newStatus} successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
    
        } catch (err) {
          console.error(`Error updating amenity status to ${newStatus}:`, err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Failed to set amenity status to ${newStatus}. Try again later.`,
          });
        }
      }
    };

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
          <AddButton 
            onClick={() => setShowAddModal(true)} 
            label="Add Amenity" />
        </div>
      </div>

      <div>
        {/* <SuccessAlert message={successMessage} onClose={closeSuccessMessage} /> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex flex-1">
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
                <tr key={amenity.amenity_id} className="hover:bg-gray-100" onClick={() => handleRowClick(amenity.amenity_id)}>
                  <td>{amenity.amenity_name}</td>
                  <td>{formatCurrency(amenity.original_price)}</td>
                  <td>{formatCurrency(amenity.depreciation_price)}</td>
                  <td>{formatCurrency(amenity.rent_price)}</td>
                  <td>{amenity.status}</td>
                  <td className="flex space-x-2">
                    {/* Update Button */}
                    <UpdateButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click from being triggered
                        handleUpdateClick(amenity);
                      }}
                    />

                     {/* Block/Unblock Button */}
                    <BlockButton
                      status={amenity.status}
                      onClick={(e) => {
                      e.stopPropagation(); // Prevent row click from being triggered
                      handleToggleStatus(amenity);
                      }}
                    />
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
      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddAmenity}
        currentItem={newAmenity}
        onInputChange={handleInputChange}
        fields={addAmenityFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateAmenity}
        currentItem={newAmenity}
        onInputChange={handleUpdateChange}
        fields={updateAmenityFields}
      />

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedAmenityDetails}
      />
    </div>
  );
};

export default AmenitiesManagerPage;

