import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../service/config.js";
import { TbAirConditioning, TbIroning3 } from "react-icons/tb";
import {
  FaBed,
  FaKitchenSet,
  FaPersonSwimming,
  FaSquareParking,
  FaWifi,
} from "react-icons/fa6";
import { GiWashingMachine } from "react-icons/gi";
import { PiTelevision } from "react-icons/pi";
import LocationComments from "./LocationComments.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateSelector from "./DateSelector.jsx";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { useAuth } from "../service/AuthContext.jsx";
import UserComment from "./UserComment.jsx";
import { toast } from "react-toastify";

const LocationDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(0);
  const generateRandomId = () => Math.floor(Math.random() * 10000);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [reloadComments, setReloadComments] = useState(false);
  const { isAuthenciated } = useAuth();

  const triggerReloadComments = () => {
    setReloadComments(!reloadComments);
  };

  const handleReserve = () => {
    const reservation = async () => {
      try {
        const res = await http.post("/api/dat-phong", {
          id: generateRandomId,
          maPhong: room.id,
          ngayDen: startDate,
          ngayDi: endDate,
          soLuongKhach: guests,
          maNguoiDung: userData.id,
        });
        toast.success("Reservation successful", {
          autoClose: 2000,
          position: "top-center",
        });
      } catch (err) {
        console.log(err);
      }
    };
    if (!isAuthenciated) {
      toast.error("You must be logged in to use this future", {
        autoClose: 2000,
        position: "top-center",
      });
    } else if (guests > 0) {
      reservation();
    } else {
      toast.error("There must at least 1 guest", {
        autoClose: 2000,
        position: "top-center",
      });
    }
  };

  const decreaseGuests = () => {
    if (guests > 0) {
      setGuests(guests - 1);
    }
  };

  const increaseGuests = () => {
    setGuests(guests + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get(`/api/phong-thue/${id}`);
        setRoom(res.data.content);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="mb-10">
      {/* IMAGE */}
      <div className="flex flex-col md:flex-col-reverse md:pb-8 md:pt-14 lg:mx-auto lg:w-[1024] xl:w-[1280px]">
        <div className="h-52 md:h-80 md:px-6 lg:h-[489px]">
          <img src={room.hinhAnh} alt="" className="h-full w-full" />
        </div>
        <div className="p-6 pb-3 md:pb-6">
          <h1 className="text-2xl font-semibold">{room.tenPhong}</h1>
        </div>
      </div>
      {/* CONTENT */}
      <div className="relative flex flex-col space-y-4 overflow-y-auto px-6 text-sm md:flex-row md:space-y-0 md:text-base lg:mx-auto lg:w-[1024] xl:w-[1280px]">
        {/* LEFT CONTENT */}
        <div className="flex flex-col space-y-4 md:w-[65%]">
          <div className="flex flex-col">
            <div>
              <h2 className="text-base font-semibold">Available rooms</h2>
              <p className="flex items-center text-gray-500">
                <span>{room.khach} guests </span>
                <span className="mx-1"> · </span>
                <span>{room.phongNgu} bedroom </span>
                <span className="mx-1"> · </span>
                <span>{room.phongTam} bathroom</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="text-xl font-semibold">About this place</p>
            <div>
              <p className="text-base text-gray-700">{room.moTa}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Anemities</h2>
            <div className="flex flex-col">
              {room.banLa && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <TbIroning3 className="mr-4 h-6 w-6" /> Ironing
                  </div>
                </div>
              )}
              {room.bep && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <FaKitchenSet className="mr-4 h-6 w-6" /> Kitchen
                  </div>
                </div>
              )}
              {room.dieuHoa && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <TbAirConditioning className="mr-4 h-6 w-6" /> Air
                    conditioning
                  </div>
                </div>
              )}
              {room.doXe && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <FaSquareParking className="mr-4 h-6 w-6" /> Parking
                  </div>
                </div>
              )}
              {room.hoBoi && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <FaPersonSwimming className="mr-4 h-6 w-6" /> Swimming pool
                  </div>
                </div>
              )}
              {room.mayGiat && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <GiWashingMachine className="mr-4 h-6 w-6" />
                    Washing machine
                  </div>
                </div>
              )}
              {room.tivi && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <PiTelevision className="mr-4 h-6 w-6" />
                    Television
                  </div>
                </div>
              )}
              {room.wifi && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <FaWifi className="mr-4 h-6 w-6" />
                    Wifi
                  </div>
                </div>
              )}
              {room.giuong && (
                <div className="border-b border-b-gray-300 py-6 text-base">
                  <div className="flex items-center">
                    <FaBed className="mr-4 h-6 w-6" />
                    {room.bed} Beds
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* RIGHT CONTENT */}
        <div className="relative hidden overflow-y-auto md:ml-[8.5%] md:block md:w-[35%]">
          <div className="sticky top-14 flex flex-col rounded-xl border border-gray-300 p-6 shadow-lg">
            <div className="mb-6">
              <p>
                <span className="text-2xl font-semibold">${room.giaTien}</span>{" "}
                night
              </p>
            </div>
            {/* CHECK IN/OUT  */}
            <div>
              <div
                className="flex text-left text-[0.625rem]"
                // onClick={handleShowCalendar}
              >
                <div className="w-1/2">
                  <div className="w-full">
                    <div className="flex flex-col rounded-tl-xl border border-gray-400 px-2 py-2 text-left">
                      <span className="font-bold">CHECK-IN</span>
                      <span className="overflow-ellipsis whitespace-nowrap text-base">
                        <DatePicker
                          className="w-full"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <button className="w-full">
                    <div className="flex flex-col rounded-tr-xl border border-gray-400 border-l-transparent px-2 py-2 text-left">
                      <span className="font-bold">CHECK-OUT</span>
                      <span className="overflow-ellipsis whitespace-nowrap text-base">
                        <DatePicker
                          className="w-full"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                        />
                      </span>
                    </div>
                  </button>
                </div>
              </div>
              <div className="relative rounded-bl-xl rounded-br-xl border border-gray-400 border-t-transparent px-2 py-2 text-left text-[0.625rem]">
                <div className="font-bold">GUESTS</div>
                <div className="flex items-center justify-between">
                  <span className="text-base">{guests} guests</span>
                  <div className="flex gap-2 text-2xl">
                    <p
                      onClick={() => {
                        decreaseGuests();
                      }}
                    >
                      <CiCircleMinus />
                    </p>
                    <p
                      onClick={() => {
                        increaseGuests();
                      }}
                    >
                      <CiCirclePlus />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="w-full">
                <button
                  className="w-full rounded-xl bg-brand px-6 py-3 font-semibold text-white"
                  onClick={() => {
                    handleReserve();
                  }}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* COMMENT */}
      <div>
        {room && (
          <LocationComments localeId={id} reloadComments={reloadComments} />
        )}
      </div>
      {/* USER COMMENT */}
      <div>
        {isAuthenciated && (
          <UserComment
            userData={userData}
            roomData={room}
            localeId={id}
            onCommentAdded={triggerReloadComments}
          />
        )}
      </div>
      {/* STICKY RESERVE BOTTOM */}
      <div className="fixed bottom-0 min-h-20 w-full border-t border-t-gray-300 bg-white md:hidden">
        <div className="h-full w-full items-center px-4">
          <div>
            <div className="py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex w-2/3 font-semibold">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <span>${room.giaTien}/night</span>
                    </div>
                    <div>
                      <span className="flex justify-start">
                        <span className="max-w-[86px]">
                          <DatePicker
                            className="w-full text-sm underline"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            withPortal
                          />
                        </span>
                        <span className="px-1">-</span>
                        <span className="max-w-[86px]">
                          <DatePicker
                            className="w-full text-sm underline"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            withPortal
                          />
                        </span>
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <CiCircleMinus
                          onClick={() => {
                            decreaseGuests();
                          }}
                        />{" "}
                        {guests} Guests{" "}
                        <CiCirclePlus
                          onClick={() => {
                            increaseGuests();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div
                    className="rounded-lg bg-brand px-4 py-[14px] text-center font-semibold text-white"
                    onClick={() => {
                      handleReserve();
                    }}
                  >
                    <span>Reserve</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LocationDetail;
