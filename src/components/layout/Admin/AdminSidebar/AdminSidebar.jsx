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
import { RiCoupon3Line } from "react-icons/ri";

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
            
            <h2 className="font-semibold ml-2 mb-2 text-gray-500">WORKZY Manager</h2>

            <li className="mb-1">
                <Link to="/admin" className={`tab ${location.pathname === '/admin' ? 'active' : ''}`}>
                    <div className="flex flex-1 items-center mb-2"><GoHome className="text-2xl" /><p className="ml-4">Dashboard</p></div>
                </Link>
            </li>

            <li className="mb-1">
                <Link to="/admin/amenitiesmanager" className={`tab ${location.pathname === '/admin/amenitiesmanager' ? 'active' : ''}`}>    
                    <div className="flex flex-1 items-center mb-2"><IoExtensionPuzzleOutline className="text-2xl"/> <p className="ml-4">Amenities</p> </div>
                </Link>
            </li>
 
            <li className="mb-1">
                <Link to="/admin/workspacetypesmanager" className={`tab ${location.pathname === '/admin/workspacetypesmanager' ? 'active' : ''}`}>    
                    <div className="flex flex-1 items-center mb-2"><MdOutlineWorkspaces className="text-2xl"/> <p className="ml-4">Workspace Types</p> </div>
                </Link>
            </li>

            <h2 className="font-semibold te ml-2 mb-2 mt-2 text-gray-500">WORKZY Accounts</h2>
                
            <li className="mb-1">
                <Link to="/admin/managersmanager" className={`tab ${location.pathname === '/admin/managersmanager' ? 'active' : ''}`}>
                    <div className="flex flex-1 items-center mb-2"><PiIdentificationBadge className="text-2xl"/><p className="ml-4">Managers</p></div>
                </Link>
            </li>

            <li className="mb-1">
                <Link to="/admin/staffsmanager" className={`tab ${location.pathname === '/admin/staffsmanager' ? 'active' : ''}`}>
                    <div className="flex flex-1 items-center mb-2"><GoPerson className="text-2xl"/><p className="ml-4">Staffs</p></div>
                </Link>
            </li>

            <li className="mb-1">
                <Link to="/admin/customersmanager" className={`tab ${location.pathname === '/admin/customersmanager' ? 'active' : ''}`}>
                    <div className="flex flex-1 items-center mb-2"><GoPeople className="text-2xl"/><p className="ml-4">Customers</p></div>
                </Link>
            </li>

                <h2 className="font-semibold ml-2 mb-2 mt-2 text-gray-500">WORKZY Branches</h2>


            <li className="mb-1">
                <Link to="/admin/buildingmanager" className= {`tab ${location.pathname === '/admin/buildingmanager' ? 'active' : ''}`}>
                    <div className="flex flex-1 items-center mb-2"><PiBuildingsLight className="text-2xl"/><p className="ml-4">Building List</p></div>
                </Link>
            </li>

            <li className="mb-1">
                <Link to="/admin/workspacesmanager" className= {`tab ${location.pathname === '/admin/workspacesmanager' ? 'active' : ''}`}>
                    <div className="flex flex-1 items-center mb-2"><RxDashboard className="text-2xl"/><p className="ml-4">Workspace List</p></div>
                </Link>
            </li>

                <h2 className="font-semibold ml-2 mb-2 mt-2 text-gray-500">WORKZY Assign</h2>

                <li className="mb-1">
                    <div className="flex flex-1 items-center mb-2"><PiBuildingsLight className="text-2xl"/><p className="ml-4">Assign Staff</p></div>
                </li>

                <li className="mb-1">
                    <div className="flex flex-1 items-center mb-2"><PiBuildingsLight className="text-2xl"/><p className="ml-4">Assign Manager</p></div>
                </li>

                <li className="mb-1">
                    <div className="flex flex-1 items-center mb-2"><PiBuildingsLight className="text-2xl"/><p className="ml-4">Assign Workspace</p></div>
                </li>

                <h2 className="font-semibold ml-2 mb-2 mt-2 text-gray-500">WORKZY Bookings</h2>

                <li className="mb-1">
                    <Link to="/admin/bookingsmanager" className= {`tab ${location.pathname === '/admin/bookingsmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1 items-center mb-2"><LuCalendarCheck className="text-2xl"/><p className="ml-4">Bookings</p></div>
                    </Link>
                </li>

                <li className="mb-1">
                    <Link to="/admin/vouchersmanager" className= {`tab ${location.pathname === '/admin/vouchersmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1 items-center mb-2"><RiCoupon3Line className="text-2xl"/><p className="ml-4">Vouchers</p></div>
                    </Link>
                </li>

                {/* <li className="mb-1">
                    <Link to="/admin/paymentsmanager" className= {`tab ${location.pathname === '/admin/paymentsmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1 items-center mb-2"><CiCreditCard2 className="text-2xl"/><p className="ml-4">Payments</p></div>
                    </Link>
                </li> */}

                <li className="mb-1">
                    <Link to="/admin/reviewsmanager" className= {`tab ${location.pathname === '/admin/reviewsmanager' ? 'active' : ''}`}>
                        <div className="flex flex-1 items-center mb-2"><VscFeedback className="text-2xl"/><p className="ml-4">Reviews</p></div>
                    </Link>
                </li>

            {/* Sidebar content end here ------------------------------------------------------------------------------*/}    
            </ul>
        </div>
    </div>
    )
}
export default AdminSidebar;