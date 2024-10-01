import React from "react";

const BookingSummary = () => {
  const amount = 300000; // Số tiền
  const discount = 0; // Giảm giá
  const subtotal = amount - discount;
  const tax = subtotal * 0.1; // Giả sử thuế là 10%
  const total = subtotal + tax;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Box hiển thị thông tin */}
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-2">
          <span>Amount (1 hour):</span>
          <span>{amount.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount:</span>
          <span>{discount.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>{subtotal.toLocaleString()} VND</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax (10%):</span>
          <span>{tax.toLocaleString()} VND</span>
        </div>
        <div
          className=" mt-2 pt-2 flex justify-between"
          style={{ borderTop: "0.5px solid #000" }}
        >
          <span className="font-bold">Total:</span>
          <span className="font-bold">{total.toLocaleString()} VND</span>
        </div>
      </div>

      {/* Nút Book */}
      <button className="mt-4 w-full bg-black text-white py-2 rounded-md shadow-md">
        Book
      </button>
    </div>
  );
};

export default BookingSummary;
