import React, { useState } from "react";

const ManageStaff = () => {
  const [location, setLocation] = useState("");
  const [staffs, setStaffs] = useState([
    {
      id: "St01",
      name: "Duy Long Do",
      location: "HCM",
      status: "Block",
    },
    {
      id: "St02",
      name: "Le Hoang Trong",
      location: "HCM",
      status: "Block",
    },
    {
      id: "St03",
      name: "Quang Tran",
      location: "HN",
      status: "Block",
    },
    {
      id: "St04",
      name: "Nguyen Van Haha",
      location: "HCM",
      status: "Block",
    },
    {
      id: "St05",
      name: "Nguyen Van HiHi",
      location: "HN",
      status: "Block",
    },
  ]);
  const [filterLocation, setFilterLocation] = useState("");

  // Handle filter location change
  const handleFilterChange = (event) => {
    setFilterLocation(event.target.value);
  };

  // Get filtered staff by location
  const filterStaffByLocation = staffs.filter((staff) => {
    return staff.location === filterLocation;
  });

  // Change Status "Block" or "Unblock"
  const changeStatus = (staffId) => {
    // Update staffs array
    const updatedStaffs = staffs.map((staff) => {
      if (staff.id === staffId) {
        // return new object
        // if status is "Block" then change to "Unblock"

        return {
          ...staff,
          status: staff.status === "Block" ? "Unblock" : "Block",
        };
      }
      // else return staff
      return staff;
    });
    // Update state of staffs array
    setStaffs(updatedStaffs);
  };

  return (
    <div className="manage-staff-container">
      <h1 className="text-2xl font-bold top-10">Manage Staff</h1>

      {/* Filter section */}
      <div
        className="manager-filter-section-container"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <label htmlFor="location-filter"></label>
        <select
          id="location-filter"
          value={filterLocation}
          onChange={handleFilterChange}
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled value="">
            Location
          </option>
          <option value="HCM">HCM</option>
          <option value="HN">HN</option>
        </select>
      </div>

      {/* Staff table */}
      <div className="overflow-x-auto">
        <table className="table table-compact">
          <thead>
            <tr>
              <th className="w-1/6">Staff ID</th>
              <th className="w-1/4">Staff Name</th>
              <th className="w-1/6">Location</th>
              <th className="w-1/6">Status</th>
              <th className="w-1/4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filterStaffByLocation.map((staff) => (
              <tr key={staff.id}>
                <td className="w-1/6">{staff.id}</td>
                <td className="w-1/4">{staff.name}</td>
                <td className="w-1/6">{staff.location}</td>
                <td className="w-1/6 font-bold">{staff.status}</td>
                <td className="w-1/4">
                  <button
                    onClick={() => changeStatus(staff.id)}
                    className={`px-4 py-2 rounded ${
                      staff.status === "Block"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    {staff.status === "Block" ? "Unblock" : "Block"}
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

export default ManageStaff;
