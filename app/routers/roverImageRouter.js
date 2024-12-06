import express from "express";

import {
  getRoverFormView,
  getRoverImage,
  getRoverImageView,
} from "../controllers/rovers.controller.js";
import { roverSchema } from "../utils/validation/index.js";
import { validate } from "../utils/validation/validator.js";

const router = express.Router();

router.post("/", validate(roverSchema), getRoverImage);
router.get("/view-form", getRoverFormView);
router.post("/view", validate(roverSchema), getRoverImageView);

export default router;
