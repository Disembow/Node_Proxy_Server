import express from "express";

import {
  getRoverFormView,
  getRoverImage,
  getRoverImageView,
} from "../controllers/rovers.controller.ts";
import { roverSchema } from "../utils/validation/index.ts";
import { validate } from "../utils/validation/validator.ts";

const router = express.Router();

router.post("/", validate(roverSchema), getRoverImage);
router.get("/view-form", getRoverFormView);
router.post("/view", validate(roverSchema), getRoverImageView);

export default router;
