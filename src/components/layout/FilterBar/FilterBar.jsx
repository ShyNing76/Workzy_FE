import React from "react";

const FilterBar = () => {
  return (
    <>
      <div className="navbar bg-base-200 flex ">
        <div className="flex flex-1 px-2 mx-12 justify-between">
          <div className="flex items-center ">
            <select className="select select-bordered w-48 max-w-xs m-2">
              <option disabled selected>
                Office size
              </option>
              <option>Under 10 seats</option>
              <option>From 10 to 20 seats</option>
              <option>From 20 to 30 seats</option>
              <option>From 30 to 40 seats</option>
              <option>From 40 to 50 seats</option>
              <option>Over 50 seats</option>
            </select>

            <select className="select select-bordered w-48 max-w-xs m-2">
              <option disabled selected>
                Price
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>

            <select className="select select-bordered w-48 max-w-xs m-2">
              <option disabled selected>
                Workspace type
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>

            <select className="select select-bordered w-48 max-w-xs m-2">
              <option disabled selected>
                Amenities
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
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
    </>
  );
};

export default FilterBar;
