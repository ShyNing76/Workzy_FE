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
import {
  FiX,
  FiDollarSign,
  FiUsers,
  FiSquare,
  FiImage,
  FiHome,
  FiGrid,
  FiFileText,
  FiSearch,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import AddModal from "../../../components/layout/Admin/Modals/AddModal";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal";

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
    price_per_hour: 0,
    price_per_day: 0,
    price_per_month: 0,
    capacity: 0,
    area: 0,
    description: "",
    status: "active",
  });
  //-----------------------------------------------------------------//
  // UPDATE
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [updateWorkspace, setUpdateWorkspace] = useState({
    workspace_name: "",
    building_id: "",
    images: [],
    workspace_type_id: "",
    price_per_hour: 0,
    price_per_day: 0,
    price_per_month: 0,
    capacity: 0,
    area: 0,
    description: "",
    status: "active",
  });

  //----------------------------------------------------------//
  // VIEW
  const [openModalView, setOpenModalView] = useState(false);
  const [viewWorkspace, setViewWorkspace] = useState(null);

  const handleOpenModalView = (workspace) => {
    setOpenModalView(true);
    setViewWorkspace(workspace);
  };

  const handleCloseModalView = () => {
    setOpenModalView(false);
    setViewWorkspace(null);
  };
  //-------------------------------------------------------------//

  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const res = await getWorkspace();
      if (res && res.data) {
        setWorkspaces(res.data);
        console.log(res.data);
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
          console.log("building", res.data);
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
          console.log("workspace type", res.data.rows);
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
                    status:
                      currentStatus === "inactive" ? "active" : "inactive",
                  }
                : ws
            )
          );
          Swal.fire({
            title:
              currentStatus === "inactive"
                ? "Workspace Unblocked!"
                : "Workspace Blocked!",
            text:
              currentStatus === "inactive"
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
      price_per_hour: 0,
      price_per_day: 0,
      price_per_month: 0,
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

  const handleAddWorkspace = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("workspace_name", newWorkspace.workspace_name);
      formData.append("building_id", newWorkspace.building_id);
      formData.append("workspace_type_id", newWorkspace.workspace_type_id);
      formData.append("price_per_hour", newWorkspace.price_per_hour);
      formData.append("price_per_day", newWorkspace.price_per_day);
      formData.append("price_per_month", newWorkspace.price_per_month);
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
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add workspace",
          icon: "error",
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
      building_id: workspace.Building.building_id || "",
      existingImages: workspace.WorkspaceImages || [], // Lưu lại ảnh hiện có
      images: [], // Mảng cho ảnh mới
    });
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

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
      formData.append("price_per_hour", updateWorkspace.price_per_hour);
      formData.append("price_per_day", updateWorkspace.price_per_day);
      formData.append("price_per_month", updateWorkspace.price_per_month);
      formData.append("capacity", updateWorkspace.capacity);
      formData.append("area", updateWorkspace.area);
      formData.append("description", updateWorkspace.description);
      formData.append("status", updateWorkspace.status);

      if (Array.isArray(updateWorkspace.images)) {
        updateWorkspace.images.forEach((file) =>
          formData.append("images", file)
        );
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
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to update workspace",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("err", err);
      Swal.fire({
        title: "Error",
        text: "Failed to update workspace",
        icon: "error",
      });
    }
  };

  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [detailWorkspace, setDetailWorkspace] = useState(null);

  const handleOpenModalDetails = (workspace) => {
    const restructuredWorkspace = {
      ...workspace,
      images: workspace.WorkspaceImages.map((img) => img.image),
    };
    setDetailWorkspace(restructuredWorkspace);

    console.log("detailWorkspace", detailWorkspace);
    setOpenModalDetails(true);
  };

  const handleCloseModalDetails = () => {
    setOpenModalDetails(false);
    setDetailWorkspace(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workspace Management</h1>
        <button className="btn btn-primary gap-2" onClick={handleOpenModalAdd}>
          <FiPlus className="w-5 h-5" />
          Add Workspace
        </button>
      </div>

      {/* Modal sử dụng AddModal */}
      <AddModal
        show={openModalAdd}
        onClose={handleCloseModalAdd}
        onSubmit={handleAddWorkspace}
        currentItem={newWorkspace}
        onInputChange={(e) => setNewWorkspace({ ...newWorkspace, [e.target.name]: e.target.value })}
        fields={[
          { name: "workspace_name", label: "Workspace Name", type: "text", required: true },
          { name: "building_id", label: "Building", type: "select", options: buildings.map(b => ({ label: b.building_name, value: b.building_id })), required: true },
          { name: "workspace_type_id", label: "Workspace Type", type: "select", options: workspacesTypes.map(t => ({ label: t.workspace_type_name, value: t.workspace_type_id })), required: true },
          { name: "price_per_hour", label: "Price per Hour", type: "text", required: true },
          { name: "price_per_day", label: "Price per Day", type: "text", required: true },
          { name: "price_per_month", label: "Price per Month", type: "text", required: true },
          { name: "capacity", label: "Capacity", type: "text", required: true },
          { name: "area", label: "Area (sq ft)", type: "text", required: true },
          { name: "description", label: "Description", type: "text", required: false },
          { name: "images", label: "Upload Images", type: "file", multiple: true, required: false },
        ]}
      />

      {openModalUpdate && (
        <UpdateModal
          show={openModalUpdate}
          onClose={handleCloseModalUpdate}
          onSubmit={handleUpdateWorkspace}
          currentItem={updateWorkspace}
          onInputChange={handleUpdateChange}
          fields={[
            { name: "workspace_name", label: "Workspace Name", type: "text", required: true },
            { name: "building_id", label: "Building", type: "select", options: buildings.map(b => ({ label: b.building_name, value: b.building_id })), required: true },
            { name: "workspace_type_id", label: "Workspace Type", type: "select", options: workspacesTypes.map(t => ({ label: t.workspace_type_name, value: t.workspace_type_id })), required: true },
            { name: "price_per_hour", label: "Price per Hour", type: "text", required: true },
            { name: "price_per_day", label: "Price per Day", type: "text", required: true },
            { name: "price_per_month", label: "Price per Month", type: "text", required: true },
            { name: "capacity", label: "Capacity", type: "text", required: true },
            { name: "area", label: "Area (sq ft)", type: "text", required: true },
            { name: "description", label: "Description", type: "text", required: false },
            { name: "images", label: "Upload Images", type: "file", multiple: true, required: false },
          ]}
        />
      )}

      {openModalView && viewWorkspace && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModalView}
            >
              <FiX className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-2xl mb-6">Workspace Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    Basic Information
                  </h4>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <FiHome className="w-4 h-4" />
                      <span className="font-medium">Name:</span>{" "}
                      {viewWorkspace.workspace_name}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiGrid className="w-4 h-4" />
                      <span className="font-medium">Building:</span>{" "}
                      {viewWorkspace.Building?.building_name}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiGrid className="w-4 h-4" />
                      <span className="font-medium">Type:</span>{" "}
                      {viewWorkspace.WorkspaceType?.workspace_type_name}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`badge ${
                          viewWorkspace.status === "active"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {viewWorkspace.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Specifications</h4>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4" />
                      <span className="font-medium">Capacity:</span>{" "}
                      {viewWorkspace.capacity} people
                    </p>
                    <p className="flex items-center gap-2">
                      <FiSquare className="w-4 h-4" />
                      <span className="font-medium">Area:</span>{" "}
                      {viewWorkspace.area} sq ft
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-2">Pricing</h4>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    <span className="font-medium">Hourly Rate:</span> $
                    {viewWorkspace.price_per_hour}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    <span className="font-medium">Daily Rate:</span> $
                    {viewWorkspace.price_per_day}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4" />
                    <span className="font-medium">Monthly Rate:</span> $
                    {viewWorkspace.price_per_month}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-2">Description</h4>
              <p className="text-gray-600 whitespace-pre-wrap">
                {viewWorkspace.description}
              </p>
            </div>

            {/* Images */}
            {viewWorkspace.WorkspaceImages &&
              viewWorkspace.WorkspaceImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-2">Images</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {viewWorkspace.WorkspaceImages.map((image, index) => (
                      <div key={index} className="relative aspect-video">
                        <img
                          src={image.image}
                          alt={`Workspace ${index + 1}`}
                          className="object-cover rounded-lg w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Close Button */}
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleCloseModalView}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {openModalDetails && detailWorkspace && (
        <DetailsModal
          show={openModalDetails}
          onClose={handleCloseModalDetails}
          currentItem={detailWorkspace}
        />
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
                    <span
                      className={`badge ${
                        ws.status === "active" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {ws.status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleOpenModalView(ws)}
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button
                      className={`btn btn-sm ${
                        ws.status === "inactive" ? "btn-success" : "btn-error"
                      }`}
                      onClick={() =>
                        handleDeleteWorkspace(ws.workspace_id, ws.status)
                      }
                    >
                      {ws.status === "inactive" ? "Unblock" : "Block"}
                    </button>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleOpenModalUpdate(ws)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleOpenModalDetails(ws)}
                    >
                      Details
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
