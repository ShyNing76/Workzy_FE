import React, { useEffect, useState } from "react";
import { getAllStaffs, updateStaffStatus } from "../../../config/apiManager";

const ManageStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStaffs = async () => {
      setIsLoading(true);
      try {
        const responseStaffs = await getAllStaffs();
        if (responseStaffs && responseStaffs.data && responseStaffs.err === 0) {
          setStaffs(responseStaffs.data.rows);
          console.log("Staffs:", responseStaffs.data.rows);
        }
      } catch (error) {
        console.error("Error fetching staffs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaffs();
  }, []);

  

  
  // Change Status "Block" or "Unblock"
  const changeStatus = async (staffId) => {
    console.log("staffId:", staffId)
    try {
      const response = await updateStaffStatus(staffId)
      console.log("response:", response)  
      if (response && response.data && response.err === 0) {
        // Update staffs array
        const updatedStaffs = staffs.map ((staffMember) => {
          if (staffMember.user_id === staffId) {
            return {
              ...staffMember,
              status: staffMember.status === "active" ? "inactive" : "active"
            }
            
          }
          return staffMember
        })
        setStaffs(updatedStaffs)
        console.log("Updated staffs:", updatedStaffs)
        console.log("response:", response)
      }
    } catch (error) {
      console.error("Error updating staff status:", error)
    }
  }

  return (
    <div className="manage-staff-container">
      <h1 className="text-2xl font-bold top-10">Manage Staff</h1>


      {/* Staff table */}
      <div className="overflow-x-auto">
        <table className="table table-compact">
          <thead>
            <tr>
              <th className="w-1/6">Staff ID</th>
              <th className="w-1/4">Staff Name</th>
              <th className="w-1/6">Status</th>
              <th className="w-1/4">Action</th>
            </tr>
          </thead>

          <tbody>
            {staffs.map((staff, index) => (
              <tr key={index}>
                <td className="w-1/6">{index + 1}</td>
                <td className="w-1/4">{staff.name}</td>                
                <td className="w-1/6 font-bold">{staff.status}</td>
                <td className="w-1/4">
                  <button
                    onClick={() => changeStatus(staff.user_id)}
                    className={`px-4 py-2 rounded ${
                      staff.status === "inactive"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    {staff.status === "inactive" ? "Unblock" : "Block"}
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
