import express from "express";

import {protect} from "../../middlewares/auth.middleware.js";

import{
getAllJobs,
getJobById
}

from "../../controllers/student/job.controller.js";

const router=express.Router();

router.get("/",getAllJobs);

router.get("/:id",getJobById);


export default router;