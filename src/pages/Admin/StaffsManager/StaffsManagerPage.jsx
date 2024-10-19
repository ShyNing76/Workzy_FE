import React, { useEffect, useState } from "react";
import { getStaff, getStaffById } from "../../../config/api.admin.js";
import { postStaff } from "../../../config/api.admin.js";
import { putStaff } from "../../../config/api.admin.js";
import { deleteStaff } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import SuccessModal from "../../../components/layout/Admin/Modals/SuccessModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import BlockButton from "../../../components/layout/Admin/Buttons/BlockButton.jsx";

import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

const StaffsManagerPage = () => {
  const location = useLocation();

  const [staff, setStaff] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newStaff, setNewStaff] = useState({
    email: '',
    password: '',
    phone: '',
    name: '',
  });
  const [response, setResponseData] = useState(null);
  const [selectedStaffDetails, setSelectedStaffDetails] = useState(null);

  //hàm chuyển đổi định dạng ngày
  const formatDateToISO = (dateString) => {
    if (!dateString || !dateString.includes('/')) {
      return ''; // Default or handle missing date
    }
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };
  

  // const [successModal, setSuccessModal] = useState({
  //   show: false,
  //   message: "",
  // });

  //Hiện data lên table
  const fetchStaff = async () => {
    try {
      const res = await getStaff();
      if(res && res.data && Array.isArray(res.data.rows)){
        setStaff(res.data.rows);
      } else {
        setStaff([]);
      }
    } catch (err){
      setError(err);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
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

  //Hiện detail khi click vô 1 hàng
  
  const handleRowClick = async (user_id) => {
    try {
      const res = await getStaffById(user_id);
      if(res && res.data){
        setSelectedStaffDetails(res.data);
        setShowDetailsModal(true);
      }
    }catch (err){
      console.error("Error fetching staff type details: ", err);
    }
  }

  //Khu vực hàm dành cho add
   const handleAddStaff = async (e) => {
    e.preventDefault();

        // Validation logic with SweetAlert
        if (!newStaff.name) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Staff name is required.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
    
        if (!newStaff.email) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Staff email is required.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
    
        if (!newStaff.password) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Staff password is required.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }
    
        if (!newStaff.phone) {
          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Staff phone is required.',
            position: 'top-end',
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          return;
        }

    try {
      // Ensure we send only the necessary fields
      const { email, password, phone, name } = newStaff;
      const staffResponse = await postStaff({ email, password, phone, name });
      setSuccessMessage(`Staff member ${staffResponse.data.name} added successfully!`);
      setShowAddModal(false);
      setNewStaff({ email: '', password: '', phone: '', name: '' }); // Reset form
      fetchStaff();  // Refresh the staff list
    } catch (err) {
      console.error('Failed to add new staff member:', err);
      setError(err.response?.data?.message || 'Failed to add new staff');
    }
  }

  const addStaffFields = [
    { label: "Name",  type: "text", name: "name", value: `${newStaff.name}` },
    { label: "Email", type: "text", name: "email", value: `${newStaff.email}`},
    { label: "Password", type: "text", name: "password", value: `${newStaff.password}` },
    { label: "Phone", type: "text", name: "phone", value: `${newStaff.phone}`}
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({
      ...newStaff,
      [name]: value,
    });
  };

  //Khu vực hàm dành cho delete
  const handleStatusToggle = async (staff) => {
    const newStatus = staff.status === "active" ? "inactive" : "active";
    const action = newStatus === "active" ? "unblock" : "block";
  
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this staff?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      cancelButtonText: 'Cancel',
    });
  
    if (result.isConfirmed) {
      try {
        await putStaff(staff.user_id, { ...staff, status: newStatus });
        
        setStaff((prevStaff) =>
          prevStaff.map((s) =>
            s.user_id === staff.user_id
              ? { ...s, status: newStatus }
              : s
          )
        );
        
        Swal.fire({
          icon: 'success',
          title: `Staff status has been set to ${newStatus} successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error("Error toggling workspace type status:", error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Failed to set staff status to ${newStatus}. Try again later.`,
        });
      }
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCurrentStaff((prev) => ({ ...prev, [name]: value }));
  // };

  // const generateStaffId = () => {
  //   const lastId = staffs.length > 0 ? staffs[staffs.length - 1].id : "ST00";
  //   const newId = `ST${(parseInt(lastId.substring(2)) + 1)
  //     .toString()
  //     .padStart(2, "0")}`;
  //   return newId;
  // };

  // const handleAddStaffSubmit = (e) => {
  //   e.preventDefault();
  //   const newStaff = {
  //     ...currentStaff,
  //     id: generateStaffId(),
  //     name: `${currentStaff.fname} ${currentStaff.lname}`,
  //   };
  //   setStaffs([...staffs, newStaff]);
  //   setShowAddModal(false);
  //   setSuccessMessage("Staff Added Successfully!");
  //   setSuccessModal({ show: true, message: "Staff Added Successfully!" });
  //   setCurrentStaff({ id: "", fname: "", lname: "", info: "" });
  // };

  // const handleUpdateStaffSubmit = (e) => {
  //   e.preventDefault();
  //   setStaffs((prevStaffs) => {
  //     const staffIndex = prevStaffs.findIndex(
  //       (staff) => staff.id === currentStaff.oldId
  //     );
  //     if (staffIndex !== -1) {
  //       const updatedStaffs = [...prevStaffs];
  //       updatedStaffs[staffIndex] = {
  //         ...currentStaff,
  //         name: `${currentStaff.fname} ${currentStaff.lname}`,
  //       };
  //       return updatedStaffs;
  //     }
  //     return prevStaffs;
  //   });
  //   setShowUpdateModal(false);
  //   setSuccessModal({ show: true, message: "Staff Updated Successfully!" });
  //   setCurrentStaff({ id: "", fname: "", lname: "", info: "" });
  // };

  // const handleDeleteStaff = () => {
  //   setStaffs((prevStaffs) =>
  //     prevStaffs.filter((staff) => staff.id !== staffToDelete.id)
  //   );
  //   setShowDeleteModal(false);
  //   setSuccessModal({ show: true, message: "Staff Deleted Successfully!" });
  // };

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const closeSuccessModal = () => {
  //   setSuccessModal({ show: false, message: "" });
  // };

  // const filteredStaffs = staffs.filter(
  //   (staff) =>
  //     staff.id.includes(searchTerm) ||
  //     staff.fname.includes(searchTerm) ||
  //     staff.lname.includes(searchTerm) ||
  //     staff.info.includes(searchTerm)
  // );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Manage Staffs</h1>

      <div className="grid grid-cols-2">
        {/* <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          placeholder="Search by ID, name, or information"
        /> */}

        {/* Add Button */}
        <div className="ml-2">
          <AddButton onClick={() => setShowAddModal(true)} label="Add Staff" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Date of birth</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(staff) && staff.map((staff) => (
                <tr key={staff.user_id} className="hover:bg-gray-100" onClick={() => handleRowClick(staff.user_id)}>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.gender}</td>
                  <td>{staff.date_of_birth}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.status}</td>
                  <td>
                    <BlockButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusToggle(staff);
                      }}
                      status={staff.status}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add, Update, Delete, Success Modals */}
      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStaff}
        currentItem={newStaff}
        onInputChange={handleInputChange}
        fields={addStaffFields}
      />

      {/* <SuccessModal
        show={successModal.show}
        message={successModal.message}
        onClose={closeSuccessModal}
      /> */}

      <DetailsModal
      show={showDetailsModal}
      onClose={() => setShowDetailsModal(false)}
      details={selectedStaffDetails} 
      />
    </div>
  );
};

export default StaffsManagerPage;
