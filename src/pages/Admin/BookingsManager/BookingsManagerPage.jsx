import React, { useEffect, useState } from "react";
import { getAllBooking } from "../../../config/api.admin";
import { format } from "date-fns";
import { formatCurrency } from "../../../components/context/priceFormat";
import BookingDetailsModal from "../../../components/layout/Admin/Modals/BookingDetailModal";
import {
  FiFilter,
  FiSearch,
  FiMapPin,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
const BookingsManagerPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterBookingType, setFilterBookingType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Tính thời gian thuê
  const CalculateTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = end - start;
    const hoursRent = Math.floor(diff / (1000 * 60 * 60)); // chia thời gian cho 1000 * 60 * 60 để đổi ra giờ
    return hoursRent;
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
                    (booking) => booking.BookingStatuses[0]?.status === "usage"
                  ).length
                }
              </div>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="card bg-base-100 shadow-lg mb-6">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <FiFilter className="w-5 h-5 text-primary" />
              </div>
              <h2 className="card-title text-xl font-bold">Advanced Filters</h2>
              <div className="badge badge-primary badge-outline">
                {filteredBookings.length} results
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search Box - spans 6 columns */}
              <div className="form-control md:col-span-6">
                <div className="join w-full">
                  <div className="join-item bg-base-200 px-3 flex items-center">
                    <FiSearch className="w-5 h-5 text-base-content/70" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by ID, workspace, or building..."
                    className="input input-bordered join-item w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Location Filter - spans 3 columns */}
              <div className="form-control md:col-span-3">
                <div className="join w-full">
                  <div className="join-item bg-base-200 px-3 flex items-center">
                    <FiMapPin className="w-5 h-5 text-base-content/70" />
                  </div>
                  <select
                    className="select select-bordered join-item w-full"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    <option value="HCM">Ho Chi Minh City</option>
                    <option value="Hanoi">Hanoi</option>
                  </select>
                </div>
              </div>

              {/* Booking Type Filter - spans 3 columns */}
              <div className="form-control md:col-span-3">
                <div className="join w-full">
                  <div className="join-item bg-base-200 px-3 flex items-center">
                    <FiClock className="w-5 h-5 text-base-content/70" />
                  </div>
                  <select
                    className="select select-bordered join-item w-full"
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

              {/* Filter Tags */}
              <div className="md:col-span-12 flex flex-wrap gap-2">
                {filterLocation && (
                  <div className="badge badge-primary gap-2">
                    <FiMapPin className="w-4 h-4" />
                    {filterLocation}
                    <button
                      className="btn btn-xs btn-ghost btn-circle"
                      onClick={() => setFilterLocation("")}
                    >
                      ✕
                    </button>
                  </div>
                )}
                {filterBookingType && (
                  <div className="badge badge-primary gap-2">
                    <FiClock className="w-4 h-4" />
                    {filterBookingType}
                    <button
                      className="btn btn-xs btn-ghost btn-circle"
                      onClick={() => setFilterBookingType("")}
                    >
                      ✕
                    </button>
                  </div>
                )}
                {searchQuery && (
                  <div className="badge badge-primary gap-2">
                    <FiSearch className="w-4 h-4" />
                    Search: {searchQuery}
                    <button
                      className="btn btn-xs btn-ghost btn-circle"
                      onClick={() => setSearchQuery("")}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
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
                    <td>{formatCurrency(booking.total_price)}</td>
                    <td>
                      <button
                        className="btn btn-sm hover:bg-gray-500"
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
        {openModal && selectedBooking && (
          <BookingDetailsModal
            booking={selectedBooking}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default BookingsManagerPage;
