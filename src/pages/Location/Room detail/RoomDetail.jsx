import { PiChalkboardSimple } from "react-icons/pi";
import { PiNoteBlankLight } from "react-icons/pi";
import { BsProjector } from "react-icons/bs";
import { IoCafeOutline } from "react-icons/io5";

const RoomDetail = () => {
    return(
        <>
            <div className="detail-room-container mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">

                <div className="detail-room-container-left-col ml-20"> {/* Added margin-left */}
                    <div className="room-images-carousel-container">
                        <div className="carousel w-full">
                            <div id="item1" className="carousel-item w-full">
                                <img
                                src="./src/assets/9.png"
                                className="w-full" />
                            </div>
                            <div id="item2" className="carousel-item w-full">
                                <img
                                src="./src/assets/9.png"
                                className="w-full" />
                            </div>
                            <div id="item3" className="carousel-item w-full">
                                <img
                                src="./src/assets/9.png"
                                className="w-full" />
                            </div>
                            <div id="item4" className="carousel-item w-full">
                                <img
                                src="./src/assets/9.png"
                                className="w-full" />
                            </div>
                        </div>
                        <div className="flex w-full justify-center gap-2 py-2">
                            <a href="#item1" className="btn btn-xs">1</a>
                            <a href="#item2" className="btn btn-xs">2</a>
                            <a href="#item3" className="btn btn-xs">3</a>
                            <a href="#item4" className="btn btn-xs">4</a>
                        </div>
                    </div>

                    <div className="room-descriptions-container">
                        <h2 className="room-descriptions-title text-2xl font-bold mb-4">Room Description</h2>
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
                            <li className="amenities-1 flex"><PiChalkboardSimple className="text-2xl"/> &nbsp; Whiteboard</li>
                            <li className="amenities-2 flex"><PiNoteBlankLight className="text-2xl"/> &nbsp; Note paper</li>
                            <li className="amenities-3 flex"><BsProjector className="text-2xl"/> &nbsp; Projector</li>
                            <li className="amenities-4 flex"><IoCafeOutline className="text-2xl"/> &nbsp; Beverages</li>
                        </ul>
                    </div>
                    <br />

                    <div className="room-notes-container">
                        <h2 className="text-2xl font-bold mb-4">Notes</h2>
                        <p></p>
                    </div>
                </div>
                

                <div className="detail-room-container-right-col"> {/* Added margin-left */}
                    
                    <div className="room-name-price-container container">
                        <div className="room-name-container flex ml-32">
                            <h1 className="room-name text-3xl font-black tracking-tight sm:text-5xl text-left">Room name</h1>
                            <div className="status-badge badge badge-success text-white text-xm ml-4 mt-5">Available</div>
                        </div>
                        <br />
                        <div className="price-container flex ml-32">
                            <h2 className="text-3xl font-bold tracking-tight sm:text-2xl text-left">28.700.000</h2>
                            <p>&nbsp;</p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-2xl text-left"> VNĐ/h</h2>
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
                                <option disabled selected>Room</option>
                                <option>Room No.1</option>
                                <option>Room No.2</option>
                            </select>
                        </div>
                        <br />

                        <div className="date-picker flex justify-center w-full max-w-7xl"> 
                            <select className="date-picker-container select select-bordered w-full max-w-xs">
                                <option disabled selected>Date</option>
                                <option>22/9/2024</option>
                                <option>23/9/2024</option> 
                            </select>
                        </div>
                        <br />
                        
                        <div className="time-picker flex justify-center w-full max-w-7xl">
                            <div className="time-picker-container flex grid gap-x-2 lg:grid-cols-2 justify-center w-full max-w-xs">
                                <select className="start-time-select select select-bordered max-w-xs">
                                    <option disabled selected>Start time</option>
                                    <option>7:00 AM</option>
                                    <option>8:00 AM</option>
                                </select>
                                <select className="end-time-select select select-bordered w-full max-w-xs">
                                    <option disabled selected>End time</option>
                                    <option>7:00 AM</option>
                                    <option>8:00 AM</option>
                                </select>
                            </div>
                        </div>
                        <br />

                        <div className="discount-code-input-container flex justify-center w-full max-w-7xl">
                            <input type="text" placeholder="Discount code (optional)" className="input input-bordered w-full max-w-xs" />
                        </div><br />

                        <div className="room-booking-price">
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
                                <div className="card-actions justify-center sm:py-3">
                                </div>
                                </div>
                            </div>
                        </div> <br />  

                        <div className="flex justify-center"> {/* Center the button */}
                            <button className="book-btn btn btn-wide">Book</button>
                        </div>
                        <br />

                    </div>

                </div>
            </div>
        </>
    )
}

export default RoomDetail