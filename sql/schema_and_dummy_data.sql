-- Create database
CREATE DATABASE IF NOT EXISTS sams_db;
USE sams_db;

-- Faculty login table (simple prototype auth)
CREATE TABLE IF NOT EXISTS faculty_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

-- Required table: students
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  roll_no VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);

-- Required table: subjects
CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL
);

-- Required table: attendance
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present', 'Absent') NOT NULL,
  UNIQUE KEY unique_attendance (student_id, subject_id, date),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

-- Faculty dummy account
INSERT INTO faculty_users (name, email, password)
VALUES ('Dr. Meera Sharma', 'faculty@sams.com', 'faculty123')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Student dummy data (8 students)
INSERT INTO students (name, roll_no, email, password) VALUES
('Aarav Singh', 'BT21CS001', 'aarav@sams.com', 'student123'),
('Diya Patel', 'BT21CS002', 'diya@sams.com', 'student123'),
('Rohan Verma', 'BT21CS003', 'rohan@sams.com', 'student123'),
('Ishita Rao', 'BT21CS004', 'ishita@sams.com', 'student123'),
('Kunal Gupta', 'BT21CS005', 'kunal@sams.com', 'student123'),
('Neha Iyer', 'BT21CS006', 'neha@sams.com', 'student123'),
('Priyansh Jain', 'BT21CS007', 'priyansh@sams.com', 'student123'),
('Sana Khan', 'BT21CS008', 'sana@sams.com', 'student123')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Subject dummy data (3 subjects)
INSERT INTO subjects (subject_name) VALUES
('Database Management Systems'),
('Operating Systems'),
('Computer Networks');

-- Some attendance records
INSERT INTO attendance (student_id, subject_id, date, status) VALUES
(1, 1, '2026-04-10', 'Present'),
(2, 1, '2026-04-10', 'Absent'),
(3, 1, '2026-04-10', 'Present'),
(4, 1, '2026-04-10', 'Present'),
(5, 1, '2026-04-10', 'Absent'),
(1, 2, '2026-04-11', 'Present'),
(2, 2, '2026-04-11', 'Present'),
(3, 2, '2026-04-11', 'Absent'),
(4, 2, '2026-04-11', 'Present'),
(1, 3, '2026-04-12', 'Absent'),
(2, 3, '2026-04-12', 'Present'),
(3, 3, '2026-04-12', 'Present'),
(4, 3, '2026-04-12', 'Absent')
ON DUPLICATE KEY UPDATE status = VALUES(status);
