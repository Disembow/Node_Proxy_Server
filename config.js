import dotenv from "dotenv";

dotenv.config();

const config = {
  BASE_API_URL: "https://api.nasa.gov",
  PORT: process.env.PORT || 4000,
  API_KEY: process.env.API_KEY,
  START_DATE: "2024-11-17",
  END_DATE: "2024-11-18",
};

export default config;
