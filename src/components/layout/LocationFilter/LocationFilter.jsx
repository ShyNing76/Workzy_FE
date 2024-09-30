import React from "react";

const LocationFilter = () => {
  return (
    <div className="navbar bg-base-200 flex ">
      <div className="flex flex-1 px-2 mx-12 justify-between">
        <div className="flex items-center ">
          <select className="select select-bordered w-64 max-w-xs m-2">
            <option disabled selected>
              Location
            </option>
            <option>Ho Chi Minh</option>
            <option>Ha Noi</option>
          </select>

          <select className="select select-bordered w-64 max-w-xs m-2">
            <option disabled selected>
              Workspace Type
            </option>
            <option value="Single POD">Single POD</option>
            <option value="Double POD">Double POD</option>
            <option value="Double POD">Quad POD</option>
            <option value="Working Room">Working Room</option>
            <option value="Meeting Room">Meeting Room</option>
            <option value="Event Space">Event Space</option>
          </select>
        </div>

        <div>
          <button className="btn btn-neutral w-24 btn-sm ml-8 font-bold">
            Find
          </button>
          <button className="btn btn-outline w-24 btn-sm mx-3 font-bold">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationFilter;
