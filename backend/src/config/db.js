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