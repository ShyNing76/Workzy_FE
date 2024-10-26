import React from "react";

const BookingReviewModal = (props) => {
  const {
    bookingId,
    isOpenReviewModal,
    setIsOpenReviewModal,
    setRating,
    setComment,
    handleSubmitReview,
    comment,
  } = props;

  const handleRatingChange = (rate) => setRating(rate);
  const handleCommentChange = (e) => setComment(e.target.value);
  const handleCloseModal = () => {
    setRating(5);
    setComment("");
    setIsOpenReviewModal(false);
  };

  return (
    <div>
      {isOpenReviewModal && (
        <div
          className="modal modal-open"
          style={{ backgroundColor: "#0000001a" }}
        >
          <div className="modal-box relative">
            <form method="dialog" className="modal-backdrop">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => handleCloseModal()}
              >
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">Leave a Review</h3>
            <div className="py-4">
              {/* Rating */}
              <div className="flex justify-center">
                <div className="rating rating-lg">
                  {[...Array(5)].map((_, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-yellow-400"
                      defaultChecked={index + 1 === 5}
                      onClick={() => handleRatingChange(index + 1)}
                    />
                  ))}
                </div>
              </div>

              <textarea
                className="textarea textarea-bordered w-full mt-4"
                placeholder="Write your comment here..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <div className="modal-action">
                <button
                  className="btn btn-accent"
                  onClick={() => handleSubmitReview(bookingId)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingReviewModal;
