import express from "express";
import config from "./app/config/config.js";
import meteorRouter from "./app/routers/meteorRouter.js";
import { errorHandler } from "./app/utils/errorHandler.js";

const { PORT } = config;

const app = express();

app.use(errorHandler);

app.use("/api/v1/meteors", meteorRouter);

app.use((_, res) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
