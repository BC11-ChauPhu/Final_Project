import React from "react";
import img1 from "../assets/img/house-6967908_640.jpg";
import img2 from "../assets/img/lake-192990_640.jpg";
import img3 from "../assets/img/house-4811590_640.jpg";
import img4 from "../assets/img/shih-tzu-8751508_640.jpg";

const StaticLocale = () => {
  return (
    <section id="staticLocale">
      <div className="container mx-auto my-10 px-6">
        <h2 className="text-center text-3xl font-bold md:text-left">
          Stay Anywhere
        </h2>
        <div className="mt-10 grid gap-y-6 text-center text-2xl font-semibold lg:grid-cols-2 lg:gap-x-4 lg:text-left lg:text-xl xl:grid-cols-4">
          <div className="flex flex-col space-y-3 lg:h-[320px]">
            <img src={img1} alt="" className="h-full rounded-lg" />
            <span>Whole House</span>
          </div>
          <div className="flex flex-col space-y-3">
            <img src={img2} alt="" className="h-full rounded-lg" />
            <span>Exotic Location</span>
          </div>
          <div className="flex flex-col space-y-3">
            <img src={img3} alt="" className="h-full rounded-lg" />
            <span>Nature Scenery</span>
          </div>
          <div className="flex flex-col space-y-3">
            <img src={img4} alt="" className="h-full rounded-lg" />
            <span>Pets Welcomed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticLocale;
