import React, { useEffect, useState } from "react";
import {
  getWorkspace,
  deleteWorkspace,
  getBuilding,
  postWorkspace,
  getAllWorkspaceType,
  putWorkspace,
} from "../../../config/api.admin";
import Swal from "sweetalert2";
import { FiX, FiDollarSign, FiUsers, FiSquare, FiImage, FiHome, FiGrid, FiFileText, FiSearch, FiPlus } from 'react-icons/fi';

const WorkspacesManagerPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspacesTypes, setWorkspacesType] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
//-----------------------------------------------------------------//
  // ADD
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState({
    workspace_name: "",
    building_id: "",
    images: [],
    workspace_type_id: "",
    workspace_price: 0,
    capacity: 0,
    area: 0,
    description: "",
    status: "active",
  });
//-----------------------------------------------------------------//
  const [openModalUpdate, setOpenModalUpdate] = useState(false)
  const [updateWorkspace, setUpdateWorkspace] = useState ({
    workspace_name: "",
    building_id: "",
    images: [],
    workspace_type_id: "",
    workspace_price: 0,
    capacity: 0,
    area: 0,
    description: "",
    status: "active",
  });

  //----------------------------------------------------------//


  
    const fetchWorkspaces = async () => {
      setIsLoading(true);
      try {
        const res = await getWorkspace();
        if (res && res.data) {
          setWorkspaces(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchWorkspaces();
  }, []);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await getBuilding();
        if (res && res.data) {
          setBuildings(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBuildings();
  }, []);

  useEffect(() => {
    const fetchWorkspaceType = async () => {
      try {
        const res = await getAllWorkspaceType();
        if (res && res.data) {
          setWorkspacesType(res.data.rows);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchWorkspaceType();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchedWorkspaces = workspaces.filter((ws) =>
    ws.workspace_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteWorkspace = async (workspaceId, currentStatus) => {
    try {
      const result = await Swal.fire({
        title:
          currentStatus === "inactive"
            ? "Are you sure to unblock this workspace?"
            : "Are you sure to block this workspace?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, confirm!",
      });
      if (result.isConfirmed) {
        const res = await deleteWorkspace(workspaceId);
        if (res && res.err === 0) {
          setWorkspaces((prevWorkspace) =>
            prevWorkspace.map((ws) =>
              ws.workspace_id === workspaceId
                ? {
                    ...ws,
                    status: currentStatus === "inactive" ? "active" : "inactive",
                  }
                : ws
            )
          );
          Swal.fire({
            title: currentStatus === "inactive" ? "Workspace Unblocked!" : "Workspace Blocked!",
            text: currentStatus === "inactive"
              ? "Workspace has been successfully unblocked."
              : "Workspace has been successfully blocked.",
            icon: "success",
          });
          setIsLoaded(false);
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Failed to block/unblock workspace",
        icon: "error",
      });
    }
  };
// -------------------------------------------------
// ADD 
  const handleOpenModalAdd = () => {
    setOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
    setNewWorkspace({
      workspace_name: "",
      building_id: "",
      images: [],
      workspace_type_id: "",
      workspace_price: 0,
      capacity: 0,
      area: 0,
      description: "",
      status: "active",
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewWorkspace({ ...newWorkspace, images: files });
  };

  const handleAddChange = (e) => {
    setNewWorkspace({ ...newWorkspace, [e.target.name]: e.target.value });
  };

  const handleAddWorkspace = async () => {
    try {
      const formData = new FormData();
      formData.append("workspace_name", newWorkspace.workspace_name);
      formData.append("building_id", newWorkspace.building_id);
      formData.append("workspace_type_id", newWorkspace.workspace_type_id);
      formData.append("workspace_price", newWorkspace.workspace_price);
      formData.append("capacity", newWorkspace.capacity);
      formData.append("area", newWorkspace.area);
      formData.append("description", newWorkspace.description);
      formData.append("status", newWorkspace.status);

      newWorkspace.images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await postWorkspace(formData);
      if (res && res.err === 0) {
        // Đóng modal trước
        handleCloseModalAdd();
        
        // Fetch lại dữ liệu mới
        await fetchWorkspaces();
        
        // Hiển thị thông báo thành công
        Swal.fire({
          title: "Success",
          text: "Workspace added successfully",
          icon: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to add workspace",
        icon: "error",
      });
    }
  };
//----------------------------------------------------------------------------
// UPDATE
const handleOpenModalUpdate = (workspace) => {
  setUpdateWorkspace({
    ...workspace,
    building_id: workspace.building_id || "",
    images: workspace.images || [],
  });
  setOpenModalUpdate(true);
}

const handleCloseModalUpdate = () => {
  setOpenModalUpdate(false);
}

const handleUpdateChange = (e) => {
  setUpdateWorkspace({ ...updateWorkspace, [e.target.name]: e.target.value });
};

const handleUpdateFileChange = (e) => {
  const files = Array.from(e.target.files);
  setUpdateWorkspace({ ...updateWorkspace, images: files });
};

const handleUpdateWorkspace = async () => {
  try {
    const formData = new FormData();
    formData.append("workspace_name", updateWorkspace.workspace_name);
    formData.append("building_id", updateWorkspace.building_id);
    formData.append("workspace_type_id", updateWorkspace.workspace_type_id);
    formData.append("workspace_price", updateWorkspace.workspace_price);
    formData.append("capacity", updateWorkspace.capacity);
    formData.append("area", updateWorkspace.area);
    formData.append("description", updateWorkspace.description);
    formData.append("status", updateWorkspace.status);

    if (Array.isArray(updateWorkspace.images)) {
      updateWorkspace.images.forEach((file) => formData.append("images", file));
    }

    
    const res = await putWorkspace(updateWorkspace.workspace_id, formData);
    if (res && res.err === 0) {
      // Đóng modal trước
      handleCloseModalUpdate();
      
      // Fetch lại dữ liệu mới
      await fetchWorkspaces();
      
      // Hiển thị thông báo thành công
      Swal.fire({
        title: "Success",
        text: "Workspace updated successfully",
        icon: "success",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Error",
      text: "Failed to update workspace",
      icon: "error",
    });
  }
};




  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workspace Management</h1>
        <button 
          className="btn btn-primary gap-2"
          onClick={handleOpenModalAdd}
        >
          <FiPlus className="w-5 h-5" />
          Add Workspace
        </button>
      </div>

      {/* Modal */}
      {openModalAdd && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl relative">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModalAdd}
            >
              <FiX className="w-5 h-5" />
            </button>
            
            <h3 className="font-bold text-2xl mb-6">Add New Workspace</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Workspace Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiHome className="w-4 h-4" />
                    Workspace Name
                  </span>
                </label>
                <input
                  type="text"
                  name="workspace_name"
                  placeholder="Enter workspace name"
                  value={newWorkspace.workspace_name}
                  onChange={handleAddChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Building Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiGrid className="w-4 h-4" />
                    Building
                  </span>
                </label>
                <select
                  name="building_id"
                  value={newWorkspace.building_id}
                  onChange={handleAddChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Building</option>
                  {buildings.map((building) => (
                    <option key={building.building_id} value={building.building_id}>
                      {building.building_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Workspace Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiGrid className="w-4 h-4" />
                    Workspace Type
                  </span>
                </label>
                <select
                  name="workspace_type_id"
                  value={newWorkspace.workspace_type_id}
                  onChange={handleAddChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Workspace Type</option>
                  {workspacesTypes.map((type) => (
                    <option key={type.workspace_type_id} value={type.workspace_type_id}>
                      {type.workspace_type_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  name="workspace_price"
                  placeholder="Enter price"
                  value={newWorkspace.workspace_price}
                  onChange={handleAddChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Capacity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiUsers className="w-4 h-4" />
                    Capacity
                  </span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Enter capacity"
                  value={newWorkspace.capacity}
                  onChange={handleAddChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Area */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiSquare className="w-4 h-4" />
                    Area (sq ft)
                  </span>
                </label>
                <input
                  type="number"
                  name="area"
                  placeholder="Enter area"
                  value={newWorkspace.area}
                  onChange={handleAddChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiFileText className="w-4 h-4" />
                  Description
                </span>
              </label>
              <textarea
                name="description"
                placeholder="Enter workspace description"
                value={newWorkspace.description}
                onChange={handleAddChange}
                className="textarea textarea-bordered w-full min-h-[100px]"
              />
            </div>

            {/* Images Upload - Full Width */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiImage className="w-4 h-4" />
                  Upload Images
                </span>
              </label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  You can upload multiple images. Supported formats: JPG, PNG
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="modal-action mt-6 flex justify-end gap-2">
              <button 
                className="btn btn-ghost"
                onClick={handleCloseModalAdd}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddWorkspace}
              >
                Add Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {openModalUpdate && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl relative">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModalUpdate}
            >
              <FiX className="w-5 h-5" />
            </button>
            
            <h3 className="font-bold text-2xl mb-6">Update Workspace</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Workspace Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiHome className="w-4 h-4" />
                    Workspace Name
                  </span>
                </label>
                <input
                  type="text"
                  name="workspace_name"
                  placeholder="Enter workspace name"
                  value={updateWorkspace.workspace_name}
                  onChange={handleUpdateChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Building Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiGrid className="w-4 h-4" />
                    Building
                  </span>
                </label>
                <select
                  name="building_id"
                  value={updateWorkspace.building_id}
                  onChange={handleUpdateChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Building</option>
                  {buildings.map((building) => (
                    <option key={building.building_id} value={building.building_id}>
                      {building.building_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Workspace Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiGrid className="w-4 h-4" />
                    Workspace Type
                  </span>
                </label>
                <select
                  name="workspace_type_id"
                  value={updateWorkspace.workspace_type_id}
                  onChange={handleUpdateChange}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Workspace Type</option>
                  {workspacesTypes.map((type) => (
                    <option key={type.workspace_type_id} value={type.workspace_type_id}>
                      {type.workspace_type_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  name="workspace_price"
                  placeholder="Enter price"
                  value={updateWorkspace.workspace_price}
                  onChange={handleUpdateChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Capacity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiUsers className="w-4 h-4" />
                    Capacity
                  </span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  placeholder="Enter capacity"
                  value={updateWorkspace.capacity}
                  onChange={handleUpdateChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Area */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center gap-2">
                    <FiSquare className="w-4 h-4" />
                    Area (sq ft)
                  </span>
                </label>
                <input
                  type="number"
                  name="area"
                  placeholder="Enter area"
                  value={updateWorkspace.area}
                  onChange={handleUpdateChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiFileText className="w-4 h-4" />
                  Description
                </span>
              </label>
              <textarea
                name="description"
                placeholder="Enter workspace description"
                value={updateWorkspace.description}
                onChange={handleUpdateChange}
                className="textarea textarea-bordered w-full min-h-[100px]"
              />
            </div>

            {/* Images Upload - Full Width */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FiImage className="w-4 h-4" />
                  Upload Images
                </span>
              </label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleUpdateFileChange} 
                className="file-input file-input-bordered w-full"
              />
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  You can upload multiple images. Supported formats: JPG, PNG
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="modal-action mt-6 flex justify-end gap-2">
              <button 
                className="btn btn-ghost"
                onClick={handleCloseModalUpdate}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleUpdateWorkspace}
              >
                Update Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="form-control mb-6">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search workspaces..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-square">
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Workspace ID</th>
              <th>Workspace Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            ) : (
              searchedWorkspaces.map((ws) => (
                <tr key={ws.workspace_id}>
                  <td>{ws.workspace_id}</td>
                  <td>{ws.workspace_name}</td>
                  <td>
                    <span className={`badge ${ws.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                      {ws.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        ws.status === "inactive" ? "btn-success" : "btn-error"
                      }`}
                      onClick={() => handleDeleteWorkspace(ws.workspace_id, ws.status)}
                    >
                      {ws.status === "inactive" ? "Unblock" : "Block"}
                    </button>

                    <button
                      className="btn btn-sm btn-info ml-2"
                      onClick={() => handleOpenModalUpdate(ws)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkspacesManagerPage;