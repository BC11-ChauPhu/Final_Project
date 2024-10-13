import React, { useEffect, useState } from "react";
import { http } from "../service/config";
import bannerBg from "../assets/img/banner.png";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import SearchResultList from "./SearchResultList";
import SearchResultMedium from "./SearchResultMedium";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../service/useScrollToTop";
import Calendar from "./Calendar";

const Banner = () => {
  useScrollToTop();
  const [input, setInput] = useState("");
  const [filteredList, setfilteredList] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const navigate = useNavigate();

  const fetchData = (value) =>
    http
      .get("/api/vi-tri")
      .then((res) => {
        const result = res.data.content.filter((item) => {
          return (
            value &&
            item &&
            item.tenViTri &&
            item.tenViTri.toLowerCase().includes(value)
          );
        });
        setfilteredList(result);
      })
      .catch((err) => {
        console.log(err);
      });

  const handleShowResults = (value) => {
    setShowResults(value.trim().length > 0);
  };

  const handleLocationSelect = (tenViTri, tinhThanh, quocGia, id) => {
    const locationString = `${tenViTri}, ${tinhThanh}, ${quocGia},`;
    setInput(locationString);
    setSelectedLocation({ tenViTri, tinhThanh, quocGia, id });
    setShowResults(false);
  };

  const handleChange = (value) => (
    setInput(value), fetchData(value), handleShowResults(value)
  );

  // useEffect(() => {
  //   console.log(selectedLocation);
  // }, [selectedLocation]);
  //
  return (
    <section id="banner" className="block h-[400px]">
      <div className="container relative h-96 max-w-full p-6 md:mx-auto md:max-w-7xl">
        {/* SMALL SEARCHBAR */}
        <div className="mx-auto mt-20 h-14 max-w-md rounded-full bg-white shadow-xl transition-all duration-500 hover:bg-gray-200 md:hidden">
          <div
            className="grid h-full"
            onClick={() => {
              const nearbyLocation = document.getElementById("nearbyLocation");
              const popupLocation = document.getElementById("popup-location");
              const header = document.getElementById("header");
              const staticLocale = document.getElementById("staticLocale");
              const footer = document.getElementById("footer");
              if (nearbyLocation) nearbyLocation.classList.toggle("hidden");
              if (popupLocation) {
                popupLocation.classList.toggle("hidden");
                popupLocation.classList.toggle("flex");
              }
              if (header) header.classList.toggle("hidden");
              if (staticLocale) staticLocale.classList.toggle("hidden");
              if (footer) footer.classList.toggle("hidden");
            }}
          >
            <div className="grid grid-cols-6 items-center">
              <span>
                <FaMagnifyingGlass className="mx-auto text-xl" />
              </span>
              <span className="col-span-5 grid items-center">
                <div className="text-sm font-semibold">Where to?</div>
                <div className="text-[12px] text-gray-400">
                  <span>Choose your destination</span>
                </div>
              </span>
            </div>
          </div>
        </div>
        {/* MEDIUM SEARCHBAR */}
        <div className="borde relative mx-auto mt-20 hidden h-[66px] md:block lg:w-[70%]">
          {/* SEARCH FORM */}
          <div className="dropshadow-xl relative flex rounded-full border border-gray-300">
            <div className="w-1/3 border-brand">
              <div className="bannerSeachLocale flex h-full md:w-full">
                <label
                  htmlFor=""
                  className="rounded-bl-full rounded-tl-full border-black bg-white px-8 py-4 transition-all duration-500 hover:bg-gray-200 md:w-full"
                >
                  <div className="flex w-full flex-col items-center justify-start">
                    <div className="w-full text-left text-xs font-semibold">
                      Where
                    </div>
                    <input
                      id="mediumSearchBar"
                      type="search"
                      placeholder="Search destinations"
                      className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm outline-none focus-visible:outline-none md:placeholder:h-[18px]"
                      value={input}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center bg-white">
              <div className="h-8 self-center border-r border-r-gray-300"></div>
            </div>
            <div className="flex w-1/3">
              <div className="flex h-full w-1/2">
                <div className="w-full bg-white px-6 py-4 transition-all duration-500 hover:bg-gray-200">
                  <div className="text-xs font-semibold">Check in</div>
                  <div className="text-sm text-gray-400">Add dates</div>
                </div>
              </div>
              <div className="flex items-center bg-white">
                <div className="h-8 border-r border-r-gray-300"></div>
              </div>
              <div className="flex h-full w-1/2">
                <div className="w-full bg-white px-6 py-4 transition-all duration-500 hover:bg-gray-200">
                  <div className="text-xs font-semibold">Check out</div>
                  <div className="text-sm text-gray-400">Add dates</div>
                </div>
              </div>
            </div>
            <div className="flex items-center bg-white">
              <div className="h-8 border-r border-r-gray-300"></div>
            </div>
            <div className="flex w-1/3 items-center justify-between rounded-br-full rounded-tr-full bg-white">
              <div>
                <div className="w-full">
                  <div className="px-6 py-4">
                    <div className="w-full text-xs font-semibold">Who</div>
                    <div className="w-full text-sm text-gray-400">
                      Add guests
                    </div>
                  </div>
                </div>
              </div>
              <div className="pr-2">
                <div
                  onClick={() =>
                    navigate(`location/selectedLocation/${selectedLocation.id}`)
                  }
                >
                  <button className="rounded-full bg-brand p-3 text-white">
                    <div>
                      <FaMagnifyingGlass className="block h-4 w-4 stroke-[4px]" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
            {showResults && (
              <SearchResultMedium
                filteredList={filteredList}
                onLocationSelect={handleLocationSelect}
              />
            )}
            {/* CALENDAR */}
            <Calendar />
          </div>
        </div>
      </div>
      {/* POPUP SEARCH FOR SMALL SCREEN */}
      <div
        id="popup-location"
        className="small-popup fixed top-0 z-[2] hidden h-screen w-screen flex-col overflow-y-auto bg-white transition-all duration-500"
      >
        {/* CLOSE BUTTON */}
        <div className="z-[2] px-5 py-3">
          <IoClose
            onClick={() => {
              const nearbyLocation = document.getElementById("nearbyLocation");
              const popupLocation = document.getElementById("popup-location");
              const header = document.getElementById("header");
              const staticLocale = document.getElementById("staticLocale");
              const footer = document.getElementById("footer");
              if (nearbyLocation) nearbyLocation.classList.toggle("hidden");
              if (popupLocation) {
                popupLocation.classList.toggle("hidden");
                popupLocation.classList.toggle("flex");
              }
              if (header) header.classList.toggle("hidden");
              if (staticLocale) staticLocale.classList.toggle("hidden");
              if (footer) footer.classList.toggle("hidden");
            }}
            className="rounded-full border border-gray-300 p-1 text-3xl"
          />
        </div>
        {/* SEARCH FORM */}
        <div className="mx-3 mt-4 rounded-3xl border border-gray-300 p-6 shadow-lg">
          <div>
            <span className="text-xl font-bold">Where to?</span>
          </div>
          <div className="flex max-h-[415px] flex-col justify-between space-y-6">
            <button className="mt-5 max-w-full rounded-lg border border-gray-500">
              <form>
                <div>
                  <label
                    htmlFor=""
                    className="flex h-14 items-center justify-between space-x-4 px-5"
                  >
                    <div className="flex h-full items-center">
                      <FaMagnifyingGlass />
                    </div>
                    <input
                      type="search"
                      placeholder="Search destinations"
                      className="h-full w-full overflow-hidden overflow-ellipsis whitespace-nowrap outline-none focus-visible:outline-none"
                      value={input}
                      onChange={(e) => handleChange(e.target.value)}
                    />
                  </label>
                </div>
              </form>
            </button>
            {/* SEARCH RESULT */}
            {showResults && (
              <SearchResultList
                filteredList={filteredList}
                onLocationSelect={handleLocationSelect}
              />
            )}
          </div>
        </div>
        {/* SEARCH BUTTON */}
        <div className="px-6 py-2">
          <div>
            <button
              className="inline-block rounded-lg bg-brand px-[24px] py-[14px] text-white"
              onClick={() =>
                navigate(`location/selectedLocation/${selectedLocation.id}`)
              }
            >
              <div className="flex items-center gap-x-2">
                <span>
                  <FaMagnifyingGlass />
                </span>
                <span>Search</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
