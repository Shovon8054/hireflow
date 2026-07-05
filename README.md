# HireFlow

HireFlow is a full-stack recruitment platform that connects job seekers with employers through a modern, role-based hiring workflow. The application enables candidates to build professional profiles, apply for jobs, track application progress, and receive real-time notifications, while recruiters can manage job postings, review applicants, and communicate hiring decisions. An administrative dashboard provides moderation and platform management capabilities.


## Features

### Candidate

| Feature              | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| Authentication       | Secure registration and login using JWT authentication                   |
| Profile Management   | Create and update professional profiles, education, skills, and resume   |
| Resume Upload        | Upload PDF resumes with file validation                                  |
| Job Search           | Search and filter jobs by skills, location, salary, and experience level |
| Job Applications     | Apply for jobs and manage submitted applications                         |
| Application Tracking | Track application status (Pending, Shortlisted, Interview, Rejected)     |
| Notifications        | Receive real-time notifications for application updates                  |
| AI Assistant         | Interact with the HireFlow AI assistant for career-related assistance    |

### Recruiter

| Feature              | Description                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| Company Profile      | Create and manage company information, website, industry, and logo                                    |
| Job Management       | Create, edit, delete, and manage job postings                                                         |
| Applicant Management | Review applications, download resumes, and manage hiring stages                                       |
| Status Updates       | Update candidate application status throughout the recruitment process                                |
| Notifications        | Automatically notify candidates via real-time notifications and email when application status changes |

### Administrator

| Feature             | Description                                                                        |
| ------------------- | ---------------------------------------------------------------------------------- |
| User Management     | View, block, unblock, and manage platform users                                    |
| Admin Management    | Super Admin can create and manage Sub Admin accounts                               |
| Dashboard           | View platform statistics, user counts, active jobs, expired jobs, and applications |
| Platform Moderation | Monitor and manage platform activities                                             |

---

## Key Features

* JWT Authentication
* Role-Based Access Control (Candidate, Recruiter, Admin)
* Secure Authentication using HttpOnly Cookies
* Protected Routes
* Resume Upload with PDF Validation
* Real-Time Notifications using Socket.io
* Email Notifications using Nodemailer
* Automated Job Expiration
* Job Search & Advanced Filtering
* Company Profile Management
* Applicant Tracking System
* Administrative Dashboard
* Responsive User Interface

---

## Technology Stack

| Category                    | Technologies                               |
| --------------------------- | ------------------------------------------ |
| **Frontend**                | React, React Router 7, Tailwind CSS, Axios |
| **Backend**                 | Node.js, Express.js                        |
| **Database**                | MySQL                                      |
| **Authentication**          | JWT, HttpOnly Cookies, Bcrypt              |
| **Real-Time Communication** | Socket.io                                  |
| **File Upload**             | Multer                                     |
| **Email Service**           | Nodemailer                                 |

---

## System Architecture

* Decoupled React frontend and Express REST API
* Role-Based Access Control (RBAC)
* JWT Authentication with HttpOnly Cookies
* RESTful API Architecture
* Real-Time Communication using Socket.io
* Automated background jobs for expired job management
* Secure PDF resume upload and storage
* Transactional email notifications

---


---

## Getting Started

### Prerequisites

* Node.js (v18 or later)
* MySQL Server

### Database Setup

Create a new MySQL database:

```sql
CREATE DATABASE hireflow;
```

Import the provided `db.sql` file to create all required tables.

---

## Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hireflow
DB_SSL=false

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASS=your_app_password

FRONTEND_URL=http://localhost:5173
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/Shovon8054/hireflow.git
cd hireflow
```

Install backend dependencies.

```bash
cd backend
npm install
npm run dev
```

Open another terminal and start the frontend.

```bash
cd frontend
npm install
npm run dev
```

The application will now be available locally.

---

## Project Objectives

HireFlow is designed to simplify the recruitment process by providing an integrated platform for candidates, recruiters, and administrators. The project focuses on secure authentication, efficient hiring workflows, real-time communication, and scalable full-stack architecture.

This project demonstrates practical experience with:

* Full-Stack Web Development
* RESTful API Design
* Role-Based Access Control (RBAC)
* JWT Authentication
* Secure Cookie-Based Authentication
* Real-Time Communication with Socket.io
* File Upload & Validation
* Email Notification Systems
* Relational Database Design
* CRUD Operations
* Responsive Frontend Development
* Client–Server Architecture
