import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "./Slide.scss";

const Slide = ({ slides }) => {
  return (
    <div className="swiper-container w-full">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="mySwiper"
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <img src={slide.image} className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;
