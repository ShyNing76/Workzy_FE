import React, { useState } from "react";
import "./FilterBar.scss";

const FilterBar = () => {
  const [minPrice, setMinPrice] = useState(500); // Giá trị mặc định min
  const [maxPrice, setMaxPrice] = useState(3000); // Giá trị mặc định max

  const MIN_PRICE = 100;
  const MAX_PRICE = 5000;

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

            <div className="dropdown m-2">
              <label
                tabIndex={0}
                className="select select-bordered w-48 max-w-xs cursor-pointer items-center"
              >
                Price: ${minPrice} - ${maxPrice}
              </label>

              {/* Dropdown Content */}
              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 p-4 shadow-lg rounded-box w-60 z-30"
              >
                <div className="flex flex-col">
                  <label>Min Price: ${minPrice}</label>
                  <input
                    type="range"
                    className="range range-warning"
                    min={MIN_PRICE}
                    max={maxPrice - 100} // Không cho min vượt quá max
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  />
                  <label>Max Price: ${maxPrice}</label>
                  <input
                    type="range"
                    className="range range-warning"
                    min={minPrice + 100} // Không cho max nhỏ hơn min
                    max={MAX_PRICE}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <select className="select select-bordered w-48 max-w-xs m-2">
              <option disabled selected>
                Workspace type
              </option>
              <option value="Single POD">Single POD</option>
              <option value="Double POD">Double POD</option>
              <option value="Quad POD">Quad POD</option>
              <option value="Working Room">Working Room</option>
              <option value="Meeting Room">Meeting Room</option>
              <option value="Event Space">Event Space</option>
            </select>

            <select className="select select-bordered w-48 max-w-xs m-2">
              <option disabled selected>
                Amenities
              </option>
              <option>Wi-Fi</option>
              <option>Parking</option>
              <option>Air Conditioning</option>
              <option>Projector</option>
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
