import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const Allorders = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [OrderData, setOrderData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [mergedOrderData, setMergedOrderData] = useState([]);

  const getOrderData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/getOrderData`, {
        headers: { aToken: aToken },
      });
      if (data.success) {
        setOrderData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to get Order Data");
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/customers`, {
        headers: { aToken: aToken },
      });
      if (data.success) {
        setUserData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to get User Data");
    }
  };

  useEffect(() => {
    if (OrderData.length > 0 && UserData.length > 0) {
      const mergedData = OrderData.map((order) => {
        const user = UserData.find((u) => u._id === order.userId);
        return {
          ...order,
          userName: user ? user.name : "Unknown User",
        };
      });
      setMergedOrderData(mergedData); // Avoid updating state during render
    }
  }, [OrderData, UserData]);

  useEffect(() => {
    getOrderData();
    getUserData();
  }, []);

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
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand Name
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {mergedOrderData.length > 0 ? (
              mergedOrderData.map((data, index) => (
                <tr className="bg-fuchsia-100 border-b" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {data.productName}
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4">
                    {data.brandName}
                  </td>
                  <td className="px-4 sm:px-6 py-2 sm:py-4">{data.userName}</td>
                  <td className="px-4 sm:px-6 py-4">{data.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allorders;
