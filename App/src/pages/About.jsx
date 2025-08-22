import React from "react";
import AboutImg from "../assets/about_image01.png";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12 items-center justify-center">
        <img
          className="w-full md:max-w-[360px] rounded-2xl shadow-2xl "
          src={AboutImg}
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Welcome to FitLife Gym, your dedicated partner in achieving your
            fitness goals. At FitLife Gym, we understand the challenges of
            maintaining a healthy and active lifestyle in today's fast-paced
            world.
          </p>
          <p>
            FitLife Gym is committed to excellence in fitness training. We
            strive to create an environment where members can train with
            confidence and ease, supported by state-of-the-art equipment and
            certified trainers who guide you every step of the way. Whether
            you're a beginner or a seasoned athlete, FitLife Gym is here to
            support your journey to a healthier and stronger you.
          </p>
          <b className="text-gray-600">Our Vision</b>
          <p>
            At FitLife Gym, our vision is to empower every individual to lead a
            healthier life by providing access to world-class fitness facilities
            and personalized training programs. We aim to bridge the gap between
            fitness enthusiasts and professional trainers, helping you reach
            your fitness goals more effectively.
          </p>
        </div>
      </div>

      <div className="text-xl my-4 text-center">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-4">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>State-of-the-Art Equipment:</b>
          <p>
            Our gym features the latest fitness equipment designed to support
            all levels of training, from beginner to advanced.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Expert Trainers:</b>
          <p>
            Our certified trainers are dedicated to providing personalized
            guidance, helping you stay on track and motivated.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Customized Programs:</b>
          <p>
            We offer tailored fitness programs that align with your specific
            goals, whether it's weight loss, muscle gain, or overall fitness.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
