import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { FiMinus, FiPlus, FiSearch } from "react-icons/fi";
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
  amenities = [],
  selectedAmenitiesWithQuantity,
  setSelectedAmenitiesWithQuantity,
}) => {
  const [errorMissing, setErrorMissing] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter amenities based on search term
  const filteredAmenities = amenities.filter((amenity) =>
    amenity.amenity_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleAmenityChange = (amenityId) => {
    const isSelected = selectedAmenitiesWithQuantity.some(
      (item) => item.amenity_id === amenityId
    );

    if (!isSelected) {
      setSelectedAmenitiesWithQuantity([
        ...selectedAmenitiesWithQuantity,
        { amenity_id: amenityId, quantity: 1 },
      ]);
    } else {
      setSelectedAmenitiesWithQuantity(
        selectedAmenitiesWithQuantity.filter(
          (item) => item.amenity_id !== amenityId
        )
      );
    }
  };

  const updateQuantity = (amenityId, change) => {
    setSelectedAmenitiesWithQuantity((prev) =>
      prev.map((item) => {
        if (item.amenity_id === amenityId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeSelectedAmenity = (amenityId) => {
    setSelectedAmenitiesWithQuantity((prev) =>
      prev.filter((item) => item.amenity_id !== amenityId)
    );
  };

  if (!show) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    if (e.target.multiple) {
      setPreviewImages([...previewImages, ...previews]);
    } else {
      setPreviewImages(previews);
    }

    onInputChange({
      target: {
        name: e.target.name,
        value: e.target.multiple
          ? [...(currentItem.image || []), ...files]
          : files[0],
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

  const handleSelectChange = (e, fieldName) => {
    const value = e.target.value;

    onInputChange({
      target: {
        name: fieldName,
        value: value,
      },
    });
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
                    onChange={(e) => handleSelectChange(e, field.name)}
                    className="select select-bordered w-full"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
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

            {/* Amenities Section */}
            {amenities.length > 0 && (
              <div className="col-span-2 space-y-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Amenities</span>
                    <span className="label-text-alt text-gray-500">
                      {selectedAmenitiesWithQuantity.length} selected
                    </span>
                  </label>

                  {/* Search Input */}
                  <div className="relative mb-2">
                    <input
                      type="text"
                      className="input input-bordered w-full pr-10"
                      placeholder="Search amenities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      size={18}
                    />
                  </div>

                  {/* Selected Amenities with Quantity */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedAmenitiesWithQuantity.map((item) => {
                      const amenityDetails = amenities.find(
                        (a) => a.amenity_id === item.amenity_id
                      );
                      return (
                        <div
                          key={item.amenity_id}
                          className="badge badge-lg gap-2 p-3 flex items-center"
                        >
                          <span className="mr-2">
                            {amenityDetails?.amenity_name}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.amenity_id, -1)
                              }
                              className="btn btn-ghost btn-xs btn-circle"
                            >
                              <FiMinus size={12} />
                            </button>
                            <span className="min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.amenity_id, 1)}
                              className="btn btn-ghost btn-xs btn-circle"
                            >
                              <FiPlus size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                removeSelectedAmenity(item.amenity_id)
                              }
                              className="btn btn-ghost btn-xs btn-circle ml-1"
                            >
                              <RxCross2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Amenities List */}
                  <div className="bg-base-200 rounded-lg max-h-48 overflow-y-auto">
                    {filteredAmenities.length > 0 ? (
                      <div className="p-2 grid grid-cols-2 gap-2">
                        {filteredAmenities.map((amenity) => (
                          <label
                            key={amenity.amenity_id}
                            className="flex items-center gap-2 p-2 bg-base-100 rounded-lg hover:bg-base-300 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="checkbox checkbox-sm"
                              checked={selectedAmenitiesWithQuantity.some(
                                (item) => item.amenity_id === amenity.amenity_id
                              )}
                              onChange={() =>
                                handleAmenityChange(amenity.amenity_id)
                              }
                            />
                            <span className="flex-1 truncate">
                              {amenity.amenity_name}
                            </span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No amenities found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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
