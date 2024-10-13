import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../service/config";
import { IoIosStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import useScrollToTop from "../service/useScrollToTop";

const SelectedLocation = () => {
  useScrollToTop();
  const { id } = useParams();
  const [location, setLocation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${id}`)
      .then((res) => setLocation(res.data.content))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  return (
    <section>
      <div className="mx-auto px-6 py-20 lg:max-w-[1280px]">
        <div className="py-8">
          <p className="text-center text-xl font-semibold md:text-2xl">
            Selected location
          </p>
        </div>
        {/* CONTENT */}
        <div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {location?.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/location/detail/${id} `)}
              >
                <div className="flex flex-col gap-3">
                  {/* IMAGE */}
                  <div className="relative h-56">
                    <div className="h-full">
                      <img
                        className="h-full w-full rounded-lg"
                        src={item.hinhAnh}
                        alt=""
                      />
                      <div>
                        <div className="absolute right-3 top-3">
                          <button className="rounded-lg bg-white/80 p-3 transition-all duration-500 hover:bg-white">
                            <FaHeart className="block h-6 w-6 text-brand" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                        <p>${item.giaTien}/night</p>
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
      </div>
    </section>
  );
};

export default SelectedLocation;
