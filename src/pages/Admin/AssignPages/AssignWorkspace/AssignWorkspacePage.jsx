import React, { useEffect, useState } from "react";
import {
  getBuilding,
  getWorkspace,
  assignWorkspaceToBuilding,
  unassignWorkspaceFromBuilding,
} from "../../../../config/api.admin";
import {
  HiOutlineOfficeBuilding,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineRefresh,
} from "react-icons/hi";
import { BsBuilding, BsArrowLeftRight, BsCheckSquare } from "react-icons/bs";
import Swal from "sweetalert2";

const AssignWorkspacePage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState([]);
  const [assignState, setAssignState] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkspacesAndBuildings = async () => {
    setIsLoading(true);
    try {
      const [workspaceResponse, buildingResponse] = await Promise.all([
        getWorkspace(),
        getBuilding(),
      ]);
      if (workspaceResponse?.data && workspaceResponse.err === 0) {
        setWorkspaces(workspaceResponse.data);
      }
      if (buildingResponse?.data && buildingResponse.err === 0) {
        setBuildings(buildingResponse.data);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch data",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspacesAndBuildings();
  }, []);

  const handleBuildingChange = (e) => {
    setSelectedBuilding(e.target.value);
    setSelectedWorkspaces([]); // Reset selections when building changes
  };

  const handleWorkspaceSelect = (workspace_id) => {
    setSelectedWorkspaces((prev) =>
      prev.includes(workspace_id)
        ? prev.filter((id) => id !== workspace_id)
        : [...prev, workspace_id]
    );
  };

  const handleSubmit = async () => {
    if (!selectedBuilding) {
      Swal.fire({
        title: "Warning",
        text: "Please select a building",
        icon: "warning",
      });
      return;
    }
    if (selectedWorkspaces.length === 0) {
      Swal.fire({
        title: "Warning",
        text: "Please select at least one workspace",
        icon: "warning",
      });
      return;
    }

    try {
      const response = assignState
        ? await assignWorkspaceToBuilding(selectedBuilding, selectedWorkspaces)
        : await unassignWorkspaceFromBuilding(
            selectedBuilding,
            selectedWorkspaces
          );

      if (response?.err === 0) {
        Swal.fire({
          title: "Success",
          text: `${assignState ? "Assigned" : "Unassigned"} workspaces ${
            assignState ? "to" : "from"
          } building successfully`,
          icon: "success",
        });

        setWorkspaces((prevWorkspaces) =>
          prevWorkspaces.map((workspace) =>
            selectedWorkspaces.includes(workspace.workspace_id)
              ? {
                  ...workspace,
                  Building: assignState
                    ? { building_id: selectedBuilding }
                    : null,
                }
              : workspace
          )
        );
        setSelectedWorkspaces([]);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Failed to ${assignState ? "assign" : "unassign"} workspaces`,
        icon: "error",
      });
    }
  };

  const filteredWorkspaces = assignState
    ? workspaces.filter(
        (workspace) =>
          !workspace.Building || workspace.Building.building_id === null
      )
    : workspaces.filter(
        (workspace) => workspace.Building?.building_id === selectedBuilding
      );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-base-100 shadow-lg rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <BsBuilding className="text-2xl text-primary" />
          <h1 className="text-2xl font-bold">Workspace Assignment Manager</h1>
        </div>

        <div className="card bg-base-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <HiOutlineOfficeBuilding className="text-lg" />
                  Select Building
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                onChange={handleBuildingChange}
                value={selectedBuilding || ""}
              >
                <option value="">Choose a building...</option>
                {buildings.map((building) => (
                  <option
                    key={building.building_id}
                    value={building.building_id}
                  >
                    {building.building_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAssignState(true)}
                className={`btn ${
                  assignState ? "btn-primary" : "btn-ghost"
                } gap-2`}
              >
                <HiOutlineCheck className={assignState ? "text-white" : ""} />
                Assign
              </button>
              <button
                onClick={() => setAssignState(false)}
                className={`btn ${
                  !assignState ? "btn-secondary" : "btn-ghost"
                } gap-2`}
              >
                <HiOutlineX />
                Unassign
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-lg">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200">
                  <th className="w-16">
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={
                          filteredWorkspaces.length > 0 &&
                          selectedWorkspaces.length ===
                            filteredWorkspaces.length
                        }
                        onChange={() => {
                          if (
                            selectedWorkspaces.length ===
                            filteredWorkspaces.length
                          ) {
                            setSelectedWorkspaces([]);
                          } else {
                            setSelectedWorkspaces(
                              filteredWorkspaces.map((w) => w.workspace_id)
                            );
                          }
                        }}
                      />
                    </label>
                  </th>
                  <th>Workspace Name</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkspaces.map((workspace) => (
                  <tr key={workspace.workspace_id} className="hover">
                    <td>
                      <label>
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
                      </label>
                    </td>
                    <td className="font-medium">{workspace.workspace_name}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        
                        {workspace.WorkspaceType.workspace_type_name}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          workspace.Building ? "badge-success" : "badge-warning"
                        } gap-1`}
                      >
                        {workspace.Building ? (
                          <>
                            <BsCheckSquare />
                            Assigned
                          </>
                        ) : (
                          <>
                            <BsArrowLeftRight />
                            Unassigned
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="btn btn-primary gap-2"
            disabled={selectedWorkspaces.length === 0}
          >
            <BsCheckSquare />
            Submit Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignWorkspacePage;
