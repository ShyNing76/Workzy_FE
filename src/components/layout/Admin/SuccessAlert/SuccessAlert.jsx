import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CiCircleCheck } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const SuccessColor = ({message, onClose, autoClose = 5000 }) => {
    useEffect(() => {
        if (message) {
          const timer = setTimeout(onClose, autoClose);
          return () => clearTimeout(timer);
        }
      }, [message, onClose, autoClose]);
    
    if (!message) return null;

    return (
        <div role="alert" className="alert alert-success mt-4">
            <CiCircleCheck className='text-2xl'/>
            <span className='font-semibold'>{message}</span>
            <button className="btn btn-sm btn-circle btn-ghost ml-2" onClick={onClose}><RxCross2/></button>
        </div>
    )
}

SuccessColor.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    autoClose: PropTypes.number
};

export default SuccessColor;