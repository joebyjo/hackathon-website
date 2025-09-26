import StarRating from '../StarRating';
import { useState } from 'react';

export default function StarRatingExample() {
  const [rating, setRating] = useState(0);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Interactive Rating</h3>
        <StarRating 
          rating={rating}
          onRatingChange={setRating}
          showValue
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Read-only Rating (4.3)</h3>
        <StarRating 
          rating={4.3}
          readonly
          showValue
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Small Size</h3>
        <StarRating 
          rating={3.5}
          readonly
          size="sm"
          showValue
        />
      </div>
    </div>
  );
}