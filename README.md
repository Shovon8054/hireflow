# HireFlow — Production-Grade Talent Acquisition Portal

HireFlow is a robust, full-stack recruitment platform engineered to connect emerging professionals with companies. Built on a modern decoupled architecture using the **PERN ecosystem (MySQL, Express.js, React, Node.js)**, it features role-based access control, real-time event notifications, automated workflows, and comprehensive administrative moderation tools.

🚀 **Live Demos**:
- **Frontend App**: [hireflow-henna-seven.vercel.app](https://hireflow-henna-seven.vercel.app)
- **Backend API**: [hireflow-backend-rlzu.onrender.com](https://hireflow-backend-rlzu.onrender.com)

---

## 🏗️ Architectural Overview & Highlights

- **Decoupled Client-Server Communication**: Built with a dedicated React client and Express REST API, configured for cross-origin credentials and strict production security measures.
- **Enterprise Role-Based Access Control (RBAC)**: Secure access gating using JSON Web Tokens (JWT) stored in `HttpOnly` cookie stores with production-ready `SameSite=None` and `Secure=true` headers to defend against CSRF attacks.
- **Real-Time Synchronous Messaging**: Multi-channel communication layer utilizing WebSockets (`Socket.io`) to stream instant updates directly to users.
- **Automated Workflows**: Hourly cron-like daemon built using background system loops to automatically evaluate deadlines and suspend expired listings.
- **Binary Stream Processing**: Document parser configurations using `multer` memory buffers to securely handle PDF CV uploads.

---

## 💎 Core Feature Set

### 👨‍🎓 Student / Candidate Portal
* **Dynamic Profile Management**: Custom university education metrics and comma-separated skills tags.
* **Smart Resume Uploader**: Fast upload pipeline validating file sizes and parsing PDF streams.
* **Granular Search & Filters**: Job discovery filters based on technical skills matching, geographic location, salary thresholds, and entry-level specifications.
* **Instant status tracking**: Keep tabs on application stages (`pending`, `shortlisted`, `interview`, `rejected`) in real-time.
* **HireFlow AI Assistant**: Chatbot interface integrated with custom backend workflows for smart suggestions.

### 🏢 Recruiter / Corporate Portal
* **Company Profile Setup**: Dedicated space to configure industry descriptors, external websites, and logo assets.
* **Job Listing CRUD**: Detailed form controls to post jobs with target parameters and custom deadlines.
* **Applicant Processing Pipelines**: Structured candidate grids providing single-click resume downloads and application state transitions.
* **Automated Notification Triggers**: Candidate state transitions automatically fire a dual-notification payload: direct socket push event to the user and an HTML email via SMTP transport.

### 🛡️ Administrative Console
* **Moderation Panels**: Block or unblock users to enforce code-of-conduct guidelines.
* **Two-Level Hierarchy**: Gated workflows distinguishing **Super Admins** (who can manage administrative team creation) from **Sub Admins**.
* **Metrics Dashboard**: Centralized view showcasing aggregate statistics (Students vs Companies ratio, Active/Expired listing counts, and Application queues).

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|---|---|---|
| **Frontend** | React, React Router 7, Axios, Tailwind CSS | High performance, single-page application dashboard with responsive layout controls. |
| **Backend** | Node.js, Express.js | Stateless REST API service handling routing, middleware, and services. |
| **Database** | MySQL | Strongly typed relational schema with transactional integrity and cascade constraints. |
| **Sockets** | Socket.io | Bi-directional, real-time message exchange client and server gateways. |
| **Mailing** | Nodemailer | Automated transactional email notifications using SMTP services. |
| **Auth** | JWT, Cookie-Parser, Bcrypt | Encrypted password storage and token signature verifications. |

---

## 🚀 Local Quickstart

### Prerequisites
- Node.js (v18+)
- MySQL instance

### Database Initialisation
Connect to your local MySQL instance and run:
```sql
CREATE DATABASE hireflow;
```
Import the schema definitions from [db.sql](backend/db.sql) to set up all tables.

### Configure Environment Variables
Create a `.env` file in your `backend/` folder based on the [backend/.env.example](backend/.env.example) template:
```ini
PORT=8080
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hireflow
DB_SSL=false
JWT_SECRET=your_jwt_signature_secret
EMAIL_USER=your_smtp_gmail
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

### Install and Run
```bash
# Clone the repository
git clone https://github.com/Shovon8054/hireflow.git
cd hireflow

# Setup Backend
cd backend
npm install
npm run dev

# Setup Frontend (in a new terminal tab)
cd ../frontend
npm install
npm run dev
```
