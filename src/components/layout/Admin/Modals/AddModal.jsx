import React from 'react';
import PropTypes from 'prop-types';

import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const AddModal = ({ show, onClose, onSubmit, currentItem, onInputChange, fields }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New</h3>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-control">
              <label className="label">{field.label}</label>

              {/* Handle different input types */}
              {field.type === 'text' && (
                <input
                  type="text"
                  name={field.name}
                  value={currentItem[field.name] || ""}
                  onChange={onInputChange}
                  className="input input-bordered"
                  required
                />
              )}

              {field.type === 'number' && (
                <input
                  type="number" // Render as number input
                  name={field.name}
                  value={currentItem[field.name] || 0} // Make sure there is a default value
                  onChange={onInputChange}
                  className="input input-bordered"
                  required
                />
              )}


              
              {field.type === 'datetime' && (
                <input
                  type="datetime-local"
                  name={field.name}
                  value={currentItem[field.name] || ""}
                  onChange={onInputChange}
                  className="input input-bordered"
                  required
                />
              )}

              {field.type === 'date' && (
                <input
                  type="date"
                  name={field.name}
                  value={currentItem[field.name] || ""}
                  onChange={onInputChange}
                  className="input input-bordered"
                  required
                />
              )}


              {field.type === 'select' && (
                <select
                  name={field.name}
                  value={currentItem[field.name] || ""}
                  onChange={onInputChange}
                  className={field.className || "select select-bordered w-full"}
                  required
                >
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && (
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={currentItem[field.name] || false}
                    onChange={onInputChange}
                    className={field.className || "checkbox"}
                  />
                  <span className="label-text">
                    {currentItem[field.name] ? field.checkboxLabels.checked : field.checkboxLabels.unchecked}
                  </span>
                </label>
              )}

              {field.type === 'file' && (
                <input
                  type="file"
                  name={field.name}
                  multiple={field.multiple || false}
                  onChange={onInputChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              )}
            </div>
          ))}

          <div className="modal-action">
            <button type="submit" className="btn btn-sm" onClick={onSubmit}><FiPlus />Add</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}><RxCross2 />Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddModal.propTypes = {
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
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
      ),
      checkboxLabels: PropTypes.shape({
        checked: PropTypes.string,
        unchecked: PropTypes.string,
      }),
      className: PropTypes.string,
      multiple: PropTypes.bool,
    })
  ).isRequired,
};

export default AddModal;
