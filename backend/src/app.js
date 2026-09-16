import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

import authRoutes from "./routes/auth.routes.js";

// student
import studentProfileRoutes from "./routes/studentRoutes/studentProfile.routes.js";
import studentJobRoutes from "./routes/studentRoutes/job.routes.js"

// company
import companyProfileRoutes from "./routes/companyRoutes/companyProfile.routes.js";
import jobRoutes from "./routes/companyRoutes/job.routes.js";

// application
import applicationRoutes from "./routes/application/application.routes.js";

// applicants
import companyApplicantRoutes from "./routes/application/applicants.routes.js";

// application history
import studentApplicationRoutes from "./routes/application-history/studentApplication.routes.js";

// notification
import notificationRoutes from "./routes/notification/notification.routes.js";

// admin
import adminRoutes from "./routes/admin/admin.routes.js";

// cv analyzer
import cvRoutes from "./routes/cv/cv.routes.js";

// ai chat
import chatRoutes from "./routes/chat/chat.routes.js";


const app = express();

// ─── CORS: manually inject headers so preflight always works ───────────────
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isAllowed =
    !origin ||
    origin.startsWith("http://localhost") ||
    origin.endsWith(".vercel.app") ||
    (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL.replace(/\/$/, ""));

  if (isAllowed) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
  }

  // Handle OPTIONS preflight immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
// http://localhost:8080/api/auth/signup

app.use("/api/profile", studentProfileRoutes);
// GET  http://localhost:8080/api/profile
// POST http://localhost:8080/api/profile


app.use("/api/company-profile", companyProfileRoutes);
// GET http://localhost:8080/api/company-profile
// POST http://localhost:8080/api/company-profile

// job post
app.use("/api/jobs",jobRoutes);
// POST http://localhost:8080/api/jobs
// GET http://localhost:8080/api/jobs
// PUT http://localhost:8080/api/jobs/1
// DELETE http://localhost:8080/api/jobs/1


app.use("/api/student-jobs",studentJobRoutes);
// http://localhost:8080/api/student-jobs/:id
// http://localhost:8080/api/student-jobs

// ============================================application===================================
app.use("/api/applications", applicationRoutes);



// ==================applicants================
app.use("/api/applicants", companyApplicantRoutes);
// /api/applicants
// /api/applicants/resume/:id


// application history
app.use("/api/my-applications", studentApplicationRoutes);


// notification
app.use("/api/notifications", notificationRoutes);
// http://localhost:8080/api/notifications
// http://localhost:8080/api/notifications/unread-count
// http://localhost:8080/api/notifications/:id/read
// http://localhost:8080/api/notifications/read-all


// ====================================================admin=====================================
app.use("/api/admin", adminRoutes);

// ====================================================cv analyzer===============================
app.use("/api/cv", cvRoutes);

// ====================================================ai chat===================================
app.use("/api/chat", chatRoutes);

// test route
app.get("/", (req, res) => {
  res.send("HireFlow API Running");
});

export default app;