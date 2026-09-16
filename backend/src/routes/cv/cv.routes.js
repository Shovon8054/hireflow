import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { cvUploadMiddleware } from "../../middlewares/cvUpload.middleware.js";
import { analyzeCV } from "../../controllers/cv/cvAnalyzer.controller.js";

const router = express.Router();

/**
 * @route   POST /api/cv/analyze
 * @desc    Upload CV temporarily and get AI-powered evaluation
 * @access  Protected (Authenticated users only)
 */
router.post("/analyze", protect, cvUploadMiddleware, analyzeCV);

export default router;
