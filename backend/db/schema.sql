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
    completion_date DATE,
    grade VARCHAR(10),                 -- Optional, e.g. "A", "HD"
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
