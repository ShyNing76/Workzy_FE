import React, { useEffect, useState } from "react";
import {
  getWorkspace,
  deleteWorkspace,
  getBuilding,
  postWorkspace,
  getAllWorkspaceType,
  putWorkspace,
  getTotalWorkspace,
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
import Pagination from "../../../components/layout/Shared/Pagination/Pagination";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton";
import { u } from "framer-motion/client";

const WorkspacesManagerPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [workspacesTypes, setWorkspacesType] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalWorkSpace, setTotalWorkSpace] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
      const res = await getWorkspace(page, limit);
      if (res && res.data) {
        setWorkspaces(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotalWorkspaces = async () => {
    try {
      setIsLoading(true);

      const res = await getTotalWorkspace();
      if (res && res.data) {
        setTotalWorkSpace(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
    fetchTotalWorkspaces();
  }, [page, setPage]);

  useEffect(() => {
    if (totalWorkSpace > 0) {
      setTotalPages(Math.ceil(totalWorkSpace / limit)); // Calculate total pages
    } else {
      setTotalPages(1);
    }
  }, [totalWorkSpace, limit]);

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
          text: res.message,
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
    const restructuredWorkspace = {
      ...workspace,
      images: workspace.WorkspaceImages.map((img) => img.image),
      building_id: workspace.Building?.building_id,
    };
    setUpdateWorkspace(restructuredWorkspace);

    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const handleUpdateChange = (e) => {
    const { name, type, files, value } = e.target;

    setUpdateWorkspace((prev) => {
      if (type === "file") {
        const newFiles = Array.from(files);
        return {
          ...prev,
          images: [...(prev.images || []), ...newFiles],
        };
      } else if (name === "images") {
        // Nhận danh sách ảnh mới từ modal
        return {
          ...prev,
          images: value,
        };
      } else if (name === "remove_images") {
        // Nhận danh sách ảnh đã xóa từ modal
        return {
          ...prev,
          remove_images: value,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpdateFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUpdateWorkspace({ ...updateWorkspace, images: files });
  };

  const handleUpdateWorkspace = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Add basic fields
      formData.append("workspace_name", updateWorkspace.workspace_name || "");
      formData.append("building_id", updateWorkspace.building_id || "");
      formData.append(
        "workspace_type_id",
        updateWorkspace.workspace_type_id || ""
      );
      formData.append("price_per_hour", updateWorkspace.price_per_hour || "");
      formData.append("price_per_day", updateWorkspace.price_per_day || "");
      formData.append("price_per_month", updateWorkspace.price_per_month || "");
      formData.append("capacity", updateWorkspace.capacity || "");
      formData.append("area", updateWorkspace.area || "");
      formData.append("description", updateWorkspace.description || "");
      formData.append("status", updateWorkspace.status || "");

      // Handle images
      if (updateWorkspace.images && updateWorkspace.images.length > 0) {
        updateWorkspace.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          } else if (
            typeof image === "string" &&
            (!updateWorkspace.remove_images ||
              !updateWorkspace.remove_images.includes(image))
          ) {
            formData.append("images", image);
          }
        });
      }

      // Add removed images to formData
      if (
        updateWorkspace.remove_images &&
        updateWorkspace.remove_images.length > 0
      ) {
        updateWorkspace.remove_images.forEach((image) => {
          formData.append("remove_images", image);
        });
      }

      // Log formData contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
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
      images: workspace.WorkspaceImages.map((img) => ({ image: img.image })),
      WorkspaceType: workspace.WorkspaceType.workspace_type_name,
      building_name: getBuildingNameById(workspace.Building?.building_id),
    };
    setDetailWorkspace(restructuredWorkspace);

    setOpenModalDetails(true);
  };

  const handleCloseModalDetails = () => {
    setOpenModalDetails(false);
    setDetailWorkspace(null);
  };

  const getBuildingNameById = (buildingId) => {
    const building = buildings.find((b) => b.building_id === buildingId);
    return building ? building.building_name : "Unknown";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-black mb-4">Workspace Management</h1>
        <AddButton onClick={handleOpenModalAdd} label="Add Workspace" />
      </div>

      {/* Modal sử dụng AddModal */}
      <AddModal
        show={openModalAdd}
        onClose={handleCloseModalAdd}
        onSubmit={handleAddWorkspace}
        currentItem={newWorkspace}
        onInputChange={(e) =>
          setNewWorkspace({ ...newWorkspace, [e.target.name]: e.target.value })
        }
        fields={[
          {
            name: "workspace_name",
            label: "Workspace Name",
            type: "text",
            required: true,
          },
          {
            name: "building_id",
            label: "Building",
            type: "select",
            options: buildings.map((b) => ({
              label: b.building_name,
              value: b.building_id,
            })),
            required: true,
          },
          {
            name: "workspace_type_id",
            label: "Workspace Type",
            type: "select",
            options: workspacesTypes.map((t) => ({
              label: t.workspace_type_name,
              value: t.workspace_type_id,
            })),
            required: true,
          },
          {
            name: "price_per_hour",
            label: "Price per Hour",
            type: "text",
            required: true,
          },
          {
            name: "price_per_day",
            label: "Price per Day",
            type: "text",
            required: true,
          },
          {
            name: "price_per_month",
            label: "Price per Month",
            type: "text",
            required: true,
          },
          { name: "capacity", label: "Capacity", type: "text", required: true },
          { name: "area", label: "Area (sq ft)", type: "text", required: true },
          {
            name: "description",
            label: "Description",
            type: "text",
            required: false,
          },
          {
            name: "images",
            label: "Upload Images",
            type: "file",
            multiple: true,
            required: false,
          },
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
            {
              name: "workspace_name",
              label: "Workspace Name",
              type: "text",
              required: true,
            },
            {
              name: "building_id",
              label: "Building",
              type: "select",
              options: buildings.map((b) => ({
                label: b.building_name,
                value: b.building_id,
              })),
              required: true,
            },
            {
              name: "workspace_type_id",
              label: "Workspace Type",
              type: "select",
              options: workspacesTypes.map((t) => ({
                label: t.workspace_type_name,
                value: t.workspace_type_id,
              })),
              required: true,
            },
            {
              name: "price_per_hour",
              label: "Price per Hour",
              type: "text",
              required: true,
            },
            {
              name: "price_per_day",
              label: "Price per Day",
              type: "text",
              required: true,
            },
            {
              name: "price_per_month",
              label: "Price per Month",
              type: "text",
              required: true,
            },
            {
              name: "capacity",
              label: "Capacity",
              type: "text",
              required: true,
            },
            {
              name: "area",
              label: "Area (sq ft)",
              type: "text",
              required: true,
            },
            {
              name: "description",
              label: "Description",
              type: "text",
              required: false,
            },
            {
              name: "images",
              label: "Upload Images",
              type: "file",
              multiple: true,
              required: false,
            },
          ]}
        />
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
        <table className="table w-full ">
          <thead>
            <tr>
              <th>Workspace ID</th>
              <th>Workspace Name</th>
              <th>Workspace Type</th>
              <th>Locate Building</th>
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
                <tr className="hover" key={ws.workspace_id}>
                  <td>{ws.workspace_id}</td>
                  <td>{ws.workspace_name}</td>
                  <td>{ws.WorkspaceType.workspace_type_name}</td>
                  <td>{getBuildingNameById(ws.Building.building_id)}</td>
                  <td>
                    <div
                      className={`badge uppercase w-20 font-bold text-gray-100 ${
                        ws.status === "active" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {" "}
                      {ws.status}
                    </div>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info w-20"
                      onClick={() => handleOpenModalDetails(ws)}
                    >
                      Details
                    </button>

                    <button
                      className="btn btn-sm btn-warning w-20"
                      onClick={() => handleOpenModalUpdate(ws)}
                    >
                      Update
                    </button>
                    <button
                      className={`btn btn-sm w-20 ${
                        ws.status === "inactive" ? "btn-success" : "btn-error"
                      } `}
                      onClick={() =>
                        handleDeleteWorkspace(ws.workspace_id, ws.status)
                      }
                    >
                      {ws.status === "inactive" ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default WorkspacesManagerPage;
