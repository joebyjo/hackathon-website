-- =======================
-- USERS TABLE
-- =======================
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE,       -- University-specific ID
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,         -- For authentication
    academic_year VARCHAR(50),           -- e.g. "2nd Year"
    major VARCHAR(100),                  -- e.g. "Computer Science"
    role VARCHAR(50) DEFAULT 'student',  -- e.g. 'student', 'admin'
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =======================
-- COURSES TABLE
-- =======================
CREATE TABLE Courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(50) UNIQUE NOT NULL,  -- e.g. "COMP SCI 1010"
    title VARCHAR(255) NOT NULL,
    description TEXT,
    acad_career_descr VARCHAR(100),   -- Undergraduate / Graduate
    term_descr VARCHAR(100),          -- Semester 1 / 2
    campus VARCHAR(100),
    country VARCHAR(50),
    subject VARCHAR(50),              -- e.g. COMP SCI
    class_nbr INT,
    session_cd VARCHAR(10),
    units DECIMAL(4,2),
    eftls DECIMAL(6,3),
    contact_hours VARCHAR(255),
    prerequisite TEXT,
    co_requisite TEXT,
    assumed_knowledge TEXT,
    incompatible TEXT,
    assessment TEXT,
    syllabus TEXT,
    department VARCHAR(100),          -- For classification
    difficulty_rating INT CHECK (difficulty_rating BETWEEN 1 AND 5)
);

-- =======================
-- RATINGS TABLE (junction)
-- =======================
CREATE TABLE Ratings (
    rating_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES Courses(course_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, course_id) -- Each user can rate a course once
);

-- =======================
-- USERCOURSES TABLE (completed courses)
-- =======================
CREATE TABLE UserCourses (
    user_course_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES Courses(course_id) ON DELETE CASCADE,
    completion_date DATE,
    grade VARCHAR(10),                 -- Optional, e.g. "A", "HD"
    UNIQUE (user_id, course_id)        -- Prevent duplicates
);

-- =======================
-- WISHLIST TABLE (planned courses)
-- =======================
CREATE TABLE Wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    course_id INT NOT NULL REFERENCES Courses(course_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (user_id, course_id)        -- Prevent duplicates
);
