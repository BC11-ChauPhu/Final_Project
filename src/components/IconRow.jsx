import React from "react";
import { RiCoupon2Line } from "react-icons/ri";
import { MdCabin } from "react-icons/md";
import { PiSwimmingPool } from "react-icons/pi";
import { CiHome } from "react-icons/ci";
import { MdOutlineBedroomChild } from "react-icons/md";
const IconRow = () => {
  return (
    <section id="irow">
      <div className="relative flex justify-center gap-8 border-t border-t-gray-300 font-bold text-gray-500 md:mx-auto xl:px-20">
        <div className="iRowItem mb-[10px] mt-3 grid gap-2">
          <p className="grid justify-center">
            <RiCoupon2Line className="text-2xl" />
          </p>
          <p className="text-xs">Icons</p>
        </div>
        <div className="iRowItem mb-[10px] mt-3 grid gap-2">
          <p className="grid justify-center">
            <MdCabin className="text-2xl" />
          </p>
          <p className="text-xs">Cabins</p>
        </div>
        <div className="iRowItem mb-[10px] mt-3 grid gap-2">
          <p className="grid justify-center">
            <PiSwimmingPool className="text-2xl" />
          </p>
          <p className="text-xs">Amazing pools</p>
        </div>
        <div className="iRowItem mb-[10px] mt-3 grid gap-2">
          <p className="grid justify-center">
            <CiHome className="text-2xl" />
          </p>
          <p className="text-xs">Tiny homes</p>
        </div>
        <div className="iRowItem mb-[10px] mt-3 grid gap-2">
          <p className="grid justify-center">
            <MdOutlineBedroomChild className="text-2xl" />
          </p>
          <p className="text-xs">Rooms</p>
        </div>
      </div>
    </section>
  );
};

export default IconRow;
