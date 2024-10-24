export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = async (workspace) => {
    try {
      // Thêm logic call API để lưu vào database ở đây
      const newWishlist = [...wishlist, workspace];
      setWishlist(newWishlist);
      toast.success("Added to wishlist successfully");
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  const removeFromWishlist = async (workspaceId) => {
    try {
      // Thêm logic call API để xóa khỏi database ở đây
      const newWishlist = wishlist.filter(
        (item) => item.workspace_id !== workspaceId
      );
      setWishlist(newWishlist);
      toast.success("Removed from wishlist successfully");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };
};
