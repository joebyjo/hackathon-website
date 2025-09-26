const express = require("express");
const router = express.Router();
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
  const subject = req.query.subject || "COMP SCI";
  const year = parseInt(req.query.year, 10) || 2025;

  try {
    const courses = await fetchCourses(subject, year);
    res.json({ success: true, data: courses });
  } catch (error) {
    console.error("Error in /courses:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch courses" });
  }
});

// GET /api/courses/:id/:term?year=2025
router.get("/:id", async (req, res) => {
  const courseId = req.params.id;
  const term = req.params.term;
  const year = parseInt(req.query.year, 10) || 2025;

  try {
    const details = await fetchCourseDetails(courseId, term, year);
    if (!details) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }
    res.json({ success: true, data: details });
  } catch (error) {
    console.error("Error in /course/:id/:term:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch course details" });
  }
});

module.exports = router;
