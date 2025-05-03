import React, { useEffect, useState } from "react";
import { http } from "../service/config";
import { useNavigate } from "react-router-dom";

const UserMainComponent = ({ userData }) => {
  const [room, setRoom] = useState([]);
  const [roomInfo, setRoomInfo] = useState([]);
  const navgiate = useNavigate();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await http.get(
          `/api/dat-phong/lay-theo-nguoi-dung/${userData.id}`,
        );
        setRoom(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getRoom();
  }, [userData.id]);

  useEffect(() => {
    if (room.length > 0) {
      const getRoomInfo = async () => {
        try {
          const request = room.map((r) =>
            http.get(`/api/phong-thue/${r.maPhong}`),
          );
          const response = await Promise.all(request);
          const roomInfoData = response.map((res) => res.data.content);
          setRoomInfo(roomInfoData);
        } catch (err) {
          console.log(err);
        }
      };
      getRoomInfo();
    }
  }, [room]);

  // useEffect(() => {
  //   console.log(roomInfo);
  // }, [roomInfo]);

  return (
    <div className="relative z-[-1] md:w-[60%] lg:w-[70%]">
      <div className="text-center md:text-left">
        {/* TITLE */}
        <div>
          <h1 className="py-8 text-3xl font-semibold md:pb-8 md:pt-0">
            Rented rooms
          </h1>
        </div>
        {/* CONTENT */}
        <div className="grid gap-4 text-sm lg:text-base">
          {roomInfo.map((item, index) => (
            <div key={item.index}>
              <div className="relative flex flex-col gap-3 lg:flex-row">
                {/* IMG */}
                <div
                  className="relative max-h-56 lg:max-h-full lg:w-1/2"
                  onClick={() => {
                    navgiate(`/location/detail/${item.id}`);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      navgiate(`/location/detail/${item.id}`);
                    }
                  }}
                >
                  <div className="h-full">
                    <img
                      src={item.hinhAnh}
                      alt=""
                      className="h-full w-full rounded-lg"
                    />
                  </div>
                </div>
                {/* TEXT */}
                <div className="flex max-w-[272px] flex-col text-left md:max-w-full lg:w-1/2">
                  <p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold lg:overflow-clip lg:whitespace-normal lg:pb-4">
                    {item.tenPhong}
                  </p>
                  <div className="text-gray-500">
                    <p className="max-w-[272px] overflow-hidden overflow-ellipsis whitespace-nowrap lg:max-w-full lg:whitespace-normal">
                      {item.moTa}
                    </p>
                    <p>{item.giuong} beds</p>
                    <p>{item.phongTam} bahthrooms</p>
                    <p className="lg:absolute lg:bottom-0 lg:right-0 lg:font-bold lg:text-black">
                      ${item.giaTien}/night
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserMainComponent;
