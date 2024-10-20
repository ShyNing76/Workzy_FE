import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllReview,
  deleteReview,
  getAllWorkSpaces,
  getAllBuildings,
} from "../../../config/apiManager";

const ManageReview = () => {
  const [buildings, setBuildings] = useState([]);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all buildings
  useEffect(() => {
    const fetchAllBuildings = async () => {
      try {
        const responseBuildings = await getAllBuildings();
        if (
          responseBuildings &&
          responseBuildings.data &&
          responseBuildings.err === 0
        ) {
          setBuildings(responseBuildings.data);
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      }
    };
    fetchAllBuildings();
  }, []);

  // Fetch all workspaces by building_id
  useEffect(() => {
    const fetchAllWorkSpaces = async (buildingId) => {
      try {
        const responseWorkSpaces = await getAllWorkSpaces(buildingId);
        if (responseWorkSpaces && responseWorkSpaces.data && responseWorkSpaces.err === 0) {
          setWorkSpaces((prevWorkSpaces) => [
            ...prevWorkSpaces,
            { buildingId, workSpaces: responseWorkSpaces.data }, // Save workspace data by buildingId
            console.log("WorkSpaces:", responseWorkSpaces.data),
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
        const responseReviews = await getAllReview();
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

    fetchReviews(); // Fetch reviews when the component mounts
  }, []);

  // Delete review
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
        // Optionally refresh the review list here if needed
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
      {buildings.map((building) => (
        <div key={building.building_id} className="collapse bg-base-200 mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            {building.building_name}
          </div>

          <div className="collapse-content bg-base-200">
            {/* Workspaces inside the building */}
            {(workSpaces.find(ws => ws.buildingId === building.building_id)?.workSpaces || []).map((filteredWorkspace) => (
              <div key={filteredWorkspace.workspace_id} className="collapse mb-2">
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
                            <th className="w-1/12 text-left">Index</th>
                            <th className="w-4/12 text-left">Comment</th>
                            <th className="w-2/12 text-center">Rating</th>
                            <th className="w-3/12 text-left">Customer Name</th>
                            <th className="w-1/12 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews
                            .filter((review) => review.Booking.Workspace.workspace_name === filteredWorkspace.workspace_name)
                            .map((review, index) => (
                              <tr key={review.review_id} className="border-b hover:bg-gray-100">
                                <td className="text-center">{index + 1}</td>
                                <td className="whitespace-normal break-words">{review.review_content}</td>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageReview;
