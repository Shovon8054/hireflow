import express from "express";

import {
    applyJob,
    getMyApplications
} from "../../controllers/student/apply-job/application.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

import upload from "../../config/multer.js";

const router = express.Router();



router.post(
    "/",
    protect,
    upload.single("resume"),
    applyJob
);


router.get(
    "/",
    protect,
    getMyApplications
);

export default router;