import db from "../../config/db.js";


// get all students
export const getStudents = async (req, res) => {
    try {

        const [students] = await db.promise().query(
            `
            SELECT
                id,
                name,
                email,
                is_blocked,
                created_at
            FROM users
            WHERE role = 'student'
            ORDER BY created_at DESC
            `
        );

        res.status(200).json(students);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};


// get all companies
export const getCompanies = async (req, res) => {
    try {

        const [companies] = await db.promise().query(
            `
            SELECT
                users.id,
                users.name,
                users.email,
                users.is_blocked,
                company_profiles.company_name,
                company_profiles.industry,
                company_profiles.is_approved,
                users.created_at
            FROM users

            LEFT JOIN company_profiles
            ON users.id = company_profiles.user_id

            WHERE users.role = 'company'

            ORDER BY users.created_at DESC
            `
        );

        res.status(200).json(companies);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};


// block/unblock users
export const blockUser = async (req, res) => {
    try {

        const { is_blocked } = req.body;
        const userId = req.params.id;

        // Check user exists
        const [user] = await db.promise().query(
            `
            SELECT id
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (user.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await db.promise().query(
            `
            UPDATE users
            SET is_blocked = ?
            WHERE id = ?
            `,
            [is_blocked, userId]
        );

        res.status(200).json({
            message: is_blocked
                ? "User blocked successfully."
                : "User unblocked successfully."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }
};