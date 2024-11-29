import axios from "axios";
import express from "express";
import config from "./config.js";

const { BASE_API_URL, PORT, API_KEY, START_DATE, END_DATE } = config;

const requestUrl = `${BASE_API_URL}/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`;

const app = express();

app.get("/", (_, res) => {
  res.send("Server works");
});

app.get("/meteors", async (_, res) => {
  try {
    const data = await axios.get(requestUrl);
    res.status(200).json(data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error });
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
