import React, { useState } from "react";
import "./User.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

const User = () => {
  const [refresh, setRefresh] = useState(false);

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
