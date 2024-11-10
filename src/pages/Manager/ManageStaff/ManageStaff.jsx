import React, { useEffect, useState } from "react";
import {
  getBuildingsByManager,
  activeStaff,
  inactiveStaff,
} from "../../../config/apiManager";

const ManageStaff = () => {
  const [staffs, setStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleOpenModalDetail = (staff) => {
    setSelectedStaff(staff);
    setOpenModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      setIsLoading(true);
      try {
        const responseStaffs = await getBuildingsByManager();
        if (responseStaffs && responseStaffs.data && responseStaffs.err === 0) {
          const staffData = responseStaffs.data.flatMap((building) => building.Staff);
          setStaffs(staffData);
        }
      } catch (error) {
        console.error("Error fetching staffs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoaded) {
      fetchStaffs();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const changeStatus = async (staffId, currentStatus) => {
    try {
      let response;
      if (currentStatus === "inactive") {
        response = await activeStaff(staffId);
      } else {
        response = await inactiveStaff(staffId);
      }

      if (response && response.err === 0) {
        const updatedStatus = currentStatus === "inactive" ? "active" : "inactive";
        const updatedStaffs = staffs.map((staffMember) =>
          staffMember.User.user_id === staffId
            ? {
                ...staffMember,
                User: {
                  ...staffMember.User,
                  status: updatedStatus,
                },
              }
            : staffMember
        );

        setStaffs(updatedStaffs);
        setIsLoaded(false);
      }
    } catch (error) {
      console.error("Error updating staff status:", error);
    }
  };

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="w-full">
          {/* Header with Stats */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="prose">
              <h1 className="text-2xl font-bold m-0">Manage Staff</h1>
            </div>
            
            
          </div>

          {/* Main Content Card */}
          <div className="card bg-base-100">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Staff ID</th>
                      <th>Staff Name</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map((staff, index) =>
                      staff ? (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{staff.User.name}</td>
                          <td>
                            <div className={`badge ${
                              staff.User.status === "active"
                                ? "badge-success"
                                : "badge-error"
                            } gap-2`}>
                              {staff.User.status}
                            </div>
                          </td>
                          <td>
                            <button
                              onClick={() => changeStatus(staff.User.user_id, staff.User.status)}
                              className={`btn btn-sm btn-error`} 
                            >
                              {staff.User.status === "inactive" ? "Unblock" : "Block"}
                            </button>
                          </td>
                          <td>
                            <button
                              onClick={() => handleOpenModalDetail(staff)}
                              className="btn btn-sm btn-ghost btn-circle"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Modal */}
          {openModalDetail && selectedStaff && (
            <dialog className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Staff Details</h3>
                
                <div className="grid gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Name</span>
                    </label>
                    <input 
                      type="text" 
                      value={selectedStaff.User.name} 
                      className="input input-bordered" 
                      readOnly 
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input 
                      type="text" 
                      value={selectedStaff.User.email} 
                      className="input input-bordered" 
                      readOnly 
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Status</span>
                    </label>
                    <div className={`badge ${
                      selectedStaff.User.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    } badge-lg`}>
                      {selectedStaff.User.status}
                    </div>
                  </div>
                </div>

                <div className="modal-action">
                  <button className="btn" onClick={handleCloseModalDetail}>
                    Close
                  </button>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button onClick={handleCloseModalDetail}>close</button>
              </form>
            </dialog>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageStaff;