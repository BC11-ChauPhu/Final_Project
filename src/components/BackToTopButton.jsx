import React from "react";
import { PiArrowFatUpFill } from "react-icons/pi";

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className="fixed bottom-0 right-0 mb-8 mr-7 hidden md:block"
      onClick={() => scrollToTop()}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg border bg-brand text-white">
        <PiArrowFatUpFill className="text-xl" />
      </div>
    </div>
  );
};

export default BackToTopButton;
