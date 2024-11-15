import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { FiMinus, FiPlus, FiSave, FiSearch, FiUpload } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const UpdateModal = ({
  show,
  onClose,
  onSubmit,
  currentItem,
  onInputChange,
  fields,
  amenities = [],
  selectedAmenitiesWithQuantity,
  setSelectedAmenitiesWithQuantity,
  errorMessage = {},
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [error, setError] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  // Filter amenities based on search term
  const filteredAmenities = amenities.filter((amenity) =>
    amenity.amenity_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Initialize amenities from currentItem when modal opens
  useEffect(() => {
    if (currentItem?.AmenitiesWorkspaces) {
      const existingAmenities = currentItem.AmenitiesWorkspaces.map((aw) => ({
        amenity_id: aw.amenity_id,
        quantity: aw.quantity,
      }));
      setSelectedAmenitiesWithQuantity(existingAmenities);
    }
  }, [currentItem, setSelectedAmenitiesWithQuantity]);

  useEffect(() => {
    if (currentItem?.images) {
      // Handle array of images (either URLs or Files)
      const previews = currentItem.images.map((img) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );
      setPreviewImages(previews);
      setImageFiles(currentItem.images.filter((img) => img instanceof File));
    } else if (currentItem?.Images) {
      const firebaseImages = currentItem.Images.map((img) => img.image);
      setPreviewImages(firebaseImages);
      setImageFiles([]);
    } else if (currentItem?.image) {
      // Handle single image (either URL or File)
      if (Array.isArray(currentItem.image)) {
        const previews = currentItem.image.map((img) =>
          typeof img === "string" ? img : URL.createObjectURL(img)
        );
        setPreviewImages(previews);
        setImageFiles(currentItem.image.filter((img) => img instanceof File));
      } else {
        const previewImage =
          typeof currentItem.image === "string"
            ? currentItem.image
            : URL.createObjectURL(currentItem.image);
        setPreviewImages([previewImage]);
        setImageFiles(
          currentItem.image instanceof File ? [currentItem.image] : []
        );
      }
    }
    setRemovedImages([]);
  }, [currentItem]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Create preview URLs for display
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));

    if (e.target.multiple) {
      // Update preview images
      const updatedPreviews = [...previewImages, ...newPreviewUrls];
      setPreviewImages(updatedPreviews);

      // Store actual files
      const updatedFiles = [...imageFiles, ...files];
      setImageFiles(updatedFiles);

      // Update parent component with new files
      onInputChange({
        target: {
          name: "images",
          type: "file",
          files: updatedFiles,
        },
      });
    } else {
      // Single file upload
      setPreviewImages([newPreviewUrls[0]]);
      setImageFiles([files[0]]);

      // Update parent component
      onInputChange({
        target: {
          name: "image",
          type: "file",
          value: files[0],
        },
      });
    }
  };

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

  // const handleSelectChange = (e, fieldName) => {
  //   const value = e.target.value;
  //   onInputChange({
  //     target: {
  //       name: fieldName,
  //       value: value,
  //     },
  //   });
  // };

  const handleSelectChange = (e, fieldName) => {
    const value = e.target.value;

    onInputChange({
      target: {
        name: fieldName,
        value: value,
      },
    });
  };

  const removeImage = (indexToRemove) => {
    const removedImage = previewImages[indexToRemove];
    const isFirebaseImage =
      typeof removedImage === "string" && removedImage.includes("firebase");
    const isBlobUrl =
      typeof removedImage === "string" && removedImage.startsWith("blob:");

    // Remove from preview images
    const newPreviews = previewImages.filter(
      (_, index) => index !== indexToRemove
    );
    setPreviewImages(newPreviews);

    if (isFirebaseImage) {
      // Handle Firebase image removal
      const newRemovedImages = [...removedImages, removedImage];
      setRemovedImages(newRemovedImages);

      onInputChange({
        target: {
          name: "remove_images",
          value: newRemovedImages,
        },
      });
    } else {
      // Handle new file removal
      const newFiles = imageFiles.filter((_, index) => index !== indexToRemove);
      setImageFiles(newFiles);

      onInputChange({
        target: {
          name: "images",
          type: "file",
          files: newFiles,
          value: newFiles,
        },
      });
    }

    // Cleanup blob URL if necessary
    if (isBlobUrl) {
      URL.revokeObjectURL(removedImage);
    }

    // Update the parent's images state
    const remainingImages = isFirebaseImage
      ? previewImages.filter(
          (img, idx) => idx !== indexToRemove && !removedImages.includes(img)
        )
      : newFiles;

    onInputChange({
      target: {
        name: "images",
        value: remainingImages,
      },
    });
  };

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        if (typeof url === "string" && url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  // Find amenity name by ID helper function
  const getAmenityName = (amenityId) => {
    const amenity = amenities.find((a) => a.amenity_id === amenityId);
    return amenity ? amenity.amenity_name : "";
  };

  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-3xl bg-base-100">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-bold">Update Information</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <RxCross2 size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{field.label}</span>
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className={`input input-bordered w-full ${
                      error[field.name] ? "border-error-500" : ""
                    }`}
                    required
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    name={field.name}
                    value={currentItem[field.name] || 0}
                    onChange={onInputChange}
                    className={`input input-bordered w-full ${
                      error[field.name] ? "border-error-500" : ""
                    }`}
                    step="0.01"
                    required
                  />
                )}

                {field.type === "select" && (
                  <select
                    name={field.name}
                    // Đối với building_id và workspace_type_id, ta lấy giá trị trực tiếp từ currentItem
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

                {field.type === "date" && (
                  <input
                    type="date"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                )}

                {field.type === "datetime" && (
                  <input
                    type="datetime-local"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                )}
                {field.type === "password" && (
                  <input
                    type="password"
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className={`input input-bordered w-full ${
                      error[field.name] ? "border-error-500" : ""
                    }`}
                    required
                  />
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
                          name="images"
                          onChange={handleImageChange}
                          className="hidden"
                          multiple={field.multiple}
                          accept="image/*"
                        />
                      </label>
                    </div>

                    {/* Image Preview Grid */}
                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {previewImages.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img}
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

                {field.type === "toggle" && (
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">{field.label}</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        name={field.name}
                        checked={currentItem[field.name] === "active"}
                        onChange={(e) =>
                          onInputChange({
                            target: {
                              name: field.name,
                              value: e.target.checked ? "active" : "inactive",
                            },
                          })
                        }
                      />
                    </label>
                  </div>
                )}

                {field.type === "checkbox" && (
                  <label className="cursor-pointer flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name={field.name}
                      checked={currentItem[field.name] === "active"}
                      onChange={(e) =>
                        onInputChange({
                          target: {
                            name: field.name,
                            value: e.target.checked ? "active" : "inactive",
                          },
                        })
                      }
                      className={field.className || "checkbox"}
                    />
                    <span className="label-text">
                      {currentItem[field.name] === "active"
                        ? field.checkboxLabels?.checked
                        : field.checkboxLabels?.unchecked}
                    </span>
                  </label>
                )}
                {errorMessage[field.name] && field.showError && (
                  <span className="text-red-500 text-sm">
                    {errorMessage[field.name]}
                  </span>
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
                    {selectedAmenitiesWithQuantity.map((item) => (
                      <div
                        key={item.amenity_id}
                        className="badge badge-lg gap-2 p-3 flex items-center"
                      >
                        <span className="mr-2">
                          {getAmenityName(item.amenity_id)}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.amenity_id, -1)}
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
                    ))}
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

          <div className="modal-action pt-4 border-t">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              <RxCross2 size={20} className="mr-2" />
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <FiSave size={20} className="mr-2" />
              Save Changes
            </button>
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
      multiple: PropTypes.bool,
    })
  ).isRequired,
};

export default UpdateModal;
