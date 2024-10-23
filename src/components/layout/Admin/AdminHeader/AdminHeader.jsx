import {
    IoNotificationsOutline,
    IoMenu,
    IoLogOutOutline,
} from "react-icons/io5";

import { useContext } from "react";
import { AuthContext } from "../../../context/auth.context";
import { useNavigate } from "react-router-dom";

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
            <label
                htmlFor="my-drawer-2"
                className="sidebar-btn-left btn drawer-button lg:hidden"
            >
                <IoMenu className="sidebar-icon text-2xl" />
            </label>

            <div className="logo-container flex-1">
                {" "}
                {/*Logo*/}
                <div className="circle ml-2">WZ</div>
                <div className="font-bold text-3xl ml-2">WORKZY Admin</div>
            </div>

            <div>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">
                        Theme
                        <svg
                            width="12px"
                            height="12px"
                            className="inline-block h-2 w-2 fill-current opacity-60"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 2048 2048"
                        >
                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2"
                    >
                        <li>
                            <input
                                type="radio"
                                name="theme-dropdown"
                                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Use system theme"
                                value="default"
                            />
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="theme-dropdown"
                                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Light"
                                value="light"
                            />
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="theme-dropdown"
                                className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Dark"
                                value="dark"
                            />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="dropdown dropdown-end flex-none mr-2">
                <button className="btn btn-square btn-ghost">
                    <IoNotificationsOutline className="text-2xl" />
                </button>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                    <p className="text-center">No new notification</p>
                </ul>
            </div>

            <div className="profile-avt-dropdown dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
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
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="ml-2 text-xl font-semibold">
                                Admin
                            </h1>
                            {/* <a className="link ml-2 text-xs">View profile</a> */}
                        </div>
                    </div>
                    <li>
                        <div onClick={() => handleLogout()}>
                            <IoLogOutOutline />
                            Logout
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminHeader;
