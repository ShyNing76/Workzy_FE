import React, { useEffect, useState } from "react";
import BookingTab from "../../../components/layout/Customer/BookingTab/BookingTab";
import BookingCard from "../../../components/layout/Customer/BookingCard/BookingCard";
import noDataIcon from "../../../assets/no-data.png";
import "./MyBooking.scss";
import { useNavigate } from "react-router-dom";
import {
  getAllBookingType,
  getBookingOfCustomer,
  getWorkSpaceById,
  putCancelBooking,
  putChangeStatus,
} from "../../../config/api";
import Swal from "sweetalert2";

const MyBooking = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  // const bookingData = [
  //   {
  //     roomName: "Phòng A",
  //     bookingID: "123456789098765432",
  //     from: "12:00 - September 2, 2024",
  //     to: "12:00 - September 2, 2024",
  //     type: "Daily",
  //     total: "100.000 đ",
  //     status: "in-process", // Trạng thái của booking
  //   },
  //   {
  //     roomName: "Phòng B",
  //     bookingID: "234567890987654321",
  //     from: "14:00 - October 5, 2024",
  //     to: "14:00 - October 6, 2024",
  //     type: "Hourly",
  //     total: "200.000 đ",
  //     status: "canceled",
  //   },
  //   // Thêm dữ liệu booking khác nếu cần
  // ];

  const [bookingData, setBookingData] = useState([]);
  const [workspaceData, setWorkspaceData] = useState("");
  const [bookingType, setBookingType] = useState("");

  const fetchBookingData = async () => {
    try {
      const resBooking = await getBookingOfCustomer();
      if (resBooking && resBooking.data && resBooking.err === 0) {
        return resBooking.data; // Trả về booking data nếu có
      } else {
        return []; // Trả về mảng rỗng nếu không có booking
      }
    } catch (error) {
      console.error("Error fetching booking data:", error);
      return []; // Trả về mảng rỗng trong trường hợp lỗi
    }
  };

  const fetchWorkspaceData = async (workspaceIds) => {
    // Lọc ra các workspace_id duy nhất
    const uniqueWorkspaceIds = [...new Set(workspaceIds)];

    try {
      // Gọi API đồng thời cho tất cả workspace_id bằng Promise.all
      const workspacePromises = uniqueWorkspaceIds.map((id) =>
        getWorkSpaceById(id)
      );
      const workspacesResponses = await Promise.all(workspacePromises);

      // Xử lý kết quả trả về
      const fetchedWorkspaces = {};
      workspacesResponses.forEach((res, index) => {
        if (res && res.data && res.err === 0) {
          // Lưu dữ liệu workspace với key là workspace_id
          fetchedWorkspaces[uniqueWorkspaceIds[index]] = res.data;
        }
      });

      return fetchedWorkspaces; // Trả về object chứa tất cả workspace data
    } catch (error) {
      console.error("Error fetching workspace data:", error);
      return {}; // Trả về object rỗng trong trường hợp lỗi
    }
  };

  const fetchAllBookingType = async () => {
    try {
      const res = await getAllBookingType();

      if (res && res.data && res.err === 0) {
        setBookingType(res.data);
      } else {
        setBookingType("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchBookingAndWorkspacesData = async () => {
      // Lấy dữ liệu booking trước
      const bookings = await fetchBookingData();
      setBookingData(bookings); // Lưu dữ liệu booking

      // Nếu có bookings, lấy workspace_id và fetch dữ liệu workspace
      if (bookings.length > 0) {
        const workspaceIds = bookings.map((booking) => booking.workspace_id);
        const workspaces = await fetchWorkspaceData(workspaceIds); // Lấy dữ liệu workspace
        setWorkspaceData(workspaces); // Lưu dữ liệu workspace
      }
    };

    fetchAllBookingType();
    fetchBookingAndWorkspacesData();
  }, []); // Chạy khi component mount

  // Lọc bookings theo trạng thái của từng tab
  const filterBookings = () => {
    if (selectedTab === "All") return bookingData;
    if (selectedTab === "Current") {
      return bookingData.filter((booking) =>
        [
          "in-process",
          "checkout",
          "check-amenities",
          "damage-payment",
        ].includes(booking.BookingStatuses[0].status)
      );
    }
    if (selectedTab === "Upcoming") {
      return bookingData.filter((booking) =>
        ["paid", "confirmed"].includes(booking.BookingStatuses[0].status)
      );
    }
    if (selectedTab === "Completed") {
      return bookingData.filter(
        (booking) => booking.BookingStatuses[0].status === "completed"
      );
    }
    if (selectedTab === "Canceled") {
      return bookingData.filter(
        (booking) => booking.BookingStatuses[0].status === "canceled"
      );
    }
    return [];
  };

  // Cancel Booking function
  const handleCancelBooking = (e, bookingId) => {
    e.stopPropagation();

    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be refurn if booking is under 24 hour left!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        putCancelBooking(bookingId); // Call the API
      }
    });
  };

  const handleCheckinBooking = async (e, bookingId) => {
    e.stopPropagation();

    const res = await putChangeStatus(bookingId, "check-in"); // Call the API

    if (res && res.err === 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Check-in Successful",
        text: "Waiting for Staff to confirm your check-in",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: res.message,
        text: "Fail to Check-in Booking",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="max-w-5xl container mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-neutral mb-8 text-left">
          My Booking
        </h2>
        <label className="input input-bordered flex items-center gap-2 ">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="container mx-auto p-4">
        {/* Component Tabs */}
        <BookingTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Hiển thị Booking Cards tương ứng */}
        {filterBookings().length > 0 ? (
          filterBookings().map((booking) => {
            const workspace = workspaceData[booking.workspace_id];
            const type = bookingType.find(
              (ty) => ty.booking_type_id === booking.booking_type_id
            );

            if (!workspace) {
              return (
                <div key={booking.booking_id} className="my-4">
                  <p>Loading workspace data...</p>{" "}
                </div>
              );
            }
            return (
              <div className="my-4" key={booking.booking_id}>
                <BookingCard
                  type={type}
                  workspace={workspace}
                  booking={booking}
                  handleCancelBooking={handleCancelBooking}
                  handleCheckinBooking={handleCheckinBooking}
                />
              </div>
            );
          })
        ) : (
          <div className="no-booking-data">
            <img src={noDataIcon} alt="No Data" className="no-data-icon" />
            <p>No Booking Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
