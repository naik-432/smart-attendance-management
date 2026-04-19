const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sams_db',
  waitForConnections: true,
  connectionLimit: 10
});

app.locals.db = pool;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/faculty', (_, res) => res.sendFile(path.join(__dirname, 'views', 'faculty_dashboard.html')));
app.get('/student', (_, res) => res.sendFile(path.join(__dirname, 'views', 'student_dashboard.html')));

app.use(authRoutes);
app.use(attendanceRoutes);
app.use(dashboardRoutes);

app.listen(PORT, () => {
  console.log(`SAMS server running at http://localhost:${PORT}`);
});
