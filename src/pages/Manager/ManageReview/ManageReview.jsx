import React, { useState } from "react";
import Swal from "sweetalert2"

const ManageReview = () => {
  const [reviews, setReviews] = useState([
    {
      id: "R01",
      customerName: "Bo Xang Lua",
      star: 4,
      comment: "Good",
      date: "2024-01-01",
    },
    {
      id: "R02",
      customerName: "Banh mi bo kho",
      star: 5,
      comment: "Very good",
      date: "2024-01-02",
    },
    {
      id: "R03",
      customerName: "Hu tiu nam vang",
      star: 3,
      comment: "Service is good",
      date: "2024-01-03",
    },
    {
      id: "R04",
      customerName: "Pho bo tai lan",
      star: 3,
      comment: "Medium experience",
      date: "2024-01-02",
    },
    {
      id: "R05",
      customerName: "Com ga",
      star: 1,
      comment: "Bad",
      date: "2024-01-02",
    },
    {
      id: "R06",
      customerName: "Com tam Ngo Quyen",
      star: 2,
      comment: "quite bad",
      date: "2024-01-02",
    },
  ]);
  // Delete review
  const handleDeleteReview = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // filter out the review with the given id in reviews array
        const updatedReviews = reviews.filter((review) => review.id !== reviewId);
        setReviews(updatedReviews);
        Swal.fire({
          title: "Deleted!",
          text: "Review has been deleted successfully.",
          icon: "success",
        });
      }
    });
  };
  

  return (
    <div className="manage-review-container">
      <h1 className="text-2xl font-bold" style={{marginBottom: "20px", marginTop: "20px"}}>Manage Review</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-1/12">Review ID</th>
              <th className="w-2/12">Customer Name</th>
              <th className="w-1/12">Star</th>
              <th className="w-5/12">Comment</th>
              <th className="w-2/12">Date</th>
              <th className="w-1/12">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.customerName}</td>
                <td>{review.star}</td>
                <td className="whitespace-normal break-words">
                  {review.comment}
                </td>
                <td>{review.date}</td>
                <td>
                  <button className="btn btn-error" onClick={() => handleDeleteReview(review.id)}>
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
