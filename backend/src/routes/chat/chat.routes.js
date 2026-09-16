import express from "express";
import { handleChat } from "../../controllers/chat/chat.controller.js";

const router = express.Router();

/**
 * @route   POST /api/chat
 * @desc    Send message to HireFlow AI Career Assistant (powered by Gemini)
 * @access  Public / Authenticated
 */
router.post("/", handleChat);

export default router;
