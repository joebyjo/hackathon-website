CREATE DATABASE IF NOT EXISTS u269925776_smartCourses;
USE u269925776_smartCourses;


CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) UNIQUE,       -- University-specific ID
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,         -- For authentication
    academic_year VARCHAR(50),           -- e.g. "2nd Year"
    major VARCHAR(100),                  -- e.g. "Computer Science"
    role VARCHAR(50) DEFAULT 'student',  -- e.g. 'student', 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =======================
-- COURSES TABLE
-- =======================
CREATE TABLE Courses (
    course_id INT PRIMARY KEY,
    course_code VARCHAR(50),  -- e.g. "COMP SCI 1010"
    title VARCHAR(255),
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
    difficulty_rating INT,
    average_rating INT,
    CONSTRAINT chk_difficulty CHECK (difficulty_rating BETWEEN 1 AND 10 OR difficulty_rating IS NULL)
);

-- =======================
-- RATINGS TABLE (junction)
-- =======================
CREATE TABLE Ratings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    rating INT,
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, course_id),
    CONSTRAINT fk_ratings_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_ratings_course FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE,
    CONSTRAINT chk_rating CHECK (rating BETWEEN 1 AND 5 OR rating IS NULL)
);

-- =======================
-- USERCOURSES TABLE (completed courses)
-- =======================
CREATE TABLE UserCourses (
    user_course_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    UNIQUE (user_id, course_id),
    CONSTRAINT fk_usercourses_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_usercourses_course FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);


CREATE TABLE SavedCourses (
    saved_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, course_id),
    CONSTRAINT fk_savedcourses_user FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_savedcourses_course FOREIGN KEY (course_id) REFERENCES Courses(course_id) ON DELETE CASCADE
);
