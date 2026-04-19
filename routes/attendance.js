const express = require('express');

const router = express.Router();

router.post('/mark-attendance', async (req, res) => {
  const { subject_id, date, records } = req.body;

  if (!subject_id || !date || !Array.isArray(records) || records.length === 0) {
    return res.status(400).json({ message: 'subject_id, date and records are required.' });
  }

  const db = req.app.locals.db;

  try {
    for (const record of records) {
      const { student_id, status } = record;

      await db.query(
        `INSERT INTO attendance (student_id, subject_id, date, status)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status)`,
        [student_id, subject_id, date, status]
      );
    }

    return res.json({ message: 'Attendance saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error while saving attendance.' });
  }
});

router.get('/get-attendance', async (req, res) => {
  const { subject_id, date } = req.query;

  if (!subject_id || !date) {
    return res.status(400).json({ message: 'subject_id and date are required.' });
  }

  const db = req.app.locals.db;

  try {
    const [rows] = await db.query(
      `SELECT s.id AS student_id, s.name, s.roll_no,
              COALESCE(a.status, 'Absent') AS status
       FROM students s
       LEFT JOIN attendance a
         ON s.id = a.student_id
        AND a.subject_id = ?
        AND a.date = ?
       ORDER BY s.roll_no`,
      [subject_id, date]
    );

    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error while fetching attendance.' });
  }
});

module.exports = router;
