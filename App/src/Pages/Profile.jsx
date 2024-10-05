import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../Context/AppContext.jsx";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { userData, setUserData, Token, getUserData, backendUrl } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("weight", userData.weight);
      formData.append("height", userData.height);
      formData.append("age", userData.age);
      formData.append("plan", userData.plan);

      image && formData.append("image", image);

      const { data } = await axios.put(
        backendUrl + `/api/user/update-userData`,
        formData,
        { headers: { Token } }
      );

      if (data.success) {
        toast.success("User profile updated successfully!");
        await getUserData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error("Failed to update user profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user profile.");
    }
  };

  const centimeterToFeet = (cm) => {
    const totalFeet = cm / 30.48;
    const feet = Math.floor(totalFeet);
    const inches = Math.round((totalFeet - feet) * 12);

    return `${feet} Feet ${inches} Inches`;
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? " " : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img className="w-36 rounded-2xl" src={userData.image} alt="" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-200 rounded text-3xl font-medium max-w-60 mt-4 px-2"
            type="text"
            value={userData.name}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        ) : (
          <p className="text-3xl font-medium text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}

        <hr className=" bg-zinc-400 h-[1px] border-none" />

        <div>
          <p className="text-neutral-500 underline mt-3">Contact Information</p>

          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-200 rounded px-2 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, phone: e.target.value }));
                }}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Weight:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-200 rounded px-2"
                  type="text"
                  value={userData.weight}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      weight: e.target.value,
                    }));
                  }}
                />
              </p>
            ) : (
              <p className="text-gray-500">{userData.weight} Kg</p>
            )}

            <p className="font-medium">Height:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-200 rounded px-2"
                  type="text"
                  value={userData.height}
                  onChange={(e) => {
                    setUserData((prev) => ({
                      ...prev,
                      height: e.target.value,
                    }));
                  }}
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {centimeterToFeet(userData.height)}
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-neutral-500 underline mt-3">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Age:</p>
            {isEdit ? (
              <input
                className="max-w-32 bg-gray-200 rounded px-2"
                type="number"
                value={userData.age}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, age: e.target.value }));
                }}
              />
            ) : (
              <p className="text-gray-500">{userData.age}</p>
            )}

            <p className="font-medium">Plan:</p>
            {isEdit ? (
              <input
                className="max-w-32 bg-gray-200 rounded px-2"
                type="text"
                value={userData.plan}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, plan: e.target.value }));
                }}
              />
            ) : (
              <p className="text-gray-500">{userData.plan}</p>
            )}
          </div>
        </div>

        <div className="mt-10">
          {isEdit ? (
            <button
              type="submit"
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
