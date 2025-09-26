import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { type Course } from "@shared/schema";
=======
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
>>>>>>> refs/remotes/origin/main

interface CourseCardProps {
  course: Course;
  onViewDetails?: (courseId: string) => void;
<<<<<<< HEAD
  onAddToList?: (courseId: string) => void;
}

export default function CourseCard({ course, onViewDetails, onAddToList }: CourseCardProps) {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return "bg-chart-2 text-white"; // Easy - Green
    if (difficulty <= 3) return "bg-chart-3 text-black"; // Medium - Yellow
    return "bg-destructive text-white"; // Hard - Red
  };

  const getDifficultyLabel = (difficulty: number) => {
    if (difficulty <= 2) return "Easy";
    if (difficulty <= 3) return "Medium";
    return "Hard";
  };

=======
  onAddToWishlist?: (courseId: string) => void;
  className?: string;
}

export default function CourseCard({ course, onViewDetails, onAddToWishlist, className }: CourseCardProps) {
>>>>>>> refs/remotes/origin/main
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
<<<<<<< HEAD
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-chart-3 text-chart-3"
            : i < rating
            ? "fill-chart-3/50 text-chart-3"
            : "fill-muted text-muted-foreground"
=======
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-muted-foreground'
>>>>>>> refs/remotes/origin/main
        }`}
      />
    ));
  };

<<<<<<< HEAD
  return (
    <Card className="hover-elevate h-full flex flex-col" data-testid={`card-course-${course.id}`}>
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg leading-tight" data-testid={`text-course-title-${course.id}`}>
              {course.code}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2" data-testid={`text-course-name-${course.id}`}>
              {course.title}
            </p>
          </div>
          <Badge className={`${getDifficultyColor(course.difficulty || 3)} shrink-0`} data-testid={`badge-difficulty-${course.id}`}>
            {getDifficultyLabel(course.difficulty || 3)}
=======
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
>>>>>>> refs/remotes/origin/main
          </Badge>
        </div>
      </CardHeader>

<<<<<<< HEAD
      <CardContent className="py-3 sm:py-4 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1" data-testid={`text-course-description-${course.id}`}>
          {course.description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-1" data-testid={`rating-course-${course.id}`}>
            <div className="flex gap-1">
              {renderStars(course.averageRating || 0)}
            </div>
            <span className="text-muted-foreground ml-1">
              {course.averageRating?.toFixed(1) || "0.0"} ({course.totalRatings || 0})
            </span>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{course.credits} credits</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs sm:text-sm">{course.semester}</span>
=======
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
>>>>>>> refs/remotes/origin/main
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3" data-testid={`tags-course-${course.id}`}>
            {course.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {course.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{course.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full sm:flex-1 min-h-10"
          onClick={() => onViewDetails?.(course.id)}
          data-testid={`button-view-details-${course.id}`}
        >
          <Users className="h-4 w-4 mr-2" />
          View Details
        </Button>
        <Button 
          size="sm" 
          className="w-full sm:flex-1 min-h-10"
          onClick={() => onAddToList?.(course.id)}
          data-testid={`button-add-course-${course.id}`}
        >
          Add to List
=======
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
>>>>>>> refs/remotes/origin/main
        </Button>
      </CardFooter>
    </Card>
  );
}