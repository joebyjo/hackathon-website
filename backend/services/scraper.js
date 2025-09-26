// syncCourses.js
const mysql = require("mysql2/promise");
const { fetchSubjects, fetchCourses, fetchCourseDetails } = require("./coursesApi.js");
const db = require('./db');
const fs = require("fs");

async function main() {
  try {
    // 1. Read JSON file
    const rawData = fs.readFileSync("backend/services/courses_2025.json", "utf-8");
    const courses = JSON.parse(rawData);

    console.log(`📚 Loaded ${Object.keys(courses).length} courses`);

    // 2. Loop over each course and insert
    for (const [courseCode, data] of Object.entries(courses)) {
      const sql = `
        INSERT INTO Courses (
          course_id, course_code, title, description, acad_career_descr, term_descr,
          campus, country, subject, class_nbr, session_cd,
          units, eftls, contact_hours, prerequisite, co_requisite,
          assumed_knowledge, incompatible, assessment, syllabus,
          department, difficulty_rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.COURSE_ID,
        courseCode,
        data.COURSE_TITLE || "",
        data.SYLLABUS || "",
        data.ACAD_CAREER_DESCR || null,
        data.TERM_DESCR || null,
        data.CAMPUS || null,
        data.COUNTRY || null,
        data.SUBJECT || null,
        data.CLASS_NBR || null,
        data.SESSION_CD || null,
        data.UNITS || null,
        data.EFTLS || null,
        data.CONTACT || null,
        data.PRE_REQUISITE || null,
        data.CO_REQUISITE || null,
        data.ASSUMED_KNOWLEDGE || null,
        data.INCOMPATIBLE || null,
        data.ASSESSMENT || null,
        data.SYLLABUS || null,
        data.SUBJECT || null, // using SUBJECT as department placeholder
        null,                 // difficulty_rating left NULL
      ];

      // console.log(values);c



      try {
        await db.query(sql, values);

        console.log(`✅ Inserted ${courseCode}`);
      } catch (err) {
        console.error(`❌ Failed to insert ${courseCode}:`, err.message);
      } 
    }

    console.log("🎉 All courses processed!");
    // await db.end();
  } catch (err) {
    console.error("Error:", err);
  } finally {
        // close the pool when done
        await db.end();
      }
}

main();


