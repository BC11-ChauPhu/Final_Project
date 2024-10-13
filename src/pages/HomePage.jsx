import React from "react";
import Banner from "../components/Banner";
import NearbyLocation from "../components/NearbyLocation";
import StaticLocale from "../components/StaticLocale";

const HomePage = () => {
  return (
    <>
      <Banner />
      <NearbyLocation />
      <StaticLocale />
    </>
  );
};

export default HomePage;
