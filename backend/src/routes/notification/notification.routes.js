import express from "express";

import {
    getNotifications,
    getUnreadCount,
    markNotificationRead,
    markAllNotificationsRead,
} from "../../controllers/student/notification/notification.controller.js";

import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();


// Get all notifications
router.get(
    "/",
    protect,
    getNotifications
);


// Get unread notification count
router.get(
    "/unread-count",
    protect,
    getUnreadCount
);

// Mark one notification as read
router.put(
    "/:id/read",
    protect,
    markNotificationRead
);


// Mark all notifications as read
router.put(
    "/read-all",
    protect,
    markAllNotificationsRead
);

export default router;