import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import Earnings_icon from "../../assets/Earnings_icon.png";
import { RiFileList3Line } from "react-icons/ri";
import Customers_icon from "../../assets/Customers_icon.png";
import Orders_icon from "../../assets/Orders_icon.png";

const Dashboard = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [OrderData, setOrderData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [mergedOrderData, setMergedOrderData] = useState([]);
  const [dashData, setDashData] = useState([]);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/admin/admin-dashboard`,
        {
          headers: { aToken: aToken },
        }
      );
      if (data.success) {
        setDashData(data.data);
        console.log(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to get Order Data");
    }
  };

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
    getDashData();
  }, []);

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-2xl border-2 border-gray-200 shadow-2xl cursor-pointer hover:scale-105 transition-all">
          <img className="h-15 w-14" src={Earnings_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.totalEarnings}
            </p>
            <p className="text-gray-700 text-base font-medium">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-2xl border-2 border-gray-200 shadow-2xl cursor-pointer hover:scale-105 transition-all">
          <img className="h-15 w-14" src={Customers_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.totalUsers}
            </p>
            <p className="text-gray-700 text-base font-medium">
              Total Customers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-2xl border-2 border-gray-200 shadow-2xl cursor-pointer hover:scale-105 transition-all">
          <img className="h-15 w-14" src={Orders_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.totalOrders}
            </p>
            <p className="text-gray-700 text-base font-medium">Total Orders</p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
          <RiFileList3Line size={24} />
          <p className="font-semibold">Recently Orders</p>
        </div>

        <div className="pt-4 border border-t-0">
          {mergedOrderData.length > 0 ? (
            mergedOrderData.map((data, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <div className="grid grid-cols-[0.5fr_2fr_1fr_0.5fr] text-sm w-full">
                  <p className="text-gray-800 font-medium">{index + 1}</p>

                  <p className="text-gray-800 font-medium">
                    {data.productName}
                  </p>

                  <p className="text-gray-800 font-medium">{data.brandName}</p>

                  <p className="text-gray-800 font-medium">{data.amount}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 px-6 py-2 mt-5 mb-5">
              No data Available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
