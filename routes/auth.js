const express = require('express');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { role, email, password } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({ message: 'Role, email and password are required.' });
  }

  const db = req.app.locals.db;

  try {
    if (role === 'faculty') {
      const [rows] = await db.query(
        'SELECT id, name, email FROM faculty_users WHERE email = ? AND password = ?',
        [email, password]
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      return res.json({
        message: 'Login successful.',
        role: 'faculty',
        user: rows[0],
        redirect: '/faculty'
      });
    }

    if (role === 'student') {
      const [rows] = await db.query(
        'SELECT id, name, email FROM students WHERE email = ? AND password = ?',
        [email, password]
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      return res.json({
        message: 'Login successful.',
        role: 'student',
        user: rows[0],
        redirect: `/student?student_id=${rows[0].id}`
      });
    }

    return res.status(400).json({ message: 'Invalid role selected.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error during login.' });
  }
});

module.exports = router;
