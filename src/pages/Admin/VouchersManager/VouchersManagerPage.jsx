import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { getVoucher } from "../../../config/api.admin.js";
import { getVoucherById } from "../../../config/api.admin.js";
import { postVoucher } from "../../../config/api.admin.js";
import { putVoucher } from "../../../config/api.admin.js";
import { deleteVoucher } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";

const VouchersManagerPage = () => {
  const location = useLocation();

  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  //const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVoucherDetails, setSelectedVoucherDetails] = useState("");
  const [voucherToDelete, setVoucherToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newVoucher, setNewVoucher] = useState({
    voucher_name: "",
    voucher_code: "",
    description: "",
    discount: 0,
    quantity: 0,
    expired_date: "",
  });

  const [responseData, setResponseData] = useState(null);

  const convertDateToMMDDYYYY = (dateStr) => {
    if (!dateStr) {
      return "none"; // Handle undefined or empty strings
    }

    try {
      // Check if dateStr contains a 'T' indicating a date-time format
      if (dateStr.includes("T")) {
        dateStr = dateStr.split("T")[0]; // Remove the time part
      }

      // Split into parts
      const parts = dateStr.split("-");

      if (parts.length !== 3) {
        return "none"; // If format is incorrect, return "none"
      }

      const [year, month, day] = parts;

      if (!year || !month || !day) {
        return "none"; // Handle missing date parts
      }

      // Ensure month and day are two digits
      const formattedMonth = month.length > 1 ? month : "0" + month;
      const formattedDay =
        day.split("Z")[0].length > 1
          ? day.split("Z")[0]
          : "0" + day.split("Z")[0];

      // Check if formed date is valid
      const dateCheck = new Date(`${year}-${formattedMonth}-${formattedDay}`);
      if (isNaN(dateCheck.getTime())) {
        return "none"; // Return "none" for invalid date checks
      }

      // Return the formatted date
      return `${formattedDay}/${formattedMonth}/${year}`;
    } catch (error) {
      return "none"; // Return "none" if any error occurs in processing
    }
  };

  //Hiện data lên table
  const fetchVoucher = async () => {
    try {
      const res = await getVoucher();
      console.log("API response:", res); // Inspect API response
      if (res && res.data && Array.isArray(res.data.rows)) {
        setVoucher(res.data.rows);
      } else {
        setVoucher([]); // Initialize as an empty array if data is not as expected
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoucher();
  }, []);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: successMessage,
        position: "top-end",
        toast: true, // makes it a toast message
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => setSuccessMessage("")); // clear the message after showing
    }
  }, [successMessage]);

  //Hàm click lên hàng để hiện more details
  const handleRowClick = async (voucher_id) => {
    try {
      const res = await getVoucherById(voucher_id);
      if (res && res.data) {
        const formattedDetails = {
          ...res.data,
          discount: `${res.data.discount * 100}%`,
          expired_date: convertDateToMMDDYYYY(res.data.expired_date),
        };
        setSelectedVoucherDetails(formattedDetails);
        setShowDetailsModal(true);
      }
    } catch (err) {
      console.error("Error fetching voucher details", err);
    }
  };

  //Khu vực hàm dành cho add
  const handleAddVoucher = async (e) => {
    e.preventDefault();

    // Validation logic
    if (!newVoucher.voucher_name) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Voucher name is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newVoucher.voucher_code) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Voucher code is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newVoucher.description) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Description is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (newVoucher.discount <= 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Discount must be greater than 0.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (newVoucher.quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Quantity must be greater than 0.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (!newVoucher.expired_date) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Expired date is required.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    // Duplicate checking for voucher_name and voucher_code
    const isDuplicateName =
      voucher &&
      voucher.some((item) => item.voucher_name === newVoucher.voucher_name);
    const isDuplicateCode =
      voucher &&
      voucher.some((item) => item.voucher_code === newVoucher.voucher_code);

    if (isDuplicateName) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "A voucher with this name already exists.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    if (isDuplicateCode) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "A voucher with this code already exists.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append("voucher_name", newVoucher.voucher_name);
    formData.append("voucher_code", newVoucher.voucher_code);
    formData.append("description", newVoucher.description);
    formData.append("discount", newVoucher.discount);
    formData.append("quantity", newVoucher.quantity);
    formData.append("expired_date", newVoucher.expired_date);
    console.log("Form Data:", newVoucher); // Log form data for debugging

    const isDuplicate =
      voucher &&
      voucher.some((item) => item.voucher_name === newVoucher.voucher_name);
    if (isDuplicate) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "A voucher with this name already exists.",
        position: "top-end",
        toast: true,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    try {
      const Voucher = await postVoucher(newVoucher);
      setResponseData(Voucher);
      fetchVoucher();
      setShowAddModal(false);
      setSuccessMessage("Voucher added successfully!"); // Set success message
    } catch (err) {
      console.error("Error adding voucher", err);
    }
  };

  const addVoucherFields = [
    {
      name: "voucher_name",
      label: "Voucher Name",
      type: "text",
      value: `${newVoucher.voucher_name}`,
    },
    {
      name: "voucher_code",
      label: "Voucher Code",
      type: "text",
      value: `${newVoucher.voucher_code}`,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      value: `${newVoucher.description}`,
    },
    {
      name: "discount",
      label: "Discount",
      type: "number",
      value: `${newVoucher.discount}`,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      value: `${newVoucher.quantity}`,
    },
    {
      name: "expired_date",
      label: "Expired Date",
      type: "date",
      value: `${newVoucher.expired_date}`,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher({
      ...newVoucher,
      [name]: value,
    });
  };

  const resetNewVoucher = () => {
    setNewVoucher({
      voucher_name: "",
      voucher_code: "",
      description: "",
      discount: 0,
      quantity: 0,
      expired_date: "",
    });
  };

  //Khu vực dành cho hàm delete
  const handleDeleteVoucher = async () => {
    try {
      await deleteVoucher(voucherToDelete.voucher_id);
      setSuccessMessage(
        `Voucher ${voucherToDelete.voucher_name} set to inactive successfully!`
      );
      setShowDeleteModal(false);
      fetchVoucher(); // Refresh the voucher list
    } catch (err) {
      console.error("Error deleting voucher: ", err);
      setError(err.response?.data?.message || "Failed to delete voucher");
    }
  };

  //Khu vực hàm dành cho block/unblock
  const handleToggleStatus = async (voucher) => {
    const newStatus = voucher.status === "active" ? "inactive" : "active";
    const action = newStatus === "active" ? "unblock" : "block";

    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this voucher?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await putVoucher(voucher.voucher_id, { ...voucher, status: newStatus });

        setVoucher((prevVoucher) =>
          prevVoucher.map((v) =>
            v.voucher_id === voucher.voucher_id
              ? { ...v, status: newStatus }
              : v
          )
        );

        Swal.fire({
          icon: "success",
          title: `Voucher status has been set to ${newStatus} successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error toggling voucher status:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to set voucher status to ${newStatus}. Try again later.`,
        });
      }
    }
  };

  const filteredVoucher = Array.isArray(voucher)
    ? voucher.filter((item) => {
        const matchesStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchesSearchTerm = item.voucher_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearchTerm;
      })
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Vouchers</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Voucher Name"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton
            onClick={() => {
              resetNewVoucher();
              setShowAddModal(true);
            }}
            label="Add Voucher"
          />
        </div>
      </div>

      <div className="mb-4">
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered select-sm max-w-xs"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        {/* <SuccessAlert message={successMessage} onClose={closeSuccessMessage} /> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Quantity</th>
              <th>Expired Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoucher.map((voucher) => (
              <tr
                key={voucher.voucher_id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(voucher.voucher_id)}
              >
                <td>{voucher.voucher_name}</td>
                <td>{voucher.voucher_code}</td>
                <td>{voucher.discount * 100}%</td>
                <td>{voucher.quantity}</td>
                <td>{convertDateToMMDDYYYY(voucher.expired_date)}</td>
                <td>
                  {
                    <div
                      className={`badge uppercase w-20 font-bold text-gray-100 ${
                        voucher.status === "active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {" "}
                      {voucher.status}
                    </div>
                  }
                </td>
                <td className="flex space-x-2">
                  <BlockButton
                    status={voucher.status}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStatus(voucher);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {/* <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={currentAmenityDetails}
      />

      {/* Add, Update, Delete Modals */}
      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddVoucher}
        currentItem={newVoucher}
        onInputChange={handleInputChange}
        fields={addVoucherFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteVoucher}
        itemToDelete={voucherToDelete}
        itemType="voucher"
      />

      <DetailsModal
        show={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        details={selectedVoucherDetails}
      />
    </div>
  );
};

export default VouchersManagerPage;
