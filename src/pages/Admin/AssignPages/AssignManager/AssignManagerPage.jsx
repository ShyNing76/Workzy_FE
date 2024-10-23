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
    return selectedManagerIds[buildingId];
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
    <div className="assign-manager-container">
      <h1 className="text-2xl font-bold top-10">Assign Manager to Buildings</h1>

      <div className="flex justify-between items-center">
        <div className="manager-filter-section-container flex-1 w-64">
          <select
            id="location-filter"
            value={filterLocation}
            onChange={handleFilterChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">All Locations</option>
            <option value="HCM">HCM</option>
            <option value="Hanoi">Hanoi</option>
          </select>
        </div>

        <div className="manager-assign-manager-search flex-1 w-32">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.68a5.961 5.961 0 1 1 1.716-1.716l3.374 3.373a1.21 1.21 0 1 1-1.712 1.712l-3.374-3.374ZM10 5.96a4.04 4.04 0 1 1-8.08 0 4.04 4.04 0 0 1 8.08 0Z"
              />
            </svg>
          </label>
        </div>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="assign-manager-table-container">
            <div className="overflow-x-auto">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Building</th>
                    <th>Location</th>
                    <th>Manager</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchBuildings.map((building, index) => (
                    <tr key={building.building_id}>
                      <td>{index + 1}</td>
                      <td>{building.building_name}</td>
                      <td>{building.location}</td>
                      <td>
                        <select
                          className="select select-bordered w-full max-w-xs"
                          value={selectedManagerIds[building.building_id] || ""}
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
                      </td>
                      <td>
                        {isBuildingAssignedToManager(building.building_id) ? (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() =>
                              handleAssignManagerToBuilding(
                                building.building_id
                              )
                            }
                          >
                            Assign
                          </button>
                        ) : (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleUnassignManagerFromBuilding(
                                building.building_id
                              )
                            }
                          >
                            Unassign
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignManagerPage;
