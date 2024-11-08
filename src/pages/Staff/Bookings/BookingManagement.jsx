import React, { useState, useEffect } from "react";
import "./BookingManagement.scss";
import Swal from "sweetalert2";
import DetailModal from "../../../components/layout/staff/booking/Modal/DetailModal.jsx";
import CheckAmenitiesModal from "../../../components/layout/staff/booking/Modal/CheckAmenitiesModal.jsx";
import {
  getBooking,
  postBookingStatus,
  sendBrokenAmenities,
  getBookingTypeById,
} from "../../../config/api.staff.js";
import { useOutletContext } from "react-router-dom";
import BookingTable from "../../../components/layout/staff/booking/BookingComponent/BookingTable.jsx";
import BookingPagination from "../../../components/layout/staff/booking/BookingComponent/BookingPagination.jsx";
import BookingFilters from "../../../components/layout/staff/booking/BookingComponent/BookingFilters.jsx";

const BookingManagement = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [isFetched, setIsFetched] = useState(false);
  const { buildingId } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [allBookings, setAllBookings] = useState([]); // Thêm state này

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(amount));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };

  const fetchAllBookingData = async () => {
    try {
      setIsLoading(true);
      if (!buildingId) return;
  
      // First call to get total count and first page
      const firstPageResponse = await getBooking(buildingId, 1, itemsPerPage);
      
      if (!firstPageResponse?.data?.rows || !firstPageResponse?.data?.count) {
        throw new Error("Invalid response format from server");
      }
  
      const totalItems = firstPageResponse.data.count;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      let allBookingsData = [];
      const bookingTypeCache = new Map();
  
      // Process all pages sequentially
      for (let page = 1; page <= totalPages; page++) {
        const pageResponse = page === 1 ? firstPageResponse : await getBooking(buildingId, page, itemsPerPage);
        const bookings = pageResponse.data.rows;
  
        for (const booking of bookings) {
          try {
            // Check cache first for booking type
            let bookingType;
            if (bookingTypeCache.has(booking.booking_type_id)) {
              bookingType = bookingTypeCache.get(booking.booking_type_id);
            } else {
              const bookingTypeResponse = await getBookingTypeById(booking.booking_type_id);
              if (!bookingTypeResponse?.data?.type) {
                throw new Error("Invalid booking type response");
              }
              bookingType = bookingTypeResponse.data.type;
              bookingTypeCache.set(booking.booking_type_id, bookingType);
            }
  
            const bookingAmenities = booking.Amenities?.map((amenity) => {
              const details = amenity.BookingAmenities || {};
              return {
                amenity_name: amenity.amenity_name,
                rent_price: formatCurrency(details.price || 0),
                quantity: details.quantity || 0,
                total_price: formatCurrency(details.total_price || 0),
              };
            });
  
            allBookingsData.push({
              booking_id: booking.booking_id,
              workspace_id: booking.workspace_id,
              workspace_name: booking.Workspace?.workspace_name || "Unknown",
              start_time_date: formatDate(booking.start_time_date),
              end_time_date: formatDate(booking.end_time_date),
              workspace_price: formatCurrency(booking.workspace_price),
              total_price: formatCurrency(booking.total_price),
              total_workspace_price: formatCurrency(booking.total_workspace_price),
              status: booking.BookingStatuses?.at(-1)?.status || "N/A",
              booking_type: bookingType,
              total_amenities_price: formatCurrency(booking.total_amenities_price || 0),
              total_broken_price: formatCurrency(booking.total_broken_price || 0),
              customer_name: booking.Customer?.User?.name || "Unknown",
              amenities: bookingAmenities,
            });
          } catch (error) {
            console.error(`Error processing booking ${booking.booking_id}:`, error);
            continue;
          }
        }
      }
  
      setAllBookings(allBookingsData);
      setTotalCount(totalItems);
      setIsLoading(false);
      setIsFetched(true);
  
    } catch (error) {
      console.error("Error fetching booking data:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load bookings. Please try again later.",
      });
    }
  };
  

  useEffect(() => {
    if (buildingId) {
      setIsFetched(false);
      fetchAllBookingData();
    }
  }, [buildingId]); // Bỏ currentPage dependency

  const handleSendBrokenAmenities = async (bookingId, selectedAmenities) => {
    try {
      const amenitiesQuantities = selectedAmenities.map((amenity) => ({
        amenity_name: amenity.amenity_name.trim(),
        quantity: amenity.quantity,
      }));

      if (amenitiesQuantities.length === 0) {
        throw new Error("No amenities selected");
      }

      const requestBody = {
        booking_id: bookingId,
        amenities_quantities: amenitiesQuantities,
      };

      const response = await sendBrokenAmenities(requestBody);
      if (response.err) {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error sending broken amenities:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred!",
      });
    }
  };

  const handleChangeStatus = async (booking_id, status) => {
    try {
      const response = await postBookingStatus(booking_id, status);
      
      // Kiểm tra response
      if (response?.data?.err) {
        throw new Error(response.data.message || "Unknown error occurred");
      }
  
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Status updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
  
      // Update local state
      const updatedBookings = allBookings.map((booking) =>
        booking.booking_id === booking_id ? { ...booking, status } : booking
      );
      setAllBookings(updatedBookings);
  
      if (status === "check-in" || status === "check-amenities") {
        setSelectedBooking(
          updatedBookings.find((b) => b.booking_id === booking_id)
        );
        if (status === "check-amenities") {
          setShowAmenitiesModal(true);
        }
      }
    } catch (error) {
      console.error("Error while updating status:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to update status",
      });
    }
  };  

  const handleAmenitiesDone = () => {
    if (selectedBooking) {
      handleChangeStatus(selectedBooking.booking_id, "completed");
      setShowAmenitiesModal(false);
    }
  };

  const filterBookingsByDate = (bookings, dateStr) => {
    if (!dateStr) return [];

    const selectedDate = new Date(dateStr);
    selectedDate.setHours(0, 0, 0, 0);

    const parseDate = (dateString) => {
      const parts = dateString.trim().split(" ");

      if (parts.length === 2) {
        const [time, date] = parts;
        const [hours, minutes] = time.split(":");
        const [day, month, year] = date.split("/");

        return new Date(year, month - 1, day, hours, minutes);
      } else {
        const [day, month, year] = parts[0].split("/");
        return new Date(year, month - 1, day);
      }
    };

    return bookings.filter((booking) => {
      const startTime = parseDate(booking.start_time_date);
      const endTime = parseDate(booking.end_time_date);

      startTime.setHours(0, 0, 0, 0);
      endTime.setHours(0, 0, 0, 0);

      return (
        selectedDate.getTime() === startTime.getTime() ||
        selectedDate.getTime() === endTime.getTime() ||
        (selectedDate >= startTime && selectedDate <= endTime)
      );
    });
  };

  const filteredBookings = filterBookingsByDate(allBookings, selectedDate);

  const searchedBookings = searchQuery.trim() === ""
    ? filteredBookings
    : filteredBookings.filter((booking) =>
        booking.booking_id.toString().includes(searchQuery)
      );

      const totalFilteredPages = Math.ceil(searchedBookings.length / itemsPerPage);

  // Phân trang từ dữ liệu đã được lọc
  const currentFilteredBookings = searchedBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  return (
    <div className="booking-container m-6 ">
      <h2 className="text-4xl font-black mt-5">Bookings Management</h2>
      <br/>
      <div className="main-bookings-content">
        <BookingFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <br/>
        <BookingTable
          bookings={currentFilteredBookings}
          currentPage={currentPage}
          handleChangeStatus={handleChangeStatus}
          setSelectedBooking={setSelectedBooking}
          setShowDetailModal={setShowDetailModal}
        />
        <br/>
        <BookingPagination
          currentPage={currentPage}
          totalFilteredPages={totalFilteredPages}
          setCurrentPage={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
      {showDetailModal && selectedBooking && (
        <DetailModal
          booking={selectedBooking}
          onClose={() => setShowDetailModal(false)}
        />
      )}
      {showAmenitiesModal && selectedBooking && (
        <CheckAmenitiesModal
          bookingId={selectedBooking.booking_id}
          onDone={handleAmenitiesDone}
          onClose={() => setShowAmenitiesModal(false)}
          handleChangeStatus={handleChangeStatus}
          handleSendBrokenAmenities={handleSendBrokenAmenities}
        />
      )}
    </div>
  );
};

export default BookingManagement;
