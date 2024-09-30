import { FaRegBell } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoLogOutOutline } from "react-icons/io5";

const AdminHeader = () => {
    return(
        <div className="header-container navbar bg-base-200">

            <label htmlFor="my-drawer-2" className="sidebar-btn-left btn drawer-button lg:hidden">
                <IoMenu className="sidebar-icon text-2xl"/>
            </label>

            <div className="logo-container flex-1"> {/*Logo*/} 
                <div className="circle ml-2">WZ</div>
                <div className="font-bold text-3xl ml-2">Workzy Admin</div>
            </div>

            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <FaRegBell className="text-2xl"/>
                </button>
            </div>

            <div className="profile-avt-dropdown dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabIndex={0} className="profile-avt-menu menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a><VscAccount />Profile</a></li>
                    <li><a><IoLogOutOutline />Logout</a></li>
                </ul>
            </div>

        </div>
    )
}

export default AdminHeader;