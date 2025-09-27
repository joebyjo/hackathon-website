import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import subjectCodes from "../../subjectCodes";

interface CourseSearchProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
}

export interface SearchFilters {
  departments: string[];
}

export default function CourseSearch({ onSearch, placeholder = "Search for courses..." }: CourseSearchProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    departments: []
  });

  const filterOptions = {
    departments: Object.entries(subjectCodes), // [["COMP SCI","Computer Science"], ["MATH","Mathematics"], ...]
  };

  const handleSearch = () => {
    onSearch?.(query, filters);
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
    <div className="relative w-full max-w-2xl">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="pl-10 pr-4"
              data-testid="input-course-search"
            />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="default" data-testid="button-filter">
              <Filter className="w-4 h-4 mr-2" />
              Filter
              {filters.departments.length > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {filters.departments.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Department</DropdownMenuLabel>
            {filterOptions.departments.map(([code, name]) => (
              <DropdownMenuCheckboxItem
                key={code}
                checked={filters.departments.includes(code)}
                onCheckedChange={(checked) => updateFilters('departments', code, !!checked)}
                data-testid={`filter-dept-${code.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {name}
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
