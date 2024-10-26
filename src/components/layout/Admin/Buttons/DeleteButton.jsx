import React from "react";
import { GoTrash } from "react-icons/go";
import PropTypes from "prop-types";

const DeleteButton = ({ onClick, label = "Block" }) => {
    return (
        <button
            className={`btn btn-sm w-20 ${
                label === "Block" ? "btn-error" : "btn-success"
            } `}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default DeleteButton;
