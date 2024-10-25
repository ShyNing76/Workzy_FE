import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
    getWorkspaceType,
    getWorkspaceTypeById,
    postWorkspaceType,
    putWorkspaceType,
    deleteWorkspaceType,
} from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import SearchButton from "../../../components/layout/Admin/Buttons/SearchButton.jsx";

import Pagination from "../../../components/layout/Shared/Pagination/Pagination.jsx";

const WorkspacesTypesManagerPage = () => {
    const [workspaceType, setWorkspaceType] = useState(null); // State để lưu trữ dữ liệu
    const [loading, setLoading] = useState(true); // State loading
    const [error, setError] = useState(null); // State lỗi
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [workspaceTypeToDelete, setWorkspaceTypeToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [selectedWorkspaceTypeDetails, setSelectedWorkspaceTypeDetails] =
        useState(null);
    const [isChanged, setIsChanged] = useState(false);

    const [newWorkspaceType, setNewWorkspaceType] = useState({
        workspace_type_name: "",
        image: null,
        description: "",
        status: "active",
    });

    // pagination
    const PAGE_SIZE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [workspaceTypeCount, setWorkspaceTypeCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        //Hiện data lên table
        setLoading(true);
        const fetchWorkspaceType = async () => {
            try {
                const res = await getWorkspaceType("", currentPage, PAGE_SIZE);
                console.log("API response:", res); // Inspect API response
                if (res && res.data && Array.isArray(res.data.rows)) {
                    setWorkspaceType(res.data.rows);
                    setWorkspaceTypeCount(res.data.count);
                    setTotalPages(Math.ceil(res.data.count / PAGE_SIZE));
                } else {
                    setWorkspaceType([]); // Initialize as an empty array if data is not as expected
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkspaceType();
    }, [isChanged, currentPage]);

    //Hàm click lên hàng để hiện more details
    const handleRowClick = async (workspace_type_id) => {
        try {
            const res = await getWorkspaceTypeById(workspace_type_id);
            if (res && res.data) {
                setSelectedWorkspaceTypeDetails(res.data);
                setShowDetailsModal(true);
            }
        } catch (err) {
            console.error("Error fetching workspace type details", err);
        }
    };

    const handleOnClose = () => {
        setNewWorkspaceType({}); // Clear the form
        setSelectedWorkspaceTypeDetails(null); // Clear the selected item
        setShowAddModal(false);
        setShowUpdateModal(false);
        setShowDeleteModal(false);
        setShowDetailsModal(false);
    };

    const checkIfNameExists = async (name) => {
        try {
            const res = await getWorkspaceType();
            const existingTypes = res.data.rows || [];

            // Kiểm tra tên đã tồn tại không (không bao gồm tên hiện tại)
            return existingTypes.some(
                (type) =>
                    type.workspace_type_name.toLowerCase() ===
                        name.toLowerCase() &&
                    type.workspace_type_id !==
                        newWorkspaceType.workspace_type_id // loại trừ tên hiện tại
            );
        } catch (err) {
            console.error(
                "Error checking for existing workspace type names:",
                err
            );
            return false; // Giả sử không tồn tại nếu có lỗi
        }
    };

    //Khu vực hàm dành cho add

    const handleAddWorkspaceType = async (e) => {
        e.preventDefault();
        try {
            const response = await postWorkspaceType(newWorkspaceType);
            if (response && response.err === 0) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Workspace type added successfully!",
                });
                setIsChanged(!isChanged);
                setShowAddModal(false);
                setNewWorkspaceType({ name: "", image: null, description: "" });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.message,
                });
            }
        } catch (err) {
            console.error("Failed to add workspace type:", err);
        }
    };

    const addWorkspaceTypeFields = [
        {
            label: "Name",
            type: "text",
            name: "workspace_type_name",
            value: `${newWorkspaceType.workspace_type_name}`,
        },
        {
            label: "Description",
            type: "text",
            name: "description",
            value: `${newWorkspaceType.description}`,
        },
        {
            name: "image",
            label: "Images",
            type: "file",
            value: `${newWorkspaceType.image}`,
        },
    ];

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        console.log("🚀 ~ handleInputChange ~  { name, value, files }:", {
            name,
            value,
            files,
        });
        setNewWorkspaceType({
            ...newWorkspaceType,
            [name]: files ? files[0] : value,
        });
    };

    //Khu vực hàm dành cho update

    const handleUpdateWorkspaceType = async (e) => {
        e.preventDefault();

        // Kiểm tra xem tên có tồn tại không
        const nameExists = await checkIfNameExists(
            newWorkspaceType.workspace_type_name
        );

        if (nameExists) {
            setError("Workspace type name already exists."); // Hiện thông báo lỗi
            return;
        }

        try {
            const updatedWorkspaceType = {
                ...newWorkspaceType,
                status:
                    newWorkspaceType.status === "active"
                        ? "active"
                        : "inactive", // Đảm bảo trạng thái chính xác
            };

            console.log("newWorkspaceType:", newWorkspaceType); // Log để kiểm tra giá trị
            const response = await putWorkspaceType(
                updatedWorkspaceType.workspace_type_id,
                updatedWorkspaceType
            );

            if (response && response.err === 0) {
                setShowUpdateModal(false);
                setIsChanged(!isChanged);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Workspace type updated successfully!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: response.message || "Update failed",
                });
            }
        } catch (err) {
            console.error("Failed to update workspace type:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update workspace type",
            });
        }
    };

    const handleUpdateChange = (e) => {
        const { name, type, value, files, checked } = e.target;
        console.log(files); // Log để kiểm tra giá trị

        setNewWorkspaceType((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                        ? "active"
                        : "inactive"
                    : type === "file"
                    ? e.target.files[0]
                    : value,
        }));
    };

    const handleUpdateClick = (workspaceType) => {
        setNewWorkspaceType({
            ...workspaceType,
            image: Array.isArray(workspaceType.image) ? workspaceType.image : [workspaceType.image],
            status: workspaceType.status === "active" ? "active" : "inactive",
        });

        setShowUpdateModal(true);
    };

    const updateWorkspaceTypeFields = [
        {
            label: "Name",
            type: "text",
            name: "workspace_type_name",
            value: `${newWorkspaceType.workspace_type_name}`,
        },
        {
            label: "Image",
            type: "file",
            name: "image",
            value: `${newWorkspaceType.image}`,
        },
        {
            label: "Description",
            type: "text",
            name: "description",
            value: `${newWorkspaceType.description}`,
        },
    ];

    //Khu vực hàm dành cho delete
    const handleDeleteWorkspaceType = async (workspaceTypeToDelete) => {
        if (!workspaceTypeToDelete) return;

        try {
            const res = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete!",
            });

            if (res.isConfirmed) {
                // Call the deleteWorkspaceType API to set the status to inactive
                const response = await deleteWorkspaceType(
                    workspaceTypeToDelete.workspace_type_id
                );

                if (response && response.err === 0) {
                    // Update the local state to reflect the change

                    setIsChanged(!isChanged);
                    Swal.fire({
                        icon: "success",
                        title:
                            workspaceTypeToDelete.status === "inactive"
                                ? "Workspace Type active!"
                                : "Workspace Type inacitve!",
                        text:
                            workspaceTypeToDelete.status === "inactive"
                                ? "Workspace Type has been successfully active."
                                : "Workspace Type has been successfully inacitve.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.message,
                    });
                }
            }
        } catch (err) {
            console.error("Failed to delete workspace type:", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleSearchWorkspaceType = async () => {
        setLoading(true);
        try {
            const res = await getWorkspaceType(searchTerm, 1, PAGE_SIZE);
            console.log("API response:", res); // Inspect API response
            if (res && res.data && Array.isArray(res.data.rows)) {
                setWorkspaceType(res.data.rows);
                setWorkspaceTypeCount(res.data.count);
                setTotalPages(Math.ceil(res.data.count / PAGE_SIZE));
            } else {
                setWorkspaceType([]); // Initialize as an empty array if data is not as expected
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <h1 className="text-4xl font-black mb-4">Manage Workspace Types</h1>

            <div className="grid grid-cols-3">
                <SearchBar
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    placeholder="Search by ID, name, or status"
                />
                <div className="">
                    <SearchButton
                        onClick={handleSearchWorkspaceType}
                        label="Search"
                    />
                </div>

                {/* Add Button */}
                <div className="ml-2">
                    <AddButton
                        onClick={() => setShowAddModal(true)}
                        label="Add Workspace Type"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Workspace Type Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <span className="loading loading-spinner loading-xs"></span>
                                    <p>Loading...</p>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="4">
                                    Something went wrong: {error.message}
                                </td>
                            </tr>
                        ) : workspaceType && workspaceType.length ? (
                            Array.isArray(workspaceType) &&
                            workspaceType.map((workspaceType) => (
                                <tr
                                    key={workspaceType.workspace_type_id}
                                    className="cursor-pointer"
                                >
                                    <td>{workspaceType.workspace_type_name}</td>
                                    <td>{workspaceType.description}</td>
                                    <td>{workspaceType.status}</td>
                                    <td className="flex space-x-2 w-50">
                                        {/* Details Button */}
                                        <button
                                            className="btn btn-info btn-sm w-20"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRowClick(
                                                    workspaceType.workspace_type_id
                                                );
                                            }}
                                        >
                                            {" "}
                                            Details{" "}
                                        </button>

                                        {/* Update Button */}
                                        <UpdateButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdateClick(
                                                    workspaceType
                                                );
                                            }}
                                        />

                                        {/* Delete Button */}
                                        <DeleteButton
                                            onClick={(e) =>
                                                handleDeleteWorkspaceType(
                                                    workspaceType
                                                )
                                            }
                                            label={
                                                workspaceType.status ===
                                                "active"
                                                    ? "Block"
                                                    : "Unblock"
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No workspace types found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setPage={setCurrentPage}
                    />
                )}
            </div>

            {/* Add, Update, Delete, Success Modals */}
            <AddModal
                show={showAddModal}
                onClose={handleOnClose}
                onSubmit={handleAddWorkspaceType}
                currentItem={newWorkspaceType}
                onInputChange={handleInputChange}
                fields={addWorkspaceTypeFields}
            />

            <UpdateModal
                show={showUpdateModal}
                onClose={handleOnClose}
                onSubmit={handleUpdateWorkspaceType}
                currentItem={newWorkspaceType}
                onInputChange={handleUpdateChange}
                fields={updateWorkspaceTypeFields}
            />

            <DetailsModal
                show={showDetailsModal}
                onClose={handleOnClose}
                currentItem={selectedWorkspaceTypeDetails}
            />
        </div>
    );
};

export default WorkspacesTypesManagerPage;
