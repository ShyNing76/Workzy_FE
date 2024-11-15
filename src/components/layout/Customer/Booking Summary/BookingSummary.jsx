import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../context/priceFormat";

const BookingSummary = (props) => {
  const {
    handleOpenCloseModal,
    price,
    numOfHours,
    numOfDays,
    numOfMonths,
    amountText,
    setAmountText,
    amountPrice,
    setAmountPrice,
    discount,
    total,
    setTotal,
    subtotal,
    setSubtotal,
    tax,
    setTax,
    rankDiscount,
    setRankDiscountAmount,
    rankDiscountAmount,
  } = props;

  useEffect(() => {
    if (numOfHours > 0) {
      setAmountText(`${numOfHours} Hour${numOfHours > 1 ? "s" : ""}`);
      setAmountPrice(price * numOfHours);
    } else if (numOfDays > 0) {
      setAmountText(`${numOfDays} Day${numOfDays > 1 ? "s" : ""}`);
      setAmountPrice(price * numOfDays);
    } else if (numOfMonths > 0) {
      setAmountText(`${numOfMonths} Month${numOfMonths > 1 ? "s" : ""}`);
      setAmountPrice(price * numOfMonths);
    } else {
      setAmountText("");
      setAmountPrice(0); // Reset giá khi không có gì được chọn
    }
  }, [numOfHours, numOfDays, numOfMonths, price]); // Thêm `price` vào dependency để cập nhật khi thay đổi

  useEffect(() => {
    const baseAmount = amountPrice;
    const voucherDiscountAmount = baseAmount * discount;
    const rankDiscountAmount = baseAmount * rankDiscount;
    const totalDiscountAmount = voucherDiscountAmount + rankDiscountAmount;

    const newSubtotal = baseAmount - totalDiscountAmount;
    const newTax = newSubtotal * 0.1;

    setRankDiscountAmount(rankDiscountAmount);
    setSubtotal(newSubtotal);
    setTax(newTax);
    setTotal(newSubtotal + newTax);
  }, [amountPrice, discount, rankDiscount]);

  return (
    <div className="sumary-booking w-full max-w-md mx-auto">
      {/* Box hiển thị thông tin */}
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-2">
          <span>Amount ({amountText}):</span>
          <span>{formatCurrency(amountPrice)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between mb-2">
            <span>Voucher Discount:</span>
            <span>- {formatCurrency(amountPrice * discount)}</span>
          </div>
        )}
        {rankDiscount > 0 && (
          <div className="flex justify-between mb-2">
            <span>Rank Discount:</span>
            <span>- {formatCurrency(rankDiscountAmount || 0)}</span>
          </div>
        )}

        <div
          className="flex justify-between mb-2"
          style={{ borderTop: "0.5px dashed #999" }}
        >
          <span>Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax (10%):</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div
          className="mt-2 pt-2 flex justify-between"
          style={{ borderTop: "0.5px solid #000" }}
        >
          <span className="font-bold">Total:</span>
          <span className="font-bold">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Nút Book */}
      <div className="cursor-not-allowed mt-4">
        <button
          onClick={handleOpenCloseModal}
          className={`w-full text-white py-2 rounded-md shadow-md btn btn-neutral ${
            amountPrice > 0 ? "" : "btn-disabled"
          }`}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
