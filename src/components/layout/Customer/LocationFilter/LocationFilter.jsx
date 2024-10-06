import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LocationFilter = (props) => {
  const [location, setLocation] = useState(props.location || "");
  const [workspaceType, setWorkspaceType] = useState(props.workSpaceType || "");
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = {};

    if (location) {
      queryParams.location = location;
    }

    if (workspaceType) {
      queryParams.workspaceType = workspaceType;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/location?${queryString}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    navigate(("/location", { replace: true }));
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
            <option value="Single POD">Single POD</option>
            <option value="Double POD">Double POD</option>
            <option value="Quad POD">Quad POD</option>
            <option value="Working Room">Working Room</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Event Space">Event Space</option>
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
