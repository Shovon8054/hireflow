import db from "../../config/db.js";


// ================================= CREATE JOB ==============================
export const createJob = async (req,res)=>{
    try{

        const companyId = req.user.id;

        const{
            title,
            description,
            skills,
            location,
            salary_min,
            salary_max,
            deadline
        } = req.body;


        await db.promise().query(

            `INSERT INTO jobs(
            company_id,
            title,
            description,
            skills,
            location,
            salary_min,
            salary_max,
            deadline
            )

            VALUES(?,?,?,?,?,?,?,?)`,

            [
                companyId,
                title,
                description,
                skills,
                location,
                salary_min,
                salary_max,
                deadline
            ]

        );


        res.status(201).json({
            message:"Job created"
        });
    }

    catch(error){
        res.status(500).json({
            message:error.message
        });

    }
};


/* ================= GET COMPANY JOBS ================= */

export const getJobs = async(req,res)=>{

    try{

        const companyId = req.user.id;


        const [jobs] = await db.promise().query(

            `SELECT *
            FROM jobs
            WHERE company_id=?`,

            [companyId]

        );

        res.json(jobs);


    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




/* ================= UPDATE JOB ================= */

export const updateJob = async(req,res)=>{


    try{
        const id = req.params.id;
        const{

            title,
            description,
            skills,
            location,
            salary_min,
            salary_max,
            deadline

        } = req.body;


        await db.promise().query(

            `UPDATE jobs

            SET title=?,
            description=?,
            skills=?,
            location=?,
            salary_min=?,
            salary_max=?,
            deadline=?

            WHERE id=?`,

            [
                title,
                description,
                skills,
                location,
                salary_min,
                salary_max,
                deadline,
                id

            ]

        );
        res.json({
            message:"Job updated"
        });

    }
    catch(error){

        res.status(500).json({

            message:error.message

        });
    }

};



/* ================= DELETE JOB ================= */
export const deleteJob = async(req,res)=>{
    try{
        const id=req.params.id;
        await db.promise().query(

            `DELETE FROM jobs
            WHERE id=?`,

            [id]
        );

        res.json({
            message:"Job deleted"
        });
    }

    catch(error){
        res.status(500).json({
            message:error.message

        });

    }

};