import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../components/context/priceFormat.jsx";
import Swal from "sweetalert2";

import {
  getAmenity,
  getAmenityById,
  postAmenity,
  putAmenity,
  blockAmenity,
} from "../../../config/api.admin.js";

import Pagination from "../../../components/layout/Shared/Pagination/Pagination.jsx";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SearchButton from "../../../components/layout/Admin/Buttons/SearchButton.jsx";

const AmenitiesManagerPage = () => {
  const [amenity, setAmenity] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAmenityDetails, setSelectedAmenityDetails] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [newAmenity, setNewAmenity] = useState({
    amenity_name: "",
    image: null,
    original_price: 0,
    depreciation_price: 0,
    rent_price: 0,
    status: "active",
  });

  // Validate error message
  const [errorMessage, setErrorMessage] = useState({
    amenity_name: "",
    original_price: "",
    rent_price: "",
  });

  const validationSchema = (amenity) => {
    let error = {};
    // Kiểm tra xem amenities có phải là đối tượng không

    if (
      !Number.isInteger(Number(amenity.original_price)) ||
      Number(amenity.original_price) <= 0
    ) {
      error.original_price =
        "Original price must be a positive whole number and greater than 0";
    }
    if (
      !Number.isInteger(Number(amenity.rent_price)) ||
      Number(amenity.rent_price) <= 0
    ) {
      error.rent_price =
        "Rent price must be a positive whole number and greater than 0";
    }
    return error;
  };

  // pagination
  const PAGE_SIZE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [amenitiesCount, setAmenitiesCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    //Hiện data lên table
    const fetchAmenity = async () => {
      try {
        const res = await getAmenity(
          searchTerm,
          currentPage,
          PAGE_SIZE,
          statusFilter
        );
        if (res && res.data && Array.isArray(res.data.rows)) {
          const sortAmenity = res.data.rows.sort((a, b) => {
            if (a.status === "active" && b.status !== "active") return -1;
            if (a.status !== "active" && b.status === "active") return 1;
            return 0;
          });
          setAmenitiesCount(res.data.count);
          setTotalPages(Math.ceil(res.data.count / PAGE_SIZE));
          setAmenity(res.data.rows);
        } else {
          setAmenity(null);
        }
      } catch (err) {
        if (err.message === "No Amenity Exist") {
          setAmenity(null);
        } else {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAmenity();
  }, [isChanged, currentPage, statusFilter]);

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

  //Khu vực hàm dành cho add
  const handleAddAmenity = async (e) => {
    e.preventDefault();
    const errorInput = validationSchema(newAmenity);
    if (Object.keys(errorInput).length > 0) {
      setErrorMessage(errorInput);
      console.log("errors", errorInput);
      return; // Dừng lại nếu có lỗi
    }
    try {
      const response = await postAmenity(newAmenity);
      if (response && response.err === 0) {
        setResponseData(response);
        setShowAddModal(false);
        setAmenity([...amenity, newAmenity]);
        setIsChanged(!isChanged);
        //setSuccessMessage("Amenity added successfully!"); // Set success message
        Swal.fire({
          icon: "success",
          title: "Add Amenity!",
          text: "Do you want to add this amenity?",
        });
      } else {
        const error = response.message;
        setErrorMessage({ ...errorMessage, amenity_name: error });
      }
    } catch (err) {
      console.error("Error adding amenity", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const addAmenityFields = [
    {
      name: "amenity_name",
      label: "Amenity Name",
      type: "text",
      value: `${newAmenity.amenity_name}`,
      required: true,
      showError: true,
    },
    {
      name: "original_price",
      label: "Original Price",
      type: "text",
      value: `${newAmenity.original_price}`,
      required: true,
      showError: true,
    },
    {
      name: "rent_price",
      label: "Rent Price",
      type: "text",
      value: `${newAmenity.rent_price}`,
      required: true,
      showError: true,
    },
    {
      name: "image",
      label: "Images",
      type: "file",
      multiple: false,
      value: `${newAmenity.image}`,
      required: true,
      showError: false,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewAmenity({
      ...newAmenity,
      [name]: files ? files[0] : value,
    });
  };

  //Khu vực hàm dành cho update
  const handleUpdateAmenity = async (e) => {
    e.preventDefault();

    const errorInput = validationSchema(newAmenity);
    if (Object.keys(errorInput).length > 0) {
      setErrorMessage(errorInput);
      console.log("errors", errorInput);
      return; // Dừng lại nếu có lỗi
    }

    try {
      const response = await putAmenity(newAmenity.amenity_id, newAmenity);

      if (response && response.err === 0) {
        // set to the updated amenity in the local state
        setAmenity(
          amenity.map((a) =>
            a.amenity_id === newAmenity.amenity_id ? newAmenity : a
          )
        );

        setIsChanged(!isChanged);
        setShowUpdateModal(false);
        setSuccessMessage("Amenity updated successfully!");
        Swal.fire({
          icon: "success",
          title: "Update Amenity!",
          text: response.message,
        });
      } else {
        const error = response.message;
        setErrorMessage({ ...errorMessage, amenity_name: error });
      }
    } catch (err) {
      console.error("Error updating amenity", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setNewAmenity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClick = (amenity) => {
    setNewAmenity(amenity);
    setShowUpdateModal(true);
  };

  const updateAmenityFields = [
    {
      name: "amenity_name",
      label: "Amenity Name",
      type: "text",
      value: `${newAmenity.amenity_name}`,
      required: true,
      showError: true,
    },
    {
      name: "original_price",
      label: "Original Price",
      type: "text",
      value: `${newAmenity.original_price}`,
      required: true,
      showError: true,
    },
    {
      name: "rent_price",
      label: "Rent Price",
      type: "text",
      value: `${newAmenity.rent_price}`,
      required: true,
      showError: true,
    },
    {
      name: "image",
      label: "Images",
      type: "file",
      multiple: false,
      value: `${newAmenity.image}`,
      required: true,
      showError: false,
    },
  ];

  //Khu vực hàm dành cho delete
  const handleDeleteAmenity = async (amenity, status) => {
    // Hàm xóa amenity
    try {
      // Display the confirmation window for block/unblock
      const res = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm!",
      });

      // If the user selects Yes
      if (res.isConfirmed) {
        const response = await blockAmenity(amenity.amenity_id);
        if (response && response.err === 0) {
          setIsChanged(!isChanged);
          Swal.fire({
            icon: "success",
            title:
              status === "unblock" ? "Amenity Unblocked!" : "Amenity Blocked!",
            text:
              status === "unblock"
                ? "Amenity has been successfully unblocked."
                : "Amenity has been successfully blocked.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.message,
          });
        }
      }
    } catch (error) {
      console.error("Error blocking/unblocking amenity", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleOnClose = () => {
    setNewAmenity({}); // Clear the form
    setShowAddModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setShowDetailsModal(false);
    setErrorMessage({});
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  const handleSearchAmenies = async () => {
    setLoading(true);
    try {
      setCurrentPage(1);
      const res = await getAmenity(
        searchTerm,
        currentPage,
        PAGE_SIZE,
        statusFilter
      );
      if (res && res.data && Array.isArray(res.data.rows)) {
        setAmenity(res.data.rows);
        setAmenitiesCount(res.data.count);
      } else {
        setAmenity(null);
      }
    } catch (err) {
      if (err.message === "No Amenity Exist") {
        setAmenity(null);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Amenities</h1>

      <div className="grid grid-cols-3 items-center">
        <div className="mt-4">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            placeholder="Search by Amenity name"
          />
        </div>
        <div>
          <SearchButton onClick={handleSearchAmenies} label="Search" />
        </div>

        {/* Add Button */}
        <div className="ml-auto">
          <AddButton
            onClick={() => setShowAddModal(true)}
            label="Add Amenity"
          />
        </div>
      </div>

      <div>
        <select
          className="select select-bordered select-sm max-w-xs"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
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
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <span className="loading loading-spinner loading-xs"></span>
                </td>
              </tr>
            ) : amenity === null ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No Amenity Found
                </td>
              </tr>
            ) : (
              Array.isArray(amenity) &&
              amenity.map((amenity) => (
                <tr key={amenity.amenity_id} className="hover">
                  <td>{amenity.amenity_name}</td>
                  <td>{formatCurrency(amenity.original_price)}</td>
                  <td>{formatCurrency(amenity.depreciation_price)}</td>
                  <td>{formatCurrency(amenity.rent_price)}</td>
                  <td>
                    <div
                      className={`badge uppercase w-20 font-bold text-gray-100 ${
                        amenity.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {" "}
                      {amenity.status}
                    </div>
                  </td>
                  <td className="flex space-x-2 w-48">
                    {/* Details Button */}
                    <button
                      className="btn btn-info btn-sm w-20"
                      onClick={() => handleRowClick(amenity.amenity_id)}
                    >
                      Details
                    </button>
                    {/* Update Button */}
                    <UpdateButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateClick(amenity);
                      }}
                    />

                    {/* Block button or un block button */}
                    <DeleteButton
                      onClick={() =>
                        handleDeleteAmenity(
                          amenity,
                          amenity.status === "active" ? "block" : "unblock"
                        )
                      }
                      label={amenity.status === "active" ? "Block" : "Unblock"}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {amenitiesCount >= PAGE_SIZE && (
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            setPage={setCurrentPage}
          />
        )}
      </div>

      <AddModal
        show={showAddModal}
        onClose={handleOnClose}
        onSubmit={handleAddAmenity}
        currentItem={newAmenity}
        onInputChange={handleInputChange}
        fields={addAmenityFields}
        errorMessage={errorMessage}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={handleOnClose}
        onSubmit={handleUpdateAmenity}
        currentItem={newAmenity}
        onInputChange={handleUpdateChange}
        fields={updateAmenityFields}
        errorMessage={errorMessage}
      />

      <DetailsModal
        show={showDetailsModal}
        onClose={handleOnClose}
        currentItem={selectedAmenityDetails}
      />
    </div>
  );
};

export default AmenitiesManagerPage;
