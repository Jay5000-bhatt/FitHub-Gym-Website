import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const AllWorkers = () => {
  const { aToken, Trainers, setTrainers, getTrainersData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getTrainersData();
    }
  }, [aToken]);

  return (
    <div className="p-5">
      <div className="mt-6 sm:flex items-center justify-center">
        {Trainers.length > 0 &&
          Trainers.map((data, index) => (
            <div
              className="bg-white border border-gray-700 rounded-lg shadow text-white mx-5 my-4"
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

export default AllWorkers;
