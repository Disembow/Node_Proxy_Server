import axios from "axios";
import config from "../config/config.js";

const { BASE_API_URL } = config;

const SOL = 1000;
const CAMERA = "fhaz";

export const getRoverImage = async (apikey) => {
  const data = await axios.get(
    `${BASE_API_URL}/mars-photos/api/v1/rovers/curiosity/photos`,
    { params: { sol: SOL, camera: CAMERA, api_key: apikey } }
  );

  return data;
};
