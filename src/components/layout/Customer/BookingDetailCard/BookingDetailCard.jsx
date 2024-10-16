import { format, parseISO } from "date-fns";
import React from "react";
import imageWorkspace from "../../../../assets/workspace.jpeg";

const BookingDetailCard = (props) => {
  const { booking, getStatusBadgeClass, workspace, type } = props;

  if (!workspace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="card card-side bg-base-100 py-2 ">
        <figure className="m-6 mr-0 ">
          <img
            className="rounded-lg"
            src={imageWorkspace}
            alt="Room"
            style={{ width: "150px", height: "150px" }}
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between pb-3 border-b-2">
            <h2 className="card-title ">
              {workspace.workspace_name} -{" "}
              <div
                className={`badge p-3  ${getStatusBadgeClass(
                  booking.BookingStatuses[0].status
                )}`}
              >
                {booking.BookingStatuses[0].status}
              </div>{" "}
            </h2>
            {booking.status === "canceled" ? (
              <></>
            ) : (
              <button className="btn btn-outline btn-neutral btn-sm">
                Add to Calendar
              </button>
            )}
          </div>

          <p>
            <strong>Booking ID</strong>: {booking.booking_id}
          </p>
          <div className="flex justify-between">
            <p>
              <strong>From</strong>:{" "}
              {format(parseISO(booking.start_time_date), "HH:mm - dd/MM/yyyy")}
            </p>
            <p className="text-right">
              <strong>To</strong>:{" "}
              {format(parseISO(booking.end_time_date), "HH:mm - dd/MM/yyyy")}
            </p>
          </div>
          <p>
            <strong>Type</strong>: {type.type}
          </p>
        </div>
      </div>
    </>
  );
};

export default BookingDetailCard;
