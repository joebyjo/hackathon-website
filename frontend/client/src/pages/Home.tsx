import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, Star, BookOpen, Users, Filter, Grid, List } from "lucide-react";

import CourseCard from "@/components/CourseCard";
import SearchBar from "@/components/SearchBar";
import CourseFilter from "@/components/CourseFilter";
import { type Course } from "@shared/schema";

interface HomeProps {
  onAIClick?: () => void;
}

export default function Home({ onAIClick }: HomeProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // TODO: remove mock functionality - replace with real course data
  const mockCourses: Course[] = [
    {
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
    },
    {
      id: "2",
      code: "MATHS 1012",
      title: "Mathematical Foundations",
      description: "Essential mathematical concepts for science and engineering students. Covers calculus, linear algebra, and statistics fundamentals with real-world applications.",
      credits: 4,
      prerequisites: ["MATHS 1010"],
      difficulty: 3,
      department: "Mathematics",
      semester: "S1, S2",
      averageRating: 3.9,
      totalRatings: 89,
      tags: ["mathematics", "calculus", "linear-algebra", "analytical"]
    },
    {
      id: "3",
      code: "PHYS 1200",
      title: "Physics for Engineers",
      description: "Fundamental physics concepts with engineering applications. Mechanics, thermodynamics, waves, and electromagnetism with practical laboratory work.",
      credits: 6,
      prerequisites: ["MATHS 1010"],
      difficulty: 4,
      department: "Physics",
      semester: "S1",
      averageRating: 4.1,
      totalRatings: 156,
      tags: ["physics", "engineering", "lab-work", "challenging", "mechanics"]
    },
    {
      id: "4",
      code: "ENGL 1001",
      title: "Academic Writing",
      description: "Develop essential writing skills for university study. Focus on critical thinking, research methods, and clear communication across disciplines.",
      credits: 3,
      prerequisites: [],
      difficulty: 2,
      department: "English",
      semester: "S1, S2, SS",
      averageRating: 4.0,
      totalRatings: 203,
      tags: ["writing", "communication", "research", "beginner-friendly"]
    }
  ];

  const featuredCourses = mockCourses.slice(0, 2);
  const popularTags = ["programming", "mathematics", "beginner-friendly", "practical", "challenging"];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Search query:", query);
  };

  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" data-testid="hero-title">
            Discover Your Perfect Courses
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4" data-testid="hero-description">
            Get AI-powered course recommendations, read student reviews, and plan your academic journey at the University of Adelaide
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <SearchBar 
                onSearch={handleSearch}
                onFilterClick={() => setShowFilters(!showFilters)}
                value={searchQuery}
              />
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-sm text-muted-foreground w-full sm:w-auto">Popular:</span>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleSearch(tag)}
                      data-testid={`popular-tag-${tag}`}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="default"
                  size="sm"
                  className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0"
                  onClick={onAIClick}
                  data-testid="button-ask-ai"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Ask AI for Recommendations</span>
                  <span className="sm:hidden">Ask AI</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-20">
                <CourseFilter 
                  onFilterChange={handleFilterChange}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={`${showFilters ? "lg:col-span-3" : "lg:col-span-4"} order-1 lg:order-2`}>
            <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="overflow-x-auto">
                  <TabsList data-testid="course-tabs" className="grid w-full grid-cols-2 sm:grid-cols-4 sm:w-auto">
                    <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
                    <TabsTrigger value="featured" className="text-xs sm:text-sm">Featured</TabsTrigger>
                    <TabsTrigger value="popular" className="text-xs sm:text-sm">Popular</TabsTrigger>
                    <TabsTrigger value="recommended" className="text-xs sm:text-sm">AI Picks</TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex items-center gap-2 justify-center sm:justify-end">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    data-testid="button-grid-view"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    data-testid="button-list-view"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm sm:text-base text-muted-foreground" data-testid="results-count">
                    Showing {mockCourses.length} courses
                  </p>
                </div>

                <div className={`grid gap-4 sm:gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  {mockCourses.map((course) => (
                    <CourseCard 
                      key={course.id}
                      course={course}
                      onViewDetails={(id) => console.log("View course details:", id)}
                      onAddToList={(id) => console.log("Add course to list:", id)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  {featuredCourses.map((course) => (
                    <div key={course.id} className="relative">
                      <Badge className="absolute top-4 left-4 z-10 bg-primary">
                        Featured
                      </Badge>
                      <CourseCard 
                        course={course}
                        onViewDetails={(id) => console.log("View course details:", id)}
                        onAddToList={(id) => console.log("Add course to list:", id)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="space-y-4 sm:space-y-6">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                  {mockCourses
                    .sort((a, b) => (b.totalRatings || 0) - (a.totalRatings || 0))
                    .map((course) => (
                      <CourseCard 
                        key={course.id}
                        course={course}
                        onViewDetails={(id) => console.log("View course details:", id)}
                        onAddToList={(id) => console.log("Add course to list:", id)}
                      />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="space-y-4 sm:space-y-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI Recommendations for You
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-sm sm:text-base text-muted-foreground mb-4">
                      Based on your academic profile and interests, here are courses we think you'll love:
                    </p>
                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                      {mockCourses.slice(0, 2).map((course) => (
                        <CourseCard 
                          key={course.id}
                          course={course}
                          onViewDetails={(id) => console.log("View course details:", id)}
                          onAddToList={(id) => console.log("Add course to list:", id)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary mb-2" />
              <div className="text-lg sm:text-2xl font-bold">1,200+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Available Courses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-primary mb-2" />
              <div className="text-lg sm:text-2xl font-bold">15,000+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Student Reviews</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-chart-3 mb-2" />
              <div className="text-lg sm:text-2xl font-bold">4.2</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-4 text-center">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-chart-2 mb-2" />
              <div className="text-lg sm:text-2xl font-bold">98%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}