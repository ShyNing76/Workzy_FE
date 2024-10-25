import React, { useEffect, useState } from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import "./MemberShipPage.scss";
import { getPointOfCustomer } from "../../../config/api";

const MemberShipPage = () => {
  // Define the points required for each tier
  const tierPoints = {
    Bronze: 0, // starting tier
    Silver: 5000, // points required to move from Bronze to Silver
    Gold: 10000, // points required to move from Silver to Gold
    Emerald: 20000, // points required to move from Gold to Emerald
    Diamond: 40000, // points required to move from Emerald to Diamond
  };

  const [currentPoints, setCurrentPoints] = useState(40000);
  const [selectedTier, setSelectedTier] = useState("Bronze");
  const [currentTier, setCurrentTier] = useState("Bronze");

  // Information for each membership tier
  const membershipTiers = {
    Bronze: {
      name: "Bronze",
      benefits:
        "Ưu đãi cơ bản cho thành viên mới. Giảm giá 5% trên các dịch vụ thuê phòng.",
      color: "text-amber-500",
    },
    Silver: {
      name: "Silver",
      benefits:
        "Ưu đãi cho thành viên Silver. Giảm giá 10%, miễn phí một số dịch vụ tiện ích.",
      color: "text-gray-400",
    },
    Gold: {
      name: "Gold",
      benefits:
        "Ưu đãi cao cấp cho thành viên Gold. Giảm giá 15%, phòng họp miễn phí.",
      color: "text-yellow-400",
    },
    Emerald: {
      name: "Emerald",
      benefits:
        "Ưu đãi đặc biệt cho thành viên Emerald. Giảm giá 20%, không giới hạn dịch vụ.",
      color: "text-emerald-500",
    },
    Diamond: {
      name: "Diamond",
      benefits:
        "Ưu đãi cao nhất cho thành viên Diamond. Giảm giá 30%, ưu tiên đặt phòng VIP.",
      color: "text-blue-400",
    },
  };

  // Function to change the selected tier
  const handleTierClick = (tier) => {
    setSelectedTier(tier);
  };

  // Check for tier upgrades and reset progress
  useEffect(() => {
    const determineTier = () => {
      if (currentPoints >= tierPoints.Diamond) {
        setCurrentTier("Diamond");
      } else if (currentPoints >= tierPoints.Emerald) {
        setCurrentTier("Emerald");
      } else if (currentPoints >= tierPoints.Gold) {
        setCurrentTier("Gold");
      } else if (currentPoints >= tierPoints.Silver) {
        setCurrentTier("Silver");
      } else {
        setCurrentTier("Bronze");
      }
    };

    determineTier();
  }, [currentPoints]);

  // Fetch points for the customer
  useEffect(() => {
    const fetchPointCustomer = async () => {
      const res = await getPointOfCustomer();

      if (res && res.data && res.err === 0) {
        setCurrentPoints(res.data);
      }
    };

    fetchPointCustomer();
  }, []);

  // Calculate progress for the current tier
  const calculateProgress = () => {
    if (currentTier === "Diamond") return 100; // Max progress for Diamond tier
    const tierStartPoints = tierPoints[currentTier];
    const nextTier =
      Object.keys(tierPoints)[Object.keys(tierPoints).indexOf(currentTier) + 1];
    const nextTierPoints = tierPoints[nextTier] || tierPoints.Diamond;

    return (
      ((currentPoints - tierStartPoints) / (nextTierPoints - tierStartPoints)) *
      100
    );
  };

  // Calculate points needed for the next tier
  const pointsToNextTier = () => {
    if (currentTier === "Diamond") return null; // No next tier for Diamond
    const nextTier =
      Object.keys(tierPoints)[Object.keys(tierPoints).indexOf(currentTier) + 1];
    const nextTierPoints = tierPoints[nextTier] || tierPoints.Diamond;
    return nextTierPoints - currentPoints;
  };

  return (
    <div className="max-w-5xl container mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-neutral mb-8 text-left">
        Membership Information
      </h2>
      <div className="bg-base-100 h-96 rounded-lg flex justify-between items-center">
        {/* Left Section */}
        <div className="membership-info w-1/2">
          {/* Smaller content and centered under h2 */}
          <div className="text-center">
            <p className="text-3xl font-medium text-gray-800 leading-tight">
              Special Offer Information
              <br />
              for{" "}
              <span className="font-black">
                {membershipTiers[selectedTier].name} Membership
              </span>
            </p>

            <p className="my-10 text-xl text-gray-600 max-w-sm mx-auto">
              {membershipTiers[selectedTier].benefits}
            </p>
          </div>

          {/* Membership Tier Icons */}
          <div className="flex justify-center space-x-3 mt-6">
            {Object.keys(membershipTiers).map((tier) => (
              <BsFillHexagonFill
                key={tier}
                className={`text-6xl cursor-pointer transition-transform hover:scale-105 ${membershipTiers[tier].color} `}
                onClick={() => handleTierClick(tier)}
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="membership-status flex flex-col items-center justify-center space-y-4 w-1/2">
          <BsFillHexagonFill
            className={`text-7xl ${membershipTiers[currentTier].color}`}
          />
          <p className="text-2xl font-bold text-gray-800">
            {currentPoints} wyPoint
          </p>
          {currentTier !== "Diamond" ? (
            <p className="text-sm text-gray-500">
              You need {pointsToNextTier()} wyPoint to upgrade
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              You have reached the top tier!
            </p>
          )}

          {/* Progress Bar */}
          <progress
            className="progress progress-warning w-56"
            value={calculateProgress()}
            max="100"
          ></progress>

          {/* wyPoint History Link */}
          <button className=" mt-2 btn btn-neutral">wyPoint history</button>
        </div>
      </div>
    </div>
  );
};

export default MemberShipPage;
