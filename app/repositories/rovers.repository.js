import axios from "axios";
import config from "../config/config.js";
import { CAMERA } from "../constants/queryConstants.js";

const { BASE_API_URL } = config;

export const getRoverImage = async (apikey, sol) => {
  const data = await axios.get(
    `${BASE_API_URL}/mars-photos/api/v1/rovers/curiosity/photos`,
    { params: { sol, camera: CAMERA, api_key: apikey } },
  );

  return data;
};
