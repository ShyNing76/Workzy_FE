import React, { useEffect, useState } from "react";
import {
  getBuilding,
  getWorkspace,
  assignWorkspaceToBuilding,
  unassignWorkspaceFromBuilding,
} from "../../../../config/api.admin";
import Swal from "sweetalert2";
import Pagination from "../../../../components/layout/Shared/Pagination/Pagination";
const AssignWorkspacePage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);
  const [assignState, setAssignState] = useState(true);
  //fetch workspaces and buildings
  const fetchWorkspacesAndBuildings = async () => {
    try {
      const [workspaceResponse, buildingResponse] = await Promise.all([
        getWorkspace(),
        getBuilding(),
      ]);
      if (workspaceResponse?.data && workspaceResponse.err === 0) {
        setWorkspaces(workspaceResponse.data);
        console.log("workspaces:", workspaceResponse.data);
        
      }
      if (buildingResponse?.data && buildingResponse.err === 0) {
        setBuildings(buildingResponse.data);
        console.log("buildings:", buildingResponse.data);
      }
    } catch (error) {
      console.log("Error fetching workspaces and buildings:", error);
    }
  };

  useEffect(() => {
    fetchWorkspacesAndBuildings();
  }, []);

  // handle building change
  const handleBuildingChange = (e) => {
    setSelectedBuilding(e.target.value);
  };

  // handle selected workspaces
  // cập nhật trạng thái của workspace khi click vào checkbox
  const handleWorkspaceSelect = (workspace_id) => {
    // setSelectedWorkspaces cập nhật trạng thái của workspace khi click vào checkbox
    setSelectedWorkspaces((prevSelectedWorkspace) => {
      //prevSelectedWorkspace là mảng các workspace_id đã được chọn
      // nếu prevSelectedWorkspace đã có workspace_id
      if (prevSelectedWorkspace.includes(workspace_id)) {
        // workspace đã đc chọn
        return prevSelectedWorkspace.filter((id) => id !== workspace_id); // loại bỏ workspace_id đó ra khỏi mảng
      } else {
        // nếu workspace_id không có trong mảng
        return [...prevSelectedWorkspace, workspace_id]; // thêm workspace_id vào mảng
      }
    });
  };

  // handle assign/unassign workspaces to building by submit button
  const handleSubmit = async () => {
    console.log("Submit button clicked");
    console.log("Selected building:", selectedBuilding);
    console.log("Selected workspaces:", selectedWorkspaces);
    if (!selectedBuilding) {
      Swal.fire({
        title: "Warning",
        text: "Please select a building.",
        icon: "warning",
      });
      return; // Ngừng hàm nếu không có building được chọn
    }
    if (selectedWorkspaces.length === 0) {
      Swal.fire({
        title: "Warning",
        text: "Please select at least one workspace.",
        icon: "warning",
      });
      return; // Ngừng hàm nếu không có workspace được chọn
    }
    if (assignState) {
      try {
        const responseAssign = await assignWorkspaceToBuilding(
          selectedBuilding,
          selectedWorkspaces
        );
        console.log("responseAssign:", responseAssign);
        if (responseAssign?.err === 0) {
          Swal.fire({
            title: "Success",
            text: "Assign workspaces to building successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Assign workspaces to building failed",
          icon: "error",
        });
      }
    } else {
      try {
        const responseUnassign = await unassignWorkspaceFromBuilding(
          selectedBuilding,
          selectedWorkspaces
        );
        console.log("responseUnassign:", responseUnassign);
        if (responseUnassign?.err === 0) {
          Swal.fire({
            title: "Success",
            text: "Unassign workspaces from building successfully",
            icon: "success",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Unassign workspaces from building failed",
          icon: "error",
        });
      }
    }
    // reset selected workspaces after submit
    setSelectedWorkspaces([]);
  };

  // show workspacrs when change Assign/Unassign button
  const filteredWorkspaces = assignState
  ? workspaces.filter((workspace) => !workspace.Building || workspace.Building.building_id === null) // chỉ lấy những workspace không có building_id
  : workspaces.filter(
      (workspace) => workspace.Building && workspace.Building.building_id === selectedBuilding
    ); // chỉ lấy những workspace có building_id khớp với selectedBuilding
 // chỉ hiển thị các workspace có building_id là selectedBuilding

  return (
    <div>
      <h1>Assign workspaces to building</h1>
      <label htmlFor="building-select" className="label">
        <span className="label-text">Select Building:</span>
      </label>
      

      <div className="btn-group my-4">
      <select
        id="building-select"
        className="select select-bordered w-full max-w-xs"
        onChange={handleBuildingChange}
      >
        <option value="">Select a Building</option>
        {buildings.map((building) => (
          <option key={building.building_id} value={building.building_id}>
            {building.building_name}
          </option>
          ))}
        </select>

       <button
          onClick={() => setAssignState(true)}
          className={`btn ${assignState ? "btn-primary" : "btn-gray"} mt-4`} // Thay đổi màu nút
        >
          Assign
        </button>
        <button
          onClick={() => setAssignState(false)}
          className={`btn ${!assignState ? "btn-secondary" : "btn-gray"} mt-4`} // Thay đổi màu nút
        >
          Unassign
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Select</th>
              <th>Workspace Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkspaces.map((workspace) => (
              <tr key={workspace.workspace_id}>
                <td>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedWorkspaces.includes(
                      workspace.workspace_id
                    )}
                    onChange={() =>
                      handleWorkspaceSelect(workspace.workspace_id)
                    }
                  />
                </td>
                <td>{workspace.workspace_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleSubmit} className="btn btn-success mt-4">Submit</button>

    </div>
  );
};

export default AssignWorkspacePage;
