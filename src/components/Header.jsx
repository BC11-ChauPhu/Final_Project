import React, { useEffect, useState } from "react";
import { FaAirbnb, FaChevronLeft } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../service/AuthContext.jsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import useScrollToTop from "../service/useScrollToTop.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setActiveIndex } from "../features/smallHeaderAcitve/smallHeaderActiveSlice.js";
import { LuShare } from "react-icons/lu";

const Header = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenciated, logout } = useAuth();
  const [isLocationDetail, setIslocationDetail] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isSelectedLocation, setIsSelectedLocation] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);
  const activeIndex = useSelector(
    (state) => state.smallHeaderAcitve.activeIndex,
  );

  const handleItemClick = (index, path) => {
    dispatch(setActiveIndex(index));
    navigate(path);
  };

  const scrollHeader = () => {
    if (document.documentElement.scrollTop > 10) {
      setActiveHeader(true);
    } else {
      setActiveHeader(false);
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
    const mediaQuery = window.matchMedia("(max-width: 425px)");
    const handleSceenChange = (e) => setIsSmallScreen(e.matches);

    handleSceenChange(mediaQuery);
    mediaQuery.addEventListener("change", handleSceenChange);

    return () => mediaQuery.removeEventListener("change", handleSceenChange);
  }, []);

  useEffect(() => {
    const handleScreenSize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("location/detail/")) {
      setIslocationDetail(true);
    } else {
      setIslocationDetail(false);
    }
  });

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
  });

  useEffect(() => {
    if (location.pathname.includes("/selectedLocation")) {
      setIsSelectedLocation(true);
    } else {
      setIsSelectedLocation(false);
    }
  }, [location]);

  return (
    <>
      {!isLocationDetail && (
        <nav
          className={`header ${activeHeader ? "active" : ""} fixed bottom-0 left-0 z-[1] flex w-full items-center border border-t-gray-300 bg-white transition-all duration-500 md:bottom-auto md:top-0 xl:px-20`}
        >
          <div className="relative w-full">
            {/* MEDIUM HEADER */}
            <div className="flex items-center md:justify-between">
              {/* LOGO */}
              <div
                id="headerLogo"
                className="hidden cursor-pointer items-center py-2 text-3xl text-brand md:flex"
                onClick={() => navigate(`/`)}
              >
                <FaAirbnb className="mr-1 h-8 w-8" />
                <span className="text-2xl font-bold">airbnb</span>
              </div>
              <div className="hidden justify-center gap-4 text-gray-600 md:flex">
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
              <div
                id="headerRight"
                className="relative flex items-center justify-end gap-4"
              >
                <p className="hidden text-sm font-semibold md:block">
                  Airbnb your home
                </p>
                <span className="hidden text-xl font-semibold md:block">
                  <CiGlobe />
                </span>
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
                  className="absolute right-0 mt-40 hidden rounded-lg bg-white py-2"
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
            </div>
            {/* SMALL HEADER */}
            {!isLocationDetail && (
              <div
                className={`flex items-center justify-center gap-11 text-gray-400 md:hidden`}
              >
                <div
                  className={`sHeaderItem grid ${activeIndex === 0 ? "active" : ""}`}
                  onClick={() => handleItemClick(0, "/")}
                >
                  <p className="grid justify-center">
                    <FaMagnifyingGlass className="text-2xl" />
                  </p>
                  <p className="text-xs">Explore</p>
                </div>
                <div
                  className={`sHeaderItem grid ${activeIndex === 1 ? "active" : ""}`}
                  onClick={() => handleItemClick(1, "/")}
                >
                  <p className="grid justify-center text-2xl">
                    <FaRegHeart />
                  </p>
                  <p className="text-xs">Wishlist</p>
                </div>
                <div
                  className={`sHeaderItem grid ${activeIndex === 2 ? "active" : ""}`}
                  onClick={() => handleItemClick(2, "/register")}
                >
                  <p className="grid justify-center">
                    <FaRegUserCircle className="text-2xl" />
                  </p>
                  <p className="text-xs">Register</p>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}
      {/* ALTERNATIVE HEADER */}
      {isLocationDetail && (
        <nav
          className={`header ${activeHeader && isMediumScreen ? "active" : ""} absolute left-0 z-[1] flex w-full items-center justify-between bg-transparent transition-all duration-500 md:fixed md:bottom-auto md:top-0 md:bg-white xl:px-20`}
        >
          {/* MEDIUM ALTERNATIVE HEADER */}
          <div className="relative hidden w-full md:block">
            <div className="flex items-center md:justify-between">
              {/* LOGO */}
              <div
                id="headerLogo"
                className="hidden cursor-pointer items-center py-2 text-3xl text-brand md:flex"
                onClick={() => navigate(`/`)}
              >
                <FaAirbnb className="mr-1 h-8 w-8" />
                <span className="text-2xl font-bold">airbnb</span>
              </div>
              <div className="hidden justify-center gap-4 text-gray-600 md:flex">
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
              <div
                id="headerRight"
                className="relative flex items-center justify-end gap-4"
              >
                <p className="hidden text-sm font-semibold md:block">
                  Airbnb your home
                </p>
                <span className="hidden text-xl font-semibold md:block">
                  <CiGlobe />
                </span>
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
                  className="absolute right-0 mt-40 hidden rounded-lg bg-white py-2"
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
            </div>
          </div>
          {/* SMALL ALTERNATIVE HEADER */}
          <div className="w-full p-4 md:hidden">
            <div className="flex justify-between md:hidden">
              {/* LEFT */}
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full border bg-white font-bold text-black drop-shadow-xl"
                onClick={() => navigate(-1)}
              >
                <FaChevronLeft />
              </div>
              {/* RIGHT */}
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-white drop-shadow-xl">
                  <LuShare />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-white drop-shadow-xl">
                  <FaRegHeart />
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
