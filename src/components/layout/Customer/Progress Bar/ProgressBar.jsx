import React from "react";
import "./ProgressBar.scss";

const ProgressBar = (props) => {
  const { statusOrder, booking, currentStatusIndex } = props;

  return (
    <>
      <ul className="steps w-full py-14 border-b-2 border-dashed">
        {statusOrder.map((status, index) => (
          <li
            key={status}
            data-content={
              booking.BookingStatuses[0].status === "cancelled"
                ? "✕"
                : `${index + 1}`
            }
            className={`step uppercase font-semibold relative ${
              booking.BookingStatuses[0].status === "cancelled"
                ? "step-error"
                : index <= currentStatusIndex
                ? "step-warning"
                : ""
            } ${
              (status === "check-in" || status === "check-out") &&
              index === currentStatusIndex
                ? "half-circle-step"
                : ""
            }`}
          >
            {status}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProgressBar;
