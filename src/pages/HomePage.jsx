import React, { useEffect } from "react";
import Banner from "../components/Banner";
import NearbyLocation from "../components/NearbyLocation";
import StaticLocale from "../components/StaticLocale";
import IconRow from "../components/IconRow";
import useScrollToTop from "../service/useScrollToTop";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Banner />
      <IconRow />
      <NearbyLocation />
      <StaticLocale />
    </>
  );
};

export default HomePage;
