import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { type Course } from "@shared/schema";

interface CourseCardProps {
  course: Course;
  onViewDetails?: (courseId: string) => void;
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-chart-3 text-chart-3"
            : i < rating
            ? "fill-chart-3/50 text-chart-3"
            : "fill-muted text-muted-foreground"
        }`}
      />
    ));
  };

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
          </Badge>
        </div>
      </CardHeader>

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
            </div>
          </div>
        </div>

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
        </Button>
      </CardFooter>
    </Card>
  );
}