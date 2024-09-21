import aboutFrontImg from "../../assets/about-us.png";
import aboutUs1 from "../../assets/about-us-1.jpg";
import aboutUs2 from "../../assets/about-us-2.png";

import Card from "../../components/layout/About/Card/Card";
import "./AboutPage.scss";
// icon
import { MdOutlineHomeWork } from "react-icons/md";
import { MdCleaningServices } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

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

      <div className="about-parners-container"></div>
    </>
  );
};

export default aboutPage;
