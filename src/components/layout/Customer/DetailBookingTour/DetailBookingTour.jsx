import React from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const DetailBookingTour = ({
  references,
  steps = [],
  className = "fixed bottom-4 left-4 z-50",
}) => {
  const defaultSteps = [
    {
      element: references.progressBarRef?.current,
      popover: {
        title: "Booking Progress",
        description:
          "This bar shows the current status of your booking, from confirmation to completion.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: references.timelineRef?.current,
      popover: {
        title: "Booking Timeline",
        description:
          "View the complete history of your booking, including all status changes and important events.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: references.detailsRef?.current,
      popover: {
        title: "Booking Details",
        description:
          "Here you can find all the important information about your booking, including dates, workspace, and current status.",
        side: "left",
        align: "start",
      },
    },
    {
      element: references.amenitiesRef?.current,
      popover: {
        title: "Amenities",
        description:
          "View all the additional amenities included in your booking.",
        side: "right",
        align: "start",
      },
    },
    {
      element: references.priceBreakdownRef?.current,
      popover: {
        title: "Price Breakdown",
        description:
          "See a detailed breakdown of all charges associated with your booking.",
        side: "top",
        align: "start",
      },
    },
  ];

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: steps.length > 0 ? steps : defaultSteps,
      nextBtnText: "Next",
      prevBtnText: "Previous",
      doneBtnText: "Done",
      onHighlighted: (element) => {
        element.style.transition = "all 0.3s ease-in-out";
      },
      onDeselected: (element) => {
        element.style.transition = "all 0.3s ease-in-out";
      },
    });

    driverObj.drive();
  };

  return (
    <div className={className}>
      <button
        onClick={startTour}
        className="bg-amber-600 hover:bg-amber-00 text-white rounded-full p-3 flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105"
        aria-label="Start Tour Guide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
          />
        </svg>
        <span className="mr-1">Tour Guide</span>
      </button>
    </div>
  );
};

export default DetailBookingTour;
