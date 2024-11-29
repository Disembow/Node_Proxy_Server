import express from "express";
import { getMeteors } from "../controllers/meteors.controller.js";

const router = express.Router();

router.get("/", getMeteors);

export default router;
