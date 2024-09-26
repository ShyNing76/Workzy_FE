import React from "react";
import Hero from "../../components/layout/Hero/Hero";
import Filter from "../../components/layout/HomePageFilter/Filter";
import ServiceCard from "../../components/layout/ServiceCard/ServiceCard";
import imageHero from "../../assets/Hero.jpg";
import imageHero2 from "../../assets/Hero2.jpg";
import Googlemap from "../../components/layout/Googlemap/Googlemap";
import { AiOutlineSolution } from "react-icons/ai";
import { MdPhoneInTalk } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { TbSettingsUp } from "react-icons/tb";
import { RiVipCrown2Fill } from "react-icons/ri";
import { RiPhoneFindLine } from "react-icons/ri";
import "./HomePage.scss";
import imageSwiper1 from "../../assets/swiper1.jpg";
import imageSwiper2 from "../../assets/swiper2.jpg";
import imageSwiper3 from "../../assets/swiper3.jpg";
import Slide from "../../components/layout/ServiceSwiper/Slide";
import { FaLocationArrow } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import Servicedetail from "../../components/layout/ServiceDetail/Servicedetail";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { BsReception4 } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { AiFillPrinter } from "react-icons/ai";
import { FaPhone } from "react-icons/fa6";
const HomePage = () => {
  // Define the slides for the Swiper
  const swiperSlides = [
    { image: imageSwiper1 },
    { image: imageSwiper2 },
    { image: imageSwiper3 },
  ];

  return (
    <>
      {/* Filter Section */}
      <div>
        <Filter />
      </div>

      {/* Service Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
        <ServiceCard
          title="Our solution"
          description="Browse our full range of products and services"
          Icon={AiOutlineSolution}
        />
        <ServiceCard
          title="Talk to us"
          description="Get advice from one of our experts"
          Icon={MdPhoneInTalk}
        />
        <ServiceCard
          title="Book workspace"
          description="Book rooms and offices"
          Icon={ImOffice}
        />
        <ServiceCard
          title="Set up office"
          description="Start building a real presence today"
          Icon={TbSettingsUp}
        />
        <ServiceCard
          title="Become a VIP"
          description="Concessionary for VIP member"
          Icon={RiVipCrown2Fill}
        />
        <ServiceCard
          title="Explore our web"
          description="View our web to find your workspace"
          Icon={RiPhoneFindLine}
        />
      </div>

      {/* Hero Section */}
      <div>
        <Hero
          title="Flexible workspaces for every business"
          details={
            <>
              <p>
                Whether you are looking for a desk, a private office or a
                full-floor office, Workzy offers a variety of workspace
                solutions to meet every need, promoting flexibility to help grow
                your business and deliver great experiences.
              </p>
              <p>
                Seamlessly combining utility and aesthetic value, Workzy's
                flexible office solutions help individuals and businesses of all
                sizes enjoy a complete ecosystem, relieve stress, and reduce
                operational costs so you can focus on work and creativity.
              </p>
            </>
          }
          image={imageHero}
        />
      </div>

      {/* Swiper and Info Section */}
      <div className="flex justify-between items-center w-full mx-auto max-w-7xl space-x-8 my-16">
        {/* Swiper (Left Side) */}
        <div className="container-slide w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center">
            Explore Workzy's services
          </h1>
          <Slide slides={swiperSlides} />
        </div>

        {/* Information (Right Side) */}
        <div className="info-container w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-center">
            Offices in central districts
          </h2>

          <div className="service-detail-container grid grid-cols-2 gap-4 p-6">
            <Servicedetail Icon={FaLocationArrow} detail="Strategic location" />
            <Servicedetail Icon={FaCoins} detail="Cost optimization" />
            <Servicedetail
              Icon={MdOutlineConnectWithoutContact}
              detail="Community connection"
            />
            <Servicedetail
              Icon={BsReception4}
              detail="Free reception service"
            />
            <Servicedetail
              Icon={MdMeetingRoom}
              detail="Free use of meeting room for 2 hours"
            />
            <Servicedetail
              Icon={BiRename}
              detail="Show company name location"
            />
            <Servicedetail
              Icon={MdContactSupport}
              detail="Business registration support"
            />
            <Servicedetail
              Icon={TbTruckDelivery}
              detail="Mail delivery service"
            />
            <Servicedetail Icon={AiFillPrinter} detail="Printing services" />
            <Servicedetail Icon={FaPhone} detail="Dedicated phone line" />
          </div>
        </div>
      </div>

      {/* Hero Section 2 */}
      <div>
        <Hero
          title="Work Seamlessly Wherever Your Business Takes You"
          details={
            <>
              <p>
                With over 4,000 office locations worldwide, we offer meeting
                rooms and coworking spaces in every town, city, and major
                transport hub.
              </p>
              <p>
                Whether you're working solo, growing a startup, or leading one
                of the world’s most successful corporations, you can work close
                to your clients, colleagues, or family through our network.
              </p>
            </>
          }
          image={imageHero2}
        />
      </div>

      {/* Google Map and Contact Section */}
      <div className="container-map-contact flex flex-col md:flex-row items-center justify-between gap-8 py-8">
        <div className="w-full md:w-full">
          <Googlemap src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.0709101923308!2d106.77992101092796!3d10.88221128922828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d89aad780e49%3A0x54542761d4c22175!2zS8O9IHTDumMgeMOhIEtodSBCIC0gxJDhuqFpIGjhu41jIFF14buRYyBnaWEgVFAuSENN!5e0!3m2!1svi!2s!4v1726835740160!5m2!1svi!2s" />
        </div>
        <div className="container-contact w-full md:w-1/2 text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
          <p className="mb-2">Hot Line: 1900 1234</p>
          <p className="mb-2">Email: contact_workzy@gmail.com</p>
          <p>Call expert: 0792 695 143</p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
