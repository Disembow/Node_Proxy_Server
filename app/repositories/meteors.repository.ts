import axios from "axios";

import { CloseEarthObjects } from "app/types/meteors.ts";
import config from "../config/config.ts";

const { BASE_API_URL, API_KEY } = config;

export const getMeteors = async (
  startDate: string,
  endDate: string,
): Promise<CloseEarthObjects> => {
  const url = `${BASE_API_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;

  const response = await axios.get(url);

  return response.data.near_earth_objects;
};
