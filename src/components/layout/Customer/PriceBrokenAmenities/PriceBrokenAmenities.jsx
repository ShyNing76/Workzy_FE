import React from "react";
import { formatCurrency } from "../../../context/priceFormat";

const PriceBrokenAmenities = (props) => {
  const { booking, amenitiesBroken } = props;

  return (
    <>
      {/* Header */}

      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">
            Broken Amenities{" "}
            <div
              className={`ml-2 badge ${
                booking.BookingStatuses[0].status === "completed"
                  ? "badge-success "
                  : "badge-error"
              } text-white p-3 `}
            >
              {booking.BookingStatuses[0].status === "completed"
                ? "Paid"
                : "Not Paid"}
            </div>
          </h3>
        </div>
        {amenitiesBroken.map((item, index) => (
          <div
            className="flex justify-between py-1"
            key={`broken-amenites-${index} `}
          >
            <span>
              {item.amenities} x{item.quantity}
            </span>
            <span className="text-black">
              {item.amount >= 0
                ? ` ${formatCurrency(item.amount * item.quantity)}`
                : `- ${formatCurrency(Math.abs(item.amount))}`}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-300 mt-3 pt-2 font-bold flex justify-between">
          <span>Total Broken Price</span>
          <span className="text-amber-500 font-bold text-2xl">
            {formatCurrency(booking.total_broken_price)}
          </span>
        </div>
      </div>
    </>
  );
};

export default PriceBrokenAmenities;
