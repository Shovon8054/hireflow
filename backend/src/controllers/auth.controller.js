import bcrypt from "bcryptjs";
import db from "../config/db.js";
import generateToken from "../utils/jwt.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, admin_type } = req.body;

    // 1. check user exists
    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. admin logic
    const finalAdminType =
      role === "admin" ? (admin_type || "ADMIN") : null;

    // 4. insert user
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

    // 5. generate token
    const token = generateToken(user);

    // 6. SET COOKIE 
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};