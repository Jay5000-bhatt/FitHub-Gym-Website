import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { AdminContext } from "../context/AdminContext";
import { TrainerContext } from "../Context/TrainerContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setTrainerToken } = useContext(TrainerContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/login-admin`,
          {
            email,
            password,
          }
        );

        if (data.success) {
          toast.success("Logged in successfully!");
          localStorage.setItem("aToken", data.Token);
          setAToken(data.Token);
          navigate("/admin-dashboard");
        } else {
          toast.error("Invalid Credentials");
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/trainer/trainer-login`,
          {
            email,
            password,
          }
        );

        if (data.success) {
          toast.success("Logged in successfully!");
          localStorage.setItem("TrainerToken", data.Token);
          setTrainerToken(data.Token);
          navigate("/trainer-dashboard");
        } else {
          toast.error("Invalid Credentials");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {state === "Admin" ? (
          <p>
            {" "}
            Trainer Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Trainer");
              }}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => {
                setState("Admin");
              }}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
