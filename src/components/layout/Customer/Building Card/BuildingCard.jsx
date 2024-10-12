import React from "react";
import "./BuildingCard.scss";
import BuildingImage from "../../../../assets/workspace.jpeg";
import { Link } from "react-router-dom";

const BuildingCard = (props) => {
  const { dataBuilding, onHover } = props;

  return (
    <div className="building-card" onMouseEnter={onHover}>
      <div className="image-building">
        <img src={BuildingImage} alt="Workspace" />
      </div>
      <div className="building-details">
        <h1 className="building-name">{dataBuilding.building_name}</h1>
        <div className="building-address">{dataBuilding.address}</div>
        <div className="features">
          {dataBuilding &&
            dataBuilding.workspace_types.map((type, index) => (
              <div
                key={`type-${index}`}
                className="badge badge-warning p-3 font-semibold mx-1 my-1 bg-amber-500 "
              >
                {type}
              </div>
            ))}
        </div>
        <div className="flex justify-end">
          <Link
            to={dataBuilding.building_id}
            className="btn btn-neutral btn-sm"
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;
