import db from "../../../config/db.js";

// get notification
export const getNotifications = async (req, res) => {
    try {
        const [notifications] = await db.promise().query(
            `
            SELECT *
            FROM notifications
            WHERE user_id = ?
            ORDER BY created_at DESC
            `,
            [req.user.id]
        );

        res.status(200).json(notifications);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch notifications",
        });
    }
};

// get unread count
export const getUnreadCount = async (req, res) => {
    try {

        const [rows] = await db.promise().query(
            `
            SELECT COUNT(*) AS count
            FROM notifications
            WHERE user_id = ?
            AND is_read = FALSE
            `,
            [req.user.id]
        );

        res.status(200).json({
            count: rows[0].count,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to fetch unread count",
        });
    }
};


// update/ mark notification as read
export const markNotificationRead = async (req, res) => {
    try {

        await db.promise().query(
            `
            UPDATE notifications
            SET is_read = TRUE
            WHERE id = ?
            AND user_id = ?
            `,
            [req.params.id, req.user.id]
        );

        res.status(200).json({
            message: "Notification marked as read",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to update notification",
        });
    }
};


// update/ mark all notification read
export const markAllNotificationsRead = async (req, res) => {
    try {

        await db.promise().query(
            `
            UPDATE notifications
            SET is_read = TRUE
            WHERE user_id = ?
            `,
            [req.user.id]
        );

        res.status(200).json({
            message: "All notifications marked as read",
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to update notifications",
        });
    }
};


// helper function to create notification
export const createNotification = async (
    userId,
    title,
    message,
    type
) => {

    const [result] = await db.promise().query(
        `
        INSERT INTO notifications
        (user_id, title, message, type)
        VALUES (?, ?, ?, ?)
        `,
        [userId, title, message, type]
    );

    return result.insertId;
};