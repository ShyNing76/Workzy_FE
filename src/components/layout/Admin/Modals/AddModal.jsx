import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const AddModal = ({ show, onClose, onSubmit, currentItem, onInputChange, fields }) => {
  const [errorMissing, setErrorMissing] = useState([]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target === document.querySelector('.modal')) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    setErrorMissing([]);  
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!show) return null;
  
  const handleOnClick = (e) => {
    e.preventDefault();
    let missing = [];
    fields.forEach((field) => {
      if (!currentItem[field.name]) {
        missing.push(field.label);
      }
    });

    if (missing.length > 0) {
        setErrorMissing(missing);
        return;
    }

    setErrorMissing(null);
    onSubmit(e);
  }

  const handleOnClose = (e) => {
    e.preventDefault();
    onClose();
  }

  const isFieldMissing = (fieldLabel) => {
    return errorMissing && errorMissing.includes(fieldLabel);
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box w-3/4 max-w-2xl">
        <h3 className="font-bold text-lg">Add New</h3>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-control">
              <label className="label">{field.label}</label>
              {/* Handle different input types */}
              {isFieldMissing(field.label) && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
              {field.type === 'text' && (
                  <input
                    type="text"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className="input input-bordered"
                    step="0.01"
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
                    className="file-input file-input-bordered w-full"
                  />
              )}
            </div>
          ))}

          <div className="modal-action">
            <button type="submit" className="btn btn-sm" onClick={handleOnClick}><FiPlus />Add</button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={handleOnClose}><RxCross2 />Cancel</button>
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
