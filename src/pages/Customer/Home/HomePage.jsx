//Normal import
import React, { useState } from "react";
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
import imageHero2 from "../../../assets/Hero2.jpg";
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

import Comment from "../../../components/layout/Customer/CommentSection/Comment";
import { ToastContainer } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaPhone, FaTruck } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
const HomePage = () => {
  // Define the slides for the Swiper
  const [activeTab, setActiveTab] = useState(0);

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
        { Icon: FaWifi, details: "Stable Wi-Fi" },
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
        { Icon: FaWifi, details: "Stable Wi-Fi" },
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
        { Icon: FaWifi, details: "Stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
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
        { Icon: FaWifi, details: "Stable Wi-Fi" },
        { Icon: MdConnectWithoutContact, details: "Community connection" },
        { Icon: FiPrinter, details: "Printer" },
        { Icon: BsFillTelephoneFill, details: "Telephone for room" },
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
        { Icon: FaWifi, details: "Stable Wi-Fi" },
        { Icon: MdGroups2, details: "6-15 people" },
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
        { Icon: FaWifi, details: "Stable Wi-Fi" },
        { Icon: BsCupHot, details: "Coffee and Tea" },
        { Icon: MdGroups2, details: "50-150 people" },
        { Icon: PiProjectorScreenDuotone, details: "Projector" },
        { Icon: SlScreenDesktop, details: "Screen" },
      ],
      subTitle: "Versatile and Inviting venue",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <ToastContainer />

      {/* Hero Section with Filter */}
      <div className="relative">
        <Filter />
      </div>

      {/* Service Cards Section */}
      <section className="bg-orange-50 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center mx-20">
          <ServiceCard
            title="Our solution"
            description="Browse our full range of products and services"
            Icon={AiOutlineSolution}
            link="/services"
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
            link="/location"
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
            link="/contact"
          />
          <ServiceCard
            title="About Us"
            description="Discover our mission and values in creating ideal workspaces."
            Icon={RiPhoneFindLine}
            link="/about"
          />
        </div>
      </section>

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
      <section className=" bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TbHexagonNumber1,
                title: "Search",
                description: "Find available workspaces in your area",
              },
              {
                icon: TbHexagonNumber2,
                title: "Book",
                description: "Reserve your preferred space and time",
              },
              {
                icon: TbHexagonNumber3,
                title: "Work",
                description: "Enjoy your quiet and professional workspace",
              },

              // ... other steps
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <step.icon className="w-16 h-16 mx-auto text-orange-500" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Discover workzy services*/}
      <div className="w-full max-w-6xl mx-auto my-10">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-center mb-12 text-gray-900">
            Discover Services of <span className="text-orange-400">Workzy</span>
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 border-b border-base-300 justify-center">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 text-lg font-medium transition-colors duration-200
              ${
                activeTab === index
                  ? "border-b-2 border-orange-400 text-orange-400"
                  : "text-gray-600 hover:text-orange-400"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab content with transitions */}
        <TransitionGroup className="relative">
          <CSSTransition
            key={activeTab}
            timeout={300}
            classNames={{
              enter: "opacity-0 translate-x-4",
              enterActive:
                "opacity-100 translate-x-0 transition-all duration-300",
              exit: "opacity-0 -translate-x-4 absolute top-0 left-0 right-0 transition-all duration-300",
            }}
          >
            <div className="p-6">
              <OfficeNavbar
                title={tabs[activeTab].name}
                swiperSlides={tabs[activeTab].swiperSlides}
                serviceDetails={tabs[activeTab].serviceDetails}
                subTitle={tabs[activeTab].subTitle}
              />
            </div>
          </CSSTransition>
        </TransitionGroup>

        <style jsx>{`
          .opacity-0 {
            opacity: 0;
          }
          .opacity-100 {
            opacity: 1;
          }
          .translate-x-4 {
            transform: translateX(1rem);
          }
          .translate-x-0 {
            transform: translateX(0);
          }
          .-translate-x-4 {
            transform: translateX(-1rem);
          }
        `}</style>
      </div>

      <div className=" mx-auto">
        <Comment />
      </div>

      {/* Contact and Map Section */}
      <section className="py-24 bg-gradient-to-br">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Map Container */}
            <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-xl bg-white p-2">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0709101923308!2d106.77992101092796!3d10.88221128922828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d89aad780e49%3A0x54542761d4c22175!2zS8O9IHTDumMgeMOhIEtodSBCIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1726835740160!5m2!1svi!2s"
                  className="w-full h-full"
                  loading="lazy"
                  title="Location map"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600 mb-8">
                  We're here to help and answer any questions you might have.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <FaPhone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hotline</p>
                    <p className="font-medium text-gray-800">1900 1234</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <CiMail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">
                      contact_workzy@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <FaTruck className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Expert Support</p>
                    <p className="font-medium text-gray-800">0792 652 763</p>
                  </div>
                </div>
              </div>

              <Link
                to={`contact`}
                className="w-full lg:w-auto mt-8 px-8 py-4 btn-neutral btn text-white rounded-xl font-medium hover:bg-neutral-600 transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <MdOutlineMailOutline className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
