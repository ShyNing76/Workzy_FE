import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Đảm bảo import useNavigate
import { getWishlist } from '../../../config/api.staff'; // Đảm bảo đường dẫn đúng

const Wishlist = () => {
  const [wishlists, setWishlists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await getWishlist();
        setWishlists(response.data);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchWishlistData();
  }, []);

  const uniqueWorkspaces = {};

  const handleViewClick = (workspaceId) => {
    const customers = wishlists
      .filter(item => item.Workspaces.workspace_id === workspaceId)
      .map(item => ({ name: item.Customers.User.name, id: item.Customers.customer_id, wishlist_id: item.wishlist_id }));
    
    navigate('view-wishlist', { state: { customers } });
  };

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
            className="card shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
            onClick={() => handleViewClick(workspaceId)}
          >
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt={wishlist.Workspaces.workspace_name}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{wishlist.Workspaces.workspace_name}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
