import nodemailer from "nodemailer";
import dotenv from "dotenv";;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendStatusEmail = async (
    to,
    studentName,
    status,
    jobTitle
) => {

    let subject = "";
    let html = "";

    if (status === "shortlisted") {

        subject = "Congratulations! You have been shortlisted";

        html = `
            <h2>Congratulations ${studentName} 🎉</h2>

            <p>You have been <b>shortlisted</b> for the following job:</p>

            <h3>${jobTitle}</h3>

            <p>Please wait for further instructions.</p>

            <br>

            <p>Best Regards</p>
            <p>HireFlow</p>
        `;
    }

    else if (status === "rejected") {

        subject = "Application Update";

        html = `
            <h2>Hello ${studentName}</h2>

            <p>Unfortunately, your application for <b>${jobTitle}</b> has been rejected.</p>

            <p>We encourage you to apply for other opportunities.</p>

            <br>

            <p>HireFlow</p>
        `;
    }

    else if (status === "interview") {

        subject = "Interview Invitation";

        html = `
            <h2>Hello ${studentName}</h2>

            <p>Congratulations!</p>

            <p>You have been selected for an interview for <b>${jobTitle}</b>.</p>

            <p>Please check your HireFlow account for updates.</p>

            <br>

            <p>HireFlow Team</p>
        `;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    });
};