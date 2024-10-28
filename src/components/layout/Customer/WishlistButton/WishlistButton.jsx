import React, { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import { postAddToWishList } from "../../../../config/api";

const WishlistButton = ({ workspaceId, workspaceName }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleAddToWishlist = async () => {
    if (!auth.isAuthenticated) {
      Swal.fire({
        title: "Please Login",
        text: "You need to login to add items to your wishlist",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Add to Wishlist",
        text: `Would you like to add "${workspaceName}" to your wishlist?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "No, cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      if (result.isConfirmed) {
        // Call API to add to wishlist

        const res = await postAddToWishList(workspaceId);

        if (res && res.err === 0) {
          // Show success message
          Swal.fire({
            title: "Added!",
            text: "Workspace has been added to your wishlist.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: res.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    } catch (error) {
      let errorMessage = "Failed to add to wishlist";

      // Kiểm tra nếu workspace đã có trong wishlist
      if (error.response?.status === 409) {
        errorMessage = "This workspace is already in your wishlist";
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="btn btn-ghost btn-circle text-red-500 hover:bg-red-50"
      aria-label="Add to wishlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};

export default WishlistButton;
