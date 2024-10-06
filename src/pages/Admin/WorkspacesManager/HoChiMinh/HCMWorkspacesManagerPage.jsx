import { useLocation } from "react-router-dom";
import React, { useState } from "react";

import { CiFilter } from "react-icons/ci";

import SearchBar from "../../../../components/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../../components/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../../components/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../../components/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../../components/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../../components/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../../components/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../../components/Admin/SuccessAlert/SuccessAlert.jsx";
import BuildingFilter from "../../../../components/Admin/Filters/BuildingFilter.jsx";

const HCMWorkspacesManager = () => {
    const location = useLocation();

    const [workspaces, setWorkspaces] = useState([
        {
          id: 'WS01',
          type: 'type1',
          buildingId: 'Bui1',
          name: 'Sapphire',
          priceperhour: '12300',
          priceperday: '123000',
          pricepermonth: '1230000',
          capacity: '5',
          description: 'Phong thuong',
          status: 'Available',
          images: [],
        },
        {
            id: 'WS02',
            type: 'type2',
            buildingId: 'Bui2',
            name: 'Deluxe',
            priceperhour: '45600',
            priceperday: '456000',
            pricepermonth: '4560000',
            capacity: '15',
            description: 'Phong lon',
            status: 'Available',
            images: [],
        }
      ]);
    
      const [buildings, setBuildings] = useState([
        { id: 'Bui1', name: 'Phan Văn Trị' },
        { id: 'Bui2', name: 'Khu CNC Hồ Chí Minh' },
      ]); // DB manager giả

      const addWorkspaceFields = [
        { name: 'type', label: 'Workspace Type', type: 'text' },
        { name: 'name', label: 'Workspace Name', type: 'text' },
        {
            name: 'buildingId',
            label: 'Building',
            type: 'select',
            options: buildings.map((buildings) => ({
              label: buildings.name,
              value: buildings.id,
            })),
            className: 'select select-bordered w-full'
        },
        { name: 'priceperhour', label: 'Price/hour', type: 'number' },
        { name: 'priceperday', label: 'Price/day', type: 'number' },
        { name: 'pricepermonth', label: 'Price/month', type: 'number' },
        { name: 'capacity', label: 'Capacity', type: 'number'},
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'images', label: 'Workspace Images', type: 'file', multiple: true },
      ]

      const updateWorkspaceFields = [
        { name: 'id', label: 'Workspace ID', type: 'text' },
        { name: 'type', label: 'Workspace Type', type: 'text' },
        { name: 'name', label: 'Workspace Name', type: 'text' },
        {
            name: 'buildingId',
            label: 'Building',
            type: 'select',
            options: buildings.map((buildings) => ({
              label: buildings.name,
              value: buildings.id,
            })),
            className: 'select select-bordered w-full'
        },
        { name: 'priceperhour', label: 'Price/hour', type: 'number' },
        { name: 'priceperday', label: 'Price/day', type: 'number' },
        { name: 'pricepermonth', label: 'Price/month', type: 'number' },
        { name: 'capacity', label: 'Capacity', type: 'number'},
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'status', label: 'Status', type: 'checkbox', checkboxLabels: { checked: 'Available', unchecked: 'Unavailable' }},
        { name: 'images', label: 'Workspace Images', type: 'file', multiple: true },
      ]
    
      const [searchTerm, setSearchTerm] = useState("");
      const [currentWorkspace, setCurrentWorkspace] = useState(
        {id: "", type: "", name: "", buildingId: "", priceperday: "", priceperhour: "", pricepermonth: "", capacity: "", description: "", status: "", images: []});
      const [showAddModal, setShowAddModal] = useState(false);
      const [showUpdateModal, setShowUpdateModal] = useState(false);
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [workspaceToDelete, setWorkspaceToDelete] = useState(null);
      const [successMessage, setSuccessMessage] = useState('');
      const [buildingFilter, setBuildingFilter] = useState('');
    
      const handleInputChange = (e) => {
        const { name, type, number, value, checked } = e.target;
        setCurrentWorkspace((prev) => ({ ...prev, [name]: value }));
        const inputValue = type === 'checkbox' ? checked : value;
      };

      const generateWorkspaceId = () => {
        const lastId = workspaces.length > 0 ? workspaces[workspaces.length - 1].id : 'WS';
        const newId = `WS${parseInt(lastId.slice(2)) + 1}`
        return newId
      }
      
      const handleAddWorkspace = (e) => {
        e.preventDefault();
        const newWorkspace = { ...currentWorkspace, id: generateWorkspaceId(), status: "Available"};
        setWorkspaces([...workspaces, newWorkspace]);
        setShowAddModal(false);
        setSuccessMessage("Workspace Added Successfully!");
        setCurrentWorkspace({
          id: '',
          type: '',
          name: '',
          buildingId: buildings[0]?.id || '',
          priceperday: 0,
          priceperhour: 0,
          pricepermonth: 0,
          capacity: '',
          description: '',
          status: true,
          images: [],
        });

      };
    
      const handleUpdateWorkspace = (e) => {
        e.preventDefault();
        setWorkspaces((prevWorkspaces) => {
          const workspaceIndex = prevWorkspaces.findIndex((workspace) => workspace.id === currentWorkspace.oldId);
          if (workspaceIndex !== -1) {
              const updatedWorkspaces = [...prevWorkspaces];
              updatedWorkspaces[workspaceIndex] = { ...currentWorkspace };
              return updatedWorkspaces;
          }
          return prevWorkspaces;
        });
        setShowUpdateModal(false);
        setSuccessMessage('Workspace updated successfully!');
        setCurrentWorkspace({id: '', type: '', name: '', buildingId: '', priceperday: '', priceperhour: '', pricepermonth: '', capacity: '', description: '', status: '', images: ''});
      };
    
      const handleDeleteWorkspace = () => {
        setWorkspaces((prevWorkspaces) => 
          prevWorkspaces.filter((workspace) => workspace.id !== workspaceToDelete.id)
      );
        setShowDeleteModal(false);
        setSuccessMessage('Workspace Deleted Successfully!');
      };

      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
      };

      const closeSuccessMessage = () => {
        setSuccessMessage("");
      };

      const handleBuildingFilterChange = (e) => {
        setBuildingFilter(e.target.value);
      };

      const filteredWorkspaces = workspaces.filter((workspace) =>{
        const matchesSearchTerm = 
          workspace.id.includes(searchTerm) ||
          workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workspace.priceperday.toString().includes(searchTerm) ||
          workspace.priceperhour.toString().includes(searchTerm) ||
          workspace.buildingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workspace.pricepermonth.toString().includes(searchTerm) ||
          workspace.capacity.toString().includes(searchTerm) ||
          workspace.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workspace.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          workspace.images.some((image) => image.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesBuildingFilter = !buildingFilter || workspace.buildingId === buildingFilter;
        return matchesSearchTerm && matchesBuildingFilter;
        }
      );

      return(
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-black mb-4">Ho Chi Minh Workspace List</h1>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <SearchBar
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  placeholder="Search workspace"
                />
              </div>


              
              <div className="flex justify-end items-center">
                <AddButton onClick={() => setShowAddModal(true)} label="Add workspace" />
              </div>
            </div>
      
            <div className="overflow-x-auto flex flex-1 mb-2">
              
              <div className="mt-1 flex"><CiFilter className="mr-2 size-6"/><p>Filter by Building:</p></div>
              <BuildingFilter 
                buildings={buildings}
                selectedBuilding={buildingFilter}
                onChange={handleBuildingFilterChange}
              />
            </div>

            <div>
                <SuccessAlert
                    message={successMessage}
                    onClose={closeSuccessMessage}
                />
            </div>

            <div className="overflow-x-auto flex flex-1">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Name</th>
              <th>Building ID</th>
              <th>Price/Day</th>
              <th>Price/Hour</th>
              <th>Price/Month</th>
              <th>Capacity</th>
              <th>Images</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkspaces.length > 0 ? (
              filteredWorkspaces.map((workspace) => (
              <tr key={workspace.id}>
                <td>{workspace.id}</td>
                <td>{workspace.type}</td>
                <td>{workspace.name}</td>
                <td>{workspace.buildingId}</td>
                <td>{workspace.priceperhour}</td>
                <td>{workspace.priceperday}</td>
                <td>{workspace.pricepermonth}</td>
                <td>{workspace.capacity}</td>
                <td>{workspace.images}</td>
                <td>{workspace.description}</td>
                <td>{workspace.status}</td>
                <td className="flex space-x-2" >
                    <UpdateButton
                        onClick={() => {
                            setCurrentWorkspace({...workspace, oldId: workspace.id});
                            setShowUpdateModal(true);
                        }}
                      />

                      {/* Delete Button */}
                      <DeleteButton
                        onClick={() => {
                            setWorkspaceToDelete(workspace);
                            setShowDeleteModal(true);
                        }}
                      />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No workspaces found.</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>

        <AddModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}  
          onSubmit={handleAddWorkspace}
          currentItem={currentWorkspace}
          onInputChange={handleInputChange}
          fields={addWorkspaceFields}
        />

        <UpdateModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdateWorkspace}
          currentItem={currentWorkspace}
          onInputChange={handleInputChange}
          fields={updateWorkspaceFields}
        />

        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteWorkspace}
          itemToDelete={workspaceToDelete}
          itemType="workspace"
        />
    </div>
    )
}

export default HCMWorkspacesManager;