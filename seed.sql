-- =======================
-- TEMPORARY USERS
-- =======================
INSERT INTO Users (
    student_id,
    first_name,
    last_name,
    email,
    password_hash,
    academic_year,
    major,
    role
) VALUES (
    'S1234567',
    'Temp',
    'User',
    'temp.user@example.com',
    'hashed_password_here', -- ⚠️ Replace with bcrypt hash in production
    '1st Year',
    'Computer Science',
    'student'
);

INSERT INTO Users (
    student_id,
    first_name,
    last_name,
    email,
    password_hash,
    academic_year,
    major,
    role
) VALUES (
    'S7654321',
    'Test',
    'Student',
    'test.student@example.com',
    'hashed_password_here',
    '2nd Year',
    'Software Engineering',
    'student'
);

-- =======================
-- COURSES SEED
-- =======================
INSERT INTO Courses (
    course_code,
    title,
    description,
    acad_career_descr,
    term_descr,
    campus,
    country,
    subject,
    class_nbr,
    session_cd,
    units,
    eftls,
    contact_hours,
    prerequisite,
    co_requisite,
    assumed_knowledge,
    incompatible,
    assessment,
    syllabus,
    department,
    difficulty_rating
) VALUES
-- COMP SCI 1010
('COMP SCI 1010',
 'Puzzle Based Learning',
 'Problem-solving and critical thinking through puzzles.',
 'Undergraduate',
 'Semester 1',
 'North Terrace',
 'AUS',
 'COMP SCI',
 19362,
 '1',
 3.00,
 0.125,
 'Up to 3 hours per week',
 '',
 '',
 'SACE level 2 Mathematical Methods',
 '',
 'Written exam and/or assignments',
 'Puzzle-based learning course syllabus...',
 'Computer Science',
 3),

-- COMP SCI 1013
('COMP SCI 1013',
 'Introduction to Computer Systems, Networks and Security',
 'Foundations in computer architecture, networking, and security.',
 'Undergraduate',
 'Semester 2',
 'North Terrace',
 'AUS',
 'COMP SCI',
 22474,
 '1',
 3.00,
 0.125,
 'Up to 10 hours per week',
 '',
 '',
 '',
 '',
 'Exams, written assessment, programming assignments, presentations, quizzes.',
 'Networking + security course syllabus...',
 'Computer Science',
 4),

-- COMP SCI 1014
('COMP SCI 1014',
 'Information Technology Project',
 'IT project management with two student-led projects.',
 'Undergraduate',
 'Semester 2',
 'North Terrace',
 'AUS',
 'COMP SCI',
 22812,
 '1',
 3.00,
 0.125,
 'Up to 10 hours per week',
 '',
 '',
 'PROJMGNT 1001, COMP SCI 1015',
 '',
 'Exams, written assessment, presentations, project development and management.',
 'IT Project course syllabus...',
 'Computer Science',
 4);

-- =======================
-- JUNCTION TABLE SEEDS
-- =======================
-- ⚠️ Assumes:
--   - first inserted user has user_id = 1
--   - courses inserted above have IDs = 1, 2, 3
-- Adjust IDs if your DB auto-increment is different

-- Completed Courses
INSERT INTO UserCourses (user_id, course_id, completion_date, grade)
VALUES (1, 1, '2024-11-30', 'HD');

INSERT INTO UserCourses (user_id, course_id, completion_date, grade)
VALUES (1, 2, '2025-06-15', 'D');

-- Wishlist
INSERT INTO Wishlist (user_id, course_id, added_at)
VALUES (1, 3, NOW());

-- Ratings
INSERT INTO Ratings (user_id, course_id, rating, review)
VALUES
(1, 1, 5, 'Amazing course! Really sharpened my problem-solving skills.'),
(1, 2, 4, 'Good foundation in systems and networking, but workload was heavy.');
