import nodemailer from "nodemailer";

export const sendStatusEmail = async (
    to,
    studentName,
    status,
    jobTitle
) => {
    // Only attempt sending if credentials are provided in environment
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return;
    }

    if (!to || status === "pending") {
        return;
    }

    let subject = "";
    let html = "";

    if (status === "shortlisted") {
        subject = "Congratulations! You have been shortlisted";
        html = `
            <h2>Congratulations ${studentName || "Candidate"} 🎉</h2>
            <p>You have been <b>shortlisted</b> for the following job:</p>
            <h3>${jobTitle || "Open Position"}</h3>
            <p>Please wait for further instructions.</p>
            <br>
            <p>Best Regards,</p>
            <p>HireFlow Team</p>
        `;
    } else if (status === "rejected") {
        subject = "Application Update";
        html = `
            <h2>Hello ${studentName || "Candidate"}</h2>
            <p>Thank you for applying for <b>${jobTitle || "the position"}</b>.</p>
            <p>Unfortunately, your application was not selected to move forward at this time.</p>
            <p>We encourage you to explore other opportunities on HireFlow.</p>
            <br>
            <p>Best Regards,</p>
            <p>HireFlow Team</p>
        `;
    } else if (status === "interview") {
        subject = "Interview Invitation";
        html = `
            <h2>Hello ${studentName || "Candidate"}</h2>
            <p>Congratulations!</p>
            <p>You have been selected for an interview for <b>${jobTitle || "the position"}</b>.</p>
            <p>Please check your HireFlow account for upcoming scheduling and details.</p>
            <br>
            <p>Best Regards,</p>
            <p>HireFlow Team</p>
        `;
    } else {
        return;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
    } catch (err) {
        console.warn("Could not dispatch status email:", err.message);
    }
};