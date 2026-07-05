import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined
});

const runMigrations = async (connection) => {
  try {
    const [rows] = await connection.promise().query("SHOW TABLES LIKE 'users'");
    if (rows.length === 0) {
      console.log("Migration: 'users' table not found. Creating database schema...");
      const sqlPath = path.resolve(__dirname, "../../db.sql");
      const sqlContent = fs.readFileSync(sqlPath, "utf8");
      
      const statements = sqlContent
        .split(";")
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
        
      for (const statement of statements) {
        await connection.promise().query(statement);
      }
      console.log("Migration: Database schema successfully imported!");
    } else {
      console.log("Migration: Schema already exists. Skipping.");
    }

    // Ensure Super Admin exists
    const [admins] = await connection.promise().query("SELECT id FROM users WHERE email = 'admin@hireflow.com'");
    if (admins.length === 0) {
      console.log("Migration: Super Admin not found. Creating default admin...");
      const bcrypt = await import("bcryptjs");
      const hashedPassword = await bcrypt.default.hash("admin123", 10);
      await connection.promise().query(
        "INSERT INTO users (name, email, password, role, admin_type) VALUES (?, ?, ?, ?, ?)",
        ["Super Admin", "admin@hireflow.com", hashedPassword, "admin", "SUPER_ADMIN"]
      );
      console.log("Migration: Default Super Admin created (admin@hireflow.com / admin123)!");
    }
  } catch (err) {
    console.error("Migration failed:", err.message);
  }
};

db.connect(async (err) => {
  if (err) {
    console.log("DB Error", err.message);
  } else {
    console.log("MySQL Connected");
    await runMigrations(db);
  }
});

export default db;