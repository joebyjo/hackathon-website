import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseSearchProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

export interface SearchFilters {
  departments: string[];
  difficulty: string[];
  units: string[];
}

export default function CourseSearch({ onSearch, placeholder = "Search for courses..." }: CourseSearchProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    departments: [],
    difficulty: [],
    units: []
  });
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions - TODO: replace with real data
  const suggestions = [
    "CS 101 - Introduction to Programming",
    "MATH 200 - Calculus II",
    "PHYS 150 - General Physics",
    "ENGL 100 - Composition",
    "CHEM 121 - General Chemistry",
    "HIST 201 - World History"
  ].filter(suggestion => 
    suggestion.toLowerCase().includes(query.toLowerCase()) && query.length > 0
  );

  const filterOptions = {
    departments: ["Computer Science", "Mathematics", "Physics", "Chemistry", "English", "History"],
    difficulty: ["Beginner", "Intermediate", "Advanced"],
    units: ["1-2 Units", "3-4 Units", "5+ Units"]
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch?.(query, filters);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch?.(suggestion, filters);
  };

  const updateFilters = (category: keyof SearchFilters, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder={placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="pl-10 pr-4"
              data-testid="input-course-search"
            />
          </div>

          {/* Dropdown Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover border border-popover-border rounded-md shadow-lg">
              <div className="py-2">
                {suggestions.slice(0, 6).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-2 text-left hover-elevate text-popover-foreground text-sm"
                    data-testid={`suggestion-${index}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" data-testid="button-filter">
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {(filters.departments.length + filters.difficulty.length + filters.units.length) > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {filters.departments.length + filters.difficulty.length + filters.units.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Department</DropdownMenuLabel>
            {filterOptions.departments.map(dept => (
              <DropdownMenuCheckboxItem
                key={dept}
                checked={filters.departments.includes(dept)}
                onCheckedChange={(checked) => updateFilters('departments', dept, checked)}
                data-testid={`filter-dept-${dept.toLowerCase().replace(' ', '-')}`}
              >
                {dept}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Difficulty</DropdownMenuLabel>
            {filterOptions.difficulty.map(diff => (
              <DropdownMenuCheckboxItem
                key={diff}
                checked={filters.difficulty.includes(diff)}
                onCheckedChange={(checked) => updateFilters('difficulty', diff, checked)}
                data-testid={`filter-difficulty-${diff.toLowerCase()}`}
              >
                {diff}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Units</DropdownMenuLabel>
            {filterOptions.units.map(unit => (
              <DropdownMenuCheckboxItem
                key={unit}
                checked={filters.units.includes(unit)}
                onCheckedChange={(checked) => updateFilters('units', unit, checked)}
                data-testid={`filter-units-${unit.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
              >
                {unit}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleSearch} data-testid="button-search">
          Search
        </Button>
      </div>
    </div>
  );
}