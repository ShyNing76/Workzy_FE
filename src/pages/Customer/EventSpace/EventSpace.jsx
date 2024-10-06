import React from "react";
import Hero from "../../../components/layout/Customer/Hero/Hero";
import imageEventSpace from "../../../assets/eventSpace.jpg";
import BenefitService from "../../../components/layout/Customer/BenefitService/BenefitService";
import { FaWifi, FaCoins } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";
import { BsReception4 } from "react-icons/bs";
import Servicedetail from "../../../components/layout/Customer/ServiceDetail/Servicedetail";
import { IoMdCheckmark } from "react-icons/io";
import Slide from "../../../components/layout/Customer/ServiceSwiper/Slide";

import swiperImg1 from "../../../assets/ourServiceSwiper1.jpg";
import swiperImg2 from "../../../assets/ourServiceSwiper2.jpg";
import swiperImg3 from "../../../assets/ourServiceSwiper3.jpg";
import { Link } from "react-router-dom";

const swiperSlides = [
  { image: swiperImg1 },
  { image: swiperImg2 },
  { image: swiperImg3 },
];

const EventSpace = () => {
  return (
    <div>
      <div className="hero-service-container">
        <Hero
          reverse={true}
          showButton={false}
          title="Event Space"
          details={
            <>
              <span style={{ color: "#f39c12", fontWeight: "bold" }}>
                Capacity:
              </span>{" "}
              100 person
              <br />
              <br />
              The Event Space at Workzy is a versatile venue designed to host a
              variety of gatherings, from corporate events and workshops to
              social celebrations and networking sessions. With a spacious
              layout, modern facilities, and an inviting ambiance, it provides
              the perfect backdrop for memorable experiences.
            </>
          }
          image={imageEventSpace}
        />
      </div>

      {/* The BenefitService component now includes the service icons */}
      <div>
        <BenefitService
          detail={
            <>
              Elevate your events in Workzy's Event Space, equipped with
              state-of-the-art audio-visual technology, flexible seating
              arrangements, and catering options. Enjoy additional amenities
              like access to breakout rooms, lounge areas, and on-site support,
              all conveniently located in the city center for easy access and
              maximum engagement.
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

export default EventSpace;
