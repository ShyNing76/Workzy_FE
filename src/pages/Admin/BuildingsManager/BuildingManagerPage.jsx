import { useLocation } from "react-router-dom";
import React, { useState } from "react";

// import SearchBar from "../../../../components/layout/Admin/SearchBar/SearchBar.jsx";
// import AddModal from "../../../../components/layout/Admin/Modals/AddModal.jsx";
// import DeleteModal from "../../../../components/layout/Admin/Modals/DeleteModal.jsx";
// import UpdateModal from "../../../../components/layout/Admin/Modals/UpdateModal.jsx";
// import AddButton from "../../../../components/layout/Admin/Buttons/AddButton.jsx";
// import UpdateButton from "../../../../components/layout/Admin/Buttons/UpdateButton.jsx";
// import DeleteButton from "../../../../components/layout/Admin/Buttons/DeleteButton.jsx";
// import SuccessAlert from "../../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";

const HCMBuildingManager = () => {
  const location = useLocation();

  const [buildings, setBuildings] = useState([
    {
      id: "Bui1",
      name: "Phan Văn Trị",
      location: "Hồ Chí Minh",
      description: "Downtown",
      rating: 4,
      address: "200 Man Thiện Hồ Chí Minh",
      status: "Active",
      managerId: "MN01",
      images: [],
    },
    {
      id: "Bui2",
      name: "CNC D1",
      location: "Hồ Chí Minh",
      description: "workspaces",
      rating: 5,
      address: "D1 Khu CNC Hồ Chí Minh",
      status: "Active",
      managerId: "MN02",
      images: [],
    },
  ]);

  const [managers, setManagers] = useState([
    { id: "MN01", name: "Le Van A" },
    { id: "MN02", name: "Nguyen Van B" },
  ]); // DB manager giả

  const addBuildingFields = [
    { name: "name", label: "Building Name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "description", label: "Description", type: "text" },
    {
      name: "rating",
      label: "Rating",
      type: "select",
      options: [
        { label: "1", number: 1 },
        { label: "2", number: 2 },
        { label: "3", number: 3 },
        { label: "4", number: 4 },
        { label: "5", number: 5 },
      ],
      className: "select select-bordered w-full max-w-xs",
    },
    { name: "address", label: "Address", type: "text" },
    {
      name: "managerId",
      label: "Manager",
      type: "select",
      options: managers.map((manager) => ({
        label: manager.name,
        value: manager.id,
      })),
      className: "select select-bordered w-full",
    },
    { name: "images", label: "Building Images", type: "file", multiple: true },
  ];

  const updateBuildingFields = [
    { name: "id", label: "Building ID", type: "text" },
    { name: "name", label: "Building Name", type: "text" },
    { name: "location", label: "Location", type: "text" },
    { name: "description", label: "Description", type: "text" },
    {
      name: "rating",
      label: "Rating",
      type: "select",
      options: [
        { label: "1", number: 1 },
        { label: "2", number: 2 },
        { label: "3", number: 3 },
        { label: "4", number: 4 },
        { label: "5", number: 5 },
      ],
      className: "select select-bordered w-full max-w-xs",
    },
    { name: "address", label: "Address", type: "text" },
    {
      name: "status",
      label: "Status",
      type: "checkbox",
      checkboxLabels: { checked: "Active", unchecked: "Inactive" },
    },
    {
      name: "managerId",
      label: "Manager",
      type: "select",
      options: managers.map((manager) => ({
        label: manager.name,
        value: manager.id,
      })),
      className: "select select-bordered w-full",
    },
    { name: "images", label: "Building Images", type: "file", multiple: true },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentBuilding, setCurrentBuilding] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    rating: "",
    address: "",
    status: "",
    managerId: "",
    images: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, type, number, value, checked } = e.target;
    setCurrentBuilding((prev) => ({ ...prev, [name]: value }));
    const inputValue = type === "checkbox" ? checked : value;
  };

  const generateBuildingId = () => {
    const lastId =
      buildings.length > 0 ? buildings[buildings.length - 1].id : "Bui0";
    const newId = `Bui${parseInt(lastId.slice(3)) + 1}`;
    return newId;
  };

  const handleAddBuilding = (e) => {
    e.preventDefault();
    const newBuilding = {
      ...currentBuilding,
      id: generateBuildingId(),
      status: "Active",
    };
    setBuildings([...buildings, newBuilding]);
    setShowAddModal(false);
    setSuccessMessage("Building Added Successfully!");
    setCurrentBuilding({
      id: "",
      name: "",
      location: "",
      description: "",
      rating: 1,
      address: "",
      status: true,
      managerId: managers[0]?.id || "",
      images: [],
    });
  };

  const handleUpdateBuilding = (e) => {
    e.preventDefault();
    setBuildings((prevBuildings) => {
      const buildingIndex = prevBuildings.findIndex(
        (building) => building.id === currentBuilding.oldId
      );
      if (buildingIndex !== -1) {
        const updatedBuildings = [...prevBuildings];
        updatedBuildings[buildingIndex] = { ...currentBuilding };
        return updatedBuildings;
      }
      return prevBuildings;
    });
    setShowUpdateModal(false);
    setSuccessMessage("Building updated successfully!");
    setCurrentBuilding({
      id: "",
      name: "",
      location: "",
      description: "",
      rating: "",
      address: "",
      status: "",
      managerId: "",
      images: "",
    });
  };

  const handleDeleteBuilding = () => {
    setBuildings((prevBuildings) =>
      prevBuildings.filter((building) => building.id !== buildingToDelete.id)
    );
    setShowDeleteModal(false);
    setSuccessMessage("Building Deleted Successfully!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  const filteredBuildings = buildings.filter(
    (building) =>
      building.id.includes(searchTerm) ||
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.managerId.includes(searchTerm) ||
      building.status.toString().includes(searchTerm) ||
      building.rating.toString().includes(searchTerm) ||
      building.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-black mb-4">Building List</h1>

      <div className="grid grid-cols-2">
        {/* <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          placeholder="Search building"
        /> */}

        {/* Add Button */}
        {/* <div className="ml-2">
          <AddButton onClick={setShowAddModal} label="Add Building" />
        </div> */}
      </div>

      <div>
        {/* <SuccessAlert message={successMessage} onClose={closeSuccessMessage} /> */}
      </div>

      <div className="overflow-x-auto flex flex-1">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Images</th>
              <th>Location</th>
              <th>Description</th>
              <th>Rating</th>
              <th>Address</th>
              <th>Status</th>
              <th>Manager ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBuildings.length > 0 ? (
              filteredBuildings.map((building) => (
                <tr key={building.id}>
                  <td>{building.id}</td>
                  <td>{building.name}</td>
                  <td>{building.images}</td>
                  <td>{building.location}</td>
                  <td>{building.description}</td>
                  <td>{building.rating}</td>
                  <td>{building.address}</td>
                  <td>{building.status}</td>
                  <td>{building.managerId}</td>
                  <td className="flex space-x-2">
                    {/* <UpdateButton
                      onClick={() => {
                        setCurrentBuilding({ ...building, oldId: building.id });
                        setShowUpdateModal(true);
                      }}
                    />

                    {/* Delete Button */}
                    {/* <DeleteButton
                      onClick={() => {
                        setBuildingToDelete(building);
                        setShowDeleteModal(true);
                      }}
                    /> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No buildings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddBuilding}
        currentItem={currentBuilding}
        onInputChange={handleInputChange}
        fields={addBuildingFields}
      /> */}

      {/* <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateBuilding}
        currentItem={currentBuilding}
        onInputChange={handleInputChange}
        fields={updateBuildingFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteBuilding}
        itemToDelete={buildingToDelete}
        itemType="building"
      /> */}
    </div>
  );
};

export default HCMBuildingManager;
