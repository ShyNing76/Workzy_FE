import React from "react";
import Hero from "../../components/layout/Hero/Hero";
import imageMeetingRoom from "../../assets/meetingRoom.jpg";
import BenefitService from "../../components/layout/BenefitService/BenefitService";
import { FaWifi, FaCoins } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { BsReception4 } from "react-icons/bs";
import Servicedetail from "../../components/layout/ServiceDetail/Servicedetail";
import { IoMdCheckmark } from "react-icons/io";
import Slide from "../../components/layout/ServiceSwiper/Slide";

import swiperImg1 from "../../assets/ourServiceSwiper1.jpg";
import swiperImg2 from "../../assets/ourServiceSwiper2.jpg";
import swiperImg3 from "../../assets/ourServiceSwiper3.jpg";
import { Link } from "react-router-dom";

const swiperSlides = [
  { image: swiperImg1 },
  { image: swiperImg2 },
  { image: swiperImg3 },
];

const MeetingRoom = () => {
  return (
    <div >
      <div className="hero-service-container">
        <Hero
          reverse={true}
          showButton={false}
          title="Meeting room"
          details={
            <>
              <span style={{ color: '#f39c12', fontWeight: 'bold' }}>Capacity:</span> 15 person
              <br />
              <br />
              The Meeting Room at Workzy is tailored for both formal and casual
              gatherings, providing a professional environment for team
              discussions, client presentations, or strategic planning. With a
              spacious layout and modern technology, it ensures a seamless
              experience for effective communication and collaboration.
            </>
          }
          image={imageMeetingRoom}
        />
      </div>

      {/* The BenefitService component now includes the service icons */}
      <div>
        <BenefitService
          detail={
            <>
              Enhance the quality of your meetings with Workzy's fully equipped
              Meeting Room, featuring high-definition video conferencing,
              ergonomic seating, soundproofing, and smart presentation tools.
              Enjoy added conveniences like access to nearby lounges,
              refreshments, and the dynamic energy of a central city location.
            </>
          }
          services={[
            { Icon: FaWifi, detail: "Wifi" },
            { Icon: FaCoins, detail: "Cost optimization" },
            { Icon: MdConnectWithoutContact, detail: "Community connection" },
            { Icon: BsReception4, detail: "Free reception service" },
          ]}
        />
      </div>

      <div className="flex justify-between items-center w-full  space-x-8 my-16 swiper-and-other-location-container">
        <div className="container-slide w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center">
            Discover more places.
          </h1>
          <Slide slides={swiperSlides} />
        </div>

        <div className="info-container w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-center">
            Workzy at other Location
          </h2>

          <div className="our-service-detail-container grid">
            <Servicedetail Icon={IoMdCheckmark} detail="Sharing space" />
            <Servicedetail Icon={IoMdCheckmark} detail="Personan office" />
            <Servicedetail Icon={IoMdCheckmark} detail="Event space" />
            <Servicedetail Icon={IoMdCheckmark} detail="Meeting room" />
          </div>
          <p>Just 28.700.000đ/chair</p>
          <Link to="/location" className="btn">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
