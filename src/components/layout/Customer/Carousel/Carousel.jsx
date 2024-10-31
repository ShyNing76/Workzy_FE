import React, { useEffect } from "react";
import "./Carousel.scss";
// Import Swiper styles and components
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../../node_modules/swiper/swiper-bundle.min.css";
import "../../../../../node_modules/swiper/swiper.min.css";

// Import Swiper modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Carousel = (props) => {
  const { images } = props;

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={3} // Hiển thị 3 hình cùng lúc
      centeredSlides={true} // Hình ảnh sẽ căn giữa
      autoplay={{
        delay: 2000, // Không có delay
        disableOnInteraction: false,
      }}
      speed={1500} // Tốc độ di chuyển (ms), 4000ms = 4 giây cho 1 lần di chuyển
      loop={true} // Lặp vô hạn
      pagination={false}
      // grabCursor={true} // Hiệu ứng khi hover chuột
      freeMode={true} // Di chuyển liên tục
    >
      {images.map((image, index) => (
        <SwiperSlide key={`Swiper-slide-${index}`}>
          <img
            style={{ height: 280 }}
            className="w-full"
            src={image.image}
            alt="Slide 1"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
