import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.scss';

const Hero = (props) => {
  const { title, details, image } = props;

  return (
    <div className="hero-container flex flex-col md:flex-row justify-between items-center md:items-start md:space-x-8 p-8">
      {/* Thông tin bên trái */}
      <div className="hero-detail-container w-full md:w-1/2">
        <h2 className="text-4xl font-bold mb-4 leading-tight">{title}</h2>
        <p className="text-lg mb-6 text-gray-600">{details}</p>
        <div className='container-button'>
        <Link
          to="/location"
          className="btn bg-black text-white py-2 px-16 rounded-lg font-semibold"
        >
          View more
        </Link>
        </div>
      </div>
      
      {/* Hình ảnh bên phải */}
      <div className="w-full md:w-1/2">
        <img
          src={image}
          alt="Hero"
          className="w-full h-[400px] md:h-[500px] rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
