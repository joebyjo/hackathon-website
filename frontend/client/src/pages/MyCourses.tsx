import { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, BookOpen, Calendar, Star, Trash2 } from "lucide-react";
import axios from "axios";
import { API } from "../../constants"


export interface MyCourse {
  id: string;
  code: string;
  name: string;
  units: number;
  grade?: string;
  semester: string;
  status: 'current' | 'completed';
  rating?: number;
}

export default function MyCourses() {
  const [courses, setCourses] = useState<MyCourse[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    units: 3,
    grade: "",
    semester: "",
    status: "current" as "current" | "completed",
  });

  // map API row to MyCourse object
  function mapToMyCourse(row: any): MyCourse {
    return {
      id: String(row.course_id ?? row.id ?? row.course_code ?? Date.now()),
      code: row.course_code ?? row.code ?? "",
      name: row.title ?? row.name ?? "",
      units: Number(row.units ?? 0),
      grade: row.grade ?? undefined,
      semester: row.term_descr ?? row.semester ?? "",
      status: row.status ?? "current",
      rating: row.average_rating ? Math.round(row.average_rating) : 0,
    };
  }

  const fetchCourses = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/users/my-courses`);
      const data = res.data;
      // console.log(data);
      const mapped = Array.isArray(data) ? data.map(mapToMyCourse) : [];
      setCourses(mapped);
      return mapped; // return so handleAddCourse can use it
    } catch (err) {
      console.error("Error fetching courses:", err);
      return [];
    }
  }, []);

  
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);


  const currentCourses = courses.filter(course => course.status === 'current');
  const completedCourses = courses.filter(course => course.status === 'completed');

  const totalUnitsCompleted = completedCourses.reduce((sum, course) => sum + course.units, 0);
  const currentUnits = currentCourses.reduce((sum, course) => sum + course.units, 0);
  const averageGPA = calculateGPA(completedCourses);

  function calculateGPA(courses: MyCourse[]): number {
    const gradedCourses = courses.filter(course => course.grade);
    if (gradedCourses.length === 0) return 0;

    const gradePoints: Record<string, number> = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    let totalPoints = 0;
    let totalUnits = 0;

    gradedCourses.forEach(course => {
      if (course.grade && gradePoints[course.grade] !== undefined) {
        totalPoints += gradePoints[course.grade] * course.units;
        totalUnits += course.units;
      }
    });

    return totalUnits > 0 ? totalPoints / totalUnits : 0;
  }

   const handleAddCourse = async () => {
    if (newCourse.code && newCourse.name) {
      try {
        console.log(newCourse.code);
        await axios.post(`${API}/users/add-course`, {course_code: newCourse.code});
        await fetchCourses(); // refresh list from backend
        setNewCourse({
          code: "",
          name: "",
          units: 3,
          grade: "",
          semester: "",
          status: "current",
        });
        setIsAddDialogOpen(false);
      } catch (err) {
        console.error("Error adding course:", err);
      }
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await axios.delete(`${API}/users/my-courses/${courseId}`);
      await fetchCourses(); // refresh list after deletion
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="page-title">
              My Courses
            </h1>
            <p className="text-muted-foreground">
              Track your current and completed courses for better AI recommendations
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-course">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Course Code</Label>
                    <Input
                      id="code"
                      placeholder="COMP SCI 2201"
                      value={newCourse.code}
                      onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                      data-testid="input-course-code"
                    />
                  </div>
                  <div>
                    <Label htmlFor="units">Units</Label>
                    <Input
                      id="units"
                      type="number"
                      min="1"
                      max="10"
                      value={newCourse.units}
                      onChange={(e) => setNewCourse({...newCourse, units: parseInt(e.target.value) || 3})}
                      data-testid="input-course-units"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    placeholder="Introduction to Computer Science"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                    data-testid="input-course-name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="semester">Semester</Label>
                    <Input
                      id="semester"
                      placeholder="Fall 2024"
                      value={newCourse.semester}
                      onChange={(e) => setNewCourse({...newCourse, semester: e.target.value})}
                      data-testid="input-course-semester"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={newCourse.status} onValueChange={(value: 'current' | 'completed') => setNewCourse({...newCourse, status: value})}>
                      <SelectTrigger data-testid="select-course-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newCourse.status === 'completed' && (
                  <div>
                    <Label htmlFor="grade">Grade (optional)</Label>
                    <Select value={newCourse.grade} onValueChange={(value) => setNewCourse({...newCourse, grade: value})}>
                      <SelectTrigger data-testid="select-course-grade">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="C+">C+</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="C-">C-</SelectItem>
                        <SelectItem value="D+">D+</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleAddCourse} className="flex-1" data-testid="button-save-course">
                    Add Course
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalUnitsCompleted}</div>
              <p className="text-xs text-muted-foreground">Units Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{currentUnits}</div>
              <p className="text-xs text-muted-foreground">Current Units</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{averageGPA.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Average GPA</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{courses.length}</div>
              <p className="text-xs text-muted-foreground">Total Courses</p>
            </CardContent>
          </Card>
        </div>

        {/* Course Lists */}
        <Tabs defaultValue="current" className="space-y-6">
          <TabsList>
            <TabsTrigger value="current" data-testid="tab-current-courses">
              Current Courses ({currentCourses.length})
            </TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed-courses">
              Completed Courses ({completedCourses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCourses.map((course) => (
                <Card key={course.id} className="hover-elevate" data-testid={`card-current-course-${course.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{course.code}</h3>
                        <p className="text-sm text-muted-foreground">{course.name}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-muted-foreground hover:text-destructive"
                        data-testid={`button-delete-course-${course.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{course.units} units</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{course.semester}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {currentCourses.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No current courses. Add some to get better AI recommendations!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCourses.map((course) => (
                <Card key={course.id} className="hover-elevate" data-testid={`card-completed-course-${course.id}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{course.code}</h3>
                        <p className="text-sm text-muted-foreground">{course.name}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {course.grade && (
                          <Badge variant="secondary">{course.grade}</Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-muted-foreground hover:text-destructive"
                          data-testid={`button-delete-course-${course.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3" />
                        <span>{course.units} units</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{course.semester}</span>
                      </div>
                    </div>
                    {course.rating && (
                      <div className="flex items-center space-x-1">
                        {renderStars(course.rating)}
                        <span className="text-xs text-muted-foreground ml-1">Your rating</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {completedCourses.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed courses yet. Add your past courses for better recommendations!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}