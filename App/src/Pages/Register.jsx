import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/AppContext.jsx";

const Register = () => {
  const [UserImg, setUserImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const navigate = useNavigate();

  const { backendUrl } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!UserImg) {
        return toast.error("Image not Selected");
      }

      const formData = new FormData();
      formData.append("image", UserImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("age", age);
      formData.append("phone", phone);
      formData.append("weight", weight);
      formData.append("height", height);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/user/register",
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setUserImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setPhone("");
        setWeight("");
        setHeight("");

        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in adding : ", error);
      toast.error("Error in adding ");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-[80vw] h-[80vh]">
      <p className="mb-3 text-lg font-medium">Sign Up</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[90vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="UserImg">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={UserImg ? URL.createObjectURL(UserImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => {
              setUserImg(e.target.files[0]);
            }}
            type="file"
            id="UserImg"
            hidden
          />
          <p>
            {" "}
            Upload User <br /> Picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Phone</p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Mobile Number"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Age</p>
              <input
                onChange={(e) => setAge(e.target.value)}
                value={age}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Age"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Weight</p>
              <input
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Weight In KG"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Height</p>
              <input
                onChange={(e) => setHeight(e.target.value)}
                value={height}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Height in Centimeters"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-blue-800"
        >
          Sign Up
        </button>

        <p className="text-base text-gray-500 mt-5">
          Already User?{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="text-blue-700 underline"
          >
            Login
          </span>
        </p>
      </div>
    </form>
  );
};

export default Register;
