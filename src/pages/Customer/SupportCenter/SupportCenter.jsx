import React from "react";

const SupportCenter = () => {
  return (
    <div className="max-w-5xl container mx-auto my-24 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-neutral mb-8 text-left">
        Support Center
      </h2>
      <div className="bg-base-100 h-96 rounded-lg flex justify-between items-center">
        {/* Left Section */}
        <div className="membership-info w-1/2">
          {/* Smaller content and centered under h2 */}
          {/* <div className="text-center">
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
          </div> */}

          {/* Membership Tier Icons */}
          {/* <div className="flex justify-center space-x-3 mt-6">
            {Object.keys(membershipTiers).map((tier) => (
              <BsFillHexagonFill
                key={tier}
                className={`text-6xl cursor-pointer transition-transform hover:scale-105 ${membershipTiers[tier].color} `}
                onClick={() => handleTierClick(tier)}
              />
            ))}
          </div> */}
        </div>

        {/* Right Section */}
        <div className="membership-status flex flex-col items-center justify-center space-y-4">
          {/* <BsFillHexagonFill
            className={`text-7xl ${membershipTiers[currentTier].color}`}
          />
          <p className="text-2xl font-bold text-gray-800">
            {currentPoints} wyPoint
          </p>
          <p className="text-sm text-gray-500">
            You need to have {requiredPoints - currentPoints} wyPoint to upgrade
          </p> */}

          {/* Progress Bar */}
          {/* <progress
            className="progress progress-warning w-56"
            value={currentPoints}
            max={requiredPoints}
          ></progress> */}

          {/* wyPoint History Link */}
          {/* <button className=" mt-2 btn btn-neutral">wyPoint history</button> */}
        </div>
      </div>
    </div>
  );
};

export default SupportCenter;
