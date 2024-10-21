import React from "react";
import PropTypes from "prop-types";

const formatKey = (key) => {
  return key
    .replace(/_/g, " ")          // Thay thế dấu gạch dưới bằng khoảng trắng
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Viết hoa ký tự đầu mỗi từ
};

const DetailsModal = ({ show, onClose, details }) => {
  
  const handleButtonClick = () => {
    console.log("Close button clicked");
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box w-3/4 max-w-xl">
        <div className="modal-header flex justify-between items-center border-b-2 p-4">
          <h2 className="text-2xl font-bold">Details</h2>
        </div>
        <div className="p-4 space-y-2">
          <ul className="list-disc list-inside">
            {Object.entries(details)
              .filter(([key]) => key !== "Manager"
                              && key !== "Staff" 
                              && key !== "image"
                              && key !== "google_token"
                              && key !== "User")
              .map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="font-medium">{formatKey(key)}:</span> {/* Sử dụng hàm formatKey */}
                  <span>{value === null ? "N/A" : 
                  typeof value === "object" ? JSON.stringify(value) :
                  Array.isArray(value) ? value.join(", ") : value}</span>
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
