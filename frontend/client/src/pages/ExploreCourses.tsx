import { useState } from "react";
import Navigation from "@/components/Navigation";
import CourseSearch, { type SearchFilters } from "@/components/CourseSearch";
import CourseCard, { type Course } from "@/components/CourseCard";
import CourseDetailsModal, { type CourseDetails, type CourseReview } from "@/components/CourseDetailsModal";

// Mock data - TODO: replace with real API calls
const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS 101',
    description: 'A comprehensive introduction to computer science fundamentals including programming concepts, data structures, and algorithmic thinking.',
    averageRating: 4.5,
    reviewCount: 142,
    units: 3,
    difficulty: 'Beginner',
    tags: ['Programming', 'Logic', 'Problem Solving', 'Great for Beginners'],
    department: 'Computer Science'
  },
  {
    id: '2',
    name: 'Calculus II',
    code: 'MATH 200',
    description: 'Advanced calculus topics including integration techniques, sequences, series, and multivariable calculus foundations.',
    averageRating: 3.8,
    reviewCount: 89,
    units: 4,
    difficulty: 'Intermediate',
    tags: ['Math Intensive', 'Challenging', 'Good for STEM'],
    department: 'Mathematics'
  },
  {
    id: '3',
    name: 'General Physics',
    code: 'PHYS 150',
    description: 'Classical mechanics, waves, thermodynamics, and electricity with laboratory component.',
    averageRating: 4.2,
    reviewCount: 76,
    units: 4,
    difficulty: 'Intermediate',
    tags: ['Lab Work', 'Math Heavy', 'Practical Applications'],
    department: 'Physics'
  },
  {
    id: '4',
    name: 'Data Structures and Algorithms',
    code: 'CS 250',
    description: 'Study of fundamental data structures and algorithms with emphasis on implementation and analysis.',
    averageRating: 4.7,
    reviewCount: 203,
    units: 3,
    difficulty: 'Advanced',
    tags: ['Programming', 'Logic', 'Career Important', 'Challenging'],
    department: 'Computer Science'
  },
  {
    id: '5',
    name: 'World History',
    code: 'HIST 201',
    description: 'Survey of world civilizations from ancient times to the modern era, focusing on cultural and social developments.',
    averageRating: 4.1,
    reviewCount: 54,
    units: 3,
    difficulty: 'Beginner',
    tags: ['Reading Heavy', 'Interesting Content', 'Easy A'],
    department: 'History'
  },
  {
    id: '6',
    name: 'Organic Chemistry',
    code: 'CHEM 300',
    description: 'Structure, properties, and reactions of organic compounds with laboratory synthesis experience.',
    averageRating: 3.2,
    reviewCount: 67,
    units: 4,
    difficulty: 'Advanced',
    tags: ['Very Difficult', 'Lab Intensive', 'Pre-Med Required', 'Heavy Workload'],
    department: 'Chemistry'
  }
];

const mockCourseDetails: Record<string, CourseDetails> = {
  '1': {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS 101',
    description: 'A comprehensive introduction to computer science fundamentals including programming concepts, data structures, algorithms, and computational thinking. Students will learn problem-solving skills and programming techniques using Python.',
    acad_career_descr: 'Undergraduate',
    term_descr: 'Fall 2024',
    campus: 'Main Campus',
    subject: 'Computer Science',
    units: 3,
    eftls: '0.125',
    prerequisite: 'High school mathematics or equivalent',
    co_requisite: 'None',
    assumed_knowledge: 'Basic algebra and logical thinking',
    incompatible: 'CS 100, COMP 101',
    assessment: 'Programming assignments (40%), Midterm exam (25%), Final exam (35%)',
    syllabus: 'Week 1-2: Introduction to programming, Week 3-4: Variables and data types, Week 5-6: Control structures, Week 7-8: Functions, Week 9-10: Data structures, Week 11-12: Algorithms, Week 13-14: Final project',
    department: 'School of Computer Science',
    difficulty_rating: 3,
    averageRating: 4.5,
    reviewCount: 142,
    tags: ['Programming', 'Logic', 'Problem Solving', 'Great for Beginners', 'Python'],
    reviews: [
      {
        id: '1',
        studentName: 'Sarah Chen',
        rating: 5,
        comment: 'Excellent introduction to programming! The professor explains concepts clearly.',
        tags: ['Great Lecturer', 'Clear Instructions', 'Would Recommend'],
        semester: 'Fall 2023',
        helpful: 12,
        timestamp: new Date('2023-12-15')
      }
    ]
  }
};

export default function ExploreCourses() {
  const [searchResults, setSearchResults] = useState<Course[]>(mockCourses);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query: string, filters: SearchFilters) => {
    console.log('Searching for:', query, filters);
    // TODO: Implement real search logic
    let filtered = mockCourses;
    
    if (query.trim()) {
      filtered = filtered.filter(course => 
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.code.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.departments.length > 0) {
      filtered = filtered.filter(course => 
        filters.departments.includes(course.department)
      );
    }

    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(course => 
        filters.difficulty.includes(course.difficulty)
      );
    }

    setSearchResults(filtered);
  };

  const handleViewDetails = (courseId: string) => {
    const courseDetails = mockCourseDetails[courseId];
    if (courseDetails) {
      setSelectedCourse(courseDetails);
      setIsModalOpen(true);
    }
  };

  const handleAddToWishlist = (courseId: string) => {
    console.log('Added to wishlist:', courseId);
    // TODO: Implement wishlist functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="page-title">
            Explore Courses
          </h1>
          <p className="text-muted-foreground">
            Search through thousands of courses with real student reviews and ratings
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <CourseSearch onSearch={handleSearch} />
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            Found {searchResults.length} courses
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={handleViewDetails}
              onAddToWishlist={handleAddToWishlist}
            />
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found matching your search criteria.</p>
          </div>
        )}
      </div>

      <CourseDetailsModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  );
}