import React from "react";
// Import Swiper styles and components
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../../node_modules/swiper/swiper-bundle.min.css";
import "../../../../../node_modules/swiper/swiper.min.css";

// Import Swiper modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Comment = () => {
  const comments = [
    {
      avatar: "https://via.placeholder.com/150", // Placeholder for the avatar image
      review:
        "WORKZY is amazing! The pod booking workspace is perfect for productivity. The environment is clean, quiet, and comfortable.",
      name: "John Doe",
    },
    {
      avatar: "https://via.placeholder.com/150", // Placeholder for the avatar image
      review:
        "The staff is friendly and helpful. Highly recommend for anyone needing a great workspace in Vietnam. Thank you, WORKZY!",
      name: "Jane Smith",
    },
    {
      avatar: "https://via.placeholder.com/150", // Placeholder for the avatar image
      review:
        "The perfect place for remote working. Everything is well-organized and it's easy to find a quiet place to focus.",
      name: "David Nguyen",
    },
    // Add more testimonials as needed
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1} // Hiển thị 3 hình cùng lúc
      centeredSlides={true} // Hình ảnh sẽ căn giữa
      autoplay={{
        delay: 4000, // Không có delay
        disableOnInteraction: false,
      }}
      speed={4000} // Tốc độ di chuyển (ms), 4000ms = 4 giây cho 1 lần di chuyển
      loop={true} // Lặp vô hạn
      pagination={{ clickable: true }}
      grabCursor={true} // Hiệu ứng khi hover chuột
      freeMode={true} // Di chuyển liên tục
    >
      {comments.map((comment, index) => (
        <SwiperSlide key={`Swiper-comment-${index}`}>
          <div className="w-full  mx-auto bg-base-200 max-w-3xl rounded-lg shadow-md py-12 px-4">
            <div className="flex items-center space-x-4">
              {/* Avatar Image */}
              <img
                src={comment.avatar}
                alt={comment.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                {/* Review content */}
                <p className="text-lg font-medium text-gray-800">
                  {comment.review}
                </p>
                <p className="text-sm font-bold text-gray-600 mt-2">
                  - {comment.name}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Comment;
