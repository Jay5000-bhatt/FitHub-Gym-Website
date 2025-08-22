import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Plans = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle plan selection and navigate to /plan-pay
  const handlePlanSelection = (planName, price) => {
    navigate("/plan-pay", {
      state: {
        planName,
        price,
      },
    });
  };

  return (
    <div className="">
      <div>
        <h2 className="text-3xl font-bold tracki text-center mt-12 sm:text-5xl ">
          Membership Plans
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">
          Choose a plan that fits your fitness goals and upgrade anytime.
        </p>
      </div>
      <div className="mt-24 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {/* Free Plan */}
        <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Free Trial</h3>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">₹0</span>
              <span className="ml-1 text-xl font-semibold">/3 Days</span>
            </p>
            <p className="mt-6 ">
              Perfect for beginners who want to explore our gym.
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">3 Days Gym Access</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Basic Diet Consultation</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Body Analysis Report</span>
              </li>
            </ul>
          </div>
          <button
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            onClick={() => handlePlanSelection("Free Trial", 0)}
          >
            Start Free Trial
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative p-8 border border-gray-200 rounded-2xl flex flex-col mt-10 shadow-2xl shadow-green-400">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Pro Plan</h3>
            <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
              Most popular
            </p>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">
                ₹1499
              </span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </p>
            <p className="mt-6 ">
              For those who want personalized training and diet plans.
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Unlimited Gym Access</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Custom Diet Plan</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Personal Training Sessions</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Fitness Progress Tracking</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Access to Group Classes</span>
              </li>
            </ul>
          </div>
          <button
            className="bg-emerald-500 text-white hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            onClick={() => handlePlanSelection("Pro Plan", 1499)}
          >
            Join Pro Plan
          </button>
        </div>

        {/* Basic Plan */}
        <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col mt-10">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Basic Plan</h3>
            <p className="absolute top-0 py-1.5 px-4 bg-rose-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
              Most Liked
            </p>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">
                ₹899
              </span>
              <span className="ml-1 text-xl font-semibold">/month</span>
            </p>
            <p className="mt-6 ">
              Ideal for members looking for basic gym access with support.
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Full Gym Access</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Weekly Diet Consultation</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Body Composition Tracking</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Access to Group Workouts</span>
              </li>
              <li className="flex">
                <BsCheck2 className="text-emerald-700" size={28} />
                <span className="ml-3 ">Monthly Progress Report</span>
              </li>
            </ul>
          </div>
          <button
            className="bg-emerald-400 text-white hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            onClick={() => handlePlanSelection("Basic Plan", 899)}
          >
            Get Basic Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plans;
