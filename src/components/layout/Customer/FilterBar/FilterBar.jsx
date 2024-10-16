import React, { useEffect, useState } from "react";
import "./FilterBar.scss";
import { useLocation, useNavigate } from "react-router-dom";

const FilterBar = (props) => {
  const { buildingId } = props;

  const MIN_PRICE = 30000;
  const MAX_PRICE = 1000000;

  const [minPrice, setMinPrice] = useState(props.minPrice || MIN_PRICE); // Giá trị mặc định min
  const [maxPrice, setMaxPrice] = useState(props.maxPrice || MAX_PRICE); // Giá trị mặc định max
  const [officeSize, setOfficeSize] = useState(props.officeSize || "");
  const [workspaceType, setWorkspaceType] = useState(props.workSpaceType || "");
  const currentLocation = useLocation();

  // Navigate
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lưu vị trí hiện tại của cuộn (scroll position)
    const currentScrollPosition = window.scrollY;

    const queryParams = {};

    if (officeSize) {
      queryParams.officeSize = officeSize;
    }

    if (workspaceType) {
      queryParams.workspaceType = workspaceType;
    }

    if (minPrice && maxPrice) {
      queryParams.minPrice = minPrice;
      queryParams.maxPrice = maxPrice;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/location/${buildingId}?${queryString}`);

    // Đặt lại vị trí cuộn sau khi điều hướng
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  };

  const handleReset = (e) => {
    e.preventDefault();
    // Lưu vị trí hiện tại của cuộn (scroll position)
    const currentScrollPosition = window.scrollY;

    navigate((`/location/${buildingId}`, { replace: true }));

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
      setMinPrice(MIN_PRICE);
      setMaxPrice(MAX_PRICE);
      setOfficeSize("");
      setWorkspaceType("");
    }
  }, [currentLocation]);

  return (
    <>
      <div className="navbar bg-base-200 flex ">
        <div className="flex flex-1 px-2 mx-12 justify-between">
          <div className="flex items-center ">
            <select
              className="select select-bordered w-56 max-w-xs m-2"
              value={officeSize}
              onChange={(e) => setOfficeSize(e.target.value)}
            >
              <option disabled value="">
                Office size
              </option>
              <option value="1">Under 10 seats</option>
              <option value="2">From 10 to 20 seats</option>
              <option value="3">From 20 to 30 seats</option>
              <option value="4">From 30 to 40 seats</option>
              <option value="5">From 40 to 50 seats</option>
              <option value="6">Over 50 seats</option>
            </select>

            <div className="dropdown m-2 ">
              <label
                tabIndex={0}
                className="select select-bordered w-68 max-w-xs cursor-pointer items-center"
              >
                Price: {minPrice.toLocaleString()} VND -{" "}
                {maxPrice.toLocaleString()} VND
              </label>

              {/* Dropdown Content */}
              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 p-4 shadow-lg rounded-box w-60 z-30"
              >
                <div className="flex flex-col">
                  <label>Min Price: {minPrice.toLocaleString()} VND</label>
                  <input
                    type="range"
                    className="range range-warning"
                    min={MIN_PRICE}
                    max={maxPrice - 1000} // Không cho min vượt quá max
                    value={minPrice}
                    step={1000} //Bước giá
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  />
                  <label>Max Price: {maxPrice.toLocaleString()} VND</label>
                  <input
                    type="range"
                    className="range range-warning"
                    min={minPrice + 1000} // Không cho max nhỏ hơn min
                    max={MAX_PRICE}
                    value={maxPrice}
                    step={1000} //Bước giá
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <select
              className="select select-bordered w-56 max-w-xs m-2"
              value={workspaceType}
              onChange={(e) => setWorkspaceType(e.target.value)}
            >
              <option disabled value="">
                Workspace type
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
    </>
  );
};

export default FilterBar;
