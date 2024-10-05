import { RxDashboard } from "react-icons/rx";
import { PiCube } from "react-icons/pi";
import { PiIdentificationBadge } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { IoAccessibilityOutline } from "react-icons/io5";
import { IoDiamondOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { PiBuildingsLight } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineWorkspaces } from "react-icons/md";
import { CiCreditCard2 } from "react-icons/ci";
import { VscFeedback } from "react-icons/vsc";
import { GoReport } from "react-icons/go";

import { Link, Outlet, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const location = useLocation();
    return(
        <div className="sidebar-container drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-3">
            {/* Sidebar content here --------------------------------------------------------------------*/}
                
                <li className="mb-1">
                    <Link to="/admin" className={`tab ${location.pathname === '/admin' ? 'active' : ''}`}>
                        <div className="flex flex-1 items-center mb-2"><GoHome className="text-2xl" /><p className="ml-4">Dashboard</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/servicesmanager" className={`tab ${location.pathname === '/admin/servicesmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1"><PiCube className="text-2xl"/> <p className="ml-4">Manage Services</p> </div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/amenitiesmanager" className={`tab ${location.pathname === '/admin/amenitiesmanager' ? 'active' : ''}`}>    
                        <div className="flex flex-1"><IoExtensionPuzzleOutline className="text-2xl"/> <p className="ml-4">Manage Amenities</p> </div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/workspacetypesmanager" className={`tab ${location.pathname === '/admin/workspacetypesmanager' ? 'active' : ''}`}>    
                        <div className="flex flex-1"><MdOutlineWorkspaces className="text-2xl"/> <p className="ml-4">Manage Workspace Types</p> </div>
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

                <li className="mb-1">
                    <details open>
                        <summary><IoLocationOutline className="text-2xl"/> &nbsp; Manage Branches</summary>
                        <ul>
                            <li className="mb-1">
                            <details open>
                            <summary><IoLocationOutline className="text-2xl"/> &nbsp;Ho Chi Minh</summary>
                            <ul>
                                <li className="mb-1">
                                    <Link to="/admin/hcmbuildingmanager" className= {`tab ${location.pathname === '/admin/hcmbuildingmanager' ? 'active' : ''}`}>
                                        <div className="flex flex-1"><PiBuildingsLight className="text-2xl"/><p className="ml-4">Building List</p></div>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link to="/admin/hcmworkspacesmanager" className= {`tab ${location.pathname === '/admin/hcmbuildingmanager' ? 'active' : ''}`}>
                                        <div className="flex flex-1"><RxDashboard className="text-2xl"/><p className="ml-4">Workspace List</p></div>
                                    </Link>
                                </li>
                            </ul>
                            
                        </details>
                            </li>

                            <li className="mb-1">
                            <details open>
                            <summary><IoLocationOutline className="text-2xl"/> &nbsp;Ha Noi</summary>
                            <ul>
                                <li className="mb-1">
                                    <Link to="/admin/hnbuildingmanager" className= {`tab ${location.pathname === '/admin/hnbuildingmanager' ? 'active' : ''}`}>
                                        <div className="flex flex-1"><PiBuildingsLight className="text-2xl"/><p className="ml-4">Building List</p></div>
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link to="/admin/hnworkspacesmanager" className= {`tab ${location.pathname === '/admin/hnbuildingmanager' ? 'active' : ''}`}>
                                        <div className="flex flex-1"><RxDashboard className="text-2xl"/><p className="ml-4">Workspace List</p></div>
                                    </Link>
                                </li>
                            </ul>
                        </details>
                            </li>
                        </ul>

                    </details>
                </li>

                <li className="mb-1">
                    <Link to="/admin/bookingsmanager" className= {`tab ${location.pathname === '/admin/bookingsmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1"><LuCalendarCheck className="text-2xl"/><p className="ml-4">Manage Bookings</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/paymentsmanager" className= {`tab ${location.pathname === '/admin/paymentsmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1"><CiCreditCard2 className="text-2xl"/><p className="ml-4">Manage Payments</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/reviewsmanager" className= {`tab ${location.pathname === '/admin/reviewsmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1"><VscFeedback className="text-2xl"/><p className="ml-4">Manage Reviews</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/trackandanalyzereport" className= {`tab ${location.pathname === '/admin/trackandanalyzereport' ? 'active' : ''}`}>
                        <div className="flex flex-1"><GoReport className="text-2xl"/><p className="ml-4">Track & Analyze Report</p></div>
                    </Link>
                </li>

            {/* Sidebar content end here ------------------------------------------------------------------------------*/}    
            </ul>
        </div>
    </div>
    )
}
export default AdminSidebar;