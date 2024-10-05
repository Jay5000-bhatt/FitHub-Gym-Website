import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { assets } from "../assets/assets.js";
import NavLogo from "../assets/Nav_Logo.svg";
import { AppContext } from "../Context/AppContext.jsx";
import { BsCart4 } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { Token, setToken, userData } = useContext(AppContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("Token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-48 h-1/2 cursor-pointer"
        src={NavLogo}
        alt="logo"
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        <NavLink to="/trainers">
          <li className="py-1">Trainers</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        {Token ? (
          <NavLink to="/products">
            <li className="py-1">Products</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        ) : (
          ""
        )}

        <NavLink to="/plans">
          <li className="py-1">Plan</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>

        {!Token ? (
          <NavLink to="/about">
            <li className="py-1">About</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        ) : (
          ""
        )}

        {!Token ? (
          <NavLink to="/contact">
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
          </NavLink>
        ) : (
          ""
        )}
      </ul>

      <div className="flex items-center gap-4">
        {Token ? (
          <BsCart4
            size={24}
            className="cursor-pointer"
            onClick={() => {
              navigate("/cart");
            }}
          />
        ) : (
          ""
        )}
        {Token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <MdKeyboardArrowDown size={24} />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/trainers");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Trainers
                </p>
                <p
                  onClick={() => {
                    navigate("/products");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Products
                </p>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary text-white px-8 py-3 rounded-full font-sm hidden md:block"
          >
            Login
          </button>
        )}
        <IoMenu
          onClick={() => {
            setShowMenu(true);
          }}
          size={38}
          className="w-6 md:hidden"
        />

        {showMenu && (
          <div className="fixed w-full right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all md:hidden">
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={assets.logo} alt="" />
              <RxCross2
                size={22}
                onClick={() => {
                  setShowMenu(false);
                }}
              />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
              <NavLink
                to="/"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                <p className="px-4 py-2 rounded inline-block">Home</p>
              </NavLink>
              <NavLink
                to="/trainers"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                <p className="px-4 py-2 rounded inline-block">Trainers</p>
              </NavLink>
              <NavLink
                to="/products"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                <p className="px-4 py-2 rounded inline-block">Products</p>
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                <p className="px-4 py-2 rounded inline-block">About</p>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                <p className="px-4 py-2 rounded inline-block">Contact</p>
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
