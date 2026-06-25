import express from "express";

import {protect} from "../../middlewares/auth.middleware.js";

import{
createJob,
getJobs,
updateJob,
deleteJob
}

from "../../controllers/company/jobController.js";

const router=express.Router();


router.post("/",protect,createJob);

router.get("/",protect,getJobs);

router.put("/:id",protect,updateJob);

router.delete("/:id",protect,deleteJob);



export default router;