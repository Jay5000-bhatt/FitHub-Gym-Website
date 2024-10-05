import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Token, setToken, backendUrl } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + `/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success("Logged in successfully!");
        localStorage.setItem("Token", data.Token);
        setToken(data.Token);
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to login.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">User</span> Login
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
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
        <p className="text-base text-gray-500 mt-5">
          Create an account?{" "}
          <span
            onClick={() => {
              navigate("/register");
            }}
            className="text-blue-700 underline"
          >
            {" "}
            Register now
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
