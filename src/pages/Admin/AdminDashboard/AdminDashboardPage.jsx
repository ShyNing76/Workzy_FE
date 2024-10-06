import { Link, Outlet, useLocation } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { RxDashboard } from "react-icons/rx";
import { PiEmpty } from "react-icons/pi";

import "./AdminDashboardPage.scss";

import AdminHeader from "../../../components/layout/Admin/AdminHeader/AdminHeader.jsx";
import AdminSidebar from "../../../components/layout/Admin/AdminSidebar/AdminSidebar.jsx";

const AdminDashboard = () => {
  const location = useLocation();
  return (
    <>
      <AdminHeader />

      <div className="sidebar-container drawer lg:drawer-open">
        {" "}
        {/* Sidebar */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <main className="drawer-content flex flex-col items-start w-full h-full p-4">
          {/* Page content here */}
          {/* Always render the Outlet, no need for pathname check */}
          {location.pathname === "/admin" ? (
            <div className="page-content-container">
              <h1 className="text-4xl font-black mb-4">
                Dashboard (coming soon)
              </h1>

              <div className="statistic-container item-center">
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-figure">
                      <TfiStatsUp />
                    </div>
                    <div className="stat-title">Total Ravenue</div>
                    <div className="stat-value">150.000.000</div>
                    <div className="stat-desc">Sep 1st - Oct 1st</div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure">
                      <GoPeople />
                    </div>
                    <div className="stat-title">Guest Booked</div>
                    <div className="stat-value">200</div>
                    <div className="stat-desc">↗︎ 40</div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure">
                      <RxDashboard />
                    </div>
                    <div className="stat-title">Rooms In Use</div>
                    <div className="stat-value">30</div>
                    <div className="stat-desc"></div>
                  </div>

                  <div className="stat">
                    <div className="stat-figure">
                      <PiEmpty />
                    </div>
                    <div className="stat-title">Empty rooms</div>
                    <div className="stat-value">95</div>
                    <div className="stat-desc"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
        <div className="sidebar-container drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <AdminSidebar />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
