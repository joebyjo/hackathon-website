import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { API } from "../../constants"; 
import { 
  Heart, 
  Star, 
  BookOpen, 
  Calendar, 
  Trash2, 
  Compare,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface SavedCourse {
  id: string;
  code: string;
  name: string;
  description: string;
  units: number;
  averageRating: number;
  reviewCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string;
  workloadHours: number;
  tags: string[];
  semester: string;
  reason?: string; // Why AI recommended this course
}

export default function SavedPlan() {
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);


  
  const fetchSavedCourses = async () => {
  try {
    const res = await axios.get(`${API}/users/saved-courses`);
    // console.log(res.data);
    const courses = (res.data || []).map(course => ({
      id: course.id,
      code: course.code,
      name: course.name,
      description: "",
      units: Number(course.units),
      averageRating: course.averageRating,
      reviewCount: course.reviewCount,
      difficulty: course.difficulty_rating, // map from backend
      prerequisites: course.prerequisites,
      workloadHours: course.workloadHours,
      semester: course.semester,
      reason: course.reason, // map from syllabus
      tags: generateTags(course) // optional function to generate tags
    }));

    // console.log(courses);

    setSavedCourses(courses);
  } catch (err) {
    console.error("Failed to load saved courses:", err);
  }
};

// Example tag generation (can be customized)
const generateTags = (course) => {
  const tags = [];
  if (course.units >= 3) tags.push('Challenging');
  if (course.averageRating >= 4.5) tags.push('Highly Rated');
  if (course.difficulty_rating === 'Advanced') tags.push('Career Important');
  // add more rules as needed
  return tags;
};

useEffect(() => {
  fetchSavedCourses();
}, []);


  const handleRemoveCourse = async (courseId: string) => {
  try {
    await axios.delete(`${API}/users/saved-courses/${courseId}`);
    await fetchSavedCourses(); 
    setSelectedCourses(selected => selected.filter(id => id !== courseId));
  } catch (error) {
    console.error("Failed to unsave course:", error);
  }
};



  const handleSelectCourse = (courseId: string) => {};

  const compareSelectedCourses = () => {
    setIsCompareModalOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const getDifficultyColor = (difficulty: SavedCourse['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    }
  };

  const getWorkloadColor = (hours: number) => {
    if (hours <= 6) return 'text-green-600 dark:text-green-400';
    if (hours <= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const totalUnits = savedCourses.reduce((sum, course) => sum + course.units, 0);
  const averageRating = savedCourses.reduce((sum, course) => sum + course.averageRating, 0) / savedCourses.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4 flex items-center" data-testid="page-title">
              <Heart className="w-8 h-8 mr-3 text-primary" />
              Saved Plan
            </h1>
            <p className="text-muted-foreground">
              EqualApproximately and organize your favorite course recommendations
            </p>
          </div>

          {selectedCourses.length >= 2 && (
            <Button onClick={compareSelectedCourses} data-testid="button-compare-courses">
              <EqualApproximately className="w-4 h-4 mr-2" />
              EqualApproximately Selected ({selectedCourses.length})
            </Button>
          )}
        </div>

        {/* Summary Stats */}
        {savedCourses.length > 0 && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{savedCourses.length}</div>
                <p className="text-xs text-muted-foreground">Saved Courses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{totalUnits}</div>
                <p className="text-xs text-muted-foreground">Total Units</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">Avg Rating</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  0
                </div>
                <p className="text-xs text-muted-foreground">Avg Workload</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Course Cards */}
        <div className="space-y-4">
          {savedCourses.map((course) => (
            <Card 
              key={course.id} 
              className={`hover-elevate transition-all ${
                selectedCourses.includes(course.id) 
                  ? 'ring-2 ring-primary ring-opacity-50 bg-primary/5' 
                  : ''
              }`}
              data-testid={`card-saved-course-${course.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => handleSelectCourse(course.id)}
                      className="mt-1"
                      data-testid={`checkbox-course-${course.id}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{course.code}</h3>
                        <Badge variant="secondary" className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {renderStars(course.averageRating)}
                          <span className="text-sm text-muted-foreground">
                            {course.averageRating} ({course.reviewCount})
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {course.name}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {course.description}
                      </p>

                      {course.reason && (
                        <div className="bg-primary/10 rounded-lg p-3 mb-3">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-primary font-medium">
                              AI Recommendation: {course.reason}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3 text-muted-foreground" />
                          <span>{course.units} units</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span>{course.semester}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-muted-foreground">Workload:</span>
                          <span className={getWorkloadColor(course.workloadHours)}>
                            {course.workloadHours}
                          </span>
                        </div>
                        {course.prerequisites && (
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="w-3 h-3 text-yellow-500" />
                            <span className="text-yellow-600 dark:text-yellow-400">Prerequisites</span>
                          </div>
                        )}
                      </div>

                      {course.prerequisites && (
                        <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border-l-2 border-yellow-400">
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            <span className="font-medium">Prerequisites:</span> {course.prerequisites}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mt-3">
                        {course.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveCourse(course.id)}
                    className="text-muted-foreground hover:text-destructive"
                    data-testid={`button-remove-course-${course.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {savedCourses.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No saved courses yet</h3>
            <p className="text-muted-foreground mb-4">
              Start exploring courses and save your favorites to compare and plan your academic journey.
            </p>
            <Button asChild>
              <a href="/courses">Explore Courses</a>
            </Button>
          </div>
        )}

        {/* Comparison Modal */}
        <Dialog open={isCompareModalOpen} onOpenChange={setIsCompareModalOpen}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Course Comparison</DialogTitle>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCourses.map(courseId => {
                const course = savedCourses.find(c => c.id === courseId);
                if (!course) return null;
                
                return (
                  <Card key={course.id} className="border-primary">
                    <CardHeader className="pb-3">
                      <h3 className="font-semibold text-center">{course.code}</h3>
                      <p className="text-sm text-muted-foreground text-center">{course.name}</p>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Rating:</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(course.averageRating)}
                          <span>{course.averageRating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Difficulty:</span>
                        <Badge className={getDifficultyColor(course.difficulty)}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Units:</span>
                        <span>{course.units}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Workload:</span>
                        <span className={getWorkloadColor(course.workloadHours)}>
                          {course.workloadHours}h/week
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Semester:</span>
                        <span>{course.semester}</span>
                      </div>
                      <div>
                        <span className="font-medium">Prerequisites:</span>
                        <p className="text-muted-foreground mt-1">
                          {course.prerequisites || 'None'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}