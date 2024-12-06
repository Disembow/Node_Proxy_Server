import express from "express";

import { getRoverImage } from "../controllers/rovers.controller.js";
import { roverSchema } from "../utils/validation/index.js";
import { validate } from "../utils/validation/validator.js";

const router = express.Router();

router.post("/", validate(roverSchema), getRoverImage);

export default router;
