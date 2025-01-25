import React, { useEffect } from "react";
import Banner from "../components/Banner";
import NearbyLocation from "../components/NearbyLocation";
import StaticLocale from "../components/StaticLocale";
import BackToTopButton from "../components/BackToTopButton";

const HomePage = ({ showPopUpSearch, togglePopUp }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Banner onClickToggle={togglePopUp} showPopUpSearch={showPopUpSearch} />
      {!showPopUpSearch && <NearbyLocation />}
      {!showPopUpSearch && <StaticLocale />}
      <BackToTopButton />
    </>
  );
};

export default HomePage;
