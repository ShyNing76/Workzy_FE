import { format, parseISO } from "date-fns";
import React from "react";
import "./BookingTimeLine.scss";

const BookingTimeLine = (props) => {
  const { bookingStatuses } = props;

  const statusDetails = {
    confirmed: "Booking has been confirmed.",
    paid: "Payment has been received.",
    "check-in": "You have checked in.",
    "in-process": "Your booking is currently in usage.",
    "check-out": "You have checked out.",
    "check-amenities": "Staff check for any damaged amenities.",
    completed: "Booking has been successfully completed.",
    "damaged-payment": "There are damaged amenities that need payment.",
    cancelled: "Your booking has been cancelled.",
  };

  return (
    <>
      <div className="flex items-center py-4 border-b-2 border-dashed">
        <h2 className="text-2xl font-semibold pb-4 w-1/2 text-center ">
          Booking Timeline
        </h2>

        <hr className="border-l-2 border-gray-300 h-96 my-4 mx-6" />

        <ul className="steps steps-vertical  w-full mr-8">
          {bookingStatuses
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((status, index) => (
              <li
                key={index}
                className={`step steps-vertical ${
                  status.status === "cancelled" ? "step-error" : "step-warning"
                } ${status.status !== "cancelled" ? "keep-warning" : ""} `}
                data-content={status.status === "cancelled" ? "✕" : "✓"}
              >
                <div className=" pl-3 flex justify-between w-full">
                  <span className="font-semibold">
                    {format(parseISO(status.createdAt), "HH:mm - dd/MM/yyyy")}{" "}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {statusDetails[status.status]}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default BookingTimeLine;
