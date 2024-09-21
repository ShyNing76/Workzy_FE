import aboutFrontImg from "../../assets/about-us.png";
import "./AboutPage.scss";

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
              <p>Members</p>
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
    </>
  );
};

export default aboutPage;
