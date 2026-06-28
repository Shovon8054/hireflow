import express from "express";

import {
    getCompanyApplicants,
    downloadResume,
    updateApplicationStatus
} from "../../controllers/company/applicants/applicants.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";


const router = express.Router();


router.get("/", protect, getCompanyApplicants);

router.get("/resume/:id", protect, downloadResume);

router.put("/:id", protect, updateApplicationStatus);



export default router;