import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  getBuilding,
  getBuildingById,
  postNewBuilding,
  getManager,
  changeBuildingStatus,
  putBuilding,
  getManagerById,
} from "../../../config/api.admin";
import AddModal from "../../../components/layout/Admin/Modals/AddModal";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";

const BuildingManagerPage = () => {
  const location = useLocation();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [selectedBuildingDetails, setSelectedBuildingDetails] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [newBuilding, setNewBuilding] = useState({
    building_name: "",
    location: "",
    address: "",
    rating: 0,
    images: [],
    description: "",
    status: "active",
    google_address: "",
  });
  const [updateBuilding, setUpdateBuilding] = useState({
    building_name: "",
    location: "",
    address: "",
    rating: 0,
    images: [],
    description: "",
    status: "active",
    google_address: "",
  });
  const [managers, setManagers] = useState([]);

  // Fetch building và managers
  const fetchBuilding = async () => {
    try {
      const res = await getBuilding();
      setBuilding(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchManagers = async () => {
    try {
      const res = await getManager();
      setManagers(res.data || []);
    } catch (err) {
      console.error("Failed to fetch managers:", err);
    }
  };

  useEffect(() => {
    fetchBuilding();
    fetchManagers();
  }, []);

  const handleRowClick = async (building) => {
    let managerName = "N/A";

    if (building.Manager) {
      // Fetch manager details by ID
      managerName;
    }

    const buildingDetails = {
      ...building,
      manager_name: building?.Manager?.User?.name || "None",
      image: building.BuildingImages[0]?.image || null,
    };

    setSelectedBuildingDetails(buildingDetails);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBuildingDetails(null);
    setShowDetailsModal(false);
  };

  // Extract unique locations from the buildings
  const getUniqueLocations = () => {
    if (!building) return [];
    return ["all", ...new Set(building.map((b) => b.location))];
  };

  // Xử lý thêm building
  const handleAddBuilding = async (e) => {
    e.preventDefault();

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
      type: "text",
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
      image: null,
      status: "active",
    });
  };

  // Xử lý cập nhật building
  const handleUpdateBuilding = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in updateBuilding) {
      if (key === "images" && updateBuilding.images.length > 0) {
        Array.from(updateBuilding.images).forEach((file) =>
          formData.append("images", file)
        );
      } else {
        formData.append(key, updateBuilding[key]);
      }
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message,
        });
      }
    } catch (err) {
      console.error("Error updating building:", err);
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setUpdateBuilding({ ...updateBuilding, images: files });
    } else {
      setUpdateBuilding({ ...updateBuilding, [name]: value });
    }
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
      type: "text",
      value: `${updateBuilding.location}`,
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
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      value: `${updateBuilding.description}`,
    },
    { name: "image", label: "Images", type: "file", multiple: true },
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Building List</h1>

      <div className="flex justify-between items-center my-4">
        <div className="flex-grow mr-4">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Building Name"
          />
        </div>
        <AddButton
          onClick={() => {
            resetNewBuilding();
            setShowAddModal(true);
          }}
          label="Add Building"
        />
      </div>

      <div className="flex mr-2">
        <div className="form-control w-full max-w-xs">
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {getUniqueLocations().map((location, index) => (
              <option key={index} value={location}>
                {location === "all" ? "All Locations" : location}
              </option>
            ))}
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
            {filteredBuilding.map((building) => (
              <tr
                key={building.building_id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(building)}
              >
                <td>{building.building_name}</td>
                <td>
                  {building.Manager ? building.Manager?.User?.name : "None"}
                </td>
                <td>{building.location}</td>
                <td>{building.address}</td>
                <td>{building.status}</td>

                <td className="flex space-x-2">
                  <UpdateButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdateBuilding(building);
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
            ))}
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
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateBuilding}
        currentItem={updateBuilding}
        onInputChange={handleUpdateChange}
        fields={updateBuildingFields}
        successMessage={successMessage}
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
