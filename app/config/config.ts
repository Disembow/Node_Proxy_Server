import dotenv from "dotenv";

dotenv.config();

const config = {
  BASE_API_URL: "https://api.nasa.gov",
  PORT: process.env.PORT || 4000,
  API_KEY: process.env.API_KEY,
};

export default config;
