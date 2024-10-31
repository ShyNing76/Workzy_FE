import { useState } from "react";
import OfficeLocations from "../../../components/layout/Customer/OfficeLocation/OfficeLocation";
import { postSendEmailContact } from "../../../config/api";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const contactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Xử lý logic gửi form ở đây
    try {
      setIsLoading(true);
      const res = await postSendEmailContact(formData);

      if (res && res.err === 0) {
        toast.success("Send Email Successful !!!");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-gray-100 py-12 px-4" id="contact">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          {/* Section Title */}
          <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center">
            <div className="text-left">
              <h1 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
                Contact <span className="text-amber-500">Us</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-md">
                We're here to help and answer any question you might have. We
                look forward to hearing from you.
              </p>
              <hr className="border-t-2 border-amber-500 w-1/4 mb-4" />
              <p className="text-sm text-gray-500">
                Feel free to reach out at any time!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2">
            <div className="bg-white shadow-md rounded-lg p-8">
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
                  {isLoading && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Send Message
                </button>
              </form>
            </div>
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
