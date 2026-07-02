import db from "../../config/db.js";

// ========================= GET ALL JOBS =========================
export const getAllJobs = async (req, res) => {
    try {

        const {
            skills,
            location,
            entryLevel,
            minSalary,
            maxSalary
        } = req.query;

        let sql = `
            SELECT *
            FROM jobs
            WHERE is_active = TRUE
        `;

        const values = [];

        // Filter by Skills
        if (skills) {
            sql += ` AND skills LIKE ?`;
            values.push(`%${skills}%`);
        }

        // Filter by Location
        if (location) {
            sql += ` AND location LIKE ?`;
            values.push(`%${location}%`);
        }

        // Filter Entry Level
        if (entryLevel === "true") {
            sql += ` AND is_entry_level = TRUE`;
        }

        // Minimum Salary
        if (minSalary) {
            sql += ` AND salary_min >= ?`;
            values.push(minSalary);
        }

        // Maximum Salary
        if (maxSalary) {
            sql += ` AND salary_max <= ?`;
            values.push(maxSalary);
        }

        sql += ` ORDER BY created_at DESC`;

        const [jobs] = await db.promise().query(sql, values);

        res.status(200).json(jobs);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};




// ========================= GET single job=========================


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