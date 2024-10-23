import React, { useEffect } from "react";

import PropTypes from "prop-types";

const formatKey = (key) => {
    return key
        .replace(/_/g, " ") // Thay thế dấu gạch dưới bằng khoảng trắng
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Viết hoa ký tự đầu mỗi từ
};

const DetailsModal = ({ show, onClose, currentItem }) => {
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

        window.addEventListener("click", handleClickOutside);
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("click", handleClickOutside);
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    const handleButtonClick = () => {
        console.log("Close button clicked");
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal modal-open fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-box w-3/4 max-w-xl">
                <div className="modal-header flex justify-between items-center border-b-2 p-4">
                    <h2 className="text-2xl font-bold">Details</h2>
                </div>
                <div className="p-4 space-y-2">
                    <ul className="list-disc list-inside">
                        {currentItem &&
                            Object.entries(currentItem)
                                .filter(
                                    ([key]) =>
                                        key !== "Manager" &&
                                        key !== "Staff" &&
                                        key !== "google_token" &&
                                        key !== "User"
                                )
                                .sort((a, b) => {
                                    return a[0] === "image" ? 1 : -1;
                                })
                                .map(([key, value]) => (
                                    <>
                                        {key === "image" && value ? (
                                            <li
                                                key={key}
                                                className="flex flex-col items-start space-y-2"
                                            >
                                                <span className="font-bold">
                                                    {formatKey(key)}:
                                                </span>
                                                <img
                                                    src={value}
                                                    alt={formatKey(key)}
                                                    className="w-full h-auto"
                                                />
                                            </li>
                                        ) : (
                                            <li
                                                key={key}
                                                className="flex justify-between"
                                            >
                                                <span className="font-medium">
                                                    {formatKey(key)}:
                                                </span>
                                                <span>
                                                    {value === null
                                                        ? "N/A"
                                                        : typeof value ===
                                                          "object"
                                                        ? JSON.stringify(value)
                                                        : Array.isArray(value)
                                                        ? value.join(", ")
                                                        : value}
                                                </span>
                                            </li>
                                        )}
                                    </>
                                ))}
                    </ul>
                </div>
                <div className="modal-action p-4 flex justify-end">
                    <button className="btn" onClick={handleButtonClick}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

DetailsModal.propTypes = {
    currentItem: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    details: PropTypes.object.isRequired,
};

export default DetailsModal;
