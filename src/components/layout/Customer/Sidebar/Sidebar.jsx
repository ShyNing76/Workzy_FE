import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
// Icon
import { CgProfile } from "react-icons/cg";
import {
  MdOutlinePayment,
  MdCardMembership,
  MdOutlineSupportAgent,
  MdOutlineNotificationsNone,
} from "react-icons/md";
import { TbCalendarCheck } from "react-icons/tb";

import { GoSidebarCollapse } from "react-icons/go";

import { Link } from "react-router-dom";
import defaultProfile from "../../../../assets/default-profile.jpg";
import { getUserAuthen } from "../../../../config/api";

const Sidebar = (props) => {
  const { outlet, refresh } = props;
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserAuthen();

        if (res && res.data && res.err === 0) {
          setName(res?.data?.name);
          setAvatar(res?.data?.image);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, [refresh]);

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
        <div className="drawer-side fixed top-0 left-0 z-20 h-screen bg-base-200">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu text-base-content min-h-full w-80 p-4 side-bar">
            {/* Sidebar content here */}
            <li className="menu-item flex items-center text-center">
              <div className="avatar ">
                <div className="w-10 rounded-full">
                  <img
                    src={avatar === null ? defaultProfile : avatar}
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="text-lg font-semibold te">{name}</div>
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
                <TbCalendarCheck className="icon" />
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
