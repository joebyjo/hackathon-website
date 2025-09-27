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

// GET /api/courses?subject=MATHS&subject=COMP SCI&year=2025&limit=10
router.get("/", async (req, res) => {
  let subjects = req.query.subject || null; 
  const year = parseInt(req.query.year, 10) || null; 
  const limit = parseInt(req.query.limit, 10) || null; 

  // normalize subjects → always an array if provided
  if (subjects && !Array.isArray(subjects)) {
    subjects = [subjects];
  }

  try {
    let sql = `
      SELECT 
        course_id,
        title, 
        course_code, 
        difficulty_rating,
        average_rating,
        syllabus, 
        units
      FROM Courses
    `;
    const params = [];
    const conditions = [];

    // multiple subjects support
    if (subjects && subjects.length > 0) {
      const placeholders = subjects.map(() => "?").join(", ");
      conditions.push(`subject IN (${placeholders})`);
      params.push(...subjects);
    }

    // filter by year if you have a year column (adjust as needed)
    if (year) {
      conditions.push("YEAR(term_descr) = ?"); 
      params.push(year);
    }

    // append WHERE if conditions exist
    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    // apply limit if provided
    if (limit) {
      sql += " LIMIT ?";
      params.push(limit);
    }

    const [rows] = await db.query(sql, params);

    res.json({
      success: true,
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


// GET /api/courses/search?q=COMP+SCI+1010&subject=MATHS&subject=COMP+SCI&year=2025&limit=10
router.get("/search", async (req, res) => {
  let subjects = req.query.subject || null;
  const year = parseInt(req.query.year, 10) || null;
  const limit = parseInt(req.query.limit, 10) || null;
  const q = req.query.q || null;

  // normalize subjects → always an array
  if (subjects && !Array.isArray(subjects)) {
    subjects = [subjects];
  }

  try {
    let sql = `
      SELECT 
        course_code, 
        course_id,
        title, 
        difficulty_rating,
        average_rating,
        syllabus, 
        units
      FROM Courses
    `;
    const params = [];
    const conditions = [];

    // search support
    if (q) {
      conditions.push("(course_code LIKE ? OR title LIKE ?)");
      params.push(`%${q}%`, `%${q}%`);
    }

    // multiple subjects support
    if (subjects && subjects.length > 0) {
      const placeholders = subjects.map(() => "?").join(", ");
      conditions.push(`subject IN (${placeholders})`);
      params.push(...subjects);
    }

    // year filtering (adjust if year is not a proper column)
    if (year) {
      conditions.push("term_descr LIKE ?");
      params.push(`%${year}%`);
    }

    // add conditions
    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    // apply limit
    if (limit) {
      sql += ` LIMIT ${db.escape(limit)}`;
    }

    const [rows] = await db.query(sql, params);

    

    if (rows.length === 0) {
      return res.json({ success: true, data: [], message: "No courses found" });
    }

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error("Error in GET /api/courses:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch/search courses"
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
