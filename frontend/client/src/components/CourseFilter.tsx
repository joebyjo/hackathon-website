import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Filter } from "lucide-react";
import { useState } from "react";

interface FilterOptions {
  departments: string[];
  semesters: string[];
  difficulties: number[];
  credits: number[];
  rating: number;
  tags: string[];
}

interface CourseFilterProps {
  onFilterChange?: (filters: FilterOptions) => void;
  onClearFilters?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CourseFilter({ 
  onFilterChange, 
  onClearFilters, 
  isOpen = true, 
  onClose 
}: CourseFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    departments: [],
    semesters: [],
    difficulties: [],
    credits: [],
    rating: 0,
    tags: []
  });

  const departments = [
    "Computer Science", "Mathematics", "Physics", "Chemistry", 
    "Biology", "Engineering", "Business", "Psychology"
  ];

  const semesters = ["S1", "S2", "SS", "FY"];
  const creditOptions = [3, 4, 6, 8, 12];
  const popularTags = [
    "programming", "mathematics", "theory", "practical", "beginner-friendly",
    "challenging", "group-work", "research", "lab-work", "writing-intensive"
  ];

  const handleDepartmentToggle = (dept: string) => {
    const newDepts = filters.departments.includes(dept)
      ? filters.departments.filter(d => d !== dept)
      : [...filters.departments, dept];
    
    const newFilters = { ...filters, departments: newDepts };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleSemesterToggle = (semester: string) => {
    const newSemesters = filters.semesters.includes(semester)
      ? filters.semesters.filter(s => s !== semester)
      : [...filters.semesters, semester];
    
    const newFilters = { ...filters, semesters: newSemesters };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDifficultyToggle = (difficulty: number) => {
    const newDifficulties = filters.difficulties.includes(difficulty)
      ? filters.difficulties.filter(d => d !== difficulty)
      : [...filters.difficulties, difficulty];
    
    const newFilters = { ...filters, difficulties: newDifficulties };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    const newFilters = { ...filters, tags: newTags };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRatingChange = (value: number[]) => {
    const newFilters = { ...filters, rating: value[0] };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters: FilterOptions = {
      departments: [],
      semesters: [],
      difficulties: [],
      credits: [],
      rating: 0,
      tags: []
    };
    setFilters(clearedFilters);
    onClearFilters?.();
    onFilterChange?.(clearedFilters);
  };

  const activeFiltersCount = 
    filters.departments.length + 
    filters.semesters.length + 
    filters.difficulties.length + 
    filters.credits.length + 
    filters.tags.length +
    (filters.rating > 0 ? 1 : 0);

  if (!isOpen) return null;

  return (
    <Card className="w-full" data-testid="course-filter">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              data-testid="button-clear-filters"
              className="text-xs sm:text-sm"
            >
              Clear All
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              data-testid="button-close-filters"
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6">
        {/* Department Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Department</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {departments.map((dept) => (
              <div key={dept} className="flex items-center space-x-2 min-h-10">
                <Checkbox
                  id={`dept-${dept}`}
                  checked={filters.departments.includes(dept)}
                  onCheckedChange={() => handleDepartmentToggle(dept)}
                  data-testid={`checkbox-dept-${dept}`}
                />
                <label htmlFor={`dept-${dept}`} className="text-sm cursor-pointer flex-1">
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Semester Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Semester</h4>
          <div className="flex flex-wrap gap-2">
            {semesters.map((semester) => (
              <Button
                key={semester}
                variant={filters.semesters.includes(semester) ? "default" : "outline"}
                size="sm"
                onClick={() => handleSemesterToggle(semester)}
                data-testid={`button-semester-${semester}`}
                className="min-h-10 min-w-12"
              >
                {semester}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Difficulty</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((difficulty) => (
              <Button
                key={difficulty}
                variant={filters.difficulties.includes(difficulty) ? "default" : "outline"}
                size="sm"
                onClick={() => handleDifficultyToggle(difficulty)}
                data-testid={`button-difficulty-${difficulty}`}
                className="min-h-10 text-xs sm:text-sm"
              >
                {difficulty === 1 ? "Very Easy" : difficulty === 2 ? "Easy" : difficulty === 3 ? "Medium" : difficulty === 4 ? "Hard" : "Very Hard"}
              </Button>
            ))}
          </div>
        </div>

        {/* Minimum Rating Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">
            Minimum Rating: {filters.rating > 0 ? `${filters.rating.toFixed(1)} stars` : "Any"}
          </h4>
          <Slider
            value={[filters.rating]}
            onValueChange={handleRatingChange}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
            data-testid="slider-rating"
          />
        </div>

        {/* Course Tags */}
        <div>
          <h4 className="text-sm font-medium mb-3">Tags</h4>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Button
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => handleTagToggle(tag)}
                className="text-xs min-h-10 justify-center"
                data-testid={`button-tag-${tag}`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Credits Filter */}
        <div>
          <h4 className="text-sm font-medium mb-3">Credits</h4>
          <Select onValueChange={(value) => {
            const credits = parseInt(value);
            const newCredits = filters.credits.includes(credits)
              ? filters.credits.filter(c => c !== credits)
              : [...filters.credits, credits];
            const newFilters = { ...filters, credits: newCredits };
            setFilters(newFilters);
            onFilterChange?.(newFilters);
          }}>
            <SelectTrigger data-testid="select-credits" className="min-h-10">
              <SelectValue placeholder="Select credits" />
            </SelectTrigger>
            <SelectContent>
              {creditOptions.map((credit) => (
                <SelectItem key={credit} value={credit.toString()}>
                  {credit} credits
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}