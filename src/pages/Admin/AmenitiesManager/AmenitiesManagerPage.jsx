import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../components/context/priceFormat.jsx";
import Swal from "sweetalert2";

import {
    getAmenity,
    getAmenityById,
    postAmenity,
    putAmenity,
    blockAmenity,
} from "../../../config/api.admin.js";

import Pagination from "../../../components/layout/Shared/Pagination/Pagination.jsx";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SearchButton from "../../../components/layout/Admin/Buttons/SearchButton.jsx";

const AmenitiesManagerPage = () => {
    const [amenity, setAmenity] = useState(null);
    const [loading, setLoading] = useState(true); // State loading
    const [error, setError] = useState(null); // State lỗi
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedAmenityDetails, setSelectedAmenityDetails] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isChanged, setIsChanged] = useState(false);
    const [newAmenity, setNewAmenity] = useState({
        amenity_name: "",
        image: null,
        original_price: 0,
        depreciation_price: 0,
        rent_price: 0,
        status: "active",
    });

    // pagination
    const PAGE_SIZE = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [amenitiesCount, setAmenitiesCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        //Hiện data lên table
        const fetchAmenity = async () => {
            try {
                const res = await getAmenity(
                    searchTerm,
                    currentPage,
                    PAGE_SIZE
                );
                console.log("API response:", res);
                if (res && res.data && Array.isArray(res.data.rows)) {
                    const sortAmenity = res.data.rows.sort((a, b) => {
                        if (a.status === "active" && b.status !== "active")
                            return -1;
                        if (a.status !== "active" && b.status === "active")
                            return 1;
                        return 0;
                    });
                    setAmenitiesCount(res.data.count);
                    setTotalPages(Math.ceil(res.data.count / PAGE_SIZE));
                    setAmenity(res.data.rows);
                } else {
                    setAmenity([]);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAmenity();
    }, [isChanged, currentPage]);

    //Hàm click lên hàng để hiện more details
    const handleRowClick = async (amenity_id) => {
        try {
            const res = await getAmenityById(amenity_id);

            if (res && res.data) {
                setSelectedAmenityDetails(res.data);
                setShowDetailsModal(true);
            }
        } catch (err) {
            console.error("Error fetching amenity details", err);
        }
    };

    //Khu vực hàm dành cho add
    const handleAddAmenity = async (e) => {
        e.preventDefault();

        if (!newAmenity.amenity_name) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Amenity name is required.",
                position: "top-end",
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        }

        // check price is number and greater than 0
        if (
            (newAmenity && isNaN(newAmenity.original_price)) ||
            newAmenity.original_price <= 0
        ) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Original price must be a number.",
                position: "top-end",
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        }

        try {
            const response = await postAmenity(newAmenity);
            if (response && response.err === 0) {
                setResponseData(response);
                setShowAddModal(false);
                setAmenity([...amenity, newAmenity]);
                setIsChanged(!isChanged);
                setSuccessMessage("Amenity added successfully!"); // Set success message
                Swal.fire({
                    icon: "success",
                    title: "Add Amenity!",
                    text: "Do you want to add this amenity?",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message,
                });
            }
        } catch (err) {
            console.error("Error adding amenity", err);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const addAmenityFields = [
        {
            name: "amenity_name",
            label: "Amenity Name",
            type: "text",
            value: `${newAmenity.amenity_name}`,
        },
        {
            name: "original_price",
            label: "Original Price",
            type: "text",
            value: `${newAmenity.original_price}`,
        },
        {
            name: "rent_price",
            label: "Rent Price",
            type: "text",
            value: `${newAmenity.rent_price}`,
        },
        {
            name: "image",
            label: "Images",
            type: "file",
            multiple: true,
            value: `${newAmenity.image}`,
        },
    ];

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setNewAmenity({
            ...newAmenity,
            [name]: files ? files[0] : value,
        });
    };

    //Khu vực hàm dành cho update
    const handleUpdateAmenity = async (e) => {
        e.preventDefault();

        // Check for duplicate amenity name
        const isDuplicateName = amenity.some(
            (a) =>
                a.amenity_name.toLowerCase() ===
                    newAmenity.amenity_name.toLowerCase() &&
                a.amenity_id !== newAmenity.amenity_id
        );

        // Validation logic
        if (isDuplicateName) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Amenity name already exists. Please enter a unique name.",
                position: "top-end",
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        }

        if (!newAmenity.amenity_name) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Amenity name is required.",
                position: "top-end",
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        }

        if (newAmenity.original_price <= 0) {
            Swal.fire({
                icon: "error",
                title: "Validation Error",
                text: "Original price must be greater than 0.",
                position: "top-end",
                toast: true,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
            return;
        }

        try {
            const response = await putAmenity(
                newAmenity.amenity_id,
                newAmenity
            );

            if (response && response.err === 0) {
                // set to the updated amenity in the local state
                setAmenity(
                    amenity.map((a) =>
                        a.amenity_id === newAmenity.amenity_id ? newAmenity : a
                    )
                );

                setIsChanged(!isChanged);
                setShowUpdateModal(false);
                setSuccessMessage("Amenity updated successfully!");
                Swal.fire({
                    icon: "success",
                    title: "Update Amenity!",
                    text: response.message,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message,
                });
            }
        } catch (err) {
            console.error("Error updating amenity", err);
        }
    };

    const handleUpdateChange = (e) => {
        const { name, type, value, files, checked } = e.target;
        console.log(files); // Log để kiểm tra giá trị

        setNewAmenity((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                        ? "active"
                        : "inactive"
                    : type === "file"
                    ? files.length > 1 // Kiểm tra nếu có nhiều file
                        ? Array.from(files) // Chuyển thành mảng nếu có nhiều file
                        : files[0] // Nếu chỉ có một file
                    : value, // Cho các input khác
        }));
    };

    const handleUpdateClick = (amenity) => {
        setNewAmenity(amenity);
        setShowUpdateModal(true);
    };

    const updateAmenityFields = [
        {
            name: "amenity_name",
            label: "Amenity Name",
            type: "text",
            value: `${newAmenity.amenity_name}`,
        },
        {
            name: "original_price",
            label: "Original Price",
            type: "number",
            value: `${newAmenity.original_price}`,
        },
        {
            name: "rent_price",
            label: "Rent Price",
            type: "number",
            value: `${newAmenity.rent_price}`,
        },
        {
            name: "image",
            label: "Images",
            type: "file",
            multiple: true,
            value: `${newAmenity.image}`,
        },
    ];

    //Khu vực hàm dành cho delete
    const handleDeleteAmenity = async (amenity, status) => {
        // Hàm xóa amenity
        try {
            // Display the confirmation window for block/unblock
            const res = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, confirm!",
            });

            // If the user selects Yes
            if (res.isConfirmed) {
                const response = await blockAmenity(amenity.amenity_id);
                if (response && response.err === 0) {
                    setIsChanged(!isChanged);
                    Swal.fire({
                        icon: "success",
                        title:
                            status === "unblock"
                                ? "Amenity Unblocked!"
                                : "Amenity Blocked!",
                        text:
                            status === "unblock"
                                ? "Amenity has been successfully unblocked."
                                : "Amenity has been successfully blocked.",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.message,
                    });
                }
            }
        } catch (error) {
            console.error("Error blocking/unblocking amenity", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const handleOnClose = () => {
        setNewAmenity({}); // Clear the form
        setShowAddModal(false);
        setShowUpdateModal(false);
        setShowDeleteModal(false);
        setShowDetailsModal(false);
    };

    const handleSearchChange = (e) => {
        console.log(e.target.value);
        setSearchTerm(e.target.value);
    };

    const handleSearchAmenies = async () => {
        setLoading(true);
        try {
            setCurrentPage(1);
            const res = await getAmenity(searchTerm, currentPage, PAGE_SIZE);
            if (res && res.data && Array.isArray(res.data.rows)) {
                setAmenity(res.data.rows);
                setAmenitiesCount(res.data.count);
            } else {
                setAmenity([]);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-black mb-4">Manage Amenities</h1>

            <div className="grid grid-cols-3">
                <SearchBar
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    placeholder="Search by ID, name, or status"
                />
                <div className="">
                    <SearchButton
                        onClick={handleSearchAmenies}
                        label="Search"
                    />
                </div>

                {/* Add Button */}
                <div className="ml-2">
                    <AddButton
                        onClick={() => setShowAddModal(true)}
                        label="Add Amenity"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Amenity Name</th>
                            <th>Original Price</th>
                            <th>Depreciation Price</th>
                            <th>Rent Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    <span className="loading loading-spinner loading-xs"></span>
                                </td>
                            </tr>
                        ) : (
                            Array.isArray(amenity) &&
                            amenity.map((amenity) => (
                                <tr key={amenity.amenity_id} className="hover">
                                    <td>{amenity.amenity_name}</td>
                                    <td>
                                        {formatCurrency(amenity.original_price)}
                                    </td>
                                    <td>
                                        {formatCurrency(
                                            amenity.depreciation_price
                                        )}
                                    </td>
                                    <td>
                                        {formatCurrency(amenity.rent_price)}
                                    </td>
                                    <td>
                                        <div
                                            className={`badge uppercase w-20 font-bold text-gray-100 ${
                                                amenity.status === "active"
                                                    ? "badge-success"
                                                    : "badge-error"
                                            }`}
                                        >
                                            {" "}
                                            {amenity.status}
                                        </div>
                                    </td>
                                    <td className="flex space-x-2 w-48">
                                        {/* Details Button */}
                                        <button
                                            className="btn btn-accent btn-sm w-20"
                                            onClick={() =>
                                                handleRowClick(
                                                    amenity.amenity_id
                                                )
                                            }
                                        >
                                            Details
                                        </button>
                                        {/* Update Button */}
                                        <UpdateButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUpdateClick(amenity);
                                            }}
                                        />

                                        {/* Block button or un block button */}
                                        <DeleteButton
                                            onClick={() =>
                                                handleDeleteAmenity(
                                                    amenity,
                                                    amenity.status === "active"
                                                        ? "block"
                                                        : "unblock"
                                                )
                                            }
                                            label={
                                                amenity.status === "active"
                                                    ? "Block"
                                                    : "Unblock"
                                            }
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {amenitiesCount >= PAGE_SIZE && (
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        setPage={setCurrentPage}
                    />
                )}
            </div>

            <AddModal
                show={showAddModal}
                onClose={handleOnClose}
                onSubmit={handleAddAmenity}
                currentItem={newAmenity}
                onInputChange={handleInputChange}
                fields={addAmenityFields}
            />

            <UpdateModal
                show={showUpdateModal}
                onClose={handleOnClose}
                onSubmit={handleUpdateAmenity}
                currentItem={newAmenity}
                onInputChange={handleUpdateChange}
                fields={updateAmenityFields}
            />

            <DetailsModal
                show={showDetailsModal}
                onClose={handleOnClose}
                currentItem={selectedAmenityDetails}
            />
        </div>
    );
};

export default AmenitiesManagerPage;
