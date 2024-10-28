import {
  IoLogOutOutline,
} from "react-icons/io5";

import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import logoWorkzy from "../../../../../public/WORKZY_LOGO_BGR.png";

const AdminHeader = () => {
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
    <div className="header-container navbar bg-base-200">
      <div className="header-content flex justify-between items-center w-full">
        <div className="logo-container flex items-center">
          {/* Logo */}
          <Link to="/admin" className="title-admin-header">
            <div
              className="flex items-center"
              style={{
                fontSize: "1.875rem",
                fontWeight: "900",
                color: "#1f2937",
              }}
            >
              <img src={logoWorkzy} alt="logo" className="w-20 h-20" />
              <span> WORKZY ADMIN</span>
            </div>
          </Link>
        </div>

        <div className="profile-avt-dropdown dropdown dropdown-end flex-none">
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
            className="profile-avt-menu menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <div className="flex flex-1 mb-3">
              <div className="mask mask-circle w-10">
                <img
                  alt="Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="ml-2 text-xl font-semibold">Admin</h1>
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

export default AdminHeader;
