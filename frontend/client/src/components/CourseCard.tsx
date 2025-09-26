import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, BookOpen } from "lucide-react";

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  averageRating: number;
  reviewCount: number;
  units: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  department: string;
}

interface CourseCardProps {
  course: Course;
  onViewDetails?: (courseId: string) => void;
  onAddToWishlist?: (courseId: string) => void;
  className?: string;
}

export default function CourseCard({ course, onViewDetails, onAddToWishlist, className }: CourseCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={`hover-elevate cursor-pointer transition-all duration-200 ${className}`} data-testid={`card-course-${course.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground" data-testid={`text-course-name-${course.id}`}>
              {course.code}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              {course.name}
            </p>
          </div>
          <Badge variant="secondary" className={getDifficultyColor(course.difficulty)}>
            {course.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="py-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4" data-testid={`text-course-description-${course.id}`}>
          {course.description}
        </p>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center" data-testid={`rating-stars-${course.id}`}>
              {renderStars(course.averageRating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {course.averageRating.toFixed(1)} ({course.reviewCount} reviews)
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>{course.units} units</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
              {tag}
            </Badge>
          ))}
          {course.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{course.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails?.(course.id)}
          className="flex-1"
          data-testid={`button-view-details-${course.id}`}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAddToWishlist?.(course.id)}
          data-testid={`button-add-wishlist-${course.id}`}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}