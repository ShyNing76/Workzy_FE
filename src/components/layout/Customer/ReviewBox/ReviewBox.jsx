import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewBox = ({ review }) => {
  return (
    <div className="my-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Your Review</h3>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {/* Uncomment this section to show the date */}
                  {/* {new Date(review.createdAt).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })} */}
                </span>
              </div>
              {/* Review Content */}
              <p className="text-gray-700">{review.review_content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
