import { FaFacebookF, FaTiktok, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Our Services</h6>
          <a className="link link-hover">Services 1</a>
          <a className="link link-hover">Services 2</a>
          <a className="link link-hover">Services 3</a>
          <a className="link link-hover">Services 4</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <br />
          <h6 className="footer-title">Our Location</h6>
          <a className="link link-hover">Ho Chi Minh City</a>
          <a className="link link-hover">Ha Noi</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <img className="w-12" src="../../../../WORKZY_SMALL_LOGO.png" />
          <p>
            &copy;2024 Workzy. POD Booking System
            <br />
            All Rights Reserved.
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a>
              <SiGmail className="w-6 h-6" />
            </a>
            <a>
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a>
              <FaTiktok className="w-6 h-6" />
            </a>
            <a>
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
