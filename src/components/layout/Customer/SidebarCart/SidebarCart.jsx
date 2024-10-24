// SidebarCart Component
import React, { useCallback, useEffect, useRef, useState } from "react";
import { formatCurrency } from "../../../context/priceFormat";
import { FaPlus, FaMinus } from "react-icons/fa";
import amenitesImage from "../../../../assets/amenities.jpg";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  postApprovePaypalOrderAmenities,
  postCreatePaypalOrderAmenities,
} from "../../../../config/api";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SidebarCart = ({
  isCartVisible,
  toggleCartVisibility,
  selectedAmenities,
  totalPrice,
  handleIncrement,
  handleDecrement,
  bookingId,
}) => {
  const paypalClientKey = import.meta.env.VITE_PAYPAL_CLIENT_KEY;
  const navigate = useNavigate();
  const [preparedAmenities, setPreparedAmenities] = useState([]);
  const amenitiesRef = useRef(selectedAmenities);
  const totalPriceRef = useRef(totalPrice);
  const bookingIdRef = useRef(bookingId);

  useEffect(() => {
    amenitiesRef.current = selectedAmenities;
    totalPriceRef.current = totalPrice;
    bookingIdRef.current = bookingId;
  }, [selectedAmenities, totalPrice, bookingId]);

  // Log state updates for debugging
  useEffect(() => {
    console.log("selectedAmenities: ", selectedAmenities);
  }, [selectedAmenities]);

  useEffect(() => {
    console.log("Total Price: ", totalPrice);
  }, [totalPrice]);

  // Handle Create Order - Use latest state for preparedAmenities, totalPrice, bookingId
  const handleCreateOrder = useCallback(async () => {
    try {
      const preparedAmenities = Object.values(amenitiesRef.current)
        .filter((amenity) => amenity.amenity_id && amenity.quantity > 0)
        .map((amenity) => ({
          amenity_id: amenity.amenity_id,
          quantity: amenity.quantity,
        }));

      // Use the ref values here
      if (preparedAmenities.length === 0 || totalPriceRef.current <= 0) {
        toast.error("No amenities selected or total price is zero.");
        return;
      }

      const res = await postCreatePaypalOrderAmenities(
        preparedAmenities,
        bookingIdRef.current,
        totalPriceRef.current
      );

      if (res && res.data && res.err === 0) {
        return res.data.order_id;
      }
    } catch (error) {
      toast.error("Error while creating order: " + error.message);
    }
  }, [preparedAmenities]); // Only depend on preparedAmenities

  const handleApproveOrder = async (data) => {
    try {
      const res = await postApprovePaypalOrderAmenities(
        data.orderID,
        bookingId
      ); // Gọi API xác nhận thanh toán

      if (res && res.err === 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payment Successful!",
          text: "Thank you for your payment.",
          showConfirmButton: false,
          timer: 4000,
          allowOutsideClick: false,
        }).then(() => {
          navigate("/user/booking");
        });
      } else {
        Swal.fire({
          title: "Payment Failed!",
          text: res.message || "An error occurred during the payment process.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Fail to confirm payment.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform z-50 ${
        isCartVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <ToastContainer />
      <div className="p-6 h-full flex flex-col">
        {/* Close Button */}
        <button
          className="btn btn-ghost btn-circle absolute top-2 right-2"
          onClick={toggleCartVisibility}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">
          Amenities Cart ({Object.keys(selectedAmenities).length})
        </h2>

        {/* Items in Cart */}
        <div className="flex-grow overflow-y-auto">
          {Object.keys(selectedAmenities).length > 0 ? (
            Object.values(selectedAmenities).map((item) => (
              <div key={item.amenity_id} className="flex items-center mb-4">
                <img
                  src={item.image || "https://placehold.co"}
                  alt={item.amenity_name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{item.amenity_name}</h3>
                  {/* <p className="text-gray-500">{item.description}</p> */}
                  <div className="flex items-center mt-2">
                    {/* Quantity Controls */}
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDecrement(item)}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleIncrement(item)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-bold">
                    {formatCurrency(item.rent_price * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">There are no amenities in the cart.</p>
          )}
        </div>

        {/* Footer: Total & Checkout */}
        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold mb-4">
            <span>Total Price: </span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          {/* <button className="btn btn-block btn-neutral">Booking</button> */}
          {/* PayPal Payment */}
          <PayPalScriptProvider
            options={{
              "client-id": paypalClientKey,
            }}
          >
            <div className="border p-4 rounded-lg shadow mb-4">
              <PayPalButtons
                createOrder={handleCreateOrder} // Gọi hàm tạo order
                onApprove={handleApproveOrder} // Gọi hàm khi thanh toán thành công
              />
            </div>
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default SidebarCart;
