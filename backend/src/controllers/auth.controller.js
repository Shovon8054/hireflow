import bcrypt from "bcryptjs";
import db from "../config/db.js"
import generateToken from "../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, admin_type } = req.body;

    // 1. Check if user exists
    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const finalAdminType = role === "admin" ? (admin_type || "ADMIN") : null;

    const [result] = await db.promise().query(
      "INSERT INTO users (name, email, password, role, admin_type) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashedPassword, role, finalAdminType]
    );

    const user = {
      id: result.insertId,
      name,
      email,
      role,
      admin_type: finalAdminType,
    };

    const token = generateToken(user);

    return res.status(201).json({
      message: "User created successfully",
      user,
      token,
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};