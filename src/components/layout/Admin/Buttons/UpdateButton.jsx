import React from "react";
import { FiEdit3 } from "react-icons/fi";
import PropTypes from 'prop-types';

const UpdateButton = ({ onClick, label = "Update" }) => {
    return (
        <button className="btn btn-sm mr-2 btn-warning" onClick={onClick}>
            {label}
        </button>
    );
};

UpdateButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default UpdateButton;
