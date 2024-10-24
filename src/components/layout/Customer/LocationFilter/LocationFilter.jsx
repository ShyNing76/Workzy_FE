import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllWorkspaceType } from "../../../../config/api";

const LocationFilter = (props) => {
  const [location, setLocation] = useState(props.location || "");
  const [workspaceType, setWorkspaceType] = useState(props.workSpaceType || "");
  const [workspaceTypeData, setWorkspaceTypeData] = useState([]);

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lưu vị trí hiện tại của cuộn (scroll position)
    const currentScrollPosition = window.scrollY;

    const queryParams = {};

    if (location) {
      queryParams.location = location;
    }

    if (workspaceType) {
      queryParams.workspaceType = workspaceType;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/location?${queryString}`);

    // Đặt lại vị trí cuộn sau khi điều hướng
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  };

  const handleReset = (e) => {
    e.preventDefault();
    // Lưu vị trí hiện tại của cuộn (scroll position)
    const currentScrollPosition = window.scrollY;

    navigate(("/location", { replace: true }));

    // Đặt lại vị trí cuộn sau khi điều hướng
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  };

  // Reset state khi người dùng điều hướng tới trang /location mà không có query string (không phải từ Submit)
  useEffect(() => {
    const hasQueryParams =
      new URLSearchParams(currentLocation.search).toString() !== "";

    // Nếu không có queryParams, nghĩa là không có thông tin từ `Submit`, thì reset form
    if (!hasQueryParams) {
      setLocation("");
      setWorkspaceType("");
    }
  }, [currentLocation]);

  useEffect(() => {
    const fetchWorkspaceType = async () => {
      const res = await getAllWorkspaceType();

      if (res && res.data && res.err === 0) {
        setWorkspaceTypeData(res.data.rows);
      }
    };

    fetchWorkspaceType();
  }, []);

  return (
    <div className="navbar bg-base-200 flex ">
      <div className="flex flex-1 px-2 mx-12 justify-between">
        <div className="flex items-center ">
          <select
            className="select select-bordered w-64 max-w-xs m-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option disabled value="">
              Select location
            </option>
            <option value="HCM">Ho Chi Minh</option>
            <option value="Hanoi">Ha Noi</option>
          </select>

          <select
            className="select select-bordered w-64 max-w-xs m-2"
            value={workspaceType}
            onChange={(e) => setWorkspaceType(e.target.value)}
          >
            <option disabled value="">
              Select workspace type
            </option>
            {workspaceTypeData &&
              workspaceTypeData
                .filter((workspace) => workspace.status === "active")
                .map((workspace) => (
                  <option
                    key={workspace.workspace_type_id}
                    value={workspace.workspace_type_name}
                  >
                    {workspace.workspace_type_name}
                  </option>
                ))}
          </select>
        </div>

        <div>
          <button
            className="btn btn-neutral w-24 btn-sm ml-8 font-bold"
            onClick={handleSubmit}
          >
            Find
          </button>
          <button
            className="btn btn-outline w-24 btn-sm mx-3 font-bold"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
