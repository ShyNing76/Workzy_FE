import React from 'react';
import "./Googlemap.scss"

const Googlemap = (props) => {
  const { src } = props;

  return (
    <div className="container-googlemap grid grid-cols-1 lg:grid-cols-2 gap-4 items-center py-8">
      
      
      <div className="container-map order-1 lg:order-none">
        <iframe
          src={src}
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
      </div>

     
      <div className="container-contact order-2 lg:order-none px-6 lg:px-0">
        <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
        <p className="mb-2">Hot Line: 1900 1234</p>
        <p className="mb-2">Email: contact_workzy@gmail.com</p>
        <p>Call expert: 0792 695 143</p>
      </div>
    </div>
  );
};

export default Googlemap;
