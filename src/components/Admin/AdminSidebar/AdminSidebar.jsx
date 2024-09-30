import { RxDashboard } from "react-icons/rx";
import { PiCube } from "react-icons/pi";
import { PiIdentificationBadge } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { IoAccessibilityOutline } from "react-icons/io5";
import { IoDiamondOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

import { Link, Outlet, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const location = useLocation();
    return(
        <div className="sidebar-container drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-3">
            {/* Sidebar content here --------------------------------------------------------------------*/}
                
                <li className="mb-1">
                    <Link to="/admin" className={`tab ${location.pathname === '/admin' ? 'active' : ''}`}>
                        <div className="flex flex-1 items-center mb-2"><RxDashboard className="text-2xl" /><p className="ml-4">Dashboard</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/servicesmanager" className={`tab ${location.pathname === '/admin/servicesmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1"><PiCube className="text-2xl"/> <p className="ml-4">Manage Services</p> </div>
                    </Link>
                </li>
                
                            
                <li className="mb-1">
                    <Link to="/admin/managersmanager" className={`tab ${location.pathname === '/admin/managersmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1"><PiIdentificationBadge className="text-2xl"/><p className="ml-4">Manage Manager</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/staffsmanager" className={`tab ${location.pathname === '/admin/staffsmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1"><GoPerson className="text-2xl"/><p className="ml-4">Manage Staffs</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <details open>
                        <summary><GoPeople className="text-2xl"/> &nbsp; Manage Customers</summary>
                        <ul>
                            <li className="mb-1">
                                <Link to="/admin/membersmanager" className={`tab ${location.pathname === '/admin/membersmanager' ? 'active' : ''}`}>
                                    <div className="flex flex-1"><IoAccessibilityOutline className="text-2xl"/><p className="ml-4">Members</p></div>
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link to="/admin/vipsmanager" className={`tab ${location.pathname === '/admin/vipsmanager' ? 'active' : ''}`}>
                                    <div className="flex flex-1"><IoDiamondOutline className="text-2xl"/><p className="ml-4">VIPs</p></div>
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>

                <li>
                    <details open>
                        <summary><IoLocationOutline className="text-2xl"/> &nbsp; Locations</summary>
                        <ul>
                            <li><a><IoLocationOutline className="text-2xl"/>Ho Chi Minh</a></li>
                            <li><a><IoLocationOutline className="text-2xl"/>Ha Noi</a></li>
                        </ul>
                    </details>
                </li>

            {/* Sidebar content end here ------------------------------------------------------------------------------*/}    
            </ul>
        </div>
    </div>
    )
}
export default AdminSidebar;