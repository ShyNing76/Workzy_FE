import React, { useState } from "react";
import "./Filter.scss";
import { CiLocationOn } from "react-icons/ci";
import { BsPersonWorkspace } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [location, setLocation] = useState("");
  const [workspaceType, setWorkspaceType] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="filter-container">
      <h1>Working environment improves quality of life</h1>
      <div className="filter-container-child">
        <h2>Do it your way, we've got you covered.</h2>
        <p>
          From ready-to-use offices to shared office space, meeting rooms and
          technology, discover workspace solutions for every team.
        </p>
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <CiLocationOn className="location-icon" />
              <select
                className="select select-bordered w-full max-w-xs select-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option disabled value="">
                  Select location
                </option>
                <option value="HCM">Ho Chi Minh</option>
                <option value="Hanoi">Ha Noi</option>
              </select>
            </div>

            <div className="input-container">
              <BsPersonWorkspace className="workspace-icon" />
              <select
                className="select select-bordered w-full max-w-xs select-workspace"
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
            <button type="submit" className="btn">
              Find now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Filter;
