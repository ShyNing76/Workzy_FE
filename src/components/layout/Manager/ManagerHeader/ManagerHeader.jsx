import React from "react";
import { Link } from "react-router-dom";
import "./ManagerHeader.scss";

import { AuthContext } from "../../../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

const ManagerHeader = () => {
  const { auth, setAuth, setRoleId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("access_token", "roleId");
    setAuth({
      isAuthenticated: false,
    });
    setRoleId(null);
    navigate("/");
  };

  return (
    <div className="workzy-manager-header-container">
      <div className="workzy-manager-header-content">
        <Link to="/manager" className="title-manager-header">
          <div className="flex items-center">
            <img src="/WORKZY_LOGO_BGR.png" alt="logo" className="w-20 h-20" />
            <span> WORKZY MANAGER</span>
          </div>
        </Link>
        <div className="dropdown dropdown-end flex-none">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <div className="flex flex-1 mb-3">
              <div className="mask mask-circle w-10">
                <img
                  alt="Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="ml-2 text-xl font-semibold">Manager</h1>
              </div>
            </div>
            <li>
              <div onClick={handleLogout}>
                <IoLogOutOutline />
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerHeader;
