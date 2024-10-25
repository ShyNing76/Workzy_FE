import React, { useEffect, useState } from "react";
import {
  deleteReview,
  getBuilding,
  getReview,
  getWorkspaceByBuildingId,
} from "../../../config/api.admin";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import Swal from "sweetalert2";
const ReviewsManagerPage = () => {
  const [buildings, setBuildings] = useState([]);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch all buildings

  useEffect(() => {
    const fetchAllBuildings = async () => {
      setIsLoading(true);
      try {
        const responseBuildings = await getBuilding();
        if (
          responseBuildings &&
          responseBuildings.data &&
          responseBuildings.err === 0
        ) {
          setBuildings(responseBuildings.data);
          console.log("Buildings:", responseBuildings.data);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllBuildings();
  }, []);

  // Fetch all workspaces by building_id
  useEffect(() => {
    const fetchAllWorkSpaces = async (buildingId) => {
      try {
        const responseWorkSpaces = await getWorkspaceByBuildingId(buildingId);
        if (
          responseWorkSpaces &&
          responseWorkSpaces.data &&
          responseWorkSpaces.err === 0
        ) {
          setWorkSpaces((prevWorkSpaces) => [
            ...prevWorkSpaces,
            { buildingId, workSpaces: responseWorkSpaces.data }, // Save workspace data by buildingId
          ]);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    buildings.forEach((building) => {
      fetchAllWorkSpaces(building.building_id); // Fetch workspaces for each building
    });
  }, [buildings]);

  // Fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const responseReviews = await getReview();
        if (
          responseReviews &&
          responseReviews.data &&
          responseReviews.err === 0
        ) {
          setReviews(responseReviews.data.rows);
          console.log("Reviews:", responseReviews.data.rows);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!isLoaded) {
      fetchReviews(); // Fetch reviews when the component mounts
      setIsLoaded(true);
    }
  }, [isLoaded]);

  // handle delete review
  const handleDeleteReview = async (reviewId) => {
    try {
      const responseDeleteReview = await deleteReview(reviewId);
      if (responseDeleteReview && responseDeleteReview.err === 0) {
        Swal.fire({
          title: "Delete review successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        // setIsLoaded(false);
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
        // Optionally refresh the review list here if needed
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage reviews</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        buildings.map((building) => (
          <div key={building.building_id} className="collapse bg-base-200 mb-4">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {building.building_name}
            </div>

            <div className="collapse-content bg-base-200">
              {/* Workspaces inside the building */}
              {(
                workSpaces.find((ws) => ws?.buildingId === building.building_id)
                  ?.workSpaces || []
              ).map((filteredWorkspace) => (
                <div
                  key={filteredWorkspace.workspace_id}
                  className="collapse mb-2"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-lg font-medium">
                    {filteredWorkspace.workspace_name}
                  </div>
                  <div className="collapse-content">
                    {/* Reviews table filtered by workspace */}
                    <div className="manage-review-container">
                      <div className="overflow-x-auto">
                        <table className="table w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="w-1/12 text-center p-3">Index</th>
                              <th className="w-3/12 text-left p-3">Comment</th>
                              <th className="w-1/12 text-center p-3">Rating</th>
                              <th className="w-3/12 text-left p-3">
                                Customer Name
                              </th>
                              <th>Review Date</th>
                              <th className="w-2/12 text-center p-3">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reviews
                              .filter(
                                (review) =>
                                  review.Booking.Workspace.workspace_name ===
                                  filteredWorkspace.workspace_name
                              )
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt) - new Date(a.createdAt)
                              )
                              .map((review, index) => (
                                <tr
                                  key={review.review_id}
                                  className="border-b hover:bg-gray-100"
                                >
                                  <td className="text-center p-3">
                                    {index + 1}
                                  </td>
                                  <td className="whitespace-normal break-words p-3">
                                    {review.review_content}
                                  </td>
                                  <td className="text-center p-3">
                                    {review.rating}
                                  </td>
                                  <td className="p-3">
                                    {review.Booking.Customer.User.name}
                                  </td>
                                  <td className="p-3">{review.createdAt}</td>
                                  <td className="text-center p-3">
                                    <button
                                      className="btn btn-error p-2"
                                      onClick={() =>
                                        handleDeleteReview(review.review_id)
                                      }
                                      disabled={isLoading}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            {reviews.length === 0 && (
                              <tr>
                                <td colSpan="6" className="text-center justify-center p-3">
                                  <div className="flex flex-col justify-center items-center">
                                    <LiaStarOfLifeSolid className="text-4xl" style={{color: "#808080"}}/>
                                    
                                    <h4 className="text-lg font-medium" style={{color: "#808080"}}>There is no review for this workspace</h4>
                                  </div>
                                </td>
                              </tr>
                            )}  
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsManagerPage;
