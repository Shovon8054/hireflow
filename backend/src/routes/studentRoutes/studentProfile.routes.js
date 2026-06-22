import express from "express";
import { createStudentProfile, getStudentProfile } from "../../controllers/student/studentProfile.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getStudentProfile);
router.post("/", protect, createStudentProfile);

export default router;