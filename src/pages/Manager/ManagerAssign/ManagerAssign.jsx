import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllBuildings,
  getAllStaffs,
  assignStaffToBuilding,
  unassignStaffFromBuilding
} from "../../../config/apiManager";

const ManagerAssign = () => {
  // Buildings
  const [buildings, setBuildings] = useState([]);

  // Staff
  const [staff, setStaff] = useState([]);

  // Selected staff id
  const [selectedStaffIds, setSelectedStaffIds] = useState({}); // object to store selected staff id for each building

  // Filter Location
  const [filterLocation, setFilterLocation] = useState("");

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  
    // call api to fetch Staff and building
    const fetchStaffAndBuilding = async () => {
      setIsLoading(true);
      try {
        const [buildingResponse, staffResponse] = await Promise.all([
          getAllBuildings(),
          getAllStaffs(),
        ]);
        if (
          buildingResponse &&
          buildingResponse.data &&
          buildingResponse.err === 0
        ) {
          setBuildings(buildingResponse.data);
          console.log("Building:", buildingResponse);
        }

        if (staffResponse && staffResponse.data && staffResponse.err === 0) {
          const activeStaff = staffResponse.data.rows.filter(
            (staff) => staff.status === "active"
          );
          setStaff(activeStaff);
          console.log("Staff:", activeStaff);
        }
      } catch (error) {
        console.error("Error fetching staff and building:", error);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
    fetchStaffAndBuilding();
  }, []);  // call api when the component is mounted

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
          building.building_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          building.building_id.toString().includes(searchTerm)
      )
    : filteredBuildings;

    // check if staff is assigned to any building
  const isStaffAssigned = (staffId) => {
    return staff.some(
      (staff) => staff.user_id === staffId && staff.Staff.building_id !== null // check if staff.user_id is the same as the staff id in the staff array and staff.building_id is not null this mean the staff is assigned to a building
    );
  };
 
  // check if the building is assigned to any staff
  const isBuildingAssigned = (buildingId) => {
    return staff.some (
      (buildingAssigned) => buildingAssigned.Staff.building_id === buildingId
    )
  }
  
  
  // handle selected staff id
  const handleSelectedStaffId = (userId, buildingId) => {
    // Kiểm tra xem nhân viên đã được phân công chưa
    if (isStaffAssigned(userId)) {
      Swal.fire({
        title: "Warning",
        text: "This staff member is already assigned to another building.",
        icon: "warning",
      });
    } else {
      setSelectedStaffIds((prevSelectedStaffIds) => ({
        ...prevSelectedStaffIds,
        [buildingId]: userId,
      }));
    }
  };

  // handle assign staff to building
  const handleAssignStaffToBuilding = async (buildingId) => {
    const newStaffId = selectedStaffIds[buildingId];
    if (!newStaffId) return;
  
    try {
      // Kiểm tra xem tòa nhà đã có nhân viên được gán chưa
      const currentAssignedStaff = staff.find((staffMember) => staffMember.Staff.building_id === buildingId);
      
      if (currentAssignedStaff) {
        // Nếu đã có nhân viên được gán, hiển thị xác nhận trước khi cập nhật
        const result = await Swal.fire({
          title: 'Confirm update',
          text: 'This building already has a staff assigned. Do you want to update the staff?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, update',
          cancelButtonText: 'Cancel'
        });
  
        if (!result.isConfirmed) {
          return; // Người dùng không muốn cập nhật, thoát khỏi hàm
        }
      }
  
      const response = await assignStaffToBuilding(newStaffId, buildingId);
      if (response && response.err === 0) {
        Swal.fire({
          title: "Success",
          text: currentAssignedStaff 
            ? "Updated the new staff to the building." 
            : "Assigned the staff to the building.",
          icon: "success",
        });
        await fetchStaffAndBuilding();
      } else {
        throw new Error(response.message || "Có lỗi xảy ra khi gán/cập nhật nhân viên");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred while assigning/updating the staff to the building",
        icon: "error",
      });
      console.error("Error assigning/updating the staff to the building:", error);
    }
  };
  
  // handle unassign staff from building
  const handleUnassignStaffFromBuilding = async (buildingId) => { 
    try {
      // Tìm nhân viên được gán cho tòa nhà này
      const assignedStaff = staff.find((staffMember) => staffMember.Staff.building_id === buildingId);
      // nếu không có nhân viên nào được gán cho tòa nhà này thì hiển thị thông báo
      if (!assignedStaff) {
        Swal.fire({
          title: "Notification",
          text: "No staff is assigned to this building.",
          icon: "info",
        });
        return;
      }
      // hiển thị thông báo xác nhận hủy gán nhân viên
      const result = await Swal.fire({ 
        title: 'Confirm unassign',
        text: `Are you sure you want to unassign the staff ${assignedStaff.name} from this building?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, unassign',
        cancelButtonText: 'Cancel'
      });
  
      if (result.isConfirmed) {
        const response = await unassignStaffFromBuilding(assignedStaff.user_id);
        if (response && response.err === 0) {
          Swal.fire({
            title: "Success",
            text: "Unassigned the staff from the building successfully",
            icon: "success",
          });
          await fetchStaffAndBuilding();
        } else {
          throw new Error(response.message || "Error unassigning the staff from the building");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred while unassigning the staff from the building",
        icon: "error",
      });
      console.error("Error unassigning the staff from the building:", error);
    }
  }
  

  return (
    <div className="assign-staff-container">
      <h1 className="text-2xl font-bold top-10">Assign Staff to Buildings</h1>

      <div className="flex justify-between items-center">
        {/* Filter section */}
        <div
          className="manager-filter-section-container flex-1 w-64"
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
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
              <th>Index</th>
              <th>Building Name</th>
              <th>Location</th>
              <th>Staff Assigned</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              searchBuildings.map((building, index) => {
                const isAssigned = isStaffAssigned(building.building_id); // check if the building is assigned to any staff
                return (
                  <tr key={building.building_id}>
                    <td>{index + 1}</td>
                    <td>{building.building_name}</td>
                    <td>{building.location}</td>
                    <td>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        value={selectedStaffIds[building.building_id] || staff.find(
                          staffMember => staffMember.Staff.building_id === building.building_id
                        )?.user_id || ""}
                        onChange={(e) =>
                          
                          handleSelectedStaffId(
                            e.target.value,
                            building.building_id
                          )
                          
                        }
                      >
                        <option value="">Select Staff</option>
                        {staff.map((staffMember) => (
                          
                          <option
                            key={staffMember.user_id}
                            value={staffMember.user_id}
                    
                          >
                            {staffMember.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleAssignStaffToBuilding(building.building_id)
                        }
                        disabled={
                          !selectedStaffIds[building.building_id] || isAssigned
                        }
                        className="btn"
                      >
                        {isBuildingAssigned(building.building_id) ? "Update" : "Assign"}
                      </button>

                      <button
                        onClick={() => handleUnassignStaffFromBuilding(building.building_id)}
                        disabled = {!isBuildingAssigned(building.building_id)}
                        className="btn btn-error ml-5"
                        
                      >
                        Unassign
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">
                  <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerAssign;
