import React, { useEffect, useState } from "react";
import {
  getAllBooking,
  getBuilding,
  getWorkspace,
} from "../../../config/api.admin";
import { FiFilter } from "react-icons/fi";
import { format } from "date-fns";
const BookingsManagerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterBookingType, setFilterBookingType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch bookings data
  useEffect(() => {
    const fetchDataBookings = async () => {
      setIsLoading(true);
      try {
        const response = await getAllBooking();
        if (response) {
          setBookings(response.data.rows);
          console.log("bookings", bookings);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataBookings();
  }, []);

  // Hold the location value
  const handleFilterLocation = (event) => {
    setFilterLocation(event.target.value);
  };

  // Hold the booking type value
  const handleFilterBookingType = (event) => {
    setFilterBookingType(event.target.value);
  };

  // Filter bookings by location and booking type
  const filteredBookings = bookings.filter(
    (booking) =>
      (filterLocation
        ? booking.Workspace.Building &&
          booking.Workspace.Building.location === filterLocation
        : true) &&
      (filterBookingType
        ? booking.BookingType.type === filterBookingType
        : true)
  );
  // Open modal truyền vào 1 booking để hiển thị chi tiết booking đó
  const handleOpenModal = (selectedBooking) => {
    // param: selectedBooking là booking được chọn để hiển thị chi tiết
    setSelectedBooking(selectedBooking); // set selectedBooking là booking được chọn
    setOpenModal(true); // set openModal là true để hiển thị modal
  };

  // Đóng modal
  const handleCloseModal = () => {
    // đóng modal
    setSelectedBooking(null); // set selectedBooking là null
    setOpenModal(false); // set openModal là false để đóng modal
  };

  return (
    <div>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">View Bookings</h1>
            <div className="badge badge-neutral">
              {filteredBookings.length} bookings
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Total Bookings</div>
              <div className="stat-value text-primary">{bookings.length}</div>
            </div>
            <div className="stat place-items-center">
              <div className="stat-title">In using</div>
              <div className="stat-value text-success">
                {
                  bookings.filter(
                    (b) => b.BookingStatuses[0]?.status === "usage"
                  ).length
                }
              </div>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">
              <FiFilter />
              Filters
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="select select-bordered w-full max-w-xs"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                <option value="HCM">Ho Chi Minh City</option>
                <option value="Hanoi">Hanoi</option>
              </select>

              <select
                className="select select-bordered w-full max-w-xs"
                value={filterBookingType}
                onChange={(e) => setFilterBookingType(e.target.value)}
              >
                <option value="">All Booking Types</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        {!isLoading ? (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Booking ID</th>
                  <th>Building Name</th>
                  <th>Workspace Name</th>
                  <th>Booking Type</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Total Price</th>
                  <th>View Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.booking_id}>
                    <td>{index + 1}</td>
                    <td>{booking.booking_id}</td>
                    <td>{booking.Workspace.Building.building_name}</td>
                    <td>{booking.Workspace.workspace_name}</td>
                    <td>{booking.BookingType.type}</td>
                    <td>
                      {format(
                        new Date(booking.start_time_date),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </td>
                    <td>
                      {format(
                        new Date(booking.end_time_date),
                        "dd/MM/yyyy HH:mm"
                      )}
                    </td>
                    <td>
                      {booking.BookingStatuses.length > 0 ? (
                        <div
                          className={`badge text-sm mx-1 my-1 rounded-lg shadow-md ${
                            booking.BookingStatuses[0].status === "usage"
                              ? "badge-accent"
                              : booking.BookingStatuses[0].status === "paid"
                              ? "badge-warning"
                              : booking.BookingStatuses[0].status ===
                                "cancelled"
                              ? "badge-error"
                              : booking.BookingStatuses[0].status ===
                                "check-amenities"
                              ? "badge-primary"
                              : booking.BookingStatuses[0].status ===
                                "completed"
                              ? "badge-info"
                              : "badge-neutral"
                          }`}
                        >
                          {booking.BookingStatuses[0].status}
                        </div>
                      ) : (
                        <div className="badge badge-neutral text-lg mx-1 my-1 rounded-lg shadow-md">
                          N/A
                        </div>
                      )}
                    </td>
                    <td>{booking.total_price}</td>
                    <td>
                      <button
                        className="btn btn-sm hover:bg-green-500"
                        onClick={() => handleOpenModal(booking)}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table>
            <tbody>
              <tr>
                <td colSpan="9">
                  <div className="flex justify-center items-center h-64">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Modal */}
        {/*nếu openModal là true và selectedBooking khác null thì hiển thị modal*/}
        {openModal && selectedBooking && (
          <dialog id="my_modal_3" className="modal open" open>
            <div className="modal-box">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={handleCloseModal}
                >
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Booking Details</h3>
              <p className="py-4">Booking ID: {selectedBooking.booking_id}</p>
              <p className="py-4">
                Building Name:{" "}
                {selectedBooking.Workspace.Building.building_name}
              </p>
              <p className="py-4">
                Workspace Name: {selectedBooking.Workspace.workspace_name}
              </p>
              <p className="py-4">
                Booking Type: {selectedBooking.BookingType.type}
              </p>
              <p className="py-4">
                Start Time:{" "}
                {format(
                  new Date(selectedBooking.start_time_date),
                  "dd/MM/yyyy HH:mm"
                )}
              </p>
              <p className="py-4">
                {format(
                  new Date(selectedBooking.end_time_date),
                  "dd/MM/yyyy HH:mm"
                )}{" "}
              </p>
              <p className="py-4">
                Status: {selectedBooking.BookingStatuses[0]?.status || "N/A"}
              </p>
              <p className="py-4">Total Price: {selectedBooking.total_price}</p>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default BookingsManagerPage;
