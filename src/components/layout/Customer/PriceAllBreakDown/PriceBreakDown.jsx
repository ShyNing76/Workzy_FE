import React from "react";
import { formatCurrency } from "../../../context/priceFormat";

const PriceBreakDown = (props) => {
  const { booking } = props;

  const items = [
    {
      label: "Workspace Price (Include Tax and Discount): ",
      amount: booking.total_workspace_price,
    },
    { label: "Amenities Price: ", amount: booking.total_amenities_price },
    { label: "Broken Price: ", amount: booking.total_broken_price },
  ];

  return (
    <div className="card-body">
      {items.map((item, index) => (
        <div className="flex justify-between py-1" key={index}>
          <span>{item.label}</span>
          <span className="text-black">
            {item.amount >= 0
              ? ` ${formatCurrency(item.amount)}`
              : `- ${formatCurrency(Math.abs(item.amount))}`}
          </span>
        </div>
      ))}
      <div className="border-t border-gray-300 mt-3 pt-2 font-bold flex justify-between">
        <span>Total</span>
        <span className="text-amber-500 font-bold text-2xl">
          {formatCurrency(booking.total_price)}
        </span>
      </div>
    </div>
  );
};

export default PriceBreakDown;
