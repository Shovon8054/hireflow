import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { getMyApplications } from "../../controllers/student/Application-history/studentApplication.controller.js";

const router = express.Router();

router.get("/", protect, getMyApplications);

export default router;