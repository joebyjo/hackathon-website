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
      />
    </div>
  );
}