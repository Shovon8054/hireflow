import db from "../../../config/db.js";
import { createNotification } from "../../student/notification/notification.controller.js";

import { getIO } from "../../../config/socket.js";

import { sendStatusEmail } from "../../../utils/email.js";


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
        const applicationId = req.params.id;

        // Update application status in DB
        await db.promise().query(
            `
            UPDATE applications
            SET status = ?
            WHERE id = ?
            `,
            [status, applicationId]
        );

        // Get student id
        const [appRows] = await db.promise().query(
            `
            SELECT student_id
            FROM applications
            WHERE id = ?
            `,
            [applicationId]
        );

        const application = appRows[0];

        if (application && application.student_id) {
            // Notification title & message
            let title = "Application Status Updated";
            let message = `Your application status has been updated to ${status}.`;

            if (status === "shortlisted") {
                title = "🎉 Congratulations!";
                message = "Your application has been shortlisted.";
            } else if (status === "rejected") {
                title = "Application Update";
                message = "Unfortunately, your application has not been selected.";
            } else if (status === "interview") {
                title = "Interview Invitation";
                message = "Congratulations! You have been selected for an interview.";
            }

            // Save in-app notification in DB (safe side effect)
            try {
                await createNotification(
                    application.student_id,
                    title,
                    message,
                    "status"
                );
            } catch (notifErr) {
                console.warn("In-app notification creation error:", notifErr.message);
            }

            // Send real-time socket notification (safe side effect)
            try {
                const io = getIO();
                if (io) {
                    io.to(application.student_id.toString()).emit("notification", {
                        title,
                        message,
                        type: "status",
                    });
                }
            } catch (socketErr) {
                console.warn("Socket emission error:", socketErr.message);
            }

            // Send email notification (safe side effect)
            try {
                const [studentRows] = await db.promise().query(
                    `
                    SELECT users.name,
                        users.email,
                        jobs.title AS job_title
                    FROM applications
                    JOIN users ON applications.student_id = users.id
                    JOIN jobs ON applications.job_id = jobs.id
                    WHERE applications.id = ?
                    `,
                    [applicationId]
                );

                const student = studentRows[0];
                if (student && student.email) {
                    await sendStatusEmail(
                        student.email,
                        student.name,
                        status,
                        student.job_title
                    );
                }
            } catch (emailErr) {
                console.warn("Email delivery error:", emailErr.message);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Status updated successfully."
        });

    } catch (error) {
        console.error("updateApplicationStatus Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update status."
        });
    }
};