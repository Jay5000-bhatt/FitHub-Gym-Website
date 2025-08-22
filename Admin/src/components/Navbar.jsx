import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext.jsx";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { TrainerContext } from "../context/TrainerContext.jsx";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { TrainerToken, setTrainerToken } = useContext(TrainerContext);

  const navigate = useNavigate();

  const logout = () => {
    if (aToken) {
      navigate("/login");
      aToken && setAToken("");
      aToken && localStorage.removeItem("aToken");
    } else {
      navigate("/login");
      TrainerToken && setTrainerToken("");
      TrainerToken && localStorage.removeItem("TrainerToken");
    }
  };
  
  return aToken || TrainerToken ? (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt="Admin_Logo"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Trainer"}
        </p>
      </div>
      <button
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  ) : null;
};

export default NavBar;
