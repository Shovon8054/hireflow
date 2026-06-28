import db from "../../../config/db.js";


// ============================get applicants details based on job they applied====================
export const getCompanyApplicants = async (req, res) => {

    try {

        const companyId = req.user.id;

        const [jobs] = await db.promise().query(
            `
            SELECT
                id,
                title
            FROM jobs
            WHERE company_id = ?
            ORDER BY created_at DESC
            `,

            [companyId]
        );

        for (const job of jobs) {
            const [applicants] = await db.promise().query(
                `
                SELECT

                applications.id,
                applications.status,
                applications.applied_at,

                users.name,
                users.email,

                resumes.id AS resume_id,
                resumes.file_name

                FROM applications

                JOIN users
                ON applications.student_id = users.id

                JOIN resumes
                ON applications.resume_id = resumes.id

                WHERE applications.job_id = ?

                ORDER BY applications.applied_at DESC
                `,
                [job.id]
            );
            job.applicants = applicants;
        }
        res.json(jobs);

    }

    catch (error) {
        res.status(500).json({
            message: error.message

        });

    }

};



// =================================download resume====================================
export const downloadResume = async (req, res) => {

    try {

        const id = req.params.id;
        const [resume] = await db.promise().query(
            `
            SELECT *
            FROM resumes
            WHERE id = ?
            `,
            [id]
        );

        if (resume.length === 0) {
            return res.status(404).json({
                message: "Resume not found"

            });

        }
        res.setHeader(
            "Content-Type",
            resume[0].file_type

        );

        res.setHeader(

            "Content-Disposition",
            `attachment; filename="${resume[0].file_name}"`

        );

        res.send(resume[0].file_data);

    }

    catch (error) {

        res.status(500).json({
            message: error.message

        });

    }

};


// update application status
export const updateApplicationStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const id = req.params.id;

        await db.promise().query(

            `
            UPDATE applications
            SET status=?
            WHERE id=?
            `,

            [status, id]

        );

        res.json({

            message: "Status updated successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};