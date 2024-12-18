import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../service/config";
import { IoIosStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import useScrollToTop from "../service/useScrollToTop";
import MapComponent from "./MapComponent";
import { PiHeartDuotone } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const SelectedLocation = () => {
  useScrollToTop();
  const { id } = useParams();
  const [location, setLocation] = useState([]);
  const [roomNum, setroomNum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`)
      .then((res) => {
        setroomNum(res.data.content.length), setLocation(res.data.content);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   console.log(roomNum);
  // }, [roomNum]);

  return (
    <section id="selectedLocation">
      <div className="xl:plx-6 py-20 pb-0">
        {/* CONTENT */}
        <div className="contentContainer relative grid grid-cols-2 overflow-y-scroll border-t border-t-gray-300">
          <div className="mx-6 pb-6">
            <div>
              <p className="roomNumbers py-6">
                There are {roomNum} rooms that fit your criterias
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2">
              {location?.map((item, index) => (
                <div key={index}>
                  <div className="locationItem flex flex-col gap-3">
                    <Swiper
                      navigation={true}
                      pagination={true}
                      modules={[Pagination, Navigation]}
                    >
                      <SwiperSlide className="h-80">
                        <div className="relative h-full">
                          <div
                            className="h-full"
                            onClick={() => navigate(`/location/detail/${id} `)}
                          >
                            <img
                              className="h-full w-full rounded-lg object-cover object-center"
                              src={item.hinhAnh}
                              alt=""
                            />
                            <div>
                              <div className="absolute right-3 top-3">
                                <button>
                                  <PiHeartDuotone className="block h-6 w-6 text-white hover:scale-110" />
                                </button>
                              </div>
                              <div className="absolute left-3 top-3">
                                <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                                  Guest favorite
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="h-80">
                        <div className="relative h-full">
                          <div className="h-full">
                            <img
                              className="h-full w-full rounded-lg object-cover object-center"
                              src={item.hinhAnh}
                              alt=""
                            />
                            <div>
                              <div className="absolute right-3 top-3">
                                <button>
                                  <PiHeartDuotone className="block h-6 w-6 text-white hover:scale-110" />
                                </button>
                              </div>
                              <div className="absolute left-3 top-3">
                                <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                                  Guest favorite
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="h-80">
                        <div className="relative h-full">
                          <div className="h-full">
                            <img
                              className="h-full w-full rounded-lg object-cover object-center"
                              src={item.hinhAnh}
                              alt=""
                            />
                            <div>
                              <div className="absolute right-3 top-3">
                                <button>
                                  <PiHeartDuotone className="block h-6 w-6 text-white hover:scale-110" />
                                </button>
                              </div>
                              <div className="absolute left-3 top-3">
                                <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                                  Guest favorite
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="h-80">
                        <div className="relative h-full">
                          <div className="h-full">
                            <img
                              className="h-full w-full rounded-lg object-cover object-center"
                              src={item.hinhAnh}
                              alt=""
                            />
                            <div>
                              <div className="absolute right-3 top-3">
                                <button>
                                  <PiHeartDuotone className="block h-6 w-6 text-white hover:scale-110" />
                                </button>
                              </div>
                              <div className="absolute left-3 top-3">
                                <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                                  Guest favorite
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="h-80">
                        <div className="relative h-full">
                          <div className="h-full">
                            <img
                              className="h-full w-full rounded-lg object-cover object-center"
                              src={item.hinhAnh}
                              alt=""
                            />
                            <div>
                              <div className="absolute right-3 top-3">
                                <button>
                                  <PiHeartDuotone className="block h-6 w-6 text-white hover:scale-110" />
                                </button>
                              </div>
                              <div className="absolute left-3 top-3">
                                <span className="rounded-xl bg-white p-1 px-2 font-semibold shadow-lg">
                                  Guest favorite
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                    {/* IMAGE */}
                    {/* DESCRIPTION */}
                    <div className="grid grid-cols-[80%_15%] justify-between gap-3 text-sm">
                      {/* LEFT DESCRIPTION */}
                      <div className="max-w-56 md:max-w-full">
                        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold">
                          {item.tenPhong}
                        </p>
                        <div className="text-gray-500">
                          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {item.moTa}
                          </p>
                          <p>{item.giuong} bed</p>
                          <p>Aug.11-16</p>
                          <p className="font-semibold text-black">
                            ${item.giaTien} night
                          </p>
                        </div>
                      </div>
                      {/* RIGHT DESCRIPTION */}
                      <div>
                        <span className="flex items-baseline justify-end">
                          <span>
                            <IoIosStar className="mr-1 block h-3 w-3" />
                          </span>
                          <span>4.5</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mapContainer top-0 z-0">
            <MapComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedLocation;
