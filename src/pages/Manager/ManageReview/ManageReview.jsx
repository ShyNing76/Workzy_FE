import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllReview, deleteReview } from "../../../config/apiManager";

const ManageReview = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const responseReviews = await getAllReview();
        if (
          responseReviews &&
          responseReviews.data &&
          responseReviews.err === 0
        ) {
          setReviews(responseReviews.data.rows);
          console.log("Reviews:", responseReviews.data.rows);
          // use forEach to get customer name
          // forEach dùng để lặp qua từng phần tử trong mảng responseReviews.data.rows
          // sau đó lấy ra customer name
          responseReviews.data.rows.forEach((review) => {
            console.log("Customer:", review.Booking.Customer.User.name);
          });
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
      if (!isDeleted) {
        fetchReviews();
        setIsDeleted(true);
      }
    };
    
  }, [isDeleted]);

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    try {
      const responseDeleteReview = await deleteReview(reviewId);
      if (responseDeleteReview && responseDeleteReview.err === 0) {
        Swal.fire({
          title: "Delete review successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="manage-review-container">
      <h1
        className="text-2xl font-bold"
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        Manage Review
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/12 text-left">Index</th>
              <th className="w-4/12 text-left">Comment</th>
              <th className="w-2/12 text-center">Rating</th>
              <th className="w-3/12 text-left">Customer Name</th>
              <th className="w-1/12 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.review_id} className="border-b hover:bg-gray-100">
                <td className="text-center">{index + 1}</td>
                <td className="whitespace-normal break-words">
                  {review.review_content}
                </td>
                <td className="text-center">{review.rating}</td>
                <td>{review.Booking.Customer.User.name}</td>
                <td className="text-center">
                  <button
                    className="btn btn-error"
                    onClick={() => handleDeleteReview(review.review_id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReview;
