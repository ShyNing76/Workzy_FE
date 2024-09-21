import React from "react";

const Accordion = (props) => {
  const { qs, ans } = props;
  return (
    <>
      <div className="collapse collapse-arrow join-item border-base-300 border">
        <input type="radio" name="my-accordion-4" />
        <div className="collapse-title text-xl font-medium">{qs}</div>
        <div className="collapse-content">
          <p>{ans}</p>
        </div>
      </div>
    </>
  );
};

export default Accordion;
