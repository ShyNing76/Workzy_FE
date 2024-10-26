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
            src={imageSrc}
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

  const hasImage = currentItem?.image;

  const openImagePreview = () => {
    const modal = document.getElementById("image_preview_modal");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <ImagePreviewModal imageSrc={currentItem?.image} />

      <div className="modal modal-open">
        <div className="modal-box max-w-4xl w-11/12 p-0 bg-base-100">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-base-300">
            <h2 className="text-2xl font-bold">Chi tiết</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle btn-sm hover:bg-base-200"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 space-y-6">
            {/* Image Preview Card */}
            {hasImage && (
              <div className="card bg-base-200 shadow-lg overflow-hidden">
                <figure
                  className="relative group cursor-pointer"
                  onClick={openImagePreview}
                >
                  <img
                    src={currentItem.image}
                    alt="Preview"
                    className="w-full h-[300px] object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="bg-white/90 p-3 rounded-full transform hover:scale-110 transition-transform">
                      <BsZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </figure>
              </div>
            )}

            {/* Details List with Custom Scrollbar */}
            <div className="overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
              <div className="divide-y divide-base-200">
                {currentItem &&
                  Object.entries(currentItem)
                    .filter(
                      ([key]) =>
                        key !== "Manager" &&
                        key !== "Staff" &&
                        key !== "google_token" &&
                        key !== "User" &&
                        key !== "image"
                    )
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="grid grid-cols-2 gap-4 py-3 px-4 hover:bg-base-200/50 rounded-lg transition-colors duration-200"
                      >
                        <span className="font-medium text-base-content">
                          {formatKey(key)}
                        </span>
                        <span className="text-base-content/80 text-right break-words">
                          {value === null
                            ? "N/A"
                            : typeof value === "object"
                            ? JSON.stringify(value, null, 2)
                            : Array.isArray(value)
                            ? value.join(", ")
                            : value}
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-action px-6 py-4 border-t border-base-300">
            <button className="btn btn-primary" onClick={onClose}>
              Đóng
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
  imageSrc: PropTypes.string,
};

export default DetailsModal;
