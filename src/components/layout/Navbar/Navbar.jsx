import { Link, useNavigate } from "react-router-dom";
import flagVN from "/src/assets/images.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import defaultProfile from "../../../assets/default-profile.jpg";
import Notification from "../Notification/Notification";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("access_token");
    navigate("/");
    setAuth({
      isAuthenticated: false,
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="ml-4 navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
          >
            <li>
              <details>
                <summary>
                  <Link to="/services">Services</Link>
                </summary>
                <ul className="p-2">
                  <li>
                    <Link to="/services/service1">Services 1</Link>
                  </li>
                  <li>
                    <Link to="/services/service2">Services 2</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <Link to="/location">Location</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className=" text-3xl font-black">
          WORKZY
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-8 font-medium text-base">
          <li className="dropdown dropdown-hover dropdown-end">
            <details>
              <summary>
                <Link to="/services">Services</Link>
              </summary>
            </details>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[10] w-44 p-2 shadow"
            >
              <li>
                <Link to="/services/service1">Services 1</Link>
              </li>
              <li>
                <Link to="/services/service2">Services 2</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/location">Location</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end space-x-6 mr-4">
        <div className="dropdown dropdown-hover dropdown-end">
          <div tabIndex={0} className="flex items-center justify-center">
            <img className="w-8 h-5" src={flagVN} />
            <RiArrowDropDownLine className="text-4xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content  menu bg-base-100 rounded-box z-[10] w-32 p-2 shadow"
          >
            <li>
              <a>Vietnamese</a>
            </li>
            <li>
              <a>English</a>
            </li>
          </ul>
        </div>

        {!auth.isAuthenticated ? (
          <>
            <div className="dropdown dropdown-end dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 rounded-full">
                  <img alt="defailt profile" src={defaultProfile} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] w-48 p-2 shadow "
              >
                <li>
                  <Link to="/user/account">Profile</Link>
                </li>
                <li>
                  <Link to="/user/booking">Booking</Link>
                </li>
                <li>
                  <Link to="/user/membership">Membership</Link>
                </li>
                <li>
                  <Link to="/user/support">Support Center</Link>
                </li>
                <hr />
                <li>
                  <span onClick={() => handleLogout()}>Logout</span>
                </li>
              </ul>
            </div>

            <div className="dropdown dropdown-hover dropdown-end">
              <div
                className="btn btn-ghost btn-circle "
                role="button"
                tabIndex={1}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-neutral indicator-item"></span>
                </div>
              </div>
              <ul
                tabIndex={1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] w-80 p-2 shadow"
              >
                <li>
                  <Notification
                    title="Booking infomation"
                    description="Your booking has been confirm"
                  />
                  <Notification
                    title="Booking infomation"
                    description="Your booking has been confirm"
                  />
                  <Notification
                    title="Booking infomation"
                    description="Your booking has been confirm"
                  />
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn w-24 ">
              Login
            </Link>
            <Link to="/register" className="btn btn-neutral w-24">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
