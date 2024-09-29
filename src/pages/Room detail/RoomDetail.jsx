import React, { useState } from "react";
import { PiChalkboardSimple } from "react-icons/pi";
import { PiNoteBlankLight } from "react-icons/pi";
import { BsProjector } from "react-icons/bs";
import { IoCafeOutline } from "react-icons/io5";

const RoomDetail = () => {
  return (
    <>
      <div className="detail-room-container mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div className="detail-room-container-left-col ml-20">
          <div className="room-img-gallery grid gap-4 mb-8">
            <div>
              <img
                className="room-img-main-view h-auto max-w-full rounded-lg"
                src="./src/assets/9.png"
                alt="Featured"
              />
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="./src/assets/9.png"
                  alt="Gallery Image 1"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="./src/assets/9.png"
                  alt="Gallery Image 2"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="./src/assets/9.png"
                  alt="Gallery Image 3"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="./src/assets/9.png"
                  alt="Gallery Image 4"
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="./src/assets/9.png"
                  alt="Gallery Image 5"
                />
              </div>
            </div>
          </div>

          <div className="room-descriptions-container mb-4">
            <h2 className="room-descriptions-title text-2xl font-bold mb-4">
              Room Description
            </h2>
            <ul className="room-descriptions-list-container list-disc px-8">
              <li>TV available</li>
              <li>Additional stationery if required</li>
              <li>Soundproofing and adjustable air-condition</li>
              <li>Wireless and internet access</li>
              <li>Catering, tea, coffee, water facilities available anytime</li>
            </ul>
          </div>
          <br />

          <div className="room-amenities-container">
            <h2 className="text-2xl font-bold mb-4">Amenities</h2>
            <ul className="amenities-list mx-auto grid grid-cols-1 items-start gap-y-6 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8 item-center">
              <li className="amenities-1 flex">
                <PiChalkboardSimple className="text-2xl" /> &nbsp; Whiteboard
              </li>
              <li className="amenities-2 flex">
                <PiNoteBlankLight className="text-2xl" /> &nbsp; Note paper
              </li>
              <li className="amenities-3 flex">
                <BsProjector className="text-2xl" /> &nbsp; Projector
              </li>
              <li className="amenities-4 flex">
                <IoCafeOutline className="text-2xl" /> &nbsp; Beverages
              </li>
            </ul>
          </div>
          <br />

          <div className="room-notes-container">
            <h2 className="text-2xl font-bold mb-4">Notes</h2>
            <p></p>
          </div>
        </div>

        <div className="detail-room-container-right-col">
          {" "}
          {/* Added margin-left */}
          <div className="room-name-price-container container">
            <div className="room-name-container flex ml-32 items-center">
              <h1 className="room-name text-3xl font-black tracking-tight sm:text-5xl text-left">
                Room name
              </h1>
              <div className="status-badge badge badge-success text-white text-xm p-3 font-bold ml-6">
                Available
              </div>
            </div>
            <div className="price-container flex ml-32 justify-between">
              <h2 className="text-3xl font-bold tracking-tight sm:text-2xl text-left">
                Type:
              </h2>

              <h2 className="text-3xl font-bold tracking-tight sm:text-2xl text-left">
                Single POD
              </h2>
            </div>
          </div>
          <br />
          <div className="room-booking-detail-container">
            <div className="remaining-time-container ml-36">
              <h1 className="">Remaining time:</h1>
            </div>
            <br />
            <div className="room-select-container flex justify-center w-full max-w-7xl">
              <select className="room-select select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Room
                </option>
                <option>Room No.1</option>
                <option>Room No.2</option>
              </select>
            </div>
            {/*  */}
            {/* <div className="date-picker flex justify-center w-full max-w-7xl">
              <input
                type="date"
                id="Date"
                name="Date"
                className="date-picker-container border border-gray-300 rounded p-2 w-full max-w-xs"
              ></input>
            </div>
            <div className="time-picker flex justify-center w-full max-w-7xl">
              <div className="time-picker-container grid lg:grid-cols-3 justify-center w-full max-w-xs">
                <input
                  type="time"
                  id="appt-time"
                  name="appt-time"
                  className="start-time-select border border-gray-300 rounded p-2 w-full max-w-xs"
                ></input>
                <div className="ml-11 mr-10 mt-1 text-xl">
                  <p>to</p>
                </div>
                <input
                  type="time"
                  id="appt-time"
                  name="appt-time"
                  className="start-time-select border border-gray-300 rounded p-2 w-full max-w-xs"
                ></input>
              </div>
            </div> */}
            <div className="discount-code-input-container flex justify-center w-full max-w-7xl">
              <input
                type="text"
                placeholder="Discount code (optional)"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <br />
            {/* <div className="room-booking-price">
              <div className="room-booking-price-container container item-center flex w-full flex-col lg:flex-row justify-center max-w-7xl">
                <div className="room-booking-price-board card card-compact bg-base-100 w-96 shadow-xl">
                  <div className="room-booking-price-detail-container flex flex-col lg:flex-row justify-between sm:px-4">
                    <div className="room-booking-price-titles">
                      <div className="amount-container flex">
                        <p>Amount </p>
                        <p>&nbsp;</p>
                        <p>(1h30m)</p>
                      </div>
                      <p>Discount: </p>
                      <p>Subtotal: </p>
                      <p>Tax: </p>
                      <p>Grand Total (To Pay): </p>
                      <p>Payment Settled: </p>
                      <p>Payment Outstanding: </p>
                      <hr />

                      <p className="font-black text-xl">Total:</p>
                    </div>

                    <div className="room-booking-price-amounts">
                      <div className="amount-price flex aligned-right">
                        <p>375.000</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                      <div className="discount-price flex">
                        <p>0</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                      <div className="subtotal-price flex">
                        <p>375.000</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                      <div className="tax-price flex">
                        <p>37.500</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                      <div className="grand-total-price flex">
                        <p>412.500</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                      <div className="payment-settled-price flex">
                        <p>0</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                      <div className="payment-outstanding-price flex">
                        <p>412.500</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                      <div className="payment-outstanding-price flex font-black text-xl">
                        <p>412.500</p>
                        <p>&nbsp;</p>
                        <p>VNĐ</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-actions justify-center sm:py-3"></div>
                </div>
              </div>
            </div>{" "} */}
            <div className="flex justify-center">
              {/* Center the button */}
              <button className="book-btn btn btn-wide">Book</button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
