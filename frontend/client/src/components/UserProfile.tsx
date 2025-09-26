import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { User, GraduationCap, Calendar, BookOpen, Star } from "lucide-react";
import { type User as UserType, type CompletedCourse } from "@shared/schema";

interface UserProfileProps {
  user: UserType;
  completedCourses?: CompletedCourse[];
  onEditProfile?: () => void;
}

interface CourseStats {
  totalCredits: number;
  averageGrade: string;
  coursesCompleted: number;
  currentGPA: number;
}

export default function UserProfile({ user, completedCourses = [], onEditProfile }: UserProfileProps) {
  // TODO: remove mock functionality - calculate real stats
  const mockStats: CourseStats = {
    totalCredits: 54,
    averageGrade: "B+",
    coursesCompleted: 18,
    currentGPA: 3.4
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getYearLabel = (year: number) => {
    const labels = ['', '1st Year', '2nd Year', '3rd Year', '4th Year', 'Honours', 'Masters', 'PhD'];
    return labels[year] || `Year ${year}`;
  };

  // TODO: remove mock functionality
  const recentCourses = [
    { code: "COMP SCI 2201", title: "Algorithms & Data Structures", semester: "S1 2024", grade: "A-" },
    { code: "MATHS 2010", title: "Linear Algebra", semester: "S1 2024", grade: "B+" },
    { code: "COMP SCI 1015", title: "Introduction to Programming", semester: "S2 2023", grade: "A" }
  ];

  const progressTowardsDegree = (mockStats.totalCredits / 144) * 100; // Assuming 144 credits for degree

  return (
    <div className="space-y-6" data-testid="user-profile">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16" data-testid="user-avatar">
                <AvatarImage src="" alt={user.fullName} />
                <AvatarFallback className="text-lg">
                  {getInitials(user.fullName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <h2 className="text-2xl font-bold" data-testid="user-name">{user.fullName}</h2>
                <p className="text-muted-foreground" data-testid="user-email">{user.email}</p>
                {user.studentId && (
                  <p className="text-sm text-muted-foreground" data-testid="user-student-id">
                    Student ID: {user.studentId}
                  </p>
                )}
              </div>
            </div>
            
            <Button variant="outline" onClick={onEditProfile} data-testid="button-edit-profile">
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {user.year && (
              <Badge variant="secondary" data-testid="badge-year">
                <GraduationCap className="h-3 w-3 mr-1" />
                {getYearLabel(user.year)}
              </Badge>
            )}
            {user.major && (
              <Badge variant="secondary" data-testid="badge-major">
                <BookOpen className="h-3 w-3 mr-1" />
                {user.major}
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Academic Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="stat-gpa">
                {mockStats.currentGPA.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Current GPA</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="stat-credits">
                {mockStats.totalCredits}
              </div>
              <div className="text-sm text-muted-foreground">Total Credits</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="stat-courses">
                {mockStats.coursesCompleted}
              </div>
              <div className="text-sm text-muted-foreground">Courses Completed</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="stat-average">
                {mockStats.averageGrade}
              </div>
              <div className="text-sm text-muted-foreground">Average Grade</div>
            </div>
          </div>

          {/* Degree Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Degree Progress</span>
              <span>{Math.round(progressTowardsDegree)}%</span>
            </div>
            <Progress value={progressTowardsDegree} className="h-2" data-testid="progress-degree" />
            <p className="text-xs text-muted-foreground">
              {144 - mockStats.totalCredits} credits remaining
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium" data-testid={`recent-course-code-${index}`}>
                    {course.code}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`recent-course-title-${index}`}>
                    {course.title}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {course.semester}
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant="outline" data-testid={`recent-course-grade-${index}`}>
                    {course.grade}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4" data-testid="button-view-all-courses">
            View All Completed Courses
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}