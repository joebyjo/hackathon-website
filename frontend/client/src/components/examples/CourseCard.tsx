<<<<<<< HEAD
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
=======
import CourseCard, { type Course } from '../CourseCard';

const mockCourse: Course = {
  id: '1',
  name: 'Introduction to Computer Science',
  code: 'CS 101',
  description: 'A comprehensive introduction to computer science fundamentals including programming concepts, data structures, and algorithmic thinking. Perfect for beginners with no prior programming experience.',
  averageRating: 4.5,
  reviewCount: 142,
  units: 3,
  difficulty: 'Beginner',
  tags: ['Programming', 'Logic', 'Problem Solving', 'Python', 'Great for Beginners'],
  department: 'Computer Science'
};

export default function CourseCardExample() {
  return (
    <div className="p-8 bg-background max-w-sm">
      <CourseCard 
        course={mockCourse}
        onViewDetails={(id) => console.log('View details for course:', id)}
        onAddToWishlist={(id) => console.log('Add to wishlist:', id)}
>>>>>>> refs/remotes/origin/main
      />
    </div>
  );
}