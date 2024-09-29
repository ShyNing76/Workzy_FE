// OurServiceCard.jsx
import React from 'react';
import './OurServiceCard.scss';
import { Link } from 'react-router-dom';

const OurServiceCard = ({ title, utilities, price, imageUrl, linkUrl, icons }) => {
    return (
        <div className='service-card-container'>
             <div className="service-card-image">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="service-card-details">

                <h2>{title}</h2>

                <ul className="service-card-utilities">

                    {utilities.map((utility, index) => (

                        <li key={index} className="utility-item">

                            {icons[index]}

                            <span>{utility}</span>
                        </li>
                    ))}
                </ul>
                 <div className="service-card-price">
                    {price}
                </div> 

                 <Link to={linkUrl} className="btn" >View more details</Link>
                

                
            </div>  
        </div>
    );
};

export default OurServiceCard;
