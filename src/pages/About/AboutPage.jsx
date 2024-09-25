import aboutFrontImg from "../../assets/about-us.png";
import aboutUs1 from "../../assets/about-us-1.jpg";
import aboutUs2 from "../../assets/about-us-2.png";
import parners from "../../assets/partners.png";

import Card from "../../components/layout/About/Card/Card";
import "./AboutPage.scss";
// icon
import { MdOutlineHomeWork } from "react-icons/md";
import { MdCleaningServices } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import Accordion from "../../components/layout/Accordion/Accordion";

const aboutPage = () => {
  return (
    <>
      <div className="about-container">
        <div className="about-content">
          <h1>
            About <span>WORKZY</span>
          </h1>
          <p>Working environment improves quality of life</p>
          <div className="about-detail">
            <div className="about-box">
              <h2>
                1200<span>+</span>
              </h2>
              <p>Team members</p>
            </div>

            <div className="about-box">
              <h2>
                30<span>+</span>
              </h2>
              <p>Parners</p>
            </div>

            <div className="about-box">
              <h2>
                500<span>+</span>
              </h2>
              <p>Customers</p>
            </div>
          </div>
        </div>

        <img className="w-full" src={aboutFrontImg} alt="" />
      </div>

      <div className="about-testimonials">
        <div className="title-about-cart">
          <span>WORKZY</span> Mission
        </div>
        <div className="about-card">
          <Card
            icon={MdOutlineHomeWork}
            title="Space"
            description="Access to creative and safe workspaces to collaborate, thrive and success"
          />
          <Card
            icon={MdCleaningServices}
            title="Services"
            description="We prodvide diverse and flexible packages to support your business's goals"
          />
          <Card
            icon={FaPeopleGroup}
            title="Community"
            description="Create a sustainable and supportive community to nurture opportunities and explore talents"
          />
        </div>
      </div>

      <div className="about-hero">
        <div className="about-hero-img">
          <img src={aboutUs1} alt="" />
        </div>
        <div className="about-hero-description">
          <p>
            <span>At Workzy</span>, we provide a flexible and efficient POD
            booking system designed to simplify office space reservations for
            businesses and individuals. Whether you're looking for a quiet space
            to focus or a collaborative environment for your team, we have you
            covered.
          </p>
        </div>
      </div>

      <section className="image-about-between">
        <h1>WORKZY</h1>
        <h3>Do it your way, we've got you covered.</h3>
      </section>

      <div className="about-hero">
        <div className="about-hero-description">
          <p>
            <span>Our Values</span> is to revolutionize the way companies and
            professionals access workspaces. With our seamless platform, users
            can book premium office pods tailored to their needs, ensuring
            productivity and convenience.
          </p>
        </div>
        <div className="about-hero-img">
          <img src={aboutUs2} alt="" />
        </div>
      </div>

      <div className="about-parners-container">
        <div className="about-parners-tittle">
          <span>Parners of</span> WORKZY
        </div>
        <div className="about-parners-img">
          <img src={parners} alt="" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center my-16">
        <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
          <div className="text-left">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              <span className="text-amber-500">FAQ</span> with WORKZY ?
            </h1>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="join join-vertical w-full">
            <Accordion
              qs="What is POD booking workspace?"
              ans="POD booking workspace is a system that allows users to book flexible working spaces in offices or co-working spaces. You can choose the type of space that suits your needs."
            />
            <Accordion
              qs="How far in advance can I make a reservation?"
              ans="You can make reservations up to 30 days in advance. However, please note that seats can be booked by multiple people, so try to book as early as possible."
            />
            <Accordion
              qs="Do I need to register an account to make a reservation?"
              ans="Yes, you need to register for an account to make a reservation. This helps us manage your reservation information and improve user experience."
            />
            <Accordion
              qs="How can I pay?"
              ans="You can pay through a variety of methods, including credit cards, debit cards, and other online payment gateways."
            />
            <Accordion
              qs="Who will assist me if I have problems with my booking?"
              ans="Our customer support team is always ready to help. You can contact us via email, phone, or live chat."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default aboutPage;
