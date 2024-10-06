import React, { useState } from "react";
import "./User.scss";
import { Outlet, useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../../components/layout/Customer/Sidebar/Sidebar";

const User = () => {
  const { refresh, setRefresh } = useOutletContext();

  // function render both sideBar and outlet
  const handleUpdate = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      <ToastContainer />

      <div className="bg-gray-100">
        <Sidebar
          refresh={refresh}
          outlet={<Outlet context={{ handleUpdate }} />}
        />
      </div>
    </>
  );
};

export default User;
