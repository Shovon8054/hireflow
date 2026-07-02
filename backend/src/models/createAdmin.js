import bcrypt from "bcrypt";
import db from "../config/db.js";

const createAdmin = async () => {
    try {

        const email = "admin@hireflow.com";

        
        const [existingAdmin] = await db.promise().query(
            `
            SELECT id
            FROM users
            WHERE email = ?
            `,
            [email]
        );

        if (existingAdmin.length > 0) {
            console.log("Super Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        await db.promise().query(
            `
            INSERT INTO users
            (
                name,
                email,
                password,
                role,
                admin_type
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                "Super Admin",
                email,
                hashedPassword,
                "admin",
                "SUPER_ADMIN"
            ]
        );

        console.log("Super Admin created successfully.");

        process.exit();

    } catch (error) {

        console.error(error);
        process.exit();

    }
};

createAdmin();