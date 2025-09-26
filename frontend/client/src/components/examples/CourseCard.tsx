import CourseCard from '../CourseCard';
import { type Course } from '@shared/schema';

export default function CourseCardExample() {
  // TODO: remove mock functionality
  const mockCourse: Course = {
    id: "1",
    code: "COMP SCI 1015",
    title: "Introduction to Programming",
    description: "An introduction to computer programming using Python. Topics include variables, functions, loops, conditionals, and basic data structures. Perfect for beginners with no prior programming experience.",
    credits: 3,
    prerequisites: [],
    difficulty: 2,
    department: "Computer Science",
    semester: "S1, S2",
    averageRating: 4.3,
    totalRatings: 127,
    tags: ["programming", "python", "beginner-friendly", "practical"]
  };

  return (
    <div className="max-w-sm">
      <CourseCard 
        course={mockCourse} 
        onViewDetails={(id) => console.log('View details for course:', id)}
        onAddToList={(id) => console.log('Add course to list:', id)}
      />
    </div>
  );
}