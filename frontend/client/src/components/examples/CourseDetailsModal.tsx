import { useState } from 'react';
import { Button } from "@/components/ui/button";
import CourseDetailsModal, { type CourseDetails, type CourseReview } from '../CourseDetailsModal';

const mockReviews: CourseReview[] = [
  {
    id: '1',
    studentName: 'Sarah Chen',
    rating: 5,
    comment: 'Excellent introduction to programming! The professor explains concepts clearly and the assignments build on each other logically.',
    tags: ['Great Lecturer', 'Clear Instructions', 'Would Recommend'],
    semester: 'Fall 2023',
    helpful: 12,
    timestamp: new Date('2023-12-15')
  },
  {
    id: '2',
    studentName: 'Mike Johnson',
    rating: 4,
    comment: 'Good course but quite demanding. Be prepared to spend a lot of time on the projects.',
    tags: ['Heavy Workload', 'Hard but Rewarding'],
    semester: 'Spring 2023',
    helpful: 8,
    timestamp: new Date('2023-05-20')
  }
];

const mockCourseDetails: CourseDetails = {
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
  reviews: mockReviews
};

export default function CourseDetailsModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setIsOpen(true)}>
        Open Course Details Modal
      </Button>
      
      <CourseDetailsModal
        course={mockCourseDetails}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddToWishlist={(courseId) => console.log('Added to wishlist:', courseId)}
        onSubmitReview={(courseId, rating, comment, tags) => {
          console.log('Review submitted:', { courseId, rating, comment, tags });
        }}
      />
    </div>
  );
}