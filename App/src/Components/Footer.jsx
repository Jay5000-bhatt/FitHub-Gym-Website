import React from "react";
import NavLogo from "../assets/Nav_Logo.svg";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <img className="mb-5 w-40" src={NavLogo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Welcome to FitHub, we blend cutting-edge workouts with personalized
            training plans tailored just for you. a supportive environment that
            inspires you to push your limits. Join FitHub today and redefine
            what fitness means to you!
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0); // Scrolls to the top of the page
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/plans");
                window.scrollTo(0, 0); // Scrolls to the top of the page
              }}
            >
              Plans
            </li>
            <li
              onClick={() => {
                navigate("/about");
                window.scrollTo(0, 0); // Scrolls to the top of the page
              }}
            >
              About us
            </li>
            <li
              onClick={() => {
                navigate("/contact");
                window.scrollTo(0, 0); // Scrolls to the top of the page
              }}
            >
              Contact us
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 8769297221</li>
            <li>bhattjay114@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        {/* Copyright Text */}
        <hr />
        <p className="py-5 text-sm text-center">
          {" "}
          Copyright &copy; 2024 Jay Bhatt - All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
