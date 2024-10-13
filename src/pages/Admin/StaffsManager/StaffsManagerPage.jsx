import React, { useEffect, useState } from "react";
import { getStaff } from "../../../config/api.admin.js";

import { postStaff } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import SuccessModal from "../../../components/layout/Admin/Modals/SuccessModal.jsx";
import DetailsModal from "../../../components/layout/Admin/Modals/DetailsModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";

import { useLocation } from "react-router-dom";

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
    name: '',
    email: '',
    password: '',
    date_of_birth: '',
    phone: '',
  });
  const [response, setResponseData] = useState(null);

  // const [successModal, setSuccessModal] = useState({
  //   show: false,
  //   message: "",
  // });

  //Hiện data lên table
  const fetchStaff = async () => {
    try {
      const res = await getStaff();
      if(res && res.data){
        setStaff(res.data);
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

  //Khu vực hàm dành cho add
   const handleAddStaff = async (e) => {
     e.preventDefault();
     const formData = new FormData();

     formData.append('name', newStaff.name);
     formData.append('email', newStaff.email);
     formData.append('password', newStaff.password);
     formData.append('date_of_birth', newStaff.date_of_birth);
     formData.append('phone', newStaff.phone);

     try {
       const Staff = await postStaff(newStaff);
       setResponseData(Staff);

       fetchStaff();
       setShowAddModal(false);
       setSuccessMessage("Staff Added Successfully!");
       setNewStaff({name: '', email: '', password: '', date_of_birth: '', phone: ''});
     } catch(err){
      console.error("Error adding Staff: ", err);
     }
     }


  const addStaffFields = [
    { name: "fname", label: "First Name", type: "text" },
    { name: "lname", label: "Last Name", type: "text" },
    { name: "info", label: "Information", type: "text" },
  ];

  const updateStaffFields = [
    { name: "id", label: "Staff ID", type: "text" },
    { name: "fname", label: "First Name", type: "text" },
    { name: "lname", label: "Last Name", type: "text" },
    { name: "info", label: "Information", type: "text" },
  ];

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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(staff) && staff.map((staff) => (
                <tr key={staff.user_id}>
                  <td>{staff.id}</td>
                  <td>
                    {staff.lname} {staff.fname}
                  </td>
                  <td>{staff.info}</td>
                  <td>
                    {/* Update Button */}
                    <UpdateButton
                      onClick={() => {
                        // setCurrentStaff({ ...staff, oldId: staff.id });
                        setShowUpdateModal(true);
                      }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={() => {
                        setStaffToDelete({
                          ...staff,
                          name: `${staff.lname} ${staff.fname}`,
                        });
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Add, Update, Delete, Success Modals */}
      {/* <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddStaffSubmit}
        currentItem={currentStaff}
        onInputChange={handleInputChange}
        fields={addStaffFields}
      /> */}

      {/* <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateStaffSubmit}
        currentItem={currentStaff}
        onInputChange={handleInputChange}
        fields={updateStaffFields}
      /> */}

      {/* <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteStaff}
        itemToDelete={staffToDelete}
        itemType="staff"
      /> */}

      {/* <SuccessModal
        show={successModal.show}
        message={successModal.message}
        onClose={closeSuccessModal}
      /> */}
    </div>
  );
};

export default StaffsManagerPage;
