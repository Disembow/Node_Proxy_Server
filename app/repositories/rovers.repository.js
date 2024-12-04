import axios from "axios";
import config from "../config/config.js";

const { BASE_API_URL, API_KEY } = config;

export const getRoverImage = async (apikey) => {
  const url = `${BASE_API_URL}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=${apikey}`;
  const data = await axios.get(url);

  return data;
};
