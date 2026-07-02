import bcrypt from "bcrypt";
import db from "../config/db.js";

const createAdmin = async () => {
    try {

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await db.promise().query(
            `
            INSERT INTO users
            (name, email, password, role)
            VALUES (?, ?, ?, ?)
            `,
            [
                "Admin",
                "admin@hireflow.com",
                hashedPassword,
                "admin",
            ]
        );

        console.log("Admin created successfully.");

        process.exit();

    } catch (error) {

        console.error(error);

        process.exit();

    }
};

createAdmin();