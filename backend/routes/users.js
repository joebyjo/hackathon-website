const express = require("express");
const router = express.Router();
const db = require('../services/db');

// Temporary hardcoded user
const userId = 1;

/**
 * Save a course (wishlist)
 * POST /api/users/save-course
 * Body: { course_id }
 */
router.post("/add-course", async (req, res) => {
  const { course_code } = req.body;
  if (!course_code) {
    return res.status(400).json({ success: false, error: "course_id required" });
  }

  try {
    await db.query(
      `INSERT INTO SavedCourses (user_id, course_id) VALUES (?, (SELECT course_id from Courses where course_code=?))
       ON DUPLICATE KEY UPDATE added_at = CURRENT_TIMESTAMP`,
      [userId, course_code]
    );

    res.json({ success: true, message: "Course saved successfully" });
  } catch (error) {
    console.error("Error saving course:", error.message);
    res.status(500).json({ success: false, error: "Failed to save course" });
  }
});

/**
 * Get all saved courses
 * GET /api/users/saved-courses
 */
router.get("/my-courses", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.course_id, c.course_code, c.title, c.units, c.subject, c.term_descr, s.added_at, c.average_rating
       FROM SavedCourses s
       JOIN Courses c ON s.course_id = c.course_id
       WHERE s.user_id = ?`,
      [userId]
    );
    
    // console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching saved courses:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch saved courses" });
  }
});

router.delete("/my-courses/:course_id", async (req, res) => {
  const { course_id } = req.params;

  if (!course_id) {
    return res.status(400).json({ success: false, error: "course_id required" });
  }

  try {
    const [result] = await db.query(
      `DELETE FROM SavedCourses WHERE user_id = ? AND course_id = ?`,
      [userId, course_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Course not found in saved list" });
    }

    res.json({ success: true, message: "Course removed from saved list" });
  } catch (error) {
    console.error("Error deleting saved course:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Failed to delete saved course" });
  }
});

/**
 * Add or update a rating
 * POST /api/users/rating
 * Body: { course_id, rating, review }
 */
router.post("/rating", async (req, res) => {
  const { course_id, rating, review } = req.body;
  if (!course_id || !rating) {
    return res.status(400).json({ success: false, error: "course_id and rating required" });
  }

  try {
    await db.query(
      `INSERT INTO Ratings (user_id, course_id, rating, review) 
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating), review = VALUES(review), created_at = CURRENT_TIMESTAMP`,
      [userId, course_id, rating, review || null]
    );
    res.json({ success: true, message: "Rating saved successfully" });
  } catch (error) {
    console.error("Error adding rating:", error.message);
    res.status(500).json({ success: false, error: "Failed to save rating" });
  }
});

/**
 * Get all ratings by user
 * GET /api/users/ratings
 */
router.get("/ratings", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.course_id, c.course_code, c.title, r.rating, r.review, r.created_at
       FROM Ratings r
       JOIN Courses c ON r.course_id = c.course_id
       WHERE r.user_id = ?`,
      [userId]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Error fetching ratings:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch ratings" });
  }
});

module.exports = router;
