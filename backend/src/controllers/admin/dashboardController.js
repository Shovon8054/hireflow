import db from "../../config/db.js";

export const getDashboardStats = async (req, res) => {
    try {

        // ================= Total Students =================
        const [students] = await db.promise().query(`
            SELECT COUNT(*) AS totalStudents
            FROM users
            WHERE role = 'student'
        `);

        // ================= Total Companies =================
        const [companies] = await db.promise().query(`
            SELECT COUNT(*) AS totalCompanies
            FROM users
            WHERE role = 'company'
        `);

        // ================= Total Jobs =================
        const [jobs] = await db.promise().query(`
            SELECT COUNT(*) AS totalJobs
            FROM jobs
        `);

        // ================= Active Jobs =================
        const [activeJobs] = await db.promise().query(`
            SELECT COUNT(*) AS activeJobs
            FROM jobs
            WHERE is_active = TRUE
        `);

        // ================= Expired Jobs =================
        const [expiredJobs] = await db.promise().query(`
            SELECT COUNT(*) AS expiredJobs
            FROM jobs
            WHERE is_active = FALSE
        `);

        // ================= Total Applications =================
        const [applications] = await db.promise().query(`
            SELECT COUNT(*) AS totalApplications
            FROM applications
        `);

        // ================= Blocked Users =================
        const [blockedUsers] = await db.promise().query(`
            SELECT COUNT(*) AS blockedUsers
            FROM users
            WHERE is_blocked = TRUE
        `);



        // ================= Recent Applications =================
        const [recentApplications] = await db.promise().query(`
            SELECT
                users.name AS student_name,
                jobs.title AS job_title,
                applications.status,
                applications.applied_at

            FROM applications

            JOIN users
            ON applications.student_id = users.id

            JOIN jobs
            ON applications.job_id = jobs.id

            ORDER BY applications.applied_at DESC

            LIMIT 5
        `);

        // ================= Latest Jobs =================
        const [latestJobs] = await db.promise().query(`
            SELECT
                jobs.title,
                company_profiles.company_name,
                jobs.created_at

            FROM jobs

            JOIN company_profiles
            ON jobs.company_id = company_profiles.user_id

            ORDER BY jobs.created_at DESC

            LIMIT 5
        `);

        res.status(200).json({

            totalStudents: students[0].totalStudents,

            totalCompanies: companies[0].totalCompanies,

            totalJobs: jobs[0].totalJobs,

            activeJobs: activeJobs[0].activeJobs,

            expiredJobs: expiredJobs[0].expiredJobs,

            totalApplications: applications[0].totalApplications,

            blockedUsers: blockedUsers[0].blockedUsers,


            recentApplications,

            latestJobs

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};