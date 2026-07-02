import express from "express";

import { protect } from "../../middlewares/auth.middleware.js";
import { authorizeRoles } from "../../middlewares/role.middleware.js";
import { isSuperAdmin } from "../../middlewares/superAdmin.middleware.js";

import {
    getStudents,
    getCompanies,
    blockUser,
} from "../../controllers/admin/userController.js";

import {
    createSubAdmin,
    getAllAdmins,
    deleteSubAdmin,
} from "../../controllers/admin/adminController.js";

const router = express.Router();


// ======================================================
// Student Management
// ======================================================

// Get all students
router.get(
    "/users/students",
    protect,
    authorizeRoles("admin"),
    getStudents
);


// ======================================================
// Company Management
// ======================================================

// Get all companies
router.get(
    "/users/companies",
    protect,
    authorizeRoles("admin"),
    getCompanies
);


// ======================================================
// Block / Unblock User
// ======================================================

router.put(
    "/users/block/:id",
    protect,
    authorizeRoles("admin"),
    blockUser
);


// ======================================================
// Super Admin Management
// ======================================================

// Create Sub Admin
router.post(
    "/create-admin",
    protect,
    authorizeRoles("admin"),
    isSuperAdmin,
    createSubAdmin
);


// Get All Admins
router.get(
    "/admins",
    protect,
    authorizeRoles("admin"),
    isSuperAdmin,
    getAllAdmins
);


// Delete Sub Admin
router.delete(
    "/admins/:id",
    protect,
    authorizeRoles("admin"),
    isSuperAdmin,
    deleteSubAdmin
);

export default router;