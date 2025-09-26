import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterClick?: () => void;
  placeholder?: string;
  value?: string;
}

export default function SearchBar({ 
  onSearch, 
  onFilterClick, 
  placeholder = "Search courses, departments, or topics...",
  value = ""
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Trigger search on every change for instant results
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-10 pr-4"
          data-testid="input-search"
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={onFilterClick}
        data-testid="button-filter"
      >
        <Filter className="h-4 w-4" />
      </Button>
    </form>
  );
}