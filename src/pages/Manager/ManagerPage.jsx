import React, { useContext, useEffect } from "react";
import "./ManagerPage.scss";
import ManagerHeader from "../../components/layout/Manager/ManagerHeader/ManagerHeader";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { AuthContext } from "../../components/context/auth.context";

const ManagerPage = () => {
  const { auth, setAuth, appLoading, setAppLoading, setRoleId, roleId } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      // Kiểm tra nếu đã có auth trong localStorage thì không cần fetch lại
      if (!auth.isAuthenticated) {
        setAppLoading(true);
        try {
          const res = await getUserAuthen();
          if (res && res.data && res.err === 0) {
            setAuth({
              isAuthenticated: true,
            });
            setRoleId(res.data.role_id);
          } else {
            setAuth({
              isAuthenticated: false,
            });
            setRoleId(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Xóa localStorage khi có lỗi
          localStorage.removeItem("auth");
          localStorage.removeItem("roleId");
        } finally {
          setAppLoading(false);
        }
      }
    };

    fetchAccount();
  }, [setAuth, setRoleId, setAppLoading, auth.isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 ">
        <ManagerHeader />
      </div>

      {/* Drawer Container */}
      <div className="drawer lg:drawer-open">
        {/* Drawer Toggle Input */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Drawer Content (Main Page Content) */}
        <div className="drawer-content flex-col justify-center ">
          <div className="mx-auto w-full p-4">
            {/* Main content displayed here */}
            <Outlet />
          </div>

          {/* Drawer Button for Small Screens */}
          <label
            htmlFor="my-drawer-2"
            className="btn drawer-button lg:hidden absolute top-0 left-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
        </div>

        {/* Drawer Sidebar (Sidebar Content) */}
        <div className="drawer-side z-10 sidebar-manager">
          {/* Drawer Overlay */}
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

          {/* Sidebar Menu */}
          <ul
            className="menu bg-base-200 text-base-content min-h-full w-80 p-4"
            style={{ paddingTop: "4rem" }}
          >
            <li className="menu-item-manager">
              <Link to="/manager" className="flex items-center space-x-2">
                <FaChartBar />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="menu-item-manager">
              <Link
                to="/manager/manager-assign"
                className="flex items-center space-x-2"
              >
                <MdOutlineAssignmentInd />
                <span>Assign Staff</span>
              </Link>
            </li>
            <li className="menu-item-manager">
              <Link
                to="/manager/manager-manage-staff"
                className="flex items-center space-x-2"
              >
                <MdOutlineManageAccounts />
                <span>Manage Staff</span>
              </Link>
            </li>
            <li className="menu-item-manager">
              <Link
                to="/manager/manager-manage-review"
                className="flex items-center space-x-2"
              >
                <MdOutlineRateReview />
                <span>Manage Review</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
