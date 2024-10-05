import axios from "axios";

export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  },
};

export const youtubeOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  },
};

// Using Axios for API requests
export const fetchData = async (url, options) => {
  try {
    const res = await axios(url, options);
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
