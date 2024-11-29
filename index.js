import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const START_DATE = "2024-11-17";
const END_DATE = "2024-11-18";
const API_KEY = process.env.API_KEY;
const requestUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;

await axios
  .get(requestUrl)
  .then((res) => console.log(JSON.stringify(res.data, null, 2)))
  .catch((err) => console.error(err));
