import React, { useEffect, useState } from "react";
import {
  deleteFromWishList,
  getAllWishlistOfCustomer,
  getAllWorkspaceType,
} from "../../../config/api";
import { Link } from "react-router-dom";
import { getWorkspaceById } from "../../../config/api.admin";
import { formatCurrency } from "../../../components/context/priceFormat";
import Swal from "sweetalert2";
import { FaRegHeart } from "react-icons/fa";

const MyWishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [workspaceData, setWorkspaceData] = useState([]);
  const [workspaceType, setWorkspaceType] = useState([]);

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        setLoading(true);
        const res = await getAllWishlistOfCustomer();
        if (res && res.data && res.err === 0) {
          setWishlists(res.data);
        } else {
          setWishlists([]);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWorkspaceType = async () => {
      try {
        setLoading(true);
        const res = await getAllWorkspaceType();
        if (res && res.data && res.err === 0) {
          const formattedData = res.data.rows.reduce((acc, item) => {
            acc[item.workspace_type_id] = item.workspace_type_name;
            return acc;
          }, {});
          setWorkspaceType(formattedData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaceType();
    fetchWishlists();
  }, [refresh]);

  useEffect(() => {
    console.log(workspaceType);
  }, [workspaceType]);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        setLoading(true);
        const workspaceResults = await Promise.all(
          wishlists.map(async (wishlist) => {
            const res = await getWorkspaceById(wishlist.workspace_id);

            return {
              workspace: res.data,
            };
          })
        );

        setWorkspaceData(workspaceResults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (wishlists) {
      fetchWorkspace();
    }
  }, [wishlists]);

  const handleRemoveFromWishlist = async (workspaceId, workspaceName) => {
    try {
      const wishlistItem = wishlists.find(
        (wishlist) => wishlist.workspace_id === workspaceId
      );

      if (!wishlistItem) {
        throw new Error("Wishlist item not found");
      }

      const result = await Swal.fire({
        title: "Remove from Wishlist?",
        text: `Are you sure you want to remove "${workspaceName}" from your wishlist?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "No, keep it",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (result.isConfirmed) {
        const res = await deleteFromWishList(wishlistItem.wishlist_id);

        if (res && res.err === 0) {
          setRefresh(!refresh);

          // Show success message
          await Swal.fire({
            title: "Removed!",
            text: "Workspace has been removed from your wishlist.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          await Swal.fire({
            title: "Removed!",
            text: "Failed to remove from wishlist",
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to remove from wishlist",
        icon: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

      {wishlists.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <FaRegHeart className="mx-auto h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-1">
            Your wishlist is empty
          </h3>
          <p className="text-gray-500 mb-4">
            Save your favorite workspaces to book them later
          </p>
          <Link to="/location" className="btn btn-neutral">
            Browse Workspaces
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {workspaceData &&
            workspaceData.map((item) => (
              <div
                key={item.workspace.workspace_id}
                className="flex bg-base-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image Section */}
                <div className="w-1/4 min-w-[200px]">
                  <img
                    src={
                      item.workspace.WorkspaceImages.image ||
                      "https://placehold.co/300x200"
                    }
                    alt={item.workspace.workspace_name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold mb-2">
                        {item.workspace.workspace_name}
                        <span className="ml-2 inline-block ">
                          <div className="badge badge-success text-white">
                            Available
                          </div>
                        </span>
                      </h2>
                      <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm mt-4">
                        <div className=" text-gray-600">
                          Type:{" "}
                          <span className="font-medium">
                            {workspaceType[item.workspace.workspace_type_id]}
                          </span>
                        </div>
                        <div className=" text-gray-600">
                          Capacity:
                          <span className="font-medium">
                            {" "}
                            {item.workspace.capacity} seats
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per hour:</span>
                          <span className="font-medium text-amber-600">
                            {formatCurrency(item.workspace.price_per_hour)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      <button
                        className="btn btn-ghost btn-sm text-red-500"
                        onClick={() =>
                          handleRemoveFromWishlist(
                            item.workspace.workspace_id,
                            item.workspace.workspace_name
                          )
                        }
                      >
                        Remove
                      </button>
                      <Link
                        to={`/location/building/${item.workspace.workspace_id}`}
                        className="btn btn-neutral btn-sm w-24"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
