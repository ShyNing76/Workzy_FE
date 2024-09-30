import React from "react";
import "./BuildingCard.scss";
import BuildingImage from "../../../assets/workspace.jpeg";
import { Link } from "react-router-dom";

const BuildingCard = (props) => {
  const { name, address, onHover } = props;

  return (
    <div className="building-card" onMouseEnter={onHover}>
      <div className="image-building">
        <img src={BuildingImage} alt="Workspace" />
      </div>
      <div className="building-details">
        <h1 className="building-name">{name}</h1>
        <div className="building-address">{address}</div>
        <div className="features">
          <div className="badge badge-warning p-3 font-semibold mx-1 my-1 bg-amber-500 ">
            Single POD
          </div>
          <div className="badge badge-warning p-3 font-semibold mx-1 my-1 bg-amber-500">
            Double POD
          </div>
          <div className="badge badge-warning p-3 font-semibold mx-1 my-1 bg-amber-500">
            Event Space
          </div>
          <div className="badge badge-warning p-3 font-semibold mx-1 my-1 bg-amber-500">
            Working Room
          </div>
          <div className="badge badge-warning p-3 font-semibold mx-1 my-1 bg-amber-500">
            Meeting Room
          </div>
        </div>
        <div className="flex justify-end">
          <Link to="building" className="btn btn-neutral btn-sm">
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
