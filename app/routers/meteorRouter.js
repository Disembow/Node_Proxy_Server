import express from "express";
import {
  getMeteors,
  getMeteorsView,
} from "../controllers/meteors.controller.js";
import { meteorsSchema } from "../utils/validation/index.js";
import { TAGS, validate } from "../utils/validation/validator.js";

const router = express.Router();

router.get("/", validate(meteorsSchema, TAGS.QUERY), getMeteors);
router.get("/view", validate(meteorsSchema, TAGS.QUERY), getMeteorsView);

export default router;
