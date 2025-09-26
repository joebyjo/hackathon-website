import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function StarRating({ 
  rating = 0, 
  onRatingChange,
  readonly = false,
  size = "md",
  showValue = false
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(rating);

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const handleClick = (value: number) => {
    if (readonly) return;
    setCurrentRating(value);
    onRatingChange?.(value);
  };

  const handleMouseEnter = (value: number) => {
    if (readonly) return;
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoveredRating(null);
  };

  const displayRating = hoveredRating ?? currentRating;

  return (
    <div className="flex items-center gap-1" data-testid="star-rating">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayRating;
          const isPartial = starValue - 0.5 <= displayRating && displayRating < starValue;
          
          return (
            <button
              key={i}
              type="button"
              className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              data-testid={`star-${starValue}`}
            >
              <Star
                className={`${sizeClasses[size]} transition-colors ${
                  isFilled
                    ? "fill-chart-3 text-chart-3"
                    : isPartial
                    ? "fill-chart-3/50 text-chart-3"
                    : readonly 
                    ? "fill-muted text-muted-foreground"
                    : "fill-muted text-muted-foreground hover:fill-chart-3/30 hover:text-chart-3"
                }`}
              />
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1" data-testid="rating-value">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}