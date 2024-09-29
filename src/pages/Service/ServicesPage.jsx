import OurServiceCard from "../../components/layout/OurServiceCard/OurServiceCard";
import ServiceHeader from "../../components/layout/OurServiceHeader/ServiceHeader";
import podSingleImg from "../../assets/single-pod.png";
import podDoubleImg from "../../assets/double-pod.png";
import quadPodImg from "../../assets/quad-pod.jpg";
import swiperImg1 from "../../assets/ourServiceSwiper1.jpg";
import swiperImg2 from "../../assets/ourServiceSwiper2.jpg";
import swiperImg3 from "../../assets/ourServiceSwiper3.jpg";
import { CiCalendar } from "react-icons/ci";
import { FaWifi } from "react-icons/fa6";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaSquarespace } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import "./ServicesPage.scss";
import Slide from "../../components/layout/ServiceSwiper/Slide";
import Servicedetail from "../../components/layout/ServiceDetail/Servicedetail";
import { Link } from "react-router-dom";

const personalServices = [
  {
    title: "Single POD",
    utilities: ["24/7", "Wifi", "Community connection"],
    price: "$50/hour",
    imageUrl: podSingleImg,
    linkUrl: "/services/single-pod",
    icons: [<CiCalendar />, <FaWifi />, <MdOutlineConnectWithoutContact />], // Icons tương ứng với mỗi utility
  },
  {
    title: "Double POD",
    utilities: ["24/7", "Wifi", "Community connection"],
    price: "$50/hour",
    imageUrl: podDoubleImg,
    linkUrl: "/services/double-pod",
    icons: [<CiCalendar />, <FaWifi />, <MdOutlineConnectWithoutContact />], // Icons tương ứng với mỗi utility
  },
  {
    title: "Quad POD",
    utilities: ["24/7", "Wifi", "Community connection"],
    price: "$50/hour",
    imageUrl: quadPodImg,
    linkUrl: "/services/quad-pod",
    icons: [<CiCalendar />, <FaWifi />, <MdOutlineConnectWithoutContact />], // Icons tương ứng với mỗi utility
  },
];

const businessServices = [
  {
    title: "Working room",
    utilities: ["24/7", "Wifi", "Community connection"],
    price: "$70/hour",
    imageUrl: podSingleImg,
    linkUrl: "/services/working-room",
    icons: [<CiCalendar />, <FaWifi />, <MdOutlineConnectWithoutContact />], // Icons tương ứng với mỗi utility
  },
  {
    title: "Meeting room",
    utilities: ["24/7", "Wifi", "Community connection"],
    price: "$90/hour",
    imageUrl: podSingleImg,
    linkUrl: "/services/meeting-room",
    icons: [<CiCalendar />, <FaWifi />, <MdOutlineConnectWithoutContact />], // Icons tương ứng với mỗi utility
  },
  {
    title: "Event space",
    utilities: ["Large space", "Wifi", "Community connection"],
    price: "$120/hour",
    imageUrl: podSingleImg,
    linkUrl: "/services/event-space",
    icons: [<FaSquarespace />, <FaWifi />, <MdOutlineConnectWithoutContact />], // Icons tương ứng với mỗi utility
  },
];

const swiperSlides = [
  { image: swiperImg1 },
  { image: swiperImg2 },
  { image: swiperImg3 },
];

const ServicesPage = () => {
  return (
    <>
      <div>
        <ServiceHeader />
      </div>

      <div className="our-service-card-container">
        {/* Business Services */}
        <div className="business-title">
          <h2>Business services</h2>
        </div>
        <div className="business-container">
          {businessServices.map((service, index) => (
            <OurServiceCard
              key={index}
              title={service.title}
              utilities={service.utilities}
              price={service.price}
              imageUrl={service.imageUrl}
              linkUrl={service.linkUrl}
              icons={service.icons}
            />
          ))}
        </div>

        {/* Personal Services */}
        <div className="personal-title">
          <h2>Personal services</h2>
        </div>
        <div className="personal-container">
          {personalServices.map((service, index) => (
            <OurServiceCard
              key={index}
              title={service.title}
              utilities={service.utilities}
              price={service.price}
              imageUrl={service.imageUrl}
              linkUrl={service.linkUrl}
              icons={service.icons}
            />
          ))}
        </div>
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
            <Servicedetail
              Icon={IoMdCheckmark}
              detail="Event space"
            />
            <Servicedetail
              Icon={IoMdCheckmark}
              detail="Meeting room"
            />
            
          </div>
          <p>Just 28.700.000đ/chair</p>
          <Link to="/location" className="btn">View more</Link>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
