import express from "express";
import {
  getMeteors,
  getMeteorsView,
} from "../controllers/meteors.controller.ts";
import { meteorsSchema } from "../utils/validation/index.ts";
import { validate } from "../utils/validation/validator.ts";

const router = express.Router();

router.get("/", validate(meteorsSchema, "query"), getMeteors);
router.get("/view", validate(meteorsSchema, "query"), getMeteorsView);

export default router;
