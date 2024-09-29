import React from "react";
import Hero from "../../components/layout/Hero/Hero";
import imageWorkingRoom from "../../assets/workingRoom.jpg";
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

const WorkingRoom = () => {
  return (
    <div>
      <div>
        <Hero
          reverse={true}
          showButton={false}
          title="Working room"
          details={
            <>
              Capacity: 30 person
              <br />
              <br />
              The Working Room at Workzy offers a focused and adaptable space
              designed for individual tasks or collaborative efforts. Whether
              you need a quiet area for deep work or a flexible environment for
              group projects, this room provides all the essentials for seamless
              productivity.
            </>
          }
          image={imageWorkingRoom}
        />
      </div>

      {/* The BenefitService component now includes the service icons */}
      <div>
        <BenefitService
          detail={
            <>
              Boost your productivity in Workzy’s Working Room, featuring
              high-speed internet, ergonomic furniture, smart lighting, and
              soundproofing. Enjoy added benefits like access to meeting areas,
              lounges, and complimentary coffee/tea stations, all within a prime
              city-center location for easy accessibility.
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

export default WorkingRoom;
