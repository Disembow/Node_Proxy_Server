import axios from "axios";
import express from "express";
import config from "./config.js";

const { BASE_API_URL, PORT, API_KEY, START_DATE, END_DATE } = config;

const requestUrl = `${BASE_API_URL}/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;

await axios
  .get(requestUrl)
  .then((res) => console.log(JSON.stringify(res.data, null, 2)))
  .catch((err) => console.error(err));

const app = express();

app.get("/", (_, res) => {
  res.send("Server works");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
