import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FcApproval } from "react-icons/fc";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const AllRequests = () => {
  const { aToken, backendUrl, getProductsData } = useContext(AdminContext);
  const currency = "₹";
  const [reqCustomers, setReqCustomers] = useState([]);

  //get req customer list
  const reqCustomerList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/get-req`, {
        headers: { aToken: aToken },
      });
      if (response.data.success) {
        setReqCustomers(response.data.data);
      } else {
        toast.error("Failed to get customer list.");
      }
    } catch {
      toast.error("Failed to get customer list.");
    }
  };

  useEffect(() => {
    if (aToken) {
      reqCustomerList();
    }
  }, [aToken]);

  const handleAccepetRequest = async (userId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/accept-request`,
        { userId },
        { headers: { aToken: aToken } }
      );
      if (data.success) {
        toast.success("Request accepted successfully!");
        reqCustomerList();
      } else {
        toast.error("Failed to accept request.");
      }
    } catch {
      toast.error("Failed to accept request.");
    }
  };

  const handleDeclineRequest = async (userId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/admin/decline-request`,
        { userId },
        { headers: { aToken: aToken } }
      );
      if (response.data.success) {
        toast.success("Request declined successfully!");
        reqCustomerList();
      } else {
        toast.error("Failed to decline request.");
      }
    } catch {
      toast.error("Failed to decline request.");
    }
  };

  return (
    <div className="w-full max-w-6xl m-5 sm:m-8 overflow-visible">
      <div className="relative overflow-x-auto shadow-2xl shadow-stone-500 rounded-xl sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-950">
          <thead className="text-xs text-gray-700 bg-stone-200">
            <tr>
              <th scope="col" className=" px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Plan
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reqCustomers.length > 0 ? (
              reqCustomers.map((data, index) => (
                <tr className="bg-fuchsia-100 border-b" key={index}>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-4 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {data.name}
                  </td>
                  <td className=" px-4 sm:px-6 py-2 sm:py-4">{data.plan}</td>
                  <td className=" px-4 sm:px-6 py-2 sm:py-4">
                    {currency} {data.planprice}
                  </td>
                  <td className="px-4 sm:px-6 py-4  flex items-center justify-evenly cursor-pointer gap-2">
                    <FcApproval
                      onClick={() => {
                        handleAccepetRequest(data._id);
                      }}
                      size={24}
                      color="green"
                    />
                    <RxCross1
                      onClick={() => {
                        handleDeclineRequest(data._id);
                      }}
                      size={24}
                      color="red"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  No requests available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;
