import React, { useEffect, useState } from "react";
import { BsFillHexagonFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { getPointOfCustomer } from "../../../config/api";

const MembershipPage = () => {
  const tierPoints = {
    Bronze: 0,
    Silver: 5000,
    Gold: 10000,
    Emerald: 20000,
    Diamond: 40000,
  };

  const [currentPoints, setCurrentPoints] = useState(0);
  const [selectedTier, setSelectedTier] = useState("Bronze");
  const [currentTier, setCurrentTier] = useState("Bronze");
  const [isHovering, setIsHovering] = useState(null);
  const [hoverTier, setHoverTier] = useState(null);

  const membershipTiers = {
    Bronze: {
      name: "Bronze",
      benefits: "Basic offer for new members. ",
      color: "#f59e0b", //text-amber-500
      bgGradient: "from-amber-200 to-amber-100",
    },
    Silver: {
      name: "Silver",
      benefits:
        "Special offer for Silver members. 5% discount on room rental services.",
      color: " #9ca3af", //text-gray-400
      bgGradient: "from-gray-200 to-gray-100",
    },
    Gold: {
      name: "Gold",
      benefits:
        "Premium offer for Gold members. 10% discount on room rental services.",
      color: "#facc15 ", //text-yellow-400
      bgGradient: "from-yellow-200 to-yellow-100",
    },
    Emerald: {
      name: "Emerald",
      benefits:
        "Special offer for Emerald members. 15% discount on room rental services.",
      color: "#10b981", //text-emerald-500
      bgGradient: "from-emerald-200 to-emerald-100",
    },
    Diamond: {
      name: "Diamond",
      benefits:
        "Highest offer for Diamond members. 20% discount on room rental services.",
      color: "#60a5fa ", //text-blue-400
      bgGradient: "from-blue-200 to-blue-100",
    },
  };

  const handleTierClick = (tier) => {
    setSelectedTier(tier);
  };

  useEffect(() => {
    const determineTier = () => {
      if (currentPoints >= tierPoints.Diamond) {
        setCurrentTier("Diamond");
        setSelectedTier("Diamond");
      } else if (currentPoints >= tierPoints.Emerald) {
        setCurrentTier("Emerald");
        setSelectedTier("Emerald");
      } else if (currentPoints >= tierPoints.Gold) {
        setCurrentTier("Gold");
        setSelectedTier("Gold");
      } else if (currentPoints >= tierPoints.Silver) {
        setCurrentTier("Silver");
        setSelectedTier("Silver");
      } else {
        setCurrentTier("Bronze");
        setSelectedTier("Bronze");
      }
    };
    determineTier();
  }, [currentPoints]);

  useEffect(() => {
    const fetchPointCustomer = async () => {
      try {
        const res = await getPointOfCustomer();
        if (res && res.data && res.err === 0) {
          setCurrentPoints(res.data);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };
    fetchPointCustomer();
  }, []);

  const calculateProgress = () => {
    if (currentTier === "Diamond") return 100;
    const tierStartPoints = tierPoints[currentTier];
    const nextTier =
      Object.keys(tierPoints)[Object.keys(tierPoints).indexOf(currentTier) + 1];
    const nextTierPoints = tierPoints[nextTier] || tierPoints.Diamond;
    return (
      ((currentPoints - tierStartPoints) / (nextTierPoints - tierStartPoints)) *
      100
    );
  };

  const pointsToNextTier = () => {
    if (currentTier === "Diamond") return null;
    const nextTier =
      Object.keys(tierPoints)[Object.keys(tierPoints).indexOf(currentTier) + 1];
    const nextTierPoints = tierPoints[nextTier] || tierPoints.Diamond;
    return nextTierPoints - currentPoints;
  };

  return (
    <div className="max-w-5xl container mx-auto my-12">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div
          className={`p-6 bg-gradient-to-r ${membershipTiers[currentTier].bgGradient}`}
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Membership Status
          </h2>
          <p className="text-gray-600 mt-2">
            Discover your exclusive benefits and rewards
          </p>
        </div>

        <div className="p-8 flex flex-col lg:flex-row gap-12">
          {/* Left Section - Current Status */}
          <div className="flex-1 space-y-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <BsFillHexagonFill
                  className={`text-8xl mx-auto`}
                  style={{
                    color: `${membershipTiers[currentTier].color}`,
                  }}
                />
              </motion.div>
              <h3 className="text-2xl font-bold mt-4">
                {membershipTiers[currentTier].name} Member
              </h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">
                {currentPoints.toLocaleString()} wyPoint
              </p>
            </div>

            {/* Progress Section */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{currentPoints.toLocaleString()} points</span>
                <span>
                  {currentTier !== "Diamond"
                    ? `${tierPoints[
                        Object.keys(tierPoints)[
                          Object.keys(tierPoints).indexOf(currentTier) + 1
                        ]
                      ].toLocaleString()} points`
                    : "Max Level"}
                </span>
              </div>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full `}
                  style={{
                    backgroundColor: `${membershipTiers[currentTier].color}`,
                  }}
                />
              </div>
              {currentTier !== "Diamond" && (
                <p className="text-center text-sm text-gray-600">
                  {pointsToNextTier()?.toLocaleString()} points needed for next
                  tier
                </p>
              )}
            </div>
          </div>

          {/* Right Section - Tiers */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-6">Membership Tiers</h3>
            <div className="space-y-4">
              {Object.entries(membershipTiers).map(([tier, info]) => (
                <motion.div
                  key={tier}
                  className={`p-4 rounded-lg cursor-pointer transition-all
                    ${
                      selectedTier === tier
                        ? `bg-gradient-to-r ${info.bgGradient}`
                        : "bg-gray-50"
                    }
                    hover:${
                      hoverTier === tier
                        ? `shadow-md bg-gradient-to-r ${info.bgGradient}`
                        : "bg-gray-50"
                    }`}
                  // onClick={() => handleTierClick(tier)}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => {
                    setIsHovering(tier);
                    setHoverTier(tier);
                  }}
                  onHoverEnd={() => {
                    setIsHovering(null);
                    setHoverTier(null);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <BsFillHexagonFill
                      className={`text-2xl`}
                      style={{
                        color: `${info.color}`,
                      }}
                    />
                    <div>
                      <h4 className="font-semibold">{info.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {info.benefits}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
