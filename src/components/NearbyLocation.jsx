import React, { useState, useEffect } from "react";
import { http } from "../service/config";
import { IoIosStar } from "react-icons/io";
import { PiHeartDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../service/useScrollToTop";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const NearbyLocation = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [locations, setLocation] = useState([]);
  useEffect(() => {
    http
      .get("/api/vi-tri")
      .then((res) => {
        console.log(res);
        setLocation(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section id="nearbyLocation" className="block border border-t-gray-200">
      <div className="mx-auto px-6 md:mt-4 lg:mb-10 xl:px-20">
        <h2 className="mb-3 text-center text-3xl font-bold md:text-left">
          Popular locations
        </h2>

        <div className="grid space-y-6 xs:grid-cols-1 md:grid-cols-2 md:gap-6 md:gap-y-10 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6">
          {locations?.map((item, index) => {
            return (
              <div key={index} className="locationItem flex flex-col">
                <Swiper
                  navigation={true}
                  pagination={true}
                  modules={[Pagination, Navigation]}
                >
                  <SwiperSlide>
                    <div className="relative md:h-80 lg:h-64">
                      <div
                        className="h-full"
                        onClick={() => {
                          navigate(`/location/selectedLocation/${item.id}`);
                        }}
                      >
                        <img
                          className="block h-full w-full rounded-lg object-cover"
                          src={item.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="absolute right-3 top-3">
                          <button>
                            <PiHeartDuotone className="block h-6 w-6 text-white hover:scale-110" />
                          </button>
                        </div>
                      </div>
                      <div className="absolute left-3 top-3">
                        <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                          Guest favorite
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative md:h-80 lg:h-64">
                      <div
                        className="h-full"
                        onClick={() => {
                          navigate(`/location/selectedLocation/${item.id}`);
                        }}
                      >
                        <img
                          className="block h-full w-full rounded-lg object-cover"
                          src={item.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="absolute right-3 top-3">
                          <button>
                            <PiHeartDuotone className="block h-6 w-6 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="absolute left-3 top-3">
                        <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                          Guest favorite
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative md:h-80 lg:h-64">
                      <div
                        className="h-full"
                        onClick={() => {
                          navigate(`/location/selectedLocation/${item.id}`);
                        }}
                      >
                        <img
                          className="block h-full w-full rounded-lg object-cover"
                          src={item.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="absolute right-3 top-3">
                          <button>
                            <PiHeartDuotone className="block h-6 w-6 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="absolute left-3 top-3">
                        <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                          Guest favorite
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative md:h-80 lg:h-64">
                      <div
                        className="h-full"
                        onClick={() => {
                          navigate(`/location/selectedLocation/${item.id}`);
                        }}
                      >
                        <img
                          className="block h-full w-full rounded-lg object-cover"
                          src={item.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="absolute right-3 top-3">
                          <button>
                            <PiHeartDuotone className="block h-6 w-6 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="absolute left-3 top-3">
                        <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                          Guest favorite
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="relative md:h-80 lg:h-64">
                      <div
                        className="h-full"
                        onClick={() => {
                          navigate(`/location/selectedLocation/${item.id}`);
                        }}
                      >
                        <img
                          className="block h-full w-full rounded-lg object-cover"
                          src={item.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div>
                        <div className="absolute right-3 top-3">
                          <button>
                            <PiHeartDuotone className="block h-6 w-6 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="absolute left-3 top-3">
                        <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                          Guest favorite
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="mt-2 grid grid-cols-[87%_13%] items-start text-left text-sm">
                  <div>
                    <p className="font-semibold">
                      {item.tenViTri}, {item.tinhThanh}, {item.quocGia}
                    </p>
                    <p className="mt text-gray-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </p>
                  </div>
                  <div>
                    <span className="flex items-baseline justify-between">
                      <span>
                        <IoIosStar className="mr-1 block h-3 w-3" />
                      </span>
                      <span>4.5</span>
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="font-semibold">$100</span> night
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NearbyLocation;
