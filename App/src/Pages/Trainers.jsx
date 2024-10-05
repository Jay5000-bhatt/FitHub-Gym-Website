import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const Trainers = () => {
  const { backendUrl } = useContext(AppContext);
  const [Trainers, setTrainers] = useState([]);

  const AllTrainersData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/trainers`);
      if (data.success) {
        console.log("Fetched Trainers:", data.data);
        setTrainers(data.data);
      } else {
        toast.error("Failed to fetch trainers.");
      }
    } catch (error) {
      console.log("API error:", error);
      toast.error("Error fetching trainers data.");
    }
  };

  useEffect(() => {
    AllTrainersData();
  }, []);

  return (
    <div className="sm:m-5 sm:p-5">
      <div className="grid sm:grid-cols-4 justify-center">
        {Trainers.length > 0 &&
          Trainers.map((data, index) => (
            <div
              className="w-70 bg-white border border-gray-700 rounded-lg shadow-2xl
            hover:translate-y-[-10px] transition-all duration-500 shadow-stone-300 text-white mx-5 ml-4 mt-4"
              key={index}
            >
              {/* Image */}
              <div className="w-full overflow-hidden rounded-t-lg shadow-2xl shadow-stone-300">
                <img
                  className="w-full h-80 object-fill"
                  src={data.image}
                  alt={data.name}
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {data.name}
                </h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {data.about}
                </p>

                <p className="flex items-center gap-1 text-base font-medium text-gray-900 mt-2">
                  Experience:&nbsp;
                  <span>{data.experience}</span>
                </p>

                <p className="grid items-center gap-1 text-base font-medium text-gray-900 mt-2">
                  Speciality:&nbsp;
                  <span>
                    {data.speciality.map((speciality, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-gray-700 text-xs font-medium mr-2 px-2.5 py-1 rounded"
                      >
                        {speciality}
                      </span>
                    ))}
                  </span>
                </p>

                <div className="mt-4 text-base">
                  <div className="flex items-center gap-2 text-sm text-center">
                    <p
                      className={`w-2 h-2 rounded-full ${
                        data.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></p>
                    <p
                      className={`${
                        data.available ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {data.available ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Trainers;
