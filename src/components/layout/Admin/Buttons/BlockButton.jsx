import React from "react";
import { CgBlock } from "react-icons/cg";
import { CgUnblock } from "react-icons/cg";
import PropTypes from 'prop-types';

const BlockButton = ({ onClick, status }) => {
    const isActive = status === "active";

    return (
        <button
            className={`btn btn-sm w-20 ${isActive ? 'btn-error' : 'btn-success'} text-white` }
            onClick={onClick}
        >
            {isActive ? 'Block' : 'Unblock'}
        </button>
    );
};

BlockButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired  // new prop is required
};

export default BlockButton;
