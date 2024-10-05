import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TrainerContext } from "../../Context/TrainerContext";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const TrainersClient = () => {
  const { TrainerToken, backendUrl } = useContext(TrainerContext);
  const [customersData, setCustomersData] = useState([]);

  const getCustomersData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/trainer/customers-data`,
        {
          headers: { TrainerToken: TrainerToken },
        }
      );
      if (data.success) {
        setCustomersData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching customer data", error);
      toast.error("Failed to fetch customer data.");
    }
  };

  useEffect(() => {
    if (TrainerToken) {
      getCustomersData();
    }
  }, [TrainerToken]);

  return (
    <div className="w-full max-w-6xl m-5 sm:m-8 overflow-visible">
      <div className="relative overflow-x-auto shadow-2xl shadow-stone-500 rounded-xl sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-950">
          <thead className="text-xs text-gray-700 bg-stone-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Date of Expiry
              </th>
            </tr>
          </thead>
          <tbody>
            {customersData.length > 0 ? (
              customersData.map((data, index) => (
                <tr className="bg-fuchsia-100 border-b" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {data.name}
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4">
                    {data.plan || "N/A"}
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4">
                    {data.dateOfPayment
                      ? formatDate(data.dateOfPayment)
                      : "N/A"}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {data.dateOfPlanExpiry
                      ? formatDate(data.dateOfPlanExpiry)
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No customers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainersClient;
