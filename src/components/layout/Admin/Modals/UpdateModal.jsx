import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { FiSave, FiUpload } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

const UpdateModal = ({
  show,
  onClose,
  onSubmit,
  currentItem,
  onInputChange,
  fields,
}) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);

  useEffect(() => {
    if (currentItem?.images) {
      // Handle array of images (either URLs or Files)
      const previews = currentItem.images.map((img) =>
        typeof img === "string" ? img : URL.createObjectURL(img)
      );
      setPreviewImages(previews);
      setImageFiles(currentItem.images.filter((img) => img instanceof File));
    } else if (currentItem?.BuildingImages) {
      const firebaseImages = currentItem.BuildingImages.map((img) => img.image);
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
                    className="input input-bordered w-full"
                    required
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    name={field.name}
                    value={currentItem[field.name] || 0}
                    onChange={onInputChange}
                    className="input input-bordered w-full"
                    step="0.01"
                    required
                  />
                )}

                {field.type === "select" && (
                  <select
                    name={field.name}
                    value={currentItem[field.name] || ""}
                    onChange={onInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      Select {field.label}
                    </option>
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
              </div>
            ))}
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
