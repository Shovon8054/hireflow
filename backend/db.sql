
CREATE TABLE users (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   email VARCHAR(120) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   role ENUM('student', 'company', 'admin') NOT NULL,
   admin_type ENUM('SUPER_ADMIN', 'ADMIN') NULL,
   is_blocked BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_profiles (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   user_id BIGINT UNIQUE,
   university VARCHAR(150),
   skills TEXT,
   education TEXT,
   phone VARCHAR(20),
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE resumes (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   user_id BIGINT,
   file_name VARCHAR(255),
   file_type VARCHAR(50),
   file_data LONGBLOB NOT NULL,
   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE company_profiles (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   user_id BIGINT UNIQUE,
   company_name VARCHAR(150),
   industry VARCHAR(100),
   description TEXT,
   website VARCHAR(255),
   logo VARCHAR(255),
   is_approved BOOLEAN DEFAULT FALSE,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE jobs (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   company_id BIGINT,
   title VARCHAR(150),
   description TEXT,
   skills TEXT,
   location VARCHAR(100),
   salary_min INT,
   salary_max INT,
   is_entry_level BOOLEAN DEFAULT TRUE,
   deadline DATE,
   is_active BOOLEAN DEFAULT TRUE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (company_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE applications (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   job_id BIGINT,
   student_id BIGINT,
   resume_id BIGINT,
   status ENUM('pending', 'shortlisted', 'rejected', 'interview') DEFAULT 'pending',
   applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
   FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (resume_id) REFERENCES resumes(id)
);

CREATE TABLE bookmarks (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   user_id BIGINT,
   job_id BIGINT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   UNIQUE KEY unique_bookmark (user_id, job_id),
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
   FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

CREATE TABLE notifications (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   user_id BIGINT,
   title VARCHAR(150),
   message TEXT,
   type ENUM('job', 'application', 'status', 'admin') NOT NULL,
   is_read BOOLEAN DEFAULT FALSE,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE admin_actions (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   admin_id BIGINT,
   action_type VARCHAR(100),
   target_type VARCHAR(50),
   target_id BIGINT,
   reason TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (admin_id) REFERENCES users(id)
);

CREATE TABLE system_stats (
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   total_users INT DEFAULT 0,
   total_students INT DEFAULT 0,
   total_companies INT DEFAULT 0,
   total_jobs INT DEFAULT 0,
   total_applications INT DEFAULT 0,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);