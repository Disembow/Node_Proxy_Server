import axios from "axios";
import { getApiUrl } from "../utils/getApiUrl.js";

export const getMeteors = async (startDate, endDate) => {
  const url = getApiUrl(startDate, endDate);

  const response = await axios.get(url);

  return response.data.near_earth_objects;
};
