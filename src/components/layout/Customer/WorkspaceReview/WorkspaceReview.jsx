import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import userImage from "../../../../assets/user1.jpg";

const WorkspaceReview = ({ data }) => {
  const [sortBy, setSortBy] = useState("newest");
  const reviews = data?.data || { count: 0, rows: [] };

  useEffect(() => {
    console.log("Review: ", reviews);
  }, [reviews]);

  // Calculate average rating
  const averageRating =
    reviews.rows.length > 0
      ? (
          reviews.rows.reduce((acc, review) => acc + review.rating, 0) /
          reviews.rows.length
        ).toFixed(1)
      : 0;

  // Sort reviews based on selected option
  const sortedReviews = [...reviews.rows].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="py-12 px-8 mx-auto max-w-7xl">
      {/* Reviews Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Customer Reviews
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {averageRating}
              </span>
              <span className="text-sm text-gray-500">
                ({reviews.count} {reviews.count > 1 ? "reviews" : "review"})
              </span>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div
              key={review.review_id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={userImage}
                    alt={review?.Booking?.Customer?.User?.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {review?.Booking?.Customer?.User?.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="flex mr-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleString("vi-VN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false, // Để định dạng 24 giờ, nếu muốn định dạng 12 giờ, có thể đặt thành true
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <p className="mt-4 text-gray-600">{review.review_content}</p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 px-6 py-12">
            <p className="text-center text-gray-500">No reviews yet</p>
          </div>
        )}
      </div>

      {/* Pagination (if needed) */}
      {sortedReviews.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50">
            Previous
          </button>
          <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkspaceReview;
