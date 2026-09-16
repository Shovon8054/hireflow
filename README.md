# 💼 HireFlow — Intelligent Career & Recruitment Platform

HireFlow is a full-stack, AI-powered recruitment ecosystem that connects job seekers with top employers through a modern, role-based hiring workflow. Powered by **Google Gemini AI**, HireFlow features an **AI CV Analyzer** with ATS scoring, an **AI Career Assistant**, real-time application tracking, automated notification pipelines, and specialized dashboards for Candidates, Recruiters, and Administrators.

---

## 🚀 Key Features & Capabilities

### 🎓 Candidate (Student Hub)
* **AI CV Analyzer (New)**: Upload resumes (`.pdf`, `.docx`) for instant ATS score calculation, section-by-section quality reviews, strengths/weaknesses breakdown, and prioritized improvement recommendations.
* **HireFlow AI Career Advisor**: Conversational AI mentor powered by Gemini for resume optimization, STAR-method interview coaching, and career development guidance.
* **Interactive Job Search**: Filter verified openings by skills, location (`Remote`/On-site), compensation, and experience level (`Entry Level` vs `Experienced`).
* **Instant Applications**: Apply to verified job openings with uploaded resumes and track status stages in real time.
* **Application Tracker**: Live visibility into recruitment stages (`Pending`, `Shortlisted`, `Interview`, `Rejected`).
* **Real-time Notifications**: In-app alerts and notifications powered by Socket.io and automated emails.
* **Candidate Portfolio**: Showcase verified skills, academic background, bio, and social links.

### 🏢 Recruiter (Employer Hub)
* **Job Management**: Create, publish, update, and manage job listings with customizable requirements, salary bands, and expiration deadlines.
* **Applicant Review Dashboard**: Review applicant submissions, download resumes directly, and update candidate stages with a single click.
* **Automated Candidate Communications**: Automatic status notification emails and real-time socket events triggered when candidate statuses change.
* **Company Profile**: Brand presence with industry tags, company overview, website, and logo management.

### 🛡️ Administrator
* **Platform Analytics**: Comprehensive dashboard showing user counts, active/expired job distribution, and platform application volume.
* **User & Security Management**: View, moderate, block, and manage student and employer accounts.
* **Sub-Admin Delegation**: Super Admin account controls for provisioning sub-administrators.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 18, React Router 7, Vite, Tailwind CSS, Lucide Icons, Axios |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Artificial Intelligence** | Google Gemini AI (`@google/genai`), Multi-model Fallback Architecture |
| **Document Processing** | `pdf-parse`, `mammoth` (DOCX extraction), `multer` |
| **Database** | MySQL (Connection Pooling & Structured Schemas) |
| **Authentication & Security** | JWT (JSON Web Tokens), HttpOnly Secure Cookies, Bcrypt Password Hashing |
| **Real-Time Communication** | Socket.io |
| **Email Service** | Nodemailer (SMTP) |

---

## 🏗️ System Architecture & AI Pipeline

```
[ Candidate CV Upload (.pdf / .docx) ]
                 │
                 ▼
[ Temporary Multer Buffer & Extractor ] (pdf-parse / mammoth)
                 │
                 ▼
[ Google Gemini AI Engine ] (Structured Schema Evaluation)
                 │
  ┌──────────────┴──────────────┐
  ▼                             ▼
[ ATS Score & Analysis ]   [ Guaranteed Temp File Cleanup ]
  │
  ▼
[ Structured Client Dashboard ] (Zero Database Persistence for Privacy)
```

* **Privacy-First AI Analysis**: Uploaded CV files are processed temporarily in-memory/disk and deleted immediately in `finally` blocks. Neither raw CV text nor AI outputs are stored in MySQL.
* **Multi-Model AI Resilience**: Automatic fallback cascade between Gemini models (`gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-flash`, `gemini-2.5-pro`) to ensure high availability.
* **Role-Based Access Control (RBAC)**: Enforced via secure JWT cookies and route-level authorization middleware.

---

## ⚙️ Getting Started

### Prerequisites
* **Node.js** (v18+ recommended)
* **MySQL Server**
* **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/))

---

### Database Setup

1. Create a new MySQL database:
```sql
CREATE DATABASE hireflow;
```
2. Import the provided `backend/db.sql` file into your MySQL database to instantiate all tables and relations.

---

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hireflow
DB_SSL=false

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# Google Gemini AI (Required for CV Analyzer & AI Career Advisor)
GEMINI_API_KEY=your_gemini_api_key_here

# Email Notifications (Optional for SMTP alerts)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Client URL
FRONTEND_URL=http://localhost:5173
```

---

### Installation & Execution

1. **Clone the repository:**
```bash
git clone https://github.com/Shovon8054/hireflow.git
cd hireflow
```

2. **Start Backend Server:**
```bash
cd backend
npm install
npm run dev
```
*(Backend runs on `http://localhost:5000`)*

3. **Start Frontend Client:**
```bash
cd ../frontend
npm install
npm run dev
```
*(Frontend runs on `http://localhost:5173`)*

---

## 📖 About HireFlow

HireFlow was conceived to modernize and humanize the recruitment lifecycle. By eliminating manual resume screening bottlenecks with **Google Gemini AI** and equipping candidates with immediate, actionable ATS and interview coaching, HireFlow bridges the gap between ambitious talent and forward-thinking companies.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
