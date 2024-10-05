import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { TrainerContext } from "../../Context/TrainerContext";

const TrainerProfile = () => {
  const {
    backendUrl,
    TrainerToken,
    setTrainerToken,
    TrainerProfile,
    setTrainerProfile,
    getProfileData,
  } = useContext(TrainerContext);
  const [editMode, setEditMode] = useState(false);

  const currency = "₹";

  const updateProfile = async () => {
    try {
      const updateData = {
        experience: TrainerProfile.experience,
        fees: Number(TrainerProfile.fees),
        available: TrainerProfile.available,
      };
      const { data } = await axios.put(
        backendUrl + `/api/trainer/update-profile`,
        updateData,
        { headers: { TrainerToken: TrainerToken } }
      );
      if (data.success) {
        setEditMode(false);
        getProfileData();
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    if (TrainerToken) {
      getProfileData();
    }
  }, [TrainerToken]);
  return (
    TrainerProfile && (
      <div className="w-screen">
        <div className="flex-1 sm:grid grid-cols-[5fr_15fr] gap-4 m-5 sm:h-[80vh]">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg shadow-2xl shadow-blue-200 sm:h-96 h-fit"
              src={TrainerProfile.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white shadow-xl  shadow-blue-200 w-full">
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {TrainerProfile.name}
            </p>

            <div>
              <p className="flex items-center gap-1 text-lg font-medium text-neutral-800 mt-4">
                About:{" "}
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-2">
                {TrainerProfile.about}
              </p>
            </div>

            <p className="flex items-center gap-1 text-base font-medium text-neutral-800 mt-2">
              Speciality:
              <span>
                {TrainerProfile.speciality.map((data, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-1 rounded shadow-2xl"
                  >
                    {data}
                  </span>
                ))}
              </span>
            </p>

            <p className="flex items-center gap-1 text-base font-medium text-neutral-800 mt-2">
              Experience:
              <span>
                {editMode ? (
                  <input
                    className="bg-gray-300 text-gray-800 rounded ml-1 pl-3 w-fit"
                    type="text"
                    onChange={(e) => {
                      setTrainerProfile((prev) => ({
                        ...prev,
                        experience: e.target.value,
                      }));
                    }}
                    value={TrainerProfile.experience}
                  />
                ) : (
                  TrainerProfile.experience
                )}
              </span>
            </p>

            <p className="flex items-center gap-1 text-base font-medium text-neutral-800 mt-2">
              Training fees: <span className="text-green-600">{currency}</span>
              <span>
                {editMode ? (
                  <input
                    className="bg-gray-300 text-gray-800 rounded ml-1 pl-3 w-fit"
                    type="number"
                    onChange={(e) => {
                      setTrainerProfile((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }));
                    }}
                    value={TrainerProfile.fees}
                  />
                ) : (
                  TrainerProfile.fees
                )}
              </span>
            </p>

            <div className="flex items-center me-4 mb-5 mt-3">
              <input
                onChange={() =>
                  editMode &&
                  setTrainerProfile((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={TrainerProfile.available}
                type="checkbox"
                className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 "
                id="orange-checkbox"
              />
              <label
                className="ms-2 text-sm font-medium text-gray-900"
                htmlFor="orange-checkbox"
              >
                Available
              </label>
            </div>

            {editMode ? (
              <button
                onClick={updateProfile}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditMode(true);
                }}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default TrainerProfile;
