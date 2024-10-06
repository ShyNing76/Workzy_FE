import React from "react";
import Servicedetail from "../ServiceDetail/Servicedetail";
import Slide from "../ServiceSwiper/Slide";
import "./OfficeNavbar.scss"
const OfficeNavbar = ({ title, swiperSlides, serviceDetails, subTitle }) => {
  return (
    <div className="flex justify-between items-center w-full mx-auto max-w-7xl space-x-8 my-16">
      {/* Swiper (Left Side) */}
      <div className="container-slide w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <Slide slides={swiperSlides} />
      </div>

      {/* Information (Right Side) */}
      <div className="info-container w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center">
          {subTitle}
        </h2>
        <div className="service-info-container grid grid-cols-2 gap-4 p-6">
          {serviceDetails && serviceDetails.length > 0 ? (
            serviceDetails.map((detail, index) => (
              <Servicedetail key={index} Icon={detail.Icon} detail={detail.details} />
            ))
          ) : (
            <p>No service details available.</p> // Thông báo nếu không có thông tin nào
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficeNavbar;