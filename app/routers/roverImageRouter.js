import express from "express";
import { getRoverImage } from "../controllers/rovers.controller.js";

const router = express.Router();

router.post("/", getRoverImage);

export default router;
