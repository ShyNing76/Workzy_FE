//Normal import
import React from "react";
import "./HomePage.scss";
import { Link } from "react-router-dom";
//Component
import Hero from "../../../components/layout/Customer/Hero/Hero";
import Filter from "../../../components/layout/Customer/HomePageFilter/Filter";
import Card from "../../../components/layout/Customer/Card/Card";
import ServiceCard from "../../../components/layout/Customer/ServiceCard/ServiceCard";

import OfficeNavbar from "../../../components/layout/Customer/OfficeNavbar/OfficeNavbar";
import Googlemap from "../../../components/layout/Customer/Googlemap/Googlemap";
//Icon:
import { AiOutlineSolution } from "react-icons/ai";
import { MdPhoneInTalk } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { TbSettingsUp } from "react-icons/tb";
import { RiVipCrown2Fill } from "react-icons/ri";
import { RiPhoneFindLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { BsCupHot } from "react-icons/bs";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiBuildingHouse } from "react-icons/bi";
import { BiRename } from "react-icons/bi";

import { SlScreenDesktop } from "react-icons/sl";
import { FaChalkboard } from "react-icons/fa";
import { PiProjectorScreenDuotone } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { TbHexagonNumber1 } from "react-icons/tb";
import { TbHexagonNumber2 } from "react-icons/tb";
import { TbHexagonNumber3 } from "react-icons/tb";
//Image:

import imageHero from "../../../assets/Hero.jpg";

import singlePODimage1 from "../../../assets/singlePODimage1.jpg";
import singlePODimage2 from "../../../assets/singlePODimage2.jpg";
import singlePODimage3 from "../../../assets/singlePODimage3.jpg";
import doublePODimage1 from "../../../assets/doublePODimage1.jpg";
import doublePODimage2 from "../../../assets/doublePODimage2.jpg";
import doublePODimage3 from "../../../assets/doublePODimage3.jpg";
import quadPODimage1 from "../../../assets/quadPODimage1.jpg";
import quadPODimage2 from "../../../assets/quadPODimage2.jpg";
import quadPODimage3 from "../../../assets/quadPODimage3.jpg";
import workingRoomImage1 from "../../../assets/workingRoomImage1.jpg";
import workingRoomImage2 from "../../../assets/workingRoomImage2.jpg";
import workingRoomImage3 from "../../../assets/workingRoomImage3.jpg";
import meetingRoomImage1 from "../../../assets/meetingRoomImage1.jpg";
import meetingRoomImage2 from "../../../assets/meetingRoomImage2.jpg";
import meetingRoomImage3 from "../../../assets/meetingRoomImage3.jpg";
import eventSpaceImage1 from "../../../assets/eventSpaceImage1.jpg";
import eventSpaceImage2 from "../../../assets/eventSpaceImage2.jpg";
import eventSpaceImage3 from "../../../assets/eventSpaceImage3.jpg";

import { MdContactSupport } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillPrinter } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
import Accordion from "../../../components/layout/Customer/Accordion/Accordion";
import Comment from "../../../components/layout/Customer/CommentSection/Comment";

const HomePage = () => {
  // Define the slides for the Swiper
  const tabs = [
    {
      name: "Single POD",
      swiperSlides: [
        { image: singlePODimage1 },
        { image: singlePODimage2 },
        { image: singlePODimage3 },
      ],
      serviceDetails: [
        { Icon: FaRegCalendarAlt, details: "Open 24/7" },
        { Icon: FaWifi, details: "Strong, stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
        { Icon: MdConnectWithoutContact, details: "Community connection" },
        { Icon: MdOutlineContactSupport, details: "Support" },
        { Icon: BiBuildingHouse, details: "Professional Enviroment" },
      ],
      subTitle: "Private and Flexible",
    },

    {
      name: "Double POD",
      swiperSlides: [
        { image: doublePODimage1 },
        { image: doublePODimage2 },
        { image: doublePODimage3 },
      ],
      serviceDetails: [
        { Icon: FaRegCalendarAlt, details: "Open 24/7" },
        { Icon: FaWifi, details: "Strong, stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
        { Icon: MdConnectWithoutContact, details: "Community connection" },
        { Icon: MdOutlinePeopleAlt, details: "1-2 People" },
        { Icon: BiBuildingHouse, details: "Professional Enviroment" },
      ],
      subTitle: "Private and Spacious",
    },

    {
      name: "Quad POD",
      swiperSlides: [
        { image: quadPODimage1 },
        { image: quadPODimage2 },
        { image: quadPODimage3 },
      ],
      serviceDetails: [
        { Icon: FaRegCalendarAlt, details: "Open 24/7" },
        { Icon: FaWifi, details: "Strong, stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
        { Icon: MdConnectWithoutContact, details: "Community connection" },
        { Icon: FiPrinter, details: "Printer" },
        { Icon: MdGroups2, details: "2-4 People" },
        { Icon: BiBuildingHouse, details: "Professional Enviroment" },
      ],
      subTitle: "Work with your teammate",
    },

    {
      name: "Working Room",
      swiperSlides: [
        { image: workingRoomImage1 },
        { image: workingRoomImage2 },
        { image: workingRoomImage3 },
      ],
      serviceDetails: [
        { Icon: FaRegCalendarAlt, details: "Open 24/7" },
        { Icon: FaWifi, details: "Strong, stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
        { Icon: MdConnectWithoutContact, details: "Community connection" },
        { Icon: FiPrinter, details: "Printer" },
        { Icon: BsFillTelephoneFill, details: "Telephone for room" },
        { Icon: BiBuildingHouse, details: "Professional Enviroment" },
        { Icon: BiRename, details: "Incorporate a business name" },
        { Icon: SlScreenDesktop, details: "Screen" },
        { Icon: FaChalkboard, details: "White board" },
      ],
      subTitle: "Productive and Comfortable workspace",
    },

    {
      name: "Meeting Room",
      swiperSlides: [
        { image: meetingRoomImage1 },
        { image: meetingRoomImage2 },
        { image: meetingRoomImage3 },
      ],
      serviceDetails: [
        { Icon: FaRegCalendarAlt, details: "Open 24/7" },
        { Icon: FaWifi, details: "Strong, stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
        { Icon: MdGroups2, details: "6-15 people" },
        { Icon: FiPrinter, details: "Printer" },
        { Icon: BsFillTelephoneFill, details: "Telephone for room" },
        { Icon: MdOutlineSecurity, details: "Security" },
        { Icon: PiProjectorScreenDuotone, details: "Projector" },
        { Icon: SlScreenDesktop, details: "Screen" },
        { Icon: FaChalkboard, details: "White board" },
      ],
      subTitle: "Collaborative and Professional space",
    },

    {
      name: "Event Space",
      swiperSlides: [
        { image: eventSpaceImage1 },
        { image: eventSpaceImage2 },
        { image: eventSpaceImage3 },
      ],
      serviceDetails: [
        { Icon: LiaHandsHelpingSolid, details: "Event-ready and Supportive" },
        { Icon: FaWifi, details: "Strong, stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
        { Icon: MdGroups2, details: "50-150 people" },
        { Icon: MdOutlineSecurity, details: "Security" },
        { Icon: PiProjectorScreenDuotone, details: "Projector" },
        { Icon: SlScreenDesktop, details: "Screen" },
        { Icon: FaChalkboard, details: "White board" },
      ],
      subTitle: "Versatile and Inviting venue",
    },
  ];

  return (
    <>
      {/* Filter Section */}
      <div>
        <Filter />
      </div>

      {/* Service Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center mx-20">
        <ServiceCard
          title="Our solution"
          description="Browse our full range of products and services"
          Icon={AiOutlineSolution}
          link="/about"
        />
        <ServiceCard
          title="Talk to us"
          description="Get advice from one of our experts"
          Icon={MdPhoneInTalk}
          link="/contact"
        />
        <ServiceCard
          title="Book workspace"
          description="Book rooms and offices"
          Icon={ImOffice}
          link="/services"
        />
        <ServiceCard
          title="Set up office"
          description="Start building a real presence today"
          Icon={TbSettingsUp}
          link="/location"
        />
        <ServiceCard
          title="Become a VIP"
          description="Concessionary for VIP member"
          Icon={RiVipCrown2Fill}
          // link = "VIP Tutorial page"
        />
        <ServiceCard
          title="Explore our web"
          description="View our web to find your workspace"
          Icon={RiPhoneFindLine}
          link="/about"
        />
      </div>

      {/* Hero Section */}
      <div>
        <Hero
          title="Flexible workspaces for every business"
          details={
            <>
              Whether you are looking for a desk, a private office or a
              full-floor office, Workzy offers a variety of workspace solutions
              to meet every need, promoting flexibility to help grow your
              business and deliver great experiences.
              <br />
              <br />
              Seamlessly combining utility and aesthetic value, Workzy's
              flexible office solutions help individuals and businesses of all
              sizes enjoy a complete ecosystem, relieve stress, and reduce
              operational costs so you can focus on work and creativity.
            </>
          }
          image={imageHero}
          showButton={true}
        />
      </div>

      {/*How it work */}
      <div className="about-testimonials">
        <div className="title-about-cart">
          <span style={{ padding: "100px" }}>How it work</span>
        </div>
        <div className="about-card">
          <Card
            icon={TbHexagonNumber1}
            title="Search"
            description="Find available workspaces in your area"
          />
          <Card
            icon={TbHexagonNumber2}
            title="Book"
            description="Reserve your preferred space and time"
          />
          <Card
            icon={TbHexagonNumber3}
            title="Work"
            description="Enjoy your quiet and professional workspace"
          />
        </div>
      </div>

      {/*Discover workzy services*/}
      <div className="tittle-service-tab">
        Discover Services of <span style={{ color: "#f39c12" }}>Workzy</span>
      </div>
      <div role="tablist" className="service-tabs tabs tabs-bordered">
        {tabs.map((room, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab service-tab "
              aria-label={`${room.name}`}
              defaultChecked={index === 0} // Tab đầu tiên được chọn mặc định
            />
            <div role="tabpanel" className="tab-content p-10">
              <OfficeNavbar
                title={room.name}
                swiperSlides={room.swiperSlides}
                serviceDetails={room.serviceDetails}
                subTitle={room.subTitle}
              />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Hero Section 2 */}
      {/* <div>
        <Hero
          title="Work Seamlessly Wherever Your Business Takes You"
          details={
            <>

              With over 4,000 office locations worldwide, we offer meeting rooms
              and coworking spaces in every town, city, and major transport hub.
              <br />
              <br />
              Whether you're working solo, growing a startup, or leading one of
              the world’s most successful corporations, you can work close to
              your clients, colleagues, or family through our network.

            </>
          }
          image={imageHero2}
          showButton = {true}
        />
      </div> */}
      <h2 className="text-4xl font-bold mb-6 ml-36">What Our Users Say</h2>

      <div className="container mx-auto pt-5">
        <Comment />
      </div>

      {/* Google Map and Contact Section */}
      <div className="container-map-contact flex flex-col md:flex-row items-center justify-between gap-8 py-8">
        <div className="w-full md:w-full">
          <Googlemap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0709101923308!2d106.77992101092796!3d10.88221128922828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d89aad780e49%3A0x54542761d4c22175!2zS8O9IHTDumMgeMOhIEtodSBCIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1726835740160!5m2!1svi!2s" />
        </div>
        <div className="container-contact w-full md:w-1/2 text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
          <p className="mb-2">Hot Line: 1900 1234</p>
          <p className="mb-2">Email: contact_workzy@gmail.com</p>
          <p>Call expert: 0792 695 143</p>
          <Link to="/contact" className="btn">
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
