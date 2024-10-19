import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getReview } from "../../../config/api.admin.js";
import { getReviewById } from "../../../config/api.admin.js";
import { deleteReview } from "../../../config/api.admin.js";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import { set } from "date-fns";

const ReviewsManagerPage = () => {
  const location = useLocation();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newReview, setNewReview] = useState({
    booking_id: '',
    rating: '',
    review_content: '',
  })

  const [responseData, setResponseData] = useState(null);

  const fetchReview = async () => {
    try {
      const res = await getReview();
      console.log("API response:", res); // Inspect API response
      if (res && res.data && Array.isArray(res.data.rows)) {
        setReview(res.data.rows);
      } else {
        setReview([]); // Initialize as an empty array if data is not as expected
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  // const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteReview = async () => {
    if (!reviewToDelete) return;

    try {
      // Call the deleteReview API with the selected review ID
      const response = await deleteReview(reviewToDelete.review_id);
  
      if (response && response.success) {
        // If the deletion is successful, update the reviews list
        setReview((prevReviews) =>
          prevReviews.filter((r) => r.review_id !== reviewToDelete.review_id)
        );
  
        // Show a success message
        setSuccessMessage("Review deleted successfully.");
      } else {
        setError("Failed to delete the review.");
      }
    } catch (err) {
      setError("An error occurred while deleting the review.");
    } finally {
      // Close the delete modal
      setShowDeleteModal(false);
      // Clear the review to delete
      setReviewToDelete(null)
    };
  }

    // const handleSearchChange = (e) => setSearchTerm(e.target.value);

    // const closeSuccessMessage = () => setSuccessMessage("");

    // const filteredReviews = reviews.filter((review) => {
    //   return(
    //     review.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     review.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     review.reviewContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     review.rating.toString().includes(searchTerm)
    //   )
    // });
    


  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-black mb-4">Manage Reviews</h1>

      <div className="grid grid-cols-2">
          <SearchBar
            // searchTerm={searchTerm}
            // handleSearchChange={handleSearchChange}
            // placeholder="Search payments"
          />
  
          {/* Add Button */}
          <div className="ml-2">
            {/* <AddButton onClick={setShowAddModal} label="Add Payment info" /> */}
          </div>
      </div>
  
      <div>
        {/* <SuccessAlert message={successMessage} onClose={closeSuccessMessage} /> */}
      </div>

      <div className="overflow-x-auto flex flex-1">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Content</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(review) && review.map((review) => (
                <tr key={review.review_id}>
                  <td>{review.booking_id}</td>
                  <td>{review.review_content}</td>
                  <td>{review.rating}</td>
                  <td className="flex space-x-2">

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setReviewToDelete(review);
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteReview}
        itemToDelete={reviewToDelete}
        itemType="review"
      />

    </div>
  );
};

export default ReviewsManagerPage;
