import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r ">
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-lg text-center">
        <div className="flex justify-center mb-6 text-red-600">
          <AiOutlineWarning className="text-8xl" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist. Please return to
          the home page.
        </p>
        <Link to="/">
          <button className="btn btn-outline btn-error text-lg w-full py-3">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
