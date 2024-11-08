import React, { useState } from "react";
import "./GallerySwiper.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const GallerySwiper = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { images } = props;

  return (
    <>
      <div className="swiper-gallery-container">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
            height: "350px",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {images &&
            images.map((item, index) => (
              <SwiperSlide key={`image-rooom-${index}`}>
                <img
                  style={{ height: 350 }}
                  className="w-full"
                  src={item.image}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          style={{
            height: "80px",
          }}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images &&
            images.map((item, index) => (
              <SwiperSlide key={`image-rooom-${index}`}>
                <img style={{ width: 85 }} src={item.image} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default GallerySwiper;
