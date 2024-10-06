import React from "react";
import { FiPlus } from "react-icons/fi";
import PropTypes from 'prop-types';

const AddButton = ({ onClick, label = "Add" }) => {
    return (
        <button className="btn btn-active btn-sm mb-4" onClick={onClick}>
            <FiPlus /> {label}
        </button>
    );
};

AddButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default AddButton;
