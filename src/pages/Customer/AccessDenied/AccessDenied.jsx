import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-red-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx={12} cy={12} r={10} />
            <line x1={12} y1={8} x2={12} y2={12} />
            <line x1={12} y1={16} x2={12.01} y2={16} />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-6">
          Sorry, you do not have permission to access this page. Please return
          to the home page or contact the administrator.
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

export default AccessDenied;
