import React, { useState } from "react";
import { useLocation } from "react-router-dom";

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

  const [reviews, setReviews] = useState([
    {
      id: "RV01",
      bookingId: "BK01",
      reviewContent: "Không gian thoải mái",
      rating: "5",
    },
    {
      id: "RV02",
      bookingId: "BK02",
      reviewContent: "Nhiều tiện ích",
      rating: "5",
    },
    {
      id: "RV03",
      bookingId: "BK03",
      reviewContent: "Nhân viên tận tình",
      rating: "5",
    },
  ]);

  const [bookings, setBookings] = useState([
    { id: "BK01", customerName: "Le Van A" },
    { id: "BK02", customerName: "Luu Thuy B" },
    { id: "BK03", customerName: "Do Duy C" },
  ]);

  const addReviewFields = [
    { label: "Booking ID", name: "bookingId", type: "select", 
      options: bookings.map((booking) => ({
          label: booking.id + " - " + booking.customerName,
          value: booking.id,
      })),
      className: "select select-bordered w-full",
    },
    { label: "Review Content", name: "reviewContent", type: "text" },
    {
      name: "rating",
      label: "Rating",
      type: "select",
      options: [
        { label: "1", number: 1 },
        { label: "2", number: 2 },
        { label: "3", number: 3 },
        { label: "4", number: 4 },
        { label: "5", number: 5 },
      ],
      className: "select select-bordered w-full max-w-xs",
    },
  ];

  const updateReviewFields = [
    { label: "Review ID", name: "id", type: "text" },
    { label: "Booking ID", name: "bookingId", type: "select", 
      options: bookings.map((booking) => ({
          label: booking.id + " - " + booking.customerName,
          value: booking.id,
      })),
      className: "select select-bordered w-full",
    },
    { label: "Review Content", name: "reviewContent", type: "text" },
    {
      name: "rating",
      label: "Rating",
      type: "select",
      options: [
        { label: "1", number: 1 },
        { label: "2", number: 2 },
        { label: "3", number: 3 },
        { label: "4", number: 4 },
        { label: "5", number: 5 },
      ],
      className: "select select-bordered w-full max-w-xs",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentReview, setCurrentReview] = useState({
    id: "",
    bookingId: "",
    reviewContent: "",
    rating: "",
  })

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, number } = e.target;
    setCurrentReview((prev) => ({...prev, [name]: value}));
  };

  const generateReviewId = () => {
    const lastId = 
        reviews.length > 0 ? reviews[reviews.length - 1].id : "RV00";
    const newId = `RV${parseInt(lastId.slice(2)) + 1}`;
    return newId;
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const newReview = { 
      ...currentReview, 
      id: generateReviewId() 
    };
    setReviews([...reviews, newReview])
    setShowAddModal(false);
    setSuccessMessage("Review added successfully!");
    setCurrentReview({
      id: "",
      bookingId: "",
      reviewContent: "",
      rating: "",
    });
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();
    setReviews((prevReviews) => {
    const reviewIndex = prevReviews.findIndex(
      (review) => review.id === currentReview.oldId);

      if (reviewIndex !== -1) {
        const updatedReviews = [...prevReviews];
        updatedReviews[reviewIndex] = { ...currentReview};
        return updatedReviews;
      }
      return prevReviews;
    });
    setShowUpdateModal(false);
    setSuccessMessage("Review updated successfully!");
    setCurrentReview({
      id: "",
      bookingId: "",
      reviewContent: "",
      rating: "",
    });
  };

  const handleDeleteReview = () => {
    setReviews((prevReviews) => 
      prevReviews.filter(
        (review) => review.id !== reviewToDelete.id)
      )
      setShowDeleteModal(false);
      setSuccessMessage("Review deleted successfully!");
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const closeSuccessMessage = () => setSuccessMessage("");

    const filteredReviews = reviews.filter((review) => {
      return(
        review.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.rating.toString().includes(searchTerm)
      )
    });


  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-black mb-4">Manage Reviews</h1>

      <div className="grid grid-cols-2">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            placeholder="Search payments"
          />
  
          {/* Add Button */}
          <div className="ml-2">
            <AddButton onClick={setShowAddModal} label="Add Payment info" />
          </div>
      </div>
  
      <div>
        <SuccessAlert message={successMessage} onClose={closeSuccessMessage} />
      </div>

      <div className="overflow-x-auto flex flex-1">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Review ID</th>
              <th>Booking ID</th>
              <th>Content</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.bookingId}</td>
                  <td>{review.reviewContent}</td>
                  <td>{review.rating}</td>
                  <td className="flex space-x-2">
                    <UpdateButton
                      onClick={() => {
                        setCurrentReview({
                          ...review,
                          oldId: review.id,
                        });
                        setShowUpdateModal(true);
                      }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={() => {
                        setReviewToDelete(review);
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No review found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddReview}
        currentItem={currentReview}
        onInputChange={handleInputChange}
        fields={addReviewFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateReview}
        currentItem={currentReview}
        onInputChange={handleInputChange}
        fields={updateReviewFields}
      />

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
