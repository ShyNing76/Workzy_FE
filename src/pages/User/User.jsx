import React from "react";
import "./User.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";

const User = () => {
  return (
    <>
      <div className="bg-gray-100">
        <Sidebar outlet={<Outlet />} />
      </div>
    </>
  );
};

export default User;
