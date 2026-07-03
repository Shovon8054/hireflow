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


        const finalSalaryMin = (salary_min === "" || salary_min === undefined || salary_min === null) ? null : salary_min;
        const finalSalaryMax = (salary_max === "" || salary_max === undefined || salary_max === null) ? null : salary_max;

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
                finalSalaryMin,
                finalSalaryMax,
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


        const finalSalaryMin = (salary_min === "" || salary_min === undefined || salary_min === null) ? null : salary_min;
        const finalSalaryMax = (salary_max === "" || salary_max === undefined || salary_max === null) ? null : salary_max;

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
                finalSalaryMin,
                finalSalaryMax,
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






// =========================expired job ============================

export const disableExpiredJobs=async()=>{
    await db.promise().query(
        `UPDATE jobs
        SET is_active=FALSE
        WHERE deadline < CURDATE()`

    );

};