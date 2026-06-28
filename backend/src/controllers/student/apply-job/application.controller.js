import db from "../../../config/db.js";

export const applyJob = async (req, res) => {

    try {
        const studentId = req.user.id;
        const { job_id } = req.body;

        // Resume uploaded by multer
        const resume = req.file;
        if (!resume) {
            return res.status(400).json({
                message: "Resume is required."
            });
        }

        // Check duplicate application
        const [applications] = await db.promise().query(
            `
            SELECT *
            FROM applications
            WHERE student_id = ?
            AND job_id = ?
            `,

            [studentId, job_id]

        );
        if (applications.length > 0) {
            return res.status(400).json({
                message: "You have already applied for this job."
            });
        }


        // Save resume
        const [resumeResult] = await db.promise().query(

            `
            INSERT INTO resumes
            (
                user_id,
                file_name,
                file_type,
                file_data
            )

            VALUES (?, ?, ?, ?)
            `,

            [
                studentId,
                resume.originalname,
                resume.mimetype,
                resume.buffer
            ]

        );

        const resumeId = resumeResult.insertId;


        // Save application
        await db.promise().query(
            `
            INSERT INTO applications
            (
                job_id,
                student_id,
                resume_id
            )
            VALUES (?, ?, ?)
            `,

            [
                job_id,
                studentId,
                resumeId
            ]

        );


        res.status(201).json({

            message: "Application submitted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// Get Student Application History
export const getMyApplications = async (req, res) => {

    try {

        const studentId = req.user.id;

        const [applications] = await db.promise().query(

            `
            SELECT

            applications.id,
            jobs.title,
            jobs.location,
            applications.status,
            applications.applied_at

            FROM applications

            JOIN jobs
            ON applications.job_id = jobs.id
            WHERE applications.student_id = ?
            ORDER BY applications.applied_at DESC
            `,

            [studentId]

        );

        res.json(applications);

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });

    }

};