import axios from "axios";
import config from "../config/config.ts";
import { CAMERA } from "../constants/queryConstants.ts";

const { BASE_API_URL } = config;

export const getRoverImage = async (apikey: string, sol: string | number) => {
  const data = await axios.get(
    `${BASE_API_URL}/mars-photos/api/v1/rovers/curiosity/photos`,
    { params: { sol, camera: CAMERA, api_key: apikey } },
  );

  return data;
};
