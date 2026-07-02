import express from "express";

import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";

import {
    getStudents,
    getCompanies,
    blockUser,
} from "../../controllers/admin/userController.js";

const router = express.Router();


// ========================= Students =========================
router.get(
    "/users/students",
    protect,
    authorizeRoles("admin"),
    getStudents
);


// ========================= Companies =========================
router.get(
    "/users/companies",
    protect,
    authorizeRoles("admin"),
    getCompanies
);


// ========================= Block / Unblock =========================
router.put(
    "/users/block/:id",
    protect,
    authorizeRoles("admin"),
    blockUser
);

export default router;