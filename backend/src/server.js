import dotenv from "dotenv";
import app from "./app.js";
import db from "./config/db.js";

import {disableExpiredJobs} from "./controllers/company/jobController.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

setInterval(async()=>{
  try{
    await disableExpiredJobs();
    console.log("expired job disabled")
  } catch(err){
    console.error(err);
  }
}, 3600000)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});