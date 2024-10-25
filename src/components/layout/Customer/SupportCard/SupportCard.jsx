import React from "react";

const SupportCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-orange-600" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default SupportCard;
