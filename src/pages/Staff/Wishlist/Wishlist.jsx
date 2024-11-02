import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Đảm bảo import useNavigate
import { getWishlist, getWorkspaceById } from "../../../config/api.staff"; // Đảm bảo đường dẫn đúng

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const [workspaces, setWorkspaces] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        setLoading(true);
        const response = await getWishlist();
        setWishlists(response.data);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistData();
  }, []);

  const uniqueWorkspaces = {};

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setLoading(true);
      const newWorkspaces = {};
      await Promise.all(
        wishlists.map(async (wishlist) => {
          const workspaceId = wishlist.workspace_id;
          if (!newWorkspaces[workspaceId]) {
            try {
              const workspaceData = await getWorkspaceById(workspaceId);
              newWorkspaces[workspaceId] = workspaceData.data;
            } catch (error) {
              console.error("Error fetching workspace data:", error);
            }
          }
        })
      );
      setLoading(false);
      setWorkspaces(newWorkspaces);
    };

    if (wishlists.length) fetchWorkspaces();
  }, [wishlists]);

  const handleViewClick = (workspaceId) => {
    const customers = wishlists
      .filter((item) => item.Workspaces.workspace_id === workspaceId)
      .map((item) => ({
        name: item.Customers.User.name,
        id: item.Customers.customer_id,
        wishlist_id: item.wishlist_id,
      }));

    const imageUrl =
      workspaces[workspaceId]?.WorkspaceImages &&
      workspaces[workspaceId]?.WorkspaceImages[0]?.image;

    navigate("view-wishlist", {
      state: { customers: customers, imageUrl: imageUrl },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="wishlist-container grid grid-cols-3 gap-16 p-4 max-h-[80vh] overflow-y-auto">
      {wishlists.map((wishlist) => {
        const workspaceId = wishlist.Workspaces.workspace_id;

        if (uniqueWorkspaces[workspaceId]) {
          return null;
        }

        uniqueWorkspaces[workspaceId] = true;

        return (
          <div
            key={workspaceId}
            className="card shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleViewClick(workspaceId)}
          >
            <figure>
              <img
                src={
                  workspaces[wishlist.workspace_id]?.WorkspaceImages &&
                  workspaces[wishlist.workspace_id]?.WorkspaceImages[0]?.image
                }
                alt={wishlist.Workspaces.workspace_name}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {wishlist.Workspaces.workspace_name}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
