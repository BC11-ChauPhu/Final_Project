import React, { useEffect, useState } from "react";
import { http } from "../service/config";
import { IoIosStar } from "react-icons/io";
import defaultUser from "../assets/img/user.jpg";

const LocationComments = ({ localeId, reloadComments }) => {
  const [comment, setComment] = useState([]);
  const fetchData = async () => {
    try {
      const res = await http.get(
        `/api/binh-luan/lay-binh-luan-theo-phong/${localeId}`,
      );
      setComment(res.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [reloadComments]);

  // useEffect(() => {
  //   console.log(comment);
  // }, [comment]);

  return (
    <>
      <div className="mt-6 px-6 text-center text-2xl font-semibold md:mb-10">
        <h1 className="pb-2">What our guests say</h1>
        <p className="text-sm font-normal">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Consequuntur, nisi?
        </p>
      </div>
      <div className="no-scrollbar mx-auto flex overflow-y-hidden overflow-x-scroll px-6 md:grid md:gap-10 md:text-base lg:w-[1280px] lg:grid-cols-2">
        {comment?.map((item) => (
          <div className="mx-2 min-w-64 md:m-0" key={item.id}>
            <div className="my-6 flex h-60 flex-col justify-between rounded-xl border border-gray-300 p-5 shadow-xl md:m-0 md:h-full md:flex-col-reverse md:gap-2 md:border-transparent md:p-0 md:shadow-none">
              {/* COMMENT-TEXT */}
              <div>
                <div className="flex items-center text-xs md:text-sm">
                  <div className="flex">
                    {Array.from({ length: item.saoBinhLuan }, (_, index) => (
                      <span key={index}>
                        <IoIosStar className="h-[9px] w-[9px]" />
                      </span>
                    ))}
                  </div>
                  <div className="px-2"> · </div>
                  <div>{item.ngayBinhLuan}</div>
                </div>
                <div>
                  <p>
                    {item.noiDung
                      ? item.noiDung
                      : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, natus."}
                  </p>
                </div>
              </div>
              {/* AVATAR */}
              <div>
                <div className="flex items-center gap-4">
                  <div
                    className="h-12 min-w-12 rounded-full border border-gray-500 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${item.avatar ? item.avatar : defaultUser})`,
                    }}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold capitalize">
                      {item.tenNguoiBinhLuan}
                    </p>
                    <p className="text-sm">4 months on Airbnb</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LocationComments;
