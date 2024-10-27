import React, { useContext, useEffect } from "react";
import "./ManagerPage.scss";
import ManagerHeader from "../../components/layout/Manager/ManagerHeader/ManagerHeader";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaChartBar } from "react-icons/fa";
import { MdOutlineManageAccounts, MdOutlineAssignmentInd } from "react-icons/md";
import { AuthContext } from "../../components/context/auth.context";
import { VscFeedback } from "react-icons/vsc";

const ManagerPage = () => {
  const location = useLocation();
  const { auth, setAuth, setAppLoading, setRoleId } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
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
      <div className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
        <ManagerHeader />
      </div>

      {/* Drawer Container */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content flex-col justify-center">
          <div className="mx-auto w-full p-4">
            <Outlet />
          </div>

          {/* Mobile Drawer Toggle */}
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

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          
          <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-3">
            {/* Manager Dashboard Section */}
            <h2 className="font-semibold ml-2 mb-2 text-gray-500">
              Manager Dashboard
            </h2>
            
            <li className="mb-1">
              <Link
                to="/manager"
                className={`tab h-11 ${
                  location.pathname === "/manager" ? "active" : ""
                }`}
              >
                <div className="flex flex-1 items-center mb-2">
                  <FaChartBar className="text-2xl" />
                  <p className="ml-4">Dashboard</p>
                </div>
              </Link>
            </li>

            {/* Staff Management Section */}
            <h2 className="font-semibold ml-2 mb-2 mt-2 text-gray-500">
              Staff Management
            </h2>

            <li className="mb-1">
              <Link
                to="/manager/manager-assign"
                className={`tab h-11 ${
                  location.pathname === "/manager/manager-assign" ? "active" : ""
                }`}
              >
                <div className="flex flex-1 items-center mb-2">
                  <MdOutlineAssignmentInd className="text-2xl" />
                  <p className="ml-4">Assign Staff</p>
                </div>
              </Link>
            </li>

            <li className="mb-1">
              <Link
                to="/manager/manager-manage-staff"
                className={`tab h-11 ${
                  location.pathname === "/manager/manager-manage-staff" ? "active" : ""
                }`}
              >
                <div className="flex flex-1 items-center mb-2">
                  <MdOutlineManageAccounts className="text-2xl" />
                  <p className="ml-4">Manage Staff</p>
                </div>
              </Link>
            </li>

            {/* Reviews Section */}
            <h2 className="font-semibold ml-2 mb-2 mt-2 text-gray-500">
              Reviews Management
            </h2>

            <li className="mb-1">
              <Link
                to="/manager/manager-manage-review"
                className={`tab h-11 ${
                  location.pathname === "/manager/manager-manage-review" ? "active" : ""
                }`}
              >
                <div className="flex flex-1 items-center mb-2">
                  <VscFeedback className="text-2xl" />
                  <p className="ml-4">Manage Review</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;