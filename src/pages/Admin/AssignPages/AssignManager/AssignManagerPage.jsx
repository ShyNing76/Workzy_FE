import React, { useState, useEffect } from "react";
import {
  getManager,
  getBuilding,
  assignManagerToBuilding,
  removeManagerFromBuilding,
} from "../../../../config/api.admin";
import Swal from "sweetalert2";

const AssignManagerPage = () => {
  const [managers, setManagers] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedManagerIds, setSelectedManagerIds] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [filterLocation, setFilterLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  // Fetch managers and buildings
  const fetchManagerAndBuilding = async () => {
    setIsLoading(true);
    try {
      const [managerResponse, buildingResponse] = await Promise.all([
        getManager(),
        getBuilding(),
      ]);
      if (managerResponse?.data && managerResponse.err === 0) {
        setManagers(managerResponse.data);
        console.log("managers:", managerResponse.data);
      }
      if (buildingResponse?.data && buildingResponse.err === 0) {
        setBuildings(buildingResponse.data);
      }
    } catch (error) {
      console.error("Error fetching managers and buildings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchManagerAndBuilding();
  }, []);

  // Handle Search Change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Filter Change
  const handleFilterChange = (event) => {
    setFilterLocation(event.target.value);
  };

  // Get filtered buildings by location
  const filteredBuildings = filterLocation
    ? buildings.filter((building) => building.location === filterLocation)
    : buildings;

  // Search buildings
  const searchBuildings = searchTerm.trim()
    ? filteredBuildings.filter(
        (building) =>
          building.building_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          building.building_id.toString().includes(searchTerm)
      )
    : filteredBuildings;

  // handle selected manager id
  // set selected manager id to the building id
  const handleSelectedManagerId = (managerId, buildingId) => {
    setSelectedManagerIds((prev) => ({
      ...prev,
      [buildingId]: managerId,
    }));
  };

  const isBuildingAssignedToManager = (buildingId) => {
    return (
      buildings.find((building) => building.building_id === buildingId)
        .manager_id !== null
    );
  };
  // Handle Assign Manager
  const handleAssignManagerToBuilding = async (buildingId) => {
    // get manager id from selected manager ids
    const managerId = selectedManagerIds[buildingId];
    console.log("managerId:", managerId);
    if (!managerId) return;

    try {
      const response = await assignManagerToBuilding(buildingId, managerId);
      if (response?.err === 0) {
        Swal.fire({
          title: "Success",
          text: "Manager assigned to building successfully",
          icon: "success",
        });
        // fetch lại data sau khi gán
        await fetchManagerAndBuilding();
        // reset selected manager id cho building đã gán
        setBuildings((prevBuildings) =>
          prevBuildings.map((building) =>
            building.building_id === buildingId
              ? { ...building, manager_id: managerId }
              : building
          )
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "An error occurred while assigning the manager to the building",
        icon: "error",
      });
    }
  };

  // Handle Unassign Manager
  const handleUnassignManagerFromBuilding = async (buildingId) => {
    try {
      const result = await Swal.fire({
        title: "Confirm unassign",
        text: `Are you sure you want to unassign the manager from this building?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, unassign",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) {
        const response = await removeManagerFromBuilding(buildingId);
        if (response?.err === 0) {
          Swal.fire({
            title: "Success",
            text: "Unassigned the manager from the building successfully",
            icon: "success",
          });
          // fetch lại data
          await fetchManagerAndBuilding();

          setBuildings((prevBuildings) =>
            prevBuildings.map((building) =>
              building.building_id === buildingId
                ? { ...building, manager_id: null }
                : building
            )
          );
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.message || "An error occurred while unassigning the manager",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Building Management</h1>

        <div className="join">
          <button
            className={`join-item btn ${
              viewMode === "grid" ? "btn-active" : ""
            }`}
            onClick={() => setViewMode("grid")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            className={`join-item btn ${
              viewMode === "table" ? "btn-active" : ""
            }`}
            onClick={() => setViewMode("table")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <select
            value={filterLocation}
            onChange={handleFilterChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">All Locations</option>
            <option value="HCM">HCM</option>
            <option value="Hanoi">Hanoi</option>
          </select>
        </div>
        <div className="flex-1">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search buildings..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchBuildings.map((building) => (
            <div
              key={building.building_id}
              className="card bg-base-100 shadow-xl"
            >
              <figure className="px-6 pt-6">
                <img
                  src={
                    building.BuildingImages[0].image ||
                    "/api/placeholder/400/300"
                  }
                  alt={building.building_name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {building.building_name}
                  <div className="badge badge-secondary">
                    {building.location}
                  </div>
                </h2>

                <div className="mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-12 h-12">
                        <span className="text-xl">
                          {managers
                            .find(
                              (m) =>
                                m.Manager.manager_id === building.manager_id
                            )
                            ?.name?.charAt(0) || "?"}
                        </span>
                      </div>
                    </div>

                    <select
                      className="select select-bordered flex-1"
                      value={
                        selectedManagerIds[building.building_id] ||
                        building.manager_id ||
                        ""
                      }
                      onChange={(e) =>
                        handleSelectedManagerId(
                          e.target.value,
                          building.building_id
                        )
                      }
                    >
                      <option value="">Select Manager</option>
                      {managers.map((manager) => (
                        <option
                          key={manager.Manager.manager_id}
                          value={manager.Manager.manager_id}
                        >
                          {manager.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      onClick={() =>
                        handleAssignManagerToBuilding(building.building_id)
                      }
                      disabled={
                        !selectedManagerIds[building.building_id] &&
                        !building.manager_id
                      }
                      className="btn btn-primary"
                    >
                      {isBuildingAssignedToManager(building.building_id)
                        ? "Update"
                        : "Assign"}
                    </button>

                    <button
                      onClick={() =>
                        handleUnassignManagerFromBuilding(building.building_id)
                      }
                      disabled={
                        !isBuildingAssignedToManager(building.building_id)
                      }
                      className="btn btn-error"
                    >
                      Unassign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Building</th>
                <th>Location</th>
                <th>Current Manager</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchBuildings.map((building) => (
                <tr key={building.building_id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                          <img
                            src={
                              building.BuildingImages[0].image ||
                              "/api/placeholder/400/300"
                            }
                            alt={building.building_name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {building.building_name}
                        </div>
                        <div className="text-sm opacity-50">
                          ID: {building.building_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-ghost">{building.location}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                          <span>
                            {managers
                              .find(
                                (m) =>
                                  m.Manager.manager_id === building.manager_id
                              )
                              ?.name?.charAt(0) || "?"}
                          </span>
                        </div>
                      </div>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        value={
                          selectedManagerIds[building.building_id] ||
                          building.manager_id ||
                          ""
                        }
                        onChange={(e) =>
                          handleSelectedManagerId(
                            e.target.value,
                            building.building_id
                          )
                        }
                      >
                        <option value="">Select Manager</option>
                        {managers.map((manager) => (
                          <option
                            key={manager.Manager.manager_id}
                            value={manager.Manager.manager_id}
                          >
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleAssignManagerToBuilding(building.building_id)
                        }
                        disabled={
                          !selectedManagerIds[building.building_id] &&
                          !building.manager_id
                        }
                        className="btn btn-sm btn-primary"
                      >
                        {isBuildingAssignedToManager(building.building_id)
                          ? "Update"
                          : "Assign"}
                      </button>

                      <button
                        onClick={() =>
                          handleUnassignManagerFromBuilding(
                            building.building_id
                          )
                        }
                        disabled={
                          !isBuildingAssignedToManager(building.building_id)
                        }
                        className="btn btn-sm btn-error"
                      >
                        Unassign
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignManagerPage;
