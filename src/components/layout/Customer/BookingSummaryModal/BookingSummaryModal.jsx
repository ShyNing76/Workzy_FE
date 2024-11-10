import { format } from "date-fns";
import React, { useEffect } from "react";
import { formatCurrency } from "../../../context/priceFormat";

const BookingSummaryModal = (props) => {
  const {
    isOpen,
    handleOpenCloseModal,
    roomData,
    workSpaceTypeName,
    currentTab,
    selectedDate,
    startTime,
    endTime,
    startDate,
    endDate,
    discountCode,
    amountPrice,
    amountText,
    subtotal,
    discount,
    tax,
    total,
    handleConfirmBooking,
    rankDiscount,
  } = props;

  const formatDate = format(selectedDate, "dd-MM-yyyy");
  const formatStartDate = format(startDate, "dd-MM-yyyy");
  const formatEndDate = format(endDate, "dd-MM-yyyy");

  return (
    <div>
      <>
        {isOpen && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl">
              <h2 className="text-4xl font-bold text-center">
                Booking confirmation
              </h2>
              <h3 className="text-xl mt-2 text-center">
                {roomData?.workspace_name} ({workSpaceTypeName})
              </h3>

              <div className="grid grid-cols-2 mt-6 mx-6 border-2 rounded-lg">
                {/* Booking Summary */}
                <div className="border-r-2">
                  <h4 className="font-bold text-2xl text-center p-2 ">
                    Booking Summary
                  </h4>
                  <div className="border-t-2 p-4 mt-2 flex justify-between">
                    {/* <p>Date: {bookingData?.date}</p>
                    <p>Time: {bookingData?.time}</p>
                    <p>Discount code: {bookingData?.discountCode || "None"}</p> */}
                    <div>
                      <p>Type Booking: </p>
                      {currentTab === "Hourly" ? (
                        <>
                          <p>Date: </p>
                          <p>Time: </p>
                        </>
                      ) : (
                        <>
                          <p>Date: </p>
                        </>
                      )}
                      <p>Discount code: </p>
                    </div>
                    <div className="text-right">
                      <p>
                        <b>{currentTab}</b>
                      </p>
                      {currentTab === "Hourly" ? (
                        <>
                          <p>
                            <b>{formatDate}</b>
                          </p>
                          <p>
                            From <b>{startTime}</b> To <b>{endTime}</b>
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            From <b>{formatStartDate}</b> To{" "}
                            <b>{formatEndDate}</b>
                          </p>
                        </>
                      )}
                      <p>{discountCode || "None"}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div>
                  <h4 className="font-bold text-2xl text-center p-2">
                    Payment Summary
                  </h4>
                  <div className="border-t-2 p-4 mt-2 flex justify-between">
                    <div>
                      <p>Amount: ({amountText}) </p>
                      <p>Voucher Discount: </p>
                      <p>Rank Discount: </p>
                      <p>Subtotal: </p>
                      <p>Tax: </p>
                    </div>
                    <div className="text-right">
                      <p>{formatCurrency(amountPrice)}</p>
                      <p>- {formatCurrency(discount * amountPrice)}</p>
                      <p>- {formatCurrency(rankDiscount * amountPrice)}</p>
                      <p>{formatCurrency(subtotal)}</p>
                      <p>{formatCurrency(tax)}</p>
                    </div>
                  </div>
                  <div className=" p-4 border-t-2 font-bold text-xl flex justify-between">
                    <div>Total:</div>
                    <div className="text-right">{formatCurrency(total)}</div>
                  </div>
                </div>
              </div>

              {/* Total */}

              {/* Modal actions */}
              <div className="flex mt-10 justify-center gap-5">
                <button
                  className="btn bg-slate-200 w-1/4"
                  onClick={handleOpenCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-neutral w-1/4"
                  onClick={handleConfirmBooking}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default BookingSummaryModal;
