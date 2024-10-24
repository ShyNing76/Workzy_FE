import React from "react";

const WishlistButton = (props) => {
  const { workspaceId, userId, isInWishlist, onToggleWishlist } = props;

  return (
    <button
      onClick={() => onToggleWishlist(workspaceId)}
      className={`p-2 rounded-full transition-all duration-300 ${
        isInWishlist
          ? "bg-red-50 hover:bg-red-100"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-6 h-6 transition-colors ${
          isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"
        }`}
      />
    </button>
  );
};

export default WishlistButton;
