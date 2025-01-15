import React from "react";
import { PiArrowFatUpFill } from "react-icons/pi";

const BackToTopButton = () => {
  return (
    <div className="fixed bottom-0">
      <div>
        <PiArrowFatUpFill />
      </div>
    </div>
  );
};

export default BackToTopButton;
