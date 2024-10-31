import React, { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const RoomDetailTour = () => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: ".booking-detail",
          popover: {
            title: "Workspace Detail",
            description:
              "Detail of the workspace to get more infomation for your booking.",
            side: "bottom",
            align: "start",
          },
        },

        {
          element: ".gallery-contain",
          popover: {
            title: "Workspace Gallery",
            description:
              "Browse through high-quality images of the workspace to get a better view of what to expect.",
            side: "right",
            align: "start",
          },
        },
        {
          element: ".time-booking",
          popover: {
            title: "Available Time Slots",
            description:
              "You can view what time is under booking and choose a right slot to booking workspace.",
            side: "right",
            align: "start",
          },
        },
        {
          element: ".room-descriptions-container",
          popover: {
            title: "Room Description",
            description:
              "Read detailed information about the workspace and its features.",
            side: "right",
            align: "start",
          },
        },
        {
          element: ".room-amenities-container",
          popover: {
            title: "Available Amenities",
            description:
              "Check out all the amenities and facilities available in this workspace.",
            side: "right",
            align: "start",
          },
        },
        {
          element: ".map-building",
          popover: {
            title: "Location",
            description: "View the exact location of the workspace on the map.",
            side: "right",
            align: "start",
          },
        },
        {
          element: ".workspace-review",
          popover: {
            title: "Review",
            description: "See all review of customer had been using this room",
            side: "top",
            align: "start",
          },
        },
        {
          element: ".tabs-lifted",
          popover: {
            title: "Booking Options",
            description:
              "Choose your preferred booking type: Hourly, Daily, or Monthly rates available.",
            side: "left",
            align: "start",
          },
        },
        {
          element: ".custom-date-time-container",
          popover: {
            title: "Select Date & Time",
            description:
              "Pick your preferred date and time slot for your booking.",
            side: "left",
            align: "start",
          },
        },

        {
          element: ".sumary-booking",
          popover: {
            title: "Booking Summary",
            description:
              "Review your booking details, including pricing and duration.",
            side: "left",
            align: "start",
          },
        },
      ],
      nextBtnText: "Next",
      prevBtnText: "Previous",
      doneBtnText: "Done",
      onHighlightStarted: (element) => {
        // Scroll to element if it's not in view
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      },
    });

    // Start the tour
    const startTour = () => {
      driverObj.drive();
    };

    // Add tour trigger button
    const tourButton = document.createElement("button");
    tourButton.className =
      "fixed bottom-4 left-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center space-x-2";
    tourButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>
      <span>Start Tour</span>
    `;
    tourButton.addEventListener("click", startTour);
    document.body.appendChild(tourButton);

    // Cleanup
    return () => {
      driverObj.destroy();
      tourButton.remove();
    };
  }, []);

  return null;
};

export default RoomDetailTour;
