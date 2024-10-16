import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Icon for cart
import SidebarCart from "../../../components/layout/Customer/SidebarCart/SidebarCart";
import { formatCurrency } from "../../../components/context/priceFormat";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { getAllAmenities } from "../../../config/api";
import amenitesImage from "../../../assets/amenities.jpg";
import { toast, ToastContainer } from "react-toastify";

const BookingAmenities = () => {
  const [availableAmenities, setAvailableAmenities] = useState([]);

  const { bookingId } = useParams(); // Get bookingId from route
  const [selectedAmenities, setSelectedAmenities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle adding an amenity
  const handleAddAmenity = (amenity) => {
    const currentAmenity = selectedAmenities[amenity.amenity_id] || {
      ...amenity,
      quantity: 0,
    };
    currentAmenity.quantity += 1;

    setSelectedAmenities({
      ...selectedAmenities,
      [amenity.amenity_id]: currentAmenity,
    });

    // Cập nhật giá tổng ngay sau khi thêm tiện ích
    setTotalPrice((prevPrice) => prevPrice + Number(amenity.rent_price));
  };

  // Function to handle incrementing amenity quantity
  const handleIncrement = (amenity) => {
    handleAddAmenity(amenity);
  };

  // Function to handle decrementing amenity quantity
  const handleDecrement = (amenity) => {
    const currentAmenity = selectedAmenities[amenity.amenity_id];
    if (currentAmenity.quantity > 0) {
      currentAmenity.quantity -= 1;

      const updatedAmenities = {
        ...selectedAmenities,
        [amenity.amenity_id]: currentAmenity,
      };

      if (currentAmenity.quantity === 0) {
        delete updatedAmenities[amenity.amenity_id]; // Xóa nếu số lượng = 0
      }

      setSelectedAmenities(updatedAmenities);

      // Cập nhật giá tổng ngay sau khi giảm tiện ích
      setTotalPrice((prevPrice) => prevPrice - Number(amenity.rent_price));
    }
  };

  // Function to toggle cart visibility
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter amenities based on search query
  const filteredAmenities = availableAmenities.filter((amenity) =>
    amenity.amenity_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchAllAmenities = async () => {
      try {
        const res = await getAllAmenities();
        if (res && res.data && res.err === 0) {
          setAvailableAmenities(res.data.rows);
        } else {
          setAvailableAmenities([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAmenities();
  }, []);

  return (
    <div className="relative max-w-5xl container mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex justify-between">
        <div className="pb-6 flex items-center ">
          <Link to="/user/booking">
            <IoChevronBackCircleOutline className="text-2xl mr-3" />
          </Link>
          <h2 className="text-2xl font-bold ">
            Add Amenities for Booking{" "}
            <span className="text-amber-500">#{bookingId}</span>
          </h2>
        </div>

        {/* Cart Icon */}
        <button className="indicator" onClick={toggleCartVisibility}>
          <FaShoppingCart size={24} />
          {Object.keys(selectedAmenities).length > 0 && (
            <span className="indicator-item badge badge-error badge-sm">
              {Object.keys(selectedAmenities).length}
            </span>
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search amenities..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* List of available amenities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAmenities.length > 0 ? (
          filteredAmenities.map((amenity) => (
            <div
              key={amenity.amenity_id}
              className="card bg-base-100 shadow-md p-4 flex flex-col items-center"
            >
              <img
                className="rounded-lg w-36 h-32"
                src={amenitesImage}
                alt={amenity.amenity_name}
              />
              <h3 className="font-semibold text-lg mt-4">
                {amenity.amenity_name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Price: {formatCurrency(amenity.rent_price)}
              </p>

              {/* Show add to cart button if amenity is not yet added */}
              {selectedAmenities[amenity.amenity_id] ? (
                <div className="flex justify-between items-center mt-auto space-x-2">
                  <button
                    className="btn btn-outline btn-sm btn-neutral"
                    onClick={() => handleDecrement(amenity)}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg px-2">
                    {selectedAmenities[amenity.amenity_id].quantity}
                  </span>
                  <button
                    className="btn btn-outline btn-sm btn-neutral"
                    onClick={() => handleIncrement(amenity)}
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-neutral btn-sm mt-auto"
                  onClick={() => handleAddAmenity(amenity)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No amenities found</p>
        )}
      </div>

      {/* Overlay */}
      {isCartVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleCartVisibility} // Clicking on the overlay will close the cart
        ></div>
      )}

      {/* Sidebar Cart Summary */}
      <SidebarCart
        isCartVisible={isCartVisible}
        toggleCartVisibility={toggleCartVisibility}
        selectedAmenities={selectedAmenities}
        totalPrice={totalPrice}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        bookingId={bookingId}
      />
    </div>
  );
};

export default BookingAmenities;
