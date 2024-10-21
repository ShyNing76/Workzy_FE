import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const AddModal = ({ show, onClose, onSubmit, currentItem, onInputChange, fields }) => {
  const [missingFields, setMissingFields] = useState([]);

  if (!show) return null;

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = fields
      .filter(field => field.required && !currentItem[field.name])
      .map(field => field.name);

    if (missing.length > 0) {
      setMissingFields(missing);
    } else {
      onSubmit();
      setMissingFields([]); // Reset missing fields if successfully submitted
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-3/4 max-w-2xl">
        <h3 className="font-bold text-lg">Add New</h3>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-control">
              <label className="label">
                {field.label}
                {missingFields.includes(field.name) && <span className="text-red-500 text-sm"> *required</span>}
                </label>

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

              {field.type === 'password' && (
                <input
                  type="password"
                  name={field.name}
                  value={currentItem[field.name] || ""}
                  onChange={onInputChange}
                  className="input input-bordered"
                  required={field.required}
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
            <button type="submit" className="btn btn-neutral btn-sm" onClick={onSubmit}><FiPlus />Add</button>
            <button type="button" className="btn btn-active btn-sm" onClick={onClose}><RxCross2 />Cancel</button>
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
      required: PropTypes.bool,
    })
  ).isRequired,
};

export default AddModal;
