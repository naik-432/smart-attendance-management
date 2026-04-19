const express = require('express');

const router = express.Router();

router.get('/subjects', async (req, res) => {
  const db = req.app.locals.db;

  try {
    const [rows] = await db.query('SELECT id, subject_name FROM subjects ORDER BY subject_name');
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching subjects.' });
  }
});

router.get('/student-dashboard', async (req, res) => {
  const { student_id } = req.query;

  if (!student_id) {
    return res.status(400).json({ message: 'student_id is required.' });
  }

  const db = req.app.locals.db;

  try {
    const [studentRows] = await db.query(
      'SELECT id, name, roll_no FROM students WHERE id = ?',
      [student_id]
    );

    if (studentRows.length === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const [subjectRows] = await db.query(
      `SELECT sub.id,
              sub.subject_name,
              COUNT(a.id) AS total_classes,
              SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS present_count
       FROM subjects sub
       LEFT JOIN attendance a
         ON a.subject_id = sub.id
        AND a.student_id = ?
       GROUP BY sub.id, sub.subject_name
       ORDER BY sub.subject_name`,
      [student_id]
    );

    const subjects = subjectRows.map((row) => {
      const total = Number(row.total_classes || 0);
      const present = Number(row.present_count || 0);
      const percentage = total === 0 ? 0 : Number(((present / total) * 100).toFixed(2));

      return {
        subject_id: row.id,
        subject_name: row.subject_name,
        total_classes: total,
        present_count: present,
        percentage
      };
    });

    const totalClasses = subjects.reduce((sum, row) => sum + row.total_classes, 0);
    const totalPresent = subjects.reduce((sum, row) => sum + row.present_count, 0);
    const overallPercentage = totalClasses === 0 ? 0 : Number(((totalPresent / totalClasses) * 100).toFixed(2));

    return res.json({
      student: studentRows[0],
      overallPercentage,
      warning: overallPercentage < 75,
      subjects
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching student dashboard.' });
  }
});

module.exports = router;
