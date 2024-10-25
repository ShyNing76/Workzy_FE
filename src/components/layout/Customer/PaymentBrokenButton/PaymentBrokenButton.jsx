import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import {
  postApprovePaypalOrderBrokenAmenities,
  postCreatePaypalOrderBrokenAmenities,
} from "../../../../config/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentBrokenButton = (booking) => {
  const paypalClientKey = import.meta.env.VITE_PAYPAL_CLIENT_KEY;
  const navigate = useNavigate();

  const handleCreateOrder = async () => {
    try {
      const res = await postCreatePaypalOrderBrokenAmenities(
        booking.booking.booking_id
      ); // Gọi API tạo order
      if (res && res.data && res.err === 0) {
        return res.data.order_id;
      }
    } catch (error) {
      toast.error("Lỗi khi tạo order:", error);
    }
  };

  const handleApproveOrder = async (data) => {
    try {
      const res = await postApprovePaypalOrderBrokenAmenities(
        data.orderID,
        booking.booking.booking_id
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
    <div>
      {/* Payment Method */}
      <div className=" max-w-sm mx-auto ">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Payment method
        </h2>

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
  );
};

export default PaymentBrokenButton;
