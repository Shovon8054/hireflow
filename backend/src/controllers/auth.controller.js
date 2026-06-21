import bcrypt from "bcryptjs";
import db from "../config/db.js";
import generateToken from "../utils/jwt.js";


// ================================================signin================================================
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


// =========================================log in===================================
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check user exists
    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = users[0];

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const tokenUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      admin_type: user.admin_type,
    };

    // 3. generate token
    const token = generateToken(tokenUser);

    // 4. set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: tokenUser,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



// ===============================log out==========================
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({
    message: "Logged out successfully",
  });
};