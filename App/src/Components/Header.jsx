import React from "react";
import { assets } from "../assets/assets";
import { FaArrowRightLong } from "react-icons/fa6";
import HeaderImg from "../assets/Trainer02.png";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Training <br /> With Certified Trainers
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of Certified Trainers,{" "}
            <br className="hidden sm:block" />
            schedule your Training hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Training <FaArrowRightLong className="w-3 mt-0.5" />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={HeaderImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
