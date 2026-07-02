import bcrypt from "bcrypt";
import db from "../../config/db.js";


// create admin
export const createSubAdmin = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Check email exists
        const [users] = await db.promise().query(
            `
            SELECT id
            FROM users
            WHERE email = ?
            `,
            [email]
        );

        if (users.length > 0) {
            return res.status(400).json({
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
                name,
                email,
                hashedPassword,
                "admin",
                "SUB_ADMIN"
            ]
        );

        res.status(201).json({
            message: "Sub Admin created successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};



// get all admin
export const getAllAdmins = async (req, res) => {

    try {

        const [admins] = await db.promise().query(
            `
            SELECT
                id,
                name,
                email,
                admin_type,
                created_at
            FROM users
            WHERE role='admin'
            ORDER BY created_at DESC
            `
        );

        res.status(200).json(admins);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};




// delete sub admin
export const deleteSubAdmin = async (req, res) => {

    try {

        const adminId = req.params.id;

        // Prevent deleting yourself
        if (Number(adminId) === req.user.id) {

            return res.status(400).json({
                message: "You cannot delete yourself."
            });

        }

        const [admins] = await db.promise().query(
            `
            SELECT
                id,
                admin_type
            FROM users
            WHERE id=?
            AND role='admin'
            `,
            [adminId]
        );

        if (admins.length === 0) {

            return res.status(404).json({
                message: "Admin not found."
            });

        }

        // Cannot delete Super Admin
        if (admins[0].admin_type === "SUPER_ADMIN") {

            return res.status(403).json({
                message: "Super Admin cannot be deleted."
            });

        }

        await db.promise().query(
            `
            DELETE FROM users
            WHERE id=?
            `,
            [adminId]
        );

        res.status(200).json({
            message: "Sub Admin deleted successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};