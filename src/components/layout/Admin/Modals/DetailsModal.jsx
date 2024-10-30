import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { BsZoomIn } from "react-icons/bs";

const formatKey = (key) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const ImagePreviewModal = ({ imageSrc }) => {
  if (!imageSrc) return null;
  return (
    <dialog id="image_preview_modal" className="modal">
      <div className="modal-box max-w-5xl w-11/12 p-0 bg-base-100 relative">
        <form method="dialog">
          <button className="btn btn-ghost btn-circle btn-sm absolute right-2 top-2 z-10">
            <IoClose className="w-5 h-5" />
          </button>
        </form>
        <figure className="w-full">
          <img
            src={typeof imageSrc === "string" ? imageSrc : imageSrc[0]}
            alt="Preview"
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </figure>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

const DetailsModal = ({ show, onClose, currentItem }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!show) return null;

  const hasImage = Array.isArray(currentItem?.BuildingImages)
    ? currentItem.BuildingImages.length > 0
    : false;

  const openImagePreview = (imageSrc) => {
    const modal = document.getElementById("image_preview_modal");
    if (modal) {
      document.getElementById("image_preview_modal").querySelector("img").src =
        imageSrc;
      modal.showModal();
    }
  };

  console.log(currentItem)

  return (
    <>
      <ImagePreviewModal
        imageSrc={
          hasImage ? currentItem.BuildingImages.map((img) => img.image) : currentItem.image ? currentItem.image : null
        }
      />

      <div className="modal modal-open">
        <div className="modal-box max-w-6xl w-11/12 p-0 bg-base-100">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-base-300">
            <h2 className="text-2xl font-bold">Details</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle btn-sm hover:bg-base-200"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {/* Split Layout Container */}
          <div className="flex flex-col md:flex-row h-[calc(100vh-300px)]">
            {/* Left Side - Details */}
            <div className="md:w-1/2 h-full p-6 flex flex-col items-center justify-center bg-base-200">
              {hasImage ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  {currentItem.BuildingImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer rounded-lg overflow-hidden bg-white shadow-lg"
                      onClick={() => openImagePreview(img.image)}
                    >
                      <img
                        src={img.image}
                        alt={`Preview ${index}`}
                        className="w-full h-[150px] object-cover transform transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="bg-white/90 p-3 rounded-full transform hover:scale-110 transition-transform">
                          <BsZoomIn className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : 
                   typeof currentItem.image== "string" ? (
                      <div
                        className="relative group cursor-pointer rounded-lg overflow-hidden bg-white shadow-lg"
                        onClick={() => openImagePreview(currentItem.image)}
                      >
                        <img
                          src={currentItem.image}
                          alt={`Preview`}
                          className="w-full h-[150px] object-cover transform transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="bg-white/90 p-3 rounded-full transform hover:scale-110 transition-transform">
                            <BsZoomIn className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    ): (<div className="text-base-content/50 text-center">
                  No image available
                </div>)
              }
            </div>

            {/* Right Side - Details */}
            <div className="md:w-1/2 p-6 border-r border-base-300 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
              <div className="divide-y divide-base-200">
                {Object.entries(currentItem)
                  .filter(
                    ([key]) =>
                      key !== "BuildingImages" &&
                      key !== "Manager" &&
                      key !== "Staff" &&
                      key !== "google_token" &&
                      key !== "User" &&
                      key !== "image" &&
                      key !== "manager_id"
                  )
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="py-3 px-4 hover:bg-base-200/50 rounded-lg transition-colors duration-200"
                    >
                      <div className="font-medium text-base-content mb-1">
                        {formatKey(key)}
                      </div>
                      <div className="text-base-content/80 break-words">
                        {value === null
                          ? "N/A"
                          : typeof value === "object"
                          ? JSON.stringify(value, null, 2)
                          : Array.isArray(value)
                          ? value.join(", ")
                          : value}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-action px-6 py-4 border-t border-base-300">
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

DetailsModal.propTypes = {
  currentItem: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ImagePreviewModal.propTypes = {
  imageSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default DetailsModal;
