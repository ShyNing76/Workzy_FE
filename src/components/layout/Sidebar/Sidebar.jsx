import React from "react";
import "./Sidebar.scss";
// Icon
import { CgProfile } from "react-icons/cg";
import {
  MdOutlinePayment,
  MdCardMembership,
  MdOutlineSupportAgent,
  MdOutlineNotificationsNone,
} from "react-icons/md";

import { GoSidebarCollapse } from "react-icons/go";

import { Link } from "react-router-dom";
import defaultProfile from "../../../assets/default-profile.jpg";

const Sidebar = (props) => {
  const { outlet } = props;

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <GoSidebarCollapse />
          </label>
          {outlet}
        </div>
        <div className="drawer-side z-10">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu text-base-content min-h-full w-80 p-4 side-bar">
            {/* Sidebar content here */}
            <li className="menu-item flex items-center">
              <div className="avatar mr-4">
                <div className="w-10 rounded-full">
                  <img src={defaultProfile} alt="User avatar" />
                </div>
              </div>
              <div className="text-lg font-semibold">Name of user</div>
            </li>
            <hr />
            <li className="menu-item">
              <Link to="/user/account">
                <CgProfile className="icon" />
                Profile Information
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/booking">
                <MdOutlinePayment className="icon" />
                My Booking
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/membership">
                <MdCardMembership className="icon" />
                Membership
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/support">
                <MdOutlineSupportAgent className="icon" />
                Support Center
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/user/notification">
                <MdOutlineNotificationsNone className="icon" />
                Notification
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
