import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { IoIosCloseCircle } from "react-icons/io";
const EditProfile = ({ editing, onClick, userData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="fixed left-0 top-0 z-100 h-screen w-screen bg-black/50">
      {/* CONTENT */}
      <div className="pt-[72px]">
        <div className="relative flex items-center rounded-tl-lg rounded-tr-lg bg-brand px-6 py-2 text-white">
          <span className="mx-auto text-xl font-bold">Edit profile</span>
          <IoIosCloseCircle
            className="absolute right-4 h-8 w-8"
            onClick={() => onClick()}
          />
        </div>
        <div className="bg-white px-6 py-4 text-sm md:text-base">
          <form action="">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="w-[20%] font-bold" htmlFor="name">
                  Name:
                </label>
                <input
                  className="w-[75%] rounded-md border border-gray-500 px-2 py-1 focus-visible:outline-black"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="w-[20%] font-bold" htmlFor="name">
                  Email:
                </label>
                <input
                  className="w-[75%] rounded-md border border-gray-500 px-2 py-1 focus-visible:outline-black"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="w-[20%] font-bold" htmlFor="phone">
                  Phone:
                </label>
                <input
                  className="w-[75%] rounded-md border border-gray-500 px-2 py-1 focus-visible:outline-black"
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="w-[20%] font-bold" htmlFor="phone">
                  Birthday:
                </span>
                <div className="w-[75%]">
                  <DatePicker
                    className="w-full rounded-md border border-gray-500 px-2 py-1 focus-visible:outline-black"
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    withPortal
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="w-[20%] font-bold">Gender:</span>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <label htmlFor="male">Male</label>
                    <input type="radio" id="male" value={true} />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="female">Female</label>
                    <input type="radio" id="female" value={false} />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="mt-4 rounded-md bg-brand px-4 py-1 text-base font-bold text-white"
              type="button"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
