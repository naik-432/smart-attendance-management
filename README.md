# Smart Attendance Management System (SAMS) - Prototype

Simple full-stack B.Tech project prototype using:
- Node.js + Express
- MySQL
- Basic HTML/CSS

## Project Structure

```text
smart-attendance-management/
  routes/
    auth.js
    attendance.js
    dashboard.js
  views/
    login.html
    faculty_dashboard.html
    student_dashboard.html
  public/
    style.css
  sql/
    schema_and_dummy_data.sql
  server.js
  package.json
```

## Quick Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create MySQL DB and dummy data:
   ```bash
   mysql -u root -p < sql/schema_and_dummy_data.sql
   ```

3. (Optional) Set DB variables if your MySQL config is different:
   ```bash
   export DB_HOST=localhost
   export DB_USER=root
   export DB_PASSWORD=your_password
   export DB_NAME=sams_db
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open in browser:
   - `http://localhost:3000`

## Demo Login Credentials

- Faculty:
  - Email: `faculty@sams.com`
  - Password: `faculty123`

- Student (example):
  - Email: `aarav@sams.com`
  - Password: `student123`

## Routes / APIs

- `POST /login`
- `POST /mark-attendance`
- `GET /get-attendance?subject_id=1&date=2026-04-10`
- `GET /student-dashboard?student_id=1`
- `GET /subjects`

> Note: This is intentionally a simple prototype for demonstration only (no advanced security/auth).


## Creating a Downloadable Zip (Local)

To create a shareable zip locally (without committing binary files to git):

```bash
zip -r sams_prototype_bundle.zip README.md package.json server.js routes views public sql
```
