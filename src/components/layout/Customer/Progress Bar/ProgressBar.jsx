import React from "react";

const ProgressBar = (props) => {
  const { statusOrder, booking, currentStatusIndex } = props;

  return (
    <>
      <ul className="steps w-full py-14 border-b-2 border-dashed">
        {statusOrder.map((status, index) => (
          <li
            key={status}
            data-content={booking.status === "canceled" ? "✕" : `${index + 1}`}
            className={`uppercase	font-semibold step ${
              booking.status === "canceled"
                ? "step-error" // Entire progress bar turns red when canceled
                : index <= currentStatusIndex
                ? "step-warning" // Normal color for active steps
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
