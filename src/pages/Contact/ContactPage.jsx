import { useState } from "react";
import OfficeLocations from "../../components/layout/OfficeLocation/OfficeLocation";

const contactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi form ở đây
    console.log(formData);
  };

  return (
    <>
      <section className="bg-gray-100 py-12 px-4" id="contact">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600">
              We're here to help and answer any question you might have. We look
              forward to hearing from you.
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-6">
                <label htmlFor="name" className="label">
                  <span className="label-text text-gray-700 font-bold">
                    Your Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mb-6">
                <label htmlFor="email" className="label">
                  <span className="label-text text-gray-700 font-bold">
                    Your Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mb-6">
                <label htmlFor="message" className="label">
                  <span className="label-text text-gray-700 font-bold">
                    Your Message
                  </span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  className="textarea textarea-bordered w-full h-32"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-neutral w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="location-detail mt-6">
        <div className="location-tittle text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Our Location Address
          </h1>
        </div>
        <OfficeLocations />
      </div>
    </>
  );
};

export default contactPage;
