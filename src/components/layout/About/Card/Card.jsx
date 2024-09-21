import React from "react";
import "./Card.scss";

const Card = (props) => {
  const { icon: Icon, title, description } = props;

  return (
    <>
      <div className="card-container">
        <div className="card-icon">
          <Icon />
        </div>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </>
  );
};

export default Card;
