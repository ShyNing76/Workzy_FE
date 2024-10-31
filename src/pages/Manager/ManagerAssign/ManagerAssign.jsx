import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getBuildingsByManager,
  getAllStaffs,
  assignStaffToBuilding,
  unassignStaffFromBuilding,
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
  const [viewMode, setViewMode] = useState("grid");

  // call api to fetch Staff and building
  const fetchStaffAndBuilding = async () => {
    setIsLoading(true);
    try {
      const [buildingResponse, staffResponse] = await Promise.all([
        getBuildingsByManager(),
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
  }, []); // call api when the component is mounted

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
  const isStaffAssigned = (staffId, buildingId) => {
    // Kiểm tra xem nhân viên có được phân công cho tòa nhà hiện tại không
    const assignedStaff = staff.find(
      // find the staff in the staff array
      (staffMember) =>
        staffMember.user_id === staffId &&
        staffMember.Staff.building_id === buildingId // check if the staff is assigned to the building
    );
    return assignedStaff !== undefined; // return != undefined if the staff is assigned to the building
  };

  // check if the building is assigned to any staff
  const isBuildingAssigned = (buildingId) => {
    return staff.some(
      (buildingAssigned) => buildingAssigned.Staff.building_id === buildingId
    );
  };

  // handle selected staff id
  const handleSelectedStaffId = (userId, buildingId) => {
    // Kiểm tra xem nhân viên đã được phân công chưa
    if (isStaffAssigned(userId, buildingId)) {
      // nếu nhân viên đã được phân công cho tòa nhà hiện tại
      // xong sau đó chọn nhân viên mới thì selectedStaffIds sẽ cập nhật lại với staffId mới
      setSelectedStaffIds((prevSelectedStaffIds) => ({
        ...prevSelectedStaffIds,
        [buildingId]: userId,
      }));
      return;
    } else if (isStaffAssigned(userId)) {
      // nếu nhân viên đã được phân công cho tòa nhà khác thì hiển thị cảnh báo
      Swal.fire({
        title: "Warning",
        text: "This staff member is already assigned to another building.",
        icon: "warning",
      });
    } else {
      // nếu nhân viên không được phân công cho tòa nhà nào thì khung select sẽ cập nhật lại với tên nhân viên mới
      setSelectedStaffIds((prevSelectedStaffIds) => ({
        ...prevSelectedStaffIds,
        [buildingId]: userId,
      }));
    }
  };

  // handle assign staff to building
  const handleAssignStaffToBuilding = async (buildingId) => {
    // lấy staffId từ selectedStaffIds, staffId là giá trị của khung select
    // selectedStaffIds là object chứa staffId của nhân viên được phân công cho từng tòa nhà
    // [buildingId] là key của object selectedStaffIds, buildingId là id của tòa nhà
    const newStaffId = selectedStaffIds[buildingId];
    // nếu không có staffId thì không thực hiện gán
    if (!newStaffId) return;

    try {
      // Kiểm tra xem tòa nhà đã có nhân viên được gán chưa
      const currentAssignedStaff = staff.find(
        (staffMember) => staffMember.Staff.building_id === buildingId
      ); // find the staff in the staff array
      // nếu đã có nhân viên được gán, hiển thị xác nhận trước khi cập nhật
      if (currentAssignedStaff) {
        const result = await Swal.fire({
          title: "Confirm update",
          text: "This building already has a staff assigned. Do you want to update the staff?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, update",
          cancelButtonText: "Cancel",
        });

        if (!result.isConfirmed) {
          return; // Người dùng không muốn cập nhật, thoát khỏi hàm
        }
      }
      // gán nhân viên mới cho tòa nhà
      const response = await assignStaffToBuilding(newStaffId, buildingId);
      if (response && response.err === 0) {
        Swal.fire({
          title: "Success",
          text: currentAssignedStaff
            ? "Updated the new staff to the building."
            : "Assigned the staff to the building.",
          icon: "success",
        });
        // fetch lại data sau khi gán/cập nhật
        await fetchStaffAndBuilding();
      } else {
        throw new Error(
          response.message || "Có lỗi xảy ra khi gán/cập nhật nhân viên"
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "An error occurred while assigning/updating the staff to the building",
        icon: "error",
      });
      console.error(
        "Error assigning/updating the staff to the building:",
        error
      );
    }
  };

  // handle unassign staff from building
  const handleUnassignStaffFromBuilding = async (buildingId) => {
    try {
      // Tìm nhân viên được gán cho tòa nhà này
      const assignedStaff = staff.find(
        (staffMember) => staffMember.Staff.building_id === buildingId
      ); // find the staff in the staff array
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
        title: "Confirm unassign",
        text: `Are you sure you want to unassign the staff ${assignedStaff.name} from this building?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, unassign",
        cancelButtonText: "Cancel",
      });
      // nếu người dùng xác nhận hủy gán nhân viên
      if (result.isConfirmed) {
        const response = await unassignStaffFromBuilding(assignedStaff.user_id);
        if (response && response.err === 0) {
          Swal.fire({
            title: "Success",
            text: "Unassigned the staff from the building successfully",
            icon: "success",
          });
          // fetch lại data sau khi hủy gán
          await fetchStaffAndBuilding();
        } else {
          throw new Error(
            response.message || "Error unassigning the staff from the building"
          );
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.message ||
          "An error occurred while unassigning the staff from the building",
        icon: "error",
      });
      console.error("Error unassigning the staff from the building:", error);
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Building Management</h1>

        {/* View Toggle */}
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

      {/* Filters & Search */}
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
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchBuildings.map((building) => (
            <div
              key={building.building_id}
              className="card bg-base-100 shadow-xl"
            >
              {/* Building Image */}
              <figure className="px-6 pt-6">
                <img
                  src={building.BuildingImages[0].image}
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

                {/* Staff Assignment Section */}
                <div className="mt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar placeholder">
                      {staff.find(
                        (s) => s.Staff.building_id === building.building_id
                      )?.avatar_url ? (
                        <div className="w-12 h-12 rounded-full">
                          <img
                            src={
                              staff.find(
                                (s) =>
                                  s.Staff.building_id === building.building_id
                              )?.avatar_url
                            }
                            alt="Staff avatar"
                          />
                        </div>
                      ) : (
                        <div className="bg-neutral text-neutral-content rounded-full w-12 h-12">
                          <span className="text-xl">
                            {staff
                              .find(
                                (s) =>
                                  s.Staff.building_id === building.building_id
                              )
                              ?.name?.charAt(0) || "?"}{" "}
                            {/* Display the first letter of the staff name or '?' if the staff name is empty */}
                          </span>
                        </div>
                      )}
                    </div>

                    <select
                      className="select select-bordered flex-1"
                      value={
                        selectedStaffIds[building.building_id] ||
                        staff.find(
                          (staffMember) =>
                            staffMember.Staff.building_id ===
                            building.building_id
                        )?.user_id ||
                        ""
                      }
                      onChange={(e) =>
                        handleSelectedStaffId(
                          e.target.value,
                          building.building_id
                        )
                      }
                    >
                      <option value="">Select Staff</option>
                      {staff
                        .filter(
                          (staffMember) =>
                            !staffMember.Staff.building_id ||
                            staffMember.Staff.building_id ===
                              building.building_id
                        )
                        .map((staffMember) => (
                          <option
                            key={staffMember.user_id}
                            value={staffMember.user_id}
                          >
                            {staffMember.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="card-actions justify-end">
                    <button
                      onClick={() =>
                        handleAssignStaffToBuilding(building.building_id)
                      }
                      disabled={
                        !selectedStaffIds[building.building_id] &&
                        !staff.some(
                          (s) => s.Staff.building_id === building.building_id
                        )
                      }
                      className="btn btn-primary"
                    >
                      {isBuildingAssigned(building.building_id)
                        ? "Update"
                        : "Assign"}
                    </button>

                    <button
                      onClick={() =>
                        handleUnassignStaffFromBuilding(building.building_id)
                      }
                      disabled={!isBuildingAssigned(building.building_id)}
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
        // Table View
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Building</th>
                <th>Location</th>
                <th>Current Staff</th>
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
                            src={building.image_url}
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
                        {staff.find(
                          (s) => s.Staff.building_id === building.building_id
                        )?.avatar_url ? (
                          <div className="w-10 h-10 rounded-full">
                            <img
                              src={
                                staff.find(
                                  (s) =>
                                    s.Staff.building_id === building.building_id
                                )?.avatar_url
                              }
                              alt="Staff avatar"
                            />
                          </div>
                        ) : (
                          <div className="bg-neutral text-neutral-content rounded-full w-10 h-10">
                            <span>
                              {staff
                                .find(
                                  (s) =>
                                    s.Staff.building_id === building.building_id
                                )
                                ?.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        )}
                      </div>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        value={
                          selectedStaffIds[building.building_id] ||
                          staff.find(
                            (staffMember) =>
                              staffMember.Staff.building_id ===
                              building.building_id
                          )?.user_id ||
                          ""
                        }
                        onChange={(e) =>
                          handleSelectedStaffId(
                            e.target.value,
                            building.building_id
                          )
                        }
                      >
                        <option value="">Select Staff</option>
                        {staff
                          .filter(
                            (staffMember) =>
                              !staffMember.Staff.building_id ||
                              staffMember.Staff.building_id ===
                                building.building_id
                          )
                          .map((staffMember) => (
                            <option
                              key={staffMember.user_id}
                              value={staffMember.user_id}
                            >
                              {staffMember.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleAssignStaffToBuilding(building.building_id)
                        }
                        disabled={
                          !selectedStaffIds[building.building_id] &&
                          !staff.some(
                            (s) => s.Staff.building_id === building.building_id
                          )
                        }
                        className="btn btn-sm btn-primary"
                      >
                        {isBuildingAssigned(building.building_id)
                          ? "Update"
                          : "Assign"}
                      </button>

                      <button
                        onClick={() =>
                          handleUnassignStaffFromBuilding(building.building_id)
                        }
                        disabled={!isBuildingAssigned(building.building_id)}
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

export default ManagerAssign;
