import React, { useState, useEffect } from "react";
import { http } from "../service/config";
import { IoIosStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useScrollToTop from "../service/useScrollToTop";

const NearbyLocation = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [locations, setLocation] = useState([]);
  useEffect(() => {
    http
      .get("/api/vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then((res) => {
        setLocation(res.data.content.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section id="nearbyLocation" className="block">
      <div className="container mx-auto mt-10 px-6 lg:mb-10">
        <div className="mb-10">
          <h1 className="text-center text-3xl font-bold md:text-left">
            Discover nearby destinations
          </h1>
        </div>
        <div className="grid space-y-6 md:grid-cols-2 md:gap-6 md:gap-y-10 md:space-y-0 lg:grid-cols-3 xl:grid-cols-4">
          {locations?.map((item, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="relative md:h-96 lg:h-full">
                  <div
                    className="h-full"
                    onClick={() => {
                      navigate(`/location/selectedLocation/${item.id}`);
                    }}
                  >
                    <img
                      className="rounded-lg md:h-full md:w-full"
                      src={item.hinhAnh}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="absolute right-3 top-3">
                      <button className="rounded-lg bg-white/80 p-3 transition-all duration-500 hover:bg-white">
                        <FaHeart className="block h-6 w-6 text-brand" />
                      </button>
                    </div>
                  </div>
                </div>
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
