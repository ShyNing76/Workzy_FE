import React from "react";
import { GoTrash } from "react-icons/go";
import PropTypes from 'prop-types';

const DeleteButton = ({ onClick, label = "Delete" }) => {
    return (
        <button className="btn btn-error btn-sm" onClick={onClick}>
            <GoTrash /> {label}
        </button>
    );
};

DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default DeleteButton;
