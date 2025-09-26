const axios = require("axios");

async function fetchSubjects(year = 2025) {
  const url = `https://courseplanner-api.adelaide.edu.au/api/course-planner-query/v1/?target=/system/SUBJECTS_BY_YEAR/queryx&virtual=Y&year=${year}`;

  try {
    const response = await axios.get(url);
    const rows = response.data?.data?.query?.rows || [];
    return rows;
  } catch (error) {
    console.error("Error fetching subjects:", error.message);
    return [];
  }
}

async function fetchCourses(subject = "COMP SCI", year = 2025) {
  const encodedSubject = subject.replace(" ", "+");
  const url = `https://courseplanner-api.adelaide.edu.au/api/course-planner-query/v1/?target=/system/COURSE_SEARCH/queryx&virtual=Y&year=${year}&subject=${encodedSubject}&pagesize=10000000`;

  try {
    const response = await axios.get(url);
    const rows = response.data?.data?.query?.rows || [];
    return rows;
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    return [];
  }
}

async function fetchCourseDetails(course_id, term, year = 2025) {
  const url = `https://courseplanner-api.adelaide.edu.au/api/course-planner-query/v1/?target=/system/COURSE_DTL/queryx&virtual=Y&year=${year}&courseid=${course_id}&term=${term}`;

  try {
    const response = await axios.get(url);
    const rows = response.data?.data?.query?.rows || [];

    if (rows.length === 0) return null;

    const courseDetails = { ...rows[0] };

    return courseDetails;
  } catch (error) {
    console.error("Error fetching course details:", error.message);
    return null;
  }
}

module.exports = { 
  fetchSubjects, 
  fetchCourses, 
  fetchCourseDetails
};

// (async () => {
//   // const subjects = await fetchSubjects();
//   // console.log(`Total subjects fetched: ${subjects.length}`);

//   // const courses = await fetchCourses("COMP SCI", 2025);
//   // console.log(`Total courses fetched: ${courses.length}`);
//   // console.log(courses.slice(0, 5));

//   const course = await fetchCourseDetails(104852, 4510, 2025);
//   if (course) {
//     for (const [key, value] of Object.entries(course)) {
//       console.log(`${key}: ${value}`);
//     }
//   }
// })();

