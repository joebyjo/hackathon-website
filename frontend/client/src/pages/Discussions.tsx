import CourseDiscussion from "@/components/CourseDiscussion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, TrendingUp, Clock } from "lucide-react";
import { useState } from "react";

export default function Discussions() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>("comp-sci-1015");
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: remove mock functionality - get real course discussions
  const popularDiscussions = [
    {
      id: "comp-sci-1015",
      code: "COMP SCI 1015",
      title: "Introduction to Programming",
      activeDiscussions: 15,
      totalPosts: 248,
      recentActivity: "2 hours ago"
    },
    {
      id: "maths-1012",
      code: "MATHS 1012", 
      title: "Mathematical Foundations",
      activeDiscussions: 8,
      totalPosts: 156,
      recentActivity: "5 hours ago"
    },
    {
      id: "phys-1200",
      code: "PHYS 1200",
      title: "Physics for Engineers", 
      activeDiscussions: 12,
      totalPosts: 189,
      recentActivity: "1 hour ago"
    }
  ];

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search discussions:", query);
  };

  const selectedCourseData = popularDiscussions.find(c => c.id === selectedCourse);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Course Discussions</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Join conversations, ask questions, and share insights with fellow students
          </p>
          
          {/* Search */}
          <div className="flex gap-2 w-full sm:max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
                data-testid="input-search-discussions"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Course List Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <div className="sticky top-20">
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <MessageSquare className="h-5 w-5" />
                    Active Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {popularDiscussions.map((course) => (
                    <Button
                      key={course.id}
                      variant={selectedCourse === course.id ? "default" : "ghost"}
                      className="w-full justify-start text-left h-auto p-3 min-h-16 sm:min-h-20"
                      onClick={() => handleCourseSelect(course.id)}
                      data-testid={`course-button-${course.id}`}
                    >
                      <div className="space-y-1 w-full">
                        <div className="font-medium text-sm">{course.code}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">
                          {course.title}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {course.activeDiscussions}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.recentActivity}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="mt-4 lg:mt-6">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Final Exams", "Study Groups", "Assignment Help", "Course Planning", "Career Advice"].map((topic, index) => (
                      <Badge 
                        key={index}
                        variant="secondary" 
                        className="cursor-pointer hover-elevate text-xs min-h-8"
                        data-testid={`trending-topic-${index}`}
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Discussion Area */}
          <div className="lg:col-span-3 order-2 lg:order-2">
            {selectedCourse && selectedCourseData ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Course Stats */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-lg sm:text-xl font-semibold" data-testid="selected-course-title">
                          {selectedCourseData.code} - {selectedCourseData.title}
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground">Join the conversation with your classmates</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-center shrink-0">
                        <div>
                          <div className="text-xl sm:text-2xl font-bold text-primary">{selectedCourseData.activeDiscussions}</div>
                          <div className="text-xs text-muted-foreground">Active Discussions</div>
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-bold text-primary">{selectedCourseData.totalPosts}</div>
                          <div className="text-xs text-muted-foreground">Total Posts</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Course Discussion Component */}
                <CourseDiscussion 
                  courseId={selectedCourse}
                  courseName={`${selectedCourseData.code} - ${selectedCourseData.title}`}
                  onNewPost={(title, content) => console.log("New post:", { title, content })}
                  onLikePost={(postId) => console.log("Liked post:", postId)}
                  onReplyPost={(postId, reply) => console.log("Reply to post:", postId, reply)}
                />
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 sm:p-12 text-center">
                  <MessageSquare className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Select a Course</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Choose a course from the sidebar to view and participate in discussions
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}