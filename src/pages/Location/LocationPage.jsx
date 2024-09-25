import Googlemap from "../../components/layout/Googlemap/Googlemap";
import { IoLocationOutline } from "react-icons/io5";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { BiArea } from "react-icons/bi";
import { MdOutlineChair } from "react-icons/md";
import React, { useState } from "react";
import { CiFilter } from "react-icons/ci";
import Carousel from "../../components/layout/Carousel/Carousel";

const locationPage = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <>
      <Carousel />

      <div className="body-content mt-0">
        <div className="body-content-container mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div className="body-content-text">
            <div className="building-title text-3xl font-black tracking-tight sm:text-6xl text-left">
              <h1>Workzy High-Tech Park</h1> <br />
            </div>

            <div className="building-address">
              <p className="building-address-detail text-sm flex">
                <IoLocationOutline className="text-xl" /> &nbsp; Lô E2a-7, Đường
                D1, phường Long Thạnh Mỹ, TP Thủ Đức, TPHCM
              </p>
              <br />
              <br />
            </div>

            <div className="buiding-detail body-content-normal-text text-justify">
              Located in the fast-growing area of ​​Thu Duc City, Ho Chi Minh
              City, the High-Tech Park branch has convenient transportation,
              close to residential areas and commercial centers. This makes it
              easy for individuals and businesses to move and access. With
              meeting and working rooms from small to large, Workzy provides a
              variety of spaces to suit the needs of organizing meetings,
              seminars, events or group work. Each room is fully equipped with
              amenities such as projectors, whiteboards, presentation screens
              and high-speed internet connection. The staff at Workzy High-Tech
              Park is always ready to support customers throughout the service
              process. From equipment instructions to technical support,
              everything is done quickly and professionally. Workzy not only
              provides meeting rooms but also supports flexible working
              solutions such as virtual office services, shared workspaces, and
              other convenient service packages for startups and freelancers.
              Workzy High-Tech Park aims to create a community workspace where
              people can communicate, exchange ideas and develop work in the
              most effective way. With the motto "Work smart, highly effective",
              Workzy is committed to bringing comfort, convenience and
              productivity to customers.
              <p></p>
              <p></p>
            </div>
          </div>
          <div className="building-img border border-gray-300">
            <img src="./src/assets/8.jpg" />
          </div>
        </div>
      </div>

      <div className="room-filter">
        <div className="room-filter-container grid max-w-xl flex ml-12">
          <div className="room-filter-option-container grid gap-x-2 lg:grid-cols-4">
            <select className="room-filter-option-list-2 select select-bordered w-full max-w-xs">
              <option disabled selected>
                Capacity
              </option>
              <option>Below 10 chairs</option>
              <option>10-20 chairs</option>
              <option>20-30 chairs</option>
              <option>30-50 chairs</option>
              <option>Above 50 chairs</option>
            </select>

            <select className="room-filter-option-list-1 select select-bordered w-full max-w-xs">
              <option disabled selected>
                Type
              </option>
              <option>Working room</option>
              <option>Meeting room</option>
            </select>

            <select className="room-filter-option-list-4 select select-bordered w-full max-w-xs">
              <option disabled selected>
                Capacity
              </option>
              <option>1-3 people</option>
              <option>4-6 people</option>
              <option>6 people above</option>
            </select>
          </div>
        </div>
        <br />
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Khoảng giá</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="w-1/2">
            <input
              type="number"
              className="border rounded-lg p-2 w-full"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Từ"
            />
          </div>
          <span className="mx-2 text-gray-500">VND</span>
          <div className="w-1/2">
            <input
              type="number"
              className="border rounded-lg p-2 w-full"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Đến"
            />
          </div>
          <span className="ml-2 text-gray-500">VND</span>
        </div>
        <div className="flex space-x-4">
          <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">
            Áp dụng
          </button>
          <button className="bg-blue-800 text-white py-2 px-4 rounded-lg">
            Làm mới
          </button>
        </div>
      </div>

      <div className="navbar bg-base-300 rounded-box flex">
        <div className="flex-1 px-2 lg:flex-none">
          <a className="text-lg font-bold flex">
            <CiFilter className="text-3xl flex" /> &nbsp; Filter
          </a>
        </div>
        <div className="flex flex-1 px-2">
          <div className="flex items-stretch">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                Click
              </div>
              <div
                tabIndex={0}
                className="dropdown-content card card-compact bg-primary text-primary-content z-[1] w-80 p-2 shadow"
              >
                <div className="card-body">
                  <h3 className="card-title">Card title!</h3>
                  <p>you can use any element as a dropdown.</p>
                </div>
              </div>
            </div>

            <a className="btn btn-ghost rounded-btn">Button</a>
          </div>
        </div>
      </div>

      <div className="room-list">
        <div className="room-list-container">
          <div className="room-list-page-1 mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-10 lg:max-w-7xl lg:grid-cols-4 lg:px-8 item-center">
            <div className="room-list-item">
              <div className="room-list-item-container flex w-full flex-col lg:flex-row">
                <Link to="/roomdetail">
                  <div className="card card-compact bg-base-100 w-60 shadow-xl lg:mr-10">
                    <figure>
                      <img src="./src/assets/6.png" alt="Room" />
                    </figure>
                    <div className="room-title font-black text-2xl sm:px-4 mt-2">
                      <h1>Room name</h1>
                    </div>
                    <div className="room-detail-container flex-col lg:flex-row justify-between sm:px-4">
                      <div className="room-type mb-4">
                        <p>Working room</p>
                      </div>
                      <div className="room-detail grid grid-cols-2 mb-4">
                        <p className="detail-1 flex">
                          <BiArea className="text-2xl" /> &nbsp; 50 m2
                        </p>
                        <p className="detail-2 flex">
                          <MdOutlineChair className="text-2xl" /> &nbsp; 18
                          chairs
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="room-price flex mb-4 ml-4">
                        <p className="font-bold text-xl">28.700.000</p>
                        <p className="font-bold text-xl">&nbsp;VNĐ/h</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="join flex justify-center mb-10">
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">10</button>
          <button className="join-item btn">11</button>
        </div>
      </div>

      <div className="workzy-branch-maps">
        <div className="maps-container">
          <div>
            <Googlemap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6099415304884!2d106.80730807470056!3d10.841132857997573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1726955415730!5m2!1svi!2s" />
          </div>
        </div>
      </div>
    </>
  );
};

export default locationPage;
