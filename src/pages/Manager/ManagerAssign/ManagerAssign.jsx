import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllBuildings, getAllStaffs } from "../../../config/apiManager";

const ManagerAssign = () => {
  // Buildings
  const [buildings, setBuildings] = useState([]);

  // Staff
  const [staff, setStaff] = useState([]);

  // Filter Location
  const [filterLocation, setFilterLocation] = useState("");

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // call api to get all buildings
    const fetchAllBuildings = async () => {
      try {
        const response = await getAllBuildings();
        if (response && response.data && response.err === 0) {
          setBuildings(response.data);
          console.log("Building:", response.data);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };

    fetchAllBuildings();
  }, []);

  useEffect(() => {
    // call api to get all Staffs
    const fetchAllStaffs = async () => {
      try {
        const response = await getAllStaffs();
        if (response && response.data && response.err === 0) {
          setStaff(response.data.rows);
          console.log("Staffs:", response.data.rows);
        }
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };

    fetchAllStaffs();
  }, []);

  // Handle Search Change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter location change
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
          building.building_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          building.building_id.toString().includes(searchTerm)
      )
    : filteredBuildings;

  // Assign staff to Buildings
  const handleAssignStaff = (buildingId) => {
    const updatedBuildings = buildings.map((building) => {
      if (building.building_id === buildingId) {
        return {
          ...building,
          staffAssigned: building.staffAssigned,
          staffName: building.staffName,
        };
      }
      return building;
    });
    setBuildings(updatedBuildings);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Assign staff successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Check if staff is assigned to any building
  const isStaffAssigned = (staffId) => {
    return buildings.some((building) => building.staffAssigned === staffId);
  };

  return (
    <div className="assign-staff-container">
      <h1 className="text-2xl font-bold top-10">Assign Staff to Buildings</h1>

      <div className="flex justify-between items-center">
        {/* Filter section */}
        <div className="manager-filter-section-container flex-1 w-64" style={{ marginTop: "20px", marginBottom: "20px" }}>
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

        {/* Search Section */}
        <div className="manager-assign-staff-search flex-1 w-32">
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
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>

      {/* Building table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Building Name</th>
              <th>Location</th>
              <th>Staff Assigned</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchBuildings.map((building) => (
              <tr key={building.building_id}>
                <td>{building.building_name}</td>
                <td>{building.location}</td>
                <td>
                  <select
                    value={building.staffAssigned || ""}
                    onChange={(e) => {
                      const selectedStaffId = e.target.value;
                      const selectedStaffName =
                        staff.find((staff) => staff.id === selectedStaffId)?.name || "";

                      if (isStaffAssigned(selectedStaffId)) {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "Staff is already assigned to another building!",
                        });
                        return;
                      }

                      setBuildings((currentBuildings) =>
                        currentBuildings.map((currentBuilding) =>
                          currentBuilding.building_id === building.building_id
                            ? {
                                ...currentBuilding,
                                staffAssigned: selectedStaffId,
                                staffName: selectedStaffName,
                              }
                            : currentBuilding
                        )
                      );
                    }}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled value="">
                      Select Staff
                    </option>
                    {staff
                      .filter((staffMember) => staffMember.location === building.location)
                      .map((filteredStaffMember) => (
                        <option key={filteredStaffMember.id} value={filteredStaffMember.id}>
                          {filteredStaffMember.name}
                        </option>
                      ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleAssignStaff(building.building_id)}
                    disabled={!building.staffAssigned}
                    className="btn"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerAssign;
