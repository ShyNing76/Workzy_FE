import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const BuildingFilter = ({ buildings, selectedBuilding, onChange }) => {
  return (
    <select
      value={selectedBuilding}
      onChange={onChange}
      className="select select-bordered select-sm max-w-xs ml-3"
    >
      <option value="">All Buildings</option>
      {buildings.map((building) => (
        <option key={building.id} value={building.id}>
          {building.name}
        </option>
      ))}
    </select>
  );
};

BuildingFilter.propTypes = {
  buildings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedBuilding: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default BuildingFilter;
