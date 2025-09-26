const express = require("express");
const router = express.Router();
const db = require('../services/db');
const {
  fetchSubjects,
  fetchCourses,
  fetchCourseDetails,
} = require("../services/coursesApi");

// GET /api/courses/subjects?year=2025
router.get("/subjects", async (req, res) => {
  const year = parseInt(req.query.year, 10) || 2025;

  try {
    const subjects = await fetchSubjects(year);
    res.json({ success: true, data: subjects });
  } catch (error) {
    console.error("Error in /subjects:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch subjects" });
  }
});

// GET /api/courses?subject=COMP+SCI&year=2025
router.get("/", async (req, res) => {
  const subject = req.query.subject || null; // optional
  const year = parseInt(req.query.year, 10) || null; // optional, depends if you have a year column

  try {
    let sql = `
      SELECT 
        title, 
        course_code, 
        difficulty_rating, 
        syllabus, 
        units
      FROM Courses
    `;
    const params = [];

    // filter by subject if provided
    if (subject) {
      sql += " WHERE subject = ?";
      params.push(subject);
    }

    // filter by year if you have a year column in the table
    if (year) {
      sql += subject ? " AND " : " WHERE ";
      sql += "YEAR(term_descr) = ?"; // adjust depending on how you store the year
      params.push(year);
    }

    const [rows] = await db.query(sql, params);

    res.json({
      data: rows
    });
  } catch (error) {
    console.error("Error in GET /api/courses:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch courses"
    });
  }
});


/**
 * GET /api/courses/:id?term=...&year=...
 * Returns course details by course_id, optionally filtered by term/year
 */
router.get("/:id", async (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const { term, year } = req.query; // optional query params

  if (isNaN(courseId)) {
    return res.status(400).json({ message: "Invalid course ID" });
  }

  try {
    let sql = "SELECT * FROM Courses WHERE course_id = ?";
    const params = [courseId];

    if (term) {
      sql += " AND term_descr = ?";
      params.push(term);
    }

    // if you have a year column, you can filter it as well
    if (year) {
      sql += " AND YEAR(term_descr) = ?"; // adjust if you store year differently
      params.push(year);
    }

    const [rows] = await db.query(sql, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
