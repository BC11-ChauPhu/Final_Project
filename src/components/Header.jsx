import React, { useEffect, useState } from "react";
import { FaAirbnb } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../service/AuthContext.jsx";
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
        className="fixed left-0 top-0 z-[1] w-screen bg-transparent px-6 py-1 transition-all duration-500 md:border md:border-b-gray-300 md:bg-white"
      >
        <div className="container relative sm:max-w-full md:mx-auto md:max-w-7xl">
          <div className="flex items-center justify-between">
            <div
              className="flex cursor-pointer items-center py-2 text-[#FF385C]"
              onClick={() => navigate(`/`)}
            >
              <FaAirbnb className="text-4xl" />
              <span className="font-bold">airbnb</span>
            </div>
            <div className="hidden space-x-6 text-gray-600 md:flex">
              <NavLink
                className="transition-all duration-500 hover:text-black"
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
              <NavLink
                className="transition-all duration-500 hover:text-black"
                to="/"
              >
                Online Experiences
              </NavLink>
            </div>
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
            {/* SMALL SCREEN MENU */}
            <div className="flex items-center md:hidden">
              <button
                id="menu-btn"
                className="hamburger block focus:outline-none md:hidden"
                onClick={() => {
                  document.querySelector("#menu-btn").classList.toggle("open");
                  document.querySelector("#menu").classList.toggle("flex");
                  document.querySelector("#menu").classList.toggle("hidden");
                }}
              >
                <span className="hamburger-top"></span>
                <span className="hamburger-middle"></span>
                <span className="hamburger-bottom"></span>
              </button>
            </div>
          </div>
        </div>
        {/* SMALL SCREEN POPUP */}
        <div className="md:hidden">
          <div
            id="menu"
            className="absolute left-6 right-6 hidden w-auto flex-col items-center space-y-6 self-center rounded-l border border-gray-300 bg-white py-8 font-bold text-black drop-shadow-md transition-all duration-300 md:mt-10 md:hidden md:self-end"
          >
            <div className="items-centers flex w-full flex-col space-y-6 border-b border-gray-300 pb-6 text-center">
              {isAuthenciated ? (
                <>
                  <button onClick={goToUser}>Profile</button>
                  <button onClick={logout}>Logout</button>
                </>
              ) : (
                <>
                  <NavLink to="/sign-in">Sign In</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}
            </div>
            <NavLink to="/">Locations</NavLink>
            <NavLink to="/">Experiences</NavLink>
            <NavLink to="/">Online Experiences</NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
