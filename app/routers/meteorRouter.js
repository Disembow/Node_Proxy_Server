import express from "express";
import {
  getMeteors,
  getMeteorsView,
} from "../controllers/meteors.controller.js";

const router = express.Router();

router.get("/", getMeteors);
router.get("/view", getMeteorsView);

export default router;
