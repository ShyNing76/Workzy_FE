import React from "react";

const BookingTab = (props) => {
  const { selectedTab, setSelectedTab } = props;
  const tabs = ["All", "Current", "Upcoming", "Completed", "Canceled"];

  return (
    <div role="tablist" className="tabs tabs-bordered">
      {tabs.map((tab, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            name="booking-tab"
            role="tab"
            className="tab"
            aria-label={tab}
            checked={selectedTab === tab}
            onChange={() => setSelectedTab(tab)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default BookingTab;
