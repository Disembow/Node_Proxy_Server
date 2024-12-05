import express from "express";
import {
  getMeteors,
  getMeteorsView,
} from "../controllers/meteors.controller.js";
import { meteorsSchema } from "../utils/validation/index.js";
import { validate } from "../utils/validation/validator.js";

const router = express.Router();

router.get("/", validate(meteorsSchema, "query"), getMeteors);
router.get("/view", validate(meteorsSchema, "query"), getMeteorsView);

export default router;
