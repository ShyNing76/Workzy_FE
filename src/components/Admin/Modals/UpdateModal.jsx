import React from 'react';
import PropTypes from 'prop-types';

const UpdateModal = ({ show, onClose, onSubmit, currentItem, onInputChange, fields }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Item</h3>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-control">
              <label className="label">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={currentItem[field.name] || ""}
                onChange={onInputChange}
                className="input input-bordered"
                required
              />
            </div>
          ))}
          <div className="modal-action">
            <button type="submit" className="btn">Confirm</button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentItem: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UpdateModal;
