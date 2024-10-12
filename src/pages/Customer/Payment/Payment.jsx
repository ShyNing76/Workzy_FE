import React, { useState, useEffect } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast, ToastContainer } from "react-toastify";
import {
  postApprovePaypalOrder,
  postCreatePaypalOrder,
} from "../../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../components/context/priceFormat";
import "./Payment.scss";

const PaymentPage = () => {
  const paypalClientKey = import.meta.env.VITE_PAYPAL_CLIENT_KEY;
  const navigate = useNavigate();
  const location = useLocation();

  const {
    bookingId,
    roomData,
    workSpaceTypeName,
    amountPrice,
    amountText,
    subtotal,
    discount,
    tax,
    total,
  } = location.state || {};

  const handleCreateOrder = async () => {
    try {
      const res = await postCreatePaypalOrder(bookingId); // Gọi API tạo order
      if (res && res.data && res.err === 0) {
        return res.data.order_id;
      }
    } catch (error) {
      toast.error("Lỗi khi tạo order:", error);
    }
  };

  const handleApproveOrder = async (data) => {
    console.log(data);

    try {
      const res = await postApprovePaypalOrder(data.orderID, bookingId); // Gọi API xác nhận thanh toán

      if (res && res.err === 0) {
        toast.success(res.message);
        navigate("/");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Lỗi khi xác nhận thanh toán:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="payment-container flex justify-center items-center">
        {/* Container */}
        <div className="w-3/4 mx-auto p-8 flex flex-col">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center mb-8">
            Booking Payment
          </h1>
          {/* Thêm thẻ h1 ở đây */}
          <div className="flex">
            {/* Payment Summary */}
            <div className="w-2/3 pr-8">
              <h2 className="text-2xl font-bold mb-6">Payment summary</h2>

              {/* Room Name */}
              <h3 className="text-3xl font-bold mb-4">
                {roomData?.workspace_name} ({workSpaceTypeName})
              </h3>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Amount ({amountText}):</span>
                  <span>{formatCurrency(amountPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>{formatCurrency(discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                {/* Booking Deadline */}
                <div className="mt-4 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
                  <p>Your booking must be paid within </p>
                  <div className="text-gray-700 bg-white py-2 px-3 rounded-lg">
                    10:00
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-2xl">Total:</span>
                  <span className="text-2xl font-bold">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="w-1 border-l border-gray-300 mx-4"></div>

            {/* Payment Method */}
            <div className="w-1/3 max-w-sm mx-auto">
              <h2 className="text-2xl font-bold mb-4">Payment method</h2>

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
      </div>
    </>
  );
};

export default PaymentPage;
