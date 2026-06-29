import db from "../../../config/db.js";


export const getMyApplications = async (req, res) => {
    try {

        const studentId = req.user.id;

        const [applications] = await db.promise().query(
            `
            SELECT
                applications.id,
                applications.status,
                applications.applied_at,

                jobs.id AS job_id,
                jobs.title,
                jobs.location,
                jobs.deadline,

                company_profiles.company_name

            FROM applications

            JOIN jobs
                ON applications.job_id = jobs.id

            LEFT JOIN company_profiles
                ON jobs.company_id = company_profiles.user_id

            WHERE applications.student_id = ?

            ORDER BY applications.applied_at DESC
            `,
            [studentId]
        );

        res.json(applications);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};