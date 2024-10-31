import React, { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth.context";
import { postAddToWishList } from "../../../../config/api";
import { CiBookmarkPlus } from "react-icons/ci";

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
      className="btn btn-ghost  text-red-500 hover:bg-red-50"
      aria-label="Add to wishlist"
    >
      <CiBookmarkPlus className="h-6 w-6" />
      Add to wishlist
    </button>
  );
};

export default WishlistButton;
