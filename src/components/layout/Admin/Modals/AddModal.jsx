import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FiSave, FiUpload } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const AddModal = ({
  show,
  onClose,
  onSubmit,
  currentItem,
  onInputChange,
  fields,
}) => {
  const [errorMissing, setErrorMissing] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target === document.querySelector(".modal")) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    setErrorMissing([]);
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!show) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => [...prevPreviews, ...previews]);

    onInputChange({
      target: {
        name: e.target.name,
        value: [...(currentItem.image || []), ...files],
      },
    });
  };

  const removeImage = (index) => {
    const newPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newPreviews);

    const newFiles = Array.from(currentItem.image || []).filter(
      (_, i) => i !== index
    );
    onInputChange({
      target: {
        name: "image",
        value: newFiles,
      },
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    let missing = [];

    fields.forEach((field) => {
      if (field.type === "file") {
        // Specifically handle file fields
        if (!currentItem[field.name] || currentItem[field.name].length === 0) {
          missing.push(field.label);
        }
      } else if (!currentItem[field.name]) {
        // Handle non-file fields
        missing.push(field.label);
      }
    });

    if (missing.length > 0) {
      setErrorMissing(missing);
      return;
    }
    setPreviewImages([]);
    setErrorMissing(null);
    onSubmit(e);
  };

  const handleOnClose = (e) => {
    e.preventDefault();
    setErrorMissing([]);
    setPreviewImages([]);
    onClose();
  };

  const isFieldMissing = (fieldLabel) => {
    return errorMissing && errorMissing.includes(fieldLabel);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-3/4 max-w-3xl">
        <h3 className="font-bold text-lg">Add New</h3>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="form-control">
                <label className="label">{field.label}</label>
                {isFieldMissing(field.label) && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}

                {/* Render inputs based on field type */}
                {field.type === "text" && (
                  <input
                    type="text"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className="input input-bordered"
                    required
                  />
                )}
                {field.type === "number" && (
                  <input
                    type="number"
                    name={field.name}
                    value={currentItem[field.name] || 0}
                    onChange={onInputChange}
                    className="input input-bordered"
                    required
                  />
                )}
                {field.type === "datetime" && (
                  <input
                    type="datetime-local"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className="input input-bordered"
                    required
                  />
                )}
                {field.type === "date" && (
                  <input
                    type="date"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className="input input-bordered"
                    required
                  />
                )}
                {field.type === "select" && (
                  <select
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className={
                      field.className || "select select-bordered w-full"
                    }
                    required
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                {field.type === "checkbox" && (
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={currentItem[field.name] || false}
                      onChange={onInputChange}
                      className={field.className || "checkbox"}
                    />
                    <span className="label-text">
                      {currentItem[field.name]
                        ? field.checkboxLabels.checked
                        : field.checkboxLabels.unchecked}
                    </span>
                  </label>
                )}
                {field.type === "file" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FiUpload size={24} className="mb-2" />
                          <p className="text-sm">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                        </div>
                        <input
                          type="file"
                          name={field.name}
                          onChange={handleImageChange}
                          className="hidden"
                          multiple={field.multiple}
                          accept="image/*"
                        />
                      </label>
                    </div>

                    {/* Image Preview Grid */}
                    {(previewImages.length > 0 ||
                      (currentItem.image && currentItem.image.length > 0)) && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {[
                          ...(previewImages || []),
                          // ...(Array.isArray(currentItem.image)
                          //   ? currentItem.image
                          //   : []),
                        ].map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={typeof img === "string" ? img : img}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 btn btn-error btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <RiDeleteBinLine size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Buttons below the fields */}
          <div className="modal-action mt-6 flex justify-end">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleOnClose}
            >
              <RxCross2 /> Cancel
            </button>
            <button
              type="submit"
              className="btn btn-sm mr-2"
              onClick={handleOnClick}
            >
              <FiPlus /> Add
            </button>
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
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
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
