import React, { useState } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const HomeTemplate = ({ showPopUpSearch }) => {
  return (
    <>
      {!showPopUpSearch && <Header />}
      <Outlet />
      {!showPopUpSearch && <Footer />}
    </>
  );
};

export default HomeTemplate;
