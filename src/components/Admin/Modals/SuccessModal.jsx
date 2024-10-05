import React from 'react';
import PropTypes from 'prop-types';
import { CiCircleCheck } from "react-icons/ci";


const SuccessModal = ({ show, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className='flex justify-center text-8xl'><CiCircleCheck /></div>
        <h3 className="font-bold text-lg text-center">{message}</h3>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

SuccessModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessModal;
