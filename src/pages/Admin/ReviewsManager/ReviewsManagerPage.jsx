import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  deleteReview,
  getBuilding,
  getReview,
  getWorkspaceByBuildingId,
} from "../../../config/api.admin";
import { LiaStarOfLifeSolid } from "react-icons/lia";
import { FaBuilding, FaChevronDown } from "react-icons/fa";
import { MdWorkspaces } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const ReviewsManagerPage = () => {
  const [buildings, setBuildings] = useState([]);
  const [workSpaces, setWorkSpaces] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
        }
      } catch (error) {
        console.error("Error fetching buildings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllBuildings();
  }, []);

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
            { buildingId, workSpaces: responseWorkSpaces.data },
          ]);
        }
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    buildings.forEach((building) => {
      fetchAllWorkSpaces(building.building_id);
    });
  }, [buildings]);

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
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (!isLoaded) {
      fetchReviews();
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const handleDeleteReview = async (reviewId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const responseDeleteReview = await deleteReview(reviewId);
        if (responseDeleteReview && responseDeleteReview.err === 0) {
          Swal.fire({
            title: "Delete review successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setReviews(reviews.filter((review) => review.review_id !== reviewId));
        }
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete review",
        icon: "error",
      });
    }
  };

  const renderStarRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <AiFillStar
        key={index}
        className={`inline ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <MdWorkspaces className="mr-2" />
        Manage Reviews
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        buildings.map((building) => (
          <div key={building.building_id} className="collapse bg-base-200 mb-4 rounded-lg shadow-md">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium flex items-center justify-between p-4">
              <div className="flex items-center">
                <FaBuilding className="mr-2" />
                {building.building_name}
              </div>
              <FaChevronDown className="transform peer-checked:rotate-180 transition-transform" />
            </div>

            <div className="collapse-content bg-white">
              {(
                workSpaces.find((ws) => ws?.buildingId === building.building_id)
                  ?.workSpaces || []
              ).map((filteredWorkspace) => (
                <div
                  key={filteredWorkspace.workspace_id}
                  className="collapse mb-2 border rounded-lg mt-2"
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-lg font-medium flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <MdWorkspaces className="mr-2" />
                      {filteredWorkspace.workspace_name}
                    </div>
                    <FaChevronDown className="transform peer-checked:rotate-180 transition-transform" />
                  </div>
                  <div className="collapse-content">
                    <div className="overflow-x-auto">
                      <table className="table w-full">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="w-1/12">No.</th>
                            <th className="w-3/12">Comment</th>
                            <th className="w-2/12">Rating</th>
                            <th className="w-2/12">Customer</th>
                            <th className="w-2/12">Date</th>
                            <th className="w-1/12">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews
                            .filter(
                              (review) =>
                                review.Booking.Workspace.workspace_name ===
                                filteredWorkspace.workspace_name
                            )
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((review, index) => (
                              <tr
                                key={review.review_id}
                                className="border-b hover:bg-gray-50"
                              >
                                <td className="text-center">{index + 1}</td>
                                <td className="whitespace-normal break-words">
                                  {review.review_content}
                                </td>
                                <td>
                                  <div className="flex items-center">
                                    {renderStarRating(review.rating)}
                                  </div>
                                </td>
                                <td>
                                  <div className="flex items-center">
                                    <FaUserCircle className="mr-2" />
                                    {review.Booking.Customer.User.name}
                                  </div>
                                </td>
                                <td>
                                  <div className="flex items-center">
                                    <BiTime className="mr-2" />
                                    {format(new Date(review.createdAt), 'dd MMM yyyy HH:mm')}
                                  </div>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-error btn-sm"
                                    onClick={() => handleDeleteReview(review.review_id)}
                                    disabled={isLoading}
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          {reviews.filter(
                            (review) =>
                              review.Booking.Workspace.workspace_name ===
                              filteredWorkspace.workspace_name
                          ).length === 0 && (
                            <tr>
                              <td colSpan="6" className="text-center p-8">
                                <div className="flex flex-col items-center gap-2">
                                  <LiaStarOfLifeSolid
                                    className="text-4xl text-gray-400"
                                  />
                                  <h4 className="text-lg font-medium text-gray-400">
                                    No reviews available for this workspace
                                  </h4>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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