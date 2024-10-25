import React from "react";
import PropTypes from "prop-types";
import { IoIosSearch } from "react-icons/io";

const SearchButton = ({ onClick, label }) => {
    return (
        <button className="btn btn-active btn-sm w-40" onClick={onClick}>
            <IoIosSearch />
            {label}
        </button>
    );
};

SearchButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default SearchButton;
