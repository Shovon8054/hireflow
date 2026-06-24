import express from "express";

import { protect } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/upload.middleware.js";

import {getCompanyProfile, createCompanyProfile} from "../../controllers/company/companyProfile.js";


const router = express.Router();



router.get("/", protect, getCompanyProfile);

router.post("/", protect, upload.single("logo"), createCompanyProfile);



export default router;