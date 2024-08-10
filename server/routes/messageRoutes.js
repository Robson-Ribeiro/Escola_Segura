import express from "express";
import { sendMessageToRoom } from "../controllers/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send/:id", authMiddleware, sendMessageToRoom);

export default router;