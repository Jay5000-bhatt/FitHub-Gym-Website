import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(false);

  const [Token, setToken] = useState(
    localStorage.getItem("Token") ? localStorage.getItem("Token") : ""
  );
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/user/userData`, {
        headers: { Token: Token },
      });
      if (data.success) {
        setUserData(data.data);
        console.log(data.data);
      } else {
        toast.error("Failed to fetch user profile data.");
        setUserData(false);
      }
    } catch (error) {
      console.error("Error in getting user profile data", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (Token) {
      getUserData();
    }
  }, [Token]);

  const value = {
    backendUrl,
    currencySymbol,
    Token,
    userData,
    setToken,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
