import React, { useEffect, useState } from "react";
import { FaAirbnb } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../service/AuthContext.jsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import useScrollToTop from "../service/useScrollToTop.jsx";

const Header = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { isAuthenciated, logout } = useAuth();

  const scrollHeader = () => {
    if (document.documentElement.scrollTop > 10) {
      document.getElementById("header").classList.add("active");
    } else {
      document.getElementById("header").classList.remove("active");
    }
  };

  const goToUser = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      navigate(`/profile/user/${userData.id}`);
    } else {
      console.log(`Id not found`);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
  });
  return (
    <>
      <nav
        id="header"
        className="fixed bottom-0 left-0 z-[1] w-screen bg-white px-6 py-2 transition-all duration-500 md:bottom-auto md:top-0 xl:px-20"
      >
        <div className="relative sm:max-w-full md:mx-auto">
          <div className="flex items-center justify-center md:justify-between">
            {/* LOGO */}
            <div
              className="hidden cursor-pointer items-center py-2 text-3xl text-brand md:flex"
              onClick={() => navigate(`/`)}
            >
              <FaAirbnb />
              <span className="text-2xl font-bold">airbnb</span>
            </div>
            <div className="hidden space-x-6 text-gray-600 md:flex">
              <NavLink
                className="links active transition-all duration-500 hover:text-black"
                to="/"
              >
                {" "}
                Stays
              </NavLink>
              <NavLink
                className="transition-all duration-500 hover:text-black"
                to="/"
              >
                Experiences
              </NavLink>
            </div>
            {/* MEDIUM LOG IN BUTTON */}
            <div className="relative">
              <button
                className="text-dark hidden items-center justify-between space-x-3 rounded-full border border-gray-300 bg-white px-2 py-2 font-semibold drop-shadow-lg transition-all duration-500 hover:text-gray-500 hover:drop-shadow-2xl md:flex"
                onClick={() => {
                  const mdPopUp = document.getElementById("mdPopUp");
                  if (mdPopUp) mdPopUp.classList.toggle("hidden");
                }}
              >
                <RxHamburgerMenu />
                <FaUserCircle className="text-3xl" />
              </button>
              <div
                id="mdPopUp"
                className="absolute right-0 mt-2 hidden rounded-lg bg-white py-2 shadow-xl"
              >
                {isAuthenciated ? (
                  <>
                    <div className="px-8 py-2 transition-all hover:bg-gray-200">
                      <button onClick={goToUser}>Profile</button>
                    </div>
                    <div className="px-8 py-2 transition-all hover:bg-gray-200">
                      <button onClick={logout}>Logout</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-8 py-2 transition-all hover:bg-gray-200">
                      <NavLink to="/register">Register</NavLink>
                    </div>
                    <div className="px-8 py-2 transition-all hover:bg-gray-200">
                      <NavLink to="/sign-in">Sign In</NavLink>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* SMALL HEADER BUTTONS */}
            <div className="flex items-center gap-6 text-gray-400 md:hidden">
              <div className="sHeaderItem active grid">
                <p className="grid justify-center">
                  <FaMagnifyingGlass className="text-2xl" />
                </p>
                <p className="text-xs">Explore</p>
              </div>
              <div className="sHeaderItem grid">
                <p className="grid justify-center text-2xl">
                  <FaRegHeart />
                </p>
                <p className="text-xs">Wishlist</p>
              </div>
              <div className="sHeaderItem grid">
                <p className="grid justify-center">
                  <FaRegUserCircle className="text-2xl" />
                </p>
                <p className="text-xs">Log in</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
