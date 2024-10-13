import React from "react";
import PropTypes from "prop-types";

const DetailsModal = ({ show, onClose, details }) => {
  
  const handleButtonClick = () => {
    console.log("Close button clicked");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box">
        <div className="modal-header flex justify-between items-center border-b-2 p-4">
          <h2 className="text-2xl font-bold">Details</h2>
        </div>
        <div className="p-4 space-y-2">
          <ul className="list-disc list-inside">
            {Object.entries(details)
              .filter(([key]) => key !== "workspace_type_id")
              .map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-medium">{key}:</span>
                  <span>{Array.isArray(value) ? value.join(", ") : value}</span>
                </li>
              ))}
          </ul>
        </div>
        <div className="modal-action p-4 flex justify-end">
          <button className="btn" onClick={handleButtonClick}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

DetailsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};

export default DetailsModal;
