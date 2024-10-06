import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ManagerAssign = () => {
  // Buildings
  const [buildings, setBuildings] = useState([
    {
      id: "Bu01",
      name: "Building A",
      staffAssigned: null,
      staffName: "",
      location: "HCM",
    },
    { id: "Bu02", 
      name: "Building B", 
      staffAssigned: null, 
      staffName: "", 
      location: "HCM" 
    },
    {
      id: "Bu03",
      name: "Building C",
      staffAssigned: null,
      staffName: "",
      location: "HN",
    },
    { id: "Bu04", 
      name: "Building D", 
      staffAssigned: null, 
      staffName: "", 
      location: "HCM" 
    },
    { id: "Bu05", 
      name: "Building E", 
      staffAssigned: null, 
      staffName: "", 
      location: "HN" 
    },
    { id: "Bu06", 
      name: "Building F", 
      staffAssigned: null, 
      staffName: "", 
      location: "HCM" 
    },
    { id: "Bu07", 
      name: "Building G", 
      staffAssigned: null, 
      staffName: "", 
      location: "HN" 
    },
    { id: "Bu08", 
      name: "Building H", 
      staffAssigned: null, 
      staffName: "", 
      location: "HCM" 
    },
  ]);

  // Staff
  const [staff, setStaff] = useState([
    {
      id: "St01",
      name: "Duy Long Do",
      location: "HCM",
    },
    {
      id: "St02",
      name: "Le Hoang Trong",
      location: "HCM",
    },
    {
      id: "St03",
      name: "Quang Tran",
      location: "HN",
    },
    {
      id: "St04",
      name: "Nguyen Van Haha",
      location: "HCM",
    },
    {
      id: "St05",
      name: "Nguyen Van HiHi",
      location: "HN",
    },
    
  ]);

  // Filter Location
  const [filterLocation, setFilterLocation] = useState("");

  // Handle filter location change
  const handleFilterChange = (event) => {
    setFilterLocation(event.target.value);
  };

  // Get filtered buildings by location
  const filteredBuildings = buildings.filter(
    (building) => building.location === filterLocation
  );

  // Get filtered staff by location
  const filteredStaff = staff.filter((staffMember) => {
    return staffMember.location === filterLocation;
  });

  // Assign staff to Buildings
  const handleAssignStaff = (buildingId) => {
    const updatedBuildings = buildings.map((building) => {
      if (building.id === buildingId) {
        return { ...building, 
          staffAssigned: building.staffAssigned, 
          staffName: building.staffName 
        };
      }
      return building;
    });
    setBuildings(updatedBuildings);
    alert(`Assign staff successfully!`);
  };

  // Check if staff is assigned to any building
  // some() kiểm tra xem có ít nhất một phần tử trong mảng thỏa mãn điều kiện mà bạn cung cấp (là hàm callback). 
  // some() trả về true nếu có ít nhất một phần tử thỏa mãn điều kiện, ngược lại trả về false.
  const isStaffAssigned = (staffId) => {
    return buildings.some(building => building.staffAssigned === staffId);
  };

  return (
    <div className="assign-staff-container">
      <h1 className="text-2xl font-bold top-10" >Assign Staff to Buildings</h1>

      {/* Filter section */}
      <div className="manager-filter-section-container">
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

      {/* Building table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Building ID</th>
              <th>Building Name</th>
              <th>Staff Assigned</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuildings.map((building) => (
              <tr key={building.id}>
                <th>{building.id}</th>
                <td>{building.name}</td>
                <td>
                 
                  <select
                    value={building.staffAssigned || ""}
                    onChange={(e) => {
                      const selectedStaffId = e.target.value;
                      const selectedStaffName = staff.find(
                        (staff) => staff.id === selectedStaffId
                      )?.name || "";
                      // Check if staff is assigned to any building
                      if (isStaffAssigned(selectedStaffId)) {
                        alert("Staff is already assigned to a building!");
                        return;
                      }
                      // Update building state with selected staff
                      
                      setBuildings(prevBuildings =>
                        prevBuildings.map(preBuild =>
                          preBuild.id === building.id
                            ? { ...preBuild, staffAssigned: selectedStaffId, staffName: selectedStaffName }
                            : preBuild
                        )
                      );
                    }}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled value="">
                      Select Staff
                    </option>
                    {filteredStaff.map((staffMember) => (
                      <option key={staffMember.id} value={staffMember.id}>
                        {staffMember.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleAssignStaff(building.id)}
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
