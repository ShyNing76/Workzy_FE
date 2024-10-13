import React, { useEffect, useState } from "react";
import { getAllStaffs } from "../../../config/apiManager";

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
  const changeStatus = (staffId) => {
    // Update staffs array
    const updatedStaffs = staffs.map((staff) => {
      if (staff.user_id === staffId) {
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
