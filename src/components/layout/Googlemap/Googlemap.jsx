import React from "react";
import "./Googlemap.scss";

const Googlemap = (props) => {
  const { src } = props;

  return (
    <div className="container-googlemap">
      <iframe
        src={src}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default Googlemap;
