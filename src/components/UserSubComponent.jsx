import React, { useState } from "react";
import defaultUser from "../assets/img/user.jpg";
import { LuBadgeCheck } from "react-icons/lu";
import EditProfile from "./EditProfile";

const UserSubComponent = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleUpdateProfileClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="top-50 sticky flex max-h-[442px] flex-col gap-2 rounded-xl border border-gray-300 px-4 py-6 shadow-lg md:w-[40%] lg:w-[30%]">
      {/* AVAVTAR */}
      <div className="flex flex-col items-center gap-2">
        <div className="h-36 w-36 gap-4 rounded-full border border-gray-300">
          <img
            className="h-full w-full rounded-full"
            src={userData.avatar ? userData.avatar : defaultUser}
            alt="User Avatar"
          />
        </div>
        <div
          className="cursor-pointer text-center underline"
          onClick={() => handleUpdateProfileClick()}
        >
          Update your profile
        </div>
      </div>
      {/* INFO */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">{userData.name}</h1>
          <div>
            <p> {userData.email}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div>
            <LuBadgeCheck className="h-10 w-10" />
          </div>
          <div className="text-lg font-semibold">Confirm your identity</div>
          <div className="md:text-center">
            Confirm your identity for better security for your account
          </div>
        </div>
      </div>
      {/* EDIT PROFILE */}
      {isEditing && (
        <EditProfile
          editing={isEditing}
          onClick={handleUpdateProfileClick}
          userData={userData}
        />
      )}
    </div>
  );
};

export default UserSubComponent;
