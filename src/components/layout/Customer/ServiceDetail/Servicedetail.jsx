import React from "react";
import "./Servicedetail.scss";
const Servicedetail = (props) => {
  const { Icon, detail } = props;
  return (
    <div className="group p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-orange-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="p-3 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors duration-300">
            <Icon className="w-6 h-6 text-orange-500" />
          </div>
        </div>
        <div className="flex-grow">
          <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 block leading-relaxed">
            {detail}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Servicedetail;
