import React, { useEffect, useState } from "react";
import BookingTab from "../../../components/layout/Customer/BookingTab/BookingTab";
import BookingCard from "../../../components/layout/Customer/BookingCard/BookingCard";
import noDataIcon from "../../../assets/no-data.png";
import "./MyBooking.scss";
import { useNavigate } from "react-router-dom";
import {
  getAllBookingType,
  getBookingOfCustomer,
  getReviewByBookingId,
  getWorkSpaceById,
  postBookingAddToCalendar,
  postBookingRefund,
  postCreateReview,
  putCancelBooking,
  putChangeStatus,
} from "../../../config/api";
import Swal from "sweetalert2";
import BookingReviewModal from "../../../components/layout/Customer/BookingReviewModal/BookingReviewModal";
import Pagination from "../../../components/layout/Shared/Pagination/Pagination";

const MyBooking = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [bookingData, setBookingData] = useState([]);
  const [workspaceData, setWorkspaceData] = useState("");
  const [bookingType, setBookingType] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [page, setPage] = useState(1);
  const LIMIT_BOOKING = 5;
  const [totalBooking, setTotalBooking] = useState({});
  const [reviewStatus, setReviewStatus] = useState([]);
  const [bookingIdReview, setBookingIdReview] = useState("");

  const fetchBookingData = async () => {
    try {
      const resBooking = await getBookingOfCustomer(
        LIMIT_BOOKING,
        page,
        selectedTab
      );
      if (resBooking && resBooking.data && resBooking.err === 0) {
        let tabTotalBooking = resBooking.data.statusCount[selectedTab];

        setTotalBooking(tabTotalBooking);
        return resBooking.data.bookings; // Trả về booking data nếu có
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
  }, [refreshData, page, setPage, selectedTab]); // Chạy khi component mount

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
        setRefreshData((prev) => !prev);
      }
    });
  };

  // Cancel Booking function
  const handleRefundBooking = async (e, bookingId) => {
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be refunded if booking is under 24 hour left!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        // Call the API and wait for it to complete
        await postBookingRefund(bookingId);

        // Now refresh data after the refund request is successful
        setRefreshData((prev) => !prev);

        // Optionally, show success message
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Refund Processed",
          text: "The booking refund has been successfully processed.",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error processing refund:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Refund Failed",
          text: "There was an issue processing the refund.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  const handleCheckinBooking = async (e, bookingId, booking) => {
    e.stopPropagation();

    const currentTime = new Date();
    const bookingStartTime = new Date(booking.start_time_date);

    const timeDiffInMinutes = (bookingStartTime - currentTime) / (1000 * 60);

    // Nếu thời gian chênh lệch lớn hơn 15 phút, hiển thị thông báo lỗi
    if (timeDiffInMinutes > 15) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Too early for check-in",
        text: "You can only check-in 15 minutes before the booking time.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

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
      setRefreshData((prev) => !prev);
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

  const handleCheckoutBooking = async (e, bookingId, booking) => {
    e.stopPropagation();

    const currentTime = new Date();
    const bookingEndTime = new Date(booking.end_time_date);

    // Tính thời gian chênh lệch (trong giờ)
    const timeDiffInMilliseconds = bookingEndTime - currentTime;
    const timeDiffInHours = timeDiffInMilliseconds / (1000 * 60 * 60); // Chuyển đổi ra giờ

    Swal.fire({
      title: "Are you sure?",
      text: `There are ${Math.floor(
        timeDiffInHours
      )} hours left before the end time`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, check-out it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await putChangeStatus(bookingId, "check-out");

        if (res.err === 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Check-out Successful",
            text: "Waiting for Staff to check your amenities",
            showConfirmButton: false,
            timer: 3000,
          });
          setRefreshData((prev) => !prev);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.message,
            text: "Fail to Check-out Booking",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      }
    });
  };

  const handlAddToCalendar = async (e, bookingId) => {
    e.stopPropagation();
    const res = await postBookingAddToCalendar(bookingId);

    if (res && res.err === 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add To Calendar Successful",
        text: "Please go to Google Calendar to see Booking",
        showConfirmButton: false,
        timer: 3000,
      });
      setRefreshData((prev) => !prev);
    }
  };

  const handleOpenReviewModal = (e, bookingId) => {
    e.stopPropagation();

    setBookingIdReview(bookingId);
    setIsOpenReviewModal(true);
  };

  const handleSubmitReview = async (bookingId) => {
    const res = await postCreateReview(bookingId, rating, comment);

    if (res && res.err === 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review Workspace Successful",
        showConfirmButton: false,
        timer: 2000,
      });
      setRefreshData((prev) => !prev);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: res.message,
        text: "Fail to Review Workspace",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    // Đóng modal sau khi gửi đánh giá
    setRating(5);
    setComment("");
    setIsOpenReviewModal(false);
  };

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        // Dùng Promise.all để gọi API cho tất cả bookingIds
        const reviewResults = await Promise.all(
          bookingData.map(async (booking) => {
            const res = await getReviewByBookingId(booking.booking_id);
            const hasReview = res && res.err === 0;
            return {
              bookingId: booking.booking_id,
              isReview: hasReview,
              reviewData: hasReview ? res.data : null,
            };
          })
        );

        // Cập nhật state một lần với toàn bộ kết quả
        setReviewStatus(reviewResults);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllReviews();
  }, [bookingData]);

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

      {/* Component Tabs */}
      <BookingTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <div className="container mx-auto p-4">
        {/* Hiển thị Booking Cards tương ứng */}
        {bookingData && bookingData.length > 0 ? (
          bookingData.map((booking) => {
            const workspace = workspaceData[booking.workspace_id];

            const type = bookingType.find(
              (ty) => ty.booking_type_id === booking.booking_type_id
            );

            const reviewStatusEntry = reviewStatus.find(
              (review) => review.bookingId === booking.booking_id
            );

            if (!workspace) {
              return (
                <div
                  className="booking-card card card-side bg-base-100 shadow-xl my-6 cursor-pointer"
                  key={booking.booking_id}
                >
                  <figure className="m-6 mr-0 ">
                    <div className="skeleton h-64 w-64"></div>
                  </figure>
                  <div className="card-body">
                    <div className="flex justify-between pb-3 border-b-2">
                      <h2 className="card-title ">
                        <div className="skeleton h-4 w-40"></div>
                        <div className={`badge p-3 skeleton w-20`}></div>
                      </h2>
                    </div>

                    <div className="skeleton h-4 w-56"></div>
                    <br />
                    <div className="flex justify-between">
                      <div className="skeleton h-4 w-40"></div>

                      <div className="skeleton h-4 w-40"></div>
                    </div>
                    <br />

                    <div className="skeleton h-4 w-20"></div>
                    <br />
                    <div className="skeleton h-4 w-32"></div>
                    <br />
                    <div
                      className={`card-actions ${
                        booking.BookingStatuses[0].status === "usage" ||
                        booking.BookingStatuses[0].status === "confirmed"
                          ? "justify-between"
                          : "justify-end"
                      } `}
                    >
                      {booking.BookingStatuses[0].status === "confirmed" && (
                        <>
                          <button className="btn btn-outline btn-error skeleton">
                            Cancel Booking
                          </button>
                          <button className="btn btn-outline btn-secondary skeleton">
                            Pay Now
                          </button>
                        </>
                      )}
                      {booking.BookingStatuses[0].status === "paid" && (
                        <>
                          <button className="btn btn-outline btn-error skeleton">
                            Cancel Booking
                          </button>
                          <button className="btn btn-outline btn-primary skeleton">
                            Check-in
                          </button>
                        </>
                      )}
                      {booking.BookingStatuses[0].status === "usage" && (
                        <>
                          <button className="btn btn-outline btn-info skeleton">
                            Checkout
                          </button>
                          <button className="btn btn-outline btn-primary skeleton">
                            Add amenities
                          </button>
                        </>
                      )}
                      {booking.BookingStatuses[0].status ===
                        "damage-payment" && (
                        <button className="btn btn-outline btn-secondary skeleton">
                          Pay Broken Amenities
                        </button>
                      )}
                      {booking.BookingStatuses[0].status === "completed" && (
                        <button className="btn btn-outline btn-accent skeleton">
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <>
                <div className="my-4" key={booking.booking_id}>
                  <BookingCard
                    type={type}
                    workspace={workspace}
                    booking={booking}
                    isReview={
                      reviewStatusEntry ? reviewStatusEntry.isReview : false
                    }
                    dataReview={
                      reviewStatusEntry ? reviewStatusEntry.reviewData : {}
                    }
                    handleCancelBooking={handleCancelBooking}
                    handleCheckinBooking={handleCheckinBooking}
                    handleCheckoutBooking={handleCheckoutBooking}
                    handleOpenReviewModal={handleOpenReviewModal}
                    handleRefundBooking={handleRefundBooking}
                    handlAddToCalendar={handlAddToCalendar}
                  />
                </div>
              </>
            );
          })
        ) : (
          <div className="no-booking-data">
            <img src={noDataIcon} alt="No Data" className="no-data-icon" />
            <p>No Booking Found</p>
          </div>
        )}
      </div>
      {Math.ceil(totalBooking / LIMIT_BOOKING) > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(totalBooking / LIMIT_BOOKING)}
        />
      )}
      <BookingReviewModal
        bookingId={bookingIdReview}
        isOpenReviewModal={isOpenReviewModal}
        setIsOpenReviewModal={setIsOpenReviewModal}
        setRating={setRating}
        setComment={setComment}
        comment={comment}
        handleSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default MyBooking;
