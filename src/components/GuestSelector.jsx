import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const GuestSelector = () => {
  const [guest, setGuest] = useState(0);

  const decreaseGuest = () => {
    if (guest > 0) {
      setGuest(guest - 1);
    }
  };

  const increaseGuest = () => {
    setGuest(guest + 1);
  };

  return (
    <div
      className="top-20 mx-4 mt-4 flex items-center justify-between rounded-2xl border border-gray-300 p-4 shadow-lg md:absolute md:right-0 md:z-10 md:m-0 md:w-[300px] md:rounded-3xl md:bg-white"
      id="guestSelector"
    >
      <span>Guests</span>
      <div className="flex items-center justify-between gap-2">
        {guest > 0 && (
          <span className="">
            <CiCircleMinus
              className="h-8 w-8 text-gray-400 hover:text-black"
              onClick={() => decreaseGuest()}
            />
          </span>
        )}
        <span className="">{guest}</span>
        <span>
          <CiCirclePlus
            className="h-8 w-8 text-gray-400 hover:text-black"
            onClick={() => increaseGuest()}
          />
        </span>
      </div>
    </div>
  );
};

export default GuestSelector;
