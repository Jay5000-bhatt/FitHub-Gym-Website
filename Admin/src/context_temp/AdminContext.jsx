import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [Trainers, setTrainers] = useState([]);
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");

  const getTrainersData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/trainerdata`, {
        headers: { aToken: aToken },
      });
      if (data.success) {
        console.log(data.data);
        setTrainers(data.data); // Correctly set trainers
      } else {
        toast.error("Failed to fetch trainers.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProductsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-products`, {
        headers: { aToken: aToken },
      });
      if (data.success) {
        console.log(data.data);
        setProducts(data.data); // Correctly set products
      } else {
        toast.error("Failed to fetch products.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    Trainers,
    setTrainers,
    getTrainersData,
    products,
    setProducts,
    getProductsData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
