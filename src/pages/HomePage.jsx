import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import NearbyLocation from "../components/NearbyLocation";
import StaticLocale from "../components/StaticLocale";
import IconRow from "../components/IconRow";

const HomePage = ({ showPopUpSearch, togglePopUp }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Banner onClickToggle={togglePopUp} showPopUpSearch={showPopUpSearch} />
      {!showPopUpSearch && <NearbyLocation />}
      {!showPopUpSearch && <StaticLocale />}
    </>
  );
};

export default HomePage;
