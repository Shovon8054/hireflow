import db from "../../config/db.js";

// ========================= GET ALL JOBS =========================
export const getAllJobs = async (req, res) => {
    try{
        const [jobs] = await db.promise().query(
            `SELECT *
            FROM jobs
            WHERE is_active = TRUE
            ORDER BY created_at DESC`
        );
        res.status(200).json(jobs);
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};




// ========================= GET JOB BY ID =========================


export const getJobById = async(req,res)=>{

    try{
        const id=req.params.id;
        const [jobs]=await db.promise().query(
            `SELECT *
            FROM jobs
            WHERE id=?`,
            [id]
        );

        if(jobs.length===0){
            return res.status(404).json({
                message:"Job not found"
            });

        }
        res.json(jobs[0]);

    }
    catch(error){
        res.status(500).json({
            message:error.message
        });

    }

};