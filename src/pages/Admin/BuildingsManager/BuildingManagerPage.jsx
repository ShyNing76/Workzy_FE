import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  getBuilding,
  postNewBuilding,
  changeBuildingStatus,
  putBuilding,
} from "../../../config/api.admin";
import AddModal from "../../../components/layout/Admin/Modals/AddModal";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";
import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";

const BuildingManagerPage = () => {
  const location = useLocation();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedBuildingDetails, setSelectedBuildingDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [allLocations, setAllLocations] = useState(["all", "HCM", "Hanoi"]);
  const [newBuilding, setNewBuilding] = useState({
    building_name: "",
    location: "",
    address: "",
    rating: 5,
    image: [],
    description: "",
    status: "active",
    google_address: "",
  });
  const [updateBuilding, setUpdateBuilding] = useState({
    building_name: "",
    location: "",
    address: "",
    rating: 5,
    images: [],
    description: "",
    status: "active",
    google_address: "",
    remove_images: [],
  });

  // Validate error message
  const [errorMessage, setErrorMessage] = useState({
    google_address: "",
  });

  const validationSchema = (building) => {
    let error = {};
    if (!building.google_address.startsWith("https://www.google.com/maps/")) {
      error.google_address = "Google address is invalid";
    }
    return error;
  };

  // Fetch building và managers
  const fetchBuilding = async () => {
    try {
      const res = await getBuilding(searchTerm, statusFilter, locationFilter);
      setBuilding(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuilding();
  }, [statusFilter, locationFilter, searchTerm]);

  const handleRowClick = async (building) => {
    const buildingDetails = {
      ...building,
      manager_name: building?.Manager?.User?.name || "None",
      location: getDisplayLocation(building.location),
      images: building.BuildingImages || null,
    };

    setSelectedBuildingDetails(buildingDetails);
    console.log("Building Details:", buildingDetails);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBuildingDetails(null);
    setShowDetailsModal(false);
  };

  const getDisplayLocation = (location) => {
    const locationMappings = {
      HCM: "Hồ Chí Minh",
      Hanoi: "Hà Nội",
    };
    return locationMappings[location] || location;
  };

  // Xử lý thêm building
  const handleAddBuilding = async (e) => {
    e.preventDefault();

    const errorInput = validationSchema(newBuilding);
    if (Object.keys(errorInput).length > 0) {
      setErrorMessage(errorInput);
      console.log("errors", errorInput);
      return; // Dừng lại nếu có lỗi
    }

    const formData = new FormData();
    for (let key in newBuilding) {
      if (key === "image") {
        Array.from(newBuilding.image).forEach((file) =>
          formData.append("images", file)
        );
      } else {
        formData.append(key, newBuilding[key]);
      }
    }

    try {
      const response = await postNewBuilding(formData);
      // Handle successful addition
      if (response && response.err === 0) {
        setShowAddModal(false);
        fetchBuilding(); // Refresh the building list
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
        });
      }
    } catch (err) {
      console.error("Failed to add building:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while adding the building.",
      });
    }
  };

  const addBuildingFields = [
    {
      name: "building_name",
      label: "Building Name",
      type: "text",
      value: `${newBuilding.building_name}`,
    },
    {
      name: "location",
      label: "Location",
      type: "select",
      options: [
        { value: "HCM", label: "Hồ Chí Minh" },
        { value: "Hanoi", label: "Hà Nội" },
      ],
      value: `${newBuilding.location}`,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: `${newBuilding.address}`,
    },
    {
      name: "google_address",
      label: "Google Address",
      type: "text",
      value: `${newBuilding.google_address}`,
      showError: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      value: `${newBuilding.description}`,
    },
    { name: "image", label: "Images", type: "file", multiple: true },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewBuilding({ ...newBuilding, image: Array.from(value) });
    } else {
      setNewBuilding({ ...newBuilding, [name]: value });
    }
  };

  const resetNewBuilding = () => {
    setNewBuilding({
      building_name: "",
      location: "",
      address: "",
      rating: 5,
      google_address: "",
      description: "",
      images: [],
      status: "active",
    });
  };

  // Xử lý cập nhật building
  const handleUpdateBuilding = async (e) => {
    e.preventDefault();
    const errorInput = validationSchema(updateBuilding);
    if (Object.keys(errorInput).length > 0) {
      setErrorMessage(errorInput);
      console.log("errors", errorInput);
      return; // Dừng lại nếu có lỗi
    }
    const formData = new FormData();

    // Add basic fields
    formData.append("building_name", updateBuilding.building_name || "");
    formData.append("location", updateBuilding.location || "");
    formData.append("address", updateBuilding.address || "");
    formData.append("google_address", updateBuilding.google_address || "");
    formData.append("description", updateBuilding.description || "");
    formData.append("rating", parseInt(updateBuilding.rating) || 0);
    formData.append("status", updateBuilding.status || "");

    // Handle images
    if (updateBuilding.images && updateBuilding.images.length > 0) {
      updateBuilding.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        } else if (
          typeof image === "string" &&
          (!updateBuilding.remove_images ||
            !updateBuilding.remove_images.includes(image))
        ) {
          formData.append("images", image);
        }
      });
    }

    // Add removed images to formData
    if (
      updateBuilding.remove_images &&
      updateBuilding.remove_images.length > 0
    ) {
      updateBuilding.remove_images.forEach((image) => {
        formData.append("remove_images", image);
      });
    }

    // Log formData contents for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await putBuilding(updateBuilding.building_id, formData);
      if (response && response.err === 0) {
        setShowUpdateModal(false);
        fetchBuilding();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message,
        });
      }
    } catch (err) {
      console.error("Failed to update building:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while updating the building.",
      });
    }
  };

  const handleUpdateChange = (e) => {
    const { name, type, files, value } = e.target;

    setUpdateBuilding((prev) => {
      if (type === "file") {
        const newFiles = Array.from(files);
        return {
          ...prev,
          images: [...(prev.images || []), ...newFiles],
        };
      } else if (name === "images") {
        // Nhận danh sách ảnh mới từ modal
        return {
          ...prev,
          images: value,
        };
      } else if (name === "remove_images") {
        // Nhận danh sách ảnh đã xóa từ modal
        return {
          ...prev,
          remove_images: value,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateBuildingFields = [
    {
      name: "building_name",
      label: "Building Name",
      type: "text",
      value: `${updateBuilding.building_name}`,
    },
    {
      name: "location",
      label: "Location",
      type: "select",
      options: [
        { value: "HCM", label: "Hồ Chí Minh" },
        { value: "Hanoi", label: "Hà Nội" },
      ],
      value: `${newBuilding.location}`,
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      value: `${updateBuilding.address}`,
    },
    {
      name: "google_address",
      label: "Google Address",
      type: "text",
      value: `${updateBuilding.google_address}`,
      showError: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      value: `${updateBuilding.description}`,
    },
    {
      name: "images", // Đổi thành images thay vì image
      label: "Images",
      type: "file",
      multiple: true,
    },
  ];

  // Xử lý status building

  const handleChangeStatus = async (building) => {
    const newStatus = building.status === "active" ? "inactive" : "active";

    try {
      const response = await changeBuildingStatus(
        building.building_id,
        newStatus
      );
      if (response && response.err === 0) {
        fetchBuilding();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Building status changed to ${newStatus}.`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Failed to change status.",
        });
      }
    } catch (err) {
      console.error("Failed to change building status:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while changing the building status.",
      });
    }
  };

  const filteredBuilding = Array.isArray(building)
    ? building.filter((item) => {
        const matchesStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchesSearchTerm = item.building_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesLocation =
          locationFilter === "all" || item.location === locationFilter;
        return matchesStatus && matchesSearchTerm && matchesLocation;
      })
    : [];

  // Open modal add building
  const handleAddBuildingModalOpen = () => {
    resetNewBuilding(); // Reset các trường thông tin
    setErrorMessage({}); // Reset error message
    setShowAddModal(true);
  };

  // Open modal update building
  const handleUpdateBuildingModalOpen = (building) => {
    const restructuredBuilding = {
      ...building,
      images: building.BuildingImages.map((img) => img.image),
    };
    setUpdateBuilding(restructuredBuilding);
    setErrorMessage({}); // Reset error message
    setShowUpdateModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Building Management</h1>

      <div className="flex justify-between items-center">
        <div className="flex-grow mr-4">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Building Name"
          />
        </div>
        <AddButton onClick={handleAddBuildingModalOpen} label="Add Building" />
      </div>

      <div className="flex mr-2">
        <div className="form-control max-w-xs mr-2">
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {allLocations.map((location, index) => (
              <option key={index} value={location}>
                {location === "all"
                  ? "All Locations"
                  : getDisplayLocation(location)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control max-w-xs">
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto flex flex-1">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Building Name</th>
              <th>Manager</th>
              <th>Location</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {building && building.length > 0 ? (
              building.map((building) => (
                <tr key={building.building_id} className="hover:bg-gray-100 ">
                  <td>{building.building_name}</td>
                  <td>{building?.Manager?.User?.name || "None"}</td>
                  <td>{getDisplayLocation(building.location)}</td>
                  <td>{building.address}</td>
                  <td>
                    <div
                      className={`badge uppercase w-20 font-bold text-gray-100 ${
                        building.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {building.status}
                    </div>
                  </td>
                  <td className="flex space-x-2">
                    <button
                      className="btn btn-info btn-sm w-20"
                      onClick={() => handleRowClick(building)}
                    >
                      Details
                    </button>
                    <UpdateButton
                      onClick={(e) => {
                        e.stopPropagation();
                        // Restructure the building object
                        const restructuredBuilding = {
                          ...building,
                          images: building.BuildingImages.map(
                            (img) => img.image
                          ),
                        };
                        setUpdateBuilding(restructuredBuilding);
                        setShowUpdateModal(true);
                      }}
                    />
                    <BlockButton
                      status={building.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangeStatus(building);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No buildings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddBuilding}
        currentItem={newBuilding}
        onInputChange={handleInputChange}
        fields={addBuildingFields}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateBuilding}
        currentItem={updateBuilding}
        onInputChange={handleUpdateChange}
        fields={updateBuildingFields}
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <DetailsModal
        show={showDetailsModal}
        onClose={handleCloseModal}
        currentItem={selectedBuildingDetails}
      />
    </div>
  );
};

export default BuildingManagerPage;
