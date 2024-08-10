import express from "express";
import { createRoom, getRoom, getRooms } from "../controllers/roomController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getRooms", authMiddleware, getRooms);
router.get("/getRoom/:id", authMiddleware, getRoom);
router.post("/create", authMiddleware, createRoom);

export default router;
