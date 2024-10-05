import React from "react";
import { assets } from "../assets/assets";
import contactImg from "../assets/contact_image01.png";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px] rounded shadow-xl"
          src={contactImg}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our Location</p>
          <p className="text-gray-500">
            327024 Bedwa Bus Stand, <br />
            Fithub Gym, Partapur, Banswara
          </p>
          <p className="text-gray-500">
            Contact: +91 8769297221 <br /> Email: bhattjay114@gmail.com{" "}
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Careers at Fithub
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
