import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMessageCircle, FiFileText } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import SupportCard from "../../../components/layout/Customer/SupportCard/SupportCard";

const SupportCenter = () => {
  const supportOptions = [
    {
      icon: FiMessageCircle,
      title: "Live Chat",
      description: "Chat live with our support team",
    },
    {
      icon: FaPhoneAlt,
      title: "Phone Support",
      description: "Call us from 24 hours every day",
    },
    {
      icon: CiMail,
      title: "Email",
      description: "Email us and get a response within 24 hours",
    },
    {
      icon: FiFileText,
      title: "Instruction Manual",
      description: "See detailed instructions and frequently asked questions",
    },
    {
      icon: IoIosHelpCircleOutline,
      title: "Help Center",
      description: "Learn more about how to use the product",
    },
  ];

  return (
    <div className="max-w-5xl container mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How can we help you?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers quickly or contact our support team
        </p>
      </div>
      <div className="bg-base-100 rounded-lg flex justify-between items-center flex-col">
        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <SupportCard
              key={index}
              icon={option.icon}
              title={option.title}
              description={option.description}
            />
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center p-8 bg-orange-50 rounded-lg w-full">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is always ready to help you.
          </p>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
            Contact now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
