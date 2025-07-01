import React from "react";
import useScrollToTop from "../service/useScrollToTop";
import UserSubComponent from "./UserSubComponent";
import UserMainComponent from "./UserMainComponent";

const User = () => {
  useScrollToTop;
  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="my-4 md:mt-[62px] md:py-10">
      <div className="lg:container relative z-0 w-full md:mx-auto flex flex-col px-6 md:flex-row md:gap-6">
        <UserSubComponent userData={userData} />
        <UserMainComponent userData={userData} />
      </div>
    </section>
  );
};

export default User;
