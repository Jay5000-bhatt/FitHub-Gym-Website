import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext.jsx";

import { FcHome } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";
import { MdAddToPhotos } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { TiGroupOutline } from "react-icons/ti";
import { MdOutlineGroupAdd } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { PiOrange, PiUserListBold } from "react-icons/pi";
import { TrainerContext } from "../context/TrainerContext.jsx";
import { TbColorFilter } from "react-icons/tb";
import { LuBadgeDollarSign } from "react-icons/lu";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { TrainerToken } = useContext(TrainerContext);
  
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <FcHome size={24} />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/add-worker"}
          >
            <MdOutlineGroupAdd size={24} />
            <p className="hidden md:block">Add Employee</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/add-product"}
          >
            <MdAddToPhotos size={24} />
            <p className="hidden md:block">Add Product</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-worker"}
          >
            <TiGroupOutline size={24} />
            <p className="hidden md:block">Our Team</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-customers"}
          >
            <GrGroup size={24} />
            <p className="hidden md:block">Gym Family</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-Products"}
          >
            <FaRegListAlt size={24} />
            <p className="hidden md:block">Products List</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-requests"}
          >
            <TbColorFilter size={24} />
            <p className="hidden md:block">Customer Request</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-orders"}
          >
            <LuBadgeDollarSign size={24} />
            <p className="hidden md:block">Your Orders</p>
          </NavLink>
        </ul>
      )}
      {TrainerToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/trainer-dashboard"}
          >
            <FcHome size={24} />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/trainer-client"}
          >
            <PiUserListBold color="green" size={24} />
            <p className="hidden md:block">Clients List</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/trainer-profile"}
          >
            <CgProfile color="orange" size={24} />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
