import React from "react";
import PropTypes from "prop-types";
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({ searchTerm, handleSearchChange, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={handleSearchChange}
        className="input input-bordered input-sm w-full max-w-md mb-4"
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
