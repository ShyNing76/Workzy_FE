import React from "react";
import "./Carousel.scss";
// Import Swiper styles and components
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper-bundle.min.css";
import "../../../../node_modules/swiper/swiper.min.css";

// Import Swiper modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Carousel = () => {
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
      <SwiperSlide>
        <img src="https://picsum.photos/500/300?random=1" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/500/300?random=2" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/500/300?random=3" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/500/300?random=4" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://picsum.photos/500/300?random=5" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
