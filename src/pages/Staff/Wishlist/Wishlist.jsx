import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Đảm bảo import useNavigate
import { getWishlist } from '../../../config/api.staff'; // Đảm bảo đường dẫn đúng
import './Wishlist.scss'; // Nhập file SCSS

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
    // Lấy danh sách tên khách hàng theo workspaceId
    const customerNames = wishlists
      .filter(item => item.Workspaces.workspace_id === workspaceId)
      .map(item => item.Customers.User.name);

    // Chuyển hướng tới trang ViewWishlist và truyền danh sách tên khách hàng qua state
    navigate('view-wishlist', { state: { customerNames } }); // Chỉ cần đường dẫn tương đối
  };

  return (
    <div className="wishlist-container">
      {wishlists.map(wishlist => {
        const workspaceId = wishlist.Workspaces.workspace_id;

        if (uniqueWorkspaces[workspaceId]) {
          return null;
        }

        uniqueWorkspaces[workspaceId] = true;

        return (
          <div className="wishlist-card" key={workspaceId}>
            <figure className="image-frame">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt={wishlist.Workspaces.workspace_name}
                className="horizontal-image"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{wishlist.Workspaces.workspace_name}</h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewClick(workspaceId)}
                >
                  View
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
