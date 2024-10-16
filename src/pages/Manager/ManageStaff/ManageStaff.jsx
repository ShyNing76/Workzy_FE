import React, { useEffect, useState } from "react";
import {
  getAllStaffs,
  activeStaff,
  inactiveStaff,
} from "../../../config/apiManager";
import Swal from "sweetalert2";
const ManageStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
    if (!isLoaded) {
      // isLoaded là false thì fetchStaffs
      fetchStaffs();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  // Change Status "Block" or "Unblock"

  const changeStatus = async (staffId, currentStatus) => {
    try {
      let response;
      if (currentStatus === "inactive") {
        response = await activeStaff(staffId);
        console.log("response activeStaff :", response);
      } else {
        response = await inactiveStaff(staffId);
        console.log("response inactiveStaff :", response);
      }
      if (response && response.err === 0) {
        const updatedStatus =
          currentStatus === "inactive" ? "active" : "inactive";

        const updatedStaffs = staffs.map((staffMember) =>
          staffMember.user_id === staffId
            ? {
                ...staffMember,
                status: updatedStatus,
              }
            : staffMember
        );
        Swal.fire({
          title: "Success",
          text: `Staff status updated to ${updatedStatus} successfully.`,
          icon: "success",
        });
        setStaffs(updatedStaffs);
        setIsLoaded(false);
        // set isLoaded là false để fetchStaffs lại
      }
    } catch (error) {
      console.error("Error updating staff status:", error);
    }
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
                    onClick={() => changeStatus(staff.user_id, staff.status)}
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
