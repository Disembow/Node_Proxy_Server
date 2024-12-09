import bodyParser from "body-parser";
import express from "express";
import { dirname, join } from "node:path";
import nunjucks from "nunjucks";
import { fileURLToPath } from "url";

import config from "./app/config/config.js";
import { meteorRouter, roverImageRouter } from "./app/routers/index.js";
import { errorHandler } from "./app/utils/errorHandler/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { PORT } = config;

const app = express();

nunjucks.configure("app/views", {
  autoescape: true,
  express: app,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static(join(__dirname, "public")));

app.use("/api/v1/meteors/", meteorRouter);
app.use("/api/v1/rover/", roverImageRouter);

app.use((_, res) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
