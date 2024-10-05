import React, { useState } from "react";

import SearchBar from "../../../components/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/Admin/SuccessAlert/SuccessAlert.jsx";

import {useLocation } from "react-router-dom";

const MembersManagerPage = () => {
    const location = useLocation();

    const [members, setMembers] = useState([
        { id: "MB01", fname: "Van A", lname: "Le", info: "Khách hàng 1" },
        { id: "MB02", fname: "Van B", lname: "Nguyen", info: "Khách hàng 2" },
        { id: "MB03", fname: "Duy Long", lname: "Do", info: "Khách hàng 3" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentMember, setCurrentMember] = useState({ id: "", fname: "", lname: "", info: "" });
    const [memberToDelete, setMemberToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const addMemberFields = [
      { name: 'fname', label: 'First Name', type: 'text' },
      { name: 'lname', label: 'Last Name', type: 'text' },
      { name: 'info', label: 'Information', type: 'text' }
    ];

    const updateMemberFields = [
      { name: 'id', label: 'Staff ID', type: 'text' },
      { name: 'fname', label: 'First Name', type: 'text' },
      { name: 'lname', label: 'Last Name', type: 'text' },
      { name: 'info', label: 'Information', type: 'text' }
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentMember((prev) => ({ ...prev, [name]: value }));
    };

    const generateMemberId = () => {
        const lastId = members.length > 0 ? members[members.length - 1].id : "MB00";
        const newId = `MB${(parseInt(lastId.substring(2)) + 1).toString().padStart(2, '0')}`;
        return newId;
    };

    const handleAddMemberSubmit = (e) => {
        e.preventDefault();
        const newMember = { ...currentMember, id: generateMemberId(), name: `${currentMember.fname} ${currentMember.lname}` };
        setMembers([...members, newMember]);
        setShowAddModal(false);
        setSuccessMessage("Member Added Successfully!");
        setCurrentMember({ id: '', fname: '', lname: '', info: '' });
    };

    const handleUpdateMemberSubmit = (e) => {
        e.preventDefault();
        setMembers((prevMembers) => {
            const memberIndex = prevMembers.findIndex((member) => member.id === currentMember.oldId);
            if (memberIndex !== -1) {
                const updatedMembers = [...prevMembers];
                updatedMembers[memberIndex] = { ...currentMember, name: `${currentMember.fname} ${currentMember.lname}` };
                return updatedMembers;
            }
            return prevMembers;
        });
        setShowUpdateModal(false);
        setSuccessMessage("Member Updated Successfully!");
        setCurrentMember({ id: '', fname: '', lname: '', info: '' });
    };

    const handleDeleteMember = () => {
        setMembers((prevMembers) =>
            prevMembers.filter((member) => member.id !== memberToDelete.id)
        );
        setShowDeleteModal(false);
        setSuccessMessage("Member Deleted Successfully!");
    };
  
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
  
    const closeSuccessMessage = () => {
      setSuccessMessage("");
    };
    
    const filteredMembers = members.filter(
        (member) =>
        member.id.includes(searchTerm) ||
        member.fname.includes(searchTerm) ||
        member.lname.includes(searchTerm) ||
        member.info.includes(searchTerm)
    );

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-4xl font-black mb-4">Manage Members</h1>
  
          <div className="grid grid-cols-2">
              <SearchBar
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Search by ID, name, or information"
              />
  
              {/* Add Button */}
              <div className="ml-2">
                  <AddButton onClick={() => setShowAddModal(true)} label="Add Member" />
              </div>
              
          </div>

          <div>
            <SuccessAlert
              message={successMessage}
              onClose={closeSuccessMessage}
            />
          </div>
  
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Member Name</th>
                  <th>Information</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>{member.lname} {member.fname}</td>
                      <td>{member.info}</td>
                      <td>
                        {/* Update Button */}
                        <UpdateButton
                          onClick={() => {
                            setCurrentMember({ ...member, oldId: member.id });
                            setShowUpdateModal(true);
                          }}
                        />
  
                        {/* Delete Button */}
                        <DeleteButton
                          onClick={() => {
                            setMemberToDelete({...member, name: `${member.lname} ${member.fname}`,});
                            setShowDeleteModal(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Members Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  
        {/* Add, Update, Delete, Success Modals */}
        <AddModal
              show={showAddModal}
              onClose={() => setShowAddModal(false)}
              onSubmit={handleAddMemberSubmit}
              currentItem={currentMember}
              onInputChange={handleInputChange}
              fields={addMemberFields}
        />
  
        <UpdateModal
              show={showUpdateModal}
              onClose={() => setShowUpdateModal(false)}
              onSubmit={handleUpdateMemberSubmit}
              currentItem={currentMember}
              onInputChange={handleInputChange}
              fields={updateMemberFields}
        />
  
        <DeleteModal
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onDelete={handleDeleteMember}
              itemToDelete={memberToDelete}
              itemType="member"
        />
    </div>
    );
};

export default MembersManagerPage;