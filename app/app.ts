import bodyParser from "body-parser";
import express from "express";
import { join } from "node:path";
import nunjucks from "nunjucks";
import { meteorRouter, roverImageRouter } from "./routers/index.ts";
import { errorHandler } from "./utils/errorHandler/errorHandler.ts";

const app = express();

nunjucks.configure("app/views", {
  autoescape: true,
  express: app,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static(join(process.cwd(), "public")));

app.use("/api/v1/meteors/", meteorRouter);
app.use("/api/v1/rover/", roverImageRouter);

app.use((_, res) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

app.use(errorHandler);

export default app;
