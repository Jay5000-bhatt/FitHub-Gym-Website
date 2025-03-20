import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TrainerContext = createContext();

const TrainerContextProvider = (props) => {
  const [TrainerProfile, setTrainerProfile] = useState(false);
  const [TrainerToken, setTrainerToken] = useState(
    localStorage.getItem("TrainerToken")
      ? localStorage.getItem("TrainerToken")
      : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/trainer/profile`, {
        headers: { TrainerToken: TrainerToken },
      });
      if (data.success) {
        setTrainerProfile(data.data);
        console.log(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const value = {
    TrainerToken,
    setTrainerToken,
    backendUrl,
    TrainerProfile,
    setTrainerProfile,
    getProfileData,
  };

  return (
    <TrainerContext.Provider value={value}>
      {props.children}
    </TrainerContext.Provider>
  );
};

export default TrainerContextProvider;
