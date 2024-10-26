import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCards } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

import user1 from "../../../../assets/user1.jpg";
import user2 from "../../../../assets/user2.jpg";
import user3 from "../../../../assets/user3.jpg";
import user4 from "../../../../assets/user4.jpg";

const Comment = () => {
  const comments = [
    {
      avatar: user1,
      review:
        "WORKZY is amazing! The pod booking workspace is perfect for productivity. The environment is clean, quiet, and comfortable.",
      name: "David Quang",
      role: "Solution Architect",
    },
    {
      avatar: user2,
      review:
        "The staff is friendly and helpful. Highly recommend for anyone needing a great workspace in Vietnam. Thank you, WORKZY!",
      name: "ShyNing",
      role: "FullStack Developer",
    },
    {
      avatar: user3,
      review:
        "The perfect place for remote working. Everything is well-organized and it's easy to find a quiet place to focus.",
      name: "let me cook",
      role: "HalfStack Developer",
    },
    {
      avatar: user4,
      review:
        "WORKZY has truly exceeded my expectations. The booking process is seamless, and the amenities make working here a breeze. Highly recommend!",
      name: "lehoangtrong",
      role: "CI/CD/DEVOPS",
    },
  ];

  return (
    <div className="bg-orange-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Members Say
          </h2>
          <div className="w-20 h-1 bg-orange-400 mx-auto"></div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCards]}
          effect="cards"
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={1000}
          loop={true}
          pagination={{
            clickable: true,
            bulletClass: `swiper-pagination-bullet !w-2 !h-2 !bg-orange-400 !opacity-50`,
            bulletActiveClass: `!opacity-100 !scale-150`,
          }}
          className="max-w-3xl"
        >
          {comments.map((comment, index) => (
            <SwiperSlide key={`testimonial-${index}`}>
              <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-4 -left-4 w-8 h-8 text-orange-400 opacity-50" />

                  <div className="flex flex-col items-center text-center space-y-6 ">
                    <div className="rounded-full">
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="w-20 h-20 rounded-full ring-4 ring-orange-100 object-contain"
                      />
                    </div>

                    <p className="text-gray-700 text-lg leading-relaxed italic">
                      {comment.review}
                    </p>

                    <div className="flex flex-col items-center">
                      <h4 className="text-xl font-semibold text-gray-900">
                        {comment.name}
                      </h4>
                      <p className="text-orange-500 font-medium">
                        {comment.role}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }

        .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }

        .swiper-slide {
          opacity: 0.4;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }

        .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

export default Comment;
